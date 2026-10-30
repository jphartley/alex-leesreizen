// De levende godenwereld artwork: original SVG illustrations, all local. Gods themselves are never drawn;
// temples, offerings, lamps and garlands tell the story. Every id is prefixed with the journey slug.
const slug = 'godenwereld';

// A string of marigold beads hanging between two points with the given sag.
const garland = (x1, y1, x2, y2, sag, cls = '') => `<g${cls ? ` class="${cls}"` : ''}>${Array.from({ length: 15 }, (_, i) => {
  const t = i / 14, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t + 4 * sag * t * (1 - t);
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${i % 2 ? '#e8b646' : '#d98b5a'}"/>`;
}).join('')}</g>`;

// A small clay oil lamp (diya); the flame carries `cls` so it can flicker.
const diya = (x, y, s = 1, cls = 'm-twinkle', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" style="--d:${d}s" d="M0-20Q-7-9 0-2Q7-9 0-20Z" fill="#f2c76b"/><path d="M-17 0Q-15 11 0 11Q15 11 17 0Z" fill="#bc8264"/><path d="M-17 0H17" stroke="#9a6a4c" stroke-width="2"/></g>`;

const sparkle = (x, y, s, d) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="m-twinkle" style="--d:${d}s" d="M0-14 4-4 14 0 4 4 0 14-4 4-14 0-4-4Z" fill="#d6b56e"/></g>`;

function temple(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een Indiase dorpstempel met een hoge toren, bloemenslingers bij de ingang, brandende olielampjes op de trappen en een grote boom ernaast">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d6dcc4"/><stop offset="1" stop-color="#f3e2bd"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="540" cy="170" r="56" fill="#f7e3a8" opacity=".4"/><circle cx="540" cy="170" r="56" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".7"><ellipse cx="200" cy="140" rx="120" ry="14"/><ellipse cx="600" cy="260" rx="90" ry="11"/></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2"><path class="bird" d="m430 120 9-5 9 5"/><path class="bird" d="m460 136 7-4 7 4"/><path class="bird" d="m412 146 6-3 6 3"/></g>
  <path class="layer" d="M0 470Q130 410 260 444T520 420T720 430V600H0Z" fill="#a9bea6"/>
  <g class="layer">
    <path d="M290 440Q282 300 360 196Q438 300 430 440Z" fill="#d8a77a"/>
    <g stroke="#c48f63" stroke-width="4" fill="none"><path d="M292 404Q360 394 428 404"/><path d="M296 360Q360 350 424 360"/><path d="M306 316Q360 306 414 316"/><path d="M322 272Q360 263 398 272"/><path d="M340 232Q360 226 380 232"/></g>
    <ellipse cx="360" cy="198" rx="28" ry="10" fill="#e8d2aa"/><path d="M340 198v-6M350 198v-8M360 198v-9M370 198v-8M380 198v-6" stroke="#c48f63" stroke-width="2"/>
    <path d="M351 190Q349 176 360 168Q371 176 369 190Z" fill="#d6b56e"/>
    <g transform="translate(360 168)"><path d="M0 0V-44" stroke="#6b5b43" stroke-width="3"/><g class="pennant"><path d="M1-44 40-36 1-26Z" fill="#d98b5a"/></g></g>
    <path d="M250 444H470L448 418H272Z" fill="#c48f63"/>
    <path d="M262 560V444H458V560Z" fill="#e8d2aa"/><path d="M272 448h14v112h-14ZM434 448h14v112h-14Z" fill="#d8bb91"/>
    <path d="M336 560V502Q360 476 384 502V560Z" fill="#6e503b"/>
    <circle class="lamp" cx="360" cy="530" r="18" fill="#f2c76b" opacity=".75"/>${diya(360, 546, .8, 'diya-flame')}
    <g transform="translate(404 446)"><g class="bell"><path d="M0 0V16" stroke="#8a684f" stroke-width="2"/><path d="M-8 30Q-8 16 0 16Q8 16 8 30Z" fill="#d6b56e"/><circle cx="0" cy="32" r="2.5" fill="#a28056"/></g></g>
    ${garland(276, 452, 444, 452, 24, 'garland')}
    <path d="M232 580H488V560H232Z" fill="#d8bb91"/><path d="M216 600H504V580H216Z" fill="#c9aa83"/>
  </g>
  <g>${[[300, 470], [330, 476], [392, 476], [420, 470], [360, 478]].map(([x, y], i) => `<ellipse class="petal" cx="${x}" cy="${y}" rx="5" ry="3" fill="${i % 2 ? '#e8b646' : '#d98b5a'}" opacity="0"/>`).join('')}</g>
  <path d="M0 600H720V760H0Z" fill="#c9aa83"/><path d="M0 690Q360 670 720 690V760H0Z" fill="#b99770"/>
  <path d="M322 600 288 760H432L398 600Z" fill="#d8bb91"/>
  ${diya(244, 578, 1, 'diya-flame')}${diya(284, 578, 1, 'diya-flame')}${diya(436, 578, 1, 'diya-flame')}${diya(476, 578, 1, 'diya-flame')}
  <g transform="translate(360 650) scale(1 .38)">${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-34" rx="12" ry="26" fill="${i % 2 ? '#e8b646' : '#d98b5a'}" transform="rotate(${i * 45})"/>`).join('')}<circle r="16" fill="#b76e55"/><circle r="64" fill="none" stroke="#f7f5ed" stroke-width="5" stroke-dasharray="4 10"/></g>
  <g transform="translate(110 600)"><path d="M-14 0Q-8-120-14-250H14Q8-120 14 0Z" fill="#6e503b"/>
    <g stroke="#7c5a42" stroke-width="3">${[-70, -50, 40, 62, 84].map(x => `<path d="M${x} -200V-${x < 0 ? 30 : 50}"/>`).join('')}</g>
    <g class="crown"><ellipse cx="0" cy="-260" rx="140" ry="70" fill="#517c67"/><ellipse cx="-60" cy="-300" rx="80" ry="50" fill="#6b8f63"/><ellipse cx="60" cy="-310" rx="90" ry="50" fill="#6b8f63"/><ellipse cx="0" cy="-340" rx="70" ry="40" fill="#9cac66"/></g></g>
  <g transform="translate(640 610)"><path d="M-40 0Q-44-40 0-50Q44-40 40 0Z" fill="#6b8f63"/><path d="M-24-10Q-20-40 0-42Q20-40 24-10Z" fill="#9cac66"/><circle cx="-10" cy="-34" r="5" fill="#d98b5a"/><circle cx="12" cy="-26" r="5" fill="#e8b646"/></g>
  </svg>`;
}

// Chapter frames: a round window on warm paper; scenes inside are clipped to the circle.
const frame = (label, sky, inside, outside = '') => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs><clipPath id="${slug}-circle"><circle cx="360" cy="315" r="225"/></clipPath></defs>
  <rect width="720" height="650" fill="#eadcc7"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="248" stroke-dasharray="3 9"/></g>
  <circle cx="360" cy="315" r="225" fill="${sky}"/><g clip-path="url(#${slug}-circle)">${inside}</g>${outside}</svg>`;

