// Aletta Jacobs artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'aletta-jacobs';

// A cream-framed window with four panes; cx is the centre, y the top edge.
const win = (cx, y, lit) => `<path d="M${cx - 10} ${y}h20v28h-20Z" fill="#f4ecd8"/><path d="M${cx - 7} ${y + 3}h14v22h-14Z" fill="${lit ? '#ecd9a0' : '#9fb3a6'}"/><path d="M${cx} ${y + 3}v22M${cx - 7} ${y + 14}h14" stroke="#f4ecd8" stroke-width="2"/>`;
const tallWin = (cx, y) => `<path d="M${cx - 12} ${y}h24v34h-24Z" fill="#f4ecd8"/><path d="M${cx - 9} ${y + 3}h18v28h-18Z" fill="#9fb3a6"/><path d="M${cx} ${y + 3}v28M${cx - 9} ${y + 16}h18" stroke="#f4ecd8" stroke-width="2"/>`;

// A Groningen brick house with a step gable; x is the left edge, base the quay line.
// skip ('row-col') leaves out one upper window, for example to make room for a sign.
const stepHouse = (x, base, w, h, brick, n, skip = '') => {
  const s = +(w / (2 * n + 1)).toFixed(2), t = 14;
  const gable = `M0 0V${-h}${`v${-t}h${s}`.repeat(n)}v${-t}h${s}v${t}${`h${s}v${t}`.repeat(n)}V0Z`;
  const cols = w > 100 ? 3 : 2, cw = w / cols, door = cols === 3 ? 1 : 0;
  const rows = [];
  for (let y = 16 - h; y < -70; y += 46) rows.push(y);
  const upper = rows.flatMap((y, r) => Array.from({ length: cols }, (_, c) => skip === `${r}-${c}` ? '' : win(cw * (c + .5), y, (r + c + n) % 3 === 0))).join('');
  const ground = Array.from({ length: cols }, (_, c) => c === door ? '' : win(cw * (c + .5), -56, false)).join('');
  const dx = cw * (door + .5);
  return `<g transform="translate(${x} ${base})"><path d="${gable}" fill="${brick}"/><path d="M0 ${-h}h${w}" stroke="#f1e6cc" stroke-width="3" opacity=".7"/>
  <circle cx="${w / 2}" cy="${-h - n * t * .55}" r="6" fill="#f4ecd8"/>${upper}${ground}
  <path d="M${dx - 11} 0V-38q11-8 22 0V0Z" fill="#3f6b52"/><path d="M${dx - 15} 0h30v-4h-30Z" fill="#e2d8c2"/></g>`;
};

// A tall Amsterdam canal house with a neck gable; x is the left edge, base the quay line.
const neckHouse = (x, base, w, h, brick) => {
  const nw = w * .44, l = (w - nw) / 2, g = 48, top = -h;
  const outline = `M0 0V${top}Q${l * .6} ${top} ${l} ${top - g * .5}V${top - g}Q${w / 2} ${top - g - 18} ${l + nw} ${top - g}V${top - g * .5}Q${w - l * .6} ${top} ${w} ${top}V0Z`;
  const cols = w > 120 ? 3 : 2, cw = w / cols, door = cols === 3 ? 1 : 0;
  const rows = [];
  for (let y = top + 18; y < -96; y += 54) rows.push(y);
  const upper = rows.flatMap(y => Array.from({ length: cols }, (_, c) => tallWin(cw * (c + .5), y))).join('');
  const ground = Array.from({ length: cols }, (_, c) => c === door ? '' : tallWin(cw * (c + .5), -62)).join('');
  const dx = cw * (door + .5);
  return `<g transform="translate(${x} ${base})"><path d="${outline}" fill="${brick}"/><path d="M${w / 2 - 8} ${top - g + 8}h16v20h-16Z" fill="#f4ecd8"/><path d="M${w / 2 - 6} ${top - g + 10}h12v16h-12Z" fill="#9fb3a6"/>
  ${upper}${ground}<path d="M${dx - 13} 0V-46q13-10 26 0V0Z" fill="#3f6b52"/><path d="M${dx - 18} 0h36v-5h-36Z" fill="#e2d8c2"/></g>`;
};

