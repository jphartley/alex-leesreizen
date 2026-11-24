// Zelda-mythen artwork: original SVG illustrations, all local. Nothing is copied from the games: the
// adventurer is the same made-up hero as in zelda-3d (rust scarf, round shield), and the sword, pedestal,
// tree spirit, fairy, horse and flying boy are generic. The hero doubles as the sword-in-the-stone game:
// motion.js moves .hero (origin at the feet, scaled by S), bends the .arm paths to the .hand positions,
// moves .sword (origin at the grip, angle 0 = blade down; clipped where it sits inside the stone), .fairy
// and the .ring, and lights the .tri-piece triangles and .tri-label words. Every id is prefixed with the
// journey slug so several journeys can share a page.
const slug = 'zelda-mythen';

const C = { ink: '#3b342e', cream: '#f7f1df', paper: '#fbf6e6', green: '#284f3d', sage: '#517c67', olive: '#9cac66', moss: '#6f9463', wood: '#b8916b', woodDark: '#8c6a4c', rust: '#b76e55', yellow: '#e8c65a', gold: '#c9a24a', skin: '#e3b9a0', hair: '#6b4a32', tunic: '#5f7f9b', tunicDark: '#4d6a84', stone: '#a9ab9a', stoneDark: '#8e9182', stoneLight: '#c9cbb9', glow: '#fff8df' };

// Shared with motion.js: hero scale and spots, the sword's resting grip, the stone surface and the Triforce.
export const S = 1.5, HOME = { x: 296, y: 652 }, SPOT = { x: 372, y: 650 }, SWORD = { x: 412, y: 525 }, STONE_Y = 575;
export const TRI = { x: 412, y: 200, side: 60 }, PIECE_FILL = '#efe3b8', PIECE_LIT = C.yellow;
// Shoulders and resting hands in the adventurer's own coordinates (back arm first).
export const SHOULDERS = [[-5, -58], [6, -58]], REST = [[-9, -31], [12, -32]];
const RAISED = [[8, -99], [8, -109]];

// An arm from shoulder to hand; short arms bend at the elbow, long arms stretch.
export function armPath([sx, sy], [hx, hy]) {
  const dx = hx - sx, dy = hy - sy, len = Math.hypot(dx, dy) || 1, bend = Math.max(0, 34 - len) * .7;
  const mx = (sx + hx) / 2 - dy / len * bend, my = (sy + hy) / 2 + dx / len * bend;
  return `M${sx} ${sy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${hx.toFixed(1)} ${hy.toFixed(1)}`;
}

