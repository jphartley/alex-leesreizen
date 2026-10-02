// Bizarre pizza's hero choreography: the oven fire flickers, smoke and steam rise, the lantern sways,
// loose toppings drift in the air, and now and then they hop as the pizza gets a little bounce.
// Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
  gsap.from(q('.float'), { opacity: 0, y: 20, duration: 1.4, delay: 1, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.cloud'), { x: -10 }, { x: 14, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.lantern'), { rotation: -2.5 }, { rotation: 2.5, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '300px 0px' });
  gsap.fromTo(q('.lantern-glow'), { opacity: .7 }, { opacity: 1, scale: 1.08, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.basil'), { rotation: -2 }, { rotation: 2, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });

  // The fire: a gentle flicker in the flames and a slow pulse in the glow.
  gsap.fromTo(q('.glow'), { opacity: .7, scale: .95 }, { opacity: 1, scale: 1.06, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  const [flame] = q('.flame');
  const flicker = () => alive() && gsap.to(flame, { scaleY: random(.88, 1.1), scaleX: random(.96, 1.04), duration: random(.25, .5), ease: 'sine.inOut', transformOrigin: '50% 100%', onComplete: flicker });
  flicker();

  // Smoke from the chimney and steam from the pizza rise and fade in slow, staggered loops.
  gsap.fromTo(q('.smoke'), { y: 0, opacity: .7, scale: .8 }, { y: -110, x: 20, opacity: 0, scale: 1.8, duration: 6, ease: 'sine.out', repeat: -1, stagger: 2, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.steam'), { y: 10, opacity: 0 }, { y: -30, opacity: .8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.2 });

  q('.float').forEach(el => gsap.fromTo(el, { y: -6, rotation: -6 }, { y: 6, rotation: 6, duration: random(3.5, 5.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' }).seek(random(0, 4)));

  // Now and then the loose toppings hop, as if tossed, and the pizza gives a small bounce.
  const toss = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 20), toss) });
    q('.float').forEach((el, i) => tl.to(el, { y: -24, duration: .45, ease: 'power2.out', yoyo: true, repeat: 1 }, i * .15));
    tl.to(q('.pizza'), { y: -6, duration: .3, ease: 'power2.out', yoyo: true, repeat: 1 }, .2);
  };
  gsap.delayedCall(4, toss);
}
