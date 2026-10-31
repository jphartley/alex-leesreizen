// Pokémon-mythes artwork: original SVG illustrations of the legends behind four Pokémon, all local.
// The hero is also the playing field of the Dragon Gate game: motion.js reads the .rock and .surge
// obstacles from this markup and moves .carp-pos, .dragon-pos and the hints. Every id is prefixed
// with the journey slug so several journeys can share a page.
const slug = 'pokemon-mythes';

const C = { cream: '#f3ead0', ink: '#3b342e', yellow: '#e8c65a', fox: '#efe3c4', foxTail: '#e6d3a0', foxTip: '#d9b76a', pinkSoft: '#e8c3c0', carp: '#d98b5a', carpDark: '#c9684c', dragon: '#5f7f9b', dragonFin: '#a9bea6', snow: '#f6f1e6', ice: '#b9cfd6', storm: '#6a6f78', raijin: '#b76e55', woodDark: '#8c6a4c', rock: '#6b7f5c', cliff: '#7c8f6a', water: '#5d8876', grass: '#517c67' };

// A sitting fox with nine tails fanned out behind it. Local origin is between its front paws.
const fox = (x, y, s, cls = 'fox') => {
  const tails = Array.from({ length: 9 }, (_, i) => `<g transform="rotate(${-62 + i * 15.5})"><path class="tail" d="M0 0Q-18 -50 -6 -96Q0 -112 10 -96Q22 -50 0 0Z" fill="${C.foxTail}"/><path d="M-6 -96Q0 -112 10 -96Q4 -80 -2 -80Z" fill="${C.foxTip}"/></g>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <g transform="translate(6 -34)">${tails}</g>
  <ellipse cx="0" cy="-40" rx="32" ry="44" fill="${C.fox}"/>
  <path d="M-22 -14h12v18h-12ZM10 -14h12v18H10Z" fill="${C.fox}"/><ellipse cx="-16" cy="4" rx="12" ry="5" fill="${C.foxTail}"/><ellipse cx="16" cy="4" rx="12" ry="5" fill="${C.foxTail}"/>
  <ellipse cx="0" cy="-48" rx="16" ry="24" fill="${C.cream}"/>
  <path d="M-18 -98 -30 -142 -2 -112ZM18 -98 30 -142 2 -112Z" fill="${C.fox}"/><path d="M-19 -108 -26 -132 -9 -114ZM19 -108 26 -132 9 -114Z" fill="${C.pinkSoft}"/>
  <circle cx="0" cy="-96" r="26" fill="${C.fox}"/><ellipse cx="0" cy="-82" rx="12" ry="8" fill="${C.cream}"/><circle cx="0" cy="-86" r="3" fill="${C.ink}"/>
  <circle cx="-10" cy="-100" r="3" fill="${C.ink}"/><circle cx="10" cy="-100" r="3" fill="${C.ink}"/>
</g></g>`;
};

// A carp seen from above, swimming upward. Centred on its own origin so the game can move it.
const carp = () => `<g class="carp">
  <path d="M-14 26Q0 14 14 26L22 52Q0 40 -22 52Z" fill="${C.carpDark}"/>
  <path d="M-20 -4Q-36 6 -30 24Q-18 14 -16 0ZM20 -4Q36 6 30 24Q18 14 16 0Z" fill="${C.carpDark}"/>
  <ellipse cx="0" cy="0" rx="20" ry="32" fill="${C.carp}"/>
  <path d="M-12 -4q6 6 12 0t12 0M-12 10q6 6 12 0t12 0M-8 24q4 5 8 0t8 0" stroke="${C.carpDark}" stroke-width="2" fill="none"/>
  <ellipse cx="0" cy="-18" rx="14" ry="10" fill="${C.cream}"/>
  <circle cx="-7" cy="-20" r="3.5" fill="${C.ink}"/><circle cx="7" cy="-20" r="3.5" fill="${C.ink}"/><path d="M-4 -10q4 3 8 0" stroke="${C.ink}" stroke-width="1.6" fill="none"/>
  <path d="M-12 -14q-10 2 -16 10M12 -14q10 2 16 10" stroke="${C.yellow}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M0 -32 -8 -44 0 -40 8 -44Z" fill="${C.yellow}"/>
</g>`;

// A long sea dragon facing right, centred on its origin so it can be flipped and flown around.
const dragon = () => `<g class="dragon">
  <path d="M-150 10l-30-26 8 26-8 26Z" fill="${C.dragonFin}"/>
  <path d="M-118 -14l8-22 8 20M-100 -10l8-22 8 20M40 -14l8-22 8 20M58 -10l8-22 8 20" fill="${C.dragonFin}"/>
  <path d="M-150 10Q-110 -40 -70 10T10 10T90 10" stroke="${C.dragon}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M-150 18Q-110 -32 -70 18T10 18T90 18" stroke="${C.cream}" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="10 9"/>
  <path d="M80 -14Q130 -24 150 2Q146 20 118 28L86 30Q70 22 80 -14Z" fill="${C.dragon}"/>
  <path d="M118 10Q134 6 150 2L148 20Q132 22 118 28Z" fill="${C.cream}"/>
  <path d="M96 -14l-6-26 16 14ZM112 -16l8-24 4 22Z" fill="${C.cream}"/>
  <circle cx="104" cy="0" r="5" fill="${C.cream}"/><circle cx="105" cy="0" r="2.5" fill="${C.ink}"/>
  <path d="M148 8q24 2 30 20M148 12q22 10 22 30" stroke="${C.yellow}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</g>`;

// The snow woman: a floating figure in a white kimono with long black hair. Local origin is under the hem.
const snowWoman = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="yuki">
  <path d="M-30 -190Q-48 -100 -40 -20L40 -20Q48 -100 30 -190Z" fill="${C.ink}"/>
  <path d="M-30 -150Q-48 -80 -60 0Q0 16 60 0Q48 -80 30 -150Z" fill="${C.snow}"/>
  <path d="M-8 -150Q-4 -80 -18 0" stroke="${C.ice}" stroke-width="3" fill="none"/>
  <path d="M-30 -150Q-70 -120 -74 -70Q-50 -74 -40 -110ZM30 -150Q70 -120 74 -70Q50 -74 40 -110Z" fill="${C.snow}"/>
  <path d="M-42 -96h84v16h-84Z" fill="${C.ice}"/>
  <path d="M-26 -160Q-34 -90 -28 -40L-16 -40Q-16 -110 -12 -160ZM26 -160Q34 -90 28 -40L16 -40Q16 -110 12 -160Z" fill="${C.ink}"/>
  <circle cx="0" cy="-176" r="24" fill="#f8f4ec"/>
  <path d="M-26 -178Q-24 -214 0 -212Q24 -214 26 -178Q14 -196 0 -194Q-14 -196 -26 -178Z" fill="${C.ink}"/>
  <path d="M-12 -178q4-4 8 0M4 -178q4-4 8 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="0" cy="-166" r="2.5" fill="#b76e55"/>
  <path d="M-54 -8Q0 30 54 -8" stroke="${C.ice}" stroke-width="4" fill="none" opacity=".7"/>
</g></g>`;

// The thunder god on his dark cloud, with a ring of drums behind him. Local origin is the cloud's centre.
const raijin = (x, y, s) => {
  const drums = [180, 135, 90, 45, 0].map(a => { const r = 86, cx = Math.round(Math.cos(a * Math.PI / 180) * r), cy = Math.round(-70 - Math.sin(a * Math.PI / 180) * r); return `<g class="drum"><circle cx="${cx}" cy="${cy}" r="17" fill="${C.woodDark}"/><circle cx="${cx}" cy="${cy}" r="12" fill="${C.cream}"/><circle cx="${cx - 3}" cy="${cy - 3}" r="2.2" fill="${C.ink}"/><circle cx="${cx + 4}" cy="${cy - 1}" r="2.2" fill="${C.ink}"/><circle cx="${cx - 1}" cy="${cy + 4}" r="2.2" fill="${C.ink}"/><circle class="drum-glow" cx="${cx}" cy="${cy}" r="22" fill="${C.yellow}" opacity="0"/></g>`; }).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="storm">
  ${drums}
  <path d="M-90 10Q-100 -30 -60 -28Q-50 -60 -10 -46Q20 -70 50 -40Q92 -44 90 -4Q110 20 70 26L-70 26Q-110 24 -90 10Z" fill="${C.storm}"/>
  <path d="M-24 -70 -56 -112M24 -70 56 -112" stroke="${C.raijin}" stroke-width="14" stroke-linecap="round"/><path d="M-56 -112l-10-26M56 -112l10-26" stroke="${C.cream}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="0" cy="-54" rx="30" ry="34" fill="${C.raijin}"/><path d="M-24 -30h48l-8 30h-32Z" fill="${C.cream}"/>
  <path d="M-20 -108 -30 -140 -12 -118 -6 -148 4 -118 14 -148 18 -114 30 -138 20 -104Z" fill="${C.cream}"/>
  <circle cx="0" cy="-98" r="20" fill="${C.raijin}"/><path d="M-14 -112l-6-16 10 8ZM14 -112l6-16-10 8Z" fill="${C.cream}"/>
  <circle cx="-7" cy="-100" r="3" fill="${C.ink}"/><circle cx="7" cy="-100" r="3" fill="${C.ink}"/><path d="M-8 -90q8 7 16 0" stroke="${C.ink}" stroke-width="2" fill="none"/>
  <path class="bolt" d="M20 26l-14 30 16-6-18 40" stroke="${C.yellow}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity="0"/>
</g></g>`;
};

