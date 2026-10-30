// De grenzeloze groei van de mangawereld artwork: original SVG illustrations, all local.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'mangawereld';
const spineColours = ['#517c67', '#bc8264', '#9cac66', '#284f3d', '#d8b27a', '#b76e55', '#7ea28f'];

// A shelf of manga volumes in series runs: each run of five shares a colour, height and width.
// Some spines carry the .spine class so the hero can slide them out, as if someone is browsing.
function shelf(x, y, w, seed) {
  let out = '', cx = x + 6;
  for (let i = 0; ; i++) {
    const run = seed + Math.floor(i / 5);
    const bw = 15 + (run * 3) % 6, h = 60 + (run * 7) % 18;
    if (cx + bw > x + w - 6) break;
    const book = `<rect x="${cx}" y="${y - h}" width="${bw - 2}" height="${h}" rx="2" fill="${spineColours[run % spineColours.length]}"/><rect x="${cx + 2}" y="${y - h + 9}" width="${bw - 6}" height="7" rx="1" fill="#f7f5ed" opacity=".8"/><circle cx="${cx + (bw - 2) / 2}" cy="${y - 12}" r="2.4" fill="#f7f5ed" opacity=".6"/>`;
    out += (i + seed) % 7 === 3 ? `<g class="spine">${book}</g>` : book;
    cx += bw;
  }
  return out;
}

function bookcase(x, seed) {
  const boards = [210, 310, 410, 510, 610];
  return `<path d="M${x} 112H${x + 172}V622H${x}Z" fill="#8a684f"/><path d="M${x + 10} 122H${x + 162}V612H${x + 10}Z" fill="#6e503b"/>
  ${boards.map((y, i) => `<path d="M${x + 4} ${y}H${x + 168}V${y + 10}H${x + 4}Z" fill="#9a7552"/>${shelf(x + 10, y, 152, seed + i * 2)}`).join('')}
  <path d="M${x - 6} 100H${x + 178}V114H${x - 6}Z" fill="#9a7552"/>`;
}

// A pile of closed volumes lying flat, seen from the side.
const pile = (x, y, n, offset = 0) => Array.from({ length: n }, (_, i) => `<rect x="${x + ((i * 5) % 9) - 4}" y="${y - (i + 1) * 15}" width="96" height="14" rx="2" fill="${spineColours[(i + offset) % spineColours.length]}"/><path d="M${x + ((i * 5) % 9) + 4} ${y - (i + 1) * 15 + 3}h80v8h-80Z" fill="#f7f5ed" opacity=".75"/>`).join('');

// Small black-and-white manga panels for a paper page.
const panels = (x, y, w, h) => `<g fill="#cfd3c7"><path d="M${x} ${y}h${w * .55}v${h * .4}h-${w * .55}Z"/><path d="M${x + w * .6} ${y}h${w * .4}v${h * .4}h-${w * .4}Z"/><path d="M${x} ${y + h * .46}h${w}v${h * .54}h-${w}Z"/></g><g fill="#7d857c"><circle cx="${x + w * .28}" cy="${y + h * .2}" r="${h * .09}"/><path d="M${x + w * .1} ${y + h * .9}l${w * .25}-${h * .3}l${w * .2} ${h * .18}l${w * .18}-${h * .24}l${w * .17} ${h * .36}Z"/></g>`;

const frame = (label, contents) => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="225" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="248" stroke-dasharray="3 9"/></g>${contents}</svg>`;

const sparkle = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="m-twinkle" style="--d:${d}s" d="M0-14 4-4 14 0 4 4 0 14-4 4-14 0-4-4Z" fill="#d6b56e"/></g>`;

