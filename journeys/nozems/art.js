// Nozems artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'nozems';
const skin = '#ecc9a4';

// A cream-framed window; cx is the centre, y the top edge.
const win = (cx, y, lit) => `<path d="M${cx - 11} ${y}h22v32h-22Z" fill="#f4ecd8"/><path d="M${cx - 8} ${y + 3}h16v26h-16Z" fill="${lit ? '#ecd9a0' : '#9fb3a6'}"/><path d="M${cx} ${y + 3}v26M${cx - 8} ${y + 15}h16" stroke="#f4ecd8" stroke-width="2"/>`;

// A striped shop awning with a scalloped edge, across the full house width.
const awning = (w, stripe) => {
  const n = Math.floor(w / 18);
  const stripes = Array.from({ length: n }, (_, k) => k % 2 ? '' : `<path d="M${k * 18} -98h18v16h-18Z" fill="${stripe}"/>`).join('');
  const scallops = Array.from({ length: n }, (_, k) => `<circle cx="${k * 18 + 9}" cy="-82" r="9" fill="${k % 2 ? '#f5ecd4' : stripe}"/>`).join('');
  return `<path d="M0 -98H${n * 18}V-82H0Z" fill="#f5ecd4"/>${stripes}${scallops}`;
};

// An Amsterdam house with a neck or bell gable and a shop (or the cinema) on the ground floor.
// x is the left edge, base the pavement line; lit decides which windows glow.
const house = (x, base, w, h, brick, kind, i, shop, lit = (r, c) => (r + c + i) % 3 === 0) => {
  const top = -h;
  let gable;
  if (kind === 'neck') {
    const nw = w * .44, l = (w - nw) / 2, g = 46;
    gable = `M0 0V${top}Q${l * .6} ${top} ${l} ${top - g * .5}V${top - g}Q${w / 2} ${top - g - 16} ${l + nw} ${top - g}V${top - g * .5}Q${w - l * .6} ${top} ${w} ${top}V0Z`;
  } else {
    gable = `M0 0V${top}Q${w * .08} ${top - 6} ${w * .2} ${top - 14}Q${w * .3} ${top - 58} ${w / 2} ${top - 62}Q${w * .7} ${top - 58} ${w * .8} ${top - 14}Q${w * .92} ${top - 6} ${w} ${top}V0Z`;
  }
  const cols = w > 120 ? 3 : 2, cw = w / cols;
  const rows = [];
  for (let y = top + 18; y < -150; y += 50) rows.push(y);
  const upper = rows.flatMap((y, r) => Array.from({ length: cols }, (_, c) => win(cw * (c + .5), y, lit(r, c)))).join('');
  const attic = `<circle cx="${w / 2}" cy="${top - (kind === 'neck' ? 36 : 34)}" r="7" fill="#f4ecd8"/><circle cx="${w / 2}" cy="${top - (kind === 'neck' ? 36 : 34)}" r="4.5" fill="#9fb3a6"/>`;
  let ground;
  if (shop === 'cinema') {
    const bulbs = Array.from({ length: Math.floor((w + 4) / 14) }, (_, k) => `<circle class="bulb" cx="${k * 14 + 2}" cy="-118" r="2.8"/><circle class="bulb" cx="${k * 14 + 2}" cy="-80" r="2.8"/>`).join('');
    ground = `<path d="M-6 -124H${w + 6}V-74H-6Z" fill="#284f3d"/><g fill="#f7e3a8">${bulbs}</g>
    <text x="${w / 2}" y="-93" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="#f4ecd8">BIOSCOOP</text>
    <path d="M8 -70H${w - 8}V0H8Z" fill="#6e503b"/><path d="M16 -62h30v42H16Z" fill="#e8c3c0"/><path d="M${w - 46} -62h30v42h-30Z" fill="#d8b56a"/>
    <path d="M22 -52h18M22 -44h12M${w - 40} -52h18M${w - 40} -44h12" stroke="#7c5a42" stroke-width="3"/>
    <path d="M${w / 2 - 22} -62h44V0h-44Z" fill="#ecd9a0" opacity=".9"/><path d="M${w / 2} -62V0" stroke="#6e503b" stroke-width="3"/>`;
  } else {
    ground = `<path d="M6 -78H${w - 6}V0H6Z" fill="#6e503b"/><path d="M12 -72H${w * .62}V-10H12Z" fill="#ecd9a0" opacity=".85"/>
    <path d="M18 -26h${w * .62 - 24}v-6H18Z" fill="#c9a36e" opacity=".6"/>
    <path d="M${w * .68} -68H${w - 12}V0H${w * .68}Z" fill="#3f6b52"/>${awning(w, shop)}`;
  }
  return `<g transform="translate(${x} ${base})"><path d="${gable}" fill="${brick}"/><path d="M0 ${top}h${w}" stroke="#f1e6cc" stroke-width="3" opacity=".6"/>${attic}${upper}${ground}</g>`;
};

