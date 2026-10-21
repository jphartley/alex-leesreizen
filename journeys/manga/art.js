// Original paper-and-ink scenes. All artwork is local SVG with slug-prefixed ids.
const palette = { paper: '#f7f5ed', cream: '#eadcc7', ink: '#284f3d', green: '#517c67', leaf: '#9cac66', clay: '#bc8264', light: '#dce3cd' };
const star = (x, y, s = 1, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0-16 4-4 16 0 4 4 0 16-4 4-16 0-4-4Z" fill="#c7ac72"/></g>`;
const plant = (x, y) => `<g transform="translate(${x} ${y})"><g class="leaf"><path d="M-3 0H3V-130H-3Z" fill="#517c67"/><path d="M0-35Q-65-35-58-86Q-8-88 0-35M0-60Q63-65 52-114Q8-108 0-60M0-95Q-38-121-18-158Q17-143 0-95Z" fill="#9cac66"/></g><path d="M-38-4H38L28 60H-28Z" fill="#bc8264"/><path d="M-43-10H43V4H-43Z" fill="#cf9b79"/></g>`;
const ship = () => `<path d="M-85 28H85L59 65H-53Z" fill="#8a684f"/><path d="M-73 35H73L68 43H-65Z" fill="#bc8264"/><path d="M-3-100H3V30H-3Z" fill="#8a684f"/><path d="M10-85Q57-52 60 12H10Z" fill="#f7f5ed"/><path d="M-12-66V12H-66Q-60-26-12-66Z" fill="#eadcc7"/><path d="M4-103H37L27-89H4Z" fill="#9cac66"/><circle cx="-35" cy="51" r="5" fill="#eadcc7"/><circle cx="-13" cy="51" r="5" fill="#eadcc7"/><circle cx="9" cy="51" r="5" fill="#eadcc7"/>`;
const robot = () => `<ellipse cx="0" cy="117" rx="78" ry="13" fill="#284f3d" opacity=".1"/>
  <path d="M-39 45H-9V111H-47ZM9 45H39L47 111H9Z" fill="#517c67"/><rect x="-49" y="100" width="43" height="19" rx="8" fill="#284f3d"/><rect x="6" y="100" width="43" height="19" rx="8" fill="#284f3d"/>
  <rect x="-49" y="-45" width="98" height="100" rx="24" fill="#9cac66"/><path d="M-20-25H20V22H-20Z" fill="#eadcc7"/><path d="M0 9C-33-9-12-25 0-13C12-25 33-9 0 9Z" fill="#bc8264"/>
  <g transform="translate(-52 -28) rotate(24)"><rect x="-18" width="24" height="68" rx="12" fill="#517c67"/><circle cx="-6" cy="69" r="15" fill="#eadcc7"/></g><g transform="translate(52 -28) rotate(-30)"><rect x="-6" width="24" height="68" rx="12" fill="#517c67"/><circle cx="6" cy="69" r="15" fill="#eadcc7"/></g>
  <rect x="-16" y="-68" width="32" height="27" rx="7" fill="#517c67"/><rect x="-58" y="-163" width="116" height="106" rx="35" fill="#eadcc7"/><rect x="-66" y="-130" width="13" height="38" rx="6" fill="#9cac66"/><rect x="53" y="-130" width="13" height="38" rx="6" fill="#9cac66"/>
  <path d="M-57-132Q-67-176-19-180L7-195 17-177Q61-177 58-135L36-153-3-139-29-154Z" fill="#284f3d"/>
  <ellipse cx="-24" cy="-114" rx="17" ry="23" fill="#f7f5ed"/><ellipse cx="24" cy="-114" rx="17" ry="23" fill="#f7f5ed"/><ellipse cx="-21" cy="-110" rx="9" ry="15" fill="#284f3d"/><ellipse cx="21" cy="-110" rx="9" ry="15" fill="#284f3d"/><circle cx="-18" cy="-117" r="4" fill="#f7f5ed"/><circle cx="24" cy="-117" r="4" fill="#f7f5ed"/><path d="M-13-78Q0-64 13-78Z" fill="#bc8264"/>`;
const frame = (label, contents) => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}"><rect width="720" height="650" fill="${palette.cream}"/><circle cx="360" cy="300" r="247" fill="#f1eadb"/>${contents}</svg>`;

