// Bizarre pizza's artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'pizza';

// Spread n toppings evenly over a disc of radius R (golden-angle spiral), so pizzas look scattered but stay deterministic.
const spots = (n, R, off = 0) => Array.from({ length: n }, (_, i) => {
  const a = (i * 137.508 + off) * Math.PI / 180, d = R * Math.sqrt((i + .5) / n);
  return [+(d * Math.cos(a)).toFixed(1), +(d * Math.sin(a)).toFixed(1), i];
});
const scatter = (n, R, fn, off) => spots(n, R, off).map(([x, y, i]) => fn(x, y, i)).join('');

// Toppings, drawn around (x, y) in pizza coordinates.
const T = {
  cheese: (x, y, i) => `<ellipse cx="${x}" cy="${y}" rx="${16 + i % 3 * 4}" ry="11" fill="#f6e7b8" transform="rotate(${i * 47} ${x} ${y})"/>`,
  paneer: (x, y, i) => `<g transform="translate(${x} ${y}) rotate(${i * 37 % 90})"><rect x="-12" y="-10" width="24" height="22" rx="3" fill="#ddcba2"/><rect x="-12" y="-13" width="24" height="21" rx="3" fill="#f7f0dc"/></g>`,
  spinach: (x, y, i) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="7" fill="#4f7a4a" transform="rotate(${i * 53} ${x} ${y})"/>`,
  spice: (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="#b75f50"/>`,
  shrimp: (x, y, i) => `<g transform="translate(${x} ${y}) rotate(${i * 67})"><path d="M-13 0A13 13 0 1 1 9 9" stroke="#e8946e" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-14 -2l-10-7v14Z" fill="#e8946e"/><path d="M-3 -12l2 8M8 -7l-5 6" stroke="#f3c3a6" stroke-width="2"/></g>`,
  squid: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="10" fill="none" stroke="#f3ead0" stroke-width="6"/>`,
  corn: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="6" fill="#e8c24a"/>`,
  boba: (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#3e2f28"/><circle cx="${x - 3}" cy="${y - 3}" r="3" fill="#7a5e4c"/>`,
  leaf: (x, y, i) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="6" fill="#6f9463" transform="rotate(${i * 61} ${x} ${y})"/>`,
  bloodcake: (x, y, i) => `<g transform="translate(${x} ${y}) rotate(${i * 41})"><rect x="-15" y="-10" width="30" height="20" rx="4" fill="#4a2e2c"/><g fill="#7a5a4e"><circle cx="-7" cy="-3" r="2"/><circle cx="4" cy="3" r="2"/><circle cx="8" cy="-4" r="1.6"/><circle cx="-2" cy="5" r="1.6"/></g></g>`,
  egg: (x, y, i) => `<g transform="translate(${x} ${y}) rotate(${i * 33})"><ellipse rx="19" ry="14" fill="#7a5230"/><ellipse rx="16" ry="11" fill="#3b2a22"/><ellipse cx="2" rx="8" ry="6" fill="#5b6448"/></g>`,
  coriander: (x, y) => `<g fill="#7c9a5a"><circle cx="${x}" cy="${y}" r="5"/><circle cx="${x + 7}" cy="${y - 3}" r="4.5"/><circle cx="${x + 3}" cy="${y + 6}" r="4"/></g>`,
  durian: (x, y, i) => `<g transform="translate(${x} ${y}) rotate(${i * 29})"><path d="M-20 -6Q-18 -18 -2 -16Q16 -18 20 -4Q22 12 4 14Q-16 16 -20 -6Z" fill="#ecd27a"/><path d="M-10 -8Q0 -12 10 -6" stroke="#f7e8b0" stroke-width="4" fill="none" stroke-linecap="round"/></g>`,
  browned: (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#d9a05a" opacity=".7"/>`,
};

// A pizza centred on (0, 0): crust, sauce, then toppings.
const pizza = (r, sauce, toppings, { crust = '#d8a86a', rim = .84 } = {}) =>
  `<circle r="${r}" fill="${crust}"/><circle r="${r * .93}" fill="none" stroke="#e8c08a" stroke-width="3" opacity=".6"/><circle r="${r * rim}" fill="${sauce}"/>${toppings}`;

// A wooden board with a shadow, holding whatever is drawn inside it at (cx, cy).
const board = (cx, cy, r, inner) => `<ellipse cx="${cx}" cy="${cy + r + 16}" rx="${r * .9}" ry="18" fill="#775e48" opacity=".14"/>
  <g transform="translate(${cx} ${cy})"><circle r="${r + 22}" fill="#c49a6c"/><circle r="${r + 16}" fill="none" stroke="#b08458" stroke-width="3"/>${inner}</g>`;

// Shared chapter frame: paper background, soft disc and dotted ring, like the other journeys.
const frame = (label, bg, disc, inner) => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${disc}"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>${inner}</svg>`;

const steam = (xs, y, h = 60) => `<g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round">${xs.map((x, i) => `<path class="m-steam" style="--d:${-i * 1.7}s" d="M${x} ${y}Q${x - 16} ${y - h * .35} ${x} ${y - h * .65}T${x} ${y - h}"/>`).join('')}</g>`;
const sparkles = pts => `<g class="m-float" fill="#a28056">${pts.map(([x, y, s]) => `<path d="m${x} ${y - 12 * s} ${3 * s} ${9 * s} ${9 * s} ${3 * s}-${9 * s} ${3 * s}-${3 * s} ${9 * s}-${3 * s}-${9 * s}-${9 * s}-${3 * s} ${9 * s}-${3 * s}Z"/>`).join('')}</g>`;

function kitchen(id) {
  const p = `${slug}-${id}`;
  const mix = [T.boba, T.corn, T.leaf, T.shrimp, T.paneer];
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een warme keuken met een houtoven, een lampion en een grote pizza vol gekke toppings op tafel">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d6dcc4"/><stop offset="1" stop-color="#f1ead2"/></linearGradient>
  <radialGradient id="${p}-glow"><stop stop-color="#f7d48a"/><stop offset="1" stop-color="#e8a65a" stop-opacity="0"/></radialGradient>
  <clipPath id="${p}-win"><path d="M440 330V170Q440 90 540 90T640 170V330Z"/></clipPath></defs>
  <path fill="#eadcc7" d="M0 0H720V760H0Z"/>
  <g fill="#e2d1b8">${Array.from({ length: 5 }, (_, r) => Array.from({ length: 10 }, (_, c) => `<rect x="${c * 76 + (r % 2) * 38 - 30}" y="${392 + r * 30}" width="70" height="24" rx="3"/>`).join('')).join('')}</g>
  <g class="layer" style="--i:0"><path d="M428 342V170Q428 78 540 78T652 170V342Z" fill="#c9b08c"/>
  <g clip-path="url(#${p}-win)"><path fill="url(#${p}-sky)" d="M440 80H640V330H440Z"/><circle cx="592" cy="150" r="24" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".85"><ellipse cx="500" cy="142" rx="40" ry="8"/><ellipse cx="612" cy="204" rx="30" ry="6"/></g>
  <path d="M440 290Q490 230 540 262T640 240V330H440Z" fill="#a9bea6"/><path d="M440 312Q500 280 560 300T640 296V330H440Z" fill="#7c9a6a"/></g>
  <path d="M540 84V330M440 220H640" stroke="#c9b08c" stroke-width="8"/><path d="M418 336H662V354H418Z" fill="#b98b62"/>
  <path d="M470 336l6-28h36l6 28Z" fill="#b76e55"/><g class="basil" fill="#6f9463"><ellipse cx="482" cy="298" rx="13" ry="7" transform="rotate(-35 482 298)"/><ellipse cx="506" cy="296" rx="13" ry="7" transform="rotate(35 506 296)"/><ellipse cx="494" cy="284" rx="7" ry="13"/></g></g>
  <g class="lantern"><path d="M300 0V98" stroke="#6b5b43" stroke-width="2"/><ellipse class="lantern-glow" cx="300" cy="138" rx="48" ry="54" fill="#d98b5a" fill-opacity=".3"/>
  <ellipse cx="300" cy="138" rx="30" ry="38" fill="#d98b5a"/><path d="M286 96h28v8h-28ZM286 172h28v8h-28Z" fill="#8c5a3c"/><path d="M290 112v52M310 112v52" stroke="#c2774b" stroke-width="2"/><path d="M300 180v24" stroke="#b76e55" stroke-width="4"/></g>
  <g class="layer" style="--i:1"><g fill="#f8f4e2"><circle class="smoke" cx="190" cy="146" r="16" opacity="0"/><circle class="smoke" cx="190" cy="146" r="16" opacity="0"/><circle class="smoke" cx="190" cy="146" r="16" opacity="0"/></g>
  <path d="M170 300V170H210V300Z" fill="#a5704f"/><path d="M160 156H220V172H160Z" fill="#8c5a3c"/>
  <path d="M30 540Q30 288 190 288Q350 288 350 540Z" fill="#b8845e"/>
  <g stroke="#a5704f" stroke-width="4" stroke-linecap="round"><path d="M80 380h40M150 336h46M240 360h44M60 460h30M290 440h34M200 312h30"/></g>
  <path d="M100 540V468Q100 390 190 390T280 468V540" fill="none" stroke="#8c5a3c" stroke-width="14"/>
  <path d="M106 540V470Q106 396 190 396T274 470V540Z" fill="#4a3a2e"/>
  <ellipse class="glow" cx="190" cy="500" rx="86" ry="56" fill="url(#${p}-glow)"/>
  <path d="M140 532h104v-12H140Z" fill="#6e503b"/><path d="M150 520l94-6v-10l-94 6Z" fill="#5a4332"/>
  <g class="flame"><path d="M150 520Q146 484 168 462Q164 494 182 496Q178 464 198 440Q206 476 220 482Q228 462 224 450Q246 482 236 520Z" fill="#e8a65a"/>
  <path d="M168 520Q166 498 180 486Q182 504 194 504Q192 482 206 470Q214 494 222 520Z" fill="#f7d48a"/></g></g>
  <g class="layer" style="--i:2"><path d="M0 540H720V760H0Z" fill="#9a7552"/><path d="M0 530H720V556H0Z" fill="#b98b62"/>
  <path d="M0 610H720M0 690H720" stroke="#8a6748" stroke-width="3"/>
  <ellipse cx="420" cy="690" rx="190" ry="24" fill="#5a4332" opacity=".25"/>
  <path d="M590 652H720V672H590Z" fill="#b08458"/>
  <ellipse cx="410" cy="650" rx="196" ry="98" fill="#c49a6c"/>
  <g class="pizza"><g transform="translate(410 648) scale(1 .5)">${pizza(170, '#c9694e', scatter(12, 125, T.cheese) + scatter(28, 128, (x, y, i) => mix[i % 5](x, y, i), 20))}</g></g>
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="steam" d="M350 590q-14-18 0-34t0-34" opacity="0"/><path class="steam" d="M412 584q-14-18 0-34t0-34" opacity="0"/><path class="steam" d="M474 590q-14-18 0-34t0-34" opacity="0"/></g></g>
  <g class="float"><g transform="translate(386 444)">${T.boba(0, 0)}</g></g>
  <g class="float"><g transform="translate(470 470)">${T.leaf(0, 0, 1)}</g></g>
  <g class="float"><g transform="translate(570 420)">${T.shrimp(0, 0, 2)}</g></g>
  <g class="float"><g transform="translate(660 470)">${T.corn(0, 0)}${T.corn(14, 6)}</g></g>
  </svg>`;
}

function india() {
  const toppings = `<circle r="96" fill="none" stroke="#5f8a55" stroke-width="5" opacity=".5"/><circle r="52" fill="none" stroke="#5f8a55" stroke-width="5" opacity=".5"/>`
    + scatter(9, 120, T.spinach, 40) + scatter(12, 115, T.paneer) + scatter(22, 128, T.spice, 70);
  return frame('Een pizza met groene spinaziecurry en blokjes Indiase kaas, met een kommetje curry en een rode peper ernaast', '#e2e4c8', '#ebecd9', `
  <g class="m-sway" fill="#6f9463"><ellipse cx="96" cy="120" rx="34" ry="14" transform="rotate(-30 96 120)"/><ellipse cx="140" cy="96" rx="30" ry="12" transform="rotate(20 140 96)"/><path d="M80 150 132 104" stroke="#517c67" stroke-width="3"/></g>
  ${board(360, 315, 160, pizza(160, '#6f9463', toppings))}
  <g transform="translate(605 535)"><path d="M-62 0Q-58 46 0 48Q58 46 62 0Z" fill="#b8845e"/><ellipse rx="62" ry="16" fill="#6f9463"/><g fill="#f7f0dc"><rect x="-26" y="-6" width="12" height="10" rx="2"/><rect x="10" y="-4" width="12" height="10" rx="2"/></g></g>
  ${steam([590, 620], 505, 70)}
  <g transform="translate(110 540) rotate(-20)"><path d="M0 0Q50 -10 80 18Q40 14 0 12Z" fill="#b75f50"/><path d="M0 6q-14-2-18-14" stroke="#517c67" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  ${sparkles([[612, 120, 1], [96, 420, .8]])}`);
}

function sweetSavoury() {
  const R = 118, mayo = [-78, -26, 26, 78].map(y => {
    const hc = Math.sqrt(R * R - y * y), n = Math.floor(hc / 10);
    return `M${-n * 10} ${y}` + Array.from({ length: n }, (_, k) => `l20 ${k % 2 ? 7 : -7}`).join('');
  }).join('');
  const toppings = scatter(14, 118, T.cheese) + scatter(7, 112, T.shrimp, 10) + scatter(7, 115, T.squid, 80) + scatter(20, 122, T.corn, 50)
    + `<path d="${mayo}" transform="rotate(-20)" stroke="#fffaf0" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const rim = Array.from({ length: 22 }, (_, i) => { const a = i * Math.PI * 2 / 22; return `<circle cx="${(150 * Math.cos(a)).toFixed(1)}" cy="${(150 * Math.sin(a)).toFixed(1)}" r="13" fill="#e6a565"/>`; }).join('');
  return frame('Een pizza met een oranje korst van zoete aardappel, belegd met garnalen, inktvisringen, maïs en strepen mayonaise', '#eadcc7', '#f6ebd4', `
  ${board(360, 315, 165, pizza(165, '#f3e2b0', rim + toppings, { crust: '#d9965a', rim: .8 }))}
  <g transform="translate(600 530) rotate(-18)"><path d="M-60 0Q-40 -30 20 -26Q62 -20 64 4Q50 30 -10 26Q-58 22 -60 0Z" fill="#8f5a58"/><ellipse cx="60" cy="0" rx="10" ry="18" fill="#e6a565"/><path d="M-62 2q-12 -2-18 6" stroke="#6b5b43" stroke-width="3" fill="none"/></g>
  <g class="m-sway" style="--d:-1.5s"><g transform="translate(110 130) rotate(-25)"><ellipse rx="20" ry="52" fill="#e8c24a"/><g fill="#f0d36a">${Array.from({ length: 12 }, (_, i) => `<circle cx="${i % 2 ? 7 : -7}" cy="${-40 + i * 7}" r="4"/>`).join('')}</g><path d="M0 50Q-34 30 -30 -20Q-8 20 0 50ZM0 50Q34 30 30 -20Q8 20 0 50Z" fill="#9cac66"/></g></g>
  ${sparkles([[612, 120, 1], [110, 470, .8]])}`);
}

function taiwan(item = 'boba') {
  const boba = item !== 'ei';
  const toppings = boba
    ? scatter(14, 118, T.cheese) + `<path d="M-90 -30Q-40 -80 20 -50T110 -10M-100 40Q-40 0 20 30T100 70" stroke="#8c6a4c" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>` + scatter(22, 124, T.boba, 30)
    : scatter(14, 118, T.cheese) + scatter(7, 112, T.bloodcake, 15) + scatter(7, 110, T.egg, 95) + scatter(12, 125, T.coriander, 55);
  const side = boba
    ? `<g transform="translate(612 470)"><path d="M-36 -78H36L28 62H-28Z" fill="#efe4cc" opacity=".85"/><path d="M-32 -30H32L28 62H-28Z" fill="#c49a6c"/>
      <g class="m-bob">${[[-14, 48], [6, 50], [20, 42], [-4, 36], [12, 30], [-18, 30]].map(([x, y]) => T.boba(x, y)).join('')}</g>
      <path d="M-40 -84H40V-74H-40Z" fill="#9cac66"/><path d="M6 -84 18 -132h10L16 -84Z" fill="#517c67"/></g>`
    : `<g transform="translate(605 540)"><ellipse rx="64" ry="18" fill="#f8f3e2"/><g class="m-bob"><g transform="translate(-20 -14)"><ellipse rx="26" ry="20" fill="#7a5230"/><ellipse rx="22" ry="16" fill="#3b2a22"/><ellipse cx="2" rx="11" ry="8" fill="#5b6448"/></g>
      <g transform="translate(26 -12) rotate(20)"><ellipse rx="24" ry="18" fill="#7a5230"/><ellipse rx="20" ry="14" fill="#3b2a22"/><ellipse cx="2" rx="10" ry="7" fill="#5b6448"/></g></g></g>`;
  const label = boba ? 'een Boba-pizza met mozzarella, zoete theesaus en tapiocaballetjes, met een beker bubbelthee ernaast' : 'een pizza met koriander, varkensbloedcake en plakjes zwart honderdjarig ei, met een gehalveerd ei ernaast';
  return frame(`Illustratie van ${label}`, '#e3d9c4', '#f1e8d6', `
  <g class="m-sway"><g fill="#7c9a5a" transform="translate(104 128)"><path d="M0 60V-10" stroke="#517c67" stroke-width="3"/><circle cy="-14" r="11"/><circle cx="-14" cy="0" r="10"/><circle cx="14" cy="4" r="10"/><circle cx="-6" cy="22" r="9"/></g></g>
  ${board(360, 315, 160, pizza(160, boba ? '#b98b62' : '#c9694e', toppings))}
  ${side}
  ${sparkles([[612, 118, 1], [100, 470, .8]])}`);
}

function durian() {
  const toppings = scatter(12, 118, T.cheese) + scatter(9, 108, T.durian, 25) + scatter(18, 126, T.browned, 60);
  const spikes = Array.from({ length: 28 }, (_, i) => {
    const a = i * Math.PI * 2 / 28, x = 62 * Math.cos(a), y = 76 * Math.sin(a), nx = Math.cos(a), ny = Math.sin(a);
    return `<path d="M${(x - ny * 7).toFixed(1)} ${(y + nx * 7).toFixed(1)}L${(x + nx * 13).toFixed(1)} ${(y + ny * 13).toFixed(1)}L${(x + ny * 7).toFixed(1)} ${(y - nx * 7).toFixed(1)}Z"/>`;
  }).join('');
  return frame('Een pizza met romige gele stukjes durian en gesmolten kaas, met een stekelige durian-vrucht ernaast waar geurlijntjes uit komen', '#e2e4c8', '#ebecd9', `
  <g class="m-sway" style="--d:-2s"><path d="M30 40Q120 60 170 150" stroke="#517c67" stroke-width="5" fill="none"/><g fill="#6f9463">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${50 + i * 20}" cy="${52 + i * 16}" rx="28" ry="7" transform="rotate(${60 + i * 4} ${50 + i * 20} ${52 + i * 16})"/>`).join('')}</g></g>
  ${board(340, 315, 155, pizza(155, '#f3e2a8', toppings))}
  <g transform="translate(600 490)"><ellipse cy="86" rx="60" ry="10" fill="#775e48" opacity=".14"/><g fill="#7e8c42">${spikes}</g><ellipse rx="62" ry="76" fill="#9aa654"/>
  <g fill="#7e8c42">${scatter(22, 56, (x, y) => `<path d="M${x} ${(y * 1.2 - 6).toFixed(1)}l5 9h-10Z"/>`)}</g><path d="M0 -76q4-16 14-22" stroke="#6b5b43" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <g fill="none" stroke="#9cac66" stroke-width="4" stroke-linecap="round"><path class="m-steam" d="M570 380q-12-14 0-28t0-28"/><path class="m-steam" style="--d:-1.4s" d="M602 372q-12-14 0-28t0-28"/><path class="m-steam" style="--d:-2.8s" d="M634 380q-12-14 0-28t0-28"/></g>
  ${sparkles([[612, 120, 1], [96, 470, .8]])}`);
}

// One pizza with a quarter from each country: India, Japan and Korea, Taiwan and Southeast Asia.
function feast() {
  const r = 172, a = d => d * Math.PI / 180, pt = (rr, d) => `${(rr * Math.cos(a(d))).toFixed(1)} ${(rr * Math.sin(a(d))).toFixed(1)}`;
  const sector = (d1, fill) => `<path d="M0 0L${pt(r * .84, d1)}A${r * .84} ${r * .84} 0 0 1 ${pt(r * .84, d1 + 90)}Z" fill="${fill}"/>`;
  const quarter = (x, y, i) => {
    const d = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360, q = Math.floor(d / 90);
    return [[T.boba, T.cheese], [T.durian, T.cheese], [T.paneer, T.spinach], [T.shrimp, T.corn]][q][i % 2](x, y, i);
  };
  return frame('Een feestelijke pizza met vier stukken: groene curry, garnalen met maïs, boba en durian, met een hartje in het midden', '#eadcc7', '#f6ebd4', `
  ${board(360, 315, r, `<circle r="${r}" fill="#d8a86a"/><circle r="${r * .93}" fill="none" stroke="#e8c08a" stroke-width="3" opacity=".6"/>
    ${sector(0, '#b98b62')}${sector(90, '#f3e2a8')}${sector(180, '#6f9463')}${sector(270, '#f3e2b0')}
    ${spots(36, 126, 12).filter(([x, y]) => Math.abs(x) > 14 && Math.abs(y) > 14).map(([x, y, i]) => quarter(x, y, i)).join('')}
    <path d="M${-r} 0H${r}M0 ${-r}V${r}" stroke="#c48a54" stroke-width="4"/>
    <g class="m-bob"><path d="M0 18C-30 -2 -22 -26 -8 -24Q-2 -23 0 -16Q2 -23 8 -24C22 -26 30 -2 0 18Z" fill="#b76e55"/></g>`)}
  <g class="m-twinkle" fill="#e0b060"><circle cx="120" cy="120" r="6"/><circle cx="610" cy="140" r="5"/><circle cx="600" cy="540" r="6"/></g>
  ${sparkles([[110, 520, 1], [620, 300, .8]])}`);
}

export const hero = id => kitchen(id);
export const chapter = (i, variant) => [null, india, sweetSavoury, taiwan, durian][i](variant);
export const completion = () => feast();
export const card = () => kitchen('card');