// A moped seen from the side, facing right, with its rear wheel near x = 36 and the ground at y = 0.
// rider adds a nozem in a leather jacket sitting on it, leaning into the ride.
const moped = (body, rider = false) => `<g class="moped">
  <path d="M-2 -30H64" stroke="#a3a294" stroke-width="7" stroke-linecap="round"/>
  ${[36, 196].map(cx => `<circle cx="${cx}" cy="-32" r="32" fill="#34302b"/><circle cx="${cx}" cy="-32" r="23" fill="none" stroke="#cfc6b0" stroke-width="3"/><path d="M${cx - 22} -32h44M${cx} -54v44" stroke="#cfc6b0" stroke-width="1.5" opacity=".7"/><circle cx="${cx}" cy="-32" r="6" fill="#cfc6b0"/>`).join('')}
  <path d="M2 -42Q36 -80 72 -44M164 -44Q196 -78 228 -44" stroke="${body}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M74 -60h52v30h-52Z" fill="#7b7a6c"/><path d="M82 -54v18M92 -54v18M102 -54v18M112 -54v18" stroke="#9c9b8d" stroke-width="3"/>
  <path d="M50 -70Q60 -102 100 -102H150Q166 -102 172 -88L180 -70Z" fill="${body}"/>
  <path d="M66 -86H166" stroke="#f5ecd4" stroke-width="5"/>
  <path d="M66 -104h8v10h-8Z" fill="#3b342e"/><path d="M42 -104Q46 -118 70 -118H106Q114 -118 112 -104Z" fill="#3b342e"/>
  <path d="M196 -32L172 -140" stroke="#8c8c80" stroke-width="7" stroke-linecap="round"/>
  <path d="M158 -142Q172 -152 190 -148" stroke="#3b342e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="186" cy="-122" r="12" fill="${body}"/><circle class="headlight" cx="191" cy="-122" r="7" fill="#f7e3a8"/>
  <circle cx="100" cy="-40" r="6" fill="#3b342e"/>
  ${rider ? `<path d="M80 -114L128 -98" stroke="#5f7f9b" stroke-width="18" stroke-linecap="round"/><path d="M128 -98L114 -48" stroke="#5f7f9b" stroke-width="15" stroke-linecap="round"/><ellipse cx="120" cy="-42" rx="14" ry="6" fill="#2f2a26"/>
  <path d="M60 -118L84 -200Q102 -212 120 -198L106 -112Z" fill="#38362f"/><path d="M114 -192L166 -148" stroke="#38362f" stroke-width="13" stroke-linecap="round"/><circle cx="166" cy="-147" r="6" fill="${skin}"/>
  <path d="M104 -214h12v14h-12Z" fill="${skin}"/><circle cx="114" cy="-226" r="16" fill="${skin}"/>
  <path d="M98 -228Q94 -248 112 -252Q128 -258 136 -244Q124 -246 118 -240Q110 -236 114 -228Q106 -236 98 -228Z" fill="#3a2f28"/><path d="M86 -244Q96 -254 110 -252" stroke="#3a2f28" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}
  </g>`;

// A nozem in a leather jacket and jeans, with his quiff pointing right; feet at the origin.
const boy = () => `<ellipse cx="-13" cy="-4" rx="13" ry="6" fill="#2f2a26"/><ellipse cx="13" cy="-4" rx="13" ry="6" fill="#2f2a26"/>
  <path d="M-20 -104L-22 -8H-5L0 -78L5 -8H22L20 -104Z" fill="#5f7f9b"/><path d="M-23 -20h19v8h-19ZM4 -20h19v8H4Z" fill="#88a3b6"/>
  <path d="M-27 -176Q-31 -132 -25 -98H25Q31 -132 27 -176Q0 -186 -27 -176Z" fill="#38362f"/>
  <path d="M-9 -180L0 -154L9 -180Z" fill="#f4ecd8"/><path d="M-10 -181L-19 -158L-4 -168ZM10 -181L19 -158L4 -168Z" fill="#4c4a42"/><path d="M0 -154V-100" stroke="#55534a" stroke-width="2"/>
  <path d="M-27 -174Q-40 -136 -32 -108L-23 -110Q-29 -138 -19 -166ZM27 -174Q40 -136 32 -108L23 -110Q29 -138 19 -166Z" fill="#38362f"/>
  <circle cx="-28" cy="-106" r="6" fill="${skin}"/><circle cx="28" cy="-106" r="6" fill="${skin}"/>
  <path d="M-6 -196h12v18h-12Z" fill="${skin}"/>
  <g class="boy-head"><circle cy="-208" r="17" fill="${skin}"/>
  <path d="M-17 -210Q-21 -232 -2 -236Q16 -248 30 -234Q22 -230 18 -222Q14 -214 17 -206Q10 -220 -2 -218Q-12 -216 -17 -210Z" fill="#3a2f28"/>
  <path d="M2 -238Q16 -244 24 -236" stroke="#7a675a" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;