function bookshop(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gezellige boekhandel met hoge kasten vol kleurige manga, een tafel met stapels stripboeken en een opengeslagen manga, en een raam met uitzicht op de stad">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d3dcc6"/><stop offset="1" stop-color="#f1ead2"/></linearGradient><clipPath id="${p}-window"><path d="M216 470V230A144 144 0 0 1 504 230V470Z"/></clipPath></defs>
  <rect width="720" height="760" fill="#eadcc7"/>
  <path d="M0 0H720V40H0Z" fill="#dfcfb6"/>
  <g clip-path="url(#${p}-window)">
    <path fill="url(#${p}-sky)" d="M200 70H520V480H200Z"/>
    <circle class="sun-glow" cx="430" cy="180" r="40" fill="#f7e3a8" opacity=".4"/><circle cx="430" cy="180" r="40" fill="#f7e3a8"/>
    <g class="cloud" fill="#f8f4e2" opacity=".75"><ellipse cx="290" cy="170" rx="70" ry="11"/><ellipse cx="470" cy="250" rx="60" ry="9"/></g>
    <g class="birds" stroke="#56705f" fill="none" stroke-width="2"><path class="bird" d="m300 220 8-5 8 5"/><path class="bird" d="m328 234 6-4 6 4"/></g>
    <g class="layer"><path d="M200 480V360H236V330H270V372H300V310H338V350H372V296H410V356H440V326H474V366H520V480Z" fill="#a9bea6"/>
    <g fill="#c9d4bf">${[[246,346],[312,326],[312,350],[384,312],[384,336],[452,342]].map(([x, y]) => `<path d="M${x} ${y}h10v10h-10Z"/>`).join('')}</g>
    <path d="M200 420Q360 400 520 420V480H200Z" fill="#7ea28f"/></g>
  </g>
  <path d="M216 470V230A144 144 0 0 1 504 230V470" fill="none" stroke="#f7f5ed" stroke-width="12"/>
  <path d="M360 86V470M216 300H504" stroke="#f7f5ed" stroke-width="7"/>
  <path d="M204 466H516V482H204Z" fill="#9a7552"/>
  <g class="layer">${bookcase(16, 0)}${bookcase(532, 3)}</g>
  <path d="M0 610Q360 590 720 610V760H0Z" fill="#c9aa83"/><path d="M0 700Q360 682 720 700V760H0Z" fill="#b99770"/>
  <g transform="translate(360 0)"><g class="sign"><path d="M-46 0V48M46 0V48" stroke="#6b5b43" stroke-width="2"/><rect x="-74" y="46" width="148" height="44" rx="8" fill="#284f3d"/><rect x="-68" y="52" width="136" height="32" rx="5" fill="none" stroke="#9cac66" stroke-width="2"/><text x="0" y="76" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" letter-spacing="5" fill="#f7f5ed">MANGA</text></g></g>
  <ellipse cx="360" cy="672" rx="230" ry="18" fill="#775e48" opacity=".16"/>
  <g class="layer">
    <path d="M180 586H540V600H180Z" fill="#9a7552"/><path d="M192 600H528V660H192Z" fill="#8a684f"/><path d="M200 660H220V676H200ZM500 660H520V676H500Z" fill="#6e503b"/>
    ${pile(196, 586, 5)}${pile(430, 586, 4, 3)}
    <path d="M300 586 360 572 420 586Z" fill="#6e503b"/>
    <path d="M272 572Q316 540 360 556Q404 540 448 572V500Q404 470 360 486Q316 470 272 500Z" fill="#284f3d"/>
    <path d="M278 566Q318 536 360 551V482Q318 466 278 494Z" fill="#f7f5ed"/><path d="M442 566Q402 536 360 551V482Q402 466 442 494Z" fill="#f2ecdd"/>
    ${panels(290, 492, 58, 46)}${panels(372, 492, 58, 46)}
    <path class="page" d="M360 482Q402 466 442 494V566Q402 536 360 551Z" fill="#f7f5ed"/>
    <path d="M357 482H363V552H357Z" fill="#eadcc7"/>
  </g>
  <g class="bubble"><path d="M290 448Q290 418 324 418H356Q388 418 388 446Q388 472 356 472H330L316 486 318 471Q290 468 290 448Z" fill="#f7f5ed"/><g fill="#517c67"><circle cx="322" cy="446" r="4.5"/><circle cx="339" cy="446" r="4.5"/><circle cx="356" cy="446" r="4.5"/></g></g>
  <g class="bubble"><path d="M396 404Q396 380 424 380H446Q472 380 472 402Q472 424 446 424H440L444 438 428 424Q396 424 396 404Z" fill="#f7f5ed"/><path d="M434 390V408M434 413V418" stroke="#bc8264" stroke-width="5" stroke-linecap="round"/></g>
  <g transform="translate(110 700)"><g class="leaf"><path d="M-3 0H3V-110H-3Z" fill="#517c67"/><path d="M0-30Q-58-30-52-76Q-8-78 0-30M0-54Q56-58 46-102Q8-96 0-54M0-84Q-32-106-16-138Q14-126 0-84Z" fill="#9cac66"/></g><path d="M-34-4H34L26 52H-26Z" fill="#bc8264"/><path d="M-38-10H38V4H-38Z" fill="#cf9b79"/></g>
  </svg>`;
}

function streaming() {
  return frame('Een televisiescherm met een spannende tekenfilm, en ernaast een stapel mangaboeken die steeds hoger wordt', `
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="230" cy="130" rx="60" ry="10"/><ellipse cx="500" cy="110" rx="50" ry="9"/></g>
  <ellipse cx="270" cy="460" rx="160" ry="16" fill="#775e48" opacity=".13"/>
  <path d="M250 400H290L300 452H240Z" fill="#6e503b"/><path d="M206 448H334V460H206Z" fill="#8a684f"/>
  <rect x="96" y="170" width="348" height="236" rx="18" fill="#284f3d"/>
  <rect x="112" y="186" width="316" height="190" rx="8" fill="#dce3cd"/>
  <g clip-path="url(#${slug}-tv)">
    <circle class="m-twinkle" cx="350" cy="236" r="40" fill="#f7e3a8" opacity=".5"/><circle cx="350" cy="236" r="26" fill="#f7e3a8"/>
    <path d="M112 330 190 260 246 314 300 276 428 340V376H112Z" fill="#9cac66"/><path d="M112 350Q220 318 300 346T428 340V376H112Z" fill="#517c67"/>
    <g class="m-drift" stroke="#f7f5ed" stroke-width="4" stroke-linecap="round" opacity=".8"><path d="M140 232h60M156 252h44M130 272h50"/></g>
    <g class="m-float"><path d="M232 290q20-40 46-34t18 36q-8 22-30 22t-34-24Z" fill="#bc8264"/><circle cx="262" cy="276" r="5" fill="#f7f5ed"/><circle cx="280" cy="276" r="5" fill="#f7f5ed"/><circle cx="263" cy="277" r="2.4" fill="#284f3d"/><circle cx="281" cy="277" r="2.4" fill="#284f3d"/></g>
  </g>
  <defs><clipPath id="${slug}-tv"><rect x="112" y="186" width="316" height="190" rx="8"/></clipPath></defs>
  <path d="M112 386H428" stroke="#517c67" stroke-width="5" stroke-linecap="round"/><path d="M112 386H340" stroke="#9cac66" stroke-width="5" stroke-linecap="round"/><circle cx="340" cy="386" r="7" fill="#f7f5ed"/>
  <path d="M444 290Q480 250 500 300" stroke="#a28056" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>
  <ellipse cx="560" cy="470" rx="80" ry="12" fill="#775e48" opacity=".13"/>
  <g transform="translate(512 470)">${pile(0, 0, 9, 1)}<g class="m-bob">${pile(0, -135, 1, 3)}</g></g>
  <g class="m-float" style="--d:-2s"><path d="M612 250V178" stroke="#517c67" stroke-width="10" stroke-linecap="round"/><path d="M590 196 612 168 634 196Z" fill="#517c67"/></g>
  ${sparkle(510, 290, .9, 0)}${sparkle(640, 330, .7, -1.4)}${sparkle(586, 140, .6, -2.6)}`);
}

function digital() {
  const colours = ['#e9b48a', '#9cc0aa', '#e6cf86', '#b9c7e0', '#e5a9a0', '#a8c58a'];
  const strip = colours.map((c, i) => `<rect x="420" y="${150 + i * 96}" width="128" height="84" rx="6" fill="${c}"/><circle cx="${452 + (i % 3) * 28}" cy="${180 + i * 96}" r="12" fill="#f7f5ed" opacity=".8"/><path d="M430 ${226 + i * 96}l34-26 26 18 24-16 24 24Z" fill="#517c67" opacity=".55"/>`).join('');
  return frame('Een papieren manga in zwart-wit naast een smartphone met kleurige plaatjes onder elkaar, waar je met je duim doorheen scrolt', `
  <ellipse cx="230" cy="478" rx="140" ry="16" fill="#775e48" opacity=".13"/>
  <g class="m-bob" style="--d:-3s">
    <path d="M100 460Q160 430 228 452Q296 430 356 460V250Q296 220 228 242Q160 220 100 250Z" fill="#284f3d"/>
    <path d="M108 452Q164 424 226 444V248Q164 228 108 256Z" fill="#f7f5ed"/><path d="M348 452Q292 424 230 444V248Q292 228 348 256Z" fill="#f2ecdd"/>
    ${panels(122, 264, 90, 160)}${panels(244, 264, 90, 160)}
    <path d="M225 246H231V446H225Z" fill="#eadcc7"/>
  </g>
  <ellipse cx="484" cy="560" rx="96" ry="12" fill="#775e48" opacity=".13"/>
  <g class="m-float" style="--d:-1s">
    <rect x="400" y="96" width="168" height="440" rx="28" fill="#284f3d"/>
    <rect x="412" y="128" width="144" height="380" rx="10" fill="#f7f5ed"/>
    <g clip-path="url(#${slug}-phone)">${strip}</g>
    <path d="M460 112H508" stroke="#517c67" stroke-width="5" stroke-linecap="round"/><path d="M552 180V260" stroke="#9cac66" stroke-width="4" stroke-linecap="round"/>
  </g>
  <defs><clipPath id="${slug}-phone"><rect x="412" y="128" width="144" height="380" rx="10"/></clipPath></defs>
  <g fill="none" stroke="#517c67" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path class="m-twinkle" d="M610 250l14 14 14-14"/><path class="m-twinkle" style="--d:-1.3s" d="M610 280l14 14 14-14"/><path class="m-twinkle" style="--d:-2.6s" d="M610 310l14 14 14-14"/></g>`);
}

function eiffel(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#8ea38f"><path d="M-4-200H4L8-150H-8Z"/><path d="M-10-150H10L20-80H-20Z"/><path d="M-26-84H26V-74H-26Z"/><path d="M-22-74H22L60 0H32Q0-50-32 0H-60Z"/></g>`;
}

