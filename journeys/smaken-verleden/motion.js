// Smaken uit het verleden hero choreography: the ship rocks at anchor, the cow grazes, and now and
// then a sea breeze fills the sails and bends the sugarcane. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves'), { x: -14 }, { x: 14, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves-back'), { x: 12 }, { x: -12, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.fromTo(q('.ship'), { rotation: -1.2, y: 0 }, { rotation: 1.2, y: 4, duration: 4.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.to(q('.ship-drift'), { x: 36, duration: 40, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.flag').forEach(flag => gsap.fromTo(flag, { scaleX: 1, skewY: 0 }, { scaleX: .9, skewY: 4, duration: random(1, 1.4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '0% 50%' }));

  gsap.to(q('.birds'), { motionPath: { path: [{ x: 50, y: -10 }, { x: 110, y: 4 }, { x: 170, y: -8 }], curviness: 1.2 }, duration: 32, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // The cow swishes its tail and now and then lowers its head to graze.
  const [tail] = q('.tail'), [head] = q('.cow-head');
  const swish = () => alive() && gsap.to(tail, { rotation: 22, duration: .35, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '100% 0%', onComplete: () => gsap.delayedCall(random(3, 7), swish) });
  gsap.delayedCall(random(1, 3), swish);
  const graze = () => alive() && gsap.timeline({ onComplete: () => gsap.delayedCall(random(7, 13), graze) })
    .to(head, { rotation: 14, duration: 1.2, ease: 'sine.inOut', transformOrigin: '0% 30%' })
    .to(head, { rotation: 0, duration: 1.4, ease: 'sine.inOut' }, '+=2.2');
  gsap.delayedCall(random(4, 7), graze);

  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  q('.cane').forEach(el => gsap.fromTo(el, { rotation: -1.2 }, { rotation: 1.4, duration: random(5, 7.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));

  // The sea breeze: light glints across the water, the sails fill, and the sugarcane bends as it passes.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(10, 18), breeze) });
    tl.fromTo(q('.glint'), { x: 0 }, { x: 1000, duration: 5.5, ease: 'sine.inOut', stagger: .4 }, 0)
      .fromTo(q('.glint'), { opacity: 0 }, { opacity: .7, duration: 1.5 }, 0)
      .to(q('.glint'), { opacity: 0, duration: 1.5 }, 3.8)
      .to(q('.sail'), { scaleX: 1.06, duration: .8, ease: 'sine.out', transformOrigin: '50% 50%', stagger: .08 }, 1.2)
      .to(q('.sail'), { scaleX: 1, duration: 2.2, ease: 'elastic.out(1, 0.5)' }, 2.2);
    q('.cane').forEach((cane, i) => tl.to(cane, { skewX: -5, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, .5 + i * .12)
      .to(cane, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 1.4 + i * .12));
  };
  gsap.delayedCall(3, breeze);
}
