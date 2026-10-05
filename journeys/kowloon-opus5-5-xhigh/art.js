// De stad zonder regels artwork: original SVG illustrations of Kowloon Walled City, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'kowloon-opus5-5-xhigh';

// Seeded random numbers keep the city identical on every render: card, hero and screenshots.
const seeded = seed => () => (seed = seed * 16807 % 2147483647) / 2147483647;
const r1 = v => Math.round(v * 10) / 10;

// Neon in the house palette: soft coral, amber and mint instead of bright pink and blue.
const coral = '#eb9e8a', amber = '#f2c879', mint = '#a9d6c0';
const facade = ['#e6d8ba', '#d3c19e', '#dccdac', '#c8b893', '#e0d2b2', '#cbbf9c', '#d8c6a2', '#c2b591', '#e3d5b5', '#cfc5a2'];

// A block of narrow, mismatched buildings with rows of small windows. slabs are [x, width, roof].
// Returns the block's svg and the positions of the windows that should glow.
function towers(slabs, base, { seed = 7, lit = 24, tones = facade, dark = '#5e5847' } = {}) {
  const rand = seeded(seed), cells = [];
  let svg = '';
  slabs.forEach(([x, w, top], i) => {
    const cols = Math.max(1, Math.floor((w - 6) / 13)), left = x + (w - cols * 13 + 5) / 2;
    let holes = '', boxes = '';
    for (let y = top + 12; y < base - 14; y += 18) for (let c = 0; c < cols; c++) {
      if (rand() < .14) continue;
      const wx = r1(left + c * 13);
      holes += `M${wx} ${y}h8v10h-8Z`;
      cells.push([wx, y]);
      if (rand() < .1) boxes += `M${wx} ${y + 11}h8v4h-8Z`;
    }
    svg += `<path d="M${x} ${base}V${top}h${w}V${base}Z" fill="${tones[i % tones.length]}"/><path d="M${x + w - 3} ${base}V${top}h3V${base}Z" fill="#000" opacity=".07"/><path d="M${x} ${top}h${w}v4h${-w}Z" fill="#000" opacity=".13"/><path d="${holes}" fill="${dark}" opacity=".6"/>${boxes && `<path d="${boxes}" fill="#f1ebd8" opacity=".9"/>`}`;
  });
  const glow = [];
  while (glow.length < lit && cells.length) glow.push(cells.splice(Math.floor(rand() * cells.length), 1)[0]);
  return { svg, glow };
}

// A rooftop TV aerial. The hero shakes them when a plane flies over.
const aerial = (x, y, h, w, colour = '#4a5747') => `<path class="antenna" d="M${x} ${y}V${y - h}M${x - w} ${y - h + 4}h${2 * w}M${r1(x - w * .7)} ${y - h + 11}h${r1(w * 1.4)}M${r1(x - w * .45)} ${y - h + 18}h${r1(w * .9)}" stroke="${colour}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`;
const tank = (x, y, w = 18) => `<path d="M${x + 3} ${y}v-6M${x + w - 3} ${y}v-6" stroke="#6e6a58" stroke-width="2"/><rect x="${x}" y="${y - 19}" width="${w}" height="14" rx="4" fill="#a7b9a6"/><path d="M${x} ${y - 13}h${w}" stroke="#8fa38f" stroke-width="2"/>`;

// Washing on a pole: shirts and towels. The hero sways each piece; chapters sway the whole line.
const cloth = (x, y, colour, shirt) => `<path class="cloth" d="${shirt ? `M${x} ${y}h12l3 4-3 2v10h-12v-10l-3-2Z` : `M${x} ${y}h9v15h-9Z`}" fill="${colour}"/>`;
const washing = (x, y, len, colours) => `<path d="M${x} ${y}h${len}" stroke="#6e5a44" stroke-width="2" stroke-linecap="round"/>${colours.map((c, i) => cloth(r1(x + 4 + i * (len - 8) / colours.length), y, c, i % 2 === 1)).join('')}`;