// A girl in a petticoat dress with a beehive hairdo, holding a small radio; feet at the origin.
const girl = () => `<ellipse cx="-9" cy="-3" rx="8" ry="4" fill="#6e503b"/><ellipse cx="9" cy="-3" rx="8" ry="4" fill="#6e503b"/>
  <path d="M-12 -62h7v58h-7ZM5 -62h7v58h-7Z" fill="${skin}"/>
  <g class="skirt"><path d="M-14 -124Q-44 -96 -54 -60Q0 -48 54 -60Q44 -96 14 -124Z" fill="#b76e55"/>
  <path d="M-54 -60Q0 -48 54 -60L52 -53Q0 -41 -52 -53Z" fill="#f5ecd4"/>
  <g fill="#f5ecd4" opacity=".8"><circle cx="-24" cy="-84" r="3.5"/><circle cx="0" cy="-96" r="3.5"/><circle cx="22" cy="-82" r="3.5"/><circle cx="-36" cy="-66" r="3.5"/><circle cx="-8" cy="-70" r="3.5"/><circle cx="14" cy="-104" r="3"/><circle cx="36" cy="-66" r="3.5"/><circle cx="10" cy="-66" r="3.5"/></g></g>
  <path d="M-14 -124L-15 -162Q0 -170 15 -162L14 -124Z" fill="#b76e55"/><path d="M-15 -128h30v6h-30Z" fill="#284f3d"/>
  <path d="M-15 -160Q-26 -140 -20 -118" stroke="${skin}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M14 -158Q24 -146 30 -134" stroke="${skin}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M30 -128Q41 -142 52 -128" stroke="#6f8448" stroke-width="3" fill="none"/><rect x="24" y="-130" width="34" height="24" rx="5" fill="#9cac66"/><circle cx="35" cy="-118" r="7" fill="#6f8448"/><path d="M47 -124v12M51 -124v12" stroke="#f5ecd4" stroke-width="2"/>
  <path d="M-5 -178h10v16h-10Z" fill="${skin}"/><circle cy="-186" r="14" fill="${skin}"/>
  <path d="M-15 -186Q-22 -226 0 -234Q22 -226 15 -186Q10 -200 0 -200Q-10 -200 -15 -186Z" fill="#c49a5e"/>
  <path d="M-14 -200l-9-7v14ZM-14 -200l-9 7" fill="#e8c3c0"/><circle cx="-14" cy="-200" r="3" fill="#e8c3c0"/>`;

