// Shared drawing helpers for journey art.js files: the house palette, small scenery pieces that most
// journeys need, and a cast of original figures for the Zelda journeys (and any other adventure). Every
// helper returns an SVG string. Nothing here uses an id, so the slug-prefix rule doesn't apply; nor
// does it touch browser globals, so npm run check can import it in Node.
// Import what you need: import { C, backdrop, sparkle, adventurer } from '../../art-kit.js';
// Older journeys keep their own copies; don't move them over unless asked.

// The house palette: warm paper, muted greens, soft creams and earth tones.
export const C = { ink: '#3b342e', cream: '#f7f1df', paper: '#fbf6e6', green: '#284f3d', sage: '#517c67', olive: '#9cac66', moss: '#6f9463', wood: '#b8916b', woodDark: '#8c6a4c', rust: '#b76e55', yellow: '#e8c65a', gold: '#c9a24a', skin: '#e3b9a0', hair: '#6b4a32', tunic: '#5f7f9b', tunicDark: '#4d6a84', stone: '#a9ab9a', stoneDark: '#8e9182', stoneLight: '#c9cbb9', glow: '#fff8df', rose: '#c98f9d', pink: '#e3b0b8', blond: '#d9b46a', purple: '#6a5872', purpleDark: '#4f4157' };

// ---- Scenery ---------------------------------------------------------------------------------------

