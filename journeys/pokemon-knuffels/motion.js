// Pokémon-knuffels hero choreography: the string lights twinkle, the ghost plush floats above its shelf,
// the mouse plush twitches an ear, the dog wags its tail, and now and then a breeze lifts the curtain
// and sets the lights swinging. Runs inside animateScene() from /motion.js.
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.6, stagger: .2, ease: 'power2.out' });
  gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.35, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -10 }, { x: 14, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
  gsap.fromTo(q('.curtain-sway'), { rotation: -.8 }, { rotation: .8, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' });
  gsap.fromTo(q('.lights'), { rotation: -.5 }, { rotation: .5, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 0%' });
  q('.bulb').forEach(bulb => gsap.fromTo(bulb, { opacity: .55 }, { opacity: 1, duration: random(1.2, 2.6), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 2)));
  q('.mote').forEach(mote => gsap.fromTo(mote, { y: 0, opacity: .2 }, { y: -14, opacity: .75, duration: random(3, 5), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 4)));

  gsap.fromTo(q('.ghost'), { y: -6, rotation: -2 }, { y: 6, rotation: 2, duration: 3.6, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.ferret'), { scaleY: 1 }, { scaleY: 1.02, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' });

  // The mouse plush twitches one of its ears now and then.
  const ears = q('.ear');
  const twitch = () => {
    if (!alive() || !ears.length) return;
    const ear = ears[Math.floor(random(0, ears.length))];
    gsap.to(ear, { rotation: random(6, 10), duration: .14, repeat: 3, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 100%', onComplete: () => gsap.delayedCall(random(4, 9), twitch) });
  };
  gsap.delayedCall(random(2, 4), twitch);

  // The dog wags its tail in short bursts.
  const [tail] = q('.dog-tail');
  const wag = () => alive() && tail && gsap.to(tail, { rotation: 12, duration: .22, repeat: 5, yoyo: true, ease: 'sine.inOut', transformOrigin: '0% 100%', onComplete: () => gsap.delayedCall(random(4, 8), wag) });
  gsap.delayedCall(random(1, 3), wag);

  // A breeze from the window: the curtain billows, the lights swing, the motes rush across and the ghost plush bobs up.
  const breeze = () => {
    if (!alive()) return;
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(11, 19), breeze) });
    tl.to(q('.curtain'), { skewX: -9, scaleX: 1.08, duration: 1, ease: 'sine.out', transformOrigin: '50% 0%' }, 0)
      .to(q('.curtain'), { skewX: 0, scaleX: 1, duration: 2.6, ease: 'elastic.out(1, 0.45)' }, 1)
      .to(q('.lights'), { skewX: 1.8, duration: .9, ease: 'sine.out', transformOrigin: '50% 0%' }, .3)
      .to(q('.lights'), { skewX: 0, duration: 3, ease: 'elastic.out(1, 0.4)' }, 1.2)
      .to(q('.mote'), { x: 70, duration: 2.4, ease: 'sine.inOut', stagger: .1 }, .2)
      .to(q('.mote'), { x: 0, duration: 4, ease: 'sine.inOut', stagger: .1 }, 2.8)
      .to(q('.ghost-lift'), { y: -18, duration: 1.2, ease: 'sine.out' }, .6)
      .to(q('.ghost-lift'), { y: 0, duration: 2.2, ease: 'sine.inOut' }, 1.8);
  };
  gsap.delayedCall(4, breeze);
}
