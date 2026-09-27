// End-to-end check of the app in headless Chrome, driven by the journey data itself.
//   node scripts/check-browser.mjs [slug ...] [--verbose]
// With no slugs it checks every journey. Prints only failures (and passes with --verbose), then a
// summary. Runs its own server and a throwaway browser profile; Alex's saved answers are never touched.
import { readFile } from 'node:fs/promises';
import { journeys } from '../journeys/index.js';
import { launch, startServer, wait } from './lib/browser.mjs';

const args = process.argv.slice(2), verbose = args.includes('--verbose');
const selected = args.filter(a => !a.startsWith('--'));
const unknown = selected.filter(s => !journeys.some(j => j.slug === s));
if (unknown.length) { console.log(`Unknown journey: ${unknown.join(', ')}`); process.exit(1); }
const targets = selected.length ? journeys.filter(j => selected.includes(j.slug)) : journeys;

let passed = 0, failed = 0;
const check = (label, condition, detail = '') => {
  if (condition) { passed++; if (verbose) console.log(`PASS ${label}`); }
  else { failed++; console.log(`FAIL ${label}${detail ? ` (${detail})` : ''}`); }
};
const noDuplicateIds = `(() => { const ids = [...document.querySelectorAll('[id]')].map(e => e.id); return ids.length === new Set(ids).size; })()`;
const activeTweens = `window.gsap ? gsap.globalTimeline.getChildren(true, true, false).filter(t => t.isActive()).length : -1`;
const saved = page => page.eval(`JSON.parse(localStorage.getItem('alex-leesavontuur-v2') || '{}')`);

