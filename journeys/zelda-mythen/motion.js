// Zelda-mythen hero choreography and the sword-in-the-stone game. Runs inside animateScene() from /motion.js.
// Ambient: light rays breathe, leaves fall, nature spirits drift up, the canopies sway and the fairy hovers
// beside the adventurer. Now and then the adventurer walks up and tugs at the sword, which does not move.
// On the journey home, on a desktop with a keyboard, the scene becomes playable: click it (or Tab to it)
// and the adventurer takes hold of the sword. A golden ring shrinks towards a dotted ring around the hilt;
// pressing the space bar as they meet is a good pull. Each good pull lifts the sword a little and lights
// one piece of the Triforce (Kracht, Wijsheid, Moed). After three, the sword floats free and the hero holds
// it up high; then it sinks back into the stone for another go. A miss only rattles the sword: there is
// no score, timer or way to lose. Sound uses Web Audio, starts only after a key press or click and stops
// with the scene. Nothing is stored.
//
// Actors are plain objects tweened by GSAP and drawn each tick by setting attributes, so the hands can
// stay on the sword's grip while it moves.
import { S, HOME, SPOT, SWORD, STONE_Y, SHOULDERS, REST, PIECE_FILL, PIECE_LIT, armPath } from './art.js';

const R0 = 96, R1 = 12, TARGET = 36, RISE = 7;
const TRIES = [{ period: 1.9, tol: 9 }, { period: 1.65, tol: 8 }, { period: 1.45, tol: 7 }];
const HINTS = {
  start: 'Klik op het bos en probeer het zwaard te trekken',
  walk: 'Op naar het zwaard…',
  pull: 'Spatie als de gouden ring op de stippellijn ligt · Esc: stoppen',
  miss: 'Net mis! Wacht tot de ring precies op de stippellijn ligt.',
  hits: ['Kracht! Nog twee keer.', 'Wijsheid! Nog één keer.', 'Moed! Het zwaard komt los…'],
  win: 'Gelukt, Alex! Jij bent de uitverkoren held.',
  again: 'Het zwaard is terug in de steen. Nog een keer?',
};