const label = (x, y, text, size = 15, fill = '#687366', anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="sans-serif" font-size="${size}" font-weight="700" fill="${fill}">${text}</text>`;
const sparkle = (x, y, s, d = 0, fill = '#a28056') => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="${fill}" transform="translate(${-3 * s} ${7 * s})"/>`;
const heart = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6c-6-12-24-11-24 4c0 12 15 21 24 29c9-8 24-17 24-29c0-15-18-16-24-4Z" fill="${fill}"/>`;
const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;
// A row of rounded treetops along a line, used for forest silhouettes.
const treeline = (base, top, step, fill, cls = '', x0 = -20, x1 = 740) => {
  let d = `M${x0} ${base}V${top}`;
  for (let x = x0, k = 0; x < x1; x += step, k++) d += `q${step / 2} ${-(18 + (k * 37) % 26)} ${step} 0`;
  return `<path${cls ? ` class="${cls}"` : ''} d="${d}V${base}Z" fill="${fill}"/>`;
};
const tuft = (x, y, fill = '#6f9a78', cls = 'tuft') => `<path class="${cls}" d="M${x - 10} ${y}l4-22 5 16 4-24 5 22 5-14 2 22Z" fill="${fill}"/>`;
const flower = (x, y, fill = C.cream) => `<g transform="translate(${x} ${y})"><path d="M0 0v-12" stroke="${C.moss}" stroke-width="2"/><circle cy="-14" r="4.5" fill="${fill}"/><circle cy="-14" r="1.8" fill="${C.yellow}"/></g>`;

// The Triforce: three triangles around a centre line. Pieces are Kracht (top), Wijsheid (left) and Moed (right).
function triforce(cx, cy, side, { fill = PIECE_FILL, game = false, cls = '' } = {}) {
  const h = side * .866, pts = [[cx, cy - h, cx + side / 2, cy, cx - side / 2, cy], [cx - side / 2, cy, cx, cy + h, cx - side, cy + h], [cx + side / 2, cy, cx + side, cy + h, cx, cy + h]];
  const pieces = pts.map((p, i) => `<path${game ? ` class="tri-piece" data-piece="${i}"` : ''} d="M${p[0]} ${p[1]}L${p[2]} ${p[3]}L${p[4]} ${p[5]}Z" fill="${fill}" stroke="${C.gold}" stroke-width="${game ? 2 : 1.5}" stroke-linejoin="round"/>`).join('');
  const words = game ? [['KRACHT', cx, cy - h - 12], ['WIJSHEID', cx - side / 2, cy + h + 20], ['MOED', cx + side / 2, cy + h + 20]].map(([t, x, y], i) => `<g class="tri-label" data-piece="${i}" opacity="0">${label(x, y, t, 11, C.green)}</g>`).join('') : '';
  return `<g${cls ? ` class="${cls}"` : ''}>${pieces}${words}</g>`;
}

// A plain sword with its origin at the middle of the grip; at angle 0 the blade points down.
const sword = (glow = false) => `<ellipse class="sword-glow" cx="0" cy="62" rx="15" ry="64" fill="${C.glow}" opacity="${glow ? .8 : 0}"/>
  <path d="M-3.5 14h7v92l-3.5 9-3.5-9Z" fill="#e6eae6"/><path d="M0 17v90" stroke="#c4cbc6" stroke-width="1.4"/>
  <path d="M-17 8q17 5 34 0l-2 7q-15 4-30 0Z" fill="${C.gold}"/><circle cy="11.5" r="3" fill="#6fae8f"/>
  <rect x="-3.5" y="-10" width="7" height="19" rx="2" fill="${C.hair}"/><path d="M-3.5 -5h7M-3.5 0h7M-3.5 5h7" stroke="${C.woodDark}" stroke-width="1.5"/>
  <circle cy="-13" r="5" fill="${C.gold}"/>`;

// The adventurer, facing right and standing on its own origin (the feet). hands are the two hand
// positions; holding adds a raised sword between them.
function adventurer({ hands = REST, tunic = C.tunic, tunicDark = C.tunicDark, scarf = C.rust, hair = C.hair, shield = true, holding = false } = {}) {
  const arm = (k, cls) => `<path class="arm ${cls}" d="${armPath(SHOULDERS[k], hands[k])}" stroke="${k ? tunic : tunicDark}" stroke-width="7" fill="none" stroke-linecap="round"/><circle class="hand ${cls}-hand" cx="${hands[k][0]}" cy="${hands[k][1]}" r="4.5" fill="${C.skin}"/>`;
  return `<ellipse cx="0" cy="0" rx="22" ry="5" fill="${C.green}" opacity=".18"/><g class="hero-body">
  ${holding ? `<g transform="translate(8 -104) rotate(180) scale(.75)">${sword(true)}</g>` : ''}
  ${arm(0, 'arm-back')}
  ${shield ? `<g transform="translate(-15 -47)"><circle r="14" fill="#a07d5a"/><circle r="12.5" fill="none" stroke="#7d8f86" stroke-width="3"/><path d="M0 -7v14M-7 0h14" stroke="${C.woodDark}" stroke-width="2.5"/></g>` : ''}
  <path d="M-7 -30V-4M7 -30V-4" stroke="#6b5a48" stroke-width="8" stroke-linecap="round"/><path d="M-13 -7h12v7h-12ZM1 -7h14v7H1Z" fill="#5a4636"/>
  <path d="M-15 -60Q0 -66 15 -60L19 -26H-19Z" fill="${tunic}"/><path d="M-17 -38h35v5h-35Z" fill="${C.woodDark}"/><path d="M-2 -38h6v5h-6Z" fill="${C.gold}"/>
  ${scarf ? `<path d="M-10 -58l-15 9 4 6 13-9Z" fill="${scarf}"/><path d="M-12 -63q12 7 24 0l-1 8q-11 6-22 0Z" fill="${scarf}"/>` : ''}
  <circle cx="0" cy="-77" r="14" fill="${C.skin}"/><path d="M-15 -76Q-16 -94 1 -94Q16 -94 15 -81Q8 -89 -1 -87Q-6 -86 -9 -82Q-11 -78 -15 -70Z" fill="${hair}"/>
  <circle cx="7" cy="-77" r="2" fill="${C.ink}"/><circle cx="9" cy="-71" r="2.6" fill="#e9a28c" opacity=".55"/><path d="M5 -70q3 2 6 0" stroke="${C.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  ${arm(1, 'arm-front')}
  </g>`;
}

// A small glowing fairy with two wings, on its own origin.
const fairyShape = (cls = '') => `<circle class="fairy-glow${cls}" r="15" fill="${C.glow}" opacity=".45"/><ellipse class="wing" cx="-6" cy="-5" rx="8" ry="4.5" fill="#ffffff" opacity=".75" transform="rotate(-35 -6 -5)"/><ellipse class="wing" cx="6" cy="-5" rx="8" ry="4.5" fill="#ffffff" opacity=".75" transform="rotate(35 6 -5)"/><circle r="5" fill="#fffbe6"/>`;

// A stepped stone pedestal; the blade enters the top at (x, top).
function pedestal(x, top, k = 1, mark = true) {
  const w = 56 * k, base = top + 31 * k;
  return `<ellipse cx="${x}" cy="${base + 14 * k}" rx="${96 * k}" ry="${22 * k}" fill="${C.stoneDark}"/><ellipse cx="${x}" cy="${base}" rx="${96 * k}" ry="${22 * k}" fill="#b4b6a5"/>
  <path d="M${x - w} ${top}L${x - w + 6 * k} ${base}Q${x} ${base + 16 * k} ${x + w - 6 * k} ${base}L${x + w} ${top}Z" fill="${C.stone}"/>
  <ellipse cx="${x}" cy="${top}" rx="${w}" ry="${13 * k}" fill="${C.stoneLight}"/><ellipse cx="${x}" cy="${top}" rx="${7 * k}" ry="${2.5 * k}" fill="${C.stoneDark}"/>
  ${mark ? triforce(x, top + 18 * k, 9 * k, { fill: C.stoneDark }).replace(/stroke="[^"]*"/g, 'stroke="none"') : ''}
  <path d="M${x - w + 4 * k} ${top + 6 * k}q8 6 18 2q-4 8-16 6Z" fill="#7d9a6a"/><path d="M${x + 30 * k} ${base + 4 * k}q16-6 30 2q-14 8-30-2Z" fill="#7d9a6a"/>`;
}

// The hero scene: a forest glade with a sword in a stone pedestal between old temple pillars, and the
// Triforce floating above. The adventurer waits nearby with a fairy.
function glade(id) {
  const p = `${slug}-${id}`;
  const rays = [[300, 360], [372, 430], [452, 505]].map(([a, b], i) => `<path class="ray" d="M${a} -10H${a + 46}L${b + 64} 640H${b - 6}Z" fill="${C.glow}" opacity="${[.22, .16, .2][i]}"/>`).join('');
  const spirits = [[150, 450], [236, 360], [560, 380], [636, 486], [492, 316], [292, 440], [618, 330], [118, 560], [530, 470]].map(([x, y], i) => `<circle class="spirit" cx="${x}" cy="${y}" r="${i % 3 ? 3 : 4.5}" fill="#fffbe6" opacity=".7"/>`).join('');
  const leaves = [[120, 150], [210, 110], [560, 130], [640, 170], [470, 90], [300, 70]].map(([x, y], i) => `<path class="leaf" d="M${x} ${y}q7-7 14 0q-7 7-14 0Z" fill="${i % 2 ? C.olive : C.moss}"/>`).join('');
  const stones = [[250, 704, 30], [300, 680, 26], [338, 662, 20]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .36}" fill="#d8cfb4"/>`).join('');
  const tree = (cls, flip) => `<g${flip ? ' transform="translate(720 0) scale(-1 1)"' : ''}>
    <path d="M-20 0H74Q60 220 80 460Q94 560 146 604H-20Z" fill="#7a6450"/><path d="M60 560q46 30 120 46q-70 8-116-12Z" fill="#7a6450"/>
    <path d="M30 120q-6 120 6 240M54 300q-8 90 6 190" stroke="#665341" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="${cls}">${flip
      // The right canopy stays clear of the top-right corner, where the page puts its stamp.
      ? `<circle cx="30" cy="-46" r="100" fill="#3d6b52"/><circle cx="170" cy="-30" r="70" fill="#46745a"/><circle cx="10" cy="236" r="62" fill="#46745a"/><circle cx="140" cy="40" r="44" fill="${C.sage}"/><circle cx="56" cy="262" r="30" fill="${C.sage}"/>`
      : `<circle cx="40" cy="30" r="116" fill="#3d6b52"/><circle cx="160" cy="0" r="82" fill="#46745a"/><circle cx="18" cy="176" r="70" fill="#46745a"/><circle cx="120" cy="96" r="54" fill="${C.sage}"/><circle cx="60" cy="210" r="34" fill="${C.sage}"/>`}
    <path d="${flip ? 'M150 20q4 50-4 90M112 60q6 50-2 80' : 'M150 70q4 60-4 110M112 130q6 50-2 80'}" stroke="#5f8a62" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een open plek in een oud bos, tussen twee stenen pilaren van een vervallen tempel. In het midden steekt een zwaard muurvast in een stenen sokkel, en daarboven zweven drie gouden driehoeken. Een held met een rode sjaal en een rond schild staat vlakbij, met een klein lichtgevend elfje naast zich">
  <defs><linearGradient id="${p}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e8d3"/><stop offset="1" stop-color="#f4ecd3"/></linearGradient>
  <clipPath id="${p}-stone"><rect x="0" y="0" width="720" height="${STONE_Y + 1}"/></clipPath></defs>
  <rect width="720" height="760" fill="url(#${p}-sky)"/>
  <circle class="tri-glow" cx="${TRI.x}" cy="${TRI.y + 6}" r="96" fill="${C.glow}" opacity=".55"/>
  ${treeline(540, 340, 70, '#c6ceae', 'layer')}
  ${treeline(540, 392, 56, '#a9b894', 'layer')}
  <g class="layer"><path d="M0 468Q200 440 360 452Q560 440 720 466V760H0Z" fill="${C.olive}"/><ellipse cx="404" cy="612" rx="260" ry="80" fill="#b3be7d"/>${stones}</g>
  ${rays}
  <g class="layer"><path d="M316 560V470l8-10 6 8 6-14 10 12V560Z" fill="#cfcab3"/><path d="M316 470h30V560h-30Z" fill="#cfcab3"/><path d="M336 470V560" stroke="#b7b29c" stroke-width="4"/><path d="M310 556h42v10h-42Z" fill="#b7b29c"/><path d="M318 500q10 8 26 4" stroke="#7d9a6a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M482 556V438h28V556Z" fill="#cfcab3"/><path d="M474 428h44v12h-44Z" fill="#b7b29c"/><path d="M496 440V556" stroke="#b7b29c" stroke-width="4"/><path d="M476 552h40v10h-40Z" fill="#b7b29c"/><path d="M484 470q12 10 26 2" stroke="#7d9a6a" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  ${triforce(TRI.x, TRI.y, TRI.side, { game: true, cls: 'triforce' })}
  ${pedestal(SWORD.x, STONE_Y)}
  <g class="dust">${[0, 1, 2, 3, 4].map(i => `<circle cx="${SWORD.x + (i - 2) * 8}" cy="${STONE_Y}" r="${3 + (i % 2) * 2}" fill="#e3dcc4" opacity="0"/>`).join('')}</g>
  ${tree('canopy', false)}${tree('canopy', true)}
  ${spirits}${leaves}
  ${tuft(70, 700)}${tuft(110, 724)}${tuft(640, 690)}${tuft(600, 724)}${tuft(520, 660)}${tuft(214, 650)}
  ${flower(160, 690)}${flower(184, 706, '#f2d79a')}${flower(560, 700)}${flower(588, 680, '#f2d79a')}${flower(470, 690)}
  <g clip-path="url(#${p}-stone)"><g class="sword" transform="translate(${SWORD.x} ${SWORD.y})">${sword()}</g></g>
  <g class="hero" transform="translate(${HOME.x} ${HOME.y}) scale(${S})">${adventurer()}</g>
  <g class="fairy" transform="translate(${HOME.x + 40} ${HOME.y - 150})">${fairyShape()}</g>
  <g class="ring-g" opacity="0" transform="translate(${SWORD.x} ${SWORD.y + 8})"><circle class="ring-target" r="36" fill="none" stroke="${C.paper}" stroke-width="3" stroke-dasharray="5 7"/><circle class="ring-flash" r="36" fill="none" stroke="${C.yellow}" stroke-width="6" opacity="0"/><circle class="ring" r="96" fill="none" stroke="${C.yellow}" stroke-width="4"/></g>
  <g class="burst" opacity="0" transform="translate(${SWORD.x} 450)"><g class="burst-rays">${Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M-4 -30L0 -92L4 -30Z" fill="${C.glow}"/>`).join('')}<circle r="30" fill="${C.glow}" opacity=".8"/></g></g>
  <g class="game-hint" opacity="0"><rect x="96" y="662" width="528" height="34" rx="17" fill="#f9f7e5" opacity=".94"/>
  <text class="hint-text" x="360" y="684" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="${C.green}">Klik op het bos en probeer het zwaard te trekken</text></g>
