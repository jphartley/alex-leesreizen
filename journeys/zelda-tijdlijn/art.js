// Zelda-tijdlijn artwork: original SVG illustrations, all local. The figures (adventurer, princess,
// desert king, boar) and scenery helpers come from the shared /art-kit.js; nothing is copied from the games.
// The hero doubles as the rally game: motion.js moves .hero (origin at the feet, scaled by S) and turns
// its .swing arm around SHOULDER, moves .gan and turns its .gan-arm around GAN_SHOULDER, flies the .ball
// between G (Ganondorf's raised hand) and T (in front of the hero's sword), cracks and shatters the
// .crystal, moves .zelda and .boar, and shows the wedding .arch. Classes starting with c- are recoloured
// for each new hero and princess. Every id is prefixed with the journey slug so journeys can share a page.
import { hintBar } from '../../game.js';
import { C, backdrop, label, sparkle, HEART, heart, tuft, flower, cloud, swordUp, adventurer, princess, desertKing, boar, burst, SHOULDERS, KING_SHOULDER } from '../../art-kit.js';

const slug = 'zelda-tijdlijn';

// Shared with motion.js: scale, spots and the ball's path.
export const S = 1.5, HOME = { x: 210, y: 650 }, WED = { x: 318, y: 650 };
export const GAN = { x: 560, y: 604 }, G = { x: 524, y: 403 }, T = { x: 282, y: 520 };
export const CRY = { x: 400, y: 300 }, Z_IN = { x: 400, y: 340, s: 1.05 }, Z_WED = { x: 404, y: 650 }, BOAR_Y = 652;
// Pivot points in the figures' own coordinates: the hero's sword shoulder and Ganondorf's raised arm.
export const SHOULDER = SHOULDERS[1], GAN_SHOULDER = KING_SHOULDER;
// A new hero and a new princess for every era: [main, darker] colours.
export const TUNICS = [['#5f7f9b', '#4d6a84'], [C.moss, '#5a7d50'], ['#7d6b93', '#68597c']];
export const DRESSES = [[C.rose, '#b07884'], ['#8ea3bb', '#7489a2'], ['#d2b07a', '#b8955f']];

// A simple ocarina, centred on its own origin.
const ocarina = (k = 1) => `<g transform="scale(${k})"><path d="M-30 4Q-34 -18 -6 -20Q22 -22 32 -4Q36 10 18 16Q-6 24 -24 16Q-30 12 -30 4Z" fill="#7d9bb0"/><path d="M26 -10l14-6 3 8-13 6Z" fill="#6a879c"/><g fill="#4f6b7f"><circle cx="-14" cy="-6" r="3"/><circle cx="-2" cy="-9" r="3"/><circle cx="10" cy="-8" r="3"/><circle cx="-8" cy="6" r="2.6"/><circle cx="6" cy="5" r="2.6"/></g><path d="M-20 -12q10-6 24-6" stroke="#a7c0d0" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
const note = (x, y, d = 0) => `<g class="m-float" style="--d:${d}s"><path d="M${x} ${y}v-22l12-4v20" stroke="${C.sage}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="${x - 4}" cy="${y}" rx="5" ry="4" fill="${C.sage}"/><ellipse cx="${x + 8}" cy="${y - 4}" rx="5" ry="4" fill="${C.sage}"/></g>`;