// Neon symbols, drawn around 0,0: a tooth for the dentists, a bowl for the noodle makers, a heart, and three made-up characters.
const glyphs = {
  tooth: 'M-11-8Q-12-15-5-15Q-2-15 0-13Q2-15 5-15Q12-15 11-8Q10 0 8 8Q6 15 4 8L2 1Q0-1-2 1L-4 8Q-6 15-8 8Q-10 0-11-8Z',
  bowl: 'M-13-2H13Q12 11 0 11T-13-2ZM-3-6 7-15M2-6 12-13',
  heart: 'M0 11Q-14 1-12-7Q-9-14 0-7Q9-14 12-7Q14 1 0 11Z',
  a: 'M-8-11H8M0-11V11M-8 0H8M-7 11H7',
  b: 'M-7-11V11M-7-11H7V11M-7 0H7M-7 11H7',
  c: 'M-9-9H9M-4-9V11M4-9V11M-9 3H9',
};
// A neon sign: a soft halo, a dark board and glowing symbols stacked from top to bottom.
const neon = (x, y, w, h, colour, marks, { cls = 'neon', halo = 'neon-glow', delay = 0 } = {}) => {
  const list = [].concat(marks), step = h / list.length, s = r1(Math.min(w, step) / 34);
  return `<g class="${cls}"><rect class="${halo}" style="--d:${delay}s" x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" rx="12" fill="${colour}" fill-opacity=".3"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#253830"/>${list.map((m, i) => `<path transform="translate(${r1(x + w / 2)} ${r1(y + step * (i + .5))}) scale(${s})" d="${glyphs[m]}" fill="none" stroke="${colour}" stroke-width="${r1(2.6 / s)}" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g>`;
};

// A small airliner, nose to the left and wheels down for the airport next door.
const airliner = () => `<path d="M72-1H98L118-14H108Z" fill="#cdc2a4"/><path d="M0 2Q2-8 22-9H150Q166-9 176-2L182 4Q170 9 150 9H22Q3 9 0 2Z" fill="#f4eedd"/><path d="M148-8 164-38H176L174-6Z" fill="#517c67"/><path d="M158 0h24l-5 5h-17Z" fill="#3f6a55"/><path d="M28-2H142" stroke="#9fb5a6" stroke-width="2.5" stroke-dasharray="3 4"/><path d="M7-4h10l-2 4H5Z" fill="#5f7f9b"/><path d="M24 5H150" stroke="#9cac66" stroke-width="2"/><path d="M62 3H102L128 24H112Z" fill="#e4dbc2"/><rect x="72" y="9" width="24" height="9" rx="4.5" fill="#c9bea0"/><path d="M40 9v8M118 12v8" stroke="#5a4332" stroke-width="2"/><circle cx="40" cy="18" r="2.6" fill="#3e4a3e"/><circle cx="118" cy="21" r="2.6" fill="#3e4a3e"/><circle class="beacon" cx="96" cy="-10" r="2.4" fill="#d98b5a"/>`;

// The hero: the whole Walled City at golden hour, seen from outside. Light on the roofs, darkness at the bottom.
function rooftops(id) {
  const p = `${slug}-${id}`;
  const block = towers([[78,38,352],[116,44,322],[160,30,338],[190,52,306],[242,38,318],[280,46,296],[326,34,312],[360,56,300],[416,40,290],[456,36,310],[492,50,298],[542,34,320],[576,44,306],[620,42,336]], 720, { seed: 5, lit: 40 });
  const around = towers([[-6,46,452],[40,38,478],[662,32,468],[694,40,440]], 720, { seed: 9, lit: 4, tones: ['#b9c4a8', '#aebb9f', '#b3bfa4', '#a6b498'] });
  const aerials = [[88,352,30,8],[104,352,20,6],[126,322,40,10],[148,322,26,7],[172,338,34,8],[226,306,44,11],[250,318,26,7],[268,318,38,9],[352,312,32,8],[398,300,46,12],[410,300,26,7],[422,290,24,6],[466,310,36,9],[482,310,20,6],[552,320,40,10],[568,320,24,7],[612,306,34,8],[632,336,28,7],[652,336,42,10]];
  const signs = [[96,560,24,74,coral,['a','b']],[170,606,44,30,amber,'bowl'],[250,548,26,80,mint,['c','a']],[330,592,40,40,coral,'tooth'],[420,556,24,72,amber,['b','c']],[500,584,36,36,mint,'tooth'],[586,562,26,76,coral,['a','c']]];
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van Kowloon Walled City: een enorm blok huizen dicht op elkaar, met antennes, wasgoed en een vlieger op het dak, flikkerende neonborden in de schaduw beneden en een vliegtuig dat laag overvliegt">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#c9d5c3"/><stop offset=".55" stop-color="#e8e2c6"/><stop offset="1" stop-color="#f4e2bd"/></linearGradient><linearGradient id="${p}-shade" x2="0" y2="1"><stop stop-color="#22382e" stop-opacity="0"/><stop offset=".6" stop-color="#22382e" stop-opacity=".82"/><stop offset="1" stop-color="#1c3027" stop-opacity=".96"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="575" cy="212" r="60" fill="#f6dca0" opacity=".45"/>
  <circle cx="575" cy="212" r="60" fill="#f6dca0"/>
  <g class="cloud" fill="#f8f4e2" opacity=".7"><ellipse cx="300" cy="96" rx="110" ry="13"/><ellipse cx="520" cy="118" rx="80" ry="9"/><ellipse cx="610" cy="238" rx="74" ry="8"/><ellipse cx="80" cy="226" rx="90" ry="10"/></g>
  <path d="M0 330Q80 300 150 312Q220 292 300 300Q420 280 520 296Q620 286 720 300V560H0Z" fill="#c4cfb6"/>
  <path class="layer" style="--i:0" d="M0 372Q50 342 96 330Q122 306 140 278Q152 254 172 248Q188 242 198 254Q208 266 226 266Q300 266 356 292Q420 304 470 300Q560 292 720 322V560H0Z" fill="#a9bea6"/>
  <g fill="#bcc8b0"><path d="M600 380V318h18v-12h14v74ZM640 380V300h22v80ZM668 380V326h20v-10h16v64Z"/><path d="M0 400V344h20v56ZM24 400V330h18v-8h12v78Z"/></g>
  <g transform="translate(96 172) rotate(-4) scale(.85)"><g class="plane">${airliner()}</g></g>
  <g class="flock-wrap"><g class="flock">${[[290,232],[304,224],[318,236],[298,246],[324,222]].map(([x, y]) => `<path class="pigeon" d="M${x - 5} ${y - 1}q5-4 5 1q0-5 5-1" stroke="#56705f" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  <g class="layer" style="--i:1">${around.svg}${block.svg}
  ${tank(198, 306)}${tank(370, 300, 20)}${tank(584, 306)}
  <path d="M290 296v-7M314 296v-7" stroke="#6e503b" stroke-width="2.5"/><path d="M286 289V273l16-9 16 9v16Z" fill="#9a7552"/><path d="M284 274l18-11 18 11" stroke="#6e503b" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M291 277h8v6h-8ZM305 277h8v6h-8Z" fill="#4a3a2c"/>
  <path d="M331 312v-7h10v7ZM345 312v-6h9v6Z" fill="#b76e55"/><circle cx="336" cy="300" r="7" fill="#7c9a6a"/><circle cx="349.5" cy="299" r="6" fill="#6b8f63"/>
  <path d="M496 298v-24M540 298v-24" stroke="#6e5a44" stroke-width="2"/><path d="M496 276Q518 284 540 276" stroke="#6e5a44" stroke-width="1.5" fill="none"/>${cloth(500, 278, '#e8c3c0')}${cloth(514, 280, '#f3ecd8', true)}${cloth(530, 278, '#5f7f9b')}
  ${aerials.map(a => aerial(...a)).join('')}
  ${washing(206, 410, 44, ['#f3ecd8', '#b76e55', '#e8c3c0'])}${washing(366, 392, 40, ['#5f7f9b', '#f3ecd8'])}${washing(584, 440, 38, ['#e0b060', '#f3ecd8', '#9cac66'])}${washing(120, 452, 34, ['#f3ecd8', '#5f7f9b'])}${washing(462, 428, 36, ['#e8c3c0', '#f3ecd8'])}
  <path d="M78 470H662V720H78Z" fill="url(#${p}-shade)"/>
  ${[...block.glow, ...around.glow].map(([x, y]) => `<rect class="win" x="${x}" y="${y}" width="8" height="10" fill="#f6d68e"/>`).join('')}
  ${signs.map(([x, y, w, h, c, m]) => `<path d="M${x + w / 2} ${y - 12}v12" stroke="#1d2f27" stroke-width="2"/>${neon(x, y, w, h, c, m)}`).join('')}
  <path d="M78 530Q160 552 250 532T420 538T662 528M78 652Q200 672 330 650T662 660" stroke="#1a2b23" stroke-width="2" fill="none" opacity=".8"/>
  <g class="kite-line"><path d="M449 263Q420 252 372 200" stroke="#6b5b43" stroke-width="1" fill="none"/><g class="kite"><path d="M372 178l15 20-15 24-15-24Z" fill="#b76e55"/><path d="M372 178v44M357 198h30" stroke="#f3ecd8" stroke-width="1.5"/><path d="M372 222q-7 10 0 18t0 18" stroke="#6b5b43" stroke-width="1" fill="none"/><path d="M367 232l5 2 5-2-5-2ZM367 249l5 2 5-2-5-2Z" fill="#e0b060"/></g></g>
  <g><path d="M434 290v-9M441 290v-9" stroke="#3e4a3e" stroke-width="3" stroke-linecap="round"/><path d="M431 282v-12q0-4 4-4h5q4 0 4 4v12Z" fill="#b76e55"/><circle cx="437.5" cy="260" r="5.5" fill="#d9a982"/><path d="M432 259q1-7 6-7t6 6q-5-3-12 1Z" fill="#3e3a32"/><path d="M443 270l6-7" stroke="#d9a982" stroke-width="2.6" stroke-linecap="round"/></g></g>
  <g class="layer" style="--i:2"><path d="M0 692H720V760H0Z" fill="#2c4a3b"/><path d="M0 692H720v8H0Z" fill="#3d604d"/>${signs.map(([x, , w, , c]) => `<ellipse cx="${x + w / 2}" cy="728" rx="${w}" ry="4" fill="${c}" fill-opacity=".22"/>`).join('')}</g>
  </svg>`;
}

// Chapter 2: the same patch of land three times, from a quiet fort to the tower block. The variant buttons are a time-lapse.
const hut = (x, base, w, h, wall, roof, pitched, lit) => `<path d="M${x} ${base}V${base - h}h${w}V${base}Z" fill="${wall}"/>${pitched ? `<path d="M${x - 3} ${base - h}L${x + w / 2} ${base - h - 12}L${x + w + 3} ${base - h}Z" fill="${roof}"/>` : `<path d="M${x - 2} ${base - h}h${w + 4}v-5h${-w - 4}Z" fill="${roof}"/>`}<path d="M${x + w / 2 - 5} ${base - h + 9}h10v9h-10Z" fill="${lit ? '#f4d58d' : '#6d6552'}"${lit ? '' : ' opacity=".6"'}/>`;
const guard = (x, delay) => `<g class="m-bob" style="--d:${delay}s"><path d="M${x - 4} 392v-14h8v14Z" fill="#5f7f9b"/><circle cx="${x}" cy="374" r="4" fill="#d9a982"/><path d="M${x - 7} 372l7-6 7 6Z" fill="#6b5b43"/><path d="M${x + 7} 392V358" stroke="#5a4332" stroke-width="1.5"/></g>`;
const walker = (x, y, shirt, delay) => `<g class="m-bob" style="--d:${delay}s"><path d="M${x - 3} ${y}l2-12M${x + 3} ${y}l-1-12" stroke="#3e4a3e" stroke-width="2.5" stroke-linecap="round"/><path d="M${x - 5} ${y - 11}v-12q0-4 5-4t5 4v12Z" fill="${shirt}"/><circle cx="${x}" cy="${y - 31}" r="4.5" fill="#d9a982"/><circle cx="${x - 8}" cy="${y - 22}" r="7" fill="#c9b48c"/></g>`;

function growth(stage = 'fort') {
  const p = `${slug}-grow`, rand = seeded(21);
  const fort = stage !== 'stad';
  const merlons = Array.from({ length: 21 }, (_, i) => stage === 'huizen' && i % 4 === 2 ? '' : `M${150 + i * 20} 392h12v-9h-12Z`).join('');
  const wall = `<path d="M150 456V392H570V456Z" fill="#b9a27f"/><path d="${merlons}" fill="#b9a27f"/><path d="M150 410H570M150 428H570M150 446H570" stroke="#a68f6c" stroke-width="2" opacity=".6"/>
    <path d="M340 456V432Q360 414 380 432V456Z" fill="#5a4a38"/><path d="M326 392V374H394V392Z" fill="#c9b18b"/><path d="M316 376Q330 372 336 362H384Q390 372 404 376Q360 382 316 376Z" fill="#6b7d68"/>
    <path d="M138 456V372H178V456Z" fill="#c2ab87"/><path d="M130 374 158 356 186 374Z" fill="#6b7d68"/><path d="M542 456V372H582V456Z" fill="#c2ab87"/><path d="M534 374 562 356 590 374Z" fill="#6b7d68"/><path d="M152 388h12v14h-12ZM556 388h12v14h-12Z" fill="#6e5a44"/>`;
  const walls = ['#e3d3b2', '#d2bf9a', '#c9b48c', '#ddd0b4', '#bfae8c', '#d8c7a5'], roofs = ['#8c6a4c', '#b76e55', '#9fb0a0', '#7d6a52', '#a9b3a3'];
  const huts = list => list.map(([x, base, w, h], i) => hut(x, base, w, h, walls[(i * 7 + x) % walls.length], roofs[(i * 3 + x) % roofs.length], rand() < .5, rand() < .3)).join('');
  const scenes = {
    fort: { label: 'Een oud Chinees fort met een stenen muur, een poort, wachters en een paar gebouwen binnen de muren', art: `
      <circle cx="285" cy="370" r="18" fill="#7c9a6a"/><circle cx="398" cy="374" r="15" fill="#6b8f63"/><circle cx="534" cy="380" r="14" fill="#7c9a6a"/>
      <path d="M200 392V368H250V392Z" fill="#d6c39f"/><path d="M194 370 225 354 256 370Z" fill="#8c6a4c"/><path d="M424 392V360H516V392Z" fill="#dccaa6"/><path d="M410 362Q424 358 430 346H510Q516 358 530 362Q470 370 410 362Z" fill="#6b7d68"/><path d="M432 346h76v-5h-76Z" fill="#5b6c58"/><path d="M462 392v-18h16v18Z" fill="#8c6a4c"/>
      <g class="m-sway" style="--d:-1s"><path d="M360 362V312" stroke="#5a4332" stroke-width="2.5"/><path d="M361 313 394 322 361 332Z" fill="#e0b060"/></g>
      ${guard(250, -1)}${guard(470, -4)}${wall}` },
    huizen: { label: 'Binnen de oude fortmuren staan steeds meer huisjes, sommige bovenop elkaar gebouwd, en er komen nog meer mensen aan', art: `
      ${huts([[182,400,34,40],[216,400,40,52],[256,400,30,36],[286,400,42,58],[328,400,36,44],[364,400,44,50],[408,400,34,38],[442,400,46,56],[488,400,38,44],[526,400,26,36]])}
      ${huts([[220,348,32,28],[290,342,34,30],[368,350,36,28],[446,344,38,30],[492,356,30,24],[296,312,24,22],[452,314,26,22]])}
      <g class="m-sway" style="--d:-1s">${washing(254, 332, 34, ['#f3ecd8', '#b76e55', '#5f7f9b'])}</g><g class="m-sway" style="--d:-3s">${washing(408, 344, 30, ['#e8c3c0', '#f3ecd8'])}</g>
      <g fill="#f8f5e5"><circle class="m-steam" cx="196" cy="346" r="6"/><circle class="m-steam" style="--d:-2s" cx="190" cy="332" r="8"/><circle class="m-steam" style="--d:-1s" cx="465" cy="278" r="6"/><circle class="m-steam" style="--d:-3s" cx="460" cy="264" r="8"/></g>
      ${wall}${walker(268, 492, '#b76e55', -1)}${walker(448, 498, '#5f7f9b', -5)}` },
    stad: { label: 'Een enorm blok torenhoge huizen, dicht op elkaar, met duizenden ramen, wasgoed en een bos van antennes op het dak', art: (() => {
      const block = towers([[150,36,176],[186,44,150],[230,30,162],[260,52,128],[312,38,140],[350,46,118],[396,34,134],[430,56,124],[486,38,146],[524,46,168]], 470, { seed: 3, lit: 30 });
      return `${block.svg}
      ${[[166,176,30,8],[204,150,38,10],[244,162,24,6],[280,128,40,10],[330,140,28,7],[372,118,36,9],[412,134,26,7],[452,124,42,11],[500,146,30,8],[544,168,26,7]].map(a => aerial(...a)).join('')}
      <g class="m-sway" style="--d:-2s">${washing(196, 260, 40, ['#f3ecd8', '#b76e55', '#e8c3c0'])}</g><g class="m-sway" style="--d:-4s">${washing(440, 230, 44, ['#5f7f9b', '#f3ecd8', '#e0b060'])}</g>
      <path d="M150 330H570V470H150Z" fill="url(#${p}-shade)"/>
      ${block.glow.map(([x, y], i) => `<rect${i % 3 ? '' : ` class="m-twinkle" style="--d:${-i % 4}s"`} x="${x}" y="${y}" width="8" height="10" fill="#f6d68e"/>`).join('')}
      ${neon(176, 396, 20, 54, coral, ['a', 'b'], { halo: 'm-twinkle', delay: -1 })}${neon(262, 418, 32, 32, mint, 'tooth', { halo: 'm-twinkle', delay: -2.5 })}${neon(356, 400, 20, 56, amber, ['c', 'a'], { halo: 'm-twinkle' })}${neon(452, 420, 36, 28, amber, 'bowl', { halo: 'm-twinkle', delay: -3 })}${neon(520, 398, 20, 54, coral, ['b', 'c'], { halo: 'm-twinkle', delay: -1.8 })}`;
    })() },
  };
  const scene = scenes[stage] ?? scenes.fort;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${scene.label}">
  <defs><clipPath id="${p}-clip"><circle cx="360" cy="300" r="228"/></clipPath><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#cfdac6"/><stop offset="1" stop-color="#f3e7c8"/></linearGradient><linearGradient id="${p}-shade" x2="0" y2="1"><stop stop-color="#22382e" stop-opacity="0"/><stop offset="1" stop-color="#22382e" stop-opacity=".9"/></linearGradient></defs>
  <rect width="720" height="650" fill="#e6dcc5"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="300" r="252" stroke-dasharray="3 9"/></g>
  <g clip-path="url(#${p}-clip)">
  <path d="M0 0H720V650H0Z" fill="url(#${p}-sky)"/>
  <circle cx="474" cy="168" r="34" fill="#f6dca0"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".85"><ellipse cx="250" cy="150" rx="60" ry="10"/><ellipse cx="500" cy="118" rx="50" ry="9"/><ellipse cx="400" cy="230" rx="44" ry="7"/></g>
  <path d="M60 360Q120 330 170 318Q190 292 210 284Q224 278 232 290Q240 300 256 300Q330 300 380 322Q460 334 520 330Q600 324 680 346V470H60Z" fill="#b4c3aa"/>
  <path d="M0 452H720V650H0Z" fill="${fort ? '#a7b57a' : '#6f7f62'}"/>${fort ? '<path d="M340 456 318 540H402L380 456Z" fill="#cdbd94"/>' : '<path d="M0 470H720V650H0Z" fill="#2c4a3b"/>'}
  ${fort ? '<g class="m-float" stroke="#56705f" fill="none" stroke-width="2" stroke-linecap="round"><path d="m226 214 8-5 8 5"/><path d="m252 226 6-4 6 4"/></g>' : ''}
  ${scene.art}
  </g></svg>`;
}