</svg>`;
}

// Chapter 2: Arthur and the hero side by side, each holding up a sword above its stone.
function twoSwords(p) {
  const arch = x => `M${x} 520V200a135 135 0 0 1 270 0V520Z`;
  const crown = `<g class="m-float" style="--d:-1s"><path d="M262 330l8-22 12 14 10-20 10 20 12-14 8 22Z" fill="${C.yellow}"/><path d="M262 330h60v8h-60Z" fill="${C.gold}"/><circle cx="292" cy="320" r="3.5" fill="${C.rust}"/></g>`;
  const left = `<rect x="62" y="60" width="270" height="470" fill="#efe3c6"/>
    <g fill="#d3c8aa"><path d="M96 330h60v-40h-10v-14h-8v14h-24v-14h-8v14h-10Z"/><path d="M108 268v-14l6-8 6 8v14Z"/></g><path d="M114 246v-16l12 5-12 5" fill="${C.rust}"/>
    <path d="M62 520V398Q197 350 332 398V520Z" fill="${C.olive}"/><path d="M62 520V440Q197 410 332 440V520Z" fill="${C.moss}" opacity=".5"/>
    <path d="M144 476q-6-36 22-44h58q26 6 22 44Z" fill="${C.stone}"/><path d="M152 444q30-8 88-2" stroke="${C.stoneLight}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="200" cy="436" rx="7" ry="2.5" fill="${C.stoneDark}"/>
    <g transform="translate(252 494) scale(-.95 .95)">${adventurer({ hands: RAISED, tunic: C.rust, tunicDark: '#9c5c47', scarf: null, hair: '#c9a26a', shield: false, holding: true })}</g>
    ${crown}${sparkle(240, 300, .9, -.5)}${sparkle(320, 370, .7, -1.5)}${tuft(100, 512, C.moss, 'm-sway')}`;
  const right = `<rect x="388" y="60" width="270" height="470" fill="#dfe8d4"/>
    ${treeline(420, 330, 46, '#b9c6a4', '', 388, 660)}
    <path d="M388 520V420Q523 392 658 420V520Z" fill="${C.olive}"/>
    ${pedestal(486, 446, .55, false)}
    <g transform="translate(566 492) scale(-.95 .95)">${adventurer({ hands: RAISED, holding: true })}</g>
    <g class="m-float" style="--d:-2s">${triforce(586, 318, 22, { fill: C.yellow })}</g>${sparkle(530, 300, .8, -1)}${sparkle(632, 360, .7, -2)}${tuft(630, 512, C.moss, 'm-sway')}`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie met twee bogen naast elkaar. Links houdt de jonge Arthur een zwaard omhoog bij een steen, met een kasteel in de verte en een gouden kroon boven zich. Rechts houdt een held een zwaard omhoog bij een stenen sokkel in het bos, met drie gouden driehoeken boven zich">
  ${backdrop('#f4efdf', '#ece7d3')}
  <defs><clipPath id="${p}-left"><path d="${arch(62)}"/></clipPath><clipPath id="${p}-right"><path d="${arch(388)}"/></clipPath></defs>
  <g clip-path="url(#${p}-left)">${left}</g><g clip-path="url(#${p}-right)">${right}</g>
  <path d="${arch(62)}" fill="none" stroke="#c9b892" stroke-width="5"/><path d="${arch(388)}" fill="none" stroke="#c9b892" stroke-width="5"/>
  <circle cx="360" cy="330" r="20" fill="${C.cream}"/><path d="M350 324h20M350 336h20" stroke="${C.sage}" stroke-width="4" stroke-linecap="round"/>
  ${label(197, 560, 'ARTHUR', 15)}${label(523, 560, 'HYRULE', 15)}
</svg>`;
}

