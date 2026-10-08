// Original SVG scenes: computer history, geometry, a laboratory and shared worlds.
// Every instance owns its IDs; landing cards never animate.
const slug = 'shooters';
const colours = { paper: '#f7f5ed', sand: '#eadcc7', dark: '#284f3d', green: '#517c67', lime: '#9cac66', rust: '#b77b60', cream: '#eee6cf' };
const pixel = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M8 0h24v8h8v24h-8v8H8v-8H0V8h8Z" fill="${colours.lime}"/><path d="M8 12h8v8H8Zm16 0h8v8h-8Z" fill="${colours.dark}"/><path d="M12 28h16v4H12Z" fill="${colours.cream}"/></g>`;
const cube = (x, y, size = 60) => `<g transform="translate(${x} ${y})"><path d="M0 0 ${size} -${size / 2} ${size * 2} 0 ${size} ${size / 2}Z" fill="#b8c590"/><path d="M0 0 ${size} ${size / 2}V${size * 1.5}L0 ${size}Z" fill="${colours.green}"/><path d="M${size} ${size / 2} ${size * 2} 0V${size}L${size} ${size * 1.5}Z" fill="${colours.dark}"/></g>`;
const avatar = (x, y, tint = colours.green, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><rect x="-23" y="-74" width="46" height="46" rx="5" fill="#d7b58c"/><circle cx="-8" cy="-55" r="2.5" fill="${colours.dark}"/><circle cx="8" cy="-55" r="2.5" fill="${colours.dark}"/><path d="M-7-44q7 6 14 0" fill="none" stroke="${colours.dark}" stroke-width="2"/><path d="M-28-24H28V30H-28Z" fill="${tint}"/><path d="M-49-24h18v49h-18ZM31-24h18v49H31Z" fill="#d7b58c"/><path d="M-26 34h22v40h-22ZM4 34h22v40H4Z" fill="${colours.dark}"/></g>`;
const keys = (x, y, columns = 12, rows = 3) => `<g fill="#9b9f87">${Array.from({ length: columns * rows }, (_, i) => `<rect x="${x + (i % columns) * 13}" y="${y + Math.floor(i / columns) * 12}" width="10" height="8" rx="1"/>`).join('')}</g>`;
const star = (x, y) => `<path d="M${x} ${y - 12}l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#c5ad70"/>`;
function scene(label, content) {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}"><rect width="720" height="650" fill="${colours.sand}"/><circle cx="360" cy="310" r="248" fill="${colours.paper}"/><ellipse cx="360" cy="529" rx="240" ry="24" fill="${colours.dark}" opacity=".09"/>${content}</svg>`;
}