// A woman in a long dress; x is the centre, base the feet. extra adds a hat, a baby or a sash.
const woman = (x, base, skin, dress, shawl, hair, s = 1, d = 0, extra = '') => `<g class="m-bob" style="--d:${d}s"><g transform="translate(${x} ${base}) scale(${s})">
  <path d="M-22 0L-13 -58H13L22 0Z" fill="${dress}"/><path d="M-14 -56Q-15 -88 0 -90Q15 -88 14 -56Z" fill="${dress}"/>
  <path d="M-17 -82Q0 -66 17 -82L14 -60Q0 -52 -14 -60Z" fill="${shawl}"/>
  <path d="M-4 -94h8v6h-8Z" fill="${skin}"/><circle cy="-103" r="11" fill="${skin}"/>
  <path d="M-12 -103Q-12 -117 0 -117Q12 -117 12 -103Q6 -110 0 -110Q-6 -110 -12 -103Z" fill="${hair}"/>${extra}</g></g>`;
const hat = (c, flower) => `<ellipse cy="-112" rx="20" ry="4.5" fill="${c}"/><path d="M-10 -112Q-10 -126 0 -126Q10 -126 10 -112Z" fill="${c}"/><circle cx="8" cy="-117" r="3.5" fill="${flower}"/>`;
const sash = '<path d="M-12 -86L12 -60" stroke="#f5ecd4" stroke-width="5"/>';
const baby = '<ellipse cx="6" cy="-70" rx="12" ry="8" fill="#f5efe0"/><circle cx="15" cy="-75" r="5" fill="#f0cfae"/>';