// The chapter frame (720×650): paper background, a soft disc and a dotted ring.
export const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;
// A short label in the allowed sans-serif. Keep labels to a word or two.
export const label = (x, y, text, size = 15, fill = '#687366', anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="sans-serif" font-size="${size}" font-weight="700" fill="${fill}">${text}</text>`;
// A four-pointed twinkling star; d is the CSS animation delay in seconds (use negatives to stagger).
export const sparkle = (x, y, s, d = 0, fill = '#a28056') => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="${fill}" transform="translate(${-3 * s} ${7 * s})"/>`;
// A heart about 48 wide at scale 1, centred near its origin. HEART is the bare path for strokes.
export const HEART = 'M0 -6c-6-12-24-11-24 4c0 12 15 21 24 29c9-8 24-17 24-29c0-15-18-16-24-4Z';
export const heart = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="${HEART}" fill="${fill}"/>`;
// A grass tuft standing on (x, y). The default class 'tuft' is for GSAP; use 'm-sway' in chapter art.
export const tuft = (x, y, fill = '#6f9a78', cls = 'tuft') => `<path class="${cls}" d="M${x - 10} ${y}l4-22 5 16 4-24 5 22 5-14 2 22Z" fill="${fill}"/>`;
// A small flower standing on (x, y).
export const flower = (x, y, fill = C.cream) => `<g transform="translate(${x} ${y})"><path d="M0 0v-12" stroke="${C.moss}" stroke-width="2"/><circle cy="-14" r="4.5" fill="${fill}"/><circle cy="-14" r="1.8" fill="${C.yellow}"/></g>`;
// A soft cloud centred on (x, y); k scales it. Pass cls = '' for no class, or 'm-drift' in chapter art.
export const cloud = (x, y, k = 1, cls = 'cloud') => `<g${cls ? ` class="${cls}"` : ''}><ellipse cx="${x}" cy="${y}" rx="${46 * k}" ry="${14 * k}" fill="${C.paper}" opacity=".9"/><ellipse cx="${x - 14 * k}" cy="${y - 10 * k}" rx="${22 * k}" ry="${14 * k}" fill="${C.paper}" opacity=".9"/><ellipse cx="${x + 12 * k}" cy="${y - 12 * k}" rx="${26 * k}" ry="${16 * k}" fill="${C.paper}" opacity=".9"/></g>`;
// A row of rounded treetops from x0 to x1, filled down to base: a forest silhouette.
export function treeline(base, top, step, fill, cls = '', x0 = -20, x1 = 740) {
  let d = `M${x0} ${base}V${top}`;
  for (let x = x0, k = 0; x < x1; x += step, k++) d += `q${step / 2} ${-(18 + (k * 37) % 26)} ${step} 0`;
  return `<path${cls ? ` class="${cls}"` : ''} d="${d}V${base}Z" fill="${fill}"/>`;
}

// ---- Figures ---------------------------------------------------------------------------------------
// Every figure faces right and stands on its own origin (its feet); flip with scale(-k k). Units are
// figure units: the adventurer is about 95 tall, so a scale of 1.5 makes it about 140 px.

// The adventurer's shoulders and resting hands (back arm first), and both hands raised above the head.
export const SHOULDERS = [[-5, -58], [6, -58]], REST = [[-9, -31], [12, -32]], RAISED = [[8, -99], [8, -109]];
// The front hand in the sword-ready pose; the .swing group turns around SHOULDERS[1].
export const READY = [16, -44];

// An arm from shoulder to hand; short arms bend at the elbow, long ones stretch.
export function armPath([sx, sy], [hx, hy]) {
  const dx = hx - sx, dy = hy - sy, len = Math.hypot(dx, dy) || 1, bend = Math.max(0, 34 - len) * .7;
  const mx = (sx + hx) / 2 - dy / len * bend, my = (sy + hy) / 2 + dx / len * bend;
  return `M${sx} ${sy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${hx.toFixed(1)} ${hy.toFixed(1)}`;
}

// A sword with its origin at the grip and the blade pointing up (tip at y −46).
export const swordUp = () => `<path d="M-2.6 -4V-41L0 -46L2.6 -41V-4Z" fill="#e6eae6"/><path d="M0 -6V-41" stroke="#c4cbc6" stroke-width="1"/><path d="M-9 -5.5h18v4h-18Z" fill="${C.gold}"/><rect x="-2.4" y="-2" width="4.8" height="9" rx="1.5" fill="${C.hair}"/><circle cy="8.5" r="2.6" fill="${C.gold}"/>`;
// A larger sword with its origin at the grip and the blade pointing down (tip at y 115), with an
// optional glow (class sword-glow) for a legendary sword.
export const swordDown = (glow = false) => `<ellipse class="sword-glow" cx="0" cy="62" rx="15" ry="64" fill="${C.glow}" opacity="${glow ? .8 : 0}"/>
  <path d="M-3.5 14h7v92l-3.5 9-3.5-9Z" fill="#e6eae6"/><path d="M0 17v90" stroke="#c4cbc6" stroke-width="1.4"/>
  <path d="M-17 8q17 5 34 0l-2 7q-15 4-30 0Z" fill="${C.gold}"/><circle cy="11.5" r="3" fill="#6fae8f"/>
  <rect x="-3.5" y="-10" width="7" height="19" rx="2" fill="${C.hair}"/><path d="M-3.5 -5h7M-3.5 0h7M-3.5 5h7" stroke="${C.woodDark}" stroke-width="1.5"/>
  <circle cy="-13" r="5" fill="${C.gold}"/>`;

/**
 * The made-up adventurer: rust scarf, round shield, short tunic. Not a copy of any game character.
 * hands: [back, front] hand positions (default REST; RAISED holds something up).
 * sword: draws the front arm in the ready pose with a sword, inside <g class="swing"> to turn it.
 * holding: a glowing sword raised between RAISED hands.
 * Classes for motion.js: .hero-body (hop), .arm-back / .arm-front paths and .arm-back-hand /
 * .arm-front-hand circles (bend with armPath), .c-tunic (fill), .c-tunic-s and .c-tunicd-s (arm strokes).
 */
export function adventurer({ hands = REST, tunic = C.tunic, tunicDark = C.tunicDark, scarf = C.rust, hair = C.hair, shield = true, holding = false, sword = false } = {}) {
  const arm = (k, cls, colour, colourCls, hand = hands[k]) => `<path class="arm ${cls} ${colourCls}" d="${armPath(SHOULDERS[k], hand)}" stroke="${colour}" stroke-width="7" fill="none" stroke-linecap="round"/><circle class="hand ${cls}-hand" cx="${hand[0]}" cy="${hand[1]}" r="4.5" fill="${C.skin}"/>`;
  const front = sword
    ? `<g class="swing">${arm(1, 'arm-front', tunic, 'c-tunic-s', READY).replace(/<circle/, `<g transform="translate(${READY[0]} ${READY[1]}) rotate(35)">${swordUp()}</g><circle`)}</g>`
    : arm(1, 'arm-front', tunic, 'c-tunic-s');
  return `<ellipse rx="22" ry="5" fill="${C.green}" opacity=".18"/><g class="hero-body">
  ${holding ? `<g transform="translate(8 -104) rotate(180) scale(.75)">${swordDown(true)}</g>` : ''}
  ${arm(0, 'arm-back', tunicDark, 'c-tunicd-s')}
  ${shield ? `<g transform="translate(-15 -47)"><circle r="14" fill="#a07d5a"/><circle r="12.5" fill="none" stroke="#7d8f86" stroke-width="3"/><path d="M0 -7v14M-7 0h14" stroke="${C.woodDark}" stroke-width="2.5"/></g>` : ''}
  <path d="M-7 -30V-4M7 -30V-4" stroke="#6b5a48" stroke-width="8" stroke-linecap="round"/><path d="M-13 -7h12v7h-12ZM1 -7h14v7H1Z" fill="#5a4636"/>
  <path class="c-tunic" d="M-15 -60Q0 -66 15 -60L19 -26H-19Z" fill="${tunic}"/><path d="M-17 -38h35v5h-35Z" fill="${C.woodDark}"/><path d="M-2 -38h6v5h-6Z" fill="${C.gold}"/>
  ${scarf ? `<path d="M-10 -58l-15 9 4 6 13-9Z" fill="${scarf}"/><path d="M-12 -63q12 7 24 0l-1 8q-11 6-22 0Z" fill="${scarf}"/>` : ''}
  <circle cx="0" cy="-77" r="14" fill="${C.skin}"/><path d="M-15 -76Q-16 -94 1 -94Q16 -94 15 -81Q8 -89 -1 -87Q-6 -86 -9 -82Q-11 -78 -15 -70Z" fill="${hair}"/>
  <circle cx="7" cy="-77" r="2" fill="${C.ink}"/><circle cx="9" cy="-71" r="2.6" fill="#e9a28c" opacity=".55"/><path d="M5 -70q3 2 6 0" stroke="${C.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  ${front}
  </g>`;
}

// A princess in a long dress with a small tiara, hands folded. Classes .c-dress, .c-dressd (fills) and
// .c-dressd-s (arm strokes) let motion.js recolour her.
export function princess({ dress = C.rose, dressDark = '#b07884', hair = C.blond } = {}) {
  return `<ellipse rx="20" ry="5" fill="${C.green}" opacity=".18"/>
  <path d="M-11 -80Q-22 -62 -17 -40Q-8 -44 -3 -62Z" fill="${hair}"/>
  <path class="c-dress" d="M-24 0Q-20 -30 -10 -52H10Q20 -30 24 0Z" fill="${dress}"/><path d="M-5 -52H5L9 0H-9Z" fill="${C.cream}" opacity=".85"/>
  <path class="c-dressd" d="M-11 -64Q0 -68 11 -64L10 -50H-10Z" fill="${dressDark}"/><path d="M-11 -53h22v4h-22Z" fill="${C.gold}"/>
  <path class="c-dressd-s" d="M-8 -62Q-13 -50 -2 -44M8 -62Q13 -50 4 -44" stroke="${dressDark}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="1" cy="-44" r="4" fill="${C.skin}"/>
  <circle cy="-75" r="12" fill="${C.skin}"/><path d="M-13 -74Q-14 -90 0 -90Q14 -90 13 -77Q7 -84 0 -82Q-6 -84 -10 -78Q-12 -74 -13 -62Z" fill="${hair}"/>
  <path d="M-8 -87l3-6 3 4 2-6 2 6 3-4 3 6Z" fill="${C.gold}"/><circle cy="-89" r="1.6" fill="${C.rose}"/>
  <circle cx="6" cy="-75" r="1.8" fill="${C.ink}"/><circle cx="8" cy="-70" r="2.4" fill="#e9a28c" opacity=".55"/><path d="M4 -68q2.5 2 5 0" stroke="${C.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
}

// A small glowing fairy centred on its origin. Classes .fairy-glow and .wing are for GSAP.
export const fairy = () => `<circle class="fairy-glow" r="15" fill="${C.glow}" opacity=".45"/><ellipse class="wing" cx="-6" cy="-5" rx="8" ry="4.5" fill="#ffffff" opacity=".75" transform="rotate(-35 -6 -5)"/><ellipse class="wing" cx="6" cy="-5" rx="8" ry="4.5" fill="#ffffff" opacity=".75" transform="rotate(35 6 -5)"/><circle r="5" fill="#fffbe6"/>`;

// The desert king's raised-arm shoulder: <g class="gan-arm"> turns around it.
export const KING_SHOULDER = [10, -84];
// A tall desert king with red hair, a gold circlet and a dark cape (about 136 tall). armUp raises his
// front hand; orb puts a glowing ball in it (<g class="orb"> with .orb-glow).
export function desertKing({ armUp = true, orb = true } = {}) {
  const skin = '#a9805f', red = '#b5523b', armour = '#6e6257';
  const arm = armUp
    ? `<path d="M10 -84Q22 -100 22 -120" stroke="${armour}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="22" cy="-122" r="5.5" fill="${skin}"/>
      ${orb ? `<g class="orb"><circle class="orb-glow" cx="24" cy="-134" r="14" fill="${C.glow}" opacity=".55"/><circle cx="24" cy="-134" r="7" fill="#f2d36b"/><circle cx="24" cy="-134" r="3.5" fill="#fffbe6"/></g>` : ''}`
    : `<path d="M10 -84Q22 -66 16 -48" stroke="${armour}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="16" cy="-46" r="5.5" fill="${skin}"/>`;
  return `<path d="M-18 -88Q-30 -40 -36 0H24Q16 -40 14 -88Z" fill="#4b4038"/>
  <path d="M-8 -38V-4M8 -38V-4" stroke="#3f352f" stroke-width="10" stroke-linecap="round"/><path d="M-15 -8h14v8h-14ZM2 -8h16v8H2Z" fill="#2f2823"/>
  <path d="M-12 -82Q-20 -64 -16 -48" stroke="${armour}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="-16" cy="-46" r="5.5" fill="${skin}"/>
  <path d="M-18 -90Q0 -96 18 -90L16 -36H-16Z" fill="${armour}"/><path d="M-12 -84h24v18q-12 8-24 0Z" fill="#8a7a68"/>
  <path d="M-17 -44h34v6h-34Z" fill="${C.gold}"/><circle cy="-41" r="3" fill="#6fae8f"/>
  <ellipse cx="-14" cy="-88" rx="9" ry="6" fill="#5a4e45"/><ellipse cx="14" cy="-88" rx="9" ry="6" fill="#5a4e45"/>
  <path d="M-14 -108Q-26 -100 -22 -86Q-14 -92 -10 -100Z" fill="${red}"/>
  <circle cy="-106" r="14" fill="${skin}"/>
  <path d="M-14 -104Q-22 -118 -12 -126Q-8 -134 0 -128Q6 -136 12 -126Q20 -120 14 -108Q8 -118 0 -116Q-8 -116 -14 -104Z" fill="${red}"/>
  <path d="M-13 -114q13-4 26 0v4q-13-4-26 0Z" fill="${C.gold}"/><circle cx="2" cy="-114" r="2.2" fill="#6fae8f"/>
  <path d="M3 -110l9 3" stroke="#5a3a2a" stroke-width="2.4" stroke-linecap="round"/><circle cx="8" cy="-105" r="1.9" fill="${C.ink}"/>
  <path d="M2 -96q6 6 12-2q-2 8-8 8q-4 0-4-6Z" fill="${red}"/><path d="M5 -98q4 2 8-1" stroke="#5a3a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <g class="gan-arm">${arm}</g>`;
}

// A boar-like monster with a red mane, tusks and yellow eyes (about 120 wide, 80 tall).
export const boar = () => `<ellipse rx="46" ry="7" fill="${C.green}" opacity=".18"/>
  <path d="M-44 -40q-10-4-8-12" stroke="#5a4636" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-30 -20v18M-14 -18v16M18 -18v16M32 -20v18" stroke="#3f352f" stroke-width="10" stroke-linecap="round"/>
  <ellipse cy="-36" rx="44" ry="28" fill="#5a4636"/>
  <path d="M-40 -46Q-30 -78 -8 -66Q6 -84 22 -64Q34 -70 40 -52Q10 -60 -40 -46Z" fill="#b5523b"/>
  <path d="M34 -54l4-14 8 12Z" fill="#5a4636"/><ellipse cx="44" cy="-40" rx="22" ry="18" fill="#6b5442"/>
  <ellipse cx="62" cy="-34" rx="9" ry="8" fill="#8a6a55"/><circle cx="64" cy="-36" r="1.6" fill="#3f352f"/><circle cx="60" cy="-33" r="1.6" fill="#3f352f"/>
  <path d="M54 -26q9-1 11-13q-1 11-12 11Z" fill="${C.cream}"/>
  <circle cx="48" cy="-46" r="3.4" fill="#f2d36b"/><path d="M42 -53l10 3" stroke="#3f352f" stroke-width="2.5" stroke-linecap="round"/>`;

// A burst of light rays for hits and rewards: <g class="burst" opacity="0"> with <g class="burst-rays">.
// Animate it with burstAt() from game.js.
export const burst = (rays = 10, inner = 14, outer = 40) => `<g class="burst" opacity="0"><g class="burst-rays">${Array.from({ length: rays }, (_, i) => `<path transform="rotate(${(i * 360 / rays).toFixed(1)})" d="M-3 -${inner}L0 -${outer}L3 -${inner}Z" fill="${C.glow}"/>`).join('')}<circle r="${inner}" fill="${C.glow}" opacity=".8"/></g></g>`;
