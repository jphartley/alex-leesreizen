// Achter de schermen hero: the desk lamp breathes, the server lights blink, and now and then a
// little signal leaves the laptop, visits the book, the warehouse and the server, then comes home.
// Runs inside animateScene() from /motion.js.
// Offsets match art.js: the packet starts at (360, 548) and the roof marks sit at
// book (130, 268), warehouse (360, 300) and server (590, 240).
export function animate({ gsap, q, random, alive }) {
  gsap.from(q('.layer'), { y: 20, opacity: .35, duration: 1.6, stagger: .16, ease: 'power2.out' });
  gsap.fromTo(q('.moon-glow'), { scale: 1, opacity: .45 }, { scale: 1.28, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cloud'), { x: -14 }, { x: 18, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.lamp-glow'), { scale: 1, opacity: .28 }, { scale: 1.2, opacity: .08, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.cursor'), { opacity: 1 }, { opacity: 0, duration: .65, ease: 'steps(1)', repeat: -1, yoyo: true });
  q('.led').forEach((led, i) => gsap.fromTo(led, { opacity: .3 }, { opacity: 1, duration: random(1.1, 2), ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * .35 }));

  const hop = () => {
    if (!alive()) return;
    const packet = q('.packet');
    const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(12, 18), hop) });
    tl.set(packet, { x: 0, y: 0, opacity: 0 })
      .to(packet, { opacity: 1, duration: .25 })
      .to(packet, { x: -230, y: -280, duration: 1.45, ease: 'sine.inOut' })
      .to(q('.ping-book'), { opacity: .9, duration: .22, yoyo: true, repeat: 1 }, '-=0.25')
      .to(packet, { x: 0, y: -248, duration: 1.2, ease: 'sine.inOut' })
      .to(q('.ping-shed'), { opacity: .9, duration: .22, yoyo: true, repeat: 1 }, '-=0.25')
      .to(packet, { x: 230, y: -308, duration: 1.2, ease: 'sine.inOut' })
      .to(q('.ping-rack'), { opacity: .9, duration: .22, yoyo: true, repeat: 1 }, '-=0.25')
      .to(packet, { x: 0, y: 0, duration: 1.55, ease: 'sine.inOut' })
      .to(packet, { opacity: 0, duration: .3 });
  };
  gsap.delayedCall(2.2, hop);
}
