// Hongkong hero choreography: the junk rocks in the harbour, the ferry crosses, windows glimmer, and now
// and then a harbour breeze fills the sails and a wave of light runs along the skyline. Runs inside
// animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: 16 }, { x: -22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves'), { x: -14 }, { x: 14, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves-back'), { x: 12 }, { x: -12, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.fromTo(q('.junk'), { rotation: -1.2, y: 0 }, { rotation: 1.2, y: 4, duration: 4.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.to(q('.junk-drift'), { x: -30, duration: 36, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.ferry'), { x: 0 }, { x: 150, duration: 28, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.ferry'), { y: 0 }, { y: 2.5, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });

  // Each tower's windows glimmer at their own slow pace.
  q('.lights').forEach(el => gsap.fromTo(el, { opacity: .45 }, { opacity: .75, duration: random(4, 9), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 8)));

  gsap.to(q('.birds'), { motionPath: { path: [{ x: 60, y: -12 }, { x: 130, y: 4 }, { x: 200, y: -8 }], curviness: 1.2 }, duration: 32, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  gsap.fromTo(q('.lantern'), { rotation: -4 }, { rotation: 4, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' });
  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  q('.tree').forEach(el => gsap.fromTo(el, { rotation: -1 }, { rotation: 1.2, duration: random(5, 7.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));

  // The harbour breeze: light glints across the water, the sails fill, the trees bend, and a
  // wave of light runs along the skyline from left to right.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), breeze) });
    tl.fromTo(q('.glint'), { x: 0 }, { x: 1000, duration: 5.5, ease: 'sine.inOut', stagger: .4 }, 0)
      .fromTo(q('.glint'), { opacity: 0 }, { opacity: .7, duration: 1.5 }, 0)
      .to(q('.glint'), { opacity: 0, duration: 1.5 }, 3.8)
      .to(q('.sail'), { scaleX: 1.06, duration: .8, ease: 'sine.out', transformOrigin: '0% 50%', stagger: .08 }, 1.2)
      .to(q('.sail'), { scaleX: 1, duration: 2.2, ease: 'elastic.out(1, 0.5)' }, 2.2);
    q('.lights').forEach((el, i) => tl.to(el, { opacity: 1, duration: .5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, .4 + i * .18));
    q('.tree').forEach((tree, i) => tl.to(tree, { skewX: -4, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, .8 + i * .15)
      .to(tree, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 1.7 + i * .15));
  };
  gsap.delayedCall(3, breeze);
}
