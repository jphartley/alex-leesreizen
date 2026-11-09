// Anton de Kom hero choreography: the canoe glides and rocks on the Suriname river while its
// paddler rows, palms sway, scarlet ibises flap past, and now and then a river breeze glints
// across the water and bends the palms and grass. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves'), { x: -14 }, { x: 14, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.waves-back'), { x: 12 }, { x: -12, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.fromTo(q('.boat'), { rotation: -1, y: 0 }, { rotation: 1, y: 3, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
  gsap.fromTo(q('.boat-drift'), { x: -40 }, { x: 40, duration: 36, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.paddle'), { rotation: -8 }, { rotation: 10, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '0% 0%' });

  gsap.to(q('.birds'), { motionPath: { path: [{ x: -50, y: -10 }, { x: -110, y: 4 }, { x: -170, y: -8 }], curviness: 1.2 }, duration: 32, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  q('.palm').forEach(el => gsap.fromTo(el, { rotation: -1 }, { rotation: 1.2, duration: random(5, 7.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));
  q('.grass').forEach(el => gsap.fromTo(el, { rotation: -3 }, { rotation: 3, duration: random(4, 6), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 4)));

  // The river breeze: light glints across the water and the palms and grass bend as it passes.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), breeze) });
    tl.fromTo(q('.glint'), { x: 0 }, { x: 1000, duration: 5.5, ease: 'sine.inOut', stagger: .4 }, 0)
      .fromTo(q('.glint'), { opacity: 0 }, { opacity: .7, duration: 1.5 }, 0)
      .to(q('.glint'), { opacity: 0, duration: 1.5 }, 3.8);
    [...q('.palm'), ...q('.grass')].forEach((el, i) => tl.to(el, { skewX: -4, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, 1.4 + i * .12)
      .to(el, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 2.3 + i * .12));
  };
  gsap.delayedCall(3, breeze);
}
