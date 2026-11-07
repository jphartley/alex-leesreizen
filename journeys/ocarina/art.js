// Ocarina artwork: original SVG illustrations, all local. Nothing is copied from the game itself: a plain
// clay ocarina, a made-up traveller, generic consoles and scenes drawn for this journey.
// The hero is also the melody game. motion.js lights .hole-glow-N and .hole-light-N, floats .fx-N, reads
// the [data-hole] hit areas and shows .key-mark, .round-dot and .game-hint; holes are numbered 0 left,
// 1 down, 2 up, 3 right, like the arrow keys. Every id is prefixed with the journey slug so several
// journeys can share a page.
const slug = 'ocarina';

const C = { clay: '#c98a5e', clayLight: '#dca27a', clayDark: '#a96d47', hole: '#5a3a2a', ink: '#3b342e', cream: '#f7f1df', paper: '#fbf6e6', green: '#284f3d', sage: '#517c67', olive: '#9cac66', moss: '#6f9463', rock: '#7c8f6a', wood: '#b8916b', woodDark: '#8c6a4c', rust: '#b76e55', yellow: '#e8c65a', skin: '#e3b9a0', grey: '#9b9690', steel: '#8e949a' };
const HOLES = [[-62, 4], [12, 38], [12, -32], [86, 4]];
const HOLE_COLORS = ['#bccb78', '#97bccd', '#efd36e', '#e7a793'];
const KEY_MARKS = ['M-104 4l10-7v14Z', 'M12 68l-7-10h14Z', 'M12 -66l-7 10h14Z', 'M126 4l-10-7v14Z'];

const noteGlyph = fill => `<ellipse rx="7.5" ry="5.5" transform="rotate(-20)" fill="${fill}"/><path d="M6.5 -2V-30Q9 -21 18 -17" stroke="${fill}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
const note = (x, y, s, fill, cls = 'note', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}" style="--d:${d}s">${noteGlyph(fill)}</g></g>`;
const heart = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6c-6-12-24-11-24 4c0 12 15 21 24 29c9-8 24-17 24-29c0-15-18-16-24-4Z" fill="${fill}"/>`;
const sparkle = (x, y, s, d = 0) => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="#a28056" transform="translate(${-3 * s} ${7 * s})"/>`;
const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;
const label = (x, y, text, size = 15, fill = '#687366') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="sans-serif" font-size="${size}" font-weight="700" fill="${fill}">${text}</text>`;

// A clay ocarina centred on its own origin, mouthpiece on the left. With play, it gets the game parts.
function ocarina(play = false) {
  const holes = HOLES.map(([x, y], i) => `${play ? `<circle class="hole-glow hole-glow-${i}" cx="${x}" cy="${y}" r="28" fill="${HOLE_COLORS[i]}" opacity="0"/>` : ''}<circle cx="${x}" cy="${y}" r="15" fill="${C.clayDark}"/><circle cx="${x}" cy="${y + 1.5}" r="10.5" fill="${C.hole}"/>${play ? `<circle class="hole-light hole-light-${i}" cx="${x}" cy="${y}" r="11" fill="${HOLE_COLORS[i]}" opacity="0"/>` : ''}`).join('');
  const game = play ? KEY_MARKS.map(d => `<path class="key-mark" d="${d}" fill="#fbf3dc" opacity="0"/>`).join('')
    + HOLES.map(([x, y], i) => `<g transform="translate(${x + 4} ${y - 14})"><g class="fx fx-${i}" opacity="0">${noteGlyph(HOLE_COLORS[i])}</g></g>`).join('')
    + HOLES.map(([x, y], i) => `<circle data-hole="${i}" cx="${x}" cy="${y}" r="27" fill="#fff" opacity="0"/>`).join('') : '';
  return `<path d="M-136 -26L-200 -46Q-213 -30 -204 -12L-142 10Z" fill="${C.clay}"/><ellipse cx="-203" cy="-29" rx="5" ry="17" transform="rotate(14 -203 -29)" fill="${C.clayDark}"/><path d="M-176 -34l15 4-3 11-15-4Z" fill="${C.hole}"/>
  <path d="M-150 6C-152 -44 -86 -74 -6 -74C80 -74 150 -48 172 -10C186 14 160 52 96 66C30 80 -60 80 -110 62C-138 52 -150 30 -150 6Z" fill="${C.clay}"/>
  <path d="M-146 22C-120 64 40 84 162 26C156 46 124 60 96 66C30 80 -60 80 -110 62C-132 54 -144 40 -146 22Z" fill="${C.clayDark}" opacity=".45"/>
  <path d="M-124 -38C-80 -64 20 -70 96 -52C40 -58 -60 -54 -124 -38Z" fill="${C.clayLight}"/>
  <path d="M-118 38C-40 60 60 60 140 30" stroke="#f3e3c4" stroke-width="3" fill="none" opacity=".55" stroke-dasharray="1 9" stroke-linecap="round"/>
  ${holes}${game}`;
}

