// Zelda-3D hero choreography and the Z-targeting game. Runs inside animateScene() from /motion.js.
// Ambient: clouds drift, birds glide, the tree and grass sway, and now and then the adventurer locks on to
// the straw dummy and strikes it. On the journey home, on a desktop with a keyboard, the scene becomes
// playable: click it (or Tab to it) and press the space bar. The sun sets, the shop closes and sprout
// monsters rise from the ground. Z locks on to a monster; the arrow keys then circle it (← →), step closer
// (↑) or flip backwards (↓), and the space bar strikes. Without Z a swing only lands when the monster is
// at exactly the same depth, which is the problem the text describes. After five monsters the sun comes up
// and the shop opens again. There is no damage or timer. Sound uses Web Audio, starts only after a key
// press or click and stops with the scene. Nothing is stored.
//
// Actors are plain objects tweened by GSAP and drawn each tick by setting transform attributes, so the
// adventurer, monsters and reticle can scale with depth and be re-ordered back to front.
import { START, DUMMY } from './art.js';

const ARENA = { x: 360, y: 514, rx: 232, ry: 88 }, DEPTH = .45, SPEED = 150, ORBIT = 1.7;
const TOTAL = 5, AT_ONCE = 2, REST = 30;
const CHEERS = ['Raak!', 'Goed gericht!', 'Knap, Alex!', 'Nog eentje!'];
const HINTS = {
  start: 'Klik op het veld en speel mee',
  ready: 'Spatie: laat de nacht vallen · pijltjes: lopen · Esc: stoppen',
  dusk: 'De zon gaat onder… daar komen de monsters!',
  lock: 'Druk op Z om een monster te richten',
  turn: '← → cirkelen · ↑ dichterbij · ↓ terugspringen · spatie: slaan',
  miss: 'Mis! In 3D is diepte lastig. Druk eerst op Z.',
  day: 'Eerst moet het nacht worden: druk op spatie',
  win: 'Gelukt! De zon komt op en de winkel gaat weer open.',
  again: 'Nog een nacht? Druk op spatie',
};
const persp = y => .82 + (y - 410) * .0016;
// Keeps a point inside the arena ellipse.
const inArena = (x, y, k = 1) => {
  const dx = (x - ARENA.x) / (ARENA.rx * k), dy = (y - ARENA.y) / (ARENA.ry * k), d = Math.hypot(dx, dy);
  return d <= 1 ? { x, y } : { x: ARENA.x + dx / d * ARENA.rx * k, y: ARENA.y + dy / d * ARENA.ry * k };
};

