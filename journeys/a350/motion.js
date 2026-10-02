// Vliegen in de toekomst hero choreography: the A350 floats gently above drifting clouds, its beacon blinks,
// and now and then the sun glints along the hull as the plane banks ever so slightly.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 30, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.from(q('.plane-drift'), { x: -60, opacity: 0, duration: 2.2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });

  // Clouds drift past at two speeds, so the plane seems to move forward.
  gsap.fromTo(q('.cloud-far'), { x: 20 }, { x: -30, duration: 26, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.cloud-near'), { x: 40 }, { x: -60, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true });

  gsap.fromTo(q('.plane'), { y: -6, rotation: -.6 }, { y: 6, rotation: .6, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.to(q('.beacon'), { opacity: .15, duration: .5, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1.2 });

  // The sun glint: a sheen slides along the hull while the plane banks a little and levels out.
  const glint = () => {
    if (!alive()) return;
    gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 18), glint) })
      .fromTo(q('.glint'), { x: 0, opacity: 0 }, { x: 500, opacity: .8, duration: 2.6, ease: 'sine.inOut' }, 0)
      .to(q('.glint'), { opacity: 0, duration: .6 }, 2)
      .to(q('.plane-drift'), { rotation: -1.5, duration: 1.4, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0)
      .to(q('.plane-drift'), { rotation: 0, duration: 2, ease: 'sine.inOut' }, 1.6);
  };
  gsap.delayedCall(3.5, glint);
}