export function hero(id = 'hero') {
  const p = `manga-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een open mangaboek op een tekentafel met berglandschappen, een zeilschip en een penseel">
  <defs><clipPath id="${p}-window"><rect x="90" y="65" width="540" height="365" rx="150"/></clipPath><clipPath id="${p}-panel"><path d="M374 360Q462 324 566 352V568Q464 546 374 580Z"/></clipPath></defs>
  <rect width="720" height="760" fill="#eadcc7"/>
  <g clip-path="url(#${p}-window)"><rect x="90" y="65" width="540" height="365" fill="#dce3cd"/><circle cx="480" cy="165" r="56" fill="#e9cf91"/><g class="cloud" fill="#f7f5ed"><ellipse cx="208" cy="155" rx="108" ry="13"/><ellipse cx="520" cy="250" rx="110" ry="13"/></g><path d="M80 398 280 175 432 369 535 244 650 379V450H80Z" fill="#9cac66"/><path d="m280 175-65 74 57-17 35 27 24-18Z" fill="#f7f5ed"/><path d="M80 382Q185 310 293 372T650 334V445H80Z" fill="#517c67"/></g>
  <path d="M353 65H367V430H353Z" fill="#eadcc7"/><path d="M90 286H630V298H90Z" fill="#eadcc7"/>
  <path d="M0 470Q360 434 720 470V760H0Z" fill="#c9aa83"/><path d="M0 668Q360 635 720 668V760H0Z" fill="#b99770"/>
  <ellipse cx="353" cy="634" rx="271" ry="34" fill="#8a684f" opacity=".16"/>
  <g class="layer"><path d="M107 345Q230 294 357 345Q482 294 609 345V615Q478 572 357 629Q230 573 107 615Z" fill="#284f3d"/><path d="M121 336Q244 291 357 342Q474 292 595 336V600Q473 557 357 614Q242 559 121 600Z" fill="#e3d5bd"/><path d="M129 326Q248 287 357 337Q471 287 587 326V584Q473 547 357 602Q243 548 129 584Z" fill="#f7f5ed"/>
  <path d="M350 337H363V601H350Z" fill="#eadcc7"/>
  <path d="M149 350Q238 322 333 357V475Q238 441 149 466Z" fill="#dce3cd"/><path d="M149 440 209 368 270 432 303 393 333 437V475Q238 441 149 466Z" fill="#517c67"/><path d="m209 368-24 29 27-7 16 10Z" fill="#f7f5ed"/>
  <path d="M149 480Q232 460 333 491V564Q236 535 149 555Z" fill="#eadcc7"/><g fill="#9cac66"><path d="M166 494 189 490 226 544 203 540Z"/><path d="M213 490 235 493 275 554 252 548Z"/><path d="M263 500 285 506 317 559 295 555Z"/></g>
  <g clip-path="url(#${p}-panel)"><rect x="374" y="320" width="205" height="280" fill="#dce3cd"/><circle class="paper-light" cx="519" cy="391" r="29" fill="#f7f5ed"/><path d="M374 478Q438 459 485 478T580 472V600H374Z" fill="#7ea28f"/><g transform="translate(471 458) scale(.65)"><g class="little-ship">${ship()}</g></g><path d="M390 531H435V536H390ZM490 550H546V555H490ZM438 516H469V521H438Z" fill="#cbdac3"/></g>
  </g>
  <g class="layer">${plant(644, 472)}<g transform="translate(78 548) rotate(-19)"><rect x="-18" y="-114" width="36" height="125" rx="5" fill="#517c67"/><path d="M-18-114 0-154 18-114Z" fill="#eadcc7"/><path d="M-5-143 0-154 5-143Z" fill="#284f3d"/><path d="M-5-108H1V-6H-5Z" fill="#9cac66"/></g></g>
  ${star(81, 342, .8, 'spark')}${star(641, 287, .6, 'spark')}${star(535, 664, .65, 'spark')}
  </svg>`;
}