function shrine() {
  return frame('Een klein dorpsaltaar onder een grote boom, met bloemen en olielampjes, en een slang die rustig om de boom kronkelt', '#dfe3cc', `
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="470" cy="150" rx="60" ry="10"/></g>
  <path d="M100 470Q360 440 620 470V560H100Z" fill="#9cac66"/>
  <path d="M262 500Q270 380 258 250H310Q298 380 314 500Z" fill="#6e503b"/><path d="M262 500Q236 506 224 520M314 500Q340 506 352 520" stroke="#6e503b" stroke-width="10" stroke-linecap="round"/>
  <g><ellipse cx="290" cy="160" rx="220" ry="90" fill="#517c67"/><ellipse cx="200" cy="200" rx="110" ry="50" fill="#6b8f63"/><ellipse cx="400" cy="210" rx="110" ry="46" fill="#6b8f63"/><ellipse cx="300" cy="230" rx="70" ry="30" fill="#9cac66"/></g>
  <path d="M342 500H478V484H342Z" fill="#d8bb91"/>
  <path d="M356 484V424H464V484Z" fill="#e8d2aa"/><path d="M344 428 410 386 476 428Z" fill="#b76e55"/>
  <path d="M394 484V448Q410 432 426 448V484Z" fill="#6e503b"/><ellipse cx="410" cy="472" rx="10" ry="12" fill="#b76e55"/><circle cx="410" cy="466" r="2.5" fill="#f7f5ed"/>
  ${garland(362, 432, 458, 432, 16)}
  ${diya(372, 482, .9, 'm-twinkle', 0)}${diya(448, 482, .9, 'm-twinkle', -1.6)}
  <g fill="#d98b5a"><circle cx="392" cy="496" r="4"/><circle cx="428" cy="496" r="4"/></g><g fill="#e8b646"><circle cx="402" cy="497" r="4"/><circle cx="418" cy="497" r="4"/></g>
  <g fill="none" stroke="#7c9a5a" stroke-width="13" stroke-linecap="round"><ellipse cx="236" cy="510" rx="40" ry="12"/><ellipse cx="236" cy="496" rx="28" ry="9"/><path d="M258 492Q276 474 258 456Q244 444 252 430"/></g>
  <g fill="#c9d4a0"><circle cx="210" cy="514" r="2.5"/><circle cx="236" cy="521" r="2.5"/><circle cx="262" cy="514" r="2.5"/><circle cx="222" cy="500" r="2.5"/><circle cx="250" cy="500" r="2.5"/><circle cx="264" cy="470" r="2.5"/></g>
  <g transform="translate(254 424)"><g class="m-bob"><ellipse cx="0" cy="0" rx="13" ry="9" fill="#7c9a5a"/><circle cx="4" cy="-3" r="2.2" fill="#284f3d"/><path d="M12 2l10 0l3-3M22 2l3 3" stroke="#b76e55" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></g>
  <g transform="translate(130 540)"><g class="m-sway"><path d="M0 0Q-10-50 10-90Q20-50 0 0Z" fill="#517c67"/><path d="M8 0Q30-40 60-56Q40-20 8 0Z" fill="#6b8f63"/></g></g>
  <g transform="translate(600 540)"><g class="m-sway" style="--d:-2s"><path d="M0 0Q10-50-10-90Q-20-50 0 0Z" fill="#517c67"/><path d="M-8 0Q-30-40-60-56Q-40-20-8 0Z" fill="#6b8f63"/></g></g>`);
}