export function animate({ gsap, q, random, alive, svg, container }) {
  gsap.from(q('.layer'), { y: 20, opacity: .4, duration: 1.6, stagger: .15, ease: 'power2.out' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 20, duration: 26, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.15, opacity: .2, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.tree'), { rotation: -1.2 }, { rotation: 1.2, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  q('.tuft').forEach(t => gsap.fromTo(t, { skewX: -4 }, { skewX: 4, duration: random(2.5, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 3)));
  q('.bird').forEach((b, i) => gsap.fromTo(b, { x: -40, y: 0 }, { x: 60, y: -12, duration: random(14, 20), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(i * 3));
  q('.star').forEach(s => gsap.fromTo(s, { opacity: .3 }, { opacity: 1, duration: random(1.6, 3.6), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 3)));
  gsap.to(q('.reticle-spin'), { rotation: 360, duration: 12, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });

  const [heroEl] = q('.hero'), [face] = q('.hero-face'), [body] = q('.hero-body'), [sword] = q('.sword'), [swoosh] = q('.swoosh');
  const [ret] = q('.reticle'), [actors] = q('.actors'), [dummyEl] = q('.dummy'), [dummyWrap] = q('.dummy-wrap'), [poofPos] = q('.poof-pos'), [poof] = q('.poof');
  if (!heroEl) return;
  const hero = { x: START.x, y: START.y, face: 1, sword: REST, hop: 0, spin: 0, busy: false };
  const aim = { x: DUMMY.x, y: DUMMY.y - 48, s: 1, o: .95, target: null };
  const mons = q('.mon').map((el, i) => ({ i, el, body: el.querySelector('.mon-body'), mound: el.querySelector('.mound'), x: 0, y: 0, rise: 0, soil: 0, pop: 0, shown: false, active: false, walk: null }));
  const dummySpot = { y: DUMMY.y, el: dummyWrap?.parentNode };

  // Draws every actor from its state and keeps them ordered back to front.
  let order = '';
  const render = time => {
    const s = persp(hero.y);
    heroEl.setAttribute('transform', `translate(${hero.x.toFixed(1)} ${hero.y.toFixed(1)}) scale(${s.toFixed(3)})`);
    face.setAttribute('transform', `scale(${hero.face} 1)`);
    body.setAttribute('transform', `translate(0 ${hero.hop.toFixed(1)}) rotate(${hero.spin.toFixed(1)} 0 -48)`);
    sword?.setAttribute('transform', `rotate(${hero.sword.toFixed(1)})`);
    mons.forEach(m => {
      if (!m.shown) { m.el.setAttribute('opacity', 0); return; }
      const bob = m.rise >= 1 ? Math.sin(time * 4 + m.i * 2) * 1.6 : 0, k = persp(m.y) * (1 + m.pop * .5);
      m.el.setAttribute('opacity', (1 - m.pop).toFixed(2));
      m.el.setAttribute('transform', `translate(${m.x.toFixed(1)} ${m.y.toFixed(1)}) scale(${k.toFixed(3)})`);
      m.body.setAttribute('transform', `translate(0 ${bob.toFixed(1)}) scale(${(.3 + .7 * m.rise).toFixed(3)} ${Math.max(m.rise, .001).toFixed(3)})`);
      m.mound.setAttribute('transform', `scale(${Math.max(m.soil, .001).toFixed(3)})`);
    });
    if (aim.target) Object.assign(aim, { x: aim.target.x, y: aim.target.y - 30 * persp(aim.target.y) });
    ret.setAttribute('transform', `translate(${aim.x.toFixed(1)} ${aim.y.toFixed(1)}) scale(${aim.s.toFixed(3)})`);
    ret.setAttribute('opacity', aim.o.toFixed(2));
    const list = [{ y: hero.y, el: heroEl.parentNode }, dummySpot, ...mons.filter(m => m.shown).map(m => ({ y: m.y, el: m.el.parentNode }))].sort((a, b) => a.y - b.y);
    const key = list.map(a => [...actors.children].indexOf(a.el)).join();
    if (key !== order) { list.forEach(a => actors.appendChild(a.el)); order = list.map(a => [...actors.children].indexOf(a.el)).join(); }
  };

  // A sword swing: the blade sweeps forward with a white arc, then returns to rest.
  const swing = () => gsap.timeline()
    .fromTo(hero, { sword: -50 }, { sword: 150, duration: .2, ease: 'power2.out' })
    .fromTo(swoosh, { opacity: .9 }, { opacity: 0, duration: .35 }, .05)
    .to(hero, { sword: REST, duration: .35, ease: 'power1.inOut' });

  // The ambient demo: lock on to the dummy, step in, strike, let go and step back.
  let demo = null;
  const practise = () => {
    if (!alive() || state.mode !== 'idle') return;
    demo = gsap.timeline({ onComplete: () => alive() && (demo = gsap.delayedCall(random(6, 10), practise)) })
      .to(hero, { face: 1, duration: 0 })
      .to(aim, { o: .95, s: 1, x: DUMMY.x, y: DUMMY.y - 48, duration: .4, ease: 'back.out(2)', startAt: { s: aim.o > .5 ? 1 : 1.7 } })
      .to(hero, { x: DUMMY.x - 52, y: DUMMY.y + 4, duration: .5, ease: 'power2.inOut' }, '+=.5')
      .add(swing())
      .fromTo(dummyEl, { rotation: 0 }, { rotation: 10, duration: .12, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 100%' }, '-=.4')
      .to(aim, { o: 0, s: 1.4, duration: .4 }, '+=.4')
      .to(hero, { x: START.x, y: START.y, duration: 1.2, ease: 'sine.inOut' }, '-=.2');
  };

  const state = { mode: 'idle', focused: false, keys: { left: false, right: false, up: false, down: false }, beaten: 0, spawned: 0, run: null };
  const tick = (time, dtMs) => {
    if (!alive() || document.body.classList.contains('calm')) return;
    if (state.focused && (state.mode === 'ready' || state.mode === 'night') && !hero.busy) move(Math.min(dtMs / 1000, .05));
    render(time);
  };
  gsap.ticker.add(tick);

  const desktop = container?.classList.contains('hero-art') && matchMedia('(hover: hover) and (pointer: fine) and (min-width: 741px)').matches;
  if (!desktop) {
    demo = gsap.delayedCall(random(2, 3.5), practise);
    return () => gsap.ticker.remove(tick);
  }

  // The game.
  const [hint] = q('.game-hint'), [hintText] = q('.hint-text'), dots = q('.round-dot');
  let later = null;
  const say = (key, then) => {
    hintText.textContent = HINTS[key] ?? key;
    gsap.fromTo(hint, { opacity: .5 }, { opacity: 1, duration: .35, overwrite: 'auto' });
    later?.kill();
    later = then ? gsap.delayedCall(1.6, () => alive() && state.mode === 'night' && say(then())) : null;
  };
  gsap.to(hint, { opacity: 1, duration: .6, delay: 1.2 });
  const progress = () => dots.forEach((d, i) => gsap.to(d, { opacity: state.mode === 'night' || state.mode === 'dawn' ? 1 : 0, fill: i < state.beaten ? '#e8c65a' : '#f7f1df', duration: .3, overwrite: 'auto' }));
  gsap.delayedCall(random(2, 3.5), practise);

  const label = svg.getAttribute('aria-label');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'application');
  svg.setAttribute('aria-label', `${label}. Spel: klik op het veld of ga ernaartoe met Tab en druk op de spatiebalk. Dan wordt het nacht en komen er monsters uit de grond. Druk op Z om een monster te richten, cirkel eromheen met de pijltjestoetsen en sla met de spatiebalk. Stop met Escape.`);

  // Sound: short, soft tones.
  let audio = null;
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
  const tune = (notes, gap = .13, length = .2) => notes.forEach((f, k) => tone(f, k === notes.length - 1 ? length * 2 : length, .07, 'sine', k * gap));

  const live = () => mons.filter(m => m.active);
  const target = () => aim.target;
  const lockOn = m => {
    aim.target = m;
    gsap.fromTo(aim, { s: 1.8, o: 0 }, { s: 1, o: 1, duration: .25, ease: 'back.out(2)', overwrite: 'auto' });
    tune([880, 1174.66], .07, .08);
    say('turn');
  };
  const letGo = () => { aim.target = null; gsap.to(aim, { o: 0, duration: .25, overwrite: 'auto' }); };
  // Z picks the nearest monster first, then cycles through the others.
  const cycle = () => {
    if (state.mode !== 'night') { if (state.mode === 'ready') say('day'); return; }
    const near = live().sort((a, b) => Math.hypot(a.x - hero.x, (a.y - hero.y) / DEPTH) - Math.hypot(b.x - hero.x, (b.y - hero.y) / DEPTH));
    if (!near.length) return;
    lockOn(near[(near.indexOf(target()) + 1) % near.length]);
  };

  // Free walking, or circling the locked monster.
  const move = dt => {
    const { left, right, up, down } = state.keys, m = target();
    let x = hero.x, y = hero.y;
    if (m) {
      const ax = hero.x - m.x, ay = (hero.y - m.y) / DEPTH;
      const a = Math.atan2(ay, ax) - (right - left) * ORBIT * dt, r = gsap.utils.clamp(56, 320, Math.hypot(ax, ay) - up * SPEED * dt);
      x = m.x + Math.cos(a) * r; y = m.y + Math.sin(a) * r * DEPTH;
      hero.face = m.x >= x ? 1 : -1;
    } else {
      x += (right - left) * SPEED * dt; y += (down - up) * SPEED * .6 * dt;
      if (right !== left) hero.face = right ? 1 : -1;
    }
    Object.assign(hero, inArena(x, y));
  };

  // ↓ while locked on: a little back flip away from the monster.
  const flip = () => {
    const m = target();
    if (!m || hero.busy) return;
    hero.busy = true;
    const ax = hero.x - m.x, ay = (hero.y - m.y) / DEPTH, r = Math.hypot(ax, ay) || 1, end = inArena(m.x + ax / r * (r + 80), m.y + ay / r * (r + 80) * DEPTH);
    tone(392, .1, .05);
    gsap.timeline({ onComplete: () => { hero.busy = false; hero.spin = 0; } })
      .to(hero, { x: end.x, y: end.y, duration: .5, ease: 'power1.out' }, 0)
      .to(hero, { hop: -34, duration: .25, ease: 'power2.out', yoyo: true, repeat: 1 }, 0)
      .fromTo(hero, { spin: 0 }, { spin: -360, duration: .5, ease: 'none' }, 0);
  };

  const spawn = () => {
    if (!alive() || state.mode !== 'night' || state.spawned >= TOTAL || live().length >= AT_ONCE) return;
    const m = mons.find(n => !n.shown);
    if (!m) return;
    let spot = null;
    for (let k = 0; k < 30 && !spot; k++) {
      const a = random(0, Math.PI * 2), r = Math.sqrt(random(.15, 1)), p = { x: ARENA.x + Math.cos(a) * r * ARENA.rx * .9, y: ARENA.y + Math.sin(a) * r * ARENA.ry * .9 };
      const far = (o, d) => Math.hypot(p.x - o.x, (p.y - o.y) / DEPTH) > d;
      if (far(hero, 130) && live().every(o => far(o, 100))) spot = p;
    }
    spot ??= { x: hero.x > ARENA.x ? ARENA.x - 160 : ARENA.x + 160, y: ARENA.y };
    Object.assign(m, spot, { rise: 0, soil: 0, pop: 0, shown: true, active: true });
    state.spawned++;
    tone(147, .3, .06, 'sine');
    gsap.timeline().to(m, { soil: 1, duration: .3, ease: 'back.out(2)' }).to(m, { rise: 1, duration: .7, ease: 'back.out(1.6)' }, .15);
    m.walk = gsap.delayedCall(1.2, () => wander(m));
  };
  // Monsters shuffle about a little, never far.
  const wander = m => {
    if (!alive() || !m.active) return;
    const p = inArena(m.x + random(-90, 90), m.y + random(-36, 36), .9);
    m.walk = gsap.to(m, { x: p.x, y: p.y, duration: random(2.2, 3.6), delay: random(.6, 2), ease: 'sine.inOut', onComplete: () => wander(m) });
  };
  const beat = m => {
    m.active = false;
    m.walk?.kill();
    if (target() === m) letGo();
    poofPos.setAttribute('transform', `translate(${m.x.toFixed(1)} ${(m.y - 22).toFixed(1)})`);
    gsap.fromTo(poof, { opacity: 1, scale: .4 }, { opacity: 0, scale: 1.6, duration: .6, ease: 'power2.out', transformOrigin: '50% 50%' });
    gsap.timeline({ onComplete: () => { m.shown = false; } }).to(m, { pop: 1, duration: .35, ease: 'power2.out' }).to(m, { soil: 0, duration: .3 }, .1);
    tune([659.25, 987.77], .06, .1);
    state.beaten++;
    progress();
    if (state.beaten >= TOTAL) { state.run = gsap.delayedCall(.7, win); return; }
    say(CHEERS[state.beaten - 1], () => target() ? 'turn' : 'lock');
    gsap.delayedCall(1, spawn);
  };

  const strike = () => {
    if (hero.busy) return;
    const m = target();
    hero.busy = true;
    const done = () => { hero.busy = false; };
    if (m) {
      // Locked on: dash in along the current angle and always hit.
      const ax = hero.x - m.x, ay = (hero.y - m.y) / DEPTH, r = Math.hypot(ax, ay) || 1, end = inArena(m.x + ax / r * 48, m.y + ay / r * 48 * DEPTH);
      hero.face = m.x >= end.x ? 1 : -1;
      tone(523.25, .08, .05);
      gsap.timeline({ onComplete: done }).to(hero, { x: end.x, y: end.y, duration: .16, ease: 'power2.out' }).add(swing(), .06).call(() => alive() && m.active && beat(m), null, .2);
      return;
    }
    // Not locked on: only a monster right in front and at the same depth gets hit.
    const lucky = live().find(n => { const dx = (n.x - hero.x) * hero.face; return dx > 10 && dx < 84 && Math.abs(n.y - hero.y) < 14; });
    gsap.timeline({ onComplete: done }).add(swing()).call(() => {
      if (!alive()) return;
      if (lucky?.active) { beat(lucky); return; }
      tone(196, .14, .05);
      if (state.mode === 'night') say('miss', () => target() ? 'turn' : 'lock');
    }, null, .15);
  };

  // Day and night. The night: the sun sinks, the sky darkens, the shop closes and the monsters come.
  const sky = (night, duration) => gsap.timeline()
    .to(q('.sun'), { y: night ? 200 : 0, duration, ease: 'sine.inOut' }, 0)
    .to(q('.night'), { opacity: night ? .55 : 0, duration, ease: 'sine.inOut' }, 0)
    .to(q('.stars, .moon'), { opacity: night ? 1 : 0, duration: duration * .8 }, night ? duration * .3 : 0)
    .to(q('.bird'), { opacity: night ? 0 : 1, duration: duration * .5 }, 0)
    .to(q('.home-glow'), { opacity: night ? 1 : 0, duration: duration * .6 }, night ? duration * .4 : 0)
    .fromTo(q('.shutter'), { opacity: 1, scaleY: night ? 0 : 1 }, { scaleY: night ? 1 : 0, duration: .6, ease: 'power2.inOut', transformOrigin: '50% 0%' }, night ? duration * .5 : 0)
    .to(dummyWrap, { opacity: night ? 0 : 1, duration: .6 }, 0);
  const nightfall = () => {
    demo?.kill();
    letGo();
    Object.assign(state, { mode: 'night', beaten: 0, spawned: 0 });
    gsap.to(hero, { sword: REST, spin: 0, hop: 0, duration: .3 });
    progress();
    say('dusk');
    tune([523.25, 392, 329.63, 261.63], .2, .25);
    state.run = gsap.timeline().add(sky(true, 2.4)).call(() => { if (!alive() || state.mode !== 'night') return; spawn(); gsap.delayedCall(.6, spawn); say(target() ? 'turn' : 'lock'); });
  };
  const win = () => {
    if (!alive()) return;
    state.mode = 'dawn';
    letGo();
    say('win');
    tune([523.25, 659.25, 783.99, 1046.5], .16, .3);
    gsap.to(hero, { sword: -10, duration: .4, yoyo: true, repeat: 1, repeatDelay: 1.6 });
    state.run = gsap.timeline({ onComplete: () => { if (!alive()) return; state.mode = state.focused ? 'ready' : 'idle'; progress(); say(state.focused ? 'again' : 'start'); if (state.mode === 'idle') demo = gsap.delayedCall(3, practise); } })
      .add(sky(false, 3.5), .4).to({}, { duration: 1.5 });
  };
  // Leaving in the middle of a night: the monsters sink away and the day returns.
  const stopNight = () => {
    state.run?.kill();
    letGo();
    mons.forEach(m => { if (!m.shown) return; m.active = false; m.walk?.kill(); gsap.to(m, { rise: 0, soil: 0, duration: .5, onComplete: () => { m.shown = false; } }); });
    Object.assign(state, { mode: 'idle', beaten: 0 });
    hero.busy = false;
    sky(false, 1.2);
    progress();
    demo = gsap.delayedCall(4, practise);
  };

  const held = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
  const onKey = e => {
    if (e.key === 'Escape') { svg.blur(); return; }
    const isZ = e.key === 'z' || e.key === 'Z', isSpace = e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter';
    if (!isZ && !isSpace && !(e.key in held)) return;
    e.preventDefault();
    if (e.key in held) {
      const down = e.type === 'keydown';
      if (down && !e.repeat && e.key === 'ArrowDown' && target()) flip();
      state.keys[held[e.key]] = down;
      return;
    }
    if (e.type !== 'keydown' || e.repeat) return;
    wake();
    if (isZ) { cycle(); return; }
    if (state.mode === 'ready') nightfall();
    else if (state.mode === 'night') strike();
  };
  const onFocus = () => {
    state.focused = true;
    if (state.mode !== 'idle') return;
    demo?.kill();
    gsap.to(dummyEl, { rotation: 0, duration: .2 });
    gsap.to(aim, { o: 0, duration: .3, overwrite: 'auto' });
    gsap.to(hero, { sword: REST, spin: 0, hop: 0, duration: .3 });
    state.mode = 'ready';
    say('ready');
  };
  const onBlur = () => {
    state.focused = false;
    Object.keys(state.keys).forEach(k => { state.keys[k] = false; });
    if (state.mode === 'dawn') return;
    if (state.mode === 'night') stopNight();
    else { state.mode = 'idle'; demo?.kill(); demo = gsap.delayedCall(3, practise); }
    say('start');
  };
  const onPointer = e => {
    svg.focus({ preventScroll: true });
    wake();
    const m = mons[e.target.closest?.('[data-mon]')?.dataset.mon];
    if (m?.active && state.mode === 'night') lockOn(m);
  };
  svg.addEventListener('keydown', onKey);
  svg.addEventListener('keyup', onKey);
  svg.addEventListener('focus', onFocus);
  svg.addEventListener('blur', onBlur);
  svg.addEventListener('pointerdown', onPointer);

  return () => {
    gsap.ticker.remove(tick);
    svg.removeEventListener('keydown', onKey);
    svg.removeEventListener('keyup', onKey);
    svg.removeEventListener('focus', onFocus);
    svg.removeEventListener('blur', onBlur);
    svg.removeEventListener('pointerdown', onPointer);
    svg.removeAttribute('tabindex');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
    audio?.close().catch(() => {});
    audio = null;
  };
}
