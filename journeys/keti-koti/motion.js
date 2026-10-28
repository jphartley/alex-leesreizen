// Keti Koti hero choreography: the ship rocks slowly on the ocean, the palms sway, and now and
// then a sea breeze glints across the water, fills the sails and bends the palms and grass.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves'), { x: -14 }, { x: 14, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves-back'), { x: 12 }, { x: -12, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.fromTo(q('.ship'), { rotation: -1.2, y: 0 }, { rotation: 1.2, y: 4, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.to(q('.ship-drift'), { x: 30, duration: 40, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.to(q('.birds'), { motionPath: { path: [{ x: -50, y: -10 }, { x: -110, y: 4 }, { x: -170, y: -8 }], curviness: 1.2 }, duration: 32, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  q('.palm').forEach(el => gsap.fromTo(el, { rotation: -1 }, { rotation: 1.2, duration: random(5, 7.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));
  q('.grass').forEach(el => gsap.fromTo(el, { rotation: -2 }, { rotation: 2, duration: random(4, 6), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 4)));

  // The sea breeze: light glints across the water, the sails fill, and palms and grass bend as it passes.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), breeze) });
    tl.fromTo(q('.glint'), { x: 0 }, { x: 1000, duration: 5.5, ease: 'sine.inOut', stagger: .4 }, 0)
      .fromTo(q('.glint'), { opacity: 0 }, { opacity: .7, duration: 1.5 }, 0)
      .to(q('.glint'), { opacity: 0, duration: 1.5 }, 3.8)
      .to(q('.sail'), { scaleX: 1.06, duration: .8, ease: 'sine.out', transformOrigin: '50% 50%', stagger: .08 }, 1.2)
      .to(q('.sail'), { scaleX: 1, duration: 2.2, ease: 'elastic.out(1, 0.5)' }, 2.2);
    [...q('.palm'), ...q('.grass')].forEach((el, i) => tl.to(el, { skewX: -4, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, 1.6 + i * .12)
      .to(el, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 2.5 + i * .12));
  };
  gsap.delayedCall(3, breeze);
}
