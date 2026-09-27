import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' };
const allowed = new Set(['index.html', 'styles.css', 'app.js', 'motion.js', 'store.js', 'vendor/gsap.min.js', 'vendor/MotionPathPlugin.min.js']);
// Journey files follow a fixed layout, so new journeys need no server change. Slugs cannot contain dots or slashes.
const journeyFile = /^journeys\/(index\.js|[a-z0-9-]+\/(text\.md|journey\.js|art\.js|motion\.js))$/;
const server = http.createServer(async (req, res) => {
  let file;
  try { file = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).slice(1) || 'index.html'; }
  catch { res.writeHead(400).end('Bad request'); return; }
  if (!allowed.has(file) && !journeyFile.test(file)) { res.writeHead(404).end('Not found'); return; }
  try {
    const data = await readFile(path.join(root, file));
    res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.code === 'ENOENT' ? 'Not found' : 'Could not read file'); }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => {
  console.log(`Alex’s reading journeys: http://localhost:${server.address().port}`);
});
