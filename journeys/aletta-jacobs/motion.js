// Aletta Jacobs hero choreography: the windmill turns, the barge rocks on the canal, the lamp by
// the doctor's door glows, and Aletta now and then looks up from her book to dream. Sometimes a
// breeze glints across the water, fills the sails, speeds up the mill and turns the weathercock.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves'), { x: -14 }, { x: 14, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves-back'), { x: 12 }, { x: -12, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

  // The sails are symmetric around the hub, so the centre of their box is the axle.
  const mill = gsap.to(q('.mill-sails'), { rotation: 360, duration: 26, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });

  gsap.fromTo(q('.boat'), { rotation: -1, y: 0 }, { rotation: 1, y: 3, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.fromTo(q('.boat-drift'), { x: -30 }, { x: 40, duration: 38, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.pennant'), { scaleX: 1, skewY: 0 }, { scaleX: .85, skewY: 5, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '0% 50%' });
  gsap.fromTo(q('.lamp-glow'), { opacity: .2 }, { opacity: .55, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.girl'), { y: 0 }, { y: -1.5, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.to(q('.birds'), { motionPath: { path: [{ x: 50, y: -10 }, { x: 110, y: 4 }, { x: 170, y: -8 }], curviness: 1.2 }, duration: 32, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  q('.tree').forEach(el => gsap.fromTo(el, { rotation: -.8 }, { rotation: 1, duration: random(6, 8), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));
  q('.grass').forEach(el => gsap.fromTo(el, { rotation: -3 }, { rotation: 3, duration: random(4, 6), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 4)));

  // Aletta looks up from her book towards the doctor's house, dreams for a moment, and reads on.
  const [head] = q('.girl-head');
  const dream = () => alive() && gsap.timeline({ onComplete: () => gsap.delayedCall(random(8, 14), dream) })
    .to(head, { rotation: -9, y: -1, duration: 1.4, ease: 'sine.inOut', transformOrigin: '50% 100%' })
    .to(head, { rotation: 0, y: 0, duration: 1.6, ease: 'sine.inOut' }, '+=2.4');
  gsap.delayedCall(random(3, 5), dream);

  // The breeze: light glints across the canal, the sails fill, the mill speeds up for a moment,
  // the weathercock swings round, and the tree and reeds bend as it passes.
  const [vane] = q('.vane');
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), breeze) });
    tl.fromTo(q('.glint'), { x: 0 }, { x: 1000, duration: 5.5, ease: 'sine.inOut', stagger: .4 }, 0)
      .fromTo(q('.glint'), { opacity: 0 }, { opacity: .7, duration: 1.5 }, 0)
      .to(q('.glint'), { opacity: 0, duration: 1.5 }, 3.8)
      .to(mill, { timeScale: 3, duration: 1.5, ease: 'sine.inOut' }, .6)
      .to(mill, { timeScale: 1, duration: 3, ease: 'sine.inOut' }, 3.4)
      .to(vane, { scaleX: -gsap.getProperty(vane, 'scaleX'), duration: 1.2, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 1)
      .to(q('.sail'), { scaleX: 1.06, duration: .8, ease: 'sine.out', transformOrigin: '0% 50%' }, 1.2)
      .to(q('.jib'), { scaleX: 1.08, duration: .8, ease: 'sine.out', transformOrigin: '100% 50%' }, 1.3)
      .to([...q('.sail'), ...q('.jib')], { scaleX: 1, duration: 2.2, ease: 'elastic.out(1, 0.5)' }, 2.2);
    [...q('.tree'), ...q('.grass')].forEach((el, i) => tl.to(el, { skewX: -4, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, 1.4 + i * .12)
      .to(el, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 2.3 + i * .12));
  };
  gsap.delayedCall(3, breeze);
}
