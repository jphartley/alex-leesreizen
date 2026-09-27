// Mountain scene choreography with GSAP: a soft entrance, slow loops, and now and then a breeze
// that travels across the valley. GSAP is loaded from vendor/ as classic scripts in index.html.
const { gsap, MotionPathPlugin } = window;
if (gsap && MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
const isCalm = () => document.body.classList.contains('calm');
let scene = gsap?.matchMedia();

// “Rustig lezen” pauses every GSAP animation; CSS rules cannot reach them.
if (gsap) new MutationObserver(() => gsap.globalTimeline.paused(isCalm())).observe(document.body, { attributes: true, attributeFilter: ['class'] });

export function animateMountains(container) {
  if (!gsap) return;
  scene.revert();
  scene = gsap.matchMedia();
  const svg = container?.querySelector('svg');
  if (!svg?.querySelector('.layer')) return;
  scene.add('(prefers-reduced-motion: no-preference)', () => {
    const q = gsap.utils.selector(svg), random = gsap.utils.random;
    const alive = () => svg.isConnected;
    gsap.globalTimeline.paused(isCalm());

    gsap.from(q('.layer'), { y: 24, opacity: .3, duration: 1.8, stagger: .2, ease: 'power2.out' });
    gsap.fromTo(q('.sun-glow'), { scale: 1, opacity: .4 }, { scale: 1.3, opacity: .12, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
    gsap.fromTo(q('.cloud-one'), { x: -18 }, { x: 24, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.fromTo(q('.cloud-two'), { x: 24, opacity: .34 }, { x: -18, opacity: .44, duration: 22, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.to(q('.window'), { fill: '#d4bf7e', duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });

    gsap.to(q('.birds'), { motionPath: { path: [{ x: 40, y: -12 }, { x: 85, y: 2 }, { x: 130, y: -10 }], curviness: 1.2 }, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true });
    q('.bird').forEach(bird => {
      const flap = () => alive() && gsap.to(bird, { scaleY: .45, transformOrigin: '50% 50%', duration: .16, repeat: 3, yoyo: true, ease: 'sine.inOut', onComplete: () => gsap.delayedCall(random(3, 8), flap) });
      gsap.delayedCall(random(1, 4), flap);
    });

    q('.smoke').forEach((puff, i) => gsap.timeline({ repeat: -1, delay: i * 2.3 })
      .fromTo(puff, { x: 0, y: 0, scale: .5 }, { x: 10, y: -46, scale: 1.8, duration: 7, ease: 'power1.out', transformOrigin: '50% 50%' }, 0)
      .fromTo(puff, { opacity: 0 }, { opacity: .6, duration: 1.4, ease: 'sine.out' }, 0)
      .to(puff, { opacity: 0, duration: 5.6, ease: 'sine.in' }, 1.4));

    // Idle sway uses rotation; the breeze uses skewX, so the two movements layer instead of fighting.
    [...q('.tree'), ...q('.rustle')].forEach(el => gsap.fromTo(el, { rotation: -1.2 }, { rotation: 1.5, duration: random(5, 7.5), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 5)));

    // The breeze: light crosses the terraces and each tree and leaf leans as it passes, left side first.
    const [leftTree, rightTree] = q('.tree'), leaves = q('.rustle');
    const breeze = () => {
      if (!alive()) return;
      const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(random(10, 18), breeze) });
      tl.fromTo(q('.field-light'), { x: 0 }, { x: 1500, duration: 6, ease: 'sine.inOut' }, 0);
      const lean = (el, at, amount) => tl.to(el, { skewX: amount, duration: .9, ease: 'sine.out', transformOrigin: '50% 100%' }, at)
        .to(el, { skewX: 0, duration: 2.4, ease: 'elastic.out(1, 0.5)' }, at + .9);
      lean(leftTree, 1.7, -4);
      leaves.slice(0, 3).forEach((leaf, i) => lean(leaf, 1.6 + i * .15, -6));
      lean(rightTree, 3.3, -4);
      leaves.slice(3).forEach((leaf, i) => lean(leaf, 3.4 + i * .15, -6));
    };
    gsap.delayedCall(3, breeze);
  });
}