// A made-up traveller with a rust scarf, standing on its own origin (the feet). Poses: stand or jump.
function traveller({ pose = 'stand', boots = false } = {}) {
  const jump = pose === 'jump';
  const legs = jump ? 'M-8 -46L-22 -28L-12 -12M8 -46L20 -26L32 -18' : 'M-8 -46V-8M8 -46V-8';
  const feet = jump ? '<ellipse cx="-12" cy="-10" rx="9" ry="5" fill="#5a4636"/><ellipse cx="34" cy="-16" rx="9" ry="5" fill="#5a4636"/>'
    : boots ? `<path d="M-22 -18h21v20h-21ZM1 -18h21v20H1Z" fill="${C.steel}"/><path d="M-22 -12h21v4h-21ZM1 -12h21v4H1Z" fill="#6f757b"/>` : '<path d="M-17 -8h15v8h-15ZM2 -8h15v8H2Z" fill="#5a4636"/>';
  const arms = jump ? 'M-22 -84Q-36 -104 -30 -124M22 -84Q36 -104 30 -124' : 'M-22 -84Q-36 -66 -32 -48M22 -84Q36 -66 32 -48';
  const hands = jump ? [[-30, -126], [30, -126]] : [[-32, -46], [32, -46]];
  return `<path d="${legs}" stroke="#6b5a48" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${feet}
  <path d="${arms}" stroke="#eadcc7" stroke-width="10" fill="none" stroke-linecap="round"/>${hands.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${C.skin}"/>`).join('')}
  <path d="M-24 -88Q0 -96 24 -88L28 -40H-28Z" fill="#eadcc7"/><path d="M-27 -54h54v6h-54Z" fill="${C.woodDark}"/><path d="M14 -54l10 18h-8Z" fill="#a07d5a"/>
  <path d="M-18 -92q18 10 36 0l-2 10q-16 8-32 0Z" fill="${C.rust}"/><path d="M8 -86l16 24-8 3-14-22Z" fill="${C.rust}"/>
  <circle cx="0" cy="-112" r="20" fill="${C.skin}"/><path d="M-21 -114Q-20 -138 0 -138Q22 -138 21 -114Q14 -126 0 -124Q-12 -126 -21 -114Z" fill="#6b4a32"/>
  <circle cx="-7" cy="-112" r="2.3" fill="${C.ink}"/><circle cx="7" cy="-112" r="2.3" fill="${C.ink}"/><path d="M-5 -104q5 4 10 0" stroke="${C.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
}