const gate = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-72 -12Q0 -24 72 -12L78 -30Q0 -42 -78 -30Z" fill="#8f8a84"/><path d="M-60 -12h120v10h-120Z" fill="#8f8a84"/><path d="M-60 -2h18v82h-18ZM42 -2h18v82H42Z" fill="#9b9690"/><path d="M-60 -2h18v8h-18ZM42 -2h18v8H42Z" fill="#7a7570"/></g>`;
const flame = (x, y, s, d = 0) => `<path class="m-float" style="--d:${d}s" d="M${x} ${y}q${-14 * s} ${-20 * s} 0 ${-42 * s}q${14 * s} ${22 * s} 0 ${42 * s}Z" fill="#c9d7b0" opacity=".85"/>`;
const sparkle = (x, y, s, d = 0) => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="#a28056" transform="translate(${-3 * s} ${7 * s})"/>`;
const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;

// The hero: a mountain valley with the Dragon Gate waterfall, the carp in the pool, the fox on the bank,
// snowy peaks and the thunder god in the sky. Game geometry: falls x 300–420, pool from y 600, gate at y 150.
function valley(id) {
  const p = `${slug}-${id}`;
  const foam = [[318, 160], [372, 210], [402, 290], [330, 330], [386, 430], [348, 520], [410, 560]].map(([x, y]) => `<ellipse class="foam" cx="${x}" cy="${y}" rx="5" ry="26" fill="${C.snow}" opacity=".45"/>`).join('');
  const flakes = [[70, 60], [120, 40], [170, 90], [100, 130], [200, 60], [60, 160]].map(([x, y]) => `<circle class="flake" cx="${x}" cy="${y}" r="2.6" fill="${C.snow}" opacity=".6"/>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een bergdal met een hoge waterval en de stenen Drakenpoort, een karper in de poel, een vos met negen staarten op de oever, besneeuwde toppen en een dondergod op een donkere wolk">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#cdd7c6"/><stop offset="1" stop-color="#eef0e0"/></linearGradient><linearGradient id="${p}-falls" x2="0" y2="1"><stop stop-color="#a3c0b4"/><stop offset="1" stop-color="#6b9684"/></linearGradient><clipPath id="${p}-fallsclip"><path d="M300 100H420V612H300Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle cx="130" cy="110" r="30" fill="#f7e3a8" opacity=".8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".65"><ellipse cx="250" cy="96" rx="80" ry="11"/><ellipse cx="420" cy="60" rx="60" ry="9"/><ellipse cx="640" cy="250" rx="70" ry="10"/></g>
  <g class="layer" style="--i:0"><path d="M0 190 60 90 110 130 170 40 240 110 300 190Z" fill="#b9c9bd"/><path d="M170 40l-20 40 14-6 10 14 14-18 12 10Z" fill="${C.snow}"/><path d="M60 90l-14 28 10-4 8 10 10-12 8 6Z" fill="${C.snow}"/>
  <path d="M420 190 480 100 530 130 600 50 670 120 720 90V190Z" fill="#b9c9bd"/><path d="M600 50l-20 36 14-6 10 14 14-18 12 10Z" fill="${C.snow}"/>${flakes}</g>
  ${raijin(500, 104, .55)}
  <g class="layer" style="--i:1"><path d="M0 180H300V612H0Z" fill="${C.cliff}"/><path d="M420 180H720V612H420Z" fill="${C.cliff}"/>
  <path d="M0 160H300V184H0ZM420 160H720V184H420Z" fill="${C.rock}"/><g fill="${C.rock}"><path d="M0 300h210v14H0ZM60 420h240v14H60ZM0 520h150v14H0ZM420 260h200v14H420ZM480 380h240v14H480ZM420 500h260v14H420Z"/></g>
  <g fill="#8fa27a"><path d="M40 184h60v26H40ZM210 300h50v22h-50ZM620 184h70v26h-70ZM420 380h50v22h-50Z"/></g></g>
  <path d="M300 100H420V612H300Z" fill="url(#${p}-falls)"/>
  <g clip-path="url(#${p}-fallsclip)">${foam}<path d="M312 120v480M340 110v500M368 104v510M396 112v496" stroke="${C.snow}" stroke-width="2" opacity=".25"/></g>
  <g class="rocks"><ellipse class="rock" cx="326" cy="470" rx="30" ry="16" fill="${C.rock}"/><ellipse class="rock" cx="396" cy="360" rx="30" ry="16" fill="${C.rock}"/><ellipse class="rock" cx="342" cy="250" rx="26" ry="14" fill="${C.rock}"/>
  <path d="M300 458q26-14 52 0M370 348q26-14 52 0M320 240q22-12 44 0" stroke="${C.snow}" stroke-width="4" fill="none" opacity=".6"/></g>
  <ellipse class="surge" cx="360" cy="310" rx="40" ry="9" fill="${C.snow}" opacity=".85"/>
  ${gate(360, 100, 1)}
  <g class="mist" fill="${C.snow}" opacity=".5"><ellipse cx="330" cy="172" rx="40" ry="8"/><ellipse cx="400" cy="178" rx="36" ry="7"/></g>
  <circle class="flash" cx="360" cy="140" r="70" fill="#fffbe0" opacity="0"/>
  <g transform="translate(360 130)"><g class="dragon-pos"><g class="dragon-wrap" opacity="0">${dragon()}</g></g></g>
  <path d="M0 600H720V760H0Z" fill="${C.water}"/>
  <g stroke="#9cc0b0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"><path d="M440 650q20-8 40 0t40 0M90 700q20-8 40 0t40 0M520 720q20-8 40 0t40 0"/></g>
  <g class="mist" fill="${C.snow}" opacity=".55"><ellipse cx="330" cy="610" rx="56" ry="12"/><ellipse cx="400" cy="616" rx="46" ry="10"/></g>
  <ellipse class="splash" cx="360" cy="612" rx="30" ry="8" fill="${C.snow}" opacity="0"/>
  <g transform="translate(360 662)"><g class="carp-pos">${carp()}</g></g>
  <g class="layer" style="--i:2"><path d="M0 640Q120 596 250 632Q292 646 300 700V760H0Z" fill="${C.grass}"/><path d="M0 668Q110 636 230 664" stroke="#6b8f63" stroke-width="6" fill="none"/>
  ${fox(95, 652, .75)}
  <ellipse cx="650" cy="704" rx="86" ry="26" fill="#8a9a7a"/><ellipse cx="690" cy="730" rx="50" ry="18" fill="#7c8f6a"/></g>
  <g class="game-hint" opacity="0"><rect x="180" y="560" width="400" height="34" rx="17" fill="#f9f7e5" opacity=".94"/>
  <text class="hint-start" x="380" y="582" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#284f3d">Klik op de waterval en spring met de spatiebalk</text>
  <text class="hint-keys" x="380" y="582" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#284f3d" opacity="0">← → sturen · spatie springen · Esc stoppen</text>
  <text class="hint-again" x="380" y="582" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#284f3d" opacity="0">Gelukt, een draak! Nog een keer? Druk op spatie</text></g>
  </svg>`;
}

// Chapter 2: the nine-tailed fox at a forest shrine, with fox-fire floating around it.
function shrine() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een vos met negen staarten zit voor een rode torii-poort in een bos, omringd door zwevende vossenvuurtjes">
  ${backdrop('#e3e4d0', '#eeeedf')}
  <g fill="#35604a"><path d="M60 460 110 300 160 460ZM590 470 640 320 690 470ZM10 480 50 360 90 480Z"/></g><g fill="#4a7a5e"><path d="M60 460 110 360 160 460ZM590 470 640 380 690 470Z"/></g>
  <path d="M0 460Q180 430 360 456T720 450V650H0Z" fill="${C.grass}"/><path d="M0 500Q200 470 400 496T720 486" stroke="#6b8f63" stroke-width="5" fill="none"/>
  <path d="M222 150Q360 136 498 150L506 168Q360 154 214 168Z" fill="#b76e55"/><path d="M240 194h240v12H240Z" fill="#b76e55"/><path d="M252 162h16v300h-16ZM452 162h16v300h-16Z" fill="#b76e55"/><path d="M346 168h28v26h-28Z" fill="#8c5a3c"/>
  ${flame(200, 300, 1, 0)}${flame(520, 280, 1.1, -2.5)}${flame(160, 390, .8, -4)}${flame(560, 380, .9, -1.2)}${flame(300, 240, .7, -3.4)}
  <g opacity=".22">${fox(590, 462, .7, 'fox-shadow')}</g>
  ${fox(360, 470, 1.25)}
  ${sparkle(250, 230, 1)}${sparkle(470, 250, .8, -1.6)}
  </svg>`;
}