// A quaver; the hero animates the inner .note group.
const note = (x, y, d = 0, cls = 'note') => `<g transform="translate(${x} ${y})"><g class="${cls}" style="--d:${d}s"><ellipse cx="0" cy="0" rx="6" ry="4.5" transform="rotate(-20)"/><path d="M5 -1V-22q6 3 8 9" stroke="currentColor" stroke-width="2.5" fill="none"/></g></g>`;

// Rows of rounded cobbles that grow towards the viewer.
const cobbles = (y0, y1, w = 720) => {
  let s = '';
  for (let r = 0, y = y0; y < y1; r++, y += 16 + r * 1.6) {
    const h = 9 + r * .9, cw = 24 + r * 2.6;
    for (let x = (r % 2) * cw / 2 - cw; x < w; x += cw + 5) s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cw.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}"/>`;
  }
  return `<g fill="#b9a884" opacity=".5">${s}</g>`;
};

const lamp = (x, top, base, cls = 'lamp-glow') => `<path d="M${x - 2} ${base}V${top}h4V${base}Z" fill="#3e4a3e"/><path d="M${x - 8} ${base}h16v-14h-16Z" fill="#3e4a3e"/>
  <circle class="${cls}" cx="${x}" cy="${top - 10}" r="30" fill="#f7e3a8" opacity=".3"/><path d="M${x - 12} ${top}h24l-6 -22h-12Z" fill="#3e4a3e"/><path d="M${x - 7} ${top - 2}h14l-3 -16h-8Z" fill="#f7e3a8"/>`;

const HOUSES = [
  [-20, 120, 230, '#b8845e', 'bell', '#517c67'],
  [100, 110, 262, '#9a6b4f', 'neck', '#b76e55'],
  [210, 130, 215, '#a8775a', 'bell', '#9cac66'],
  [340, 150, 246, '#8c5f48', 'neck', 'cinema'],
  [490, 110, 272, '#b8845e', 'bell', '#b76e55'],
  [600, 130, 232, '#a07055', 'neck', '#517c67'],
];