// The hero: a wide field at sunset with the ocarina floating above the grass, a tree, a lake with a small
// temple, stars, fireflies and drifting notes. On a win the sun (.sun) rises and the sky warms (.dawn).
function field(id) {
  const p = `${slug}-${id}`;
  const stars = [[52, 64], [118, 38], [196, 92], [282, 48], [352, 112], [430, 44], [500, 96], [610, 176], [84, 168], [318, 182], [452, 170], [686, 236], [560, 228]].map(([x, y], i) => `<circle class="star" cx="${x}" cy="${y}" r="${i % 3 ? 1.6 : 2.4}" fill="#fbf6e6" opacity=".7"/>`).join('');
  const flies = [[96, 560], [624, 548], [528, 410], [196, 424], [664, 664]].map(([x, y]) => `<g class="firefly"><circle cx="${x}" cy="${y}" r="8" fill="#f3e7a6" opacity=".25"/><circle cx="${x}" cy="${y}" r="2.8" fill="#fbf1bf"/></g>`).join('');
  const tufts = [[34, 618], [138, 704], [600, 694], [690, 612], [250, 734], [480, 744]].map(([x, y]) => `<path class="tuft" d="M${x - 10} ${y}l4-24 5 18 4-26 5 24 5-16 2 24Z" fill="#6f9a78"/>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een groot grasveld bij zonsondergang, met een ocarina van klei die boven het gras zweeft, een boom, een meer met een klein tempeltje, vuurvliegjes en de eerste sterren">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#9fb2ad"/><stop offset=".26" stop-color="#cfd1be"/><stop offset=".43" stop-color="#f0d8af"/></linearGradient><linearGradient id="${p}-dawn" x2="0" y2="1"><stop stop-color="#eee9c8"/><stop offset=".43" stop-color="#f9da98"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <path class="dawn" fill="url(#${p}-dawn)" d="M0 0H720V760H0Z" opacity="0"/>
  <g class="stars">${stars}</g>
  <g class="moon"><circle cx="548" cy="150" r="32" fill="#fbf3dc" opacity=".22"/><path d="M548 128a22 22 0 1 0 0 44a16 22 0 1 1 0-44Z" fill="#f8efd6"/></g>
  <g class="sun"><circle class="sun-glow" cx="210" cy="322" r="76" fill="#f6d79a" opacity=".35"/><circle cx="210" cy="322" r="44" fill="#f2c47e"/></g>
  <g class="cloud" fill="#f7eedb" opacity=".6"><ellipse cx="430" cy="232" rx="92" ry="9"/><ellipse cx="150" cy="256" rx="70" ry="7"/><ellipse cx="610" cy="276" rx="60" ry="6"/></g>
  <g class="layer"><path d="M0 318Q70 288 150 302T300 298Q380 282 450 300T600 292Q660 284 720 298V430H0Z" fill="#b5c3b0"/>
  <g fill="#a5b6a1"><circle cx="40" cy="306" r="12"/><circle cx="58" cy="300" r="14"/><circle cx="330" cy="294" r="10"/><circle cx="346" cy="290" r="12"/></g>
  <ellipse cx="592" cy="350" rx="122" ry="16" fill="#9dbbb0"/><path class="shine" d="M520 348h40M600 356h50M640 344h30" stroke="#e6efe6" stroke-width="2" stroke-linecap="round" opacity=".6"/>
  <g transform="translate(600 346)"><path d="M-22 0V-34H22V0Z" fill="#cbc3ad"/><path d="M-28 -34H28L22 -42H-22Z" fill="#b2aa94"/><path d="M-16 -42Q0 -68 16 -42Z" fill="#8fa89c"/><path d="M-6 0V-18Q0 -25 6 -18V0Z" fill="#6f8a7e"/><path d="M-22 6H22" stroke="#cbc3ad" stroke-width="3" opacity=".5"/></g></g>
  <g class="layer"><path d="M0 376Q120 350 260 366T520 370Q620 360 720 374V760H0Z" fill="#98a873"/>
  <path d="M196 760C250 660 150 580 262 500C330 452 372 412 356 374H366C388 414 354 462 298 508C208 588 314 668 292 760Z" fill="#e2d4b0" opacity=".75"/>
  <g transform="translate(104 456)"><g class="tree"><path d="M-7 0h14l-3-84h-8Z" fill="#7a5c43"/><circle cx="0" cy="-106" r="44" fill="#4f7a62"/><circle cx="-32" cy="-82" r="30" fill="#5d8a6e"/><circle cx="32" cy="-86" r="32" fill="#5d8a6e"/><circle cx="6" cy="-130" r="28" fill="#6a9677"/></g></g></g>
  <g class="layer"><path d="M0 598Q170 568 360 592T720 586V760H0Z" fill="#5f8a6c"/><path d="M0 652Q200 622 400 648T720 642V760H0Z" fill="${C.sage}"/>${tufts}</g>
  <ellipse class="oc-shadow" cx="360" cy="592" rx="130" ry="11" fill="#3f6a55" opacity=".35"/>
  ${[0, 1, 2, 3, 4].map(i => `<circle class="round-dot" cx="${336 + i * 20}" cy="398" r="5.5" fill="${C.cream}" stroke="${C.green}" stroke-width="1.5" opacity="0"/>`).join('')}
  <g transform="translate(366 494)"><g class="ocarina">${ocarina(true)}</g></g>
  ${flies}
  ${note(250, 430, 1, '#f6ead2')}${note(500, 372, .8, '#f6ead2')}${note(594, 470, .9, '#f6ead2')}
  <g class="game-hint" opacity="0"><rect x="140" y="614" width="440" height="34" rx="17" fill="#f9f7e5" opacity=".94"/>
  <text class="hint-text" x="360" y="636" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="${C.green}">Klik op de ocarina en speel de melodie na</text></g>
  </svg>`;
}

// Chapter 2: two generations on a sofa, one with an old grey controller, one with a modern handheld.
function generations() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een volwassene met een oude grijze controller en een kind met een moderne spelcomputer zitten samen op de bank, met hartjes tussen hen in. Aan de muur hangen een hoekige boom uit 1998 en een gedetailleerde boom uit 2026">
  ${backdrop('#e6e3d0', '#efede0')}
  <g transform="translate(150 112)"><rect width="140" height="104" rx="4" fill="${C.wood}"/><rect x="8" y="8" width="124" height="88" fill="#d4dcc6"/><path d="M8 96V70L40 62 72 70 104 60 132 66V96Z" fill="#8fa27a"/><path d="M62 72h12V50H62Z" fill="#7a5c43"/><path d="M68 18 44 56H92Z" fill="#4f7a62"/><path d="M68 18 92 56H68Z" fill="#3f6a55"/><path d="M104 22h14v14h-14Z" fill="#f2c47e"/></g>
  <g transform="translate(430 112)"><rect width="140" height="104" rx="4" fill="${C.wood}"/><rect x="8" y="8" width="124" height="88" fill="#e3e8d8"/><circle cx="110" cy="28" r="10" fill="#f2c47e"/><path d="M8 70Q40 48 70 62T132 56V96H8Z" fill="#a9bc9a"/><path d="M8 80Q50 66 90 78T132 74V96H8Z" fill="#8fa27a"/><path d="M42 84V60" stroke="#7a5c43" stroke-width="4"/><circle cx="42" cy="50" r="12" fill="#4f7a62"/><circle cx="33" cy="58" r="9" fill="#5d8a6e"/><circle cx="51" cy="57" r="9" fill="#5d8a6e"/><circle cx="44" cy="43" r="7" fill="#6a9677"/><path d="M80 92l2-8 2 8M90 94l2-9 2 9M100 92l2-7 2 7M112 94l2-8 2 8" stroke="#6b8f63" stroke-width="1.5" fill="none"/></g>
  ${label(220, 240, '1998')}${label(500, 240, '2026')}
  <path d="M0 516H720V650H0Z" fill="#dccdae"/><ellipse cx="360" cy="590" rx="250" ry="34" fill="#cdb993"/>
  <rect x="150" y="360" width="420" height="96" rx="26" fill="#8aa592"/><rect x="140" y="440" width="440" height="50" rx="14" fill="#7a9883"/>
  <rect x="116" y="392" width="48" height="104" rx="20" fill="#6f8d78"/><rect x="556" y="392" width="48" height="104" rx="20" fill="#6f8d78"/><path d="M162 488h14v30h-14ZM544 488h14v30h-14Z" fill="#7a5c43"/>
  <path d="M246 470V538M278 470V538" stroke="#4a5a6a" stroke-width="20" stroke-linecap="round"/><ellipse cx="242" cy="546" rx="16" ry="8" fill="${C.ink}"/><ellipse cx="282" cy="546" rx="16" ry="8" fill="${C.ink}"/>
  <path d="M222 352Q262 338 302 352L310 470H214Z" fill="#5f7f9b"/><path d="M254 330h16v24h-16Z" fill="${C.skin}"/><circle cx="262" cy="308" r="28" fill="${C.skin}"/>
  <path d="M233 306Q234 274 262 274Q291 274 291 306Q282 290 262 290Q242 290 233 306Z" fill="#4a3b30"/><circle cx="252" cy="310" r="2.6" fill="${C.ink}"/><circle cx="272" cy="310" r="2.6" fill="${C.ink}"/><path d="M254 321q8 6 16 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M228 364Q212 404 240 420M296 364Q312 404 284 420" stroke="#5f7f9b" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M232 404q30-12 60 0l7 26q-9 7-18-3h-38q-9 10-18 3Z" fill="#a29d96"/><path d="M244 412h10M249 407v10" stroke="#6f6a64" stroke-width="3"/><circle cx="276" cy="410" r="3" fill="${C.rust}"/><circle cx="284" cy="416" r="3" fill="${C.yellow}"/><circle cx="262" cy="420" r="4" fill="#6f6a64"/>
  <circle cx="240" cy="424" r="8" fill="${C.skin}"/><circle cx="284" cy="424" r="8" fill="${C.skin}"/>
  <path d="M262 430Q258 480 200 500T112 520" stroke="#6f6a64" stroke-width="3" fill="none"/><rect x="62" y="526" width="96" height="36" rx="6" fill="${C.grey}"/><rect x="92" y="512" width="36" height="18" rx="2" fill="#77726c"/><circle cx="76" cy="544" r="4" fill="${C.rust}"/>
  <path d="M456 470V504M478 470V504" stroke="${C.sage}" stroke-width="16" stroke-linecap="round"/><ellipse cx="454" cy="512" rx="12" ry="6" fill="${C.ink}"/><ellipse cx="480" cy="512" rx="12" ry="6" fill="${C.ink}"/>
  <path d="M436 376Q466 364 496 376L502 470H430Z" fill="#e0a96d"/><path d="M459 352h14v26h-14Z" fill="#e8c2a4"/><circle cx="466" cy="338" r="24" fill="#e8c2a4"/>
  <path d="M441 336Q442 308 466 308Q491 308 491 336Q484 320 466 320Q448 320 441 336Z" fill="#6b4a32"/><circle cx="457" cy="340" r="2.4" fill="${C.ink}"/><circle cx="475" cy="340" r="2.4" fill="${C.ink}"/><path d="M459 349q7 5 14 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M440 386Q428 418 448 428M492 386Q504 418 484 428" stroke="#e0a96d" stroke-width="13" fill="none" stroke-linecap="round"/>
  <rect x="420" y="408" width="20" height="30" rx="9" fill="${C.olive}"/><rect x="492" y="408" width="20" height="30" rx="9" fill="#eadcc7"/><rect x="436" y="406" width="60" height="34" rx="4" fill="#3b4a3b"/><rect x="442" y="411" width="48" height="24" rx="2" fill="#9fc3b4"/><path d="M442 430Q458 420 472 426T490 422V435H442Z" fill="#6b8f63"/>
  <circle cx="432" cy="428" r="6.5" fill="#e8c2a4"/><circle cx="500" cy="428" r="6.5" fill="#e8c2a4"/>
  <g class="m-float"><text x="304" y="296" font-family="sans-serif" font-size="26" font-weight="700" fill="${C.rust}">?</text></g><g class="m-float" style="--d:-3s"><text x="196" y="336" font-family="sans-serif" font-size="20" font-weight="700" fill="${C.rust}" opacity=".8">?</text></g>
  ${note(512, 372, .9, C.sage, 'm-float', -2)}${note(536, 330, .7, C.olive, 'm-float', -5)}
  <g class="m-float" style="--d:-1.5s">${heart(366, 318, 1, C.rust)}</g><g class="m-float" style="--d:-4s">${heart(390, 270, .6, '#d99a8a')}</g><g class="m-float" style="--d:-6s">${heart(342, 248, .5, C.clay)}</g>
  </svg>`;
}

// Chapter 3: a game shop where boxes fly over the counter, with a chart that shoots up on the wall.
function shop() {
  const box = s => `<g transform="scale(${s})"><path d="M-25 -6q-30-22-38 6q16-8 38 10Z" fill="${C.cream}"/><path d="M25 -6q30-22 38 6q-16-8-38 10Z" fill="${C.cream}"/><rect x="-25" y="-34" width="50" height="68" rx="5" fill="${C.green}"/><rect x="-25" y="-34" width="50" height="14" rx="5" fill="${C.olive}"/><rect x="-25" y="-26" width="50" height="6" fill="${C.olive}"/><ellipse cx="2" cy="6" rx="15" ry="9" fill="${C.clay}"/><path d="M-12 2l-9-4v8Z" fill="${C.clay}"/><circle cx="0" cy="4" r="2" fill="${C.hole}"/><circle cx="8" cy="7" r="2" fill="${C.hole}"/></g>`;
  const shelf = ['#284f3d', '#517c67', '#c98a5e', '#284f3d', '#7f9c86', '#b76e55', '#284f3d'].map((c, i) => `<rect x="${104 + i * 30}" y="${132 + (i % 2) * 4}" width="24" height="${46 - (i % 2) * 4}" rx="2" fill="${c}"/><rect x="${104 + i * 30}" y="${140 + (i % 2) * 4}" width="24" height="5" fill="${C.cream}" opacity=".6"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gamewinkel met een toonbank en een kassa. Gamedozen met kleine vleugeltjes vliegen over de toonbank, en aan de muur hangt een bord met een lijn die steil omhoog gaat en het getal plus zeven procent">
  ${backdrop('#e4e0cc', '#efecdd')}
  <path d="M96 178h220v10H96Z" fill="${C.woodDark}"/>${shelf}
  <g transform="translate(420 96)"><rect width="230" height="160" rx="8" fill="${C.woodDark}"/><rect x="8" y="8" width="214" height="144" rx="4" fill="#f8f3e2"/><path d="M24 40H206M24 76H206M24 112H206" stroke="#e4dcc5" stroke-width="2"/>
  <path d="M28 132 64 116 92 124 128 92 156 100 194 46" stroke="${C.sage}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M184 40 204 34 200 56Z" fill="${C.sage}"/>${label(70, 58, '+7%', 26, C.green)}</g>
  <path d="M40 432H680V650H40Z" fill="#a07d5a"/><path d="M28 414H692V440H28Z" fill="#c09a72"/><path d="M80 470h160v150H80ZM280 470h160v150H280ZM480 470h160v150H480Z" fill="none" stroke="${C.woodDark}" stroke-width="4"/>
  <g transform="translate(130 330)"><path d="M0 84h120V30H0Z" fill="#7f9c86"/><path d="M14 30 24 0h72l10 30Z" fill="#6f8d78"/><rect x="30" y="6" width="60" height="18" rx="2" fill="#3b4a3b"/><path d="M38 15h6M48 15h6M58 15h6M68 15h6" stroke="#bfe0a0" stroke-width="3"/>
  <g fill="#eadcc7"><rect x="16" y="42" width="14" height="10" rx="2"/><rect x="38" y="42" width="14" height="10" rx="2"/><rect x="60" y="42" width="14" height="10" rx="2"/><rect x="16" y="60" width="14" height="10" rx="2"/><rect x="38" y="60" width="14" height="10" rx="2"/><rect x="60" y="60" width="14" height="10" rx="2"/></g><rect x="84" y="42" width="24" height="28" rx="3" fill="${C.rust}"/></g>
  <path d="M270 410Q310 250 430 262T612 330" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10" opacity=".8"/><path d="M310 410Q370 190 500 196" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10" opacity=".6"/>
  <g class="m-bob"><g transform="translate(372 384)">${box(.7)}</g></g>
  <g class="m-float"><g transform="translate(330 296) rotate(-12)">${box(1)}</g></g>
  <g class="m-float" style="--d:-2.5s"><g transform="translate(480 224) rotate(10)">${box(.9)}</g></g>
  <g class="m-float" style="--d:-5s"><g transform="translate(600 326) rotate(-6)">${box(.8)}</g></g>
  ${sparkle(270, 250, .9)}${sparkle(560, 400, .7, -1.6)}
  </svg>`;
}

// Chapter 4, variant "springen": the traveller jumps over a ravine, with a big glowing jump button below.
function jumpButton() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een reiziger met een rode sjaal springt over een kloof tussen twee grasrichels. Onderaan ligt een controller met één grote, gloeiende springknop">
  ${backdrop('#dfe5d4', '#ecefe0')}
  <g class="m-drift" fill="#f8f4e2" opacity=".8"><ellipse cx="190" cy="110" rx="80" ry="12"/><ellipse cx="520" cy="90" rx="100" ry="14"/></g>
  <path d="M240 420Q300 470 360 450T480 430V650H240Z" fill="#a9c1b4"/><path d="M250 560q40-10 80 0t80 0t70 0" stroke="#e6efe6" stroke-width="4" fill="none" opacity=".7"/>
  <path d="M0 380H250L232 650H0Z" fill="${C.rock}"/><path d="M0 366H256V392H0Z" fill="${C.moss}"/><path d="M470 400H720V650H486Z" fill="${C.rock}"/><path d="M462 386H720V412H462Z" fill="${C.moss}"/>
  <g fill="#8fa27a"><path d="M40 392h60v22H40ZM160 392h50v18h-50ZM560 412h70v22h-70Z"/></g>
  <path d="M150 372Q340 120 560 392" stroke="#bcb18d" stroke-width="4" fill="none" stroke-dasharray="3 12" stroke-linecap="round"/>
  <g class="m-bob"><g transform="translate(352 300) rotate(8)">${traveller({ pose: 'jump' })}</g></g>
  <g transform="translate(360 562)"><rect x="-130" y="-46" width="260" height="92" rx="46" fill="#3b4a3b"/><circle cx="-70" cy="0" r="24" fill="#4d5d4d"/><path d="M-70 -14v28M-84 0h28" stroke="#9aa59a" stroke-width="8" stroke-linecap="round"/>
  <circle class="m-twinkle" cx="64" cy="0" r="40" fill="${C.yellow}" opacity=".35"/><circle cx="64" cy="0" r="34" fill="none" stroke="#f7e3a8" stroke-width="3"/><circle cx="64" cy="0" r="26" fill="${C.yellow}"/><path d="M64 -13l-11 14h7v10h8v-10h7Z" fill="#3b4a3b"/></g>
  ${sparkle(470, 250, .8, -1)}${sparkle(230, 230, .6, -2.4)}
  </svg>`;
}