// A flower arch with two bells; game adds classes so motion.js can swing the bells.
function arch(cx, base, game = false) {
  const w = 92, mid = base - 104;
  const spots = [...[180, 157.5, 135, 112.5, 90, 67.5, 45, 22.5, 0].map(a => [cx + w * Math.cos(a * Math.PI / 180), mid - w * Math.sin(a * Math.PI / 180)]), ...[20, 50, 80].flatMap(d => [[cx - w, mid + d], [cx + w, mid + d]])];
  const flowers = spots.map(([x, y], i) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${[C.cream, '#f2d79a', C.pink][i % 3]}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="${C.yellow}"/>`).join('');
  const bell = x => `<g transform="translate(${x} ${mid - w + 8})"><g${game ? ' class="bell"' : ''}><path d="M0 0v6" stroke="${C.woodDark}" stroke-width="2"/><path d="M-9 22Q-9 6 0 5Q9 6 9 22Z" fill="${C.yellow}"/><path d="M-11 22h22v3h-22Z" fill="${C.gold}"/><circle cy="27" r="3" fill="${C.gold}"/></g></g>`;
  return `<path d="M${cx - w} ${base}V${mid}A${w} ${w} 0 0 1 ${cx + w} ${mid}V${base}" stroke="${C.moss}" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M${cx - w} ${base}V${mid}A${w} ${w} 0 0 1 ${cx + w} ${mid}V${base}" stroke="${C.olive}" stroke-width="6" stroke-dasharray="10 12" fill="none" stroke-linecap="round"/>
  ${flowers}${bell(cx - 15)}${bell(cx + 15)}<path d="M${cx - 12} ${mid - w + 4}q12 8 24 0q-12-8-24 0Z" fill="${C.pink}"/><circle cx="${cx}" cy="${mid - w + 4}" r="4" fill="${C.rose}"/>`;
}

// The golden timeline in the sky: a sword at the start, an ocarina where it splits, and three ends.
function timeline() {
  const line = d => `<path d="${d}" stroke="${C.glow}" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/><path d="${d}" stroke="${C.gold}" stroke-width="3.5" stroke-dasharray="2 9" fill="none" stroke-linecap="round"/>`;
  const dots = [[104, 164], [146, 156], [190, 151], [404, 124], [427, 151], [404, 179]].map(([x, y]) => `<circle class="tl-dot" cx="${x}" cy="${y}" r="3.5" fill="${C.yellow}"/>`).join('');
  const node = (x, y, fill, inner) => `<g transform="translate(${x} ${y})"><circle r="17" fill="${C.glow}" opacity=".7"/><circle r="14" fill="${fill}"/>${inner}</g>`;
  return `<g class="timeline">
  ${line('M64 172Q160 150 250 150')}${line('M250 150Q360 150 470 96')}${line('M250 150Q380 152 500 150')}${line('M250 150Q360 156 470 204')}
  ${dots}
  ${node(64, 172, C.paper, `<g transform="translate(0 7) scale(.4)">${swordUp()}</g>`)}
  ${node(250, 150, C.paper, ocarina(.34))}
  ${node(470, 96, C.purpleDark, `<path d="M-8 6V-3h3v-3h3v3h4v-3h3v3h3v9Z" fill="${C.paper}" opacity=".85"/>`)}
  ${node(500, 150, '#e3a86b', `<circle cx="2" r="7" fill="#5c4a63"/><circle cx="5" cy="-2" r="6" fill="#e3a86b"/>`)}
  ${node(470, 204, '#a9c6c0', `<path d="M-9 1q4.5-5 9 0t9 0M-9 6q4.5-5 9 0t9 0" stroke="${C.paper}" stroke-width="2" fill="none" stroke-linecap="round"/>`)}
  </g>`;
}

// The crystal around the captured princess, on its own centre.
const crystal = () => `<path class="crystal-glow" d="M0 -98L78 -10L0 98L-78 -10Z" fill="${C.glow}" opacity=".35"/>
  <g class="crystal-body"><path d="M0 -82L60 -10L0 82L-60 -10Z" fill="#f3d9e0" opacity=".38"/><path d="M0 -82L60 -10L0 4Z" fill="#ffffff" opacity=".2"/><path d="M0 -82L-60 -10L0 4Z" fill="#e8b9c6" opacity=".16"/>
  <path d="M0 -82L60 -10L0 82L-60 -10Z" fill="none" stroke="#fff6f0" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/><path d="M-60 -10L0 4L60 -10M0 4V82" stroke="#fff6f0" stroke-width="1.2" fill="none" opacity=".6"/>
  ${['M-30 -46l10 14-8 8 12 12', 'M34 -38l-8 16 10 6-6 18', 'M-8 30l12 10-6 12 8 14'].map(d => `<path class="crack" d="${d}" stroke="#fffbe6" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>`).join('')}</g>
  ${[[-30, -40], [30, -40], [-44, 0], [44, 0], [-18, 40], [18, 40]].map(([x, y]) => `<path class="shard" d="M${x} ${y - 10}l9 14h-18Z" fill="#f6e4ea" opacity="0"/>`).join('')}`;

// The hero scene: a field before Hyrule's castle at dusk, with the golden timeline in the sky. Ganondorf
// hovers on the right with a light ball, Zelda waits in a crystal and the hero stands ready on the left.
function field(id) {
  const p = `${slug}-${id}`;
  const castle = `<g fill="#b4bb9f"><rect x="112" y="378" width="16" height="60"/><rect x="140" y="356" width="24" height="82"/><rect x="174" y="384" width="16" height="56"/><rect x="118" y="404" width="66" height="36"/></g>
    <g fill="#9fa88a"><path d="M110 380l10-20 10 20Z"/><path d="M137 358l15-28 15 28Z"/><path d="M172 386l10-18 10 18Z"/></g><path d="M152 330v-12l10 4-10 4" fill="${C.rust}" opacity=".8"/><rect x="148" y="376" width="8" height="12" rx="4" fill="#9fa88a"/>`;
  const stones = [[150, 708, 30], [196, 684, 24], [236, 668, 18]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .36}" fill="#d8cfb4"/>`).join('');
  const tree = (x, y, r, cls) => `<path d="M${x - 10} ${y + r + 60}V${y}h20V${y + r + 60}Z" fill="#7a6450"/><g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}" fill="#3d6b52"/><circle cx="${x + r * .5}" cy="${y + r * .35}" r="${r * .62}" fill="#46745a"/><circle cx="${x - r * .35}" cy="${y - r * .3}" r="${r * .45}" fill="${C.sage}"/></g>`;
  const petals = Array.from({ length: 12 }, (_, i) => `<ellipse class="petal" cx="${272 + (i * 61) % 180}" cy="${440 + (i * 23) % 40}" rx="4" ry="2.6" fill="${[C.pink, C.cream, '#f2d79a'][i % 3]}"/>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een grasveld bij een kasteel in de schemering. Aan de hemel loopt een gouden tijdlijn die zich in drieën splitst. Rechts zweeft Ganondorf, een koning met rood haar en een gouden kroon, met een lichtbal in zijn hand. Midden in de lucht zit prinses Zelda gevangen in een roze kristal. Links staat een held met een rode sjaal, een rond schild en een zwaard">
  <defs><linearGradient id="${p}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e6d2"/><stop offset="1" stop-color="#f5ecd4"/></linearGradient></defs>
  <rect width="720" height="760" fill="url(#${p}-sky)"/>
  <circle cx="626" cy="330" r="40" fill="#f6e2a6" opacity=".6"/>
  ${cloud(110, 290, 1)}${cloud(610, 250, .85)}${cloud(250, 370, .7)}
  ${timeline()}
  <g class="layer">${castle}<path d="M0 470Q120 400 240 440Q360 410 480 450Q600 405 720 440V760H0Z" fill="#c6ceae"/></g>
  <path class="layer" d="M0 500Q180 456 360 480Q540 456 720 490V760H0Z" fill="#a9b894"/>
  <g class="layer"><path d="M0 540Q200 512 360 522Q560 512 720 536V760H0Z" fill="${C.olive}"/><ellipse cx="380" cy="640" rx="300" ry="76" fill="#b3be7d"/>${stones}</g>
  ${tree(16, 440, 70, 'canopy')}${tree(706, 462, 62, 'canopy')}
  ${tuft(300, 560)}${tuft(470, 548)}${flower(90, 600)}${flower(640, 590, '#f2d79a')}
  <ellipse class="rune" cx="${GAN.x}" cy="652" rx="56" ry="13" fill="${C.purpleDark}" opacity=".3"/><ellipse cx="${GAN.x}" cy="652" rx="44" ry="9" fill="none" stroke="#8d7a96" stroke-width="2" stroke-dasharray="4 6" opacity=".7"/>
  <g class="arch" opacity="0">${arch(361, 664, true)}</g>
  <g class="petals" opacity="0">${petals}</g>
  <g class="gan" transform="translate(${GAN.x} ${GAN.y}) scale(${-S} ${S})">${desertKing()}</g>
  <g class="boar" opacity="0" transform="translate(${GAN.x} ${BOAR_Y}) scale(-1 1)">${boar()}</g>
  <g class="zelda" transform="translate(${Z_IN.x} ${Z_IN.y}) scale(${Z_IN.s})">${princess()}</g>
  <g class="crystal" transform="translate(${CRY.x} ${CRY.y})">${crystal()}</g>
  <g class="hero" transform="translate(${HOME.x} ${HOME.y}) scale(${S})">${adventurer({ sword: true })}</g>
  ${[0, 1, 2].map(i => `<g class="heart-up" opacity="0">${heart(361 + (i - 1) * 22, 560, .5, [C.rose, '#e3b07f', C.pink][i])}</g>`).join('')}
  <g class="ring-g" opacity="0" transform="translate(${T.x} ${T.y})"><circle r="34" fill="none" stroke="${C.paper}" stroke-width="3" stroke-dasharray="5 7"/><circle class="ring-flash" r="34" fill="none" stroke="${C.yellow}" stroke-width="6" opacity="0"/></g>
  <g class="ball" opacity="0" transform="translate(${G.x} ${G.y})"><circle r="18" fill="${C.glow}" opacity=".5"/><circle r="10" fill="#f2d36b"/><circle r="5" fill="#fffbe6"/></g>
  ${burst()}
  ${tuft(60, 704)}${tuft(104, 728)}${tuft(650, 700)}${tuft(608, 730)}${flower(470, 706)}${flower(500, 690, '#f2d79a')}${flower(40, 670)}
  <rect class="veil" width="720" height="760" fill="#2f3b33" opacity="0"/>
  ${hintBar('Klik op Hyrule en help Link om Zelda te bevrijden')}
</svg>`;
}

// Chapter 2: a sword above an island in the sky, and three threads (hero, goddess, demon) twisted together.
function curse() {
  const colours = ['#5f8a62', C.gold, C.purple];
  const ends = [240, 360, 480];
  const threads = colours.map((c, k) => {
    let d = '';
    for (let y = 272; y <= 470; y += 6) d += `${d ? 'L' : 'M'}${(360 + 42 * Math.sin((y - 272) / 34 + k * 2.094)).toFixed(1)} ${y}`;
    const x = 360 + 42 * Math.sin((470 - 272) / 34 + k * 2.094);
    return `<path d="${d}Q${x.toFixed(1)} 494 ${ends[k]} 506" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  const cap = `<path d="M-14 8Q-10 -12 16 -16Q4 -4 14 8Z" fill="#5f8a62"/>`;
  const tiara = `<path d="M-14 6l4-12 5 7 5-12 5 12 5-7 4 12Z" fill="${C.gold}"/><circle cy="-6" r="2.5" fill="${C.rose}"/>`;
  const flame = `<path d="M0 -16Q12 -4 8 6Q4 12 0 12Q-4 12 -8 6Q-12 -4 0 -16Z" fill="${C.purple}"/><path d="M0 -4Q5 2 3 7Q0 9 -3 7Q-5 2 0 -4Z" fill="#9a86a3"/>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een zwevend eiland boven de wolken, met daarboven een glanzend zwaard. Onder het eiland draaien drie draden om elkaar heen: een groene, een gouden en een paarse. Onderaan eindigt de groene draad bij een groene muts, de gouden bij een kroontje en de paarse bij een donker vlammetje">
  ${backdrop('#f1efe0', '#e4eadf')}
  <g class="m-drift">${cloud(220, 250, 1.1, '')}</g><g class="m-drift" style="--d:-3s">${cloud(520, 220, 1, '')}</g>
  <circle class="m-twinkle" cx="360" cy="150" r="54" fill="${C.glow}"/>
  <g class="m-float"><g transform="translate(360 186) scale(1.6)">${swordUp()}</g></g>
  <path d="M270 222Q360 206 450 222Q430 262 360 278Q290 262 270 222Z" fill="#b8a888"/><ellipse cx="360" cy="222" rx="90" ry="16" fill="${C.olive}"/>
  ${tuft(310, 222, C.moss, 'm-sway')}${tuft(412, 222, C.moss, 'm-sway')}
  ${threads}
  <g transform="translate(240 524)">${cap}</g><g transform="translate(360 524)">${tiara}</g><g transform="translate(480 524)">${flame}</g>
  ${label(240, 566, 'HELD', 14, '#5f8a62')}${label(360, 566, 'GODIN', 14, '#a28056')}${label(480, 566, 'DEMON', 14, C.purple)}
  ${sparkle(250, 130, .9, -.5)}${sparkle(470, 120, .8, -1.5)}
</svg>`;
}

// Chapter 3: Ganondorf in the desert and Ganon under a dark sky, side by side in two arches.
function twoForms(p) {
  const arch2 = x => `M${x} 520V200a135 135 0 0 1 270 0V520Z`;
  const left = `<rect x="62" y="60" width="270" height="470" fill="#f3e3c3"/><circle cx="260" cy="170" r="34" fill="#f2d79a"/>
    <path d="M62 520V400Q140 360 220 392Q280 372 332 396V520Z" fill="#e3c995"/><path d="M62 520V452Q170 420 332 456V520Z" fill="#d9b97f"/>
    <g transform="translate(196 504) scale(1.85)">${desertKing({ armUp: false })}</g>${sparkle(110, 200, .8, -1)}`;
  const right = `<rect x="388" y="60" width="270" height="470" fill="${C.purple}"/><circle cx="600" cy="150" r="22" fill="#e4d6c8" opacity=".75"/>
    ${[[430, 120], [470, 200], [560, 100], [620, 230], [520, 170]].map(([x, y], i) => `<circle class="m-twinkle" style="--d:-${i * .7}s" cx="${x}" cy="${y}" r="2" fill="#e4d6c8"/>`).join('')}
    <path d="M388 520V420l40-30 30 22 40-40 46 36 40-28 74 46V520Z" fill="${C.purpleDark}"/>
    <g class="m-bob"><g transform="translate(526 504) scale(-1.55 1.55)">${boar()}</g></g>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie met twee bogen naast elkaar. Links staat Ganondorf in de woestijn: een grote man met rood haar, een gouden kroon en een donkere cape. Rechts staat Ganon onder een donkerpaarse hemel: een groot, zwijnachtig monster met slagtanden, rode manen en gele ogen">
  ${backdrop('#f4efdf', '#ece7d3')}
  <defs><clipPath id="${p}-left"><path d="${arch2(62)}"/></clipPath><clipPath id="${p}-right"><path d="${arch2(388)}"/></clipPath></defs>
  <g clip-path="url(#${p}-left)">${left}</g><g clip-path="url(#${p}-right)">${right}</g>
  <path d="${arch2(62)}" fill="none" stroke="#c9b892" stroke-width="5"/><path d="${arch2(388)}" fill="none" stroke="#c9b892" stroke-width="5"/>
  <circle cx="360" cy="330" r="20" fill="${C.cream}"/><path d="M349 330h20M362 322l8 8-8 8" stroke="${C.sage}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${label(197, 560, 'GANONDORF', 15)}${label(523, 560, 'GANON', 15)}
</svg>`;
}

// Chapter 4, variant 'splitsing': from an ocarina the timeline splits into three roads, each ending in a
// small picture: a dark castle, a twilight landscape and a flooded kingdom.
function split(p) {
  const road = d => `<path d="${d}" stroke="${C.glow}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${C.gold}" stroke-width="4" stroke-dasharray="2 10" fill="none" stroke-linecap="round"/>`;
  const view = (i, x, y, inner, text) => `<defs><clipPath id="${p}-v${i}"><circle cx="${x}" cy="${y}" r="60"/></clipPath></defs><circle cx="${x}" cy="${y}" r="66" fill="${C.cream}"/><g clip-path="url(#${p}-v${i})">${inner}</g>${label(x, y + 84, text, 12)}`;
  const dark = `<rect x="440" y="80" width="160" height="140" fill="${C.purple}"/><ellipse class="m-drift" cx="500" cy="120" rx="50" ry="14" fill="${C.purpleDark}"/>
    <g fill="${C.purpleDark}"><rect x="488" y="150" width="14" height="60"/><rect x="510" y="138" width="18" height="72"/><rect x="536" y="156" width="14" height="54"/><rect x="494" y="176" width="52" height="34"/><path d="M486 152l9-16 9 16ZM508 140l11-20 11 20ZM534 158l9-14 9 14Z"/></g>
    <rect x="440" y="200" width="160" height="30" fill="#3f3447"/>`;
  const twilight = `<rect x="490" y="250" width="160" height="160" fill="#7a5a6e"/><rect x="490" y="320" width="160" height="40" fill="#e3a86b"/><circle cx="570" cy="350" r="22" fill="#f2c48a"/>
    <path d="M490 410V350q20-26 40 0q14-20 30 0q20-30 40 0q14-16 30 0q10-10 20 0V410Z" fill="#4f4157"/>
    ${[[520, 300], [600, 290], [560, 270], [630, 316]].map(([x, y], i) => `<rect class="m-float" style="--d:-${i * .8}s" x="${x}" y="${y}" width="6" height="6" fill="#3f3447" opacity=".8"/>`).join('')}`;
  const sea = `<rect x="440" y="420" width="160" height="160" fill="#dfe8e4"/><rect x="440" y="500" width="160" height="80" fill="#8fb3b0"/>
    <path d="M486 500v-30h14v30ZM482 472l11-16 11 16Z" fill="#b4bb9f"/>
    <g class="m-bob"><path d="M528 500h40l-6 10h-28Z" fill="${C.woodDark}"/><path d="M546 498v-44l20 38Z" fill="${C.rust}"/></g>
    <path class="m-drift" d="M450 520q10-6 20 0t20 0M520 540q10-6 20 0t20 0" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een ocarina waaruit een gouden weg komt die zich in drieën splitst. De bovenste weg leidt naar een donker kasteel onder paarse wolken, de middelste naar een landschap in de schemering met zwevende zwarte blokjes, en de onderste naar een zee met een zeilbootje en een torentje dat net boven het water uitsteekt">
  ${backdrop('#f4efdf', '#ebe8d3')}
  ${road('M196 330H270')}${road('M270 330Q340 330 444 192')}${road('M270 330H492')}${road('M270 330Q340 330 444 468')}
  <circle cx="270" cy="330" r="9" fill="${C.yellow}"/>
  <g class="m-float"><g transform="translate(150 330)">${ocarina(1.5)}</g></g>${note(120, 270, -1)}${note(186, 252, -2.5)}
  ${label(150, 398, 'OCARINA OF TIME', 13)}
  ${view(0, 520, 160, dark, 'LINK VERLIEST')}${view(1, 566, 330, twilight, 'LINK ALS KIND')}${view(2, 520, 500, sea, 'LINK VERDWIJNT')}
</svg>`;
}

// Chapter 4, variant 'toekomst': a lone hero on a mossy plateau looks out over faded ruins in the mist.
function future() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een held op een begroeide hoogvlakte met oude, bemoste stenen. In de verte staat een vaag kasteel in de mist. Op een omgevallen stenen tafel staan bijna uitgewiste tekeningen van drie driehoeken">
  ${backdrop('#f1efe2', '#e6eadc')}
  <path d="M150 420L250 300L320 360L400 270L500 350L570 310L620 420Z" fill="#d3d8c4"/>
  <g opacity=".45"><g fill="#a9b09a"><rect x="330" y="300" width="18" height="90"/><rect x="356" y="270" width="26" height="120"/><rect x="390" y="306" width="18" height="84"/><rect x="336" y="340" width="68" height="50"/></g>
  <g fill="#959c86"><path d="M328 302l11-20 11 20Z"/><path d="M353 272l16-30 16 30Z"/><path d="M388 308l11-18 11 18Z"/></g></g>
  <ellipse class="m-drift" cx="300" cy="380" rx="170" ry="16" fill="${C.paper}" opacity=".85"/><ellipse class="m-drift" style="--d:-4s" cx="440" cy="410" rx="150" ry="14" fill="${C.paper}" opacity=".8"/>
  <path d="M110 470Q260 430 380 446Q520 432 612 468L622 548Q360 600 98 548Z" fill="${C.olive}"/>
  <path d="M470 476V400l10-12 10 10 12-6V476Z" fill="${C.stone}"/><path d="M520 480V430l14-6 10 8V480Z" fill="${C.stoneDark}"/><path d="M466 410q20 10 40 0M518 440q14 8 28 0" stroke="#7d9a6a" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M396 520l14-34h96l10 34Z" fill="#b4b6a5"/><g opacity=".4" fill="none" stroke="${C.stoneDark}" stroke-width="2"><path d="M440 494l8 -12 8 12Z M432 506l8-12 8 12Z M448 506l8-12 8 12Z"/><path d="M414 512h22M478 512h22"/></g>
  <g transform="translate(232 486) scale(1.2)">${adventurer()}</g>
  ${tuft(150, 540, C.moss, 'm-sway')}${tuft(590, 536, C.moss, 'm-sway')}${flower(190, 530)}${flower(560, 528, '#f2d79a')}
  ${sparkle(470, 220, .8, -1)}${sparkle(240, 240, .7, -2)}
</svg>`;
}

// Chapter 5: Link and Zelda face each other on a hill at sunset, under a dotted heart with a question mark.
function sunset() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van Link en Zelda die bij zonsondergang tegenover elkaar op een heuvel staan. Boven hen zweeft een hart van stippellijntjes met een vraagteken erin">
  ${backdrop('#f6ecdb', '#f2dfc6')}
  <circle cx="520" cy="400" r="70" fill="#f6d6a6" opacity=".7"/><circle cx="520" cy="400" r="46" fill="#f2c48a"/>
  <ellipse class="m-drift" cx="250" cy="330" rx="80" ry="10" fill="${C.paper}" opacity=".8"/>
  <path d="M110 470Q360 400 610 470L620 548Q360 600 100 548Z" fill="${C.olive}"/>
  <g transform="translate(300 440) scale(1.4)">${adventurer()}</g>
  <g transform="translate(410 440) scale(-1.4 1.4)">${princess()}</g>
  <g class="m-float"><path transform="translate(355 222) scale(3)" d="${HEART}" fill="${C.cream}" opacity=".7" stroke="${C.rose}" stroke-width="1.2" stroke-dasharray="2 2.5"/>${label(355, 244, '?', 54, C.rose)}</g>
  ${tuft(150, 548, C.moss, 'm-sway')}${tuft(580, 546, C.moss, 'm-sway')}${flower(196, 540)}${flower(530, 540, '#f2d79a')}
  ${sparkle(230, 200, .8, -.5)}${sparkle(490, 180, .7, -1.5)}
</svg>`;
}

export function hero(id) { return field(id); }

export function chapter(i, variant) {
  const p = `${slug}-chapter-${i}`;
  if (i === 1) return curse();
  if (i === 2) return twoForms(p);
  if (i === 3) return variant === 'toekomst' ? future() : split(p);
  return sunset();
}

export function completion() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van Link en Zelda onder een boog van bloemen met twee gouden belletjes. Er dwarrelen hartjes, bloemblaadjes en sterretjes om hen heen">
  ${backdrop('#f3eedd', '#ece6d2')}
  <path d="M120 520Q360 470 600 520L610 560Q360 600 110 560Z" fill="${C.olive}"/>
  ${arch(361, 540)}
  <g transform="translate(318 540) scale(1.5)">${adventurer()}</g>
  <g transform="translate(404 540) scale(-1.5 1.5)">${princess()}</g>
  <g class="m-float" style="--d:-2s">${heart(170, 300, .9, '#d99a84')}</g><g class="m-float" style="--d:-.5s">${heart(560, 280, .7, '#e3b07f')}</g><g class="m-float" style="--d:-3s">${heart(590, 420, .5, '#d99a84')}</g><g class="m-float" style="--d:-1s">${heart(130, 430, .5, '#e3b07f')}</g>
  ${[[230, 240], [300, 200], [430, 210], [500, 250], [250, 360], [480, 370]].map(([x, y], i) => `<ellipse class="m-float" style="--d:-${i * .6}s" cx="${x}" cy="${y}" rx="5" ry="3" fill="${[C.pink, C.cream, '#f2d79a'][i % 3]}"/>`).join('')}
  ${sparkle(250, 150, 1, -.5)}${sparkle(480, 140, .9, -1.5)}${sparkle(160, 380, .7, -2.5)}
  ${flower(200, 546)}${flower(226, 560, '#f2d79a')}${flower(520, 554)}${flower(548, 540, '#f2d79a')}${tuft(160, 552, C.moss, 'm-sway')}${tuft(580, 550, C.moss, 'm-sway')}
</svg>`;
}

export function card() { return field('card'); }