function studio() {
  return frame('Een tekentafel bij een raam met uitzicht op de Eiffeltoren, met een tekening in Japanse stijl, een pen en een inktpotje', `
  <rect x="190" y="90" width="340" height="250" rx="12" fill="#f7f5ed"/>
  <rect x="204" y="104" width="312" height="222" rx="6" fill="#dce3cd"/>
  <g clip-path="url(#${slug}-paris)">
    <circle class="m-twinkle" cx="452" cy="160" r="34" fill="#f7e3a8" opacity=".5"/><circle cx="452" cy="160" r="22" fill="#f7e3a8"/>
    <g class="m-drift" fill="#f8f5e5"><ellipse cx="280" cy="150" rx="50" ry="8"/><ellipse cx="420" cy="220" rx="40" ry="7"/></g>
    ${eiffel(330, 326, 1)}
    <path d="M204 300H260V270H290V300H380V280H420V262H450V300H516V326H204Z" fill="#a9bea6"/>
  </g>
  <defs><clipPath id="${slug}-paris"><rect x="204" y="104" width="312" height="222" rx="6"/></clipPath></defs>
  <path d="M360 104V326M204 215H516" stroke="#f7f5ed" stroke-width="6"/>
  <path d="M120 400 600 400 650 560H70Z" fill="#9a7552"/><path d="M70 560H650V578H70Z" fill="#7c5a42"/>
  <g transform="rotate(-5 330 470)"><rect x="210" y="400" width="230" height="150" rx="4" fill="#f7f5ed"/>
    <g fill="#e2e5da"><path d="M224 412h96v62h-96Z"/><path d="M330 412h96v62h-96Z"/><path d="M224 484h202v54h-202Z"/></g>
    <g transform="translate(272 446)"><path d="M-22 8Q-24-22 0-24Q24-22 22 8Q18 24 0 24Q-18 24-22 8Z" fill="#f7f5ed"/><path d="M-24-2Q-28-30 0-30Q30-30 24-2L14-14 4-4-6-16-16-4Z" fill="#284f3d"/><ellipse cx="-9" cy="4" rx="6" ry="8" fill="#284f3d"/><ellipse cx="9" cy="4" rx="6" ry="8" fill="#284f3d"/><circle cx="-7" cy="1" r="2.4" fill="#f7f5ed"/><circle cx="11" cy="1" r="2.4" fill="#f7f5ed"/><path d="M-5 15Q0 19 5 15" stroke="#bc8264" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
    <g stroke="#7d857c" stroke-width="3" stroke-linecap="round"><path d="M342 430h40M342 444h66M342 458h52"/></g>
    <path d="M236 524l40-26 30 18 32-22 40 30Z" fill="#9aa596"/>
  </g>
  <g transform="translate(520 470)"><g class="m-sway"><path d="M0 0 60-110" stroke="#517c67" stroke-width="10" stroke-linecap="round"/><path d="M-2 4 4-8 10-4Z" fill="#284f3d"/></g></g>
  <path d="M136 468Q136 440 160 440H184Q208 440 208 468V500H136Z" fill="#284f3d"/><path d="M150 430H194V444H150Z" fill="#517c67"/>
  <g transform="translate(570 420)"><path d="M0 0V30" stroke="#6b5b43" stroke-width="3"/><path d="M0 0H12V18H0Z" fill="#5f7f9b"/><path d="M12 0H24V18H12Z" fill="#f5ecd4"/><path d="M24 0H36V18H24Z" fill="#b76e55"/></g>
  ${sparkle(560, 160, .8, -1)}${sparkle(160, 200, .7, -2.2)}`);
}

