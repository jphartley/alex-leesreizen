// Vliegen in de toekomst artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'a350';

// A side-view airliner facing right, centred near (0, 0) and about 420 wide.
// mask: the A350's dark band around the cockpit windows; curved: winglet bent upwards; raked: swept-back wingtip.
const HULL = 'M-150 -22H140Q196 -20 206 6Q206 22 178 22H-120Q-170 20 -212 -14L-216 -22Z';
function plane({ tail = '#517c67', mask = false, curved = false, raked = false, engine = 1, gap = 12, win = [6, 8], glint = '' } = {}) {
  const [ww, wh] = win, e = engine;
  const windows = Array.from({ length: Math.floor(250 / gap) }, (_, i) => `<rect x="${-120 + i * gap}" y="${-6 - wh / 2}" width="${ww}" height="${wh}" rx="${ww / 2}"/>`).join('');
  const tip = curved ? `<path d="M-108 38Q-120 30-116 16" stroke="#d9d3c2" stroke-width="7" fill="none" stroke-linecap="round"/>`
    : raked ? `<path d="M-110 38-136 42-90 38Z" fill="#d9d3c2"/>` : '';
  return `<path d="M-170 -6-226 -16H-206L-140 -2Z" fill="${tail}" opacity=".8"/>
    <path d="M-140 -22-196 -104H-174L-104 -22Z" fill="${tail}"/>
    <path d="${HULL}" fill="#f7f5ed"/><path d="M-130 12H200Q198 22 178 22H-120Q-140 20-150 14Z" fill="#e4dfd2"/>
    <path d="M-176 -2H200" stroke="${tail}" stroke-width="3" opacity=".55"/>
    <g fill="#5f7a6c">${windows}</g>
    ${mask ? '<path d="M156 -16Q184 -18 198 -4L196 1H158Z" fill="#3e4a44"/>' : '<path d="M172 -11 190 -6 188 -1H170Z" fill="#5f7a6c"/>'}
    <path d="M-18 -10h10v20h-10Z" fill="#e4dfd2"/><path d="M128 -14h10v24h-10Z" fill="#e4dfd2"/>
    ${glint}
    <path d="M-20 4-110 38H-86L40 8Z" fill="#d9d3c2"/>${tip}
    <path d="M-6 18h40v6h-40Z" fill="#c9c3b2"/>
    <rect x="${-30 * e}" y="22" width="${72 * e}" height="${26 * e}" rx="${13 * e}" fill="#d9d3c2"/><ellipse cx="${42 * e - 2}" cy="${22 + 13 * e}" rx="5" ry="${12 * e}" fill="#4a554f"/>
    <circle class="beacon" cx="-60" cy="-23" r="3.5" fill="#b76e55"/>`;
}

const cloud = (x, y, s = 1, fill = '#f8f4e2') => `<g fill="${fill}"><ellipse cx="${x}" cy="${y}" rx="${70 * s}" ry="${18 * s}"/><circle cx="${x - 22 * s}" cy="${y - 12 * s}" r="${22 * s}"/><circle cx="${x + 16 * s}" cy="${y - 18 * s}" r="${28 * s}"/></g>`;
const label = (x, y, t, size = 22) => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" font-weight="700" fill="#284f3d" letter-spacing="1">${t}</text>`;

// Shared chapter frame: paper background, soft disc and dotted ring, like the other journeys.
const frame = (aria, bg, disc, inner) => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
  <rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${disc}"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>${inner}</svg>`;