function studio() {
  return frame('Een tekentafel met drie striptekeningen, een pot pennen, papier en een kleine plant', `
  <path d="M80 425 610 393 659 507 99 551Z" fill="#bc9975"/><path d="M101 550H120V626H101ZM602 512H620V626H602Z" fill="#8a684f"/>
  <g transform="translate(175 207) rotate(-5 175 145)"><path d="M-12 5H357V285H-12Z" fill="#cbb99d"/><rect width="345" height="273" rx="4" fill="#f7f5ed"/>
  <rect x="18" y="18" width="142" height="104" rx="2" fill="#dce3cd"/><path d="m18 122 48-74 40 48 28-30 26 56Z" fill="#9cac66"/>
  <rect x="177" y="18" width="150" height="104" rx="2" fill="#eadcc7"/><ellipse cx="251" cy="62" rx="49" ry="25" fill="#f7f5ed"/><path d="m244 82-18 21 2-27Z" fill="#f7f5ed"/>
  <rect x="18" y="139" width="309" height="113" rx="2" fill="#dce3cd"/><g transform="translate(260 204) scale(.5)">${ship()}</g><path d="M27 233Q85 203 142 233T320 231V252H27Z" fill="#7ea28f"/>
  </g>
  <g transform="translate(117 340)"><g class="m-sway"><path d="M-20-121H-11V25H-20Z" fill="#284f3d"/><path d="M0-133H9V25H0Z" fill="#bc8264"/><path d="M20-113H29V25H20Z" fill="#9cac66"/></g><path d="M-36-25H45L35 61H-25Z" fill="#517c67"/><ellipse cx="4" cy="-25" rx="41" ry="7" fill="#284f3d"/></g>
  ${plant(580, 350)}
  <g transform="translate(350 528) rotate(-12)"><rect x="-70" y="-6" width="130" height="12" rx="4" fill="#284f3d"/><path d="M60-6 79 0 60 6Z" fill="#f7f5ed"/></g>
  ${star(134, 175, .8, 'm-twinkle')}${star(565, 154, .65, 'm-twinkle')}`);
}

function feelings() {
  return frame('Een vriendelijke robot met grote ogen en een hart op zijn borst, naast een schetsboek', `
  <path d="M70 500Q360 460 650 500V551H70Z" fill="#c9aa83"/>
  <g transform="translate(302 344)"><g class="m-bob">${robot()}</g></g>
  <g transform="translate(465 283) rotate(8)"><rect x="-9" y="-7" width="160" height="202" rx="7" fill="#517c67"/><rect width="140" height="183" rx="3" fill="#f7f5ed"/><path d="M16 20H121V25H16ZM16 32H91V37H16Z" fill="#c9d2bb"/>
  <ellipse cx="43" cy="88" rx="24" ry="33" fill="#dce3cd"/><ellipse cx="99" cy="88" rx="24" ry="33" fill="#dce3cd"/><ellipse cx="46" cy="91" rx="13" ry="22" fill="#284f3d"/><ellipse cx="102" cy="91" rx="13" ry="22" fill="#284f3d"/><circle cx="51" cy="81" r="6" fill="#f7f5ed"/><circle cx="107" cy="81" r="6" fill="#f7f5ed"/><path d="M45 143Q70 165 95 143Z" fill="#bc8264"/></g>
  <g class="m-float"><ellipse cx="145" cy="209" rx="45" ry="32" fill="#f7f5ed"/><path d="m156 228 14 24-2-28Z" fill="#f7f5ed"/><path d="M145 219C110 197 131 181 145 197C159 181 180 197 145 219Z" fill="#bc8264"/></g>
  ${star(524, 161, .75, 'm-twinkle')}${star(141, 394, .6, 'm-twinkle')}`);
}

