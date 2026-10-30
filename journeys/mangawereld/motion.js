// Mangawereld hero choreography: the shop sign swings gently, speech bubbles float above the open
// manga, and now and then a page turns while a few volumes slide out of the shelves, as if someone
// is browsing. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 22, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -14 }, { x: 18, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.sign'), { rotation: -1.6 }, { rotation: 1.6, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' });
  gsap.fromTo(q('.leaf'), { rotation: -1.5 }, { rotation: 2.5, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });

  gsap.to(q('.birds'), { x: 120, y: -10, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  q('.bubble').forEach((bubble, i) => gsap.fromTo(bubble, { y: 0, opacity: .75 }, { y: -8, opacity: 1, duration: random(3.5, 5), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 1.4 }));

  // Browsing: the page turns over the spine, then a few volumes slide up and settle back.
  const [page] = q('.page');
  const browse = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(9, 16), browse) });
    tl.to(page, { scaleX: -1, duration: 1.3, ease: 'power1.inOut', transformOrigin: '0% 50%' })
      .to(page, { opacity: 0, duration: .4 }, '+=.3')
      .set(page, { scaleX: 1 })
      .to(page, { opacity: 1, duration: .6 });
    q('.spine').forEach((spine, i) => tl.to(spine, { y: -12, duration: .6, ease: 'sine.out' }, .4 + i * .18)
      .to(spine, { y: 0, duration: 1.4, ease: 'bounce.out' }, 1.6 + i * .18));
  };
  gsap.delayedCall(3, browse);
}