export function animate({ gsap, q, random, alive, svg, container }) {
  gsap.from(q('.layer'), { y: 20, opacity: .4, duration: 1.6, stagger: .15, ease: 'power2.out' });
  q('.ray').forEach((r, i) => gsap.to(r, { opacity: .08, duration: random(4, 7), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i }));
  gsap.fromTo(q('.tri-glow'), { scale: 1, opacity: .55 }, { scale: 1.1, opacity: .3, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  q('.canopy').forEach((c, i) => gsap.fromTo(c, { rotation: -.8 }, { rotation: .8, duration: 7 + i, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }));
  q('.tuft').forEach(t => gsap.fromTo(t, { skewX: -4 }, { skewX: 4, duration: random(2.5, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 3)));
  q('.spirit').forEach(s => gsap.to(s, { keyframes: [{ y: 0, x: 0, opacity: 0, duration: 0 }, { y: -30, x: 6, opacity: .9, duration: 2 }, { y: -70, x: -4, opacity: 0, duration: 2.5 }], repeat: -1, ease: 'sine.inOut', repeatDelay: random(0, 2) }).seek(random(0, 4)));
  q('.leaf').forEach(l => gsap.to(l, { keyframes: [{ y: 0, x: 0, rotation: 0, opacity: 0, duration: 0 }, { y: 140, x: 24, rotation: 120, opacity: .9, duration: 4 }, { y: 300, x: -12, rotation: 260, opacity: 0, duration: 4.5 }], repeat: -1, ease: 'none', repeatDelay: random(1, 4), transformOrigin: '50% 50%' }).seek(random(0, 8)));
  gsap.to(q('.wing'), { scaleY: .45, duration: .12, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.fairy-glow'), { scale: .9 }, { scale: 1.25, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });

  const [heroEl] = q('.hero'), [body] = q('.hero-body'), [swordEl] = q('.sword'), [swordGlow] = q('.sword-glow'), [fairyEl] = q('.fairy');
  const arms = [q('.arm-back')[0], q('.arm-front')[0]], hands = [q('.arm-back-hand')[0], q('.arm-front-hand')[0]];
  const [ringG] = q('.ring-g'), [ringEl] = q('.ring'), [flash] = q('.ring-flash'), [burst] = q('.burst'), [burstRays] = q('.burst-rays');
  const pieces = q('.tri-piece'), words = q('.tri-label'), dust = q('.dust circle');
  if (!heroEl || !swordEl) return;

  const hero = { x: HOME.x, y: HOME.y, face: 1, grab: 0, hop: 0 };
  const sword = { x: SWORD.x, y: SWORD.y, a: 0, wig: 0 };
  const fairy = { x: HOME.x + 40, y: HOME.y - 150 };
  const ring = { o: 0, phase: 0 };
  const state = { mode: 'idle', focused: false, stage: 0, cool: 0, run: null };

  let ringShown = false;
  // Draws every actor from its state; the hands blend from their resting place to the sword's grip.
  const render = (time, dt) => {
    heroEl.setAttribute('transform', `translate(${hero.x.toFixed(1)} ${hero.y.toFixed(1)}) scale(${(S * hero.face).toFixed(3)} ${S})`);
    body.setAttribute('transform', `translate(0 ${hero.hop.toFixed(2)})`);
    swordEl.setAttribute('transform', `rotate(${sword.wig.toFixed(2)} ${SWORD.x} ${STONE_Y}) translate(${sword.x.toFixed(1)} ${sword.y.toFixed(1)}) rotate(${sword.a.toFixed(1)})`);
    const rad = sword.a * Math.PI / 180, gx = (sword.x - hero.x) / (S * hero.face), gy = (sword.y - hero.y) / S - hero.hop;
    const ux = Math.sin(rad) * 5 / S * hero.face, uy = -Math.cos(rad) * 5 / S;
    [[gx - ux, gy - uy], [gx + ux, gy + uy]].forEach(([tx, ty], k) => {
      const hx = REST[k][0] + (tx - REST[k][0]) * hero.grab, hy = REST[k][1] + (ty - REST[k][1]) * hero.grab;
      arms[k].setAttribute('d', armPath(SHOULDERS[k], [hx, hy]));
      hands[k].setAttribute('cx', hx.toFixed(1));
      hands[k].setAttribute('cy', hy.toFixed(1));
    });
    // The fairy hovers by the hero's head, or circles the sword while it is held up high.
    const circling = state.mode === 'win';
    const tx = circling ? sword.x + Math.cos(time * 2.6) * 46 : hero.x + 40 * hero.face + Math.sin(time * 1.3) * 10;
    const ty = circling ? sword.y - 40 + Math.sin(time * 2.6) * 16 : hero.y - 150 + Math.sin(time * 2.1) * 7;
    const k = Math.min(1, dt * 2.5);
    fairy.x += (tx - fairy.x) * k; fairy.y += (ty - fairy.y) * k;
    fairyEl.setAttribute('transform', `translate(${fairy.x.toFixed(1)} ${fairy.y.toFixed(1)})`);
    if (ring.o > 0 || ringShown) {
      ringShown = ring.o > 0;
      const f = ring.phase % 1;
      ringG.setAttribute('transform', `translate(${sword.x.toFixed(1)} ${(sword.y + 8).toFixed(1)})`);
      ringG.setAttribute('opacity', ring.o.toFixed(2));
      ringEl.setAttribute('r', (R0 - (R0 - R1) * f).toFixed(1));
      ringEl.setAttribute('opacity', Math.max(0, Math.min(1, f / .1, (1 - f) / .15)).toFixed(2));
    }
  };

  const tick = (time, dtMs) => {
    if (!alive() || document.body.classList.contains('calm')) return;
    const dt = Math.min(dtMs / 1000, .05);
    if (state.mode === 'pull') ring.phase += dt / TRIES[state.stage].period;
    render(time, dt);
  };
  gsap.ticker.add(tick);

  // Walking: a little bounce in each step.
  const walkTo = (x, y, face) => {
    const d = Math.hypot(x - hero.x, y - hero.y), duration = Math.max(.3, d / 110);
    return gsap.timeline()
      .set(hero, { face })
      .to(hero, { x, y, duration, ease: 'sine.inOut' })
      .to(hero, { hop: -3, duration: .16, ease: 'sine.out', yoyo: true, repeat: Math.max(1, Math.round(duration / .16) - 1) }, 0)
      .set(hero, { hop: 0 });
  };
  const approach = () => gsap.timeline().to(hero, { grab: 0, duration: .2 }).add(walkTo(SPOT.x, SPOT.y, 1)).to(hero, { grab: 1, duration: .3, ease: 'power2.out' });
  const retreat = () => gsap.timeline().to(hero, { grab: 0, duration: .25 }).add(walkTo(HOME.x, HOME.y, -1)).set(hero, { face: 1 });
  const rattle = (size = 2.5) => gsap.fromTo(sword, { wig: -size }, { wig: 0, duration: .6, ease: 'elastic.out(1, .3)' });
  const tug = () => gsap.timeline().to(hero, { x: SPOT.x - 5, duration: .14, ease: 'power2.out', yoyo: true, repeat: 1 });

  // The ambient demo: walk up, tug twice, let go and walk back.
  let demo = null;
  const practise = () => {
    if (!alive() || state.mode !== 'idle' || state.focused) return;
    demo = gsap.timeline({ onComplete: () => alive() && (demo = gsap.delayedCall(random(6, 10), practise)) })
      .add(approach())
      .add(tug(), '+=.3').add(rattle(2), '<')
      .add(tug(), '+=.4').add(rattle(2), '<')
      .to(hero, { hop: -4, duration: .3, yoyo: true, repeat: 1 }, '+=.4')
      .add(retreat(), '+=.3');
  };

  const desktop = container?.classList.contains('hero-art') && matchMedia('(hover: hover) and (pointer: fine) and (min-width: 741px)').matches;
  demo = gsap.delayedCall(random(2, 3.5), practise);
  if (!desktop) return () => gsap.ticker.remove(tick);

  // The game.
  const [hint] = q('.game-hint'), [hintText] = q('.hint-text');
  let later = null;
  const say = (text, then) => {
    hintText.textContent = text;
    gsap.fromTo(hint, { opacity: .5 }, { opacity: 1, duration: .35, overwrite: 'auto' });
    later?.kill();
    later = then ? gsap.delayedCall(1.8, () => alive() && state.mode === 'pull' && say(then)) : null;
  };
  gsap.to(hint, { opacity: 1, duration: .6, delay: 1.2 });

  const label = svg.getAttribute('aria-label');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'application');
  svg.setAttribute('aria-label', `${label}. Spel: klik op het bos of ga ernaartoe met Tab. De held pakt het zwaard vast en er krimpt een gouden ring rond het handvat. Druk op de spatiebalk als de ring precies op de stippellijn ligt. Na drie goede rukken komt het zwaard los. Stop met Escape.`);

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

  // The Triforce pieces light up one by one and dim together.
  const light = k => {
    gsap.to(pieces[k], { fill: PIECE_LIT, duration: .4, overwrite: 'auto' });
    gsap.fromTo(pieces[k], { scale: 1.15 }, { scale: 1, duration: .5, ease: 'back.out(2)', transformOrigin: '50% 50%' });
    gsap.to(words[k], { opacity: 1, duration: .4, overwrite: 'auto' });
  };
  const dim = () => {
    gsap.to(pieces, { fill: PIECE_FILL, scale: 1, duration: .6, overwrite: 'auto' });
    gsap.to(words, { opacity: 0, duration: .6, overwrite: 'auto' });
  };
  const puff = () => dust.forEach((d, i) => gsap.fromTo(d, { x: 0, y: 0, opacity: .9 }, { x: (i - 2) * 12, y: -8 - (i % 2) * 10, opacity: 0, duration: .7, ease: 'power2.out' }));

  const beginPull = fresh => {
    if (!alive()) return;
    Object.assign(state, { mode: 'pull', stage: 0, cool: 0 });
    ring.phase = 0;
    gsap.to(ring, { o: 1, duration: .3, overwrite: 'auto' });
    say(fresh ? HINTS.pull : HINTS.again, fresh ? null : HINTS.pull);
  };

  const hit = () => {
    const k = state.stage++;
    light(k);
    tune([[523.25, 659.25], [587.33, 739.99], [659.25, 830.61]][k], .08, .12);
    gsap.fromTo(flash, { opacity: .9, scale: 1 }, { opacity: 0, scale: 1.5, duration: .5, ease: 'power2.out', transformOrigin: '50% 50%' });
    tug(); rattle(3); puff();
    gsap.to(sword, { y: SWORD.y - RISE * state.stage, duration: .4, ease: 'back.out(2)' });
    ring.phase = 0;
    if (state.stage < TRIES.length) { say(HINTS.hits[k], HINTS.pull); return; }
    state.mode = 'win';
    gsap.to(ring, { o: 0, duration: .3, overwrite: 'auto' });
    say(HINTS.hits[k]);
    state.run = gsap.delayedCall(.7, win);
  };
  const miss = () => {
    tone(196, .14, .05);
    rattle(2);
    ring.phase = 0;
    say(HINTS.miss, HINTS.pull);
  };
  const attempt = () => {
    if (state.mode !== 'pull' || gsap.ticker.time < state.cool) return;
    state.cool = gsap.ticker.time + .35;
    const r = R0 - (R0 - R1) * (ring.phase % 1);
    if (Math.abs(r - TARGET) <= TRIES[state.stage].tol) hit(); else miss();
  };

  // Three good pulls: the sword floats free, turns and lands in the hero's raised hands.
  const win = () => {
    if (!alive()) return;
    say(HINTS.win);
    const held = { x: SPOT.x + 8 * S, y: SPOT.y - 104 * S };
    state.run = gsap.timeline({ onComplete: settle })
      .to(hero, { grab: 0, duration: .25 })
      .to(swordGlow, { opacity: .85, duration: .5 }, 0)
      .call(() => { puff(); tone(261.63, .3, .05, 'sine'); }, null, .1)
      .to(sword, { y: SWORD.y - 130, duration: 1.1, ease: 'power2.inOut' }, .1)
      .call(() => {
        if (!alive()) return;
        tune([392, 523.25, 659.25, 783.99, 1046.5], .12, .25);
        burst.setAttribute('transform', `translate(${sword.x.toFixed(1)} ${(sword.y + 56).toFixed(1)})`);
        gsap.fromTo(burst, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: 'power1.in' });
        gsap.fromTo(burstRays, { scale: .3, rotation: 0 }, { scale: 1.4, rotation: 20, duration: 1.2, ease: 'power2.out', transformOrigin: '50% 50%' });
        gsap.to(pieces, { fill: '#f2d36b', duration: .4, yoyo: true, repeat: 3 });
        gsap.fromTo(q('.triforce'), { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'elastic.out(1, .4)', transformOrigin: '50% 50%' });
      })
      .to(sword, { a: 180, x: held.x, y: held.y, duration: .9, ease: 'power2.inOut' })
      .to(hero, { grab: 1, duration: .3 }, '-=.3')
      .to(hero, { hop: -6, duration: .25, ease: 'power2.out', yoyo: true, repeat: 3 }, '<')
      .to({}, { duration: 2.4 });
  };
  // Afterwards the sword turns back and sinks into the stone for another go.
  const settle = () => {
    if (!alive()) return;
    state.run = gsap.timeline({ onComplete: () => {
      if (!alive()) return;
      if (state.focused) gsap.to(hero, { grab: 1, duration: .3, onComplete: () => state.focused && state.mode === 'settle' && beginPull(false) });
      else idle();
    } })
      .call(() => { state.mode = 'settle'; })
      .to(hero, { grab: 0, duration: .3 })
      .to(sword, { a: 0, x: SWORD.x, y: SWORD.y - 130, duration: .8, ease: 'power2.inOut' })
      .to(sword, { y: SWORD.y, duration: .6, ease: 'power2.in' })
      .call(() => { puff(); rattle(1.5); tone(130.81, .25, .06, 'sine'); dim(); })
      .to(swordGlow, { opacity: 0, duration: .5 }, '<');
  };

  // Leaving: let go of the sword, put it back and walk home.
  const idle = () => {
    state.run?.kill();
    later?.kill();
    Object.assign(state, { mode: 'idle', stage: 0 });
    gsap.to(ring, { o: 0, duration: .3, overwrite: 'auto' });
    gsap.to(sword, { x: SWORD.x, y: SWORD.y, a: 0, wig: 0, duration: .5, overwrite: 'auto' });
    gsap.to(swordGlow, { opacity: 0, duration: .4 });
    dim();
    say(HINTS.start);
    state.run = retreat().call(() => alive() && !state.focused && (demo = gsap.delayedCall(random(4, 7), practise)));
  };

  const onKey = e => {
    if (e.key === 'Escape') { svg.blur(); return; }
    if (e.key !== ' ' && e.key !== 'Spacebar' && e.key !== 'Enter') return;
    e.preventDefault();
    if (e.repeat) return;
    wake();
    attempt();
  };
  const onFocus = () => {
    state.focused = true;
    if (state.mode !== 'idle') return;
    demo?.kill();
    state.run?.kill();
    state.mode = 'walk';
    say(HINTS.walk);
    gsap.to(sword, { wig: 0, y: SWORD.y, duration: .2, overwrite: 'auto' });
    state.run = approach().call(() => state.mode === 'walk' && state.focused && beginPull(true));
  };
  const onBlur = () => {
    state.focused = false;
    if (state.mode === 'win' || state.mode === 'settle') { say(HINTS.start); return; }
    if (state.mode === 'pull' || state.mode === 'walk') { idle(); return; }
    say(HINTS.start);
  };
  const onPointer = () => { svg.focus({ preventScroll: true }); wake(); };
  svg.addEventListener('keydown', onKey);
  svg.addEventListener('focus', onFocus);
  svg.addEventListener('blur', onBlur);
  svg.addEventListener('pointerdown', onPointer);

  return () => {
    gsap.ticker.remove(tick);
    svg.removeEventListener('keydown', onKey);
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
