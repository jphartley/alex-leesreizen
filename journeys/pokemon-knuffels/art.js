// Pokémon-knuffels artwork: original SVG illustrations of four plush toys, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'pokemon-knuffels';

const C = { yellow: '#e8c65a', yellowDark: '#d4b04a', purple: '#7d6a9b', purpleDark: '#6a5886', pink: '#e39aa0', cream: '#f3ead0', fur: '#f1e3c6', furDark: '#e2cfa6', brown: '#9a7552', orange: '#d98b5a', orangeDark: '#c47a4a', ink: '#3b342e', wood: '#b98b62', woodDark: '#8c6a4c', woodLight: '#d8b58a' };

// A yellow mouse plush with long ears; `hat` adds the painter's grey felt hat. Local origin is between its feet.
const mouse = (x, y, s, { hat = false, cls = 'mouse' } = {}) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <path d="M40 -60l30-16-12-18 28-12-10-22" stroke="#c9a53d" stroke-width="13" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <ellipse cx="0" cy="-46" rx="50" ry="46" fill="${C.yellow}"/>
  <ellipse cx="-26" cy="-4" rx="18" ry="8" fill="${C.yellowDark}"/><ellipse cx="26" cy="-4" rx="18" ry="8" fill="${C.yellowDark}"/>
  <ellipse cx="-46" cy="-54" rx="14" ry="9" fill="${C.yellowDark}" transform="rotate(-25 -46 -54)"/><ellipse cx="46" cy="-54" rx="14" ry="9" fill="${C.yellowDark}" transform="rotate(25 46 -54)"/>
  <g class="ear"><path d="M-36 -126 -74 -200 -16 -146Z" fill="${C.yellow}"/><path d="M-58 -168 -74 -200 -46 -160Z" fill="${C.ink}"/></g>
  <g class="ear"><path d="M36 -126 74 -200 16 -146Z" fill="${C.yellow}"/><path d="M58 -168 74 -200 46 -160Z" fill="${C.ink}"/></g>
  <circle cx="0" cy="-108" r="46" fill="${C.yellow}"/>
  <circle cx="-32" cy="-98" r="9" fill="${C.orange}"/><circle cx="32" cy="-98" r="9" fill="${C.orange}"/>
  <circle cx="-15" cy="-112" r="5" fill="${C.ink}"/><circle cx="15" cy="-112" r="5" fill="${C.ink}"/>
  <circle cx="-13" cy="-114" r="1.6" fill="#fff"/><circle cx="17" cy="-114" r="1.6" fill="#fff"/>
  <path d="M-8 -94q8 6 16 0" stroke="${C.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  ${hat ? `<g class="hat"><path d="M-60 -146Q0 -160 60 -146Q62 -136 52 -136Q0 -146 -52 -136Q-62 -136 -60 -146Z" fill="#8f8a84"/><path d="M-36 -146Q-34 -200 0 -202Q34 -200 36 -146Z" fill="#9b9690"/><path d="M-35 -158h70" stroke="#6f6a64" stroke-width="5"/></g>` : ''}
</g></g>`;

// A round purple ghost plush with a wide grin, or with its mouth wide open for the tongue bed. Local origin is its centre.
const ghost = (x, y, s, { mouth = 'grin', cls = 'ghost' } = {}) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <path d="M-40 -50 -56 -84 -22 -60ZM-8 -62 -2 -98 14 -60ZM34 -54 58 -80 44 -42ZM-62 -14 -92 -34 -60 6ZM62 -14 92 -34 60 6Z" fill="${C.purple}"/>
  <path d="M-66 8Q-66 -58 0 -62Q66 -58 66 8Q66 60 0 64Q-66 60 -66 8Z" fill="${C.purple}"/>
  <ellipse cx="-58" cy="36" rx="16" ry="10" fill="${C.purpleDark}" transform="rotate(20 -58 36)"/><ellipse cx="58" cy="36" rx="16" ry="10" fill="${C.purpleDark}" transform="rotate(-20 58 36)"/>
  <ellipse cx="-26" cy="64" rx="18" ry="8" fill="${C.purpleDark}"/><ellipse cx="26" cy="64" rx="18" ry="8" fill="${C.purpleDark}"/>
  <path d="M-40 -20 -10 -8 -36 0ZM40 -20 10 -8 36 0Z" fill="${C.cream}"/><circle cx="-26" cy="-10" r="4" fill="${C.ink}"/><circle cx="26" cy="-10" r="4" fill="${C.ink}"/>
  ${mouth === 'open'
    ? `<ellipse cx="0" cy="26" rx="40" ry="24" fill="${C.ink}"/><path d="M-34 14l6 10 6-10 6 10 6-10 6 10 6-10 6 10 6-10 6 10 6-10" fill="none" stroke="${C.cream}" stroke-width="3" stroke-linejoin="round" opacity=".9"/>`
    : `<path d="M-46 12Q0 56 46 12Q0 32 -46 12Z" fill="${C.ink}"/><path d="M-38 16l5 8 5-8 5 8 5-8 5 8 5-8 5 8 5-8 5 8 5-8 5 8 5-8 5 8 5-8 5 8" fill="none" stroke="${C.cream}" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/>`}
</g></g>`;

