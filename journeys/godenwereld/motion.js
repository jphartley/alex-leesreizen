// Godenwereld hero choreography: lamps flicker on the temple steps, the pennant flutters and parakeets
// cross the sky. Now and then a warm breeze rings the bell, swings the marigold garland and lets a few
// petals drift down. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 22, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.pennant'), { scaleX: 1, skewY: 0 }, { scaleX: .88, skewY: 5, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '0% 50%' });
  gsap.fromTo(q('.crown'), { rotation: -.8 }, { rotation: 1, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.to(q('.lamp'), { opacity: .45, scale: .9, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });

  // Each diya flame wavers on its own.
  q('.diya-flame').forEach(flame => gsap.to(flame, { scaleY: 'random(.8, 1.1)', opacity: 'random(.7, 1)', duration: 'random(.3, .7)', ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true, transformOrigin: '50% 100%' }));

  gsap.to(q('.birds'), { motionPath: { path: [{ x: -60, y: -8 }, { x: -130, y: 6 }, { x: -200, y: -6 }], curviness: 1.2 }, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // The breeze: the bell rings, the garland swings and marigold petals drift down past the doorway.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(10, 18), breeze) });
    tl.to(q('.bell'), { rotation: 16, duration: .35, ease: 'sine.inOut', yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, .3)
      .to(q('.garland'), { y: 4, skewX: -3, duration: .9, ease: 'sine.out', transformOrigin: '50% 0%' }, 0)
      .to(q('.garland'), { y: 0, skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 1)
      .to(q('.crown'), { skewX: -2, duration: 1, ease: 'sine.out', transformOrigin: '50% 100%' }, 0)
      .to(q('.crown'), { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 1.1);
    q('.petal').forEach((petal, i) => {
      const t = .6 + i * .3;
      tl.fromTo(petal, { x: 0, y: 0, rotation: 0 }, { x: random(-40, 60), y: random(80, 110), rotation: random(120, 300), duration: random(3, 4), ease: 'sine.in', transformOrigin: '50% 50%' }, t)
        .fromTo(petal, { opacity: 0 }, { opacity: .9, duration: .5 }, t)
        .to(petal, { opacity: 0, duration: .8 }, t + 2.4);
    });
  };
  gsap.delayedCall(3, breeze);
}
