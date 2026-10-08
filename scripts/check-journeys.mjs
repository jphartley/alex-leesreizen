// Dev-time checks for journey content and saved-data migration. Run with `npm run check`.
import { readFile } from 'node:fs/promises';
import { journeys } from '../journeys/index.js';
import { migrateV1 } from '../store.js';

const errors = [], warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);
const isText = value => typeof value === 'string' && value.trim().length > 0;
// Same parsing and word matching as app.js.
const parseText = markdown => {
  const blocks = markdown.split(/^## /m)[0].split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  return { title: blocks.find(b => b.startsWith('# ')), paragraphs: blocks.filter(b => !b.startsWith('#')) };
};
const containsWord = (text, word) => new RegExp(`(?<![\\p{L}\\p{N}])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'u').test(text);

const slugs = new Set();
for (const j of journeys) {
  const at = j?.slug || '(missing slug)';
  if (!/^[a-z0-9-]+$/.test(j.slug ?? '')) fail(at, 'slug must be lowercase letters, digits and dashes');
  if (slugs.has(j.slug)) fail(at, 'duplicate slug');
  slugs.add(j.slug);
  for (const field of ['name', 'number']) if (!isText(j[field])) fail(at, `missing ${field}`);
  for (const [group, fields] of Object.entries({ meta: ['title', 'description'], card: ['title', 'blurb'], home: ['label', 'greeting', 'description', 'cta', 'location', 'caption', 'routeHeading'], quiz: ['mcEyebrow', 'mcHeading'], completion: ['text', 'tag'] })) {
    for (const field of fields) if (!isText(j[group]?.[field])) fail(at, `missing ${group}.${field}`);
  }
  if (!Array.isArray(j.home?.heading) || !j.home.heading.every(isText)) fail(at, 'home.heading must be an array of lines');
  if (!Array.isArray(j.home?.stamp) || j.home.stamp.length !== 3) fail(at, 'home.stamp must have 3 parts');
  if (!Array.isArray(j.completion?.heading) || !j.completion.heading.every(isText)) fail(at, 'completion.heading must be an array of lines');

  const chapters = j.chapters ?? [];
  if (chapters.length < 3 || chapters.length > 6) fail(at, `needs 3–6 chapters, has ${chapters.length}`);
  chapters.forEach((c, i) => {
    for (const field of ['title', 'short', 'label', 'icon', 'aside', 'caption', 'note']) if (!isText(c[field])) fail(at, `chapter ${i} missing ${field}`);
    if (c.variants && (!Array.isArray(c.variants) || !c.variants.every(v => isText(v.id) && isText(v.label)))) fail(at, `chapter ${i} variants need id and label`);
  });

  let text = '';
  try { text = await readFile(new URL(`../journeys/${j.slug}/text.md`, import.meta.url), 'utf8'); }
  catch { fail(at, 'text.md not found'); }
  const { title, paragraphs } = parseText(text);
  if (!title) fail(at, 'text.md needs a "# Title" line');
  if (paragraphs.length !== chapters.length) fail(at, `text.md has ${paragraphs.length} paragraphs for ${chapters.length} chapters`);

  const words = Object.keys(j.dictionary ?? {});
  if (words.length < 5 || words.length > 10) warn(at, `glossary has ${words.length} words (aim for 5–10)`);
  for (const word of words) {
    if (!isText(j.dictionary[word])) fail(at, `glossary word "${word}" has no definition`);
    if (!containsWord(paragraphs.join('\n'), word)) fail(at, `glossary word "${word}" does not appear in the text exactly`);
  }

  const questions = j.questions ?? [];
  if (questions.length !== 7) fail(at, `needs 7 multiple-choice questions, has ${questions.length}`);
  questions.forEach((q, i) => {
    if (!isText(q.q) || !isText(q.explanation)) fail(at, `question ${i + 1} needs q and explanation`);
    if (!Array.isArray(q.options) || q.options.length !== 4 || !q.options.every(isText)) fail(at, `question ${i + 1} needs 4 options`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) fail(at, `question ${i + 1} answer must be 0–3`);
    if (!Number.isInteger(q.chapter) || !chapters[q.chapter]) fail(at, `question ${i + 1} chapter out of range`);
  });
  const perLetter = [0, 1, 2, 3].map(n => questions.filter(q => q.answer === n).length);
  if (Math.max(...perLetter) > 3) warn(at, `correct answers are bunched (A–D: ${perLetter.join('/')})`);
  const covered = new Set(questions.map(q => q.chapter));
  chapters.forEach((_, i) => { if (!covered.has(i)) warn(at, `no multiple-choice question about chapter ${i + 1}`); });

  const written = j.written ?? [];
  if (written.length !== 2) fail(at, `needs 2 open questions, has ${written.length}`);
  written.forEach((w, i) => {
    for (const field of ['q', 'label', 'model']) if (!isText(w[field])) fail(at, `open question ${i + 1} missing ${field}`);
    if (!Number.isInteger(w.chapter) || !chapters[w.chapter]) fail(at, `open question ${i + 1} chapter out of range`);
  });

  if (typeof j.animate !== 'function') fail(at, 'missing animate(ctx) from motion.js');
  for (const fn of ['hero', 'chapter', 'completion', 'card']) if (typeof j.art?.[fn] !== 'function') fail(at, `art.js must export ${fn}()`);
  if (errors.some(e => e.startsWith(`${at}: art.js`))) continue;
  const art = { hero: j.art.hero('hero'), card: j.art.card(), completion: j.art.completion() };
  chapters.forEach((c, i) => { if (i) for (const v of c.variants?.map(v => v.id) ?? [undefined]) art[`chapter ${i}${v ? ` (${v})` : ''}`] = j.art.chapter(i, v); });
  if (!/<svg[^>]*\bdata-scene\b/.test(art.hero)) fail(at, 'hero() svg needs a data-scene attribute');
  for (const [name, svg] of Object.entries(art)) {
    if (!/^\s*<svg[\s>]/.test(svg)) fail(at, `${name} art must return an <svg>`);
    if (!/role="img"/.test(svg) || !/aria-label="[^"]+"/.test(svg)) fail(at, `${name} art needs role="img" and a Dutch aria-label`);
    for (const [, id] of svg.matchAll(/\bid="([^"]+)"/g)) if (!id.startsWith(`${j.slug}-`)) fail(at, `${name} art id "${id}" must start with "${j.slug}-"`);
    if (/(href|src)="(?!#)/.test(svg) || /url\((?!#)/.test(svg)) fail(at, `${name} art must not load external resources`);
  }
}

// Migration from the single-journey v1 data.
const migrated = migrateV1({ answers: { 0: 1, 6: 3, 7: 2, 2: 9, x: 1 }, written: { 0: 'a', 1: 'b', 2: 'c' }, reviewed: [0], read: [1], calm: true });
const expected = { version: 2, settings: { calm: true, large: false }, journeys: { taiwan: { answers: { 0: 1, 6: 3 }, written: { 0: 'a', 1: 'b' } } } };
if (JSON.stringify(migrated) !== JSON.stringify(expected)) fail('store', `migrateV1 gave ${JSON.stringify(migrated)}`);
if (JSON.stringify(migrateV1(null).journeys.taiwan) !== '{"answers":{},"written":{}}') fail('store', 'migrateV1 must handle missing data');

for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.log(`error    ${e}`);
console.log(errors.length ? `\n${errors.length} error(s).` : `All ${journeys.length} journey(s) OK${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
process.exit(errors.length ? 1 : 0);
