// Make sure the local server is running in the background, then print the URL to open.
// Unlike `npm start`, this returns straight away and leaves the server running after it exits.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/${process.argv[2] ? `#/${process.argv[2]}` : ''}`;
const up = () => fetch(`http://127.0.0.1:${port}/`).then(r => r.ok, () => false);

if (!(await up())) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  spawn(process.execPath, ['server.mjs'], { cwd: root, detached: true, stdio: 'ignore' }).unref();
  for (let i = 0; i < 50 && !(await up()); i++) await new Promise(r => setTimeout(r, 100));
  if (!(await up())) { console.error(`The server did not start on port ${port}.`); process.exit(1); }
}
console.log(`Running: ${url}`);
