// Gentle idle motion across the three generations of screens.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 18, opacity: .4, duration: 1.6, stagger: .16, ease: 'power2.out' });
  gsap.fromTo(q('.screen-glow'), { opacity: .2 }, { opacity: .55, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.fromTo(q('.pixel-cloud'), { x: -10 }, { x: 14, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.fromTo(q('.orbit'), { y: -4 }, { y: 5, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.fromTo(q('.cursor'), { x: -3, y: 0 }, { x: 5, y: -6, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  q('.signal').forEach(el => gsap.fromTo(el, { opacity: .3 }, { opacity: .9, duration: random(3, 5), repeat: -1, yoyo: true, ease: 'sine.inOut' }));
  const connect = () => {
    if (!alive()) return;
    gsap.fromTo(q('.connection'), { opacity: .15 }, { opacity: .7, duration: 2, stagger: .3, repeat: 1, yoyo: true, ease: 'sine.inOut', onComplete: () => {
      if (alive()) gsap.delayedCall(9, connect);
    } });
  };
  gsap.delayedCall(4, connect);
}