function sky(id) {
  const p = `${slug}-${id}`;
  const bank = (y, fill, n, r, off) => `<g fill="${fill}">${Array.from({ length: n }, (_, i) => `<circle cx="${i * (760 / (n - 1)) - 20 + off}" cy="${y + (i % 2) * 14}" r="${r + (i % 3) * 10}"/>`).join('')}<path d="M0 ${y}H720V760H0Z"/></g>`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een Airbus A350 die hoog boven de wolken vliegt, met in de verte groene eilanden en de zee">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#c9d8c8"/><stop offset=".7" stop-color="#ece6cf"/><stop offset="1" stop-color="#f4ecd6"/></linearGradient>
  <clipPath id="${p}-hull"><path d="${HULL}"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="560" cy="150" r="56" fill="#f7e3a8" opacity=".4"/><circle cx="560" cy="150" r="48" fill="#f7e3a8"/>
  <g class="cloud-far" opacity=".7">${cloud(150, 190, .9)}${cloud(420, 110, .7)}${cloud(650, 260, .8)}</g>
  <path class="layer" style="--i:0" d="M0 610Q80 560 160 590T320 572Q400 548 480 590T720 570V760H0Z" fill="#a9bea6"/>
  <path d="M0 640H720V760H0Z" fill="#86a898"/>
  <g class="layer" style="--i:1">${bank(640, '#efe8d4', 9, 34, 0)}</g>
  <g class="layer" style="--i:2">${bank(690, '#f8f4e2', 8, 40, 40)}</g>
  <g class="plane-drift"><g transform="translate(360 360) scale(1.3)"><g class="plane">${plane({ mask: true, curved: true, glint: `<g clip-path="url(#${p}-hull)"><path class="glint" d="M-262 -24h26l-18 48h-26Z" fill="#fffef6" opacity="0"/></g>` })}</g></g></g>
  <g class="cloud-near" opacity=".9">${cloud(90, 520, 1.1)}${cloud(620, 470, .9)}</g>
  </svg>`;
}

// Three planes side by side: the big 777, the 787 with large windows, and the A350 with its dark cockpit mask.
function lineup() {
  const row = (y, s, opts, name, d) => `<g class="m-bob" style="--d:${d}s"><g transform="translate(400 ${y}) scale(${s})">${plane(opts)}</g></g>${label(60, y + 8, name)}`;
  return frame('Drie vliegtuigen onder elkaar: een grote Boeing 777, een Boeing 787 Dreamliner met grote ramen en een Airbus A350', '#e2e4c8', '#ebecd9', `
  <g class="m-drift" opacity=".8">${cloud(220, 96, .6)}${cloud(560, 600, .5)}</g>
  ${row(190, .84, { tail: '#9a7552', engine: 1.25 }, '777', 0)}
  ${row(345, .74, { tail: '#5f7f9b', raked: true, gap: 15, win: [8, 11] }, '787', -1.5)}
  ${row(500, .76, { tail: '#517c67', mask: true, curved: true }, 'A350', -3)}`);
}

// Cross-sections of the 787 and the A350: the A350 is a little wider inside.
function crossSection() {
  const section = (cx, r, seat, name) => {
    const cy = 300, yF = cy + r * .35, h = Math.sqrt(r * r - (r * .35) ** 2), sw = (2 * h * .82) / 11;
    const seats = Array.from({ length: 9 }, (_, i) => cx - h * .82 + sw * (i + Math.floor(i / 3)) + sw * .1);
    return `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="#d9d3c2"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f7f5ed"/>
      <path d="M${cx - h} ${yF}A${r} ${r} 0 0 0 ${cx + h} ${yF}Z" fill="#e4dfd2"/><path d="M${cx - h} ${yF}H${cx + h}" stroke="#b9b09a" stroke-width="4"/>
      <path d="M${cx - r * .62} ${cy - r * .55}H${cx + r * .62}" stroke="#e4dfd2" stroke-width="16" stroke-linecap="round"/>
      <g fill="#8fb0a4"><ellipse cx="${cx - r + 10}" cy="${cy - 6}" rx="4" ry="12"/><ellipse cx="${cx + r - 10}" cy="${cy - 6}" rx="4" ry="12"/></g>
      ${seats.map((x, i) => `<g><circle cx="${x + sw * .4}" cy="${yF - 52}" r="${sw * .28}" fill="${['#b98b62', '#8c6a4c', '#d9a77a'][i % 3]}"/><rect x="${x}" y="${yF - 44}" width="${sw * .8}" height="44" rx="5" fill="${seat}"/></g>`).join('')}
      <path d="M${cx - r} ${cy + r + 30}H${cx + r}M${cx - r} ${cy + r + 20}v20M${cx + r} ${cy + r + 20}v20" stroke="#517c67" stroke-width="3"/>
      ${label(cx - name.length * 7, cy + r + 66, name)}`;
  };
  return frame('Een doorsnede van twee vliegtuigrompen naast elkaar met stoelen en passagiers: links de Boeing 787, rechts de iets bredere Airbus A350', '#eadcc7', '#f6ebd4', `
  ${section(205, 118, '#5f7f9b', '787')}${section(505, 132, '#517c67', 'A350')}
  <g class="m-float" fill="#a28056"><path d="m360 110 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/></g>`);
}