// Chapter 3: a sacred giant tree with a friendly face and a straw rope, a red gate, nature spirits and a
// banner with three triangles.
function spiritTree() {
  const spirits = [[214, 300], [286, 250], [560, 320], [520, 456], [250, 470], [604, 250], [330, 330]].map(([x, y], i) => `<circle class="m-float" style="--d:-${i * .7}s" cx="${x}" cy="${y}" r="${i % 2 ? 4 : 6}" fill="#fffbe6" opacity=".85"/>`).join('');
  const shide = [406, 434, 462].map((x, i) => `<path class="m-sway" style="--d:-${i}s" d="M${x} 338l7 8-9 7 9 8-7 7" stroke="${C.paper}" stroke-width="4.5" fill="none" stroke-linejoin="round"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een eeuwenoude reuzenboom met een vriendelijk gezicht in zijn stam en een dik heilig touw met witte papieren slingers eromheen. Ervoor staat een rode Japanse poort, achter de boom een berg met sneeuw, en overal zweven kleine lichtjes. Rechts wappert een vlag met drie driehoeken">
  ${backdrop('#f1eedd', '#e3ead6')}
  <path d="M136 430L312 196L392 290L446 246L600 430Z" fill="#c7cdb5"/><path d="M286 230L312 196L340 232L324 226L312 236L298 226Z" fill="${C.cream}"/>
  <ellipse class="m-drift" cx="300" cy="380" rx="150" ry="14" fill="${C.cream}" opacity=".7"/>
  <path d="M110 468Q360 428 610 468L626 560Q360 604 94 560Z" fill="${C.olive}"/>
  <path d="M100 548Q200 512 300 530T540 560L560 594Q380 584 280 566T96 586Z" fill="#a9c6c0"/><path class="m-drift" d="M170 552q20-6 40 0M330 556q20-6 40 0" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="m-sway" style="--d:-2s"><circle cx="440" cy="196" r="112" fill="#3d6b52"/><circle cx="336" cy="236" r="70" fill="#46745a"/><circle cx="544" cy="236" r="72" fill="#46745a"/><circle cx="388" cy="132" r="68" fill="${C.sage}"/><circle cx="498" cy="128" r="64" fill="${C.sage}"/><circle cx="440" cy="250" r="50" fill="#46745a"/></g>
  <path d="M386 540Q398 470 394 380Q390 320 404 286H476Q490 326 484 388Q480 470 502 540Q444 556 386 540Z" fill="${C.woodDark}"/>
  <path d="M388 536q-44 8-76 2q32-12 54-20Z" fill="${C.woodDark}"/><path d="M500 536q42 6 70 0q-30-12-50-16Z" fill="${C.woodDark}"/>
  <path d="M408 380q-6 30 2 60M474 380q6 30-2 60" stroke="#76583f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M412 422q9 7 18 0M452 422q9 7 18 0" stroke="#5a4636" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="410" cy="438" r="7" fill="#c98f6d" opacity=".45"/><circle cx="472" cy="438" r="7" fill="#c98f6d" opacity=".45"/>
  <path d="M426 452q15 12 30 0" stroke="#5a4636" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M390 326q50 20 100 0" stroke="#e3cba3" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M400 324l6 9M416 329l6 9M432 332l6 9M448 332l6 9M464 329l6 9M478 324l6 9" stroke="#c9a77a" stroke-width="2.5" stroke-linecap="round"/>
  ${shide}
  <rect x="158" y="384" width="12" height="150" fill="${C.rust}"/><rect x="254" y="384" width="12" height="150" fill="${C.rust}"/><rect x="154" y="526" width="20" height="10" fill="${C.ink}"/><rect x="250" y="526" width="20" height="10" fill="${C.ink}"/>
  <rect x="144" y="408" width="136" height="10" fill="${C.rust}"/><path d="M136 384Q212 396 288 384V394Q212 406 136 394Z" fill="${C.rust}"/><path d="M124 366Q212 382 300 366L306 376Q212 390 118 376Z" fill="${C.ink}"/><rect x="206" y="392" width="12" height="18" fill="${C.rust}"/>
  <path d="M612 532V232" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/><g class="m-sway" style="--d:-1s"><path d="M574 240h36v136h-36Z" fill="${C.cream}"/>${triforce(592, 300, 20, { fill: C.green }).replace(/stroke="[^"]*"/g, 'stroke="none"')}</g>
  ${spirits}${tuft(150, 556, C.moss, 'm-sway')}${tuft(590, 560, C.moss, 'm-sway')}
</svg>`;
}

// Chapter 4, variant 'epona': a horse grazing beside old standing stones, one carved with a triple spiral.
function horse() {
  const spiral = (x, y) => `<g transform="translate(${x} ${y})" stroke="${C.stoneDark}" stroke-width="2.5" fill="none" stroke-linecap="round">${[0, 120, 240].map(a => `<path transform="rotate(${a})" d="M0 0q0-14 10-14q8 0 8 7q0 6-6 6q-4 0-4-4"/>`).join('')}</g>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een bruin paard met een lichte manen in een weide bij drie oude staande stenen. Op een van de stenen staat een Keltisch teken van drie spiralen. De zon schijnt laag boven de heuvels">
  ${backdrop('#f4efdf', '#e9ead2')}
  <circle cx="512" cy="196" r="58" fill="#f6e2a6" opacity=".55"/><circle cx="512" cy="196" r="38" fill="#f2d79a"/>
  <path d="M136 400Q260 330 400 370Q520 330 596 380L610 440H120Z" fill="#c3cba9"/>
  <path d="M110 430Q360 390 618 430L624 548Q360 600 96 548Z" fill="${C.olive}"/>
  <path d="M166 446V318q16-14 34 0V446Z" fill="${C.stone}"/><path d="M212 446V286q22-16 44 0V446Z" fill="#b4b6a5"/><path d="M268 446V330q14-12 30 0V446Z" fill="${C.stone}"/>${spiral(234, 340)}
  <g class="m-bob" style="--d:-1s">
    <path class="m-sway" d="M478 396q36 8 34 72q-14-30-36-52Z" fill="${C.cream}"/>
    <path d="M356 424v76M378 430v72M440 430v72M462 424v76" stroke="#a07d5a" stroke-width="12" stroke-linecap="round"/>
    <path d="M356 494v8M378 496v8M440 496v8M462 494v8" stroke="${C.cream}" stroke-width="12"/>
    <ellipse cx="410" cy="404" rx="80" ry="38" fill="${C.wood}"/>
    <path d="M344 402L308 320Q318 296 346 304L390 388Z" fill="${C.wood}"/>
    <ellipse cx="310" cy="330" rx="34" ry="17" transform="rotate(-50 310 330)" fill="${C.wood}"/><ellipse cx="294" cy="352" rx="13" ry="10" transform="rotate(-50 294 352)" fill="#a07d5a"/>
    <path d="M324 300l2-18 9 14Z" fill="${C.wood}"/><circle cx="318" cy="318" r="3" fill="${C.ink}"/>
    <path d="M330 298Q352 312 384 390L370 394Q344 330 324 308Z" fill="${C.cream}"/>
  </g>
  ${flower(170, 520)}${flower(200, 536, '#f2d79a')}${flower(540, 520)}${flower(560, 540, '#f2d79a')}${tuft(130, 540, C.moss, 'm-sway')}${tuft(600, 536, C.moss, 'm-sway')}
  ${sparkle(234, 260, .8, -1)}
</svg>`;
}

// Chapter 4, variant 'peterpan': a boy in a green leaf tunic flies over moonlit rooftops after a tiny fairy.
function flyingBoy(p) {
  const stars = [[200, 160], [260, 120], [330, 180], [420, 110], [560, 160], [610, 240], [160, 250], [500, 230], [380, 150]].map(([x, y], i) => `<circle class="m-twinkle" style="--d:-${i * .6}s" cx="${x}" cy="${y}" r="${i % 3 ? 2 : 3}" fill="${C.paper}"/>`).join('');
  const roofs = `<path d="M137 540V430l40-34 40 34v-20h24v-30l40-36 40 36v50l36-30 36 30v-40h20l44-40 44 40v30l30-24 40 30V540Z" fill="${C.green}"/>
    <rect x="252" y="352" width="14" height="30" fill="${C.green}"/><rect x="470" y="340" width="14" height="30" fill="${C.green}"/>
    ${[[168, 450], [296, 420], [394, 450], [474, 430], [536, 470], [228, 480]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="18" rx="2" fill="#f2d79a" opacity=".9"/>`).join('')}`;
  const trail = [[408, 268], [436, 262], [462, 252], [486, 240]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.5 + i * .6}" fill="#fffbe6" opacity="${.4 + i * .15}"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een jongen in een groene tuniek van bladeren die 's nachts over de daken van een stad vliegt. Voor hem uit vliegt een klein lichtgevend elfje met een spoor van sterretjes. Aan de hemel staan sterren en een maansikkel">
  <rect width="720" height="650" fill="#efeadb"/><defs><clipPath id="${p}-night"><circle cx="360" cy="315" r="223"/></clipPath></defs>
  <g clip-path="url(#${p}-night)"><rect x="100" y="80" width="520" height="480" fill="#355a52"/>${stars}
  <circle cx="500" cy="170" r="30" fill="${C.cream}"/><circle cx="514" cy="160" r="28" fill="#355a52"/>${roofs}</g>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <g class="m-float"><g transform="translate(320 300) rotate(-12)">
    <path d="M-60 2H-24M-58 14H-26" stroke="#6b5a48" stroke-width="8" stroke-linecap="round"/><path d="M-68 -2h10v8h-10ZM-66 10h10v8h-10Z" fill="#5a4636"/>
    <path d="M-30 -12Q0 -22 26 -12L30 18L22 12L16 20L8 13L0 21L-8 13L-16 20L-22 12L-30 18Z" fill="${C.moss}"/><path d="M-30 4h58v5h-58Z" fill="${C.woodDark}"/>
    <path d="M0 -14Q-24 -10 -34 4" stroke="#5f8a62" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-36" cy="6" r="4.5" fill="${C.skin}"/>
    <circle cx="42" cy="-14" r="13" fill="${C.skin}"/><path d="M30 -16Q28 -32 44 -30Q56 -30 56 -18Q48 -26 40 -22L34 -12Z" fill="#a0583e"/><path d="M40 -32l-4-8 8 4ZM48 -30l2-9 4 8Z" fill="#a0583e"/>
    <circle cx="48" cy="-14" r="2" fill="${C.ink}"/><path d="M46 -7q3 2 6 0" stroke="${C.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M22 -12Q46 -18 66 -30" stroke="${C.moss}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="68" cy="-31" r="4.5" fill="${C.skin}"/>
  </g></g>
  ${trail}<g class="m-float" style="--d:-2s"><g transform="translate(504 232)">${fairyShape()}</g></g>
</svg>`;
}