function village(id) {
  const p = `${slug}-${id}`;
  const sails = [0, 90, 180, 270].map(a => `<g transform="rotate(${a})"><path d="M-2.5 0V-96h5V0Z" fill="#4a3f36"/><path d="M3 -22h17v-72H3Z" fill="#efe4c8"/><path d="M3 -40h17M3 -58h17M3 -76h17M11 -22v-72" stroke="#b9a983" stroke-width="1.5"/></g>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een Gronings dorp aan de vaart: bakstenen huizen met trapgevels, het huis van de dokter, een molen, een zeilschip op het water en Aletta met een boek in haar handen">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d9dfc8"/><stop offset="1" stop-color="#f3e9cf"/></linearGradient><linearGradient id="${p}-water" x2="0" y2="1"><stop stop-color="#8aa894"/><stop offset="1" stop-color="#5d8876"/></linearGradient><clipPath id="${p}-waterclip"><path d="M0 502H720V612H0Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="430" cy="128" r="48" fill="#f7e3a8" opacity=".4"/>
  <circle cx="430" cy="128" r="48" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".65"><ellipse cx="190" cy="118" rx="120" ry="14"/><ellipse cx="580" cy="92" rx="90" ry="11"/><ellipse cx="650" cy="222" rx="80" ry="10"/><ellipse cx="60" cy="196" rx="70" ry="9"/></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2" stroke-linecap="round"><path class="bird" d="m290 196 9-5 9 5"/><path class="bird" d="m322 212 7-4 7 4"/></g>
  <g class="layer" style="--i:0"><path d="M0 502V404Q90 392 180 398T360 394T540 400T720 392V502Z" fill="#a9bea6"/>
  <g fill="#8fae8a"><ellipse cx="24" cy="404" rx="36" ry="13"/><ellipse cx="206" cy="406" rx="30" ry="11"/></g>
  <g transform="translate(605 500)"><path d="M-18 0V-262H18V0Z" fill="#8c7a64"/><path d="M-22 -262H22V-270H-22Z" fill="#7a6a56"/><path d="M-18 -270L0 -330L18 -270Z" fill="#5f7f6c"/><path d="M-5 -228v-16q5-6 10 0v16Z" fill="#4a3f36"/><circle cy="-204" r="8" fill="#f4ecd8"/><path d="M0 -204v-5M0 -204h4" stroke="#4a3f36" stroke-width="1.5"/><path d="M-1 -330v-14h2v14Z" fill="#4a3f36"/></g>
  <g transform="translate(605 156)"><g class="vane"><path d="M-12 0h24" stroke="#4a3f36" stroke-width="2"/><path d="M-7 -2q-3-8 3-11l-2-5 5 2 2-3 1 4q6 3 4 13Z" fill="#c9a24e"/></g></g>
  <g transform="translate(128 442)"><path d="M-24 0L-15 -118H15L24 0Z" fill="#7a6a58"/><path d="M-38 -44H38V-38H-38Z" fill="#5a4332"/><path d="M-19 -118Q0 -144 19 -118Z" fill="#4a3f36"/><path d="M-4 -82h8v12h-8Z" fill="#e8d9a8"/><path d="M-6 0V-18q6-5 12 0V0Z" fill="#3e342c"/></g>
  <g transform="translate(128 318)"><g class="mill-sails">${sails}<circle r="6" fill="#4a3f36"/></g></g></g>
  <g class="layer" style="--i:1">
  <g fill="#6f9463"><ellipse cx="166" cy="486" rx="46" ry="14"/><ellipse cx="216" cy="489" rx="26" ry="10"/></g>
  ${stepHouse(236, 492, 84, 118, '#a4705a', 2)}${stepHouse(326, 492, 90, 136, '#b8845e', 3)}${stepHouse(424, 492, 126, 152, '#9b6a50', 3, '1-1')}${stepHouse(558, 492, 80, 124, '#c49269', 2)}${stepHouse(644, 492, 96, 110, '#a4705a', 3)}
  <path d="M460 404H514V426H460Z" fill="#284f3d"/><text x="487" y="419" font-family="sans-serif" font-size="10" font-weight="700" fill="#f5ecd4" text-anchor="middle">DOKTER</text>
  <circle class="lamp-glow" cx="508" cy="451" r="16" fill="#f7e3a8" opacity=".35"/><path d="M499 444h6M503 444v-4" stroke="#3e4a3e" stroke-width="2"/><path d="M503 444h10v14h-10Z" fill="#3e4a3e"/><path d="M505 446h6v10h-6Z" fill="#f2c97a"/>
  <path d="M0 488H720V502H0Z" fill="#c9b48e"/><path d="M0 501H720" stroke="#a89870" stroke-width="2"/></g>
  <path fill="url(#${p}-water)" d="M0 502H720V640H0Z"/>
  <g class="waves-back" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M180 524q20-8 40 0t40 0M470 520q20-8 40 0t40 0M610 556q20-8 40 0t40 0M60 566q20-8 40 0t40 0"/></g>
  <g class="waves" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M420 556q20-8 40 0t40 0t40 0M150 590q20-8 40 0t40 0M560 594q20-8 40 0t40 0"/></g>
  <g clip-path="url(#${p}-waterclip)"><ellipse class="glint" cx="-160" cy="530" rx="110" ry="5" fill="#fffbe0" opacity="0"/><ellipse class="glint" cx="-260" cy="584" rx="80" ry="4" fill="#fffbe0" opacity="0"/></g>
  <g transform="translate(250 568)"><ellipse cx="80" cy="12" rx="104" ry="7" fill="#4f7766" opacity=".45"/><g class="boat-drift"><g class="boat">
  <path d="M-12 -16Q80 -8 172 -16Q168 0 150 6Q80 12 8 6Q-8 0 -12 -16Z" fill="#6e503b"/><path d="M-8 -14Q80 -6 168 -14" stroke="#9a7552" stroke-width="3" fill="none"/>
  <path d="M30 -10Q46 -12 52 2Q46 12 30 8Z" fill="#5a4332"/><path d="M120 -30H156V-14H120Z" fill="#7c5a42"/><path d="M128 -26h8v6h-8ZM142 -26h8v6h-8Z" fill="#e8d9a8"/>
  <path d="M70 -14V-156h4V-14Z" fill="#5a4332"/>
  <path class="sail" d="M74 -150L132 -128L146 -24L74 -22Z" fill="#b76e55"/><path class="jib" d="M70 -146L18 -24H70Z" fill="#d9a27a"/>
  <path class="pennant" d="M74 -156l24 5-24 5Z" fill="#c0604c"/></g></g></g>
  <path class="layer" style="--i:2" d="M0 612Q180 594 360 608T720 600V760H0Z" fill="#517c67"/>
  <path d="M0 662Q200 640 380 660T720 652V760H0Z" fill="#6b8f63"/>
  <g class="tree"><path d="M58 724V560h14v164Z" fill="#6e503b"/><path d="M65 612l-26-30M66 592l24-26" stroke="#6e503b" stroke-width="7" stroke-linecap="round"/><g fill="#4f7a5a"><circle cx="64" cy="520" r="66"/><circle cx="18" cy="556" r="46"/><circle cx="112" cy="560" r="48"/></g><g fill="#6f9463"><circle cx="44" cy="498" r="30"/><circle cx="98" cy="532" r="24"/></g></g>
  ${[180, 226, 420, 664].map(x => `<g class="grass"><path d="M${x} 642q-6-30-18-44M${x} 642q2-34 10-50M${x} 642q10-24 24-34" stroke="#9cac66" stroke-width="5" fill="none" stroke-linecap="round"/></g>`).join('')}
  <ellipse cx="560" cy="704" rx="58" ry="6" fill="#3f5f4c" opacity=".35"/>
  <g transform="translate(548 702)"><path d="M36 0V-20Q36 -27 43 -27H65Q72 -27 72 -20V0Z" fill="#6e503b"/><path d="M36 -16H72" stroke="#5a4332" stroke-width="3"/><path d="M46 -27Q54 -40 62 -27" stroke="#4a3f36" stroke-width="4" fill="none"/><path d="M51 -19h6v5h-6Z" fill="#d6a550"/></g>
  <g class="girl"><g transform="translate(548 702)">
  <path d="M-30 0L-17 -72H17L30 0Z" fill="#3f6b52"/><path d="M-30 0H30L29 -6H-29Z" fill="#335a45"/><ellipse cx="-11" cy="1" rx="8" ry="3" fill="#3e342c"/><ellipse cx="11" cy="1" rx="8" ry="3" fill="#3e342c"/>
  <path d="M-15 -70Q-17 -110 0 -112Q17 -110 15 -70Z" fill="#3f6b52"/><path d="M-4 -118h8v8h-8Z" fill="#e3b995"/><path d="M-8 -111h16l-8 9Z" fill="#f5efe0"/>
  <path d="M-14 -102Q-27 -86 -9 -80M14 -102Q27 -86 9 -80" stroke="#3f6b52" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M-16 -98h30v24h-30Z" fill="#b76e55"/><path d="M-14 -96h26v3h-26Z" fill="#f5ecd4"/><circle cx="-10" cy="-80" r="4.5" fill="#e8c4a0"/><circle cx="9" cy="-80" r="4.5" fill="#e8c4a0"/>
  <g class="girl-head"><circle cy="-128" r="14" fill="#e8c4a0"/><path d="M-15 -128Q-15 -144 0 -145Q15 -144 15 -128Q9 -137 0 -137Q-9 -137 -15 -128Z" fill="#5a3a2c"/><circle cy="-146" r="7" fill="#5a3a2c"/></g>
  </g></g>
  </svg>`;
}

function letter() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een bureau met een geschreven brief, een ganzenveer in een inktpot, een brandende kaars op een stapel boeken en een envelop aan de heer Jacobs, met door het raam een kerktoren">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#ebecd9"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <path d="M220 86H500V296H220Z" fill="#8c6a4c"/><path d="M234 100H486V282H234Z" fill="#d6e0d4"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".9"><ellipse cx="290" cy="134" rx="40" ry="8"/><ellipse cx="440" cy="150" rx="30" ry="7"/></g>
  <g fill="#b8845e"><path d="M234 282V238l20-22 20 22v44Z"/><path d="M330 282V230h36v52Z"/><path d="M446 282V242h40v40Z"/></g>
  <g fill="#9b6a50"><path d="M274 282V226l28-26 28 26v56Z"/><path d="M366 282V244h34v38Z"/></g>
  <path d="M404 282V170h34v112Z" fill="#9a8a72"/><path d="M400 170L421 110L442 170Z" fill="#6f7f6c"/><circle cx="421" cy="196" r="7" fill="#f4ecd8"/>
  <path d="M360 100V282M234 191H486" stroke="#8c6a4c" stroke-width="8"/>
  <path d="M206 296H514V310H206Z" fill="#e2d8c2"/>
  <path d="M80 430H640V454H80Z" fill="#9a7552"/><path d="M100 454h20v150h-20ZM600 454h20v150h-20Z" fill="#7c5a42"/>
  <path d="M110 430V404H236V430Z" fill="#517c67"/><path d="M110 412H236" stroke="#3f6b52" stroke-width="3"/>
  <path d="M118 404V382H228V404Z" fill="#b76e55"/><path d="M114 382V360H232V382Z" fill="#d6a550"/>
  <text x="173" y="375" font-family="sans-serif" font-size="11" font-weight="700" fill="#5a3a2c" text-anchor="middle">ANATOMIE</text>
  <circle class="m-twinkle" cx="176" cy="286" r="42" fill="#f7e3a8" fill-opacity=".45"/>
  <path d="M156 360h40v-6h-40Z" fill="#c9a24e"/><path d="M168 354V302h16v52Z" fill="#f5efe0"/><path d="M176 302v-6" stroke="#4a3f36" stroke-width="2"/><path d="M176 298q-9-12 0-26 9 14 0 26Z" fill="#f2c97a"/>
  <g transform="rotate(-4 336 380)"><path d="M262 300H410V430H262Z" fill="#fbf7ea"/>
  <g stroke="#7c8fa0" stroke-width="2" fill="none" stroke-linecap="round">${[324, 340, 356, 372, 388].map(y => `<path d="M280 ${y}q8-6 16 0t16 0t16 0t16 0t16 0t16 0t16 0"/>`).join('')}</g>
  <text x="380" y="416" font-family="sans-serif" font-size="13" font-style="italic" fill="#5a6b7c" text-anchor="end">Aletta</text></g>
  <path d="M452 430V404q0-8 8-8h28q8 0 8 8v26Z" fill="#3e4a3e"/><path d="M462 396v-8h24v8Z" fill="#2f3a30"/>
  <g class="m-sway" style="--d:-1s"><path d="M474 392L522 266" stroke="#8c7a5c" stroke-width="3" stroke-linecap="round"/><path d="M523 262Q536 300 502 350L494 358Q502 308 523 262Z" fill="#f5efe0"/><path d="M523 262Q494 288 488 344L494 358Q514 314 523 262Z" fill="#e8dcc0"/></g>
  <g transform="rotate(5 584 402)"><path d="M530 370H638V432H530Z" fill="#f3ead0"/><path d="M614 376h18v20h-18Z" fill="#b76e55"/><path d="M617 379h12v14h-12Z" fill="none" stroke="#f3ead0" stroke-width="1.5"/>
  <text x="542" y="404" font-family="sans-serif" font-size="9" fill="#5a4a38">AAN DE HEER</text><text x="542" y="420" font-family="sans-serif" font-size="12" font-weight="700" fill="#5a4a38">JACOBS</text></g>
  <g class="m-float" fill="#c9a24e"><path d="m600 214 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/><path d="m130 240 2-7 2 7 7 2-7 2-2 7-2-7-7-2Z"/></g>
  </svg>`;
}

function practice() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amsterdamse grachtenhuizen met bij een deur een bord met GRATIS SPREEKUUR, waar vrouwen en een kind in de rij wachten">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <circle cx="176" cy="126" r="34" fill="#f7e3a8"/>
  <g class="m-drift" fill="#fbf6e6" opacity=".9"><ellipse cx="300" cy="116" rx="56" ry="10"/><ellipse cx="520" cy="138" rx="44" ry="9"/></g>
  ${neckHouse(140, 470, 112, 236, '#9b6a50')}${neckHouse(256, 470, 140, 266, '#b8845e')}${neckHouse(400, 470, 116, 246, '#a4705a')}${neckHouse(520, 470, 96, 224, '#c49269')}
  <path d="M90 470H630V500H90Z" fill="#c9b48e"/><path d="M90 499H630" stroke="#a89870" stroke-width="2"/>
  <path d="M90 500H630V546H90Z" fill="#86a898"/><g class="m-drift" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M140 518q20-8 40 0t40 0M380 528q20-8 40 0t40 0M540 514q20-8 40 0t40 0"/></g>
  <g transform="translate(596 470)"><circle class="m-twinkle" cy="-118" r="22" fill="#f7e3a8" fill-opacity=".5"/><path d="M-3 0V-104h6V0Z" fill="#3e4a3e"/><path d="M-10 -104h20l-4 -24h-12Z" fill="#3e4a3e"/><path d="M-6 -108h12l-2 -16h-8Z" fill="#f2c97a"/></g>
  ${woman(198, 492, '#f0cfae', '#7c8fa0', '#c9b48e', '#f5efe0', 1, -1.4)}${woman(246, 494, '#e3b995', '#517c67', '#d6a550', '#5a3a2c', 1, -.4, baby)}${woman(272, 496, '#f0cfae', '#b76e55', '#f5efe0', '#8c6a4c', .6, -2.2)}${woman(298, 492, '#e8c4a0', '#9a7552', '#517c67', '#f5efe0', 1, -3)}
  <g transform="translate(352 420)"><path d="M8 74L16 0M54 74L46 0" stroke="#6b5b43" stroke-width="4" stroke-linecap="round"/><path d="M0 0H62V50H0Z" fill="#284f3d"/>
  <text x="31" y="21" font-family="sans-serif" font-size="11" font-weight="700" fill="#f5ecd4" text-anchor="middle">GRATIS</text><text x="31" y="37" font-family="sans-serif" font-size="9" font-weight="700" fill="#f5ecd4" text-anchor="middle">SPREEKUUR</text></g>
  <g class="m-float" fill="#c9a24e"><path d="m560 260 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

function shop() {
  const jars = [[166, '#c9d7b0'], [206, '#e8c3c0'], [246, '#f2c97a']].map(([x, c]) => `<path d="M${x} 196v-34q0-6 6-6h20q6 0 6 6v34Z" fill="${c}"/><path d="M${x + 2} 156v-8h28v8Z" fill="#8c6a4c"/>`).join('');
  const bolts = ['#517c67', '#b76e55', '#7c8fa0', '#d6a550', '#9cac66'].map((c, i) => `<path d="M${312 + i * 22} 196V146h18v50Z" fill="${c}"/>`).join('');
  const ribbons = [[180, '#b76e55'], [216, '#517c67'], [252, '#d6a550']].map(([x, c]) => `<circle cx="${x}" cy="280" r="15" fill="${c}"/><circle cx="${x}" cy="280" r="5" fill="#f1e8d6"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een ouderwetse winkel met potten en stoffen op de planken, een toonbank met een kopje thee, en een winkelmeisje dat even zit op een stoel achter de toonbank">
  <rect width="720" height="650" fill="#e3d9c4"/><circle cx="360" cy="315" r="223" fill="#f1e8d6"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <g transform="translate(500 124)"><circle r="24" fill="#f5efe0"/><circle r="24" fill="none" stroke="#8c6a4c" stroke-width="4"/><path d="M0 0V-15M0 0l10 6" stroke="#4a3f36" stroke-width="3" stroke-linecap="round"/></g>
  ${jars}${bolts}<path d="M440 196V160h60v36Z" fill="#e2d8c2"/><path d="M440 168h60" stroke="#b76e55" stroke-width="4"/><path d="M510 196V170h44v26Z" fill="#c9b48e"/>
  <path d="M150 196H570V206H150Z" fill="#9a7552"/>
  ${ribbons}<path d="M290 296V262h56v34Z" fill="#c9b48e"/><path d="M356 296V250h44v46Z" fill="#e2d8c2"/><path d="M410 296V268h70v28Z" fill="#b8845e"/><path d="M490 296V256h56v40Z" fill="#d9ccb0"/>
  <path d="M150 296H570V306H150Z" fill="#9a7552"/>
  <path d="M90 498H630V546H90Z" fill="#c9b48e"/><path d="M150 498v48M290 498v48M430 498v48M570 498v48" stroke="#b39d73" stroke-width="2"/>
  <path d="M120 408H450V498H120Z" fill="#9a7552"/><path d="M136 420h90v66h-90ZM240 420h90v66h-90ZM344 420h90v66h-90Z" fill="#8c6a4c"/><path d="M110 392H460V408H110Z" fill="#7c5a42"/>
  <path d="M150 392v-22h84v22Z" fill="#b76e55"/><path d="M150 380h84" stroke="#8c4e3c" stroke-width="3"/>
  <path d="M302 392q0-22 14-22t14 22Z" fill="#d6a550"/><circle cx="316" cy="366" r="4" fill="#d6a550"/>
  <path d="M396 392V372h26v20Z" fill="#f5efe0"/><path d="M422 376q12 2 6 12" stroke="#f5efe0" stroke-width="4" fill="none"/>
  <g fill="none" stroke="#fffdf0" stroke-width="4" stroke-linecap="round"><path class="m-steam" d="M403 364Q393 350 403 336T403 312"/><path class="m-steam" style="--d:-1.8s" d="M415 364Q405 350 415 336T415 312"/></g>
  <path d="M492 498V376h8v122ZM548 498V376h8v122Z" fill="#7c5a42"/><path d="M490 376H558V386H490Z" fill="#8c6a4c"/><path d="M486 418H562V428H486Z" fill="#9a7552"/>
  <path d="M500 420L490 494H560L550 420Z" fill="#517c67"/><path d="M510 422L504 492H546L540 422Z" fill="#f5efe0"/><ellipse cx="514" cy="496" rx="8" ry="3" fill="#3e342c"/><ellipse cx="536" cy="496" rx="8" ry="3" fill="#3e342c"/>
  <path d="M510 422Q508 382 524 380Q540 382 538 422Z" fill="#517c67"/><path d="M518 380h12l-6 8Z" fill="#f5efe0"/><path d="M520 374h8v8h-8Z" fill="#e3b995"/>
  <path d="M512 392Q504 410 520 416M536 392Q544 410 528 416" stroke="#517c67" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g class="m-bob" style="--d:-2s"><circle cx="524" cy="362" r="13" fill="#e8c4a0"/><path d="M510 362Q510 347 524 346Q538 347 538 362Q532 354 524 354Q516 354 510 362Z" fill="#8c6a4c"/><circle cx="524" cy="345" r="6" fill="#8c6a4c"/></g>
  <g class="m-float" fill="#c9a24e"><path d="m600 250 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

function march() {
  const windows = [0, 1].flatMap(r => [210, 260, 310, 410, 460, 510].map(x => `<path d="M${x - 11} ${334 + r * 70}V${306 + r * 70}q11-14 22 0V${334 + r * 70}Z" fill="#9fb3a6"/>`)).join('');
  const flag = (x, c, d) => `<g class="m-sway" style="--d:${d}s"><path d="M${x} 452V370" stroke="#6b5b43" stroke-width="3" stroke-linecap="round"/><path d="M${x + 1} 372l28 9-28 9Z" fill="${c}"/></g>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een optocht van vrouwen met hoeden en lange jurken, met vlaggetjes en een groot spandoek waarop VROUWENKIESRECHT staat, voor een statig gebouw">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#efe9d4"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <circle cx="530" cy="150" r="38" fill="#f7e3a8"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".9"><ellipse cx="220" cy="140" rx="60" ry="10"/><ellipse cx="450" cy="110" rx="46" ry="9"/></g>
  <g class="m-sway"><path d="M360 198V136" stroke="#5a4332" stroke-width="3"/><path d="M361 136h36v8h-36Z" fill="#b76e55"/><path d="M361 144h36v8h-36Z" fill="#f5ecd4"/><path d="M361 152h36v8h-36Z" fill="#5f7f9b"/></g>
  <path d="M170 470V262H550V470Z" fill="#d9ccb0"/><path d="M160 250H560V264H160Z" fill="#c4b594"/><path d="M170 250L360 198L550 250Z" fill="#8a5a46"/>
  ${windows}<path d="M338 470V420q22-24 44 0V470Z" fill="#6b5b43"/>
  <path d="M90 470H630V540H90Z" fill="#c9b48e"/><g fill="#b39d73">${Array.from({ length: 12 }, (_, i) => `<ellipse cx="${120 + i * 44}" cy="${520 + (i % 2) * 10}" rx="9" ry="3"/>`).join('')}</g>
  ${woman(176, 506, '#f0cfae', '#517c67', '#517c67', '#5a3a2c', 1, 0, sash + hat('#3e4a3e', '#e8c3c0'))}${woman(248, 502, '#e3b995', '#9a7552', '#9a7552', '#8c6a4c', 1, -1.1, sash + hat('#284f3d', '#f2c97a'))}${woman(318, 508, '#e8c4a0', '#b76e55', '#b76e55', '#5a3a2c', 1, -2.2, sash + hat('#5a4332', '#f5ecd4'))}
  ${woman(392, 504, '#f0cfae', '#3f6b52', '#3f6b52', '#c9a24e', 1, -.6, sash + hat('#8a5a46', '#e8c3c0'))}${woman(466, 502, '#d9a77f', '#7c8fa0', '#7c8fa0', '#4a3328', 1, -1.7, sash + hat('#3e4a3e', '#f2c97a'))}${woman(540, 506, '#e8c4a0', '#c49269', '#c49269', '#8c6a4c', 1, -2.8, sash + hat('#284f3d', '#f5ecd4'))}
  ${flag(190, '#d6a550', -2)}${flag(554, '#b76e55', -3)}
  <g class="m-sway" style="--d:-1s"><path d="M260 452V306M454 452V306" stroke="#6b5b43" stroke-width="5" stroke-linecap="round"/><path d="M262 314H452V358H262Z" fill="#f5ecd4"/><path d="M262 352H452" stroke="#517c67" stroke-width="3"/>
  <text x="357" y="341" font-family="sans-serif" font-size="15" font-weight="700" fill="#284f3d" text-anchor="middle">VROUWENKIESRECHT</text></g>
  </svg>`;
}

function ballot() {
  const tulips = [[196, 360, '#c0604c', 0], [222, 344, '#e0b060', -1.2], [248, 362, '#d98b5a', -2.4]].map(([x, y, c, d]) => `<g class="m-sway" style="--d:${d}s"><path d="M222 432Q${(x + 222) / 2} ${(y + 432) / 2} ${x} ${y + 20}" stroke="#517c67" stroke-width="4" fill="none"/>
  <path d="M${x - 11} ${y + 20}Q${x - 12} ${y - 2} ${x - 6} ${y - 6}L${x} ${y + 2}L${x + 6} ${y - 6}Q${x + 12} ${y - 2} ${x + 11} ${y + 20}Q${x} ${y + 28} ${x - 11} ${y + 20}Z" fill="${c}"/></g>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een houten stembus uit 1922 met een stembiljet dat erin gaat, een rood potlood en een vaas met tulpen">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#efe9d4"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <circle class="m-twinkle" cx="360" cy="270" r="150" fill="#f7e3a8" fill-opacity=".45"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".9"><ellipse cx="190" cy="160" rx="56" ry="10"/><ellipse cx="540" cy="190" rx="48" ry="9"/></g>
  <g class="m-float" stroke="#56705f" stroke-width="3" fill="none" stroke-linecap="round"><path d="m480 120 9-5 9 5"/><path d="m510 140 7-4 7 4"/></g>
  <path d="M150 470H570V490H150Z" fill="#9a7552"/><path d="M170 490h16v90h-16ZM534 490h16v90h-16Z" fill="#7c5a42"/>
  ${tulips}<g fill="#6f9463"><path d="M214 430q-18-10-20-34 14 8 20 22Z"/><path d="M230 430q18-10 20-34-14 8-20 22Z"/></g>
  <path d="M204 470Q196 450 206 430H238Q248 450 240 470Z" fill="#7c8fa0"/><path d="M204 434h36" stroke="#5f7388" stroke-width="3"/>
  <path d="M270 310H450V470H270Z" fill="#7c5a42"/><path d="M284 324H436V456H284Z" fill="#8c6a4c"/><path d="M260 296H460V312H260Z" fill="#5a4332"/><path d="M326 300H394V307H326Z" fill="#2f2a24"/>
  <path d="M304 352H416V408H304Z" fill="#f5ecd4"/><text x="360" y="376" font-family="sans-serif" font-size="15" font-weight="700" fill="#5a4a38" text-anchor="middle">STEMBUS</text><text x="360" y="398" font-family="sans-serif" font-size="13" fill="#5a4a38" text-anchor="middle">1922</text>
  <path d="M352 428h16v14h-16Z" fill="#d6a550"/><path d="M356 428v-5q4-6 8 0v5" stroke="#d6a550" stroke-width="2.5" fill="none"/>
  <g class="m-float" style="--d:-2s"><g transform="rotate(-8 360 246)"><path d="M332 218H388V274H332Z" fill="#fbf7ea"/><g stroke="#9a8a72" stroke-width="2" fill="none"><path d="M340 228h12v10h-12ZM340 250h12v10h-12ZM358 233h22M358 255h22"/></g><path d="M342 230h8v6h-8Z" fill="#c0604c"/></g></g>
  <g transform="rotate(-18 506 420)"><path d="M500 470V364h12v106Z" fill="#c0604c"/><path d="M500 364l6-18 6 18Z" fill="#e8c9a0"/><path d="M504 352l2-6 2 6Z" fill="#c0604c"/></g>
  <g class="m-float" fill="#c9a24e"><path d="m580 300 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/><path d="m140 260 2-7 2 7 7 2-7 2-2 7-2-7-7-2Z"/></g>
  </svg>`;
}

export const hero = id => village(id);
export const chapter = (i, variant) => i === 1 ? letter() : i === 2 ? (variant === 'winkel' ? shop() : practice()) : march();
export const completion = () => ballot();
export const card = () => village('card');