// Chapter 3: inside the maze. A narrow alley that ends at a wall of shops, with only a crack of sky far above.
function alley(variant = 'tandarts') {
  const p = `${slug}-alley`, rand = seeded(29);
  // A point on a side wall: depth t from 0 (right in front of you) to 1 (the far wall), height v from 0 (top) to 1 (floor).
  const at = (side, t, v) => { const top = 150 * t, bottom = 650 - 130 * t; return [r1(side < 0 ? 190 * t : 720 - 190 * t), r1(top + (bottom - top) * v)]; };
  const pt = (...a) => at(...a).join(' ');
  const quad = (side, t1, t2, v1, v2) => `M${pt(side, t1, v1)}L${pt(side, t2, v1)}L${pt(side, t2, v2)}L${pt(side, t1, v2)}Z`;
  const cable = (t1, v1, t2, v2, sag) => { const [x1, y1] = at(-1, t1, v1), [x2, y2] = at(1, t2, v2); return `M${x1} ${y1}Q${r1((x1 + x2) / 2)} ${r1((y1 + y2) / 2 + sag)} ${x2} ${y2}`; };
  const drops = (x, ys) => ys.map((y, i) => `<path class="m-twinkle" style="--d:${-2 + i * .6}s" d="M${x} ${y}q-4 6 0 9q4-3 0-9Z" fill="#cfe0d4"/>`).join('');
  let windows = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const x = 206 + c * 46, y = 166 + r * 42, on = rand() < .35;
    windows += `<rect${on && c % 2 ? ` class="m-twinkle" style="--d:${-r1(rand() * 4)}s"` : ''} x="${x}" y="${y}" width="28" height="24" fill="${on ? '#f2cf86' : '#2c3f35'}"/>`;
    if (rand() < .3) windows += `<path d="M${x + 4} ${y + 26}h20v7h-20Z" fill="#8a9a8a"/>`;
  }
  const shops = {
    tandarts: { sign: [coral, 'tooth'], label: 'met een neonbord in de vorm van een tand boven een tandartspraktijk met een tandartsstoel', art: `
      <path d="M230 378H490V506H230Z" fill="#efe0b8"/><path d="M230 378H490V390H230Z" fill="#d9c79c"/>
      <path d="M246 404h40v52h-40Z" fill="#f8f2df"/><path transform="translate(266 430) scale(.9)" d="${glyphs.tooth}" fill="none" stroke="#b76e55" stroke-width="2.6"/>
      <path d="M356 418 322 494H420L384 418Z" fill="#fffbe8" opacity=".6"/><path d="M330 390v20l36 6" stroke="#7d8a74" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="370" cy="416" rx="16" ry="7" fill="#f7efd6"/>
      <path d="M342 474v22M318 498h50" stroke="#4f6a5b" stroke-width="5" stroke-linecap="round"/><path d="M300 470H384L402 448H418L398 480H300ZM402 448 426 412 438 418 418 452ZM300 470 284 492H296L310 474Z" fill="#5d7a6a"/><path d="M424 402h20v11h-20Z" fill="#4f6a5b"/>
      <path d="M446 462h30v4h-30Z" fill="#9fb5a6"/><path d="M452 462v-6M460 462v-8M468 462v-5" stroke="#7d8a74" stroke-width="2"/>` },
    noedels: { sign: [amber, 'bowl'], label: 'met een neonbord in de vorm van een kom boven een klein noedelfabriekje met rekken vol noedels die hangen te drogen', art: `
      <path d="M230 378H490V506H230Z" fill="#e8d2a2"/>
      <path d="${Array.from({ length: 40 }, (_, i) => `M${244 + i * 6} 394q3 18 0 38M${247 + i * 6} 446q3 16 0 32`).join('')}" stroke="#fbf3dc" stroke-width="2.2" fill="none"/>
      <path d="M236 392H484M236 444H484" stroke="#8c6a4c" stroke-width="4" stroke-linecap="round"/>
      <path d="M250 478h70v24h-70Z" fill="#6e7f72"/><path d="M244 474h82v6h-82Z" fill="#7d8f80"/>
      <g fill="#fffdf0"><circle class="m-steam" cx="272" cy="462" r="7"/><circle class="m-steam" style="--d:-1.7s" cx="290" cy="450" r="9"/><circle class="m-steam" style="--d:-3.3s" cx="276" cy="438" r="8"/></g>
      <path d="M420 504q-4-30 14-32q18 2 14 32ZM446 504q-2-22 12-24q14 2 12 24Z" fill="#efe6cf"/>` },
    buren: { sign: [mint, 'heart'], label: 'waar buren elkaar een mandje met soep aangeven tussen de ramen en een familie samen eet', art: `
      <path d="M230 378H490V432H230Z" fill="#6f8676"/><path d="M230 388H490M230 398H490M230 408H490M230 418H490M230 428H490" stroke="#5d7365" stroke-width="2"/>
      <path d="M230 432H490V506H230Z" fill="#efe0b8"/>
      <path d="M286 506v-26q0-10 14-10t14 10v26ZM346 506v-30q0-10 14-10t14 10v30ZM408 506v-20q0-9 12-9t12 9v20Z" fill="#5d7a6a"/><circle cx="300" cy="460" r="9" fill="#5d7a6a"/><circle cx="360" cy="456" r="9" fill="#5d7a6a"/><circle cx="420" cy="469" r="7.5" fill="#5d7a6a"/>
      <path d="M318 486h84v6h-84Z" fill="#8c6a4c"/><path d="M330 492v14M390 492v14" stroke="#8c6a4c" stroke-width="4"/><path d="M334 486q8 8 16 0ZM368 486q8 8 16 0Z" fill="#f7f1de"/>
      <g class="m-sway"><path d="M222 362v8" stroke="#15241d" stroke-width="2"/><ellipse cx="222" cy="382" rx="8" ry="11" fill="#d98b5a"/></g>
      <path d="M236 362v-8h12v8ZM470 362v-9h14v9Z" fill="#b76e55"/><circle cx="242" cy="348" r="8" fill="#7c9a6a"/><circle cx="477" cy="346" r="9" fill="#6b8f63"/>
      <path d="${quad(-1, .55, .75, .3, .45)}${quad(1, .5, .7, .28, .43)}" fill="#f2cf86"/>
      <circle cx="124" cy="282" r="10" fill="#d9a982"/><path d="M114 282q0-14 10-14t10 12q-10-6-20 2Z" fill="#3e3a32"/><path d="M118 310v-14q0-6 6-6t6 6v14Z" fill="#b76e55"/>
      <circle cx="606" cy="268" r="10" fill="#c99872"/><path d="M596 266q2-12 10-12t10 12q-6-5-20 0Z" fill="#e6e0cc"/><path d="M600 296v-14q0-6 6-6t6 6v14Z" fill="#5f7f9b"/>
      <path d="M142 262Q365 360 587 256" stroke="#c9b48c" stroke-width="1.5" fill="none"/>
      <g class="m-sway" style="--d:-2s"><circle cx="365" cy="310" r="4" fill="#8c6a4c"/><path d="M365 310 345 336M365 310 385 336" stroke="#c9b48c" stroke-width="1.5"/><path d="M352 328h26v9h-26Z" fill="#6e7f72"/><path d="M343 336h44l-5 22h-34Z" fill="#b98b62"/><path d="M346 344h38M348 351h34" stroke="#9a7552" stroke-width="2"/>
      <g fill="none" stroke="#fffdf0" stroke-width="3" stroke-linecap="round"><path class="m-steam" d="M360 324q-6-8 0-16"/><path class="m-steam" style="--d:-2.5s" d="M370 322q-6-8 0-16"/></g></g>` },
  };
  const shop = shops[variant] ?? shops.tandarts;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een donker steegje vol kabels en druppende leidingen, ${shop.label}">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#f6ecd0"/><stop offset="1" stop-color="#c9d6c0"/></linearGradient></defs>
  <rect width="720" height="650" fill="#22362d"/>
  <path d="M0 0H720L530 150H190Z" fill="#1f322a"/>
  <path d="M336 0H390L380 60L386 150H346L352 64Z" fill="#f3e7c4" opacity=".12"/><path d="M348 0H378L368 60L374 150H356L360 64Z" fill="url(#${p}-sky)"/>
  <path d="M0 36H118V84H0ZM720 56H604V100H720Z" fill="#2b4237"/><path d="M14 36V84M30 36V84M46 36V84M62 36V84M78 36V84M94 36V84M706 56V100M690 56V100M674 56V100M658 56V100M642 56V100M626 56V100" stroke="#1f322a" stroke-width="2"/>
  <path d="M130 96h26v18h-26ZM560 112h28v16h-28Z" fill="#8a9a8a"/>
  <g class="m-sway" style="--d:-3s"><path d="M270 40V96" stroke="#15241d" stroke-width="1.5"/><path d="M256 122V104Q270 88 284 104V122Z" fill="#b98b62"/><path d="M262 104V122M270 98V122M278 104V122" stroke="#8c6a4c" stroke-width="1.5"/><circle cx="270" cy="115" r="4" fill="#e0b060"/><path d="M254 122h32v4h-32Z" fill="#8c6a4c"/></g>
  <path d="${quad(-1, 0, 1, 0, 1)}" fill="#455f50"/><path d="${quad(1, 0, 1, 0, 1)}" fill="#3d5648"/>
  <path d="${quad(-1, .05, .28, .32, .62)}${quad(-1, .6, .9, .55, .9)}" fill="#506a5a"/><path d="${quad(1, .1, .4, .1, .4)}${quad(1, .62, .95, .5, .85)}" fill="#476152"/>
  <path d="M190 150H530V520H190Z" fill="#577060"/>${windows}
  <path d="M214 362H506V520H214Z" fill="#33493d"/>${shop.art}
  <path d="M0 650 190 520H530L720 650Z" fill="#26392f"/><path d="M330 520 300 650H420L390 520Z" fill="#3b5446" opacity=".4"/>
  <path d="${quad(-1, .3, .45, .55, 1)}${quad(1, .15, .32, .52, 1)}" fill="#24352c"/><path d="${quad(-1, .12, .26, .1, .26)}${quad(1, .35, .45, .12, .24)}" fill="#2c3f35"/>
  <path class="m-twinkle" style="--d:-1.5s" d="${quad(-1, .8, .92, .2, .36)}${quad(1, .78, .9, .15, .3)}" fill="#e8c37c"/>
  <path d="${quad(1, .55, .62, .6, .66)}" fill="#8a9a8a"/>
  <path d="${quad(-1, 0, 1, .17, .185)}${quad(1, 0, 1, .22, .235)}" fill="#7f9080"/><path d="${quad(-1, 0, 1, .66, .672)}" fill="#6f8070"/><path d="M${pt(-1, .42, .05)}L${pt(-1, .42, .95)}" stroke="#7f9080" stroke-width="5"/>
  ${drops(42, [158, 300, 460])}${drops(663, [196, 330, 480])}
  <ellipse class="m-twinkle" cx="48" cy="630" rx="16" ry="3" fill="#cfe0d4" fill-opacity=".5"/><ellipse class="m-twinkle" style="--d:-2s" cx="656" cy="628" rx="16" ry="3" fill="#cfe0d4" fill-opacity=".5"/>
  <path d="M0 190H36" stroke="#15241d" stroke-width="4"/>${neon(36, 150, 80, 80, shop.sign[0], shop.sign[1], { halo: 'm-twinkle' })}
  ${neon(632, 196, 34, 100, amber, ['b', 'a', 'c'], { halo: 'm-twinkle', delay: -2 })}${neon(156, 320, 18, 50, mint, ['c', 'a'], { halo: 'm-twinkle', delay: -1 })}${neon(548, 330, 18, 50, coral, ['a', 'b'], { halo: 'm-twinkle', delay: -3 })}${neon(220, 186, 14, 36, amber, 'b', { halo: 'm-twinkle', delay: -.5 })}${neon(488, 190, 14, 36, mint, 'a', { halo: 'm-twinkle', delay: -2.5 })}
  <path d="M666 246H720" stroke="#15241d" stroke-width="4"/>
  <path d="${[[.05, .08, .1, .06, 50], [.2, .1, .25, .12, 30], [.35, .06, .3, .1, 45], [.5, .14, .55, .12, 25], [.65, .1, .7, .08, 20], [.1, .2, .4, .18, 60], [.45, .22, .15, .2, 50], [.8, .12, .85, .14, 14], [.02, .28, .2, .3, 40]].map(c => cable(...c)).join('')}" stroke="#14231c" stroke-width="2.6" fill="none"/>
  <path d="M8 96q22 70 54 16M18 100q16 46 40 8M700 120q-20 60-50 10" stroke="#14231c" stroke-width="2" fill="none"/>
  <g fill-opacity=".22"><ellipse cx="80" cy="626" rx="34" ry="5" fill="${shop.sign[0]}"/><ellipse cx="646" cy="624" rx="22" ry="4" fill="${amber}"/><ellipse cx="165" cy="580" rx="12" ry="3" fill="${mint}"/><ellipse cx="557" cy="582" rx="12" ry="3" fill="${coral}"/></g>
  <path d="M575 612q-4-26 10-34l-2-10 6 6h6l6-6-1 10q12 8 8 34Z" fill="#162720"/><circle cx="587" cy="584" r="1.6" fill="#f2c879"/><circle cx="595" cy="584" r="1.6" fill="#f2c879"/><path class="m-sway" d="M606 608q22 2 18-18" stroke="#162720" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// Chapter 4: the cyberpunk city as a game screen. High tech in the sky, low life down in the streets.