// Chapter 5: three ribbons, from a gate, a sword in a stone and a fairy-tale book, flow into one game screen.
function together() {
  const torii = `<g transform="translate(150 214)"><rect x="-34" y="-50" width="7" height="50" fill="${C.rust}"/><rect x="27" y="-50" width="7" height="50" fill="${C.rust}"/><rect x="-40" y="-40" width="80" height="6" fill="${C.rust}"/><path d="M-48 -56Q0 -48 48 -56L50 -50Q0 -42 -50 -50Z" fill="${C.ink}"/></g>`;
  const stone = `<g transform="translate(360 214)"><path d="M-40 0q-4-26 16-30h48q20 4 16 30Z" fill="${C.stone}"/><g transform="translate(0 -60) scale(.6)">${sword()}</g></g>`;
  const book = `<g transform="translate(570 214)"><path d="M0 -6Q-26 -20 -52 -12V-2Q-26 -10 0 4Q26 -10 52 -2V-12Q26 -20 0 -6Z" fill="${C.rust}"/><path d="M0 -10Q-24 -28 -48 -20V-6Q-24 -14 0 -2Z" fill="${C.paper}"/><path d="M0 -10Q24 -28 48 -20V-6Q24 -14 0 -2Z" fill="${C.cream}"/><path d="M-38 -16q14-4 28 2M-38 -10q14-4 28 2M10 -12q14-6 28-2M10 -6q14-6 28-2" stroke="#c9b892" stroke-width="1.5" fill="none"/>
    <g class="m-float" style="--d:-1s"><g transform="translate(14 -50) scale(.7)">${fairyShape()}</g></g></g>`;
  const ribbon = (d, fill, delay) => `<path class="m-drift" style="--d:${delay}s" d="${d}" stroke="${fill}" stroke-width="13" fill="none" stroke-linecap="round" opacity=".85"/>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van drie gekleurde linten die samenkomen in één spelcomputer. Het rode lint komt van een Japanse poort, het grijze van een zwaard in een steen en het groene van een open sprookjesboek met een elfje. Op het scherm staan een heuvel, een zwaard en drie gouden driehoeken">
  ${backdrop('#f4efdf', '#e9e6d0')}
  ${torii}${stone}${book}
  ${label(150, 248, 'OOSTEN', 13)}${label(360, 248, 'RIDDERS', 13)}${label(570, 248, 'SPROOKJES', 13)}
  ${ribbon('M150 264Q170 330 262 354', C.rust, 0)}${ribbon('M360 264Q352 304 360 346', '#7d8f86', -2)}${ribbon('M570 264Q550 330 458 354', C.moss, -4)}
  <rect x="222" y="340" width="276" height="200" rx="28" fill="#eadcc7"/><rect x="250" y="358" width="220" height="130" rx="10" fill="${C.green}"/>
  <path d="M250 450Q330 420 470 444V478a10 10 0 0 1-10 10H260a10 10 0 0 1-10-10Z" fill="${C.sage}"/>${pedestal(330, 444, .28, false)}<g transform="translate(330 430) scale(.32)">${sword()}</g>
  <g class="m-twinkle">${triforce(404, 404, 20, { fill: C.yellow })}</g>
  <path d="M258 514h28M272 500v28" stroke="${C.sage}" stroke-width="9" stroke-linecap="round"/><circle cx="446" cy="520" r="9" fill="${C.rust}"/><circle cx="470" cy="506" r="9" fill="${C.gold}"/>
  ${sparkle(214, 330, .9, -.5)}${sparkle(508, 320, .8, -1.5)}${sparkle(360, 580, .7, -2.5)}
</svg>`;
}