// A long ferret-like plush lying down: head on the left, striped body stretching `len` to the right. Local origin is the body's centre line at the head end.
const ferret = (x, y, s, len, cls = 'ferret') => {
  const rings = [];
  for (let rx = 70; rx + 28 <= len - 50; rx += 60) rings.push(`<rect x="${rx}" y="-30" width="28" height="60" fill="${C.brown}"/>`);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <rect x="0" y="-30" width="${len}" height="60" rx="30" fill="${C.fur}"/>${rings.join('')}
  <ellipse cx="${len - 70}" cy="30" rx="16" ry="8" fill="${C.furDark}"/><ellipse cx="74" cy="30" rx="16" ry="8" fill="${C.furDark}"/><ellipse cx="34" cy="28" rx="16" ry="8" fill="${C.furDark}"/>
  <circle cx="-16" cy="-40" r="12" fill="${C.fur}"/><circle cx="28" cy="-46" r="12" fill="${C.fur}"/><circle cx="-16" cy="-40" r="6" fill="${C.pink}"/><circle cx="28" cy="-46" r="6" fill="${C.pink}"/>
  <circle cx="6" cy="-14" r="40" fill="${C.fur}"/>
  <path d="M-12 -50q18-10 36 0v14q-18-8-36 0Z" fill="${C.brown}"/>
  <circle cx="-10" cy="-18" r="4.5" fill="${C.ink}"/><circle cx="22" cy="-18" r="4.5" fill="${C.ink}"/>
  <ellipse cx="6" cy="0" rx="7" ry="5" fill="${C.pink}"/><path d="M-2 8q8 6 16 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
</g></g>`;
};

// The same plush standing upright, `len` tall from the ground to the top of its body. Local origin is between its feet.
const ferretUpright = (x, y, s, len, cls = 'ferret-up') => {
  const rings = [];
  for (let ry = -len + 100; ry + 28 <= -50; ry += 60) rings.push(`<rect x="-30" y="${ry}" width="60" height="28" fill="${C.brown}"/>`);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <path d="M20 -24Q96 -8 84 -78" stroke="${C.fur}" stroke-width="24" fill="none" stroke-linecap="round"/><path d="M58 -22q14-6 26-14" stroke="${C.brown}" stroke-width="10" fill="none"/>
  <rect x="-30" y="${-len}" width="60" height="${len}" rx="30" fill="${C.fur}"/>${rings.join('')}
  <ellipse cx="-18" cy="0" rx="16" ry="7" fill="${C.furDark}"/><ellipse cx="18" cy="0" rx="16" ry="7" fill="${C.furDark}"/>
  <ellipse cx="-34" cy="${-len + 120}" rx="9" ry="14" fill="${C.furDark}"/><ellipse cx="34" cy="${-len + 120}" rx="9" ry="14" fill="${C.furDark}"/>
  <circle cx="-26" cy="${-len - 24}" r="12" fill="${C.fur}"/><circle cx="26" cy="${-len - 24}" r="12" fill="${C.fur}"/><circle cx="-26" cy="${-len - 24}" r="6" fill="${C.pink}"/><circle cx="26" cy="${-len - 24}" r="6" fill="${C.pink}"/>
  <circle cx="0" cy="${-len + 2}" r="40" fill="${C.fur}"/>
  <path d="M-18 ${-len - 34}q18-10 36 0v14q-18-8-36 0Z" fill="${C.brown}"/>
  <circle cx="-14" cy="${-len}" r="4.5" fill="${C.ink}"/><circle cx="14" cy="${-len}" r="4.5" fill="${C.ink}"/>
  <ellipse cx="0" cy="${-len + 16}" rx="7" ry="5" fill="${C.pink}"/><path d="M-8 ${-len + 24}q8 6 16 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
</g></g>`;
};

