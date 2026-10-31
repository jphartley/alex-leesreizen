// Pokémon-mythes hero choreography and the Dragon Gate game. Runs inside animateScene() from /motion.js.
// Ambient: foam falls, snow drifts over the peaks, the fox sways its tails and the thunder god drums now
// and then. On the journey home, on a desktop with a keyboard, the carp becomes playable: click the
// scene, steer with the arrow keys and leap with the space bar. Touching a rock or the surge sends the
// carp tumbling back to the pool, so the climb has to be a clean run; reaching the gate turns it into a
// dragon that flies across the sky before the carp returns. The hint pill hides while a run is going.
const START = { x: 360, y: 662 }, LANE = { left: 318, right: 402 }, GATE_Y = 150, SURGE = { x: 360, y: 290, rx: 32, ry: 9 };
const GRAVITY = 620, LEAP = -300, FALL_MAX = 320, SPEED = 160, LEAP_GAP = .28;

export function animate({ gsap, q, random, alive, svg, container }) {
  gsap.from(q('.layer'), { y: 20, opacity: .4, duration: 1.6, stagger: .15, ease: 'power2.out' });
  gsap.fromTo(q('.cloud'), { x: -14 }, { x: 18, duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.foam').forEach(f => gsap.to(f, { keyframes: [{ y: -30, opacity: 0, duration: 0 }, { y: 20, opacity: .7, duration: .5 }, { y: 90, opacity: 0, duration: .9 }], repeat: -1, ease: 'none' }).seek(random(0, 1.4)));
  q('.flake').forEach(f => gsap.to(f, { keyframes: [{ y: 0, x: 0, opacity: 0, duration: 0 }, { y: 30, x: 6, opacity: .9, duration: 1.5 }, { y: 90, x: -6, opacity: 0, duration: 2.5 }], repeat: -1, ease: 'none' }).seek(random(0, 4)));
  gsap.fromTo(q('.mist'), { opacity: .35, scaleX: 1 }, { opacity: .7, scaleX: 1.15, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  q('.tail').forEach((t, i) => gsap.fromTo(t, { rotation: -3 }, { rotation: 3, duration: random(2.5, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(i * .3));
  gsap.fromTo(q('.storm'), { y: -5 }, { y: 5, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.surge'), { x: -58 }, { x: 58, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.carp'), { y: -3 }, { y: 3, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true });

  // Thunder: the drums glow one after another, the bolt flickers and the cloud shakes.
  const thunder = () => {
    if (!alive()) return;
    gsap.timeline({ onComplete: () => gsap.delayedCall(random(9, 16), thunder) })
      .to(q('.drum-glow'), { opacity: .6, duration: .15, stagger: .08, yoyo: true, repeat: 1 }, 0)
      .fromTo(q('.bolt'), { opacity: 0 }, { opacity: 1, duration: .08, repeat: 3, yoyo: true }, .3)
      .to(q('.storm'), { x: 3, duration: .06, repeat: 5, yoyo: true }, .3).set(q('.storm'), { x: 0 });
  };
  gsap.delayedCall(5, thunder);

  const [carpPos] = q('.carp-pos');
  const desktop = container?.classList.contains('hero-art') && matchMedia('(hover: hover) and (pointer: fine) and (min-width: 741px)').matches;
  if (!carpPos || !desktop) {
    // No game here: the carp just hops out of the pool now and then.
    const hop = () => alive() && carpPos && gsap.timeline({ onComplete: () => gsap.delayedCall(random(5, 9), hop) })
      .to(carpPos, { y: -70, duration: .5, ease: 'power2.out' }).to(carpPos, { y: 0, duration: .5, ease: 'power2.in' });
    gsap.delayedCall(random(2, 4), hop);
    return;
  }

  // The Dragon Gate game.
  const rocks = q('.rock').map(r => ({ x: +r.getAttribute('cx'), y: +r.getAttribute('cy'), rx: +r.getAttribute('rx'), ry: +r.getAttribute('ry') }));
  const [carpBody] = q('.carp'), [surge] = q('.surge'), [splash] = q('.splash'), [flash] = q('.flash'), [dragonPos] = q('.dragon-pos'), [dragonWrap] = q('.dragon-wrap'), [dragonBody] = q('.dragon'), [hint] = q('.game-hint');
  const hints = { start: q('.hint-start')[0], keys: q('.hint-keys')[0], again: q('.hint-again')[0] };
  const showHint = name => { gsap.to(hint, { opacity: 1, duration: .4 }); Object.entries(hints).forEach(([k, el]) => gsap.to(el, { opacity: k === name ? 1 : 0, duration: .3 })); };
  const hideHint = () => gsap.to(hint, { opacity: 0, duration: .4 });
  gsap.to(hint, { opacity: 1, duration: .6, delay: 1.2 });

  const label = svg.getAttribute('aria-label');
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'application');
  svg.setAttribute('aria-label', `${label}. Spel: klik op de afbeelding of ga ernaartoe met Tab, stuur de karper met de pijltjestoetsen, spring met de spatiebalk en stop met Escape.`);

  const state = { x: START.x, y: START.y, vx: 0, vy: 0, left: false, right: false, focused: false, won: false, falling: false, lastLeap: -1 };
  const place = () => gsap.set(carpPos, { x: state.x - START.x, y: state.y - START.y, rotation: state.vx / SPEED * 12 });
  const burst = (x, y) => gsap.fromTo(splash, { x: x - 360, y: y - 612, opacity: .9, scaleX: .6 }, { opacity: 0, scaleX: 1.6, duration: .6, transformOrigin: '50% 50%' });

  const leap = () => {
    if (state.won || state.falling) return;
    const now = gsap.ticker.time;
    if (now - state.lastLeap < LEAP_GAP) return;
    state.lastLeap = now;
    if (state.y >= START.y) burst(state.x, 612);
    state.vy = LEAP;
    gsap.fromTo(carpBody, { scaleY: .85, scaleX: 1.12 }, { scaleY: 1, scaleX: 1, duration: .35, ease: 'elastic.out(1, .5)', transformOrigin: '50% 50%' });
    hideHint();
  };
  // A hit: the carp tumbles all the way back to the pool and the run starts over.
  const tumble = () => {
    state.falling = true;
    state.left = state.right = false;
    burst(state.x, state.y);
    gsap.timeline({ onComplete: () => { Object.assign(state, { x: START.x, y: START.y, vx: 0, vy: 0, falling: false }); place(); burst(START.x, 612); } })
      .to(carpPos, { x: 0, y: 0, duration: .75, ease: 'power2.in' })
      .fromTo(carpBody, { rotation: 0 }, { rotation: 360, duration: .75, ease: 'none', transformOrigin: '50% 50%' }, 0)
      .set(carpBody, { rotation: 0 });
  };
  const reset = () => {
    if (!alive()) return;
    Object.assign(state, { x: START.x, y: START.y, vx: 0, vy: 0, won: false, shield: 0 });
    gsap.set(carpPos, { x: 0, rotation: 0 });
    gsap.fromTo(carpPos, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.5)' });
    burst(START.x, 612);
  };
  // Reaching the gate: a flash, the carp vanishes and the dragon grows, flies a loop and fades; then the carp returns.
  const win = () => {
    state.won = true;
    state.left = state.right = false;
    showHint('again');
    gsap.timeline({ onComplete: reset })
      .set(carpPos, { x: 0, y: GATE_Y - START.y, rotation: 0 })
      .fromTo(flash, { opacity: 0, scale: .3 }, { opacity: .9, scale: 1.4, duration: .5, ease: 'power2.out', transformOrigin: '50% 50%' })
      .to(flash, { opacity: 0, duration: .8 })
      .to(carpPos, { opacity: 0, duration: .3 }, .3)
      .set(dragonPos, { x: 0, y: 0 }, .3)
      .fromTo(dragonWrap, { opacity: 0, scale: .15 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.4)', transformOrigin: '50% 50%' }, .4)
      .to(q('.drum-glow'), { opacity: .7, duration: .2, stagger: .1, yoyo: true, repeat: 3 }, .6)
      .to(dragonPos, { motionPath: { path: [{ x: 160, y: -30 }, { x: 320, y: 20 }], curviness: 1.2 }, duration: 2.4, ease: 'sine.inOut' }, 1.6)
      .set(dragonBody, { scaleX: -1, transformOrigin: '50% 50%' })
      .to(dragonPos, { motionPath: { path: [{ x: 60, y: -60 }, { x: -220, y: -20 }, { x: -360, y: 30 }], curviness: 1.2 }, duration: 3.6, ease: 'sine.inOut' })
      .to(dragonWrap, { opacity: 0, duration: .8 }, '-=.6')
      .set(dragonBody, { scaleX: 1 });
  };

  const tick = (time, dtMs) => {
    if (!alive() || !state.focused || state.won || state.falling || document.body.classList.contains('calm')) return;
    const dt = Math.min(dtMs / 1000, .05);
    state.vx = (state.right - state.left) * SPEED;
    state.vy = Math.min(state.vy + GRAVITY * dt, FALL_MAX);
    state.x = gsap.utils.clamp(LANE.left, LANE.right, state.x + state.vx * dt);
    state.y = Math.min(state.y + state.vy * dt, START.y);
    if (state.y >= START.y) state.vy = 0;
    if (state.y < START.y - 20) {
      const hits = [...rocks, { x: SURGE.x + Number(gsap.getProperty(surge, 'x')), y: SURGE.y, rx: SURGE.rx, ry: SURGE.ry }];
      if (hits.some(h => Math.abs(state.x - h.x) < h.rx + 10 && Math.abs(state.y - h.y) < h.ry + 16)) { tumble(); return; }
    }
    if (state.y <= GATE_Y) win(); else place();
  };
  gsap.ticker.add(tick);

  const held = { ArrowLeft: 'left', ArrowRight: 'right' };
  const onKey = e => {
    if (e.key === 'Escape') { svg.blur(); return; }
    const isLeap = e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp';
    if (!isLeap && !(e.key in held)) return;
    e.preventDefault();
    if (isLeap) { if (e.type === 'keydown' && !e.repeat) leap(); }
    else state[held[e.key]] = e.type === 'keydown';
  };
  const onFocus = () => { state.focused = true; if (!state.won && state.y >= START.y) showHint('keys'); };
  const onBlur = () => { state.focused = false; state.left = state.right = false; if (!state.won) showHint('start'); };
  const onPointer = () => svg.focus({ preventScroll: true });
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
  };
}