// Chapter 3: the carp mid-leap in the waterfall below the Dragon Gate, with a dragon waiting in the clouds.
function dragonGate() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een karper springt omhoog in een waterval onder een stenen poort, terwijl in de wolken erboven een draak zichtbaar is">
  ${backdrop('#dfe3d2', '#edeedf')}
  <g class="m-drift" fill="#f8f4e2" opacity=".8"><ellipse cx="200" cy="90" rx="90" ry="14"/><ellipse cx="520" cy="120" rx="110" ry="16"/><ellipse cx="420" cy="70" rx="70" ry="12"/></g>
  <g opacity=".38" transform="translate(470 110) scale(.8)">${dragon()}</g>
  <path d="M0 230H260V520H0Z" fill="${C.cliff}"/><path d="M460 230H720V520H460Z" fill="${C.cliff}"/><g fill="${C.rock}"><path d="M0 214H260V238H0ZM460 214H720V238H460ZM0 340h180v14H0ZM520 380h200v14H520Z"/></g>
  <path d="M260 200H460V530H260Z" fill="#86aa9c"/><path d="M280 220v300M330 212v310M390 216v306M440 222v300" stroke="${C.snow}" stroke-width="3" opacity=".35"/>
  <g class="m-steam" fill="${C.snow}" opacity=".5"><ellipse cx="300" cy="256" rx="40" ry="8"/><ellipse cx="420" cy="262" rx="34" ry="7"/></g>
  ${gate(360, 160, 1.3)}
  <ellipse cx="300" cy="420" rx="34" ry="18" fill="${C.rock}"/><ellipse cx="420" cy="330" rx="30" ry="16" fill="${C.rock}"/>
  <path d="M0 520H720V650H0Z" fill="${C.water}"/><g stroke="#9cc0b0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"><path d="M80 580q20-8 40 0t40 0M560 600q20-8 40 0t40 0"/></g>
  <g class="m-steam" style="--d:-2s" fill="${C.snow}" opacity=".6"><ellipse cx="320" cy="528" rx="70" ry="14"/><ellipse cx="420" cy="534" rx="50" ry="11"/></g>
  <g class="m-bob"><g transform="translate(360 400) rotate(-18) scale(1.6)">${carp()}</g></g>
  <g fill="${C.snow}" opacity=".8"><circle cx="300" cy="470" r="5"/><circle cx="330" cy="500" r="4"/><circle cx="410" cy="480" r="5"/><circle cx="430" cy="455" r="3"/></g>
  ${sparkle(300, 300, .9)}${sparkle(440, 280, .7, -1.4)}
  </svg>`;
}

// Chapter 4: the snow woman floating over a mountain slope in a snowstorm, with a traveller and lantern.
function snowstorm() {
  const flakes = Array.from({ length: 16 }, (_, i) => `<circle class="m-float" style="--d:${-(i % 8) * .9}s" cx="${40 + i * 42 + (i % 3) * 7}" cy="${80 + (i * 61) % 380}" r="${2 + (i % 3)}" fill="${C.snow}" opacity=".85"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een vrouw in een witte kimono met lang zwart haar zweeft boven een besneeuwde berghelling in een sneeuwstorm, terwijl een reiziger met een strohoed en een lantaarn omhoogkijkt">
  <rect width="720" height="650" fill="#c5d3d8"/><circle cx="360" cy="315" r="223" fill="#d6e0e2"/><g fill="none" stroke="#a9bcc2" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <path d="M0 440 160 300 300 400 480 260 720 420V650H0Z" fill="#e3e9e9"/><path d="M0 500 200 400 360 470 560 380 720 480V650H0Z" fill="${C.snow}"/>
  <g fill="#4a6b5a"><path d="M90 470 120 380 150 470ZM600 500 640 400 680 500ZM40 520 60 460 80 520Z"/></g><g fill="${C.snow}"><path d="M110 410l10-30 10 30ZM628 436l12-36 12 36Z"/></g>
  <g class="m-sway"><path d="M60 200q60-30 120 0t120 0M420 160q60-30 120 0t120 0" stroke="#eef3f3" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></g>
  ${flakes}
  <g class="m-float" style="--d:-3s">${snowWoman(300, 440, 1.1)}</g>
  <g transform="translate(540 540)"><path d="M-22 0h44l-6-80h-32Z" fill="#5f7f9b"/><path d="M-10 0h8v26h-8ZM2 0h8v26H2Z" fill="${C.ink}"/><circle cx="0" cy="-94" r="14" fill="#e3b9a0"/><path d="M-34 -100Q0 -124 34 -100L30 -92H-30Z" fill="${C.foxTip}"/>
  <path d="M22 -60l30-30" stroke="${C.woodDark}" stroke-width="4" stroke-linecap="round"/><path d="M48 -94h16v22H48Z" fill="#b76e55"/><circle class="m-twinkle" cx="56" cy="-83" r="12" fill="#f7e3a8" opacity=".7"/><circle cx="56" cy="-83" r="5" fill="#f7e3a8"/></g>
  </svg>`;
}

// Chapter 5: the thunder god drumming on his storm cloud, with lightning, rain and a small cloud rider in the distance.
function thunderstorm() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gespierde dondergod met wit haar en hoorns staat op een donkere wolk met een ring van trommels om zich heen; bliksem en regen vallen op de heuvels">
  ${backdrop('#cfd3c0', '#dcdfd0')}
  <g stroke="#b9c2c8" stroke-width="2" opacity=".55" stroke-linecap="round"><path d="M120 400l-10 40M200 440l-10 40M560 420l-10 40M640 380l-10 40M300 520l-10 40M460 540l-10 40M100 520l-10 40M620 520l-10 40"/></g>
  <path class="m-twinkle" d="M150 330l-26 60 30-10-34 80" stroke="${C.yellow}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path class="m-twinkle" style="--d:-1.7s" d="M590 330l-20 50 26-8-30 70" stroke="${C.yellow}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  ${raijin(360, 330, 1.5)}
  <g class="m-drift"><ellipse cx="140" cy="250" rx="60" ry="18" fill="#a9b3bd"/><ellipse cx="110" cy="240" rx="30" ry="18" fill="#a9b3bd"/><circle cx="140" cy="208" r="14" fill="${C.dragon}"/><ellipse cx="140" cy="232" rx="16" ry="12" fill="${C.dragon}"/><path d="M156 236q30-10 24 26" stroke="${C.dragon}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="135" cy="206" r="2" fill="${C.cream}"/><circle cx="145" cy="206" r="2" fill="${C.cream}"/></g>
  <path d="M0 580Q140 520 300 560T720 540V650H0Z" fill="${C.grass}"/><path d="M0 610Q160 570 340 598T720 580V650H0Z" fill="#6b8f63"/>
  </svg>`;
}

