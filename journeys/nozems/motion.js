// Nozems hero choreography: notes drift up from the radio, the cinema bulbs glow in turn, the crane
// hook sways over the rebuilding city, and now and then the moped revs while the nozem nods to the beat.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -16 }, { x: 22, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.crane-hook'), { rotation: -2.5 }, { rotation: 2.5, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, svgOrigin: '302 180' });
  gsap.fromTo(q('.lamp-glow'), { opacity: .22, scale: .95 }, { opacity: .42, scale: 1.08, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.skirt'), { rotation: -1.5 }, { rotation: 1.5, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' });

  // The marquee bulbs glow one after another, slowly, like an old cinema sign.
  gsap.fromTo(q('.bulb'), { opacity: .45 }, { opacity: 1, duration: 1.2, ease: 'sine.inOut', stagger: { each: .1, repeat: -1, yoyo: true } });

  gsap.to(q('.birds'), { motionPath: { path: [{ x: -50, y: -8 }, { x: -110, y: 6 }, { x: -170, y: -6 }], curviness: 1.2 }, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true });
  q('.bird').forEach(bird => {
    const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
    gsap.delayedCall(random(1, 4), flap);
  });

  // Music notes float up from the radio and fade, one after another.
  q('.note').forEach((note, i) => {
    gsap.set(note, { opacity: 0 });
    gsap.timeline({ repeat: -1, delay: i * 1.6, repeatDelay: .6 })
      .fromTo(note, { x: 0, y: 0, scale: .6, rotation: 0 }, { x: random(-28, 28), y: -120, scale: 1, rotation: random(-14, 14), duration: 4.2, ease: 'sine.out' }, 0)
      .to(note, { opacity: .85, duration: .8 }, 0)
      .to(note, { opacity: 0, duration: 1.4 }, 2.8);
  });

  // The idling engine puffs small clouds of exhaust out to the left.
  const puffs = q('.puff');
  puffs.forEach((puff, i) => gsap.fromTo(puff, { x: 0, y: 0, scale: .6, opacity: .5 }, { x: -46, y: -16, scale: 1.5, opacity: 0, duration: 3.6, ease: 'sine.out', repeat: -1, delay: i * 1.2, transformOrigin: '50% 50%' }));

  // Now and then the nozem nods to the music and the moped revs: a shudder, a brighter headlight and a big puff.
  const [head] = q('.boy-head'), [moped] = q('.moped'), [light] = q('.headlight');
  const rev = () => {
    if (!alive()) return;
    gsap.timeline({ onComplete: () => gsap.delayedCall(random(11, 18), rev) })
      .to(head, { rotation: 4, duration: .4, ease: 'sine.inOut', repeat: 5, yoyo: true, transformOrigin: '50% 100%' }, 0)
      .to(moped, { x: 1.5, duration: .07, ease: 'none', repeat: 11, yoyo: true }, 1.2)
      .to(light, { scale: 1.35, duration: .3, ease: 'sine.out', repeat: 1, yoyo: true, transformOrigin: '50% 50%' }, 1.2)
      .to(q('.puffs'), { scale: 1.7, duration: .5, ease: 'sine.out', repeat: 1, yoyo: true, repeatDelay: .6, svgOrigin: '-6 -32' }, 1.3);
  };
  gsap.delayedCall(4, rev);
}