export function hero(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een oude computer, een laptop en een telefoon tonen gamewerelden met pixels, blokken en verbonden spelers">
  <defs><clipPath id="${p}-screen"><rect x="112" y="222" width="265" height="193" rx="8"/></clipPath></defs>
  <rect width="720" height="760" fill="${colours.sand}"/><circle cx="330" cy="310" r="270" fill="#f0ebd8"/>
  <path d="M0 600Q220 540 420 590T720 550V760H0Z" fill="#d1d7bc"/>
  <g class="connection" fill="none" stroke="#9cac66" stroke-width="3" stroke-dasharray="6 12"><path d="M190 170Q390 35 575 180"/><path d="M560 225Q665 280 610 400"/></g>
  <g class="orbit">${cube(470, 118, 35)}</g>
  <g class="signal">${star(140, 142)}${star(620, 270)}</g>
  <g class="layer"><ellipse cx="239" cy="552" rx="177" ry="15" fill="#284f3d" opacity=".12"/>
  <path d="M76 198Q76 175 101 175H387Q412 175 412 198V446Q412 463 390 463H98Q76 463 76 446Z" fill="#a7ad95"/>
  <path d="M91 194H397V445H91Z" fill="#d8d6bd"/><rect x="104" y="214" width="282" height="209" rx="14" fill="${colours.dark}"/>
  <g clip-path="url(#${p}-screen)"><rect x="112" y="222" width="265" height="193" fill="#6e8c72"/><path d="M112 222 202 272V367L112 415Z" fill="#91a07b"/><path d="M377 222 285 272V367L377 415Z" fill="#45654f"/><path d="M112 415 202 367H285L377 415Z" fill="#c0c29b"/><rect x="202" y="272" width="83" height="95" fill="#284f3d"/><g class="pixel-cloud">${pixel(225, 305, .8)}</g><rect class="screen-glow" x="112" y="222" width="265" height="193" fill="#e3efbb" opacity=".2"/></g>
  <circle class="signal" cx="382" cy="442" r="4" fill="${colours.green}"/><path d="M211 463h66v38h-66ZM176 498h136v17H176Z" fill="#a7ad95"/>
  <path d="M85 519H389L414 567H60Z" fill="#c6c6ab"/>${keys(129, 532)}<rect x="213" y="557" width="89" height="6" rx="2" fill="#9b9f87"/>
  </g>
  <g class="layer"><path d="M377 406Q377 393 392 393H619Q631 393 631 406V568H377Z" fill="${colours.dark}"/><rect x="389" y="406" width="230" height="149" rx="3" fill="#dde3c5"/>
  <path d="M389 503 459 460 530 503 619 461V555H389Z" fill="#bcc8a1"/>${cube(450, 468, 31)}
  <g class="cursor"><path d="M577 447v25l7-7 8 13 6-4-8-13h11Z" fill="${colours.paper}"/></g>
  <path d="M359 568H649L669 596H339Z" fill="#8e9e88"/><path d="M339 596H669V603H339Z" fill="${colours.dark}"/>
  </g>
  <g class="layer"><rect x="545" y="568" width="103" height="168" rx="17" fill="${colours.dark}"/><rect x="552" y="582" width="89" height="137" rx="10" fill="#cbd6b6"/><rect x="580" y="575" width="33" height="3" rx="1" fill="#a7bb99"/>${avatar(595, 647, colours.rust, .48)}<circle class="signal" cx="595" cy="727" r="4" fill="#9cac66"/></g>
  <g fill="${colours.green}" opacity=".55"><circle cx="110" cy="667" r="5"/><circle cx="137" cy="667" r="5"/><circle cx="164" cy="667" r="5"/></g>
  </svg>`;
}

function doom() {
  return scene('Een perspectiefgang op een oude monitor, met een plat pixelfiguurtje naast een papieren zijaanzicht', `
  <path d="M108 138H612V449H108Z" fill="#a3ac91"/><path d="M124 154H596V431H124Z" fill="${colours.dark}"/>
  <path d="M140 170 290 235V350L140 415Z" fill="#9cac86"/><path d="M580 170 430 235V350L580 415Z" fill="#6c8769"/>
  <path d="M140 170H580L430 235H290Z" fill="#c8c8a6"/><path d="M140 415H580L430 350H290Z" fill="#d7ccb0"/><path d="M290 235H430V350H290Z" fill="#3f604b"/>
  <g fill="none" stroke="#b4be9b" stroke-width="3"><path d="M202 197V388M249 218V368M518 197V388M471 218V368"/></g>
  ${pixel(323, 272, 1.8)}
  <path d="M323 449h74v39h-74ZM278 488h164v19H278Z" fill="#a3ac91"/>
  <g class="m-float" transform="translate(505 470)"><path d="M0 0 43-20 49 67 6 87Z" fill="#f7f5ed"/><path d="M43-20h5l6 87-5 0Z" fill="#b7ae8f"/></g>
  <g transform="translate(132 482)">${pixel(0, 0, 1.3)}</g>
  <path d="M202 520H449" stroke="#a7ad95" stroke-width="4" stroke-dasharray="6 10"/>`);
}
function quake() {
  return scene('Ruimtelijke blokken met drie zichtbare vlakken, omringd door computers die via een netwerk verbonden zijn', `
  <g fill="none" stroke="#c8c3a6" stroke-width="2"><path d="M130 465 360 345 590 465 360 585Z"/><path d="M185 494 416 374M243 525 473 405M302 555 530 436M185 435 417 554M244 405 475 524M302 375 532 495"/></g>
  ${cube(242, 329, 95)}${cube(430, 397, 42)}${cube(164, 459, 32)}
  <g fill="none" stroke="${colours.lime}" stroke-width="4" stroke-dasharray="4 10"><path d="M155 196Q360 104 565 196M155 196 360 267 565 196"/></g>
  ${[115, 320, 525].map((x, i) => `<g transform="translate(${x} ${i === 1 ? 202 : 144})"><rect width="80" height="61" rx="5" fill="${colours.green}"/><rect x="7" y="7" width="66" height="44" fill="#d5ddbb"/><path d="M34 61h12v17H34ZM15 78h50v5H15Z" fill="${colours.green}"/><circle class="m-twinkle" cx="40" cy="28" r="8" fill="${colours.lime}"/></g>`).join('')}
  ${star(127, 353)}${star(587, 363)}`);
}
function halfLife() {
  return scene('Een vriendelijke wetenschapper bij een laboratoriumtafel met een knikkerbaan en een natuurkundige puzzel', `
  <rect x="138" y="135" width="445" height="181" rx="10" fill="#dce2ce"/><path d="M170 279h60l40-50 50 31 43-65 51 34 36-55h65" fill="none" stroke="#91a47e" stroke-width="5"/><circle cx="270" cy="229" r="7" fill="${colours.rust}"/>
  <g transform="translate(193 355)"><path d="M-26 40h19v126h-19ZM7 40h19v126H7Z" fill="${colours.dark}"/><path d="M-43-39H43L56 56H-56Z" fill="${colours.paper}"/><path d="M-17-39 0-6 17-39V56H-17Z" fill="#b4c6a4"/><path d="M-46-22-29 10-68 27-77 11Z" fill="${colours.paper}"/><path d="M39-24 90-10 86 9 31 4Z" fill="${colours.paper}"/><ellipse cx="0" cy="-74" rx="30" ry="37" fill="#d7b58c"/><path d="M-29-80q-2-39 31-33t29 33l-15-16-27 4Z" fill="#c6c5b3"/><g fill="none" stroke="${colours.dark}" stroke-width="3"><circle cx="-12" cy="-75" r="9"/><circle cx="12" cy="-75" r="9"/><path d="M-3-75h6M-8-55q8 6 16 0"/></g></g>
  <path d="M278 409H610V431H278Z" fill="#ae9272"/><path d="M295 431h14v102h-14ZM579 431h14v102h-14Z" fill="#7e876d"/>
  <path d="M324 292 555 342" stroke="#8c9c78" stroke-width="8"/><path d="M338 295V407M540 339V407" stroke="#8c9c78" stroke-width="6"/><circle class="m-bob" cx="384" cy="296" r="13" fill="${colours.rust}"/>
  <path d="M443 376h57v30h-57ZM456 348h31v28h-31Z" fill="${colours.lime}"/><path d="M573 380v-32h14v32l12 23h-38Z" fill="#9cbaad"/>${star(611, 200)}`);
}
function rivals() {
  return scene('Drie vriendelijke blokfiguren ontmoeten elkaar op een groen eiland, verbonden met een laptop en telefoon', `
  <g fill="none" stroke="#a8b88d" stroke-width="3" stroke-dasharray="5 9"><path d="M160 190Q360 73 560 190M160 190 260 321M560 190 480 321"/></g>
  <g transform="translate(110 151)"><rect width="100" height="66" rx="7" fill="${colours.dark}"/><rect x="8" y="8" width="84" height="50" fill="#c4d3aa"/><path d="M-10 66h120l10 13H-20Z" fill="#92a183"/></g>
  <g transform="translate(532 117)"><rect width="55" height="102" rx="9" fill="${colours.dark}"/><rect x="6" y="10" width="43" height="78" rx="3" fill="#c4d3aa"/><circle cx="28" cy="94" r="3" fill="#9cac66"/></g>
  <path d="M129 430 360 317 591 430 360 546Z" fill="#aebf90"/><path d="M129 430 360 546V573L129 457Z" fill="${colours.green}"/><path d="M360 546 591 430V457L360 573Z" fill="${colours.dark}"/>
  ${avatar(246, 378, colours.green, .9)}${avatar(374, 437, colours.rust, 1)}${avatar(491, 364, '#929e6b', .85)}
  <g class="m-float">${star(358, 177)}</g><circle class="m-twinkle" cx="279" cy="225" r="6" fill="#bca46f"/><circle class="m-twinkle" style="--d:-2s" cx="444" cy="234" r="6" fill="#bca46f"/>`);
}
function timeline() {
  return scene('Een route van een oude computer via een ruimtelijk blok en een verhaalboek naar verbonden spelers', `
  <path d="M166 210Q520 126 510 304T216 440Q147 517 545 517" stroke="#b6be99" stroke-width="7" fill="none" stroke-dasharray="8 11"/>
  <g transform="translate(104 151)"><rect width="139" height="102" rx="9" fill="#a2ab92"/><rect x="11" y="12" width="117" height="75" fill="${colours.dark}"/>${pixel(48, 28, 1)}<path d="M60 102h19v24H60ZM27 126h85v10H27Z" fill="#a2ab92"/></g>
  ${cube(443, 231, 48)}
  <g transform="translate(144 351)"><path d="M0 0Q44-20 83 1Q123-20 166 0V91Q123 72 83 93Q42 72 0 91Z" fill="#d7c59e"/><path d="M8 5Q45-7 77 10V80Q43 66 8 79ZM89 10Q124-7 158 5V79Q124 66 89 80Z" fill="${colours.paper}"/><path d="M83 1V93" stroke="#b7a079" stroke-width="3"/><g stroke="#a8b88d" stroke-width="3"><path d="M21 29h42M21 43h42M21 57h27M103 29h42M103 43h42M103 57h27"/></g></g>
  ${avatar(505, 475, colours.rust, .6)}${avatar(570, 493, colours.green, .6)}${star(368, 299)}`);
}
export function chapter(i) {
  return [() => hero('chapter'), doom, quake, halfLife, rivals, timeline][i]?.() ?? timeline();
}
export function completion() {
  return scene('Een open boek en een gamecontroller naast een warme boodschap van papa Jeremy, met rustige sterren', `
  <path d="M151 206Q250 178 360 224Q470 178 569 206V444Q466 411 360 454Q254 411 151 444Z" fill="#b89b76"/>
  <path d="M165 219Q258 192 353 237V437Q260 400 165 429ZM367 237Q462 192 555 219V429Q460 400 367 437Z" fill="${colours.paper}"/>
  <g stroke="#b2be95" stroke-width="6" stroke-linecap="round"><path d="M194 265h120M194 294h120M194 323h91M404 265h120M404 294h120M404 323h91"/></g>
  <g transform="translate(245 408)"><path d="M35 0H195Q220 0 235 39L251 84Q255 116 226 113L180 80H50L4 113Q-24 116-21 84L-5 39Q9 0 35 0Z" fill="${colours.green}"/><path d="M34 23h16v17h17v16H50v17H34V56H17V40h17Z" fill="${colours.cream}"/><circle cx="184" cy="35" r="10" fill="${colours.lime}"/><circle cx="209" cy="55" r="10" fill="#d8ba86"/></g>
  <g class="m-twinkle">${star(115, 161)}${star(601, 372)}${star(473, 120)}</g><path d="M343 143q-21-29-37-11t37 44q53-27 37-44t-37 11Z" fill="${colours.rust}"/>`);
}
export function card() { return hero('card'); }