// Completion: an unrolled picture scroll showing the four legends side by side.
function scroll() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een uitgerolde Japanse prentenrol met daarop de vos met negen staarten, de karper en de draak, de sneeuwvrouw en de dondergod, met een hart erboven">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <g class="m-bob"><path d="M360 160c-14-26-54-24-54 8c0 26 34 46 54 64c20-18 54-38 54-64c0-32-40-34-54-8Z" fill="#b76e55"/></g>
  ${sparkle(250, 130, 1)}${sparkle(470, 150, .8, -1.2)}${sparkle(130, 300, .7, -2.2)}${sparkle(600, 280, .9, -.8)}
  <rect x="110" y="236" width="500" height="250" fill="#f8f1dc"/><path d="M110 236h500M110 486h500" stroke="#d9c7a0" stroke-width="3"/>
  <rect x="86" y="214" width="34" height="294" rx="10" fill="#c9a27a"/><rect x="600" y="214" width="34" height="294" rx="10" fill="#c9a27a"/><g fill="#8c6a4c"><circle cx="103" cy="214" r="9"/><circle cx="103" cy="508" r="9"/><circle cx="617" cy="214" r="9"/><circle cx="617" cy="508" r="9"/></g>
  <path d="M130 470Q360 456 590 470" stroke="#d9c7a0" stroke-width="2" fill="none"/>
  ${fox(185, 452, .6)}
  <g transform="translate(300 436) scale(.9)">${carp()}</g>
  <g transform="translate(380 300) scale(.45)">${dragon()}</g>
  <g class="m-float" style="--d:-2s">${snowWoman(432, 462, .5)}</g>
  ${raijin(556, 436, .42)}
  </svg>`;
}

export const hero = id => valley(id);
export const chapter = i => i === 1 ? shrine() : i === 2 ? dragonGate() : i === 3 ? snowstorm() : thunderstorm();
export const completion = () => scroll();
export const card = () => valley('card');
