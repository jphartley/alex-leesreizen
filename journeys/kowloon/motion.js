// Kowloon hero choreography: neon breathes in the dark, drips fall, laundry and cables sway,
// and now and then a current climbs the signs while the paper plane crosses the only gap of sky.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 26, opacity: 0, duration: 1.6, stagger: 0.14, ease: 'power2.out' });
  gsap.from(q('.plane'), { x: -36, opacity: 0, duration: 1.8, ease: 'power2.out' });

  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: 0.42 }, {
    scale: 1.28, opacity: 0.12, duration: 7.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%',
  });
  gsap.fromTo(q('.cloud'), { x: 14 }, { x: -16, duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true });

  q('.cable').forEach(el => {
    gsap.fromTo(el, { rotation: -0.7 }, {
      rotation: 0.7, duration: random(5.5, 8), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%',
    }).seek(random(0, 4));
  });
  gsap.fromTo(q('.laundry'), { rotation: -2.2 }, {
    rotation: 2.2, duration: 3.6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%',
  });
  gsap.fromTo(q('.hang'), { rotation: -3.2 }, {
    rotation: 3.2, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%',
  });
  gsap.fromTo(q('.plant'), { rotation: -2 }, {
    rotation: 2.2, duration: 4.4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%',
  });
  gsap.fromTo(q('.folk'), { y: 0 }, { y: -3, duration: 2.7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.tail'), { rotation: -14 }, {
    rotation: 18, duration: 2.1, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '100% 80%',
  });
  gsap.fromTo(q('.plane'), { y: -3 }, { y: 5, duration: 3.6, ease: 'sine.inOut', repeat: -1, yoyo: true });

  q('.neon-glow').forEach(el => {
    gsap.fromTo(el, { opacity: 0.14 }, {
      opacity: 0.6, duration: random(0.8, 2.2), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: random(0, 1.2),
    });
  });
  q('.win').forEach(el => {
    gsap.fromTo(el, { opacity: 0.45 }, {
      opacity: 1, duration: random(1.6, 4), ease: 'sine.inOut', repeat: -1, yoyo: true,
    }).seek(random(0, 3));
  });
  gsap.to(q('.beacon'), { opacity: 0.15, duration: 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1.5 });

  const loop = (el, build, pause) => {
    const go = () => {
      if (!alive()) return;
      build().eventCallback('onComplete', () => gsap.delayedCall(pause(), go));
    };
    go();
  };
  q('.steam').forEach((el, i) => {
    gsap.delayedCall(i * 0.5, () => loop(
      el,
      () => gsap.timeline()
        .fromTo(el, { y: 8, opacity: 0 }, { y: -18, opacity: 0.8, duration: 1.3, ease: 'sine.out' })
        .to(el, { y: -34, opacity: 0, duration: 1.15, ease: 'sine.in' }),
      () => random(0.2, 0.9),
    ));
  });
  q('.drip').forEach((el, i) => {
    gsap.delayedCall(0.3 + i * 0.6, () => loop(
      el,
      () => gsap.timeline()
        .fromTo(el, { y: 0, opacity: 0 }, { y: 8, opacity: 1, duration: 0.16, ease: 'none' })
        .to(el, { y: 68, opacity: 0, duration: 1.05, ease: 'power1.in' }),
      () => random(0.35, 1.2),
    ));
  });

  // The current: signs flicker from the dark street upward, a fat drop falls, and the plane crosses the sky.
  const current = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 18), current) });
    q('.bulb').forEach((el, i) => {
      tl.to(el, { opacity: 0.3, duration: 0.07, yoyo: true, repeat: 3, ease: 'power1.inOut' }, i * 0.16);
    });
    tl.fromTo(q('.plane'), { x: -18 }, { x: 84, duration: 2.6, ease: 'sine.inOut' }, 0)
      .to(q('.plane'), { rotation: -7, duration: 1.15, yoyo: true, repeat: 1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0)
      .to(q('.plane'), { x: 0, duration: 2, ease: 'sine.inOut' }, 2.5)
      .fromTo(q('.drip-surge'), { y: 0, opacity: 1 }, { y: 108, opacity: 0, duration: 1.15, ease: 'power1.in' }, 0.4);
  };
  gsap.delayedCall(3.4, current);
}