// Chapter 4, variant "stemmen": a studio microphone sends sound waves to a screen showing a cut scene.
function voices() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een opnamestudio met een grote microfoon op een standaard en een lessenaar met een script. Geluidsgolven gaan naar een scherm waarop twee figuurtjes met elkaar praten in tekstballonnen">
  ${backdrop('#e3e1cf', '#eeecde')}
  <path d="M0 560H720V650H0Z" fill="#d6cdb3"/>
  <g transform="translate(380 150)"><rect width="260" height="180" rx="10" fill="#3b4a3b"/><rect x="12" y="12" width="236" height="156" rx="4" fill="#cfdccb"/><circle cx="210" cy="44" r="14" fill="#f2c47e"/><path d="M12 128Q80 104 140 120T248 112V168H12Z" fill="#8fa27a"/>
  <path d="M70 130V100h20v30Z" fill="#eadcc7"/><circle cx="80" cy="88" r="11" fill="${C.skin}"/><path d="M160 130V100h20v30Z" fill="#7f9c86"/><circle cx="170" cy="88" r="11" fill="#d9a888"/>
  <g class="m-twinkle"><path d="M40 34h64v28H66l-10 10V62H40Z" fill="${C.paper}"/><path d="M50 44h44M50 52h30" stroke="#b8a888" stroke-width="3"/></g>
  <g class="m-twinkle" style="--d:-2s"><path d="M140 26h64v28h-16v10l-10-10h-38Z" fill="${C.paper}"/><path d="M150 36h44M150 44h26" stroke="#b8a888" stroke-width="3"/></g>
  <path d="M110 180h40l10 26h-60Z" fill="${C.woodDark}"/></g>
  <path d="M210 296V560" stroke="#6f6a64" stroke-width="8"/><path d="M150 560h120" stroke="#6f6a64" stroke-width="10" stroke-linecap="round"/><path d="M170 250q40 50 80 0" stroke="#6f6a64" stroke-width="6" fill="none"/>
  <rect x="180" y="170" width="60" height="110" rx="30" fill="${C.steel}"/><path d="M186 200h48M184 220h52M184 240h52M188 260h44" stroke="#6f757b" stroke-width="3"/>
  <g class="m-twinkle" stroke="${C.sage}" stroke-width="5" fill="none" stroke-linecap="round"><path d="M264 198q16 28 0 56"/></g>
  <g class="m-twinkle" style="--d:-1.3s" stroke="${C.sage}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"><path d="M290 184q26 42 0 84"/></g>
  <g class="m-twinkle" style="--d:-2.6s" stroke="${C.sage}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"><path d="M318 170q34 56 0 112"/></g>
  <g transform="translate(520 446)"><path d="M0 0l-34 114M0 0l34 114M0 0V114" stroke="${C.woodDark}" stroke-width="5"/><g transform="rotate(-8)"><rect x="-64" y="-56" width="128" height="72" rx="4" fill="${C.paper}"/><path d="M-50 -38h96M-50 -24h80M-50 -10h90" stroke="#b8a888" stroke-width="3"/></g></g>
  ${note(120, 300, 1, C.sage, 'm-float', -1)}${note(330, 420, .8, C.olive, 'm-float', -4)}
  </svg>`;
}

// Chapter 4, variant "menu": an underwater temple with a round quick menu; heavy boots are selected.
function quickMenu() {
  const bubbles = [[300, 400, 6], [320, 360, 4], [404, 380, 5], [150, 260, 7], [600, 300, 5], [560, 470, 6], [130, 480, 4]].map(([x, y, r], i) => `<circle class="m-float" style="--d:${-i * 1.1}s" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#eef5f1" stroke-width="2.5"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een tempel onder water met stenen zuilen, zeewier en luchtbellen. Bovenin staat een rond snelmenu met vier voorwerpen: zware ijzeren laarzen, een lantaarn, een sleutel en een fles. De laarzen zijn gekozen, en een reiziger staat met de zware laarzen op de bodem">
  <rect width="720" height="650" fill="#b9d0c9"/><circle cx="360" cy="315" r="223" fill="#c9dbd5"/><g fill="none" stroke="#9fbab2" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <g fill="#e8f0ea" opacity=".35"><path d="M200 0h60L200 420h-40ZM430 0h50L470 400h-40Z"/></g>
  <path d="M90 140H630L660 160H60Z" fill="#8aa098"/><path d="M60 160H660V190H60Z" fill="#94aaa2"/><g fill="#a3b8b0"><rect x="80" y="190" width="44" height="370"/><rect x="596" y="190" width="44" height="370"/></g><g fill="#94aaa2"><rect x="72" y="540" width="60" height="20"/><rect x="588" y="540" width="60" height="20"/></g>
  <path d="M0 560H720V650H0Z" fill="#7f9a90"/><path d="M0 560H720M120 560V650M300 560V650M480 560V650M620 560V650" stroke="#6e8a80" stroke-width="4"/>
  <g class="m-sway"><path d="M180 560q-18-40 0-80t0-80" stroke="${C.sage}" stroke-width="10" fill="none" stroke-linecap="round"/></g><g class="m-sway" style="--d:-2s"><path d="M540 560q18-36 0-72t0-64" stroke="${C.moss}" stroke-width="9" fill="none" stroke-linecap="round"/></g><g class="m-sway" style="--d:-4s"><path d="M560 560q-14-26 0-52" stroke="${C.sage}" stroke-width="8" fill="none" stroke-linecap="round"/></g>
  ${bubbles}
  <g transform="translate(360 270)"><circle r="132" fill="${C.cream}" opacity=".85"/><circle r="52" fill="#e3ddc8"/><path d="M0 -38l-12 22h24Z" fill="${C.green}"/>
  <circle cy="-86" r="38" fill="${C.paper}"/><circle class="m-twinkle" cy="-86" r="43" fill="none" stroke="${C.yellow}" stroke-width="6"/>
  ${[-14, 12].map(x => `<g transform="translate(${x} -86)"><path d="M-12 -18h13v15c9 0 15 4 15 11v3h-28Z" fill="${C.steel}"/><path d="M-13 -21h15v6h-15ZM-12 11h28v5h-28Z" fill="#6f757b"/></g>`).join('')}
  <circle cx="-86" r="34" fill="${C.paper}"/><rect x="-98" y="-14" width="24" height="30" rx="4" fill="${C.clay}"/><circle cx="-86" cy="1" r="7" fill="#f7e3a8"/><path d="M-94 -14q8-12 16 0" stroke="${C.woodDark}" stroke-width="3" fill="none"/>
  <circle cx="86" r="34" fill="${C.paper}"/><circle cx="74" r="9" fill="none" stroke="#c9a24a" stroke-width="5"/><path d="M83 0h22M99 0v9M92 0v7" stroke="#c9a24a" stroke-width="5"/>
  <circle cy="86" r="34" fill="${C.paper}"/><rect x="-6" y="64" width="12" height="8" fill="${C.woodDark}"/><path d="M-10 72h20v6q10 6 10 18v8h-40v-8q0-12 10-18Z" fill="#9fc3b4"/></g>
  <g transform="translate(360 560)">${traveller({ boots: true })}</g>
  </svg>`;
}

// Chapter 4, variant "logboek": an open logbook whose golden thread shows the way at a fork in a misty wood.
function logbook() {
  const trees = [[90, 340, 1], [150, 314, .8], [600, 318, .9], [660, 348, 1.1], [44, 392, .9], [500, 300, .6], [250, 296, .6]].map(([x, y, s]) => `<path d="M${x} ${y - 90 * s}l${-32 * s} ${90 * s}h${64 * s}Z" fill="#4f7a62"/><path d="M${x - 4 * s} ${y}h${8 * s}v${14 * s}h${-8 * s}Z" fill="#7a5c43"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een open logboek met een gouden draad die uit het boek over een bospad loopt. Bij een kruising met een wegwijzer vol vraagtekens wijst de draad de juiste weg naar een glinsterende ster">
  ${backdrop('#e6e1cc', '#f0ecdc')}
  <path d="M0 330Q180 300 360 320T720 310V650H0Z" fill="#a9b98a"/>${trees}
  <path d="M300 650C330 560 340 480 350 420H372C384 480 400 560 430 650Z" fill="#e2d4b0"/><path d="M350 424C300 380 250 350 200 334L214 326C260 340 310 362 356 410Z" fill="#e2d4b0"/><path d="M354 420 356 300H366L370 420Z" fill="#e2d4b0"/><path d="M368 412C420 370 480 346 540 330L548 340C490 356 430 382 374 424Z" fill="#e2d4b0"/>
  <g class="m-steam" fill="${C.paper}" opacity=".6"><ellipse cx="220" cy="340" rx="80" ry="12"/><ellipse cx="480" cy="330" rx="90" ry="12"/></g>
  <g transform="translate(424 452)"><path d="M0 0V-96" stroke="${C.woodDark}" stroke-width="7"/><path d="M-4 -92h56l10 11-10 11H-4Z" fill="#c09a72"/><path d="M4 -64h-56l-10 11 10 11H4Z" fill="#c09a72"/>${label(26, -75, '?', 16, C.ink)}${label(-26, -47, '?', 16, C.ink)}</g>
  <path class="m-twinkle" d="M168 518C240 500 330 520 358 470C374 440 370 430 382 416C430 376 490 350 548 330" stroke="#d9ae3c" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="560" cy="324" r="26" fill="#f7e3a8" opacity=".5"/>${sparkle(563, 317, 1.6)}
  <g transform="translate(170 560) rotate(-8)"><path d="M-90 -50Q-45 -62 0 -46Q45 -62 90 -50V40Q45 28 0 44Q-45 28 -90 40Z" fill="${C.paper}"/><path d="M0 -46V44" stroke="#d9c7a0" stroke-width="3"/>
  <path d="M-76 -30Q-45 -38 -12 -28M-76 -14Q-45 -22 -12 -12M-76 2Q-45 -6 -12 4M12 -28Q45 -38 76 -30M12 -12Q45 -22 76 -14" stroke="#b8a888" stroke-width="3" fill="none"/><path d="M18 4l6 6 12-12" stroke="${C.sage}" stroke-width="3" fill="none"/>
  <path d="M-90 40Q-45 28 0 44Q45 28 90 40V50Q45 38 0 54Q-45 38 -90 50Z" fill="${C.woodDark}"/></g>
  </svg>`;
}

// Chapter 5: fans cheer at a big screen with a detailed landscape, an empty field and a big-headed figure.
function fans() {
  const blades = Array.from({ length: 30 }, (_, i) => `M${22 + i * 13.5} 252l${2 + (i % 3)}-${10 + (i % 4) * 3}`).join('');
  const fan = (x, shirt, hair) => `<path d="M${x - 62} 650Q${x - 62} 560 ${x} 556Q${x + 62} 560 ${x + 62} 650Z" fill="${shirt}"/><circle cx="${x - 33}" cy="522" r="7" fill="${C.skin}"/><circle cx="${x + 33}" cy="522" r="7" fill="${C.skin}"/><circle cx="${x}" cy="518" r="34" fill="${hair}"/>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Drie fans, van achteren gezien, juichen voor een groot scherm met een gedetailleerd berglandschap, een groot leeg veld en een poppetje met een groot hoofd. Een fan houdt een bordje met een hart omhoog, en een gouden rozet toont het cijfer 96 van de 100">
  ${backdrop('#e5e2cf', '#efeddf')}
  <g transform="translate(140 84)"><rect width="440" height="270" rx="12" fill="#3b4a3b"/><rect x="14" y="14" width="412" height="242" rx="4" fill="#d6e2e0"/>
  <path d="M14 170 90 80 140 130 210 50 290 140 350 90 426 160V256H14Z" fill="#9fb3b3"/><path d="M210 50 290 140H252ZM90 80 140 130H112ZM350 90 426 160H392Z" fill="#8aa0a0"/><path d="M90 80l-20 30 14-4 6 10 10-14ZM210 50l-24 40 16-6 8 12 12-18ZM350 90l-16 26 10-4 6 8 8-12Z" fill="#f6f1e6"/>
  <path d="M14 196Q120 170 220 188T426 178V256H14Z" fill="#8fa27a"/><path d="M14 226Q140 210 260 222T426 216V256H14Z" fill="#7f9668"/><path d="${blades}" stroke="#6b8f63" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M352 186v-10" stroke="#7a5c43" stroke-width="2"/><circle cx="352" cy="172" r="6" fill="#4f7a62"/>
  <path d="M142 240v-10M158 240v-10" stroke="#6b5a48" stroke-width="6" stroke-linecap="round"/><path d="M138 232v-24h24v24Z" fill="#eadcc7"/><circle cx="150" cy="188" r="24" fill="${C.skin}"/><path d="M126 186Q128 160 150 160Q174 160 174 186Q166 172 150 172Q134 172 126 186Z" fill="#6b4a32"/><circle cx="141" cy="190" r="4" fill="${C.ink}"/><circle cx="159" cy="190" r="4" fill="${C.ink}"/><path d="M144 200q6 4 12 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g transform="translate(570 110)"><g class="m-bob"><circle r="58" fill="${C.yellow}"/><circle r="48" fill="none" stroke="#fbf1bf" stroke-width="3" stroke-dasharray="4 6"/>${label(0, 10, '96', 40, C.green)}${label(0, 32, '/100', 13, C.green)}</g></g>
  ${sparkle(110, 120, 1)}${sparkle(640, 230, .8, -1.4)}${sparkle(380, 400, .7, -2.6)}
  <path d="M150 600 128 474M250 600 272 474" stroke="#5f7f9b" stroke-width="18" stroke-linecap="round"/><rect x="110" y="398" width="180" height="80" rx="6" fill="${C.paper}"/>${heart(200, 432, 1.1, C.rust)}
  <path d="M332 604 300 486M428 604 460 486" stroke="#e0a96d" stroke-width="18" stroke-linecap="round"/><circle cx="300" cy="482" r="10" fill="${C.skin}"/><circle cx="460" cy="482" r="10" fill="${C.skin}"/>
  ${fan(200, '#5f7f9b', '#4a3b30')}${fan(380, '#e0a96d', '#6b4a32')}${fan(560, '#7f9c86', '#3b342e')}
  <g class="m-float" style="--d:-3s"><circle cx="606" cy="446" r="26" fill="${C.paper}"/><circle cx="586" cy="480" r="7" fill="${C.paper}"/><circle cx="578" cy="496" r="4" fill="${C.paper}"/>${label(606, 455, '?', 24)}</g>
  </svg>`;
}

// Completion: the ocarina above a sunrise, between an old cartridge from 1998 and a game card from 2026.
function finale() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="De ocarina zweeft boven een opkomende zon, met muzieknoten en een hart erboven. Links ligt een oude grijze spelcassette uit 1998, rechts een kleine spelkaart uit 2026">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <circle cx="360" cy="440" r="124" fill="#f6d79a" opacity=".45"/><circle cx="360" cy="440" r="82" fill="#f2c47e"/>
  <path d="M0 440Q180 392 360 420T720 410V650H0Z" fill="${C.olive}"/><path d="M0 500Q200 460 400 490T720 480V650H0Z" fill="#7f9c86"/>
  <g class="m-bob">${heart(360, 150, 1.6, C.rust)}</g>
  <g class="m-float"><g transform="translate(372 320) scale(.9)">${ocarina()}</g></g>
  ${note(236, 290, 1.2, C.sage, 'm-float', -1)}${note(498, 236, 1, C.clay, 'm-float', -3)}${note(560, 300, .9, C.green, 'm-float', -5)}${note(184, 214, .8, C.olive, 'm-float', -2)}
  <path d="M200 500Q360 590 520 500" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10"/>
  <g transform="translate(150 530) rotate(-8)"><rect x="-50" y="-44" width="100" height="80" rx="6" fill="${C.grey}"/><rect x="-36" y="-34" width="72" height="44" rx="3" fill="#cfd8c4"/><path d="M-50 36h100v10h-100Z" fill="#77726c"/>${label(0, -6, '1998', 16, '#3b4a3b')}</g>
  <g transform="translate(570 530) rotate(8)"><rect x="-34" y="-46" width="68" height="88" rx="8" fill="#3b4a3b"/><rect x="-26" y="-36" width="52" height="56" rx="4" fill="#d4e2d8"/>${label(0, -2, '2026', 15, C.green)}</g>
  ${sparkle(250, 130, 1)}${sparkle(470, 150, .8, -1.2)}${sparkle(120, 330, .7, -2.2)}${sparkle(610, 380, .9, -.8)}
  </svg>`;
}

const variants = { springen: jumpButton, stemmen: voices, menu: quickMenu, logboek: logbook };
export const hero = id => field(id);
export const chapter = (i, variant) => i === 1 ? generations() : i === 2 ? shop() : i === 3 ? (variants[variant] ?? jumpButton)() : fans();
export const completion = () => finale();
export const card = () => field('card');