function bullet() {
  return frame('Een versierde oude motorfiets met bloemenslingers op een verhoging langs de weg, met vlaggetjes en olielampjes', '#e6dcc0', `
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="250" cy="150" rx="70" ry="11"/><ellipse cx="480" cy="120" rx="55" ry="9"/></g>
  <path d="M100 380Q240 330 380 362T620 350V470H100Z" fill="#c9b07e"/>
  <path d="M230 448V272M490 448V272" stroke="#8a684f" stroke-width="7"/>
  <path d="M206 276H514L484 240H236Z" fill="#d98b5a"/><path d="M262 240 246 276M314 240 306 276M366 240V276M418 240 426 276M470 240 486 276" stroke="#e8b646" stroke-width="7"/>
  ${['#517c67', '#e8b646', '#b76e55', '#517c67', '#e8b646', '#b76e55', '#517c67'].map((c, i) => `<g class="m-sway" style="--d:${-i * .6}s"><path d="M${222 + i * 46} 276h18l-9 20Z" fill="${c}"/></g>`).join('')}
  <path d="M200 462H520V444H200Z" fill="#d8bb91"/>
  <g fill="#3a3a32"><circle cx="300" cy="418" r="26"/><circle cx="424" cy="418" r="26"/></g><g fill="#b39d73"><circle cx="300" cy="418" r="8"/><circle cx="424" cy="418" r="8"/></g>
  <path d="M300 418 330 356M322 352h22" stroke="#284f3d" stroke-width="7" stroke-linecap="round"/>
  <path d="M332 382H404L424 418" stroke="#284f3d" stroke-width="8" fill="none" stroke-linejoin="round"/>
  <rect x="352" y="388" width="36" height="26" rx="4" fill="#7d857c"/>
  <path d="M334 384Q338 360 370 360Q392 362 398 384Z" fill="#b76e55"/><path d="M394 370H444Q448 382 436 384H396Z" fill="#3e4a3e"/>
  <path d="M396 404Q424 380 452 404" stroke="#284f3d" stroke-width="6" fill="none"/>
  <circle cx="320" cy="368" r="9" fill="#f2c76b"/>
  ${garland(318, 362, 446, 372, 34)}${garland(326, 352, 344, 352, 18)}
  ${diya(236, 442, 1, 'm-twinkle', 0)}${diya(484, 442, 1, 'm-twinkle', -1.5)}
  <path d="M100 470H620V540H100Z" fill="#b39d73"/><path d="M100 505H620" stroke="#eadcc7" stroke-width="4" stroke-dasharray="20 16"/>
  <g transform="translate(560 476)"><g class="m-drift"><path d="M0 0H50V-30H0Z" fill="#517c67"/><path d="M50 0H72V-20L62-30H50Z" fill="#d98b5a"/><path d="M54-24h8v8h-8Z" fill="#dce3cd"/><circle cx="14" cy="2" r="7" fill="#3a3a32"/><circle cx="60" cy="2" r="7" fill="#3a3a32"/></g></g>`);
}