function cyber() {
  const p = `${slug}-cyber`;
  const low = towers([[96,54,388],[150,40,360],[190,26,380],[216,44,350],[260,34,372],[294,48,344],[342,30,366],[372,42,352],[414,36,376],[450,46,348],[496,30,370],[526,44,356],[570,50,382]], 540, { seed: 13, lit: 30, tones: ['#7f735b', '#8b7f65', '#746a55', '#857a62', '#6f6652'], dark: '#2d2a22' });
  const high = [[120,46,170],[166,30,220],[196,54,120],[250,36,190],[286,60,96],[346,40,160],[386,50,130],[436,34,200],[470,58,110],[528,40,180],[568,52,150]];
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gamescherm met een cyberpunk-stad: glimmende torens, vliegende auto’s en een zwevende vis van licht bovenin, en rommelige huisjes vol neonborden en het bord LOW LIFE beneden">
  <defs><clipPath id="${p}-screen"><rect x="100" y="70" width="520" height="460" rx="30"/></clipPath><linearGradient id="${p}-night" x2="0" y2="1"><stop stop-color="#1f3a30"/><stop offset="1" stop-color="#43695a"/></linearGradient><linearGradient id="${p}-shade" x2="0" y2="1"><stop stop-color="#1b2f26" stop-opacity="0"/><stop offset="1" stop-color="#1b2f26" stop-opacity=".9"/></linearGradient><pattern id="${p}-scan" width="8" height="6" patternUnits="userSpaceOnUse"><path d="M0 .5H8" stroke="#000" stroke-opacity=".1"/></pattern></defs>
  <rect width="720" height="650" fill="#e3dcc8"/><circle cx="360" cy="300" r="225" fill="#efe8d6"/>
  <ellipse cx="360" cy="566" rx="250" ry="16" fill="#775e48" opacity=".14"/>
  <rect x="84" y="54" width="552" height="492" rx="44" fill="#c9bea4"/><rect x="92" y="62" width="536" height="476" rx="38" fill="#d8cdb3"/>
  <g clip-path="url(#${p}-screen)">
  <path d="M100 70H620V530H100Z" fill="url(#${p}-night)"/>
  <g fill="#f3ead0">${[[140,110,1.4,0],[190,150,1,-1],[236,100,1.2,-2],[330,124,1,-3],[410,96,1.4,-.5],[456,140,1,-1.5],[590,110,1.2,-2.5],[600,200,1,-3.5],[150,220,1,-1.2]].map(([x, y, r, d]) => `<circle class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
  <circle cx="530" cy="136" r="40" fill="#efe6c8" opacity=".12"/><circle cx="530" cy="136" r="24" fill="#efe6c8"/>
  ${high.map(([x, w, top], i) => `<path d="M${x} 540V${top + 14}L${x + w} ${top}V540Z" fill="${['#35604a', '#2f5644', '#3f6b55'][i % 3]}"/><path d="M${r1(x + w * .3)} ${top + 26}V540M${r1(x + w * .7)} ${top + 22}V540" stroke="${mint}" stroke-width="1.5" opacity=".35"${i % 3 === 1 ? ` class="m-twinkle" style="--d:${-i}s"` : ''}/>`).join('')}
  <path d="M316 96V58" stroke="#2f5644" stroke-width="3"/><circle class="m-twinkle" cx="316" cy="56" r="3.5" fill="${coral}"/>
  <g transform="translate(236 214) rotate(-8)"><g class="m-float" style="--d:-2s">
  <path d="M-48 0-80-22Q-70 0-80 22Z" fill="${mint}" fill-opacity=".35"/><path d="M-50 0Q-20-24 30-17Q58-10 64 0Q58 10 30 17Q-20 24-50 0Z" fill="${mint}" fill-opacity=".3"/><path d="M10-16 0-36 28-18ZM14 16 4 32 30 17Z" fill="${mint}" fill-opacity=".45"/>
  <path d="M-30-6q8 6 0 12M-12-9q9 9 0 18M6-11q10 11 0 22" stroke="#d4efe2" stroke-width="1.5" fill="none" opacity=".7"/><circle cx="46" cy="-3" r="2.6" fill="#e8f7ef"/>
  <path d="M-70-8H60M-60 0H64M-66 8H58" stroke="#e8f7ef" stroke-width="1" opacity=".25"/></g></g>
  <g class="m-float" style="--d:-5s"><rect x="390" y="152" width="100" height="30" rx="7" fill="${mint}" fill-opacity=".5"/><rect x="393" y="155" width="94" height="24" rx="5" fill="#2a4a3c"/><text x="440" y="172" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#d4efe2">HIGH TECH</text></g>
  ${[[172, 262, 1, 0], [480, 300, -1, -9]].map(([x, y, dir, d]) => `<g transform="translate(${x} ${y}) scale(${dir} 1)"><g class="m-drift" style="--d:${d}s"><path d="M-22 0H-80" stroke="${coral}" stroke-width="2" opacity=".35"/><path d="M24-2 74-12V8Z" fill="${amber}" opacity=".2"/><path d="M-20 0Q-18-8-6-9H12Q22-8 24 0Q22 5 12 5H-14Q-20 5-20 0Z" fill="#cfc4a6"/><path d="M-6-7H10L14-1H-9Z" fill="#5f7f9b"/><circle cx="-18" cy="0" r="2" fill="${coral}"/><path d="M-12 6h8M6 6h8" stroke="${mint}" stroke-width="2" opacity=".6"/></g></g>`).join('')}
  ${low.svg}
  <g class="m-sway" style="--d:-1s">${washing(222, 400, 36, ['#f3ecd8', '#b76e55', '#e8c3c0'])}</g><g class="m-sway" style="--d:-3s">${washing(456, 392, 34, ['#5f7f9b', '#f3ecd8'])}</g>
  <path d="M100 420H620V540H100Z" fill="url(#${p}-shade)"/>
  ${low.glow.map(([x, y], i) => `<rect${i % 2 ? ` class="m-twinkle" style="--d:${-i % 4}s"` : ''} x="${x}" y="${y}" width="8" height="10" fill="${['#f6d68e', '#f6d68e', '#f3c1b3', '#cdeedd'][i % 4]}"/>`).join('')}
  ${neon(154, 404, 22, 58, coral, ['a', 'b'], { halo: 'm-twinkle', delay: -1 })}${neon(232, 430, 34, 34, mint, 'tooth', { halo: 'm-twinkle', delay: -2 })}${neon(312, 408, 22, 56, amber, ['c', 'a'], { halo: 'm-twinkle' })}${neon(510, 420, 36, 30, amber, 'bowl', { halo: 'm-twinkle', delay: -3 })}${neon(572, 400, 22, 58, mint, ['b', 'c'], { halo: 'm-twinkle', delay: -1.5 })}
  <rect class="m-twinkle" style="--d:-.7s" x="373" y="441" width="118" height="44" rx="12" fill="${coral}" fill-opacity=".3"/><rect x="380" y="448" width="104" height="30" rx="5" fill="#253830"/><text x="432" y="468" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="#f6c8bb">LOW LIFE</text>
  <path d="M100 390Q200 412 300 392T480 398T620 388M100 470Q240 492 360 474T620 480" stroke="#14231c" stroke-width="2" fill="none" opacity=".8"/>
  <path d="M100 506H620V530H100Z" fill="#1d3128"/><g fill-opacity=".25"><ellipse cx="165" cy="516" rx="20" ry="3" fill="${coral}"/><ellipse cx="249" cy="518" rx="18" ry="3" fill="${mint}"/><ellipse cx="432" cy="518" rx="44" ry="3" fill="${coral}"/><ellipse cx="528" cy="516" rx="18" ry="3" fill="${amber}"/></g>
  <g fill="#e8efe8" opacity=".5"><circle class="m-steam" cx="300" cy="508" r="7"/><circle class="m-steam" style="--d:-1.6s" cx="292" cy="494" r="9"/><circle class="m-steam" style="--d:-3.2s" cx="302" cy="478" r="11"/></g>
  <g fill="${coral}">${[132, 152, 172].map(x => `<path transform="translate(${x} 98) scale(.6)" d="${glyphs.heart}"/>`).join('')}</g>
  <path d="M100 70H620V530H100Z" fill="url(#${p}-scan)"/><path d="M100 70H300L180 530H100Z" fill="#fff" opacity=".04"/>
  </g>
  </svg>`;
}

// Chapter 5: the quiet park of today. The pond reflects not the trees, but the old city that still lives on.
function park() {
  const p = `${slug}-park`;
  const old = towers([[150,30,228],[180,40,206],[220,28,220],[248,46,196],[294,34,210],[328,48,190],[376,32,204],[408,50,194],[458,34,212],[492,44,200],[536,40,224]], 352, { seed: 17, lit: 26, tones: ['#5f7f6f', '#6b8a7a', '#557566', '#668575'], dark: '#2f463b' });
  const pond = 'M110 356Q360 340 610 356Q640 420 600 470Q360 500 120 470Q80 420 110 356Z';
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een rustig park met een paviljoen, bomen en een vijver met vissen. In de weerspiegeling van het water zie je de oude ommuurde stad met lichtjes, en een kind aan de rand kijkt ernaar">
  <defs><clipPath id="${p}-clip"><circle cx="360" cy="300" r="228"/></clipPath><clipPath id="${p}-pond"><path d="${pond}"/></clipPath><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d3dfcc"/><stop offset="1" stop-color="#f2ead2"/></linearGradient></defs>
  <rect width="720" height="650" fill="#e2e4c8"/>
  <g fill="none" stroke="#a3ae83" opacity=".5"><circle cx="360" cy="300" r="252" stroke-dasharray="3 9"/></g>
  <g clip-path="url(#${p}-clip)">
  <path d="M0 0H720V650H0Z" fill="url(#${p}-sky)"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".85"><ellipse cx="260" cy="140" rx="64" ry="10"/><ellipse cx="470" cy="112" rx="50" ry="8"/></g>
  <path d="M120 330V282h20v-14h14v62ZM160 330V260h26v70ZM520 330V270h22v60ZM548 330V250h18v-10h14v90ZM586 330V286h24v44Z" fill="#cdd6c4"/>
  <path d="M60 330Q120 300 170 296Q190 268 210 262Q224 256 232 268Q240 278 256 280Q330 282 380 304Q460 312 520 312Q600 306 680 326V380H60Z" fill="#b7c6ad"/>
  <path d="M100 352Q140 318 190 330Q240 310 300 330Q360 314 420 332Q480 316 540 334Q590 320 640 352Z" fill="#8fac85"/>
  <path d="M174 352V300" stroke="#6e503b" stroke-width="8"/><circle cx="176" cy="282" r="44" fill="#6b8f63"/><circle cx="150" cy="300" r="26" fill="#7c9a6a"/><path d="M262 352v-30" stroke="#6e503b" stroke-width="6"/><circle cx="262" cy="312" r="26" fill="#7c9a6a"/><path d="M608 352v-40" stroke="#6e503b" stroke-width="7"/><circle cx="606" cy="300" r="36" fill="#6b8f63"/>
  <path d="M462 346h104v-8H462Z" fill="#c8b38f"/><path d="M474 338v-46M500 338v-46M526 338v-46M552 338v-46" stroke="#b76e55" stroke-width="5"/><path d="M468 322h92" stroke="#b76e55" stroke-width="3"/><path d="M452 294Q474 290 482 272H546Q554 290 576 294Q514 302 452 294Z" fill="#517c67"/><path d="M490 272h48l-6-8h-36Z" fill="#45705b"/><path d="M512 264l2-12 2 12Z" fill="#b76e55"/>
  <path d="M100 360Q360 342 620 360L612 352Q360 336 108 352Z" fill="#9cac66"/>
  <path d="${pond}" fill="#93b3a2"/>
  <g clip-path="url(#${p}-pond)"><g transform="matrix(1 0 0 -1 0 704)" opacity=".7">${old.svg}${old.glow.map(([x, y], i) => `<rect class="m-twinkle" style="--d:${-(i % 5) * .8}s" x="${x}" y="${y}" width="8" height="10" fill="#f6d68e"/>`).join('')}</g>
  <path d="${pond}" fill="#9dbcab" opacity=".2"/>
  <g class="m-drift" stroke="#e1ede5" stroke-width="2" opacity=".6" fill="none" stroke-linecap="round"><path d="M180 396h40M300 428h60M450 404h50M380 458h40M230 450h30"/></g>
  <g class="m-drift" style="--d:-6s"><path d="M250 420q14-8 28 0q-14 8-28 0Zm28 0 8-5v10Z" fill="#d98b5a"/></g><g class="m-drift" style="--d:-13s"><path d="M470 444q-12-7-24 0q12 7 24 0Zm-24 0-7-4v8Z" fill="#f3ecd8"/><circle cx="462" cy="443" r="2.5" fill="#d98b5a"/></g>
  </g>
  <g fill="#6f9463"><path d="M170 380a14 7 0 1 0 1 0l-1 7Z"/><path d="M540 430a16 8 0 1 0 1 0l-1 8Z"/><path d="M200 452a12 6 0 1 0 1 0l-1 6Z"/></g><circle cx="540" cy="434" r="6" fill="#e8c3c0"/><circle cx="540" cy="434" r="2.5" fill="#f2c879"/>
  <path d="M0 474Q360 504 720 474V650H0Z" fill="#7c9a6a"/><g fill="#d8cdb3"><ellipse cx="150" cy="480" rx="18" ry="6"/><ellipse cx="420" cy="490" rx="22" ry="6"/><ellipse cx="560" cy="482" rx="16" ry="5"/></g>
  <path d="M232 514h44v-10h-44Z" fill="#c8bda0"/>
  <ellipse class="m-twinkle" cx="254" cy="472" rx="22" ry="12" fill="${mint}" fill-opacity=".4"/>
  <path d="M238 506v-26q0-10 16-10t16 10v26Z" fill="#b76e55"/><circle cx="254" cy="458" r="11" fill="#5a4332"/><path d="M236 484q-6 8 2 14M272 484q6 8-2 14" stroke="#b76e55" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g></svg>`;
}

// The closing picture: papa and Alex on a rooftop at dusk, under a neon sign that glows just for Alex.
function rooftopNight() {
  const p = `${slug}-night`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Papa en Alex zitten samen op een bankje op het dak in de avond en kijken naar een neonbord met de naam ALEX en een hartje">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#243f33"/><stop offset=".55" stop-color="#3f6650"/><stop offset="1" stop-color="#d9b98a"/></linearGradient></defs>
  <path d="M0 0H720V650H0Z" fill="url(#${p}-sky)"/>
  <g fill="#f3ead0">${[[120,120,1.6,0],[200,80,1.2,-1],[260,150,1,-2],[380,70,1.4,-3],[440,140,1,-.5],[620,90,1.4,-1.5],[660,180,1,-2.5],[80,200,1.2,-3.5],[330,190,1,-1.2],[560,210,1,-2.2]].map(([x, y, r, d]) => `<circle class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
  <circle cx="548" cy="128" r="44" fill="#f3ead0" opacity=".14"/><circle cx="548" cy="128" r="26" fill="#f3ead0"/>
  <g class="m-drift"><g transform="translate(130 176) rotate(-4) scale(.34)">${airliner()}</g></g>
  <path d="M0 440V380h40v-20h30v80ZM80 440V350h44v90ZM132 440V390h36v50ZM540 440V360h40v80ZM588 440V330h30v-14h20v124ZM646 440V376h74v64Z" fill="#2c4a3b"/>
  <g fill="#f2cf86">${[[14,396],[52,372],[92,366],[104,392],[146,404],[552,378],[600,346],[612,380],[662,392],[690,410]].map(([x, y], i) => `<rect${i % 2 ? ` class="m-twinkle" style="--d:${-i * .7}s"` : ''} x="${x}" y="${y}" width="7" height="9"/>`).join('')}</g>
  <path d="M0 432H720V452H0Z" fill="#5d7563"/><path d="M0 452H720V650H0Z" fill="#4a6455"/>
  <path d="M40 260Q360 340 680 250" stroke="#2c3f35" stroke-width="1.5" fill="none"/>
  ${Array.from({ length: 11 }, (_, i) => { const t = (i + .5) / 11, x = r1(40 + 640 * t), y = r1((1 - t) ** 2 * 260 + 2 * (1 - t) * t * 340 + t * t * 250); return `<circle class="m-twinkle" style="--d:${-i * .45}s" cx="${x}" cy="${y + 5}" r="5" fill="${[amber, coral, mint][i % 3]}"/>`; }).join('')}
  ${aerial(70, 432, 90, 18, '#2c3f35')}${aerial(640, 432, 110, 20, '#2c3f35')}
  <path d="M232 452V328M488 452V328" stroke="#33493d" stroke-width="7"/>
  <rect x="180" y="204" width="360" height="134" rx="14" fill="#253830"/>
  <text class="m-twinkle" x="330" y="300" text-anchor="middle" font-family="sans-serif" font-size="78" font-weight="700" letter-spacing="8" fill="none" stroke="${coral}" stroke-width="12" stroke-opacity=".35" stroke-linejoin="round">ALEX</text>
  <text x="330" y="300" text-anchor="middle" font-family="sans-serif" font-size="78" font-weight="700" letter-spacing="8" fill="#fde5da">ALEX</text>
  <path class="m-twinkle" style="--d:-2s" transform="translate(482 268) scale(1.7)" d="${glyphs.heart}" fill="none" stroke="${amber}" stroke-width="7" stroke-opacity=".35"/><path transform="translate(482 268) scale(1.7)" d="${glyphs.heart}" fill="none" stroke="#fbe2a8" stroke-width="2.2"/>
  <path d="M240 548h244v10H240Z" fill="#8c6a4c"/><path d="M252 558v30M472 558v30" stroke="#6e503b" stroke-width="6"/>
  <path d="M290 548v-50q0-20 32-20t32 20v50Z" fill="#d9c7a3"/><circle cx="322" cy="458" r="19" fill="#3e3a32"/>
  <path d="M394 548v-34q0-15 21-15t21 15v34Z" fill="#b76e55"/><circle cx="415" cy="484" r="14" fill="#5a4332"/>
  <path d="M348 500Q384 488 428 500" stroke="#d9c7a3" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${[[258, '#e8c98a'], [452, '#d9c3a8']].map(([x, c]) => `<path d="M${x} 548l2-22h16l2 22Z" fill="${c}"/><path d="M${x + 1} 526h18" stroke="#f3ecd8" stroke-width="3"/><path d="M${x + 12} 526l4-12" stroke="#b76e55" stroke-width="2.5"/><g fill="#5a4332"><circle cx="${x + 6}" cy="543" r="2"/><circle cx="${x + 11}" cy="545" r="2"/><circle cx="${x + 15}" cy="542" r="2"/></g>`).join('')}
  </svg>`;
}

export const hero = id => rooftops(id);
export const chapter = (i, variant) => i === 1 ? growth(variant) : i === 2 ? alley(variant) : i === 3 ? cyber() : park();
export const completion = () => rooftopNight();
export const card = () => rooftops('card');
