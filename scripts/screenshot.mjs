// Screenshots a route in headless Chrome and, optionally, prints it as text.
//   node scripts/screenshot.mjs '#/<slug>' [--selector=.hero-art] [--at=1500,4500] [--size=1300x900]
//                               [--mobile] [--text[=80]] [--diff] [--reduced-motion]
// --at takes one screenshot per time (ms after load). --text prints a tone map of the last frame;
// --diff prints a difference map between consecutive frames (for checking motion).
// PNGs are saved in .screenshots/ (gitignored). Useful selectors: .hero-art, #chapter-art,
// .journey-grid, .completion-art.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { launch, root, startServer, wait } from './lib/browser.mjs';
import { decodePng, diffMap, toneMap } from './lib/pixels.mjs';

const args = process.argv.slice(2), flag = name => args.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
const value = (name, fallback) => flag(name)?.split('=')[1] ?? fallback;
const hash = args.find(a => a.startsWith('#')) ?? '#/';
const selector = value('selector'), times = value('at', '1500').split(',').map(Number);
const [width, height] = value('size', flag('mobile') ? '390x844' : '1300x900').split('x').map(Number);
const cols = Number(flag('text')?.split('=')[1] ?? 80);

const server = await startServer(), page = await launch({ width, height });
try {
  if (flag('mobile')) await page.viewport(width, height, true);
  if (flag('reduced-motion')) await page.reducedMotion(true);
  await page.open(server.url + hash, 0);
  const start = Date.now(), dir = path.join(root, '.screenshots'), name = hash.replace(/[^a-z0-9-]+/gi, '_').replace(/^_|_$/g, '') || 'landing';
  mkdirSync(dir, { recursive: true });
  const frames = [];
  for (const t of times) {
    await wait(Math.max(0, t - (Date.now() - start)));
    const png = await page.screenshot(selector), file = path.join(dir, `${name}-${t}.png`);
    writeFileSync(file, png);
    frames.push(decodePng(png));
    console.log(`saved ${path.relative(root, file)}`);
  }
  if (flag('text')) console.log(`\n--- tone map at ${times.at(-1)}ms (darker = denser) ---\n${toneMap(frames.at(-1), cols)}`);
  if (flag('diff')) frames.slice(1).forEach((frame, i) => console.log(`\n--- change ${times[i]}ms → ${times[i + 1]}ms (blank = unchanged) ---\n${diffMap(frames[i], frame, cols)}`));
  if (page.errors.length) console.log(`\nconsole errors:\n${page.errors.join('\n')}`);
} finally {
  await page.close();
  server.stop();
}