// A fluffy orange dog plush with dark stripes and a cream mane, sitting and looking left. Local origin is under its paws.
const dog = (x, y, s, cls = 'dog') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
  <g class="dog-tail"><path d="M50 -70Q120 -120 100 -36Q96 -66 62 -52Z" fill="${C.cream}"/><circle cx="92" cy="-98" r="16" fill="${C.cream}"/><circle cx="106" cy="-74" r="14" fill="${C.cream}"/></g>
  <ellipse cx="0" cy="-46" rx="62" ry="42" fill="${C.orange}"/>
  <path d="M-16 -84q8 14 0 30M10 -86q8 14 0 32M36 -78q8 12 0 26" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <rect x="-54" y="-36" width="22" height="38" rx="10" fill="${C.orange}"/><rect x="-22" y="-32" width="22" height="34" rx="10" fill="${C.orangeDark}"/><rect x="26" y="-36" width="22" height="38" rx="10" fill="${C.orange}"/><rect x="52" y="-32" width="18" height="34" rx="9" fill="${C.orangeDark}"/>
  <ellipse cx="-43" cy="0" rx="14" ry="6" fill="${C.cream}"/><ellipse cx="37" cy="0" rx="14" ry="6" fill="${C.cream}"/>
  <circle cx="-6" cy="-98" r="24" fill="${C.cream}"/><circle cx="-14" cy="-128" r="20" fill="${C.cream}"/><circle cx="-22" cy="-70" r="22" fill="${C.cream}"/><circle cx="-66" cy="-72" r="16" fill="${C.cream}"/>
  <path d="M-64 -130 -60 -168 -38 -136ZM-28 -136 -14 -170 -6 -132Z" fill="${C.orange}"/>
  <circle cx="-40" cy="-104" r="36" fill="${C.orange}"/>
  <path d="M-50 -138q6 10 0 20M-30 -140q6 10 0 20" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="-66" cy="-92" rx="20" ry="14" fill="${C.cream}"/><circle cx="-80" cy="-98" r="6" fill="${C.ink}"/>
  <circle cx="-50" cy="-112" r="7" fill="#6b4a2e"/><circle cx="-50" cy="-112" r="3.5" fill="${C.ink}"/><circle cx="-53" cy="-115" r="2" fill="#fff"/>
  <circle cx="-28" cy="-112" r="7" fill="#6b4a2e"/><circle cx="-28" cy="-112" r="3.5" fill="${C.ink}"/><circle cx="-31" cy="-115" r="2" fill="#fff"/>
</g></g>`;

const backdrop = (bg, inner) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${inner}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;
const sparkle = (x, y, s, d = 0) => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y - 10 * s} ${3 * s}-${10 * s} ${3 * s} ${10 * s} ${10 * s} ${3 * s}-${10 * s} ${3 * s}-${3 * s} ${10 * s}-${3 * s}-${10 * s}-${10 * s}-${3 * s}Z" fill="#a28056" transform="translate(${-3 * s} ${7 * s})"/>`;