const server = await startServer(), page = await launch();
try {
  // App-wide: migration from the single-journey v1 data, and old routes.
  await page.open(server.url);
  const v1 = { answers: { 0: 1, 9: 1 }, written: { 0: 'een', 2: 'drie' }, calm: false, large: true };
  await page.eval(`localStorage.clear(); localStorage.setItem('alex-thee-avontuur-v1', ${JSON.stringify(JSON.stringify(v1))})`);
  await page.go('#home', 0); await page.reload();
  const migrated = await saved(page);
  check('migration from v1', JSON.stringify(migrated.journeys?.taiwan) === '{"answers":{"0":1},"written":{"0":"een"}}' && migrated.settings?.large === true, JSON.stringify(migrated));
  check('v1 data left untouched', await page.eval(`localStorage.getItem('alex-thee-avontuur-v1')`) === JSON.stringify(v1));
  check('old route #home redirects', await page.eval('location.hash') === '#/taiwan');
  await page.eval(`localStorage.clear()`); await page.go('#/', 0); await page.reload();
  check('landing: one card per journey', await page.eval(`document.querySelectorAll('.journey-card').length`) === journeys.length);
  check('landing: no duplicate SVG ids', await page.eval(noDuplicateIds));

  for (const j of targets) {
    const at = label => `${j.slug}: ${label}`, mc = j.questions.length, total = mc + j.written.length, n = j.chapters.length;
    const text = await readFile(new URL(`../journeys/${j.slug}/text.md`, import.meta.url), 'utf8');
    await page.go('#/', 300);
    await page.eval(`document.querySelector('#journey-toggle').click()`);
    await page.eval(`document.querySelector('#journey-list a[href="#/${j.slug}"]').click()`); await wait(700);
    check(at('switcher opens the journey'), await page.eval('location.hash') === `#/${j.slug}`);
    check(at('switcher label'), await page.eval(`document.querySelector('#journey-toggle').getAttribute('aria-label')`) === `Wissel van leesreis, nu: ${j.name}`);
    check(at('home: hero scene and counts'), await page.eval(`!!document.querySelector('.hero-art svg[data-scene]') && document.querySelector('.hero-meta').textContent`) === `${n} korte hoofdstukken${total} vragenOp jouw tempo`);
    check(at('document title'), (await page.eval('document.title')).startsWith(j.meta.title));

    // Hero motion: GSAP tweens running and elements actually moving.
    const transforms = `[...document.querySelectorAll('.hero-art svg [class]')].map(e => (e.getAttribute('transform') || '') + getComputedStyle(e).opacity)`;
    await wait(1500);
    const before = await page.eval(transforms); await wait(1500); const after = await page.eval(transforms);
    const moving = before.filter((t, i) => t !== after[i]).length;
    check(at('hero animation running'), await page.eval(activeTweens) > 3 && moving >= 3, `${moving} elements moved`);

    const highlighted = new Set();
    for (let i = 0; i < n; i++) {
      await page.go(`#/${j.slug}/chapter-${i}`);
      (await page.eval(`[...document.querySelectorAll('.vocab')].map(b => b.dataset.word)`)).forEach(w => highlighted.add(w));
      check(at(`chapter ${i + 1} renders`), await page.eval(`!!document.querySelector('#chapter-art svg') && document.querySelector('.story-text').textContent.length > 100 && ${noDuplicateIds}`));
      for (const v of j.chapters[i].variants ?? []) {
        await page.eval(`document.querySelector('[data-variant="${v.id}"]').click()`); await wait(80);
        check(at(`chapter ${i + 1} variant ${v.id}`), await page.eval(`document.querySelector('[data-variant="${v.id}"]').getAttribute('aria-pressed') === 'true' && !!document.querySelector('#chapter-art svg')`));
      }
    }
    const missing = Object.keys(j.dictionary).filter(w => !highlighted.has(w));
    check(at('every glossary word highlighted'), !missing.length, missing.join(', '));
    if (n) {
      await page.eval(`document.querySelector('.vocab')?.click()`);
      check(at('glossary definition shows'), (await page.eval(`document.querySelector('#word-help').textContent`)).length > 10);
    }

    for (const [i, q] of j.questions.entries()) {
      await page.go(`#/${j.slug}/quiz-${i + 1}`, 250);
      await page.eval(`document.querySelector('[data-answer="${q.answer}"]').click()`); await wait(60);
      check(at(`question ${i + 1} marks the right answer`), await page.eval(`!!document.querySelector('.answer-option.correct:disabled') && !document.querySelector('.answer-option.incorrect') && document.querySelector('.feedback').textContent.length > 30`));
    }
    for (const [i] of j.written.entries()) {
      await page.go(`#/${j.slug}/quiz-${mc + i + 1}`, 250);
      await page.eval(`{ const t = document.querySelector('#written-answer'); t.value = '<b>mijn antwoord</b>'; t.dispatchEvent(new Event('input', { bubbles: true })); }`);
      await page.eval(`document.querySelector('[data-action=show-model]').click()`); await wait(60);
      check(at(`open question ${i + 1} shows the model answer`), (await page.eval(`document.querySelector('.model-answer p').textContent`)).length > 20);
    }
    await page.go(`#/${j.slug}/quiz-${mc + 1}`, 250);
    check(at('written answer saved and escaped'), await page.eval(`document.querySelector('#written-answer').value === '<b>mijn antwoord</b>' && !document.querySelector('main b:not(.word-help b)')`));
    await page.go(`#/${j.slug}/quiz-done`, 350);
    check(at('completion score'), (await page.eval(`document.querySelector('.score-badge').textContent`)).includes(`${mc} van ${mc} quizvragen goed · ${j.written.length} eigen antwoorden`));
    await page.go(`#/${j.slug}/reading`, 300);
    check(at('full reading page'), await page.eval(`document.querySelector('.all-reading h1').textContent`) === text.match(/^# (.+)$/m)?.[1].trim() && await page.eval(`document.querySelectorAll('.all-reading section').length`) === n);

    await page.reload(); await page.go(`#/${j.slug}/quiz-1`, 300);
    check(at('answers kept after reload'), await page.eval(`document.querySelectorAll('.answer-option:disabled').length`) === 4);
    await page.eval(`(() => { const d = JSON.parse(localStorage.getItem('alex-leesavontuur-v2')); d.journeys['other-journey'] = { answers: { 0: 1 }, written: {} }; localStorage.setItem('alex-leesavontuur-v2', JSON.stringify(d)); })()`);
    await page.reload(); await page.go(`#/${j.slug}`, 350);
    await page.eval(`document.querySelector('[data-action=reset]').click()`); await wait(300);
    const afterReset = await saved(page);
    check(at('reset clears only this journey'), !Object.keys(afterReset.journeys[j.slug].answers).length && !Object.keys(afterReset.journeys[j.slug].written).length && afterReset.journeys['other-journey']?.answers[0] === 1);

    await page.go(`#/${j.slug}`, 400);
    await page.eval(`document.querySelector('#calm-toggle').click()`); await wait(150);
    check(at('quiet mode pauses animation'), await page.eval('gsap.globalTimeline.paused()'));
    await page.eval(`document.querySelector('#calm-toggle').click()`);
    await page.reducedMotion(true); await page.go('#/', 200); await page.go(`#/${j.slug}`, 500);
    check(at('reduced motion: no animation'), await page.eval(activeTweens) === 0);
    await page.reducedMotion(false);

    await page.viewport(360, 780, true);
    const routes = ['#/', `#/${j.slug}`, ...j.chapters.map((_, i) => `#/${j.slug}/chapter-${i}`), `#/${j.slug}/quiz-1`, `#/${j.slug}/quiz-${total}`, `#/${j.slug}/quiz-done`];
    const wide = [];
    for (const route of routes) { await page.go(route, 250); if (await page.eval('document.documentElement.scrollWidth') > 360) wide.push(route); }
    check(at('no horizontal scroll at 360px'), !wide.length, wide.join(' '));
    await page.eval(`document.querySelector('#journey-toggle').click()`);
    const list = await page.eval(`(() => { const b = document.querySelector('#journey-list').getBoundingClientRect(); return [b.left, b.right]; })()`);
    check(at('switcher list fits at 360px'), list[0] >= 0 && list[1] <= 360);
    await page.viewport(1300, 900);
    await page.eval(`localStorage.clear()`); await page.reload();
  }
  check('no console errors', !page.errors.length, page.errors.join(' | '));
} finally {
  await page.close();
  server.stop();
}
console.log(`${failed ? 'FAILED' : 'OK'}: ${passed} passed, ${failed} failed (${targets.map(j => j.slug).join(', ')})`);
process.exit(failed ? 1 : 0);