export function hero(id) { return glade(id); }

export function chapter(i, variant) {
  const p = `${slug}-chapter-${i}`;
  if (i === 1) return twoSwords(p);
  if (i === 2) return spiritTree();
  if (i === 3) return variant === 'peterpan' ? flyingBoy(p) : horse();
  return together();
}

export function completion() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een held die bij een stenen sokkel een glanzend zwaard omhooghoudt. Boven hem stralen drie gouden driehoeken, een klein elfje zweeft naast hem en er dwarrelen hartjes en sterretjes">
  ${backdrop('#f3eedd', '#e4ead4')}
  <circle class="m-twinkle" cx="360" cy="190" r="92" fill="${C.glow}"/>
  <g class="m-float">${triforce(360, 196, 64, { fill: C.yellow })}</g>
  <path d="M138 470Q360 420 582 470L600 540Q360 590 120 540Z" fill="${C.olive}"/>
  ${pedestal(420, 472, .7, true)}
  <g transform="translate(330 540) scale(1.25)">${adventurer({ hands: RAISED, holding: true })}</g>
  <g class="m-float" style="--d:-1.5s"><g transform="translate(410 380)">${fairyShape()}</g></g>
  <g class="m-float" style="--d:-2s">${heart(170, 330, .9, '#d99a84')}</g><g class="m-float" style="--d:-.5s">${heart(560, 300, .7, '#e3b07f')}</g><g class="m-float" style="--d:-3s">${heart(600, 430, .5, '#d99a84')}</g>
  ${sparkle(240, 220, 1, -.5)}${sparkle(490, 140, .9, -1.5)}${sparkle(150, 430, .7, -2.5)}${sparkle(520, 400, .8, -1)}
  ${flower(200, 540)}${flower(226, 556, '#f2d79a')}${flower(520, 548)}${flower(548, 534, '#f2d79a')}${tuft(160, 548, C.moss, 'm-sway')}${tuft(580, 546, C.moss, 'm-sway')}
</svg>`;
}

export function card() { return glade('card'); }