// The hero: a child's room with string lights, a window and two shelves of plush toys.
function room(id) {
  const p = `${slug}-${id}`;
  const bulbs = Array.from({ length: 9 }, (_, i) => { const t = (i + .5) / 9, x = Math.round(720 * t), y = Math.round(26 + 150 * t * (1 - t)); return `<path d="M${x} ${y}v10" stroke="#6b5b43" stroke-width="2"/><circle class="bulb" cx="${x}" cy="${y + 17}" r="7" fill="${[C.yellow, C.pink, '#9cac66'][i % 3]}"/>`; }).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een kinderkamer met lichtjes, een raam en twee planken vol knuffels: een gele muis met een grijze hoed, een paars spook, een lange fret en een oranje hond">
  <defs><linearGradient id="${p}-wall" x2="0" y2="1"><stop stop-color="#f1ead2"/><stop offset="1" stop-color="#e6d8c0"/></linearGradient></defs>
  <path fill="url(#${p}-wall)" d="M0 0H720V760H0Z"/>
  <g class="layer" style="--i:0">
  <rect x="70" y="90" width="230" height="220" rx="6" fill="#d6dcc4"/>
  <circle class="sun-glow" cx="160" cy="160" r="36" fill="#f7e3a8" opacity=".4"/><circle cx="160" cy="160" r="36" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".7"><ellipse cx="230" cy="140" rx="46" ry="9"/><ellipse cx="120" cy="230" rx="40" ry="8"/></g>
  <path d="M70 310Q140 262 210 290T300 272V310Z" fill="#a9bea6"/>
  <path d="M185 90V310M70 200H300" stroke="${C.cream}" stroke-width="10"/><rect x="63" y="83" width="244" height="234" rx="8" fill="none" stroke="${C.cream}" stroke-width="14"/>
  <rect x="50" y="312" width="270" height="14" rx="3" fill="${C.cream}"/>
  <path d="M40 66H380" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/>
  <g class="curtain-sway"><path class="curtain" d="M300 68Q336 190 300 324L364 324Q352 190 362 68Z" fill="#c9d7b0"/></g>
  <g class="motes" fill="#fffbe0"><circle class="mote" cx="330" cy="150" r="2.5"/><circle class="mote" cx="352" cy="214" r="2"/><circle class="mote" cx="318" cy="258" r="2.2"/><circle class="mote" cx="372" cy="120" r="1.8"/></g>
  <g transform="translate(530 112)"><rect width="110" height="86" rx="4" fill="${C.wood}"/><rect x="9" y="9" width="92" height="68" fill="#f6ebd4"/><path d="M9 77Q40 40 70 60T101 50V77Z" fill="#9cac66"/><circle cx="36" cy="30" r="9" fill="${C.yellow}"/></g>
  </g>
  <g class="lights"><path d="M0 26Q360 101 720 26" stroke="#6b5b43" stroke-width="2" fill="none"/>${bulbs}</g>
  <g class="layer" style="--i:1">
  <rect x="340" y="376" width="340" height="16" rx="3" fill="${C.wood}"/><path d="M360 392l-14 24M660 392l14 24" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/>
  ${mouse(430, 376, .72, { hat: true })}<g class="ghost-lift">${ghost(596, 316, .62)}</g>
  </g>
  <g class="layer" style="--i:2">
  <rect x="60" y="560" width="620" height="16" rx="3" fill="${C.wood}"/><path d="M90 576l-14 24M360 576v24M650 576l14 24" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/>
  ${ferret(110, 536, .8, 420)}${dog(600, 560, .72)}
  </g>
  <g class="layer" style="--i:3"><path d="M0 640H720V760H0Z" fill="${C.woodLight}"/><path d="M0 640H720" stroke="#c9a27a" stroke-width="6"/>
  <ellipse cx="360" cy="712" rx="270" ry="40" fill="#517c67"/><ellipse cx="360" cy="712" rx="200" ry="26" fill="#6b8f63"/>
  <circle cx="150" cy="676" r="22" fill="${C.yellow}"/><path d="M128 676h44" stroke="#c9a53d" stroke-width="5"/>
  <g transform="translate(600 650)"><rect width="70" height="24" rx="3" fill="#b76e55"/><rect x="6" y="-20" width="58" height="22" rx="3" fill="#5f7f9b"/></g></g>
  </svg>`;
}

// Chapter 2: the hat-wearing mouse plush on a museum plinth, under a framed painting, with a sold-out sign.
function museum() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gele knuffel met een grijze vilten hoed staat op een sokkel in een museum, onder een schilderij van gele bloemen, met een bordje met de tekst uitverkocht">
  ${backdrop('#e2e4c8', '#ebecd9')}
  <g transform="translate(250 48)"><rect width="220" height="176" rx="4" fill="${C.wood}"/><rect x="14" y="14" width="192" height="148" fill="#f1dfb2"/>
  <path d="M86 118Q80 150 110 156Q140 150 134 118Q130 104 110 104Q90 104 86 118Z" fill="#c9a27a"/>
  <g fill="${C.yellow}"><circle cx="80" cy="74" r="18"/><circle cx="112" cy="54" r="20"/><circle cx="146" cy="76" r="17"/><circle cx="112" cy="92" r="15"/></g><g fill="#8c5a3c"><circle cx="80" cy="74" r="7"/><circle cx="112" cy="54" r="8"/><circle cx="146" cy="76" r="6"/><circle cx="112" cy="92" r="6"/></g>
  <path d="M92 104q10-8 20-8M118 100q8-4 20 2" stroke="#6f9463" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <rect x="70" y="330" width="150" height="10" rx="3" fill="${C.wood}"/><path d="M90 340l-10 18M200 340l10 18" stroke="${C.woodDark}" stroke-width="4" stroke-linecap="round"/>
  <g class="m-sway"><path d="M145 340v18" stroke="#8c7a5c" stroke-width="2"/><rect x="128" y="358" width="34" height="22" rx="4" fill="#f8f4e6" stroke="#b76e55" stroke-width="2"/><path d="M136 369h18" stroke="#b76e55" stroke-width="3"/></g>
  <path d="M290 420H430V570H290Z" fill="${C.cream}"/><path d="M282 412H438V424H282Z" fill="#e3d6bb"/><path d="M290 560H430V570H290Z" fill="#d9ccb0"/>
  ${mouse(360, 412, .82, { hat: true })}
  ${sparkle(305, 262, 1.2)}${sparkle(425, 290, .9, -1.4)}${sparkle(410, 240, .7, -2.6)}
  <g transform="translate(470 496) rotate(-4)"><rect width="118" height="56" rx="6" fill="#f8f4e6" stroke="#b76e55" stroke-width="3"/><text x="59" y="35" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#b76e55" letter-spacing="1">UITVERKOCHT</text></g>
  <path d="M160 480v100M560 480v100" stroke="#8c7a5c" stroke-width="8" stroke-linecap="round"/><circle cx="160" cy="476" r="9" fill="#c9a53d"/><circle cx="560" cy="476" r="9" fill="#c9a53d"/>
  <path d="M160 484Q360 560 560 484" stroke="#b76e55" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="360" cy="590" rx="250" ry="14" fill="#8c7a5c" opacity=".14"/>
  </svg>`;
}