// Hong Kong's airport on its reclaimed island, with a plane coming in to land.
function airport() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="De luchthaven van Hongkong op een opgespoten eiland in zee, met twee landingsbanen, groene bergen erachter en een vliegtuig dat komt aanvliegen">
  <rect width="720" height="650" fill="#e3e6d2"/><circle cx="600" cy="110" r="40" fill="#f7e3a8"/>
  <g class="m-drift" opacity=".85">${cloud(160, 120, .7)}${cloud(420, 80, .5)}</g>
  <path d="M0 330Q120 250 240 300T470 280Q590 240 720 300V360H0Z" fill="#a9bea6"/>
  <path d="M0 340H720V650H0Z" fill="#86a898"/>
  <path d="M0 380Q70 300 150 340T280 350V420H0Z" fill="#7c9a6a"/>
  <g stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"><path class="m-drift" d="M60 590q20-8 40 0t40 0M480 600q20-8 40 0t40 0M620 400q20-8 40 0t40 0"/></g>
  <path d="M40 420 140 452" stroke="#c9c3b2" stroke-width="6"/>
  <path d="M130 480Q120 430 190 420H570Q630 422 622 480Q612 532 552 538H200Q140 534 130 480Z" fill="#9cac66"/>
  <path d="M150 476Q146 440 196 434H566Q610 436 604 476Q598 518 550 522H204Q156 518 150 476Z" fill="#b5c08a"/>
  <g fill="#6f6f62"><rect x="180" y="444" width="400" height="16" rx="3"/><rect x="180" y="500" width="400" height="16" rx="3"/></g>
  <g stroke="#f7f5ed" stroke-width="2" stroke-dasharray="12 10"><path d="M190 452H570M190 508H570"/></g>
  <path d="M300 468h150v24H300Z" fill="#f3ead6"/><path d="M300 468 270 462v36l30-6ZM450 468l30-6v36l-30-6Z" fill="#e4dfd2"/><path d="M320 474h110v6H320Z" fill="#8fb0a4"/>
  <g class="m-bob"><path d="M560 590h40l-6 10h-28Z" fill="#9a7552"/><path d="M578 590v-22l14 18Z" fill="#f7f5ed"/></g>
  <g class="m-bob" style="--d:-2s"><path d="M80 520h30l-5 8H85Z" fill="#9a7552"/></g>
  <g class="m-float"><g transform="translate(560 230) rotate(8) scale(.32)">${plane({ mask: true, curved: true })}</g></g>
  </svg>`;
}

// An economy-class meal tray: dumplings in a bamboo steamer, rice with roast pork and greens, and tea.
function meal() {
  return frame('Een dienblad met een vliegtuigmaaltijd: dumplings in een bamboemandje, rijst met vlees en groente, fruit en een kopje thee', '#eadcc7', '#f6ebd4', `
  <ellipse cx="360" cy="492" rx="200" ry="20" fill="#775e48" opacity=".13"/>
  <rect x="160" y="160" width="400" height="320" rx="26" fill="#b98b62"/><rect x="176" y="176" width="368" height="288" rx="18" fill="#d8b58a"/>
  <rect x="196" y="196" width="190" height="150" rx="16" fill="#f7f5ed"/>
  <g fill="#fbf7ea">${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${216 + (i % 7) * 12}" cy="${236 + Math.floor(i / 7) * 40 + (i % 2) * 8}" rx="9" ry="7"/>`).join('')}</g>
  <path d="M216 214h76v100h-76Z" fill="#f2ecd9" opacity=".6"/>
  <g fill="#b75f50">${[0, 1, 2].map(i => `<rect x="${304 + i * 4}" y="${216 + i * 30}" width="66" height="22" rx="6"/>`).join('')}</g>
  <g fill="#6f9463"><ellipse cx="320" cy="314" rx="22" ry="9"/><ellipse cx="352" cy="320" rx="18" ry="8"/></g>
  <circle cx="470" cy="260" r="62" fill="#c9a46a"/><circle cx="470" cy="260" r="52" fill="#e0c48e"/>
  <g class="m-bob">${[[448, 240], [492, 244], [470, 282]].map(([x, y]) => `<path d="M${x - 20} ${y + 8}Q${x - 18} ${y - 18} ${x} ${y - 20}Q${x + 18} ${y - 18} ${x + 20} ${y + 8}Z" fill="#f3ead6"/><path d="M${x - 8} ${y - 12}v12M${x} ${y - 16}v14M${x + 8} ${y - 12}v12" stroke="#ddd0b2" stroke-width="2"/>`).join('')}</g>
  <circle cx="250" cy="410" r="38" fill="#f7f5ed"/><g fill="#e8b646"><circle cx="238" cy="402" r="12"/><circle cx="260" cy="414" r="11"/></g><circle cx="252" cy="396" r="9" fill="#b75f50"/>
  <circle cx="470" cy="400" r="40" fill="#f7f5ed"/><circle cx="470" cy="400" r="30" fill="#b98b62"/><path d="M510 392q18 0 18 12t-18 10" stroke="#f7f5ed" stroke-width="6" fill="none"/>
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M460 360q-14-16 0-32t0-32"/><path class="m-steam" style="--d:-1.8s" d="M484 360q-14-16 0-32t0-32"/><path class="m-steam" style="--d:-.9s" d="M450 210q-12-14 0-28t0-28"/></g>
  <g transform="rotate(-8 360 420)"><path d="M320 380h8v90h-8ZM338 380h8v90h-8Z" fill="#8c6a4c"/></g>`);
}

// Looking out of the window at Hong Kong's skyline and harbour, the wingtip just in view.
function windowView() {
  const p = `${slug}-done`;
  const towers = [[214, 70], [240, 110], [268, 86], [296, 150], [326, 100], [354, 180], [386, 120], [414, 96], [442, 140], [472, 84], [500, 108]];
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uitzicht door het raampje van een vliegtuig op de wolkenkrabbers en de haven van Hongkong, met de punt van de vleugel in beeld">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#e9c99a"/><stop offset=".6" stop-color="#f3e2c0"/><stop offset="1" stop-color="#d6dcc4"/></linearGradient>
  <clipPath id="${p}-win"><rect x="200" y="100" width="320" height="460" rx="125"/></clipPath></defs>
  <rect width="720" height="650" fill="#eadcc7"/><rect x="150" y="50" width="420" height="560" rx="170" fill="#e4dccb"/>
  <rect x="172" y="72" width="376" height="516" rx="150" fill="#f7f5ed"/>
  <g clip-path="url(#${p}-win)"><rect x="200" y="100" width="320" height="460" fill="url(#${p}-sky)"/><circle cx="430" cy="230" r="36" fill="#f7e3a8"/>
  <g class="m-drift">${cloud(270, 200, .6)}${cloud(470, 160, .45)}</g>
  <path d="M200 400Q260 330 330 370T450 350Q490 340 520 360V460H200Z" fill="#517c67"/>
  <g>${towers.map(([x, h], i) => `<rect x="${x}" y="${470 - h}" width="24" height="${h}" fill="${i % 2 ? '#284f3d' : '#35604a'}"/>`).join('')}</g>
  <g fill="#f7e3a8">${towers.map(([x, h], i) => Array.from({ length: Math.floor(h / 26) }, (_, k) => `<rect class="m-twinkle" style="--d:${-(i * 0.7 + k * 1.3) % 4}s" x="${x + 6 + (k % 2) * 6}" y="${470 - h + 10 + k * 24}" width="5" height="7"/>`).join('')).join('')}</g>
  <path d="M200 468H520V560H200Z" fill="#5d8876"/><g stroke="#d7e4d2" stroke-width="3" fill="none" opacity=".6"><path class="m-drift" d="M230 500q14-6 28 0t28 0M380 520q14-6 28 0t28 0"/></g>
  <path d="M190 540 380 486 396 494 190 600Z" fill="#e4dfd2"/><path d="M380 486Q396 470 392 448" stroke="#d9d3c2" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="200" y="92" width="320" height="40" fill="#e4dfd2"/></g>
  <g class="m-float"><path d="M620 140C590 120 598 96 612 98Q618 99 620 106Q622 99 628 98C642 96 650 120 620 140Z" fill="#b76e55"/></g>
  <g class="m-twinkle" fill="#e0b060"><circle cx="90" cy="150" r="6"/><circle cx="640" cy="480" r="5"/><circle cx="96" cy="520" r="6"/></g>
  </svg>`;
}

export const hero = id => sky(id);
export const chapter = (i, variant) => i === 1 ? (variant === 'doorsnede' ? crossSection() : lineup()) : (variant === 'maaltijd' ? meal() : airport());
export const completion = () => windowView();
export const card = () => sky('card');
