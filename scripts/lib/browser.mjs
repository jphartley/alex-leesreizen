// Minimal headless Chrome driver over the DevTools protocol, plus a throwaway app server. No
// dependencies. Every browser uses a fresh temporary profile, so tests never touch real saved answers.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import net from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../..', import.meta.url));
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const freePort = () => new Promise(resolve => {
  const probe = net.createServer().listen(0, '127.0.0.1', () => { const { port } = probe.address(); probe.close(() => resolve(port)); });
});
const chromePaths = [process.env.CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);

// Starts server.mjs on a free port; call stop() when done.
export async function startServer() {
  const port = await freePort(), url = `http://127.0.0.1:${port}/`;
  const child = spawn(process.execPath, ['server.mjs'], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { await fetch(url); return { url, stop: () => child.kill() }; } catch { await wait(100); }
  }
  child.kill();
  throw new Error('App server did not start');
}

export async function launch({ width = 1300, height = 900 } = {}) {
  const chrome = chromePaths.find(p => existsSync(p));
  if (!chrome) throw new Error('Chrome not found; set CHROME=/path/to/chrome');
  const port = await freePort(), profile = mkdtempSync(path.join(tmpdir(), 'alex-profile-'));
  const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${width},${height}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch {}
    if (!target) await wait(150);
  }
  if (!target) { proc.kill(); throw new Error('Chrome did not start'); }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  let id = 0;
  const pending = new Map(), errors = [];
  const send = (method, params = {}) => new Promise(resolve => { pending.set(++id, resolve); ws.send(JSON.stringify({ id, method, params })); })
    .then(message => { if (message.error) throw new Error(`${method}: ${message.error.message}`); return message.result; });
  ws.onmessage = ({ data }) => {
    const m = JSON.parse(data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map(a => a.value ?? a.description).join(' '));
    // Accept confirm() dialogs, such as the reset confirmation.
    if (m.method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true });
  };
  await send('Runtime.enable');
  await send('Page.enable');

  const page = {
    send, errors,
    async eval(expression) {
      const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    },
    async open(url, ms = 900) { await send('Page.navigate', { url }); await wait(ms); },
    // A hash change alone does not reload the page; use this after seeding localStorage.
    async reload(ms = 900) { await send('Page.reload'); await wait(ms); },
    async go(hash, ms = 350) { await page.eval(`location.hash = ${JSON.stringify(hash)}`); await wait(ms); },
    async screenshot(selector) {
      let clip;
      if (selector) {
        const box = await page.eval(`(() => { const b = document.querySelector(${JSON.stringify(selector)})?.getBoundingClientRect(); return b && { x: b.x + scrollX, y: b.y + scrollY, width: b.width, height: b.height }; })()`);
        if (!box) throw new Error(`No element matches ${selector}`);
        clip = { ...box, scale: 1 };
      }
      const { data } = await send('Page.captureScreenshot', { format: 'png', ...(clip && { clip, captureBeyondViewport: true }) });
      return Buffer.from(data, 'base64');
    },
    async viewport(width, height, mobile = false) { await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile }); },
    async reducedMotion(on) { await send('Emulation.setEmulatedMedia', { features: on ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : [] }); },
    async close() {
      ws.close(); proc.kill(); await wait(200);
      try { rmSync(profile, { recursive: true, force: true }); } catch {}
    },
  };
  return page;
}
