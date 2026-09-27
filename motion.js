// Shared GSAP runtime for journey hero scenes. Each journey supplies its own choreography as
// animate(ctx); this module handles set-up, quiet mode, reduced motion and clean-up between pages.
// GSAP is loaded from vendor/ as classic scripts in index.html.
const { gsap, MotionPathPlugin } = window;
if (gsap && MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
const isCalm = () => document.body.classList.contains('calm');
let scene = gsap?.matchMedia();

// “Rustig lezen” pauses every GSAP animation; CSS rules cannot reach them.
if (gsap) new MutationObserver(() => gsap.globalTimeline.paused(isCalm())).observe(document.body, { attributes: true, attributeFilter: ['class'] });

export function animateScene(container, animate) {
  if (!gsap) return;
  scene.revert();
  scene = gsap.matchMedia();
  const svg = container?.querySelector('svg[data-scene]');
  if (!svg || !animate) return;
  scene.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.globalTimeline.paused(isCalm());
    animate({ svg, gsap, q: gsap.utils.selector(svg), random: gsap.utils.random, alive: () => svg.isConnected });
  });
}
