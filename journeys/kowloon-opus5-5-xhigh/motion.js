// De stad zonder regels hero choreography: lights go on and off in the tower block, neon signs hum and
// stutter, washing sways and a kite dances above the roofs. Now and then a plane comes in low towards
// the old airport: the aerials shiver, the washing flaps and the pigeons wheel away as it passes.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .45 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -18 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });

  // The kite line swings around the child's hand while the kite rocks on the wind.
  gsap.fromTo(q('.kite-line'), { rotation: -3 }, { rotation: 3, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true, svgOrigin: '449 263' });
  gsap.fromTo(q('.kite'), { rotation: -7 }, { rotation: 7, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 30%' });

  // Idle sway uses rotation; the plane's gust uses skewX, so the two movements layer instead of fighting.
  q('.cloth').forEach(el => gsap.fromTo(el, { rotation: -4 }, { rotation: 4, duration: random(2.4, 3.8), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' }).seek(random(0, 3)));

  // Pigeons circle above their coop, flapping now and then.
  gsap.to(q('.flock'), { motionPath: { path: [{ x: 40, y: -26 }, { x: 90, y: -6 }, { x: 50, y: 18 }, { x: 0, y: 0 }], curviness: 1.4 }, duration: 16, ease: 'none', repeat: -1 });
  q('.pigeon').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .4, transformOrigin: '50% 50%', duration: .14, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(1.5, 5), flap) });
    gsap.delayedCall(random(.5, 3), flap);
  });

  // Lights in the block go on and off: people coming home, cooking, going to bed.
  const windows = q('.win');
  windows.forEach(w => random(0, 1) < .25 && gsap.set(w, { opacity: .1 }));
  const flick = () => {
    if (!alive()) return;
    const w = windows[random(0, windows.length - 1, 1)];
    gsap.to(w, { opacity: gsap.getProperty(w, 'opacity') > .5 ? .1 : 1, duration: .5, ease: 'power1.out' });
    gsap.delayedCall(random(.6, 1.8), flick);
  };
  gsap.delayedCall(2, flick);

  // The neon signs hum softly, and now and then one stutters, like the flickering lamps in the text.
  q('.neon-glow').forEach(el => gsap.fromTo(el, { opacity: .55 }, { opacity: 1, duration: random(1.6, 2.8), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 2)));
  const signs = q('.neon');
  const stutter = () => alive() && gsap.to(signs[random(0, signs.length - 1, 1)], {
    keyframes: [{ opacity: .3, duration: .06 }, { opacity: 1, duration: .08 }, { opacity: .45, duration: .05 }, { opacity: 1, duration: .2 }],
    onComplete: () => gsap.delayedCall(random(2, 5), stutter),
  });
  gsap.delayedCall(1.5, stutter);

  // The flyover. The plane crosses from x 820 to -480 in its own (rotated, scaled) frame; over(x) is the moment
  // its middle is above x in the scene, so everything below reacts in turn as it passes, right to left.
  const [plane] = q('.plane'), flight = 11, over = x => (868 - x) / 100;
  const xOf = el => parseFloat(el.getAttribute('d').slice(1));
  gsap.set(plane, { x: 820 });
  gsap.to(q('.beacon'), { opacity: .15, duration: .45, repeat: -1, yoyo: true, repeatDelay: .9, ease: 'sine.inOut' });
  const flyover = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(14, 24), flyover) });
    tl.fromTo(plane, { x: 820 }, { x: -480, duration: flight, ease: 'none' }, 0);
    q('.antenna').forEach(el => {
      const t = over(xOf(el)) + random(0, .2);
      tl.to(el, { rotation: random(-7, 7), duration: .18, ease: 'sine.out', transformOrigin: '50% 100%' }, t)
        .to(el, { rotation: 0, duration: 1.6, ease: 'elastic.out(1, 0.3)' }, t + .18);
    });
    q('.cloth').forEach(el => {
      const t = over(xOf(el));
      tl.to(el, { skewX: -14, duration: .3, ease: 'sine.out', transformOrigin: '50% 0%' }, t)
        .to(el, { skewX: 0, duration: 1.8, ease: 'elastic.out(1, 0.4)' }, t + .3);
    });
    tl.to(q('.kite'), { x: -10, y: 16, duration: .6, ease: 'sine.out' }, over(372))
      .to(q('.kite'), { x: 0, y: 0, duration: 2.4, ease: 'elastic.out(1, 0.4)' }, over(372) + .6)
      .to(q('.flock-wrap'), { y: -40, scale: 1.3, duration: 1.2, ease: 'sine.out', transformOrigin: '50% 50%' }, over(300) - .4)
      .to(q('.flock-wrap'), { y: 0, scale: 1, duration: 3, ease: 'sine.inOut' }, over(300) + 1.4);
  };
  gsap.delayedCall(4, flyover);
}
