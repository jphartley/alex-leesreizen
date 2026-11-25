// Shared plumbing for hero-scene keyboard games (see .agents/skills/journey-game/SKILL.md). A journey's
// motion.js calls setupGame() inside animate(); the journey keeps only its own rules and pictures.
//
// setupGame() handles: the desktop-only check (journey home, fine pointer, at least 741px wide), making
// the SVG focusable with a Dutch game description, focus, blur, Escape and click, keys (only while the
// SVG has focus), the hint bar (.game-hint with .hint-text, see hintBar()), soft Web Audio tones that
// start only after a key press or click, the data-game-cue attribute the playtest script reads, and
// clean-up. On phones, tablets and chapter pages it returns the same API with every method a no-op,
// so a journey can call say() or tone() without checking.
//
// This file has no top-level browser globals, so art.js can import hintBar() in Node for npm run check.

const DESKTOP = '(hover: hover) and (pointer: fine) and (min-width: 741px)';
const SPACE = new Set([' ', 'Spacebar']);

// The hint pill under the scene. Put it last in the SVG so nothing covers it.
export function hintBar(text, { x = 96, y = 662, width = 528, fill = '#284f3d' } = {}) {
  return `<g class="game-hint" opacity="0"><rect x="${x}" y="${y}" width="${width}" height="34" rx="17" fill="#f9f7e5" opacity=".94"/>
  <text class="hint-text" x="${x + width / 2}" y="${y + 22}" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="${fill}">${text}</text></g>`;
}

/**
 * @param {object} o
 * @param {string} o.help    Dutch game instructions, appended to the scene's aria-label while playable.
 * @param {string} o.start   Dutch hint shown when the game is not in focus.
 * @param {string[]} [o.keys] Keys to capture ('Spacebar' counts as ' '). Default: space and Enter.
 * @param {(key: string, down: boolean, e: KeyboardEvent) => void} [o.onKey] Key presses (down) and, for
 *   held keys, releases (up). Auto-repeat presses are dropped unless o.repeat is set.
 * @param {() => void} [o.onStart] The scene received focus (click or Tab): start or resume the game.
 * @param {() => void} [o.onStop]  The scene lost focus (Escape, click elsewhere, Tab away).
 * @param {() => boolean} [o.when] Extra condition for a delayed follow-up hint (see say()).
 */
