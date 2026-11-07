// Ocarina hero choreography and the melody game. Runs inside animateScene() from /motion.js.
// Ambient: stars twinkle, fireflies wander, notes drift up, the tree sways and the ocarina floats.
// Without the game (chapter 1, touch screens, narrow windows) the ocarina now and then plays a silent
// little tune by itself. On the journey home, on a desktop with a keyboard, it becomes playable: click
// it (or Tab to it), press the space bar and play the tune back with the arrow keys or by clicking the
// holes. Each round adds a note; after five rounds the sun comes up. A wrong note simply replays the
// same tune, so there is no pressure. Sound uses Web Audio, starts only after a key press or click and
// stops with the scene. Nothing is stored.
const NOTES = [523.25, 587.33, 659.25, 783.99]; // holes 0–3 (left, down, up, right): C5 D5 E5 G5
const FANFARE = [523.25, 659.25, 783.99, 1046.5];
const KEYS = { ArrowLeft: 0, ArrowDown: 1, ArrowUp: 2, ArrowRight: 3 };
const ROUNDS = 5, FIRST = 3; // the tune grows from 3 to 7 notes
const CHEERS = ['Mooi zo!', 'Goed geluisterd!', 'Knap, Alex!', 'Nog één ronde!'];
const HINTS = {
  start: 'Klik op de ocarina en speel de melodie na',
  ready: 'Druk op spatie om te beginnen · Esc stoppen',
  turn: 'Jouw beurt! Speel hem na met ← ↑ ↓ →',
  oops: 'Bijna! Luister nog een keer…',
  win: 'Prachtig gespeeld! Kijk, de zon komt op.',
  again: 'Nog een keer? Druk op spatie',
};

