// Zelda-3D artwork: original SVG illustrations, all local. Nothing is copied from the games themselves: a
// made-up adventurer with a rust scarf and a round shield, small sprout monsters, a generic shop and castle.
// The hero is also the Z-targeting game. motion.js positions the actors itself by setting transform
// attributes: .hero (origin at the feet) with .hero-face, .hero-body and .sword inside, the three .mon
// slots (with .mound and .mon-body) and the .reticle. It fades .night, .stars, .moon, .home-glow and the
// .shutter for the day-night cycle, and shows .round-dot and .game-hint. Every id is prefixed with the
// journey slug so several journeys can share a page.
const slug = 'zelda-3d';

const C = { ink: '#3b342e', cream: '#f7f1df', paper: '#fbf6e6', green: '#284f3d', sage: '#517c67', olive: '#9cac66', moss: '#6f9463', wood: '#b8916b', woodDark: '#8c6a4c', rust: '#b76e55', yellow: '#e8c65a', gold: '#c9a24a', skin: '#e3b9a0', hair: '#6b4a32', tunic: '#5f7f9b', stone: '#a9ab9a', stoneDark: '#8e9182', mon: '#c9a77a', monLight: '#e3cba3', soil: '#7d5f42' };
export const START = { x: 300, y: 528 }, DUMMY = { x: 476, y: 500 };

const label = (x, y, text, size = 15, fill = '#687366') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="sans-serif" font-size="${size}" font-weight="700" fill="${fill}">${text}</text>`;
const sparkle = (x, y, s, d = 0) => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="#a28056" transform="translate(${-3 * s} ${7 * s})"/>`;
const heart = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6c-6-12-24-11-24 4c0 12 15 21 24 29c9-8 24-17 24-29c0-15-18-16-24-4Z" fill="${fill}"/>`;
const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;
const iso = (cx, cy, w, h, d, top, left, right) => `<path d="M${cx - w / 2} ${cy}L${cx} ${cy + h / 2}V${cy + h / 2 + d}L${cx - w / 2} ${cy + d}Z" fill="${left}"/><path d="M${cx + w / 2} ${cy}L${cx} ${cy + h / 2}V${cy + h / 2 + d}L${cx + w / 2} ${cy + d}Z" fill="${right}"/><path d="M${cx} ${cy - h / 2}L${cx + w / 2} ${cy}L${cx} ${cy + h / 2}L${cx - w / 2} ${cy}Z" fill="${top}"/>`;

// The adventurer, facing right, standing on its own origin (the feet). sword is the blade angle in degrees
// (0 points straight up); pose 'push' leans forward with both hands out and no sword.
function adventurer({ sword = 30, pose = 'stand', face = 1, swoosh = false } = {}) {
  const push = pose === 'push';
  const arms = push ? `<path d="M2 -58Q16 -56 26 -50M-4 -56Q12 -50 24 -44" stroke="${C.tunic}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="28" cy="-50" r="4.5" fill="${C.skin}"/><circle cx="26" cy="-43" r="4.5" fill="${C.skin}"/>`
    : `<path d="M6 -58Q16 -52 16 -44" stroke="${C.tunic}" stroke-width="7" fill="none" stroke-linecap="round"/><g transform="translate(16 -44)"><g class="sword" transform="rotate(${sword})"><path d="M-3 -8h6v-34l-3-7-3 7Z" fill="#e4e8e3"/><path d="M0 -10v-30" stroke="#c4cbc6" stroke-width="1.2"/><path d="M-9 -10h18v4h-18Z" fill="${C.gold}"/><path d="M-2 -6h4v9h-4Z" fill="${C.hair}"/><circle r="4.5" fill="${C.skin}"/></g></g>`;
  return `<g class="hero-face" transform="scale(${face} 1)"><g class="hero-body"${push ? ' transform="rotate(10 0 -10)"' : ''}>
  <path d="M-7 -30V-4M7 -30V-4" stroke="#6b5a48" stroke-width="8" stroke-linecap="round"/><path d="M-13 -7h12v7h-12ZM1 -7h14v7H1Z" fill="#5a4636"/>
  ${push ? '' : `<g transform="translate(-15 -44)"><circle r="15" fill="#a07d5a"/><circle r="13.5" fill="none" stroke="#7d8f86" stroke-width="3"/><path d="M0 -8v16M-8 0h16" stroke="#8c6a4c" stroke-width="2.5"/><circle r="3.5" fill="#d9c7a0"/></g>`}
  <path d="M-15 -60Q0 -66 15 -60L19 -26H-19Z" fill="${C.tunic}"/><path d="M-17 -38h35v5h-35Z" fill="${C.woodDark}"/><path d="M-2 -38h6v5h-6Z" fill="${C.gold}"/>
  <path d="M-10 -58l-15 9 4 6 13-9Z" fill="${C.rust}"/><path d="M-12 -63q12 7 24 0l-1 8q-11 6-22 0Z" fill="${C.rust}"/>
  <circle cx="0" cy="-77" r="14" fill="${C.skin}"/><path d="M-15 -76Q-16 -94 1 -94Q16 -94 15 -81Q8 -89 -1 -87Q-6 -86 -9 -82Q-11 -78 -15 -70Z" fill="${C.hair}"/>
  <circle cx="7" cy="-77" r="2" fill="${C.ink}"/><circle cx="9" cy="-71" r="2.6" fill="#e9a28c" opacity=".55"/><path d="M5 -70q3 2 6 0" stroke="${C.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  ${arms}
  <path class="swoosh" d="M14 -98Q70 -74 50 -4" stroke="#fbf6e6" stroke-width="5" fill="none" stroke-linecap="round" opacity="${swoosh ? .85 : 0}"/>
  </g></g>`;
}

