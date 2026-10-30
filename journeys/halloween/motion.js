// Halloween hero choreography: candles flicker in the pumpkins, bats flutter past the moon and the
// costumed children bob on the pavement. Now and then an autumn gust shakes the tree, sends a few leaves
// tumbling down the street and makes every candle dip at once. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 22, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.moon-glow'), { scale: 1, opacity: .9 }, { scale: 1.15, opacity: .55, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.star').forEach(star => gsap.to(star, { opacity: .3, duration: random(2, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: random(0, 3) }));
  q('.window').forEach(win => gsap.to(win, { opacity: .75, duration: random(4, 8), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: random(0, 4) }));

  // Candlelight: each pumpkin face wavers on its own, softly.
  q('.flame').forEach(flame => gsap.to(flame, { opacity: 'random(.7, 1)', duration: 'random(.3, .8)', ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true }));

  gsap.to(q('.bats'), { motionPath: { path: [{ x: 60, y: -14 }, { x: 130, y: 6 }, { x: 190, y: -10 }], curviness: 1.2 }, duration: 26, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bat').forEach(bat => gsap.fromTo(bat, { scaleY: 1 }, { scaleY: .4, duration: random(.18, .26), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' }));

  q('.kid').forEach((kid, i) => gsap.fromTo(kid, { y: 0 }, { y: -5, duration: random(1.6, 2.2), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * .5 }));
  gsap.fromTo(q('.tree'), { rotation: -.6 }, { rotation: .8, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });

  // The autumn gust: the tree bends, leaves tumble across the street and the candles dip together.
  const gust = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(10, 18), gust) });
    tl.to(q('.tree'), { skewX: -4, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, 0)
      .to(q('.tree'), { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, 1)
      .to(q('.flame'), { opacity: .45, duration: .4, ease: 'sine.out', stagger: .12 }, .6)
      .to(q('.flame'), { opacity: 1, duration: 1, ease: 'sine.inOut', stagger: .12 }, 1.2);
    q('.fall').forEach((leaf, i) => {
      const t = .2 + i * .35;
      tl.fromTo(leaf, { x: 0, y: 0, rotation: 0 }, { x: random(220, 420), y: random(240, 300), rotation: random(240, 480), duration: random(4.5, 6), ease: 'sine.in', transformOrigin: '50% 50%' }, t)
        .fromTo(leaf, { opacity: 0 }, { opacity: .9, duration: .6 }, t)
        .to(leaf, { opacity: 0, duration: 1 }, t + 3.6);
    });
  };
  gsap.delayedCall(3, gust);
}