export function animate({ gsap, q, random, alive, svg, container }) {
  gsap.from(q('.layer'), { y: 20, opacity: .4, duration: 1.6, stagger: .15, ease: 'power2.out' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 20, duration: 26, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .35 }, { scale: 1.18, opacity: .15, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.shine'), { x: -10, opacity: .2 }, { x: 10, opacity: .7, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.tree'), { rotation: -1.2 }, { rotation: 1.2, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  q('.tuft').forEach(t => gsap.fromTo(t, { skewX: -4 }, { skewX: 4, duration: random(2.5, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 3)));
  q('.star').forEach(s => gsap.fromTo(s, { opacity: .2 }, { opacity: .9, duration: random(1.6, 3.6), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 3)));
  q('.firefly').forEach(f => {
    gsap.to(f, { keyframes: [{ x: random(-30, 30), y: random(-24, 8), duration: random(3, 5) }, { x: random(-30, 30), y: random(-8, 24), duration: random(3, 5) }, { x: 0, y: 0, duration: random(3, 5) }], ease: 'sine.inOut', repeat: -1 });
    gsap.fromTo(f, { opacity: .3 }, { opacity: 1, duration: random(1, 2.2), ease: 'sine.inOut', repeat: -1, yoyo: true });
  });
  q('.note').forEach(n => gsap.to(n, { keyframes: [{ y: 20, opacity: 0, duration: 0 }, { y: -10, opacity: .9, duration: 2 }, { y: -60, opacity: 0, duration: 3 }], repeat: -1, ease: 'none' }).seek(random(0, 5)));
  gsap.fromTo(q('.ocarina'), { y: -5 }, { y: 5, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.oc-shadow'), { scaleX: .94, opacity: .28 }, { scaleX: 1.04, opacity: .4, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });

  const [ocarina] = q('.ocarina');
  if (!ocarina) return;
  const holes = [0, 1, 2, 3].map(i => ({ glow: q(`.hole-glow-${i}, .hole-light-${i}`), fx: q(`.fx-${i}`) }));
  // Lights one hole: it glows, a note floats up and the ocarina gives a tiny pulse.
  const light = i => {
    gsap.fromTo(holes[i].glow, { opacity: .95 }, { opacity: 0, duration: .55, ease: 'power2.in', overwrite: 'auto' });
    gsap.fromTo(holes[i].fx, { x: 0, y: 0, opacity: 1 }, { x: random(-16, 16), y: -96, opacity: 0, duration: 1.4, ease: 'sine.out', overwrite: 'auto' });
    gsap.fromTo(ocarina, { scale: 1.025 }, { scale: 1, duration: .35, ease: 'power2.out', transformOrigin: '50% 50%' });
  };

  const desktop = container?.classList.contains('hero-art') && matchMedia('(hover: hover) and (pointer: fine) and (min-width: 741px)').matches;
  if (!desktop) {
    // No game here: the ocarina plays a short, silent tune by itself now and then.
    const tune = () => {
      if (!alive()) return;
      const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(7, 12), tune) });
      for (let k = 0, n = random(3, 5, 1); k < n; k++) tl.call(() => alive() && light(random(0, 3, 1)), null, k * .55);
      tl.to({}, { duration: .8 });
    };
    gsap.delayedCall(random(2.5, 4), tune);
    return;
  }

  // The melody game.
  const [hint] = q('.game-hint'), [hintText] = q('.hint-text'), dots = q('.round-dot');
  const say = key => { hintText.textContent = HINTS[key] ?? key; gsap.fromTo(hint, { opacity: .5 }, { opacity: 1, duration: .35, overwrite: 'auto' }); };
  gsap.to(q('.key-mark'), { opacity: .9, duration: .8, delay: 1 });
  gsap.to(hint, { opacity: 1, duration: .6, delay: 1.2 });

  const label = svg.getAttribute('aria-label');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'application');
  svg.setAttribute('aria-label', `${label}. Spel: klik op de ocarina of ga ernaartoe met Tab en druk op de spatiebalk. Luister naar de melodie en speel hem na met de pijltjestoetsen. Elke ronde komt er een noot bij. Stop met Escape.`);

  // Sound: a soft, ocarina-like tone (a sine with a quiet overtone and a little vibrato).
  let audio = null;
  const wake = () => {
    try { audio ??= new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended') audio.resume().catch(() => {}); } catch { audio = null; }
  };
  const tone = (freq, length = .42, volume = .09) => {
    if (!audio || audio.state === 'closed' || !alive()) return;
    const t = audio.currentTime, out = audio.createGain(), body = audio.createOscillator(), breath = audio.createOscillator(), breathGain = audio.createGain(), vibrato = audio.createOscillator(), depth = audio.createGain();
    body.frequency.value = freq;
    breath.type = 'triangle'; breath.frequency.value = freq * 2; breathGain.gain.value = .08;
    vibrato.frequency.value = 5; depth.gain.value = freq * .006;
    vibrato.connect(depth).connect(body.frequency);
    body.connect(out); breath.connect(breathGain).connect(out); out.connect(audio.destination);
    out.gain.setValueAtTime(0, t);
    out.gain.linearRampToValueAtTime(volume, t + .04);
    out.gain.setTargetAtTime(0, t + length, .07);
    [body, breath, vibrato].forEach(o => { o.start(t); o.stop(t + length + .5); });
  };
  const play = i => { light(i); tone(NOTES[i]); };

  // Modes: idle (not focused), ready (space starts, arrows play freely), listen (the ocarina plays),
  // turn (the player repeats the tune), wait (between rounds) and won (the sunrise; arrows play freely).
  const state = { mode: 'idle', focused: false, tune: [], round: 0, step: 0, run: null };
  const stop = () => { state.run?.kill(); state.run = null; };
  const progress = () => dots.forEach((d, i) => gsap.to(d, { opacity: state.mode === 'idle' ? 0 : 1, fill: i < state.round ? '#e8c65a' : '#f7f1df', duration: .3, overwrite: 'auto' }));
  // A random tune that never repeats the same note three times in a row.
  const newTune = () => {
    const tune = [];
    while (tune.length < FIRST + ROUNDS - 1) { const n = random(0, 3, 1); if (n !== tune.at(-1) || n !== tune.at(-2)) tune.push(n); }
    return tune;
  };
  // The ocarina plays the start of the tune, one note longer each round; then it is the player's turn.
  const listen = () => {
    if (!alive()) return;
    stop();
    Object.assign(state, { mode: 'listen', step: 0 });
    const gap = .6 - state.round * .03;
    say(`Ronde ${state.round + 1} van ${ROUNDS}: luister goed…`);
    state.run = gsap.timeline({ delay: .8, onComplete: () => { if (!alive()) return; state.mode = 'turn'; say('turn'); } });
    state.tune.slice(0, FIRST + state.round).forEach((n, k) => state.run.call(() => alive() && play(n), null, k * gap));
    state.run.to({}, { duration: .45 });
  };
  const begin = () => { Object.assign(state, { tune: newTune(), round: 0 }); progress(); listen(); };
  const oops = i => {
    state.mode = 'wait';
    light(i);
    tone(330, .16, .06);
    gsap.delayedCall(.16, () => tone(262, .34, .06));
    gsap.fromTo(ocarina, { rotation: -5 }, { rotation: 0, duration: .8, ease: 'elastic.out(1.2, .3)', transformOrigin: '50% 50%' });
    say('oops');
    state.run = gsap.delayedCall(1.6, listen);
  };
  // Five rounds: a little fanfare, the sun rises and the sky warms, then evening returns.
  const win = () => {
    if (!alive()) return;
    state.mode = 'won';
    say('win');
    FANFARE.forEach((freq, k) => gsap.delayedCall(k * .16, () => { if (!alive()) return; light(k); tone(freq, k === 3 ? 1.1 : .3); }));
    state.run = gsap.timeline({ onComplete: () => { if (!alive()) return; Object.assign(state, { round: 0, mode: state.focused ? 'ready' : 'idle' }); progress(); say(state.focused ? 'again' : 'start'); } })
      .to(q('.sun'), { y: -190, duration: 4, ease: 'sine.out' }, .5)
      .to(q('.dawn'), { opacity: .65, duration: 3.5, ease: 'sine.inOut' }, .5)
      .to(q('.stars, .moon'), { opacity: 0, duration: 2.5 }, .5)
      .to(q('.sun'), { y: 0, duration: 3.5, ease: 'sine.inOut' }, 7)
      .to(q('.dawn'), { opacity: 0, duration: 3.5, ease: 'sine.inOut' }, 7)
      .to(q('.stars, .moon'), { opacity: 1, duration: 3 }, 7.5);
  };
  const press = i => {
    if (state.mode === 'listen' || state.mode === 'wait') return;
    if (state.mode !== 'turn') { play(i); return; }
    if (i !== state.tune[state.step]) { oops(i); return; }
    play(i);
    if (++state.step < FIRST + state.round) return;
    state.round++;
    state.mode = 'wait';
    progress();
    if (state.round === ROUNDS) { state.run = gsap.delayedCall(.5, win); return; }
    say(CHEERS[state.round - 1]);
    state.run = gsap.delayedCall(1.3, listen);
  };

  const onKey = e => {
    if (e.key === 'Escape') { svg.blur(); return; }
    const isStart = e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter';
    if (!isStart && !(e.key in KEYS)) return;
    e.preventDefault();
    if (e.repeat) return;
    wake();
    if (isStart) { if (state.mode === 'ready') begin(); return; }
    press(KEYS[e.key]);
  };
  const onFocus = () => {
    state.focused = true;
    if (state.mode === 'idle') { state.mode = 'ready'; progress(); say('ready'); }
  };
  // Leaving stops a game in progress; a sunrise that has started plays out first.
  const onBlur = () => {
    state.focused = false;
    if (state.mode === 'won') return;
    stop();
    Object.assign(state, { mode: 'idle', round: 0 });
    progress();
    say('start');
  };
  const onPointer = e => {
    svg.focus({ preventScroll: true });
    wake();
    const hole = e.target.closest?.('[data-hole]');
    if (hole) press(Number(hole.dataset.hole));
  };
  svg.addEventListener('keydown', onKey);
  svg.addEventListener('focus', onFocus);
  svg.addEventListener('blur', onBlur);
  svg.addEventListener('pointerdown', onPointer);

  return () => {
    stop();
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