// A small sprout monster on its own origin (the feet), rising from a mound of soil.
function monster({ rise = 1, eyes = 0 } = {}) {
  return `<g class="mound"><ellipse rx="27" ry="7" fill="${C.soil}"/><circle cx="-22" cy="-2" r="4" fill="#8d6c4c"/><circle cx="20" cy="-1" r="5" fill="#8d6c4c"/><circle cx="26" cy="-4" r="2.5" fill="#8d6c4c"/></g>
  <g class="mon-body" transform="scale(${0.3 + 0.7 * rise} ${rise})"><path d="M-20 -2Q-25 -40 0 -42Q25 -40 20 -2Q10 3 0 1Q-10 3 -20 -2Z" fill="${C.mon}"/><ellipse cx="0" cy="-13" rx="12" ry="9" fill="${C.monLight}"/>
  <path d="M-20 -16l-9 5M20 -16l9 5" stroke="${C.mon}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="-7" cy="-27" rx="5" ry="6" fill="${C.paper}"/><ellipse cx="7" cy="-27" rx="5" ry="6" fill="${C.paper}"/><circle cx="${-7 + eyes}" cy="-26" r="2.6" fill="${C.ink}"/><circle cx="${7 + eyes}" cy="-26" r="2.6" fill="${C.ink}"/>
  <path d="M-12 -36l7 3M12 -36l-7 3" stroke="${C.soil}" stroke-width="2.2" stroke-linecap="round"/><path d="M-4 -18q4 3 8 0" stroke="${C.soil}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M0 -42q-2-9 2-13" stroke="${C.sage}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M2 -55q10-6 14 2q-8 4-14-2Z" fill="${C.moss}"/><path d="M1 -52q-10-6-13 1q8 4 13-1Z" fill="${C.olive}"/></g>`;
}

// The golden lock-on reticle around its own origin: a dashed ring and four arrowheads pointing inward.
function reticle(r = 30) {
  const arrow = deg => `<path transform="rotate(${deg})" d="M0 ${-(r - 6)}L-9 ${-(r + 10)}H9Z" fill="${C.yellow}" stroke="#a8822e" stroke-width="1.5" stroke-linejoin="round"/>`;
  return `<g class="reticle-spin"><circle r="${r}" fill="none" stroke="${C.yellow}" stroke-width="2.5" stroke-dasharray="6 8" opacity=".85"/>${[0, 90, 180, 270].map(arrow).join('')}</g>`;
}