// Chapter 3: the giant ghost plush as a bed, with its long tongue rolled out and a sleeper's head inside its mouth.
function tongueBed() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een enorme paarse spookknuffel met open bek, waaruit een lange roze pluchen tong als bed over de vloer rolt; iemand slaapt erop onder een groene deken">
  ${backdrop('#dcd8c8', '#cfd3c0')}
  <g class="m-float" fill="#f7e3a8"><path d="M600 110a44 44 0 1 0 30 76a34 34 0 1 1-30-76Z"/></g>
  ${sparkle(520, 90, .8)}${sparkle(660, 210, .7, -1.5)}${sparkle(80, 150, .9, -2.4)}
  <path d="M0 470H720V650H0Z" fill="#a9bea6"/><path d="M0 470H720" stroke="#97ad94" stroke-width="4"/>
  ${ghost(190, 400, 1.5, { mouth: 'open' })}
  <path class="tongue" d="M176 416Q200 470 260 468L612 468Q646 468 646 496Q646 524 612 524L260 524Q196 522 170 476Z" fill="${C.pink}"/>
  <path d="M250 496H600" stroke="#d58690" stroke-width="3" stroke-dasharray="10 12"/>
  <circle cx="646" cy="496" r="34" fill="${C.pink}"/><path d="M646 496m-22 0a22 22 0 1 1 22 22a14 14 0 1 1 14-14a7 7 0 1 1 7 7" stroke="#d58690" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M232 456Q226 440 244 440H520Q544 440 548 462L556 496H230Z" fill="#517c67"/><path d="M250 450H520" stroke="#6b8f63" stroke-width="3"/>
  <ellipse cx="562" cy="498" rx="16" ry="9" fill="#e3b9a0"/><ellipse cx="548" cy="500" rx="14" ry="8" fill="#e3b9a0"/>
  <circle cx="214" cy="446" r="22" fill="#e3b9a0"/><path d="M194 440Q200 418 222 424Q238 426 236 444Q226 436 212 438Q200 440 194 440Z" fill="#5a4332"/><path d="M212 450q6 3 12 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g class="m-float" style="--d:-1.4s" fill="#f8f4e6" font-family="sans-serif" font-weight="700"><text x="250" y="380" font-size="18">z</text><text x="268" y="360" font-size="24">z</text><text x="292" y="334" font-size="30">Z</text></g>
  </svg>`;
}

// Chapter 4: the life-size ferret plush beside a measuring stick, a child for scale and a huge shipping box.
function lifeSize() {
  const ticks = Array.from({ length: 19 }, (_, i) => { const y = 560 - i * 24.4; return `<path d="M112 ${y}h${i % 5 ? 8 : 16}" stroke="#8c7a5c" stroke-width="2"/>`; }).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een levensgrote fretachtige knuffel staat rechtop naast een meetlat van 1,80 meter; ernaast kijkt een kind omhoog en staat een grote verzenddoos">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <path d="M0 560H720V650H0Z" fill="${C.woodLight}"/><path d="M0 560H720" stroke="#c9a27a" stroke-width="5"/>
  <rect x="104" y="96" width="18" height="464" rx="3" fill="${C.cream}" stroke="#d9ccb0" stroke-width="2"/>${ticks}
  <text x="134" y="92" font-family="sans-serif" font-size="16" font-weight="700" fill="#284f3d">1,80 m</text><text x="134" y="322" font-family="sans-serif" font-size="14" fill="#517c67">1 m</text>
  <path d="M104 100H300" stroke="#284f3d" stroke-width="2" stroke-dasharray="4 6"/>
  ${ferretUpright(300, 560, 1, 400)}
  <g transform="translate(480 560)"><rect x="-16" y="-120" width="14" height="120" rx="6" fill="#5f7f9b"/><rect x="2" y="-120" width="14" height="120" rx="6" fill="#5f7f9b"/><ellipse cx="-9" cy="0" rx="12" ry="5" fill="${C.ink}"/><ellipse cx="9" cy="0" rx="12" ry="5" fill="${C.ink}"/>
  <rect x="-24" y="-250" width="48" height="136" rx="14" fill="#9cac66"/><rect x="-40" y="-244" width="14" height="80" rx="7" fill="#9cac66" transform="rotate(-30 -40 -244)"/><rect x="26" y="-244" width="14" height="80" rx="7" fill="#9cac66" transform="rotate(14 26 -244)"/>
  <circle cx="0" cy="-272" r="24" fill="#e3b9a0"/><path d="M-24 -278Q-16 -306 8 -300Q26 -296 24 -276Q12 -288 -4 -284Q-18 -282 -24 -278Z" fill="#5a4332"/><circle cx="-8" cy="-276" r="2.4" fill="${C.ink}"/><circle cx="8" cy="-276" r="2.4" fill="${C.ink}"/><path d="M-6 -266q6 5 12 0" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <g transform="translate(560 420)"><rect width="140" height="140" fill="#c9a27a"/><rect y="0" width="140" height="16" fill="#b98b62"/><path d="M62 0h16v140H62Z" fill="${C.cream}" opacity=".8"/><path d="M0 66h140v10H0Z" fill="${C.cream}" opacity=".8"/>
  <path d="M26 112v-26M20 92l6-6 6 6M44 112v-26M38 92l6-6 6 6" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="m-sway"><path d="M672 420v-30" stroke="#8c7a5c" stroke-width="2"/><g transform="translate(650 350)"><path d="M0 8Q0 0 8 0H40Q48 0 48 8V40L24 52L0 40Z" fill="#f8f4e6" stroke="#b76e55" stroke-width="2"/><text x="24" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#b76e55">€€€</text></g></g>
  ${sparkle(230, 120, 1, -.6)}${sparkle(380, 150, .8, -2)}
  </svg>`;
}

