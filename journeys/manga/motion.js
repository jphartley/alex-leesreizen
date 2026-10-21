// Gentle studio light, clouds and paper movement; the shared runtime handles reduced motion.
export function animate({ gsap, q }) {
  gsap.from(q('.layer'), { y: 18, opacity: .4, duration: 1.6, stagger: .18, ease: 'power2.out' });
  gsap.to(q('.cloud'), { x: 16, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(q('.paper-light'), { opacity: .25, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(q('.little-ship'), { y: 4, rotation: 1.5, transformOrigin: '50% 100%', duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(q('.leaf'), { rotation: 4, transformOrigin: '50% 100%', duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(q('.spark'), { opacity: .35, duration: 5, stagger: .6, ease: 'sine.inOut', repeat: -1, yoyo: true });
}