// A straw practice dummy on a post, origin at the foot of the post.
const dummy = () => `<path d="M-4 0V-66h8V0Z" fill="${C.woodDark}"/><path d="M-26 -58h52v6h-52Z" fill="#a07d5a"/><ellipse cx="0" cy="-46" rx="16" ry="21" fill="#d9bf7a"/><path d="M-12 -60q12 6 24 0M-14 -34q14 6 28 0" stroke="#c4a65e" stroke-width="2" fill="none"/>
  <circle cx="0" cy="-46" r="9" fill="${C.rust}"/><circle cx="0" cy="-46" r="4" fill="${C.cream}"/><circle cx="0" cy="-77" r="11" fill="#d9bf7a"/><path d="M-6 -86l-3-6M0 -88v-6M6 -86l3-6" stroke="#c4a65e" stroke-width="2" stroke-linecap="round"/>`;

// A village shop with a striped awning and a counter window; .shutter closes it at night.
function shop(night = false) {
  const stripes = [0, 1, 2, 3, 4, 5].map(i => `<path d="M${-66 + i * 22} -56h22v12q-11 8-22 0Z" fill="${i % 2 ? C.cream : C.rust}"/>`).join('');
  const shutter = `<g class="shutter"${night ? '' : ' opacity="0"'}><rect x="-42" y="-40" width="84" height="30" fill="#a07d5a"/><path d="M-42 -32h84M-42 -24h84M-42 -16h84" stroke="${C.woodDark}" stroke-width="2"/></g>`;
  return `<path d="M-60 0V-70H60V0Z" fill="#eadcc7"/><path d="M-70 -70L0 -104L70 -70Z" fill="${C.rust}"/><path d="M-70 -70H70V-64H-70Z" fill="#9c5c47"/>
  <rect x="-42" y="-40" width="84" height="30" fill="#f2d79a"/><g fill="${C.sage}"><circle cx="-28" cy="-18" r="6"/><circle cx="-14" cy="-20" r="7"/></g><rect x="4" y="-30" width="10" height="16" rx="2" fill="${C.rust}"/><rect x="20" y="-28" width="12" height="14" rx="2" fill="#9fc3b4"/>
  <path d="M-46 -10h92v6h-92Z" fill="${C.woodDark}"/>${shutter}${stripes}
  <rect x="-30" y="-92" width="60" height="16" rx="3" fill="${C.woodDark}"/>${label(0, -80, 'WINKEL', 10, C.cream)}`;
}