// Chapter 5: the handmade dog plush on an artist's work table, with thread, a needle, a roll of wire and a jar of glass eyes.
function atelier() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een pluizige oranje hondenknuffel met zwarte strepen zit op een werktafel tussen een klos garen, een naald, een rol ijzerdraad, een schaar en een potje glazen ogen">
  ${backdrop('#e3d9c4', '#f1e8d6')}
  <path d="M40 430H680V650H40Z" fill="${C.woodLight}"/><path d="M40 430H680" stroke="#c9a27a" stroke-width="6"/><g stroke="#cfae86" stroke-width="2" opacity=".6"><path d="M60 480H660M60 540H660M60 600H660"/></g>
  <g class="m-sway"><path d="M600 160v40" stroke="#8c7a5c" stroke-width="2"/><g transform="translate(576 200)"><path d="M0 8Q0 0 8 0H40Q48 0 48 8V40L24 52L0 40Z" fill="#f8f4e6" stroke="#b76e55" stroke-width="2"/><text x="24" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#b76e55">€€€</text></g></g>
  <g transform="translate(140 520)"><rect x="-22" y="-30" width="44" height="60" rx="4" fill="#b76e55"/><ellipse cx="0" cy="-30" rx="24" ry="8" fill="${C.cream}"/><ellipse cx="0" cy="30" rx="24" ry="8" fill="${C.cream}"/><path d="M-22 -16h44M-22 -4h44M-22 8h44M-22 20h44" stroke="#9e5a44" stroke-width="2"/></g>
  <path d="M162 500Q210 470 236 444" stroke="#b76e55" stroke-width="2" fill="none"/><path d="M236 444l24-32" stroke="#9b9690" stroke-width="4" stroke-linecap="round"/><circle cx="238" cy="442" r="4" fill="none" stroke="#9b9690" stroke-width="2"/>
  ${dog(340, 430, 1.1)}
  <g fill="${C.cream}"><ellipse cx="470" cy="470" rx="14" ry="6"/><ellipse cx="500" cy="456" rx="10" ry="5"/><ellipse cx="220" cy="478" rx="10" ry="5"/></g>
  <g transform="translate(560 520)"><circle r="38" fill="none" stroke="#8f8a84" stroke-width="12"/><circle r="38" fill="none" stroke="#b3aea8" stroke-width="3" stroke-dasharray="6 10"/><path d="M36 -12Q80 -40 110 -10" stroke="#8f8a84" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <g transform="translate(600 600) rotate(-20)" stroke="${C.ink}" stroke-width="3" fill="none"><circle cx="-26" cy="18" r="10"/><circle cx="26" cy="18" r="10"/><path d="M-20 10L30 -40M20 10L-30 -40" stroke="#9b9690" stroke-width="5" stroke-linecap="round"/></g>
  <g transform="translate(200 600)"><rect x="-30" y="-30" width="60" height="60" rx="8" fill="#f8f4e6" stroke="#d9ccb0" stroke-width="2"/><rect x="-22" y="-38" width="44" height="12" rx="3" fill="#9b9690"/>
  <g><circle cx="-12" cy="-4" r="8" fill="#6b4a2e"/><circle cx="-12" cy="-4" r="4" fill="${C.ink}"/><circle cx="12" cy="-2" r="8" fill="#6b4a2e"/><circle cx="12" cy="-2" r="4" fill="${C.ink}"/><circle cx="0" cy="14" r="8" fill="#4a6b5a"/><circle cx="0" cy="14" r="4" fill="${C.ink}"/></g></g>
  ${sparkle(280, 240, 1.1)}${sparkle(470, 280, .8, -1.8)}
  <circle class="m-twinkle" cx="282" cy="303" r="3" fill="#fff"/>
  </svg>`;
}

// Completion: all four plush toys together on the rug, with a heart and confetti.
function together() {
  const confetti = [[120, 150, C.yellow, 0], [600, 130, C.pink, -1], [180, 260, '#9cac66', -2], [560, 250, C.yellow, -3], [660, 330, C.purple, -1.6], [90, 360, C.pink, -2.6]].map(([x, y, c, d]) => `<rect class="m-float" style="--d:${d}s" x="${x}" y="${y}" width="12" height="18" rx="2" fill="${c}" transform="rotate(${(x + y) % 60 - 30} ${x} ${y})"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="De vier knuffels samen op een groen kleed: de lange fret, de gele muis met hoed, de oranje hond en het zwevende paarse spook, met een hart en confetti erboven">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <g class="m-bob"><path d="M360 206c-16-30-62-28-62 10c0 30 40 52 62 72c22-20 62-42 62-72c0-38-46-40-62-10Z" fill="#b76e55"/></g>
  ${confetti}${sparkle(300, 140, 1)}${sparkle(440, 170, .8, -1.2)}${sparkle(250, 330, .7, -2.2)}
  <ellipse cx="360" cy="520" rx="300" ry="50" fill="#517c67"/><ellipse cx="360" cy="520" rx="226" ry="32" fill="#6b8f63"/>
  ${ferret(60, 528, .55, 280)}${mouse(270, 520, .7, { hat: true })}${dog(460, 520, .7)}
  <g class="m-float" style="--d:-1s">${ghost(600, 380, .62)}</g>
  </svg>`;
}

export const hero = id => room(id);
export const chapter = i => i === 1 ? museum() : i === 2 ? tongueBed() : i === 3 ? lifeSize() : atelier();
export const completion = () => together();
export const card = () => room('card');