function action() {
  return frame('Een striptekening van een springende vechter boven een rustige oefenplek in de bergen', `
  <circle cx="486" cy="170" r="48" fill="#e9cf91"/><g class="m-drift" fill="#f7f5ed"><ellipse cx="211" cy="169" rx="98" ry="12"/><ellipse cx="502" cy="243" rx="76" ry="10"/></g>
  <path d="M62 431 190 241 292 371 425 233 648 437Z" fill="#b9c6a2"/><path d="M66 456 248 321 420 453 554 345 654 456Z" fill="#9cac66"/><path d="M63 455Q360 420 656 455V529Q360 558 63 529Z" fill="#c5ad88"/><ellipse cx="342" cy="488" rx="126" ry="20" fill="#8a684f" opacity=".15"/>
  <g transform="translate(336 302)"><g class="m-float"><path d="M-33 31-61 77-93 101-76 123-31 99 6 53Z" fill="#517c67"/><path d="M4 36 45 56 98 51 103 75 42 86-15 62Z" fill="#517c67"/><path d="m-93 101-27 17 14 18 30-13ZM98 51l26-1 8 22-29 3Z" fill="#284f3d"/>
  <path d="M-34-57Q-9-69 24-49L35 41-37 42Z" fill="#bc8264"/><path d="M-35 22H34V37H-35Z" fill="#284f3d"/><path d="M-29-51-66-23-90-48-106-33-74 9-56 10-23-12ZM18-47l34-30 34-5 2 19-25 5-31 36Z" fill="#bc8264"/><circle cx="-101" cy="-44" r="13" fill="#eadcc7"/><circle cx="87" cy="-73" r="13" fill="#eadcc7"/>
  <path d="M-17-72H8V-46H-17Z" fill="#eadcc7"/><ellipse cx="-4" cy="-96" rx="31" ry="34" fill="#eadcc7"/><path d="M-34-92-40-124-25-120-20-143-3-133 12-151 20-130 37-132 26-104 11-116-9-103-20-113Z" fill="#284f3d"/><circle cx="9" cy="-94" r="4" fill="#284f3d"/><path d="m6-80 13-1-7 8Z" fill="#bc8264"/></g></g>
  <g fill="#f7f5ed" opacity=".8"><path d="m120 315 124-14-2 6-122 15ZM112 343l107-12-2 6-105 13ZM146 369l72-9-2 6-70 10Z"/></g>
  <circle cx="527" cy="476" r="30" fill="#d8ad67"/>${star(527, 476, .6)}${star(472, 344, .75, 'm-twinkle')}`);
}

function voyage() {
  return frame('Een piratenschip met lichte zeilen op een groene zee, met een strohoed en boeken op de voorgrond', `
  <circle cx="497" cy="171" r="45" fill="#e9cf91"/><g class="m-drift" fill="#f7f5ed"><ellipse cx="232" cy="164" rx="105" ry="12"/><ellipse cx="520" cy="240" rx="74" ry="10"/></g>
  <path d="M64 333Q140 244 208 322L263 350H64ZM481 350Q555 261 650 334V363H481Z" fill="#9cac66"/><path d="M64 346Q200 328 351 348T656 346V525H64Z" fill="#7ea28f"/>
  <g transform="translate(356 344) scale(1.25)"><g class="m-bob">${ship()}</g></g>
  <g fill="#dce3cd"><path d="M100 388H198V393H100ZM455 414H560V419H455ZM253 450H368V455H253ZM135 474H208V479H135ZM526 477H610V482H526Z"/></g>
  <path d="M64 518Q360 491 656 518V579H64Z" fill="#c9aa83"/>
  <g transform="translate(203 501)"><ellipse cx="0" cy="13" rx="89" ry="20" fill="#d7b77b"/><path d="M-51 9Q-48-52 0-53Q48-52 51 9Z" fill="#e4c990"/><path d="M-48-8Q0 1 48-8L51 7Q0 18-51 7Z" fill="#bc8264"/></g>
  <g transform="translate(472 526)"><rect x="-61" width="126" height="22" rx="4" fill="#517c67"/><path d="M-48 6H63V16H-48Z" fill="#f7f5ed"/><rect x="-72" y="-24" width="127" height="22" rx="4" fill="#bc8264"/><path d="M-59-18H53V-8H-59Z" fill="#eadcc7"/><rect x="-59" y="-48" width="122" height="22" rx="4" fill="#9cac66"/><path d="M-47-42H61V-32H-47Z" fill="#f7f5ed"/></g>
  ${star(130, 229, .7, 'm-twinkle')}`);
}

export const chapter = i => i === 1 ? studio() : i === 2 ? feelings() : i === 3 ? action() : voyage();
export const completion = () => voyage();
export const card = () => hero('card');