// The hero: a clearing at the edge of a village at dusk, with a castle on a far hill. The adventurer
// practises on a straw dummy inside the reticle. In the game the night falls and monsters rise.
function field(id) {
  const p = `${slug}-${id}`;
  const stars = [[60, 70], [128, 210], [196, 96], [292, 60], [356, 196], [424, 104], [508, 60], [648, 214], [96, 132], [318, 128], [470, 226], [586, 118], [700, 160], [250, 250]].map(([x, y], i) => `<circle class="star" cx="${x}" cy="${y}" r="${i % 3 ? 1.6 : 2.4}" fill="#fbf6e6"/>`).join('');
  const tufts = [[96, 560], [628, 548], [140, 640], [600, 648], [40, 690], [690, 700], [380, 722]].map(([x, y]) => `<path class="tuft" d="M${x - 10} ${y}l4-22 5 16 4-24 5 22 5-14 2 22Z" fill="#6f9a78"/>`).join('');
  const birds = [[150, 200], [184, 186], [520, 160]].map(([x, y]) => `<path class="bird" d="M${x - 9} ${y}q5-6 9 0q4-6 9 0" stroke="#5d6f62" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('');
  const mons = [0, 1, 2].map(i => `<g class="actor"><g class="mon" data-mon="${i}" opacity="0">${monster({ rise: 0 })}</g></g>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een open veld bij een dorp met een winkeltje, met een kasteel op een verre heuvel. Een held met een rode sjaal en een rond schild oefent met zijn zwaard op een strooien pop, en om de pop staat een gouden richtkruis">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#b9cdc6"/><stop offset=".25" stop-color="#dcdcc4"/><stop offset=".42" stop-color="#f1dcb0"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <g class="sun"><circle class="sun-glow" cx="560" cy="236" r="70" fill="#f6d79a" opacity=".4"/><circle cx="560" cy="236" r="40" fill="#f2c47e"/></g>
  <g class="cloud" fill="#f7eedb" opacity=".7"><ellipse cx="420" cy="170" rx="90" ry="10"/><ellipse cx="140" cy="250" rx="70" ry="8"/><ellipse cx="640" cy="290" rx="56" ry="6"/></g>
  ${birds}
  <g class="layer"><path d="M0 330Q90 290 190 306T380 296Q470 268 560 292T720 300V420H0Z" fill="#b5c3b0"/>
  <g transform="translate(470 286)" fill="#9fb09b"><path d="M-46 4V-30h14v-8h8v8h12V-52h8v-8h8v8h8V-30h12v-8h8v8h14V4Z"/><path d="M-4 -60l8-14 8 14Z"/><path d="M-42 -38l11-12 11 12ZM24 -38l11-12 11 12Z"/></g></g>
  <g class="layer"><path d="M0 376Q130 350 270 366T540 364Q630 356 720 370V760H0Z" fill="#98a873"/>
  <g transform="translate(62 398)"><path d="M-34 0V-50H34V0Z" fill="#e3d6be"/><path d="M-42 -50L0 -80L42 -50Z" fill="${C.sage}"/><rect x="-24" y="-40" width="14" height="14" fill="#c9bfa6"/><rect x="10" y="-40" width="14" height="14" fill="#c9bfa6"/><path d="M-7 0V-20h14V0Z" fill="${C.woodDark}"/></g>
  <g transform="translate(176 404)">${shop()}</g>
  <g transform="translate(652 430)"><g class="tree"><path d="M-7 0h14l-3-80h-8Z" fill="#7a5c43"/><circle cx="0" cy="-100" r="40" fill="#4f7a62"/><circle cx="-28" cy="-78" r="28" fill="#5d8a6e"/><circle cx="28" cy="-82" r="30" fill="#5d8a6e"/><circle cx="6" cy="-122" r="26" fill="#6a9677"/></g></g>
  <ellipse cx="360" cy="514" rx="290" ry="118" fill="#c2c08b"/><ellipse cx="360" cy="514" rx="250" ry="96" fill="#cfcb98"/>
  <path d="M190 470q20-4 40 0M470 560q24-4 48 0M300 600q16-3 32 0" stroke="#b8b47e" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g class="layer"><path d="M0 646Q200 620 400 640T720 634V760H0Z" fill="${C.sage}"/>${tufts}</g>
  <rect class="night" width="720" height="760" fill="#22384a" opacity="0"/>
  <g class="stars" opacity="0">${stars}</g>
  <g class="moon" opacity="0"><circle cx="262" cy="150" r="30" fill="#fbf3dc" opacity=".22"/><path d="M262 130a20 20 0 1 0 0 40a15 20 0 1 1 0-40Z" fill="#f8efd6"/></g>
  <g class="home-glow" opacity="0" transform="translate(62 398)"><rect x="-24" y="-40" width="14" height="14" fill="#f6d68a"/><rect x="10" y="-40" width="14" height="14" fill="#f6d68a"/><circle cx="-17" cy="-33" r="16" fill="#f6d68a" opacity=".25"/><circle cx="17" cy="-33" r="16" fill="#f6d68a" opacity=".25"/></g>
  <g class="actors">
  <g class="actor"><g class="dummy-wrap"><ellipse cx="${DUMMY.x}" cy="${DUMMY.y}" rx="22" ry="6" fill="#3f6a55" opacity=".25"/><g transform="translate(${DUMMY.x} ${DUMMY.y})"><g class="dummy">${dummy()}</g></g></g></g>
  <g class="actor"><g class="hero" transform="translate(${START.x} ${START.y})"><ellipse rx="22" ry="6" fill="#3f6a55" opacity=".3"/>${adventurer()}</g></g>
  ${mons}
  </g>
  <g class="reticle" transform="translate(${DUMMY.x} ${DUMMY.y - 48})">${reticle()}</g>
  <g class="poof-pos"><g class="poof" opacity="0">${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${Math.round(Math.cos(a * Math.PI / 180) * 26)}" cy="${Math.round(Math.sin(a * Math.PI / 180) * 26)}" r="6" fill="${C.paper}"/>`).join('')}<path d="M0 -14l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="${C.yellow}"/></g></g>
  ${[0, 1, 2, 3, 4].map(i => `<circle class="round-dot" cx="${320 + i * 20}" cy="132" r="5.5" fill="${C.cream}" stroke="${C.green}" stroke-width="1.5" opacity="0"/>`).join('')}
  <g class="game-hint" opacity="0"><rect x="96" y="660" width="528" height="34" rx="17" fill="#f9f7e5" opacity=".94"/>
  <text class="hint-text" x="360" y="682" text-anchor="middle" font-family="sans-serif" font-size="12.5" font-weight="700" fill="${C.green}">Klik op het veld en speel mee</text></g>
  </svg>`;
}

// Chapter 2: a flat world seen from above (1991) and a runner on a 3D block with a joystick (1996)
// flow together into one kingdom in 3D (1998).
function predecessors() {
  const T = 30, map = ['ggtggg', 'gpppgg', 'gpgpht', 'tpgppg', 'ggtgpg'];
  const tiles = map.map((row, r) => [...row].map((t, c) => {
    const x = 92 + c * T, y = 116 + r * T;
    const base = `<rect x="${x}" y="${y}" width="${T}" height="${T}" fill="${t === 'p' ? '#e2d4b0' : (r + c) % 2 ? '#a9bc8a' : '#9fb382'}"/>`;
    if (t === 't') return `${base}<circle cx="${x + 15}" cy="${y + 15}" r="12" fill="#4f7a62"/><circle cx="${x + 12}" cy="${y + 12}" r="5" fill="#6a9677"/>`;
    if (t === 'h') return `${base}<rect x="${x + 4}" y="${y + 4}" width="22" height="22" fill="${C.rust}"/><path d="M${x + 4} ${y + 15}h22" stroke="#9c5c47" stroke-width="2"/>`;
    return base;
  }).join('')).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Links een platte spelwereld van bovenaf, met tegels, bomen, een huisje en een klein figuurtje, met het jaartal 1991. Rechts rent een figuurtje over een blok in 3D, met een joystick eronder en het jaartal 1996. Stippellijnen lopen van beide naar een groot eiland in 3D met een kasteel en een held, met het jaartal 1998">
  ${backdrop('#e6e3d0', '#efede0')}
  <rect x="80" y="104" width="204" height="174" rx="8" fill="${C.woodDark}"/>${tiles}<rect x="190" y="178" width="12" height="12" rx="2" fill="${C.tunic}"/><circle cx="196" cy="184" r="3.5" fill="${C.skin}"/>
  ${label(182, 306, '1991 · 2D')}
  <g transform="translate(540 190)">${iso(0, 0, 160, 80, 40, '#a9bc8a', '#8fa27a', '#7f9668')}${iso(-34, -24, 40, 20, 16, '#d9c7a0', '#c09a72', '#a07d5a')}
  <g class="m-bob"><g transform="translate(14 -10) scale(.55)">${adventurer({ sword: 60 })}</g></g><path d="M-46 0h-22M-42 8h-16M-44 -8h-14" stroke="#bcb18d" stroke-width="3" stroke-linecap="round"/></g>
  <g transform="translate(616 286)"><ellipse rx="26" ry="9" fill="#3b4a3b"/><path d="M-4 0V-30h8V0Z" fill="#6f757b"/><circle cy="-34" r="9" fill="${C.rust}"/></g>
  ${label(540, 306, '1996 · 3D')}
  <path d="M190 330Q220 400 290 430" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10"/><path d="M540 330Q510 400 430 430" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10"/>
  <g transform="translate(360 470)">${iso(0, 0, 300, 140, 60, '#9fb382', '#7f9668', '#6b8a5c')}
  <path d="M-110 4Q-40 20 0 50T70 50" stroke="#e2d4b0" stroke-width="12" fill="none" stroke-linecap="round"/>
  <g transform="translate(40 -20)" fill="#c9bfa6"><path d="M-30 6V-26h10v-8h6v8h28v-8h6v8h10V6Z"/><path d="M-6 -26V-50h12V-26Z"/><path d="M-8 -50l8-12 8 12Z" fill="${C.rust}"/><path d="M-6 6V-8h12V6Z" fill="${C.woodDark}"/></g>
  <circle cx="-80" cy="-6" r="14" fill="#4f7a62"/><circle cx="-60" cy="-22" r="11" fill="#5d8a6e"/><circle cx="104" cy="12" r="12" fill="#4f7a62"/>
  <g transform="translate(-20 40) scale(.6)">${adventurer()}</g></g>
  ${label(360, 618, '1998 · OCARINA OF TIME', 15, C.green)}
  ${sparkle(330, 360, 1)}${sparkle(560, 380, .7, -1.4)}${sparkle(150, 420, .8, -2.6)}
  </svg>`;
}

// Chapter 3: without Z the sword swings past a monster that stands further back; with Z the reticle
// locks on and the hero circles and strikes.
function targeting(locked) {
  const room = `${backdrop('#e3e4d2', '#eef0e2')}<ellipse cx="360" cy="470" rx="300" ry="110" fill="#cfcb98"/><ellipse cx="360" cy="470" rx="250" ry="86" fill="#d9d5a6"/>`;
  const zKey = `<g transform="translate(118 140)"><circle r="40" fill="${locked ? C.yellow : '#d4d2c0'}"/><circle r="40" fill="none" stroke="${locked ? '#a8822e' : '#b4b2a0'}" stroke-width="3"/>${label(0, 13, 'Z', 36, locked ? C.green : '#8e8c7c')}</g>`;
  if (!locked) return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zonder Z-targeting: de held slaat met zijn zwaard, maar het monster staat verder naar achteren. Het zwaard zwaait er vlak voor langs en de held kijkt verbaasd, met een vraagteken boven zijn hoofd">
  ${room}${zKey}
  <path d="M300 520 470 520" stroke="#b8b47e" stroke-width="3" stroke-dasharray="4 8"/><path d="M470 520V412" stroke="#b8b47e" stroke-width="3" stroke-dasharray="4 8"/>
  <ellipse cx="470" cy="410" rx="22" ry="6" fill="#3f6a55" opacity=".2"/><g transform="translate(470 410) scale(1.1)">${monster({ eyes: -2 })}</g>
  <ellipse cx="300" cy="520" rx="26" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(300 520) scale(1.45)">${adventurer({ sword: 120, swoosh: true })}</g>
  <path d="M410 470l14 6M404 490l16 2M412 452l10 10" stroke="#a28056" stroke-width="3" stroke-linecap="round"/>
  <g class="m-float"><circle cx="270" cy="352" r="22" fill="${C.paper}"/>${label(270, 361, '?', 24, C.rust)}</g>
  <g class="m-bob" style="--d:-1s"><circle cx="420" cy="330" r="16" fill="${C.paper}"/>${label(420, 337, '?', 18, '#8e8c7c')}</g>
  </svg>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Met Z-targeting: een gouden richtkruis zit vast om het monster. Een gestippelde cirkel met pijlen loopt om het monster heen, en de held slaat precies raak, met een sterretje bij het zwaard">
  ${room}${zKey}
  <ellipse cx="470" cy="470" rx="150" ry="62" fill="none" stroke="#a8a26a" stroke-width="3" stroke-dasharray="6 9"/><path d="M612 486l8-18 10 18Z" fill="#a8a26a"/><path d="M328 454l-8 18-10-18Z" fill="#a8a26a"/>
  <ellipse cx="490" cy="470" rx="22" ry="6" fill="#3f6a55" opacity=".25"/><g transform="translate(490 470) scale(1.35)">${monster({ eyes: -2 })}</g>
  <g transform="translate(490 436)"><g class="m-twinkle">${reticle(54)}</g></g>
  <ellipse cx="350" cy="478" rx="26" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(350 478) scale(1.45)">${adventurer({ sword: 95, swoosh: true })}</g>
  <path class="m-twinkle" d="M432 400l6 14 14 6-14 6-6 14-6-14-14-6 14-6Z" fill="${C.yellow}"/>
  ${sparkle(600, 330, .8)}${sparkle(250, 300, .7, -1.8)}
  </svg>`;
}

// Chapter 4: the same A button does something different depending on where the hero stands.
function aButton(variant) {
  const chest = variant === 'kist';
  const room = `${backdrop('#e2ded0', '#ecebe0')}<path d="M70 380H650V560H70Z" fill="#c9c3ae"/>${[0, 1, 2, 3].map(r => `<path d="M70 ${400 + r * 44}H650" stroke="#b6b09a" stroke-width="3"/>`).join('')}${[0, 1, 2, 3, 4, 5, 6].map(c => `<path d="M${110 + c * 84} 380V560" stroke="#b6b09a" stroke-width="3"/>`).join('')}
  <path d="M70 140H650V380H70Z" fill="#b9bba8"/>${[0, 1, 2, 3, 4].map(r => `<path d="M70 ${180 + r * 44}H650" stroke="#a7a996" stroke-width="3"/>`).join('')}
  ${[150, 570].map(x => `<g transform="translate(${x} 250)"><path d="M-8 0h16l-4 30h-8Z" fill="${C.woodDark}"/><g class="m-twinkle"><path d="M0 -30q14 14 6 28q-6 6-12 0q-8-14 6-28Z" fill="#f2c47e"/></g></g>`).join('')}`;
  const button = word => `<g class="m-bob"><g transform="translate(290 210)"><circle r="44" fill="${C.green}"/><circle r="36" fill="none" stroke="${C.olive}" stroke-width="3"/>${label(0, 14, 'A', 40, C.cream)}</g>
  <path d="M330 220q60 0 80 30" stroke="#8e9182" stroke-width="3" fill="none" stroke-dasharray="4 7"/><g transform="translate(470 196)"><rect x="-58" y="-24" width="116" height="48" rx="24" fill="${C.paper}"/>${label(0, 8, word, 22, C.rust)}</g></g>`;
  if (chest) return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="De held staat voor een houten kist in een stenen zaal met fakkels. Boven hem zweeft een groene A-knop met het woord Open, en de kist gaat open met een gouden glans">
  ${room}${button('Open')}
  <g transform="translate(456 488)"><ellipse rx="70" ry="10" fill="#3f6a55" opacity=".2"/><path d="M-60 0V-56H60V0Z" fill="#a07d5a"/><path d="M-60 -40H60M-60 -20H60" stroke="${C.woodDark}" stroke-width="3"/><path d="M-60 -56H60V-62H-60Z" fill="${C.gold}"/>
  <circle class="m-twinkle" cy="-70" r="48" fill="#f6d79a" opacity=".55"/><path d="M-60 -60L-66 -116H54L60 -60Z" fill="#b8916b"/><path d="M-64 -100H56" stroke="${C.woodDark}" stroke-width="3"/><rect x="-8" y="-60" width="16" height="16" rx="2" fill="${C.gold}"/></g>
  <g class="m-float"><g transform="translate(456 400)"><path d="M0 -18l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="${C.yellow}"/></g></g>
  ${sparkle(520, 380, .8, -1)}${sparkle(390, 372, .6, -2.2)}
  <ellipse cx="300" cy="494" rx="26" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(300 494) scale(1.5)">${adventurer({ sword: 20 })}</g>
  </svg>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="De held duwt met beide handen tegen een groot, zwaar stenen blok in een stenen zaal met fakkels. Boven hem zweeft een groene A-knop met het woord Duw, en achter het blok zie je sleepsporen op de vloer">
  ${room}${button('Duw')}
  <path d="M500 518H620M500 530H610" stroke="#a7a18a" stroke-width="4" stroke-linecap="round"/>
  <g transform="translate(470 520)"><path d="M-90 0V-150H90V0Z" fill="${C.stone}"/><path d="M-90 -150H90V-138H-90Z" fill="#bcbeae"/><path d="M-90 0H90V-8H-90Z" fill="${C.stoneDark}"/><path d="M-40 -110q30-16 56 4M-20 -60l22-14 16 10" stroke="${C.stoneDark}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="30" cy="-90" r="18" fill="none" stroke="${C.stoneDark}" stroke-width="3"/></g>
  <path d="M290 460h-30M296 480h-40M290 500h-28" stroke="#a28056" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="338" cy="520" rx="26" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(338 520) scale(1.5)">${adventurer({ pose: 'push' })}</g>
  </svg>`;
}

// Chapter 5: the same village by day (shop open, sun) and by night (shutter down, moon, monsters rising).
function dayNight() {
  const stars = [[420, 90], [480, 150], [560, 80], [640, 140], [600, 220], [690, 70], [430, 230]].map(([x, y], i) => `<circle class="m-twinkle" style="--d:${-i * .7}s" cx="${x}" cy="${y}" r="${i % 2 ? 2 : 3}" fill="#fbf6e6"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hetzelfde dorp twee keer. Links is het dag: de zon schijnt en de winkel is open. Rechts is het nacht: de maan en de sterren staan aan de hemel, de luiken van de winkel zijn dicht en er kruipen drie monsters uit de grond">
  <rect width="360" height="650" fill="#dfe6d8"/><rect x="360" width="360" height="650" fill="#3e5466"/>
  <path d="M90 200Q360 -40 630 200" stroke="#bcb18d" stroke-width="3" fill="none" stroke-dasharray="4 10"/>
  <circle cx="120" cy="150" r="54" fill="#f6d79a" opacity=".45"/><circle cx="120" cy="150" r="34" fill="#f2c47e"/>
  <g class="m-drift" fill="#f8f4e2"><ellipse cx="240" cy="110" rx="70" ry="10"/></g>
  ${stars}<circle cx="600" cy="150" r="40" fill="#fbf3dc" opacity=".16"/><path d="M600 124a26 26 0 1 0 0 52a20 26 0 1 1 0-52Z" fill="#f8efd6"/>
  <path d="M0 360Q180 330 360 350V650H0Z" fill="#98a873"/><path d="M360 350Q540 330 720 356V650H360Z" fill="#4f6656"/>
  <g transform="translate(190 410)">${shop(false)}</g>
  <g transform="translate(540 410)" opacity=".82">${shop(true)}</g>
  <path d="M0 520Q180 500 360 512V650H0Z" fill="#7f9c6c"/><path d="M360 512Q540 500 720 516V650H360Z" fill="#3f574a"/>
  <ellipse cx="200" cy="560" rx="26" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(200 560) scale(1.2)">${adventurer({ sword: 15 })}</g>
  <g class="m-bob"><g transform="translate(470 560)">${monster({ rise: .8, eyes: -2 })}</g></g>
  <g class="m-bob" style="--d:-1.4s"><g transform="translate(570 590) scale(1.15)">${monster({ rise: 1, eyes: -2 })}</g></g>
  <g class="m-bob" style="--d:-2.6s"><g transform="translate(650 545) scale(.9)">${monster({ rise: .45 })}</g></g>
  ${label(180, 630, 'DAG', 16, C.green)}${label(540, 630, 'NACHT', 16, C.cream)}
  </svg>`;
}

// Completion: the adventurer raises the sword on a hill at sunrise, below a heart inside the reticle.
function finale() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bij zonsopgang staat de held op een heuvel en steekt zijn zwaard omhoog. Boven hem zweeft een hart in een gouden richtkruis, met een kasteel in de verte en een klein monster dat vrolijk meekijkt">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <circle cx="360" cy="400" r="130" fill="#f6d79a" opacity=".45"/><circle cx="360" cy="400" r="86" fill="#f2c47e"/>
  <g transform="translate(560 380)" fill="#c9bfa6"><path d="M-40 6V-26h12v-8h8v8h40v-8h8v8h12V6Z"/><path d="M-8 -26V-56h16V-26Z"/><path d="M-10 -56l10-14 10 14Z" fill="${C.rust}"/></g>
  <path d="M0 410Q180 370 360 400T720 390V650H0Z" fill="${C.olive}"/><path d="M120 650Q200 470 360 470T600 650Z" fill="#7f9c86"/><path d="M0 560Q200 530 400 556T720 548V650H0Z" fill="${C.sage}"/>
  <g class="m-float"><g transform="translate(360 180)">${reticle(56)}${heart(0, -2, 1.3, C.rust)}</g></g>
  <ellipse cx="360" cy="476" rx="30" ry="7" fill="#3f6a55" opacity=".3"/><g transform="translate(360 476) scale(1.6)">${adventurer({ sword: -10 })}</g>
  <g class="m-bob"><g transform="translate(520 560) scale(1.1)">${monster({ eyes: -2 })}</g></g>
  ${sparkle(230, 150, 1)}${sparkle(500, 120, .8, -1.2)}${sparkle(150, 330, .7, -2.2)}${sparkle(610, 300, .9, -.8)}
  </svg>`;
}

export const hero = id => field(id);
export const chapter = (i, variant) => i === 1 ? predecessors() : i === 2 ? targeting(variant === 'met') : i === 3 ? aButton(variant ?? 'kist') : dayNight();
export const completion = () => finale();
export const card = () => field('card');