function visa() {
  return frame('Een tempel met een vliegtuig dat erboven langs een stippellijn naar de verte vliegt, en een zwevend paspoort', '#dfe3cc', `
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="420" cy="300" rx="60" ry="9"/></g>
  <path d="M100 470Q360 440 620 470V560H100Z" fill="#9cac66"/>
  <path d="M280 470V380H440V470Z" fill="#e8d2aa"/>
  <path d="M298 380 308 334H412L422 380Z" fill="#d8a77a"/><path d="M314 334 322 294H398L406 334Z" fill="#c48f63"/><path d="M328 294 334 262H386L392 294Z" fill="#d8a77a"/>
  <path d="M352 262Q350 248 360 240Q370 248 368 262Z" fill="#d6b56e"/>
  <g fill="#f7f5ed" opacity=".7"><circle cx="330" cy="358" r="5"/><circle cx="360" cy="358" r="5"/><circle cx="390" cy="358" r="5"/><circle cx="345" cy="316" r="4"/><circle cx="375" cy="316" r="4"/></g>
  <path d="M338 470V420Q360 398 382 420V470Z" fill="#6e503b"/><circle class="m-twinkle" cx="360" cy="446" r="14" fill="#f2c76b" opacity=".8"/>
  ${garland(290, 390, 430, 390, 18)}
  ${diya(300, 470, .9, 'm-twinkle', 0)}${diya(420, 470, .9, 'm-twinkle', -1.4)}
  <path d="M150 400Q330 160 600 170" stroke="#517c67" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round" fill="none"/>
  <g transform="translate(486 176) rotate(-6)"><g class="m-drift"><ellipse cx="0" cy="0" rx="42" ry="9" fill="#f7f5ed"/><path d="M-6 0-26 30H-14L14 0ZM-6 0-22-26H-12L12 0Z" fill="#517c67"/><path d="M-36-2-46-20H-38L-26-2Z" fill="#517c67"/><path d="M20-3h14v3H20Z" fill="#7ea28f"/></g></g>
  <g transform="translate(196 300) rotate(-8)"><g class="m-float"><rect x="-36" y="-48" width="72" height="96" rx="8" fill="#284f3d"/><circle cx="0" cy="-8" r="18" fill="none" stroke="#d6b56e" stroke-width="3"/><path d="M-18-8H18M0-26V10" stroke="#d6b56e" stroke-width="2"/><ellipse cx="0" cy="-8" rx="8" ry="18" fill="none" stroke="#d6b56e" stroke-width="2"/><text x="0" y="30" text-anchor="middle" font-family="sans-serif" font-size="10" letter-spacing="1" fill="#d6b56e">PASPOORT</text></g></g>
  ${sparkle(560, 260, .7, -1)}${sparkle(250, 200, .6, -2.2)}`);
}