function globe() {
  const book = (c) => `<rect x="-26" y="-34" width="52" height="68" rx="4" fill="${c}"/><rect x="-18" y="-24" width="36" height="12" rx="2" fill="#f7f5ed" opacity=".85"/>`;
  return frame('Een wereldbol met stripboeken, een telefoon en een tekenpen die er vrolijk omheen zweven, met een hartje voor Alex', `
  <ellipse cx="360" cy="520" rx="130" ry="16" fill="#775e48" opacity=".14"/>
  <path d="M320 470H400L412 512H308Z" fill="#9a7552"/><path d="M360 470V450" stroke="#7c5a42" stroke-width="8"/>
  <path d="M232 320A128 128 0 0 0 488 320" fill="none" stroke="#9a7552" stroke-width="7"/>
  <circle cx="360" cy="320" r="118" fill="#7ea28f"/>
  <g fill="#9cac66"><path d="M290 236q40-22 70 0t10 46q-30 10-44 40t-46 6q-20-30-10-52t20-40Z"/><path d="M400 280q36-6 52 20t-4 54q-22 18-40 0t-8-74Z"/><path d="M330 380q30-10 50 6t-6 30q-28 6-44-36Z"/></g>
  <g fill="none" stroke="#f7f5ed" stroke-width="2" opacity=".45"><ellipse cx="360" cy="320" rx="118" ry="40"/><ellipse cx="360" cy="320" rx="48" ry="118"/></g>
  <path d="M310 290Q360 220 430 300" stroke="#f7f5ed" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round" fill="none"/>
  <g transform="translate(180 210) rotate(-12)"><g class="m-float">${book('#bc8264')}</g></g>
  <g transform="translate(548 200) rotate(10)"><g class="m-float" style="--d:-2.5s">${book('#517c67')}</g></g>
  <g transform="translate(560 420) rotate(-8)"><g class="m-float" style="--d:-5s"><rect x="-22" y="-40" width="44" height="80" rx="9" fill="#284f3d"/><rect x="-16" y="-30" width="32" height="60" rx="4" fill="#e9b48a"/><rect x="-16" y="-2" width="32" height="32" fill="#9cc0aa"/></g></g>
  <g transform="translate(166 420) rotate(28)"><g class="m-float" style="--d:-3.5s"><path d="M-6-50H6V40H-6Z" fill="#517c67"/><path d="M-6 40H6L0 56Z" fill="#284f3d"/></g></g>
  <g transform="translate(360 150)"><g class="m-bob"><path d="M0 28C-40 2-26-26 0-10C26-26 40 2 0 28Z" fill="#bc8264"/></g></g>
  ${sparkle(250, 130, .8, 0)}${sparkle(480, 120, .7, -1.5)}${sparkle(620, 300, .6, -2.8)}${sparkle(110, 320, .6, -.7)}`);
}

export const hero = id => bookshop(id);
export const chapter = i => i === 1 ? streaming() : i === 2 ? digital() : studio();
export const completion = () => globe();
export const card = () => bookshop('card');
