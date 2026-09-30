// Kleurrijke tempels hero choreography: incense smoke curls upwards, lanterns sway, the roof dragons
// breathe beside their pearl, and now and then a breeze bends the smoke and swings the lanterns.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.tree').forEach(el => gsap.fromTo(el, { rotation: -1 }, { rotation: 1, duration: random(6, 8), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));

  // Each wisp rises and fades, then starts again from the incense sticks.
  q('.smoke').forEach((wisp, i) => gsap.timeline({ repeat: -1, delay: i * 1.6 })
    .fromTo(wisp, { y: 16, opacity: 0 }, { y: -34, duration: 5.5, ease: 'none' }, 0)
    .to(wisp, { opacity: 1, duration: 1.6, ease: 'sine.out' }, 0)
    .to(wisp, { opacity: 0, duration: 2, ease: 'sine.in' }, 3.5));
  q('.ember').forEach(el => gsap.fromTo(el, { opacity: 1 }, { opacity: .45, duration: random(.8, 1.6), ease: 'sine.inOut', repeat: -1, yoyo: true }));

  q('.lantern').forEach((el, i) => gsap.fromTo(el, { rotation: i ? 2.5 : -2.5 }, { rotation: i ? -2.5 : 2.5, duration: random(4, 5.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' }));
  gsap.fromTo(q('.lantern-glow'), { opacity: .25 }, { opacity: .45, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: .9 });
  gsap.fromTo(q('.dragon'), { y: 0 }, { y: -3, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.6 });
  gsap.fromTo(q('.pearl-glow'), { scale: 1, opacity: .35 }, { scale: 1.35, opacity: .1, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });

  gsap.to(q('.birds'), { motionPath: { path: [{ x: 60, y: -12 }, { x: 130, y: 6 }, { x: 200, y: -8 }], curviness: 1.2 }, duration: 34, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // The breeze: smoke bends aside, the lanterns swing together and the trees lean.
  // It uses skewX and the outer lantern group, so it layers on top of the idle motion.
  const breeze = () => {
    if (!alive()) return;
    gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), breeze) })
      .to(q('.smoke'), { skewX: -14, duration: 1.4, ease: 'sine.out', transformOrigin: '50% 100%' }, 0)
      .to(q('.smoke'), { skewX: 0, duration: 3, ease: 'sine.inOut' }, 1.8)
      .to(q('.lantern-swing'), { rotation: -7, duration: 1, ease: 'sine.out', transformOrigin: '50% 0%', stagger: .15 }, .3)
      .to(q('.lantern-swing'), { rotation: 0, duration: 3, ease: 'elastic.out(1, 0.4)' }, 1.4)
      .to(q('.tree'), { skewX: -3, duration: 1.2, ease: 'sine.out', transformOrigin: '50% 100%' }, .2)
      .to(q('.tree'), { skewX: 0, duration: 2.6, ease: 'elastic.out(1, 0.5)' }, 1.4);
  };
  gsap.delayedCall(4, breeze);
}
