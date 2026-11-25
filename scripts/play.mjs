// Plays a journey's hero-scene game in headless Chrome and reports what happened.
//   node scripts/play.mjs <slug> [--until=<hint text>] [--seconds=60] [--miss=0] [--key=space] [--no-shots]
// Starts the game (headless Chrome fires no focus events by itself, so one is dispatched), presses the
// key each time the game raises its data-game-cue (set through game.cue() in /game.js), logs every hint
// with a timestamp and saves a screenshot of .hero-art the first time each hint appears, in
// .screenshots/<slug>-play-NN.png. It stops when a hint contains --until, or after --seconds.
// --miss=N lets the first N cues pass, to see the miss path. Afterwards it checks that Escape returns
// to the start hint and clears the cue, and that the chapter 1 copy of the scene is not focusable.
// Games from before game.js raise no cue, so for those nothing is pressed (the log still runs).
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { launch, root, startServer, wait } from './lib/browser.mjs';

const args = process.argv.slice(2), flag = name => args.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
const value = (name, fallback) => flag(name)?.slice(name.length + 3) ?? fallback;
const slug = args.find(a => !a.startsWith('--'));
if (!slug) { console.log('Usage: npm run play -- <slug> [--until=<hint text>] [--seconds=60] [--miss=0] [--key=space] [--no-shots]'); process.exit(1); }
const until = value('until'), seconds = Number(value('seconds', 60)), misses = Number(value('miss', 0));
const key = { space: ' ', enter: 'Enter' }[value('key', 'space').toLowerCase()] ?? value('key');
const shots = !flag('no-shots'), dir = path.join(root, '.screenshots');
const SVG = `document.querySelector('.hero-art svg[data-scene]')`;

const server = await startServer(), page = await launch({ width: 1300, height: 900 });
const failures = [], fail = message => failures.push(message);
try {
  await page.open(server.url, 1200);
  await page.go(`#/${slug}`, 2500);
  if (!await page.eval(`!!${SVG}`)) throw new Error(`no hero scene at #/${slug}`);
  if (await page.eval(`${SVG}.getAttribute('tabindex')`) !== '0') throw new Error(`#/${slug} has no desktop game (the hero scene is not focusable)`);
  const startHint = await page.eval(`${SVG}.querySelector('.hint-text')?.textContent ?? ''`);

  // In the page: log hint changes and press the key on each rising edge of the cue.
  await page.eval(`(() => {
    const svg = ${SVG}, text = svg.querySelector('.hint-text'), t0 = performance.now();
    const p = window.__play = { log: [], cues: 0, presses: 0, skipped: 0 };
    const stamp = () => Math.round((performance.now() - t0) / 100) / 10;
    if (text) new MutationObserver(() => p.log.push([stamp(), text.textContent])).observe(text, { childList: true, characterData: true, subtree: true });
    let was = false;
    setInterval(() => {
      const on = !!svg.dataset.gameCue;
      if (on && !was) {
        p.cues++;
        if (p.skipped < ${misses}) p.skipped++;
        else {
          p.presses++;
          svg.dispatchEvent(new KeyboardEvent('keydown', { key: ${JSON.stringify(key)}, bubbles: true }));
          svg.dispatchEvent(new KeyboardEvent('keyup', { key: ${JSON.stringify(key)}, bubbles: true }));
        }
      }
      was = on;
    }, 16);
    svg.focus();
    svg.dispatchEvent(new FocusEvent('focus'));
  })()`);

  if (shots) mkdirSync(dir, { recursive: true });
  const seen = new Map(), started = Date.now();
  let read = 0, done = false;
  while (!done && Date.now() - started < seconds * 1000) {
    await wait(200);
    const log = await page.eval('__play.log');
    for (; read < log.length; read++) {
      const [, text] = log[read];
      if (seen.has(text)) continue;
      const n = String(seen.size + 1).padStart(2, '0');
      seen.set(text, n);
      if (shots) { await wait(600); writeFileSync(path.join(dir, `${slug}-play-${n}.png`), await page.screenshot('.hero-art')); }
      if (until && text.includes(until)) { done = true; break; }
    }
  }
  const { log, cues, presses, skipped } = await page.eval('__play');
  if (until && !done) fail(`no hint containing "${until}" within ${seconds} s`);
  if (!cues) console.log('note     no data-game-cue seen: nothing was pressed (games from before game.js raise no cue)');

  // Escape: back to the start hint, cue cleared.
  await page.eval(`(${SVG}.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })), ${SVG}.dispatchEvent(new FocusEvent('blur')))`);
  await wait(1000);
  const after = await page.eval(`[${SVG}.querySelector('.hint-text')?.textContent ?? '', ${SVG}.dataset.gameCue ?? '']`);
  if (startHint && after[0] !== startHint) fail(`after Escape the hint is "${after[0]}", expected the start hint "${startHint}"`);
  if (after[1]) fail('after Escape data-game-cue is still set');

  // Chapter 1 shows the same scene, but it must not be playable.
  await page.go(`#/${slug}/chapter-0`, 1200);
  if (await page.eval(`document.querySelector('#chapter-art svg')?.getAttribute('tabindex')`) !== null) fail('the chapter 1 scene is focusable');

  console.log(log.map(([t, text]) => `${String(t).padStart(5)}s  ${text}`).join('\n'));
  if (shots) console.log(`\nscreenshots (first time each hint appeared):\n${[...seen].map(([text, n]) => `  .screenshots/${slug}-play-${n}.png  ${text}`).join('\n')}`);
  console.log(`\ncues ${cues}, presses ${presses}, let pass ${skipped}`);
  if (page.errors.length) fail(`console errors:\n${page.errors.join('\n')}`);
} catch (error) {
  fail(error.message);
} finally {
  await page.close();
  server.stop();
}
for (const f of failures) console.log(`FAIL     ${f}`);
console.log(failures.length ? `FAILED (${slug})` : `OK (${slug})`);
process.exit(failures.length ? 1 : 0);