function route() {
  return frame('Een kaart met een stippellijn over zee, van een tempel in India naar een pagode in Japan, met een klein zeilbootje onderweg', '#a9c4b4', `
  <circle class="m-twinkle" cx="370" cy="140" r="26" fill="#f7e3a8"/>
  <g class="m-drift" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M300 420q20-8 40 0t40 0M420 470q20-8 40 0t40 0M260 330q20-8 40 0t40 0M440 230q20-8 40 0t40 0"/></g>
  <path d="M100 280Q170 250 222 292Q256 360 236 430Q214 500 176 560H100Z" fill="#c9b07e"/>
  <path d="M150 340Q148 300 170 276Q192 300 190 340Z" fill="#d8a77a"/><path d="M140 362V340H200V362Z" fill="#e8d2aa"/><path d="M164 362V350Q170 344 176 350V362Z" fill="#6e503b"/><path d="M170 276V262" stroke="#6b5b43" stroke-width="2"/><path d="M171 262 184 266 171 270Z" fill="#d98b5a"/>
  <path d="M520 150Q560 140 584 176Q604 226 574 258Q540 250 528 208Z" fill="#9cac66"/><path d="M536 280Q580 268 604 300Q626 352 594 388Q560 368 548 324Z" fill="#9cac66"/>
  <g transform="translate(578 330)"><path d="M-10 0H10V-14H-10Z" fill="#b76e55"/><path d="M-26-12H26L16-22H-16Z" fill="#6e503b"/><path d="M-8-22H8V-34H-8Z" fill="#b76e55"/><path d="M-20-32H20L12-42H-12Z" fill="#6e503b"/><path d="M-6-42H6V-52H-6Z" fill="#b76e55"/><path d="M-14-50H14L8-58H-8Z" fill="#6e503b"/><path d="M0-58V-70" stroke="#6e503b" stroke-width="2"/></g>
  <path d="M232 360Q380 200 548 296" stroke="#f7f5ed" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round" fill="none"/>
  <g transform="translate(372 262)"><g class="m-bob"><path d="M-26 0H26L18 12H-18Z" fill="#8a684f"/><path d="M-1-40V0" stroke="#5a4332" stroke-width="2.5"/><path d="M2-38Q22-20 20-4H2Z" fill="#d98b5a"/><path d="M-4-30Q-18-16-16-4H-4Z" fill="#e8b646"/></g></g>
  <text x="168" y="400" text-anchor="middle" font-family="sans-serif" font-size="14" letter-spacing="2" fill="#6e503b">INDIA</text>
  <text x="578" y="412" text-anchor="middle" font-family="sans-serif" font-size="14" letter-spacing="2" fill="#284f3d">JAPAN</text>
  ${sparkle(470, 200, .6, -1.4)}`);
}

function lotus() {
  const petals = (n, r, c, rot = 0) => Array.from({ length: n }, (_, i) => `<ellipse cx="0" cy="${-r}" rx="14" ry="${r}" fill="${c}" transform="rotate(${rot + (i - (n - 1) / 2) * (150 / (n - 1))})"/>`).join('');
  const floating = (x, y, d) => `<g transform="translate(${x} ${y})"><g class="m-bob" style="--d:${d}s">${diya(0, 0, 1.2, 'm-twinkle', d)}</g></g>`;
  return frame('Een lotusbloem op het water met drijvende olielampjes en een hartje voor Alex', '#f1e2c0', `
  <circle class="m-twinkle" cx="360" cy="340" r="130" fill="#f7e3a8" opacity=".35"/>
  <path d="M100 360H620V560H100Z" fill="#9fbfae"/>
  <g class="m-drift" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M170 420q20-8 40 0t40 0M450 400q20-8 40 0t40 0M300 500q20-8 40 0t40 0"/></g>
  <g fill="#6b8f63"><path d="M160 470A44 14 0 1 0 248 470L204 470Z"/><path d="M470 490A40 13 0 1 0 550 490L510 490Z"/><path d="M250 370A36 11 0 1 0 322 370L286 370Z"/></g>
  <ellipse cx="360" cy="392" rx="80" ry="14" fill="#6b8f63"/>
  <g class="m-bob"><g transform="translate(360 384)">${petals(5, 46, '#e8b8a8')}${petals(4, 36, '#f3d3c4')}<circle cx="0" cy="-10" r="12" fill="#e8b646"/></g></g>
  ${floating(220, 440, 0)}${floating(510, 450, -2)}${floating(290, 500, -4)}${floating(440, 510, -1)}
  <g transform="translate(360 190)"><g class="m-bob" style="--d:-3s"><path d="M0 26C-38 2-24-24 0-9C24-24 38 2 0 26Z" fill="#b76e55"/></g></g>
  ${sparkle(240, 200, .8, 0)}${sparkle(490, 180, .7, -1.5)}${sparkle(590, 300, .6, -2.8)}${sparkle(130, 300, .6, -.7)}`);
}

export const hero = id => temple(id);
export const chapter = (i, variant) => i === 1 ? shrine() : i === 2 ? (variant === 'visa' ? visa() : bullet()) : route();
export const completion = () => lotus();
export const card = () => temple('card');