export function setupGame({ svg, container, gsap, q, alive, help, start, keys = [' ', 'Enter'], repeat = false, onKey, onStart, onStop, when = () => true }) {
  const desktop = !!container?.classList.contains('hero-art') && matchMedia(DESKTOP).matches;
  const noop = () => {};
  if (!desktop) return { active: false, focused: () => false, say: noop, cue: noop, tone: noop, tune: noop, melody: noop, cleanup: noop };

  const [hint] = q('.game-hint'), [hintText] = q('.hint-text');
  let focused = false, followUp = null, audio = null;

  // say(text) shows a hint; say(text, then) switches to `then` after 1.8 s if the game is still in focus
  // and when() still holds, for example "Raak!" followed by the instructions again.
  const say = (text, then, delay = 1.8) => {
    if (!hintText || !alive()) return;
    hintText.textContent = text;
    gsap.fromTo(hint, { opacity: .5 }, { opacity: 1, duration: .35, overwrite: 'auto' });
    followUp?.kill();
    followUp = then ? gsap.delayedCall(delay, () => alive() && focused && when() && say(then)) : null;
  };
  if (start && hintText) hintText.textContent = start;
  gsap.to(hint, { opacity: 1, duration: .6, delay: 1.2 });

  // cue(true) while an input would succeed right now; npm run play presses keys on it.
  const cue = on => { if (on) svg.dataset.gameCue = '1'; else delete svg.dataset.gameCue; };

  // Sound: silent until a key press or click wakes the AudioContext.
  const wake = () => {
    try { audio ??= new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended') audio.resume().catch(() => {}); } catch { audio = null; }
  };
  const tone = (freq, length = .18, volume = .07, type = 'triangle', delay = 0) => {
    if (!audio || audio.state === 'closed' || !alive()) return;
    const t = audio.currentTime + delay, out = audio.createGain(), osc = audio.createOscillator();
    osc.type = type; osc.frequency.value = freq;
    osc.connect(out).connect(audio.destination);
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(volume, t + .02);
    out.gain.setTargetAtTime(0, t + length, .05);
    osc.start(t); osc.stop(t + length + .4);
  };
  // A quick run of notes (frequencies), the last one held longer.
  const tune = (notes, gap = .13, length = .2) => notes.forEach((f, k) => tone(f, k === notes.length - 1 ? length * 2 : length, .07, 'sine', k * gap));
  // A melody of [frequency, beats] pairs with a soft octave below.
  const melody = (notes, beat = .42) => { let t = 0; notes.forEach(([f, b]) => { tone(f, b * beat * .85, .07, 'sine', t); tone(f / 2, b * beat * .85, .03, 'triangle', t); t += b * beat; }); };

  const label = svg.getAttribute('aria-label');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'application');
  svg.setAttribute('aria-label', `${label}. ${help}`);

  const wanted = new Set(keys.map(k => SPACE.has(k) ? ' ' : k));
  const onKeyEvent = e => {
    if (e.type === 'keydown' && e.key === 'Escape') { svg.blur(); return; }
    const key = SPACE.has(e.key) ? ' ' : e.key;
    if (!wanted.has(key)) return;
    e.preventDefault();
    const down = e.type === 'keydown';
    if (down && e.repeat && !repeat) return;
    if (down) wake();
    onKey?.(key, down, e);
  };
  const onFocus = () => { focused = true; onStart?.(); };
  const onBlur = () => { focused = false; followUp?.kill(); cue(false); onStop?.(); };
  const onPointer = () => { svg.focus({ preventScroll: true }); wake(); };
  svg.addEventListener('keydown', onKeyEvent);
  svg.addEventListener('keyup', onKeyEvent);
  svg.addEventListener('focus', onFocus);
  svg.addEventListener('blur', onBlur);
  svg.addEventListener('pointerdown', onPointer);

  const cleanup = () => {
    followUp?.kill();
    svg.removeEventListener('keydown', onKeyEvent);
    svg.removeEventListener('keyup', onKeyEvent);
    svg.removeEventListener('focus', onFocus);
    svg.removeEventListener('blur', onBlur);
    svg.removeEventListener('pointerdown', onPointer);
    svg.removeAttribute('tabindex');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
    cue(false);
    audio?.close().catch(() => {});
    audio = null;
  };
  return { active: true, focused: () => focused, say, cue, tone, tune, melody, cleanup };
}

// ---- Motion helpers (usable with or without setupGame) ----------------------------------------------

// Walks an actor object ({ x, y, face, hop }, drawn by your ticker) to x (and y), with a small bounce
// per step. face defaults to the walking direction. Returns the GSAP timeline.
export function walkTo(gsap, actor, x, { y = actor.y, face = Math.sign(x - actor.x) || actor.face, speed = 110 } = {}) {
  const duration = Math.max(.3, Math.hypot(x - actor.x, (y ?? 0) - (actor.y ?? 0)) / speed);
  const tl = gsap.timeline().set(actor, { face }).to(actor, { x, ...(y === undefined ? {} : { y }), duration, ease: 'sine.inOut' });
  return tl.to(actor, { hop: -3, duration: .16, ease: 'sine.out', yoyo: true, repeat: Math.max(1, Math.round(duration / .16) - 1) }, 0).set(actor, { hop: 0 });
}

// Flashes a burst() from art-kit.js at (x, y).
export function burstAt(gsap, el, x, y, size = 1) {
  if (!el) return;
  const rays = el.querySelector('.burst-rays');
  el.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  gsap.fromTo(el, { opacity: 1 }, { opacity: 0, duration: .6, ease: 'power1.in', overwrite: 'auto' });
  if (rays) gsap.fromTo(rays, { scale: .4 * size, rotation: 0 }, { scale: 1.3 * size, rotation: 25, duration: .6, ease: 'power2.out', transformOrigin: '50% 50%', overwrite: 'auto' });
}