function street(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een winkelstraat in Amsterdam in de jaren vijftig: oude huizen met winkels en een bioscoop, een bouwkraan op de achtergrond, een meisje met een petticoat en een radiootje, en een jongen met een vetkuif en een leren jack naast zijn brommer">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d6dcc4"/><stop offset="1" stop-color="#f3e9cf"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="560" cy="130" r="46" fill="#f7e3a8" opacity=".4"/>
  <circle cx="560" cy="130" r="46" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".65"><ellipse cx="420" cy="96" rx="120" ry="13"/><ellipse cx="640" cy="200" rx="90" ry="11"/><ellipse cx="200" cy="90" rx="80" ry="10"/></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2" stroke-linecap="round"><path class="bird" d="m430 170 9-5 9 5"/><path class="bird" d="m462 186 7-4 7 4"/></g>
  <g class="layer" style="--i:0"><g fill="#b9a67e">
  <path d="M96 560V178h16V560Z"/><path d="M40 160H372V174H40Z"/><path d="M104 118L94 160h20Z"/><path d="M40 174h32v18H40Z" fill="#9a8460"/><path d="M90 174h28v24H90Z" fill="#a08665"/><path d="M294 174h16v6h-16Z" fill="#8c7a5c"/></g>
  <path d="M104 120L44 160M104 120L370 160" stroke="#9a8460" stroke-width="2"/>
  <path d="M96 200l16 30-16 30 16 30-16 30 16 30-16 30 16 30-16 30 16 30-16 30 16 30M120 160l16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14" stroke="#a3906a" stroke-width="2" fill="none"/>
  <g class="crane-hook"><path d="M302 180V222" stroke="#6b5b43" stroke-width="2"/><path d="M297 220h10v8h-10Z" fill="#6b5b43"/><path d="M302 228L274 236M302 228L330 236" stroke="#6b5b43" stroke-width="1.5"/><path d="M266 236H338V246H266Z" fill="#b76e55"/></g></g>
  <g class="layer" style="--i:1"><path d="M0 530H720V620H0Z" fill="#7c5a42"/>${HOUSES.map(([x, w, h, b, k, s], i) => house(x, 540, w, h, b, k, i, s)).join('')}</g>
  <g class="layer" style="--i:2"><path d="M0 538H720V760H0Z" fill="#cdbf9e"/><path d="M0 538H720V566H0Z" fill="#e2d6b8"/><path d="M0 566H720V572H0Z" fill="#b8a886"/>${cobbles(584, 760)}</g>
  ${lamp(650, 432, 712)}
  <g transform="translate(130 712)">${girl()}</g>
  <g transform="translate(236 706)">${boy()}</g>
  <g class="notes" fill="#284f3d" color="#284f3d">${note(178, 560)}${note(166, 560)}${note(190, 560)}</g>
  <ellipse cx="445" cy="714" rx="130" ry="8" fill="#8c7a5c" opacity=".35"/>
  <g transform="translate(330 712)"><g class="puffs" fill="#f3ecdc"><circle class="puff" cx="-6" cy="-32" r="9" opacity=".6"/><circle class="puff" cx="-6" cy="-32" r="9" opacity=".4"/><circle class="puff" cx="-6" cy="-32" r="9" opacity=".2"/></g>${moped('#b76e55')}</g>
  </svg>`;
}

function wages() {
  const coins = Array.from({ length: 5 }, (_, k) => `<path d="M492 ${486 - k * 11}v9a28 9 0 0 0 56 0v-9Z" fill="#b8954e"/><ellipse cx="520" cy="${486 - k * 11}" rx="28" ry="9" fill="#e0c07a"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een geopend loonzakje met een bankbiljet, een stapeltje munten en een fabriek op de achtergrond. Boven het zakje zweven een bioscoopkaartje en een grammofoonplaat">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#ebecd9"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <g fill="#f8f5e5"><circle class="m-steam" cx="466" cy="196" r="14"/><circle class="m-steam" style="--d:-1.7s" cx="476" cy="166" r="18"/><circle class="m-steam" style="--d:-3.4s" cx="490" cy="132" r="22"/></g>
  <g fill="#a9bea6"><path d="M150 430V330l45-32v32l45-32v32l45-32v32l45-32v32l45-32v32l45-32V430Z"/><path d="M456 210h22v130h-22Z"/><path d="M420 330h150v100H420Z"/></g>
  <g fill="#c9d6c0"><path d="M168 360h20v22h-20ZM213 360h20v22h-20ZM258 360h20v22h-20ZM303 360h20v22h-20ZM440 352h22v22h-22ZM484 352h22v22h-22ZM528 352h22v22h-22Z"/></g>
  <path d="M120 430H600Q600 470 560 470H160Q120 470 120 430Z" fill="#d8c9a4"/>
  <ellipse cx="360" cy="526" rx="200" ry="18" fill="#775e48" opacity=".13"/>
  <g transform="rotate(-5 360 420)">
  <path d="M286 262h150v84H286Z" fill="#b8c9a0"/><path d="M296 272h130v64H296Z" fill="none" stroke="#8fa478" stroke-width="3"/><circle cx="361" cy="304" r="18" fill="#9cb388"/><path d="M308 290h26M388 318h26" stroke="#8fa478" stroke-width="4"/>
  <path d="M254 330H466V516H254Z" fill="#c9a36e"/><path d="M254 330L360 392L466 330Z" fill="#b98b62"/><path d="M254 516L344 436H376L466 516Z" fill="#bf9764"/>
  <text x="360" y="486" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#7c5a42">LOON</text></g>
  ${coins}
  <g class="m-bob" style="--d:-3s"><circle cx="196" cy="486" r="26" fill="#b8954e"/><circle cx="196" cy="482" r="26" fill="#e0c07a"/><circle cx="196" cy="482" r="18" fill="none" stroke="#b8954e" stroke-width="2.5"/><text x="196" y="489" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#8c6a3c">ƒ1</text></g>
  <g class="m-float" style="--d:-1s"><g transform="rotate(-10 196 196)"><path d="M150 176h92v40h-92Z" fill="#e8c3c0"/><circle cx="150" cy="196" r="8" fill="#ebecd9"/><circle cx="242" cy="196" r="8" fill="#ebecd9"/><path d="M216 180v32" stroke="#ebecd9" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="186" y="202" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="1" fill="#8c4f42">BIOS</text></g></g>
  <g class="m-float" style="--d:-4.5s"><circle cx="580" cy="226" r="40" fill="#3b342e"/><circle cx="580" cy="226" r="30" fill="none" stroke="#575049" stroke-width="2"/><circle cx="580" cy="226" r="22" fill="none" stroke="#575049" stroke-width="2"/><circle cx="580" cy="226" r="13" fill="#b76e55"/><circle cx="580" cy="226" r="3" fill="#ebecd9"/><path d="M552 204q12-12 30-14" stroke="#7a726a" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g fill="#517c67" color="#517c67">${note(626, 300, -2, 'm-float')}${note(536, 150, -5, 'm-float')}</g>
  </svg>`;
}

function wardrobe(variant = 'jongens') {
  const hanger = x => `<path d="M${x} 170q-10 0-10 9t10 9" stroke="#6b5b43" stroke-width="3" fill="none"/><path d="M${x - 46} 214L${x} 188L${x + 46} 214" stroke="#6b5b43" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const jeans = `${hanger(456)}<path d="M418 206H494L502 476H462L456 290L450 476H410Z" fill="#5f7f9b"/><path d="M418 206H494V222H418Z" fill="#88a3b6"/><path d="M410 458h40v18h-40ZM462 458h40v18h-40Z" fill="#88a3b6"/><path d="M456 222V286M430 232q8 18 22 18M482 232q-8 18-22 18" stroke="#c9b06a" stroke-width="2" fill="none" stroke-dasharray="4 3"/>`;
  const jacket = `${hanger(264)}<path d="M222 210Q264 196 306 210L322 420H206Z" fill="#38362f"/>
  <path d="M222 210L196 222L176 400L200 404L214 270ZM306 210L332 222L352 400L328 404L314 270Z" fill="#38362f"/>
  <path d="M236 206L264 262L292 206L280 202L264 236L248 202Z" fill="#4c4a42"/><path d="M264 236V420" stroke="#6a675d" stroke-width="3"/><path d="M220 300h28M280 300h28" stroke="#55534a" stroke-width="3"/>
  <path d="M206 404H322V420H206Z" fill="#2f2d28"/><path d="M290 226Q300 300 300 380" stroke="#5a574e" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`;
  const dress = `${hanger(264)}<path d="M236 208Q264 200 292 208L290 290H238Z" fill="#b76e55"/><path d="M236 208L222 230L232 246L242 222ZM292 208L306 230L296 246L286 222Z" fill="#b76e55"/>
  <path d="M238 286h52v10h-52Z" fill="#284f3d"/>
  <path d="M238 296Q180 360 166 456Q264 476 362 456Q348 360 290 296Z" fill="#b76e55"/><path d="M166 456Q264 476 362 456L360 470Q264 492 168 470Z" fill="#f5ecd4"/>
  <g fill="#f5ecd4" opacity=".85">${[[230, 340], [270, 330], [300, 360], [200, 400], [244, 392], [290, 410], [330, 420], [186, 440], [262, 440], [222, 430], [314, 380]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>
  <path d="M248 244l16-14 16 14-16 12Z" fill="#e8c3c0"/>`;
  const radio = `<g class="m-bob" style="--d:-2s"><path d="M488 512Q520 486 552 512" stroke="#6f8448" stroke-width="5" fill="none"/><rect x="460" y="504" width="120" height="70" rx="12" fill="#9cac66"/><circle cx="492" cy="539" r="20" fill="#6f8448"/><circle cx="492" cy="539" r="12" fill="none" stroke="#9cac66" stroke-width="2"/><path d="M528 524h36M528 534h36M528 544h36" stroke="#f5ecd4" stroke-width="3"/><circle class="m-twinkle" cx="556" cy="560" r="5" fill="#f7e3a8"/></g>
  <g fill="#284f3d" color="#284f3d">${note(492, 480, 0, 'm-float')}${note(546, 452, -3, 'm-float')}${note(600, 486, -5.5, 'm-float')}</g>`;
  const shelf = variant === 'meiden'
    ? `<g transform="translate(210 556)"><path d="M0 0Q-4 -18 18 -20H44Q56 -20 56 -8V0Z" fill="#b76e55"/><path d="M60 0Q56 -18 78 -20H104Q116 -20 116 -8V0Z" fill="#b76e55"/><circle cx="44" cy="-14" r="4" fill="#f5ecd4"/><circle cx="104" cy="-14" r="4" fill="#f5ecd4"/></g>
      <g transform="translate(380 548)"><path d="M0 0l-26-16v32ZM0 0l26-16v32Z" fill="#e8c3c0"/><circle r="7" fill="#d8a6a2"/><path d="M-4 6l-10 22M4 6l10 22" stroke="#e8c3c0" stroke-width="6" stroke-linecap="round"/></g>`
    : `<path d="M196 506h68v50h-68Z" fill="#d8c9a4"/><path d="M192 492h76v18h-76Z" fill="#284f3d"/><path d="M196 524h68v14h-68Z" fill="#9cac66"/>
      <path d="M296 540h100v12H296Z" fill="#3b342e"/><path d="M302 540v-14M310 540v-14M318 540v-14M326 540v-14M334 540v-14M342 540v-14M350 540v-14M358 540v-14M366 540v-14M374 540v-14M382 540v-14M390 540v-14" stroke="#3b342e" stroke-width="3"/>`;
  const label = variant === 'meiden'
    ? 'een gestippelde petticoatjurk en een spijkerbroek aan een kledingrek, met ballerinaschoentjes, een strik en een radio op de plank'
    : 'een zwart leren jack en een spijkerbroek aan een kledingrek, met een pot haarvet, een kam en een radio op de plank';
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van ${label}">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <path d="M146 170H574" stroke="#8c6a4c" stroke-width="8" stroke-linecap="round"/><path d="M156 170V500M564 170V500" stroke="#8c6a4c" stroke-width="7"/>
  ${variant === 'meiden' ? dress : jacket}${jeans}
  <path d="M120 556H600V574H120Z" fill="#9a7552"/><path d="M120 574H600" stroke="#7c5a42" stroke-width="5"/>
  ${shelf}${radio}
  <g class="m-twinkle" fill="#c9b06a"><path d="m612 230 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/></g><g class="m-twinkle" style="--d:-2s" fill="#c9b06a"><path d="m120 300 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

function evening() {
  const id = `${slug}-evening`;
  const houses = [[100, 120, 170, '#7d5a46', 'neck', '#517c67'], [220, 110, 196, '#8c6450', 'bell', '#b76e55'], [330, 130, 176, '#76543f', 'neck', '#9cac66'], [460, 110, 204, '#8c6450', 'bell', '#b76e55'], [570, 120, 180, '#7d5a46', 'neck', '#517c67']];
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avond op de Nieuwendijk in Amsterdam: een jongen met een vetkuif scheurt op zijn brommer langs verlichte etalages en straatlantaarns">
  <defs><clipPath id="${id}-clip"><circle cx="360" cy="315" r="223"/></clipPath><linearGradient id="${id}-sky" x2="0" y2="1"><stop stop-color="#47665a"/><stop offset="1" stop-color="#86a08c"/></linearGradient></defs>
  <rect width="720" height="650" fill="#e3d9c4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <g clip-path="url(#${id}-clip)">
  <path d="M100 80H620V560H100Z" fill="url(#${id}-sky)"/>
  <circle cx="470" cy="150" r="24" fill="#f3ecd0"/><circle cx="480" cy="144" r="22" fill="#4e6c5f"/>
  <g fill="#f3ecd0">${[[230, 120, 0], [300, 160, -1.5], [390, 110, -3], [560, 190, -.8], [180, 200, -2.4], [620, 130, -3.6]].map(([x, y, d]) => `<circle class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>
  <path d="M100 420H620V560H100Z" fill="#5a4334"/>
  ${houses.map(([x, w, h, b, k, s], i) => house(x, 440, w, h, b, k, i, s, (r, c) => (r + c + i) % 2 === 0)).join('')}
  <path d="M100 438H620V560H100Z" fill="#a8997c"/><path d="M100 438H620V454H100Z" fill="#c2b493"/>${cobbles(466, 560)}
  ${lamp(170, 300, 452, 'm-twinkle')}${lamp(560, 300, 452, 'm-twinkle')}
  <g class="m-drift" stroke="#e8dfc6" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M150 430h60M130 470h80M170 500h50"/></g>
  <g class="m-bob"><g transform="translate(250 508) scale(.85)"><g fill="#f3ecdc"><circle class="m-steam" cx="-14" cy="-34" r="10"/><circle class="m-steam" style="--d:-1.6s" cx="-38" cy="-42" r="14"/><circle class="m-steam" style="--d:-3.2s" cx="-66" cy="-50" r="18"/></g>${moped('#9cac66', true)}</g></g>
  </g></svg>`;
}

function record() {
  const grooves = [128, 112, 96, 80].map(r => `<circle cx="360" cy="300" r="${r}" fill="none" stroke="#4f4943" stroke-width="2"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een grammofoonplaat met op het etiket de woorden voor Alex, voor een groene platenhoes, omringd door zwevende muzieknootjes">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <ellipse cx="360" cy="492" rx="170" ry="20" fill="#775e48" opacity=".13"/>
  <g transform="rotate(-8 330 290)"><path d="M180 140H460V420H180Z" fill="#9cac66"/><path d="M200 160H440V400H200Z" fill="none" stroke="#c4cf98" stroke-width="3"/><circle cx="250" cy="210" r="22" fill="#b76e55" opacity=".7"/></g>
  <g class="m-bob" style="--d:-1s"><circle cx="360" cy="300" r="150" fill="#3b342e"/>${grooves}
  <path d="M262 214Q300 168 352 162" stroke="#7a726a" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
  <circle cx="360" cy="300" r="54" fill="#b76e55"/><circle cx="360" cy="300" r="46" fill="none" stroke="#d99a80" stroke-width="2"/>
  <text x="360" y="286" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#f5ecd4">VOOR</text>
  <text x="360" y="326" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" letter-spacing="2" fill="#f5ecd4">ALEX</text>
  <circle cx="360" cy="300" r="5" fill="#f6ebd4"/></g>
  <g fill="#284f3d" color="#284f3d">${note(560, 200, 0, 'm-float')}${note(590, 330, -2.5, 'm-float')}${note(160, 380, -4, 'm-float')}${note(170, 220, -6, 'm-float')}</g>
  <g class="m-float" style="--d:-3s" fill="#b76e55"><path d="M548 420c-10-14 6-26 14-14 8-12 24 0 14 14l-14 14Z"/></g>
  <g class="m-twinkle" fill="#c9b06a"><path d="m140 290 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/></g><g class="m-twinkle" style="--d:-2s" fill="#c9b06a"><path d="m600 260 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

export const hero = id => street(id);
export const chapter = (i, variant) => i === 1 ? wages() : i === 2 ? wardrobe(variant) : evening();
export const completion = () => record();
export const card = () => street('card');
