// Achter de schermen artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'website';

const lines = (x, y, n, w, gap, fill) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * gap}" width="${w - (i % 2) * 8}" height="7" rx="2" fill="${fill}"/>`).join('');

function room(id) {
  const p = `${slug}-${id}`;
  const slots = Array.from({ length: 6 }, (_, i) => `<rect x="552" y="${268 + i * 42}" width="78" height="16" rx="3" fill="#1b3128"/><circle class="led" cx="548" cy="${276 + i * 42}" r="5" fill="#d5e2b8"/>`).join('');
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een laptop op een bureau, met daarachter een huis vol boeken, een magazijn en een server die aan blijft">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d5decc"/><stop offset="1" stop-color="#f3ecda"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="moon-glow" cx="118" cy="108" r="46" fill="#f7e3a8" opacity=".4"/>
  <circle cx="118" cy="108" r="34" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e6" opacity=".75"><ellipse cx="300" cy="92" rx="78" ry="16"/><ellipse cx="250" cy="100" rx="36" ry="14"/><ellipse cx="520" cy="150" rx="90" ry="15"/><ellipse cx="470" cy="142" rx="28" ry="12"/></g>
  <path class="layer" d="M0 500Q180 440 360 490T720 450V760H0Z" fill="#a9c09a"/>
  <path d="M0 560Q200 520 380 560T720 530V760H0Z" fill="#7d9a72"/>
  <g class="layer">
    <path d="M36 348L130 228L224 348Z" fill="#517c67"/>
    <rect x="54" y="330" width="152" height="370" fill="#f7f3e8"/>
    <path d="M74 378H124V490H70Z" fill="#fbf8f1"/><path d="M128 378H184V490H128Z" fill="#f0e6d2"/><rect x="120" y="372" width="12" height="124" fill="#c4a882"/>
    ${lines(82, 396, 4, 34, 16, '#d9d0bc')}${lines(138, 396, 4, 36, 16, '#d9d0bc')}
    <rect x="82" y="428" width="34" height="8" rx="2" fill="#9cac66"/><rect x="138" y="444" width="36" height="8" rx="2" fill="#9cac66"/>
    <rect x="112" y="530" width="36" height="80" rx="2" fill="#6e503b"/>
  </g>
  <g class="layer">
    <path d="M248 360L360 248L472 360Z" fill="#6e503b"/>
    <rect x="266" y="346" width="188" height="360" fill="#c9aa7c"/>
    <rect x="290" y="378" width="140" height="16" fill="#a88862"/><rect x="290" y="470" width="140" height="16" fill="#a88862"/>
    <rect x="300" y="400" width="36" height="28" fill="#f4efe4"/><rect x="342" y="394" width="40" height="34" fill="#517c67"/><rect x="388" y="404" width="32" height="24" fill="#eadcc7"/>
    <rect x="304" y="492" width="44" height="36" fill="#284f3d"/><rect x="356" y="486" width="36" height="42" fill="#f4efe4"/><rect x="398" y="496" width="28" height="30" fill="#9cac66"/>
    <rect x="338" y="548" width="44" height="70" fill="#5c4636"/>
  </g>
  <g class="layer">
    <rect x="524" y="196" width="132" height="500" fill="#284f3d"/>
    <rect x="578" y="154" width="8" height="48" fill="#1b3128"/><circle cx="582" cy="148" r="8" fill="#d5e2b8"/>
    ${slots}
  </g>
  <circle class="ping-book" cx="130" cy="268" r="16" fill="#f7e3a8" opacity="0"/>
  <circle class="ping-shed" cx="360" cy="300" r="16" fill="#f7e3a8" opacity="0"/>
  <circle class="ping-rack" cx="590" cy="240" r="16" fill="#f7e3a8" opacity="0"/>
  <path d="M0 650H720V760H0Z" fill="#e7d6be"/>
  <path d="M0 650H720V682H0Z" fill="#f4ead8"/>
  <circle class="lamp-glow" cx="96" cy="628" r="42" fill="#f7e3a8" opacity=".28"/>
  <g class="layer">
    <path d="M88 668V724" stroke="#6e503b" stroke-width="8" stroke-linecap="round"/>
    <path d="M68 656H128L118 678H78Z" fill="#517c67"/>
    <ellipse cx="98" cy="656" rx="20" ry="8" fill="#f7e3a8"/>
  </g>
  <g class="layer">
    <ellipse cx="360" cy="708" rx="140" ry="14" fill="#c4b08e" opacity=".4"/>
    <path d="M248 488H472V632H248Z" fill="#284f3d"/>
    <path d="M262 502H458V618H262Z" fill="#f7f4ea"/>
    <path d="M262 502H458V534H262Z" fill="#517c67"/>
    ${lines(278, 552, 3, 110, 18, '#ddd4c2')}
    <rect class="cursor" x="396" y="584" width="4" height="16" fill="#284f3d"/>
    <path d="M220 626H500L528 728H192Z" fill="#3e4f44"/>
    <path d="M236 652H484" stroke="#2c3b33" stroke-width="6" stroke-linecap="round"/>
  </g>
  <circle class="packet" cx="360" cy="548" r="9" fill="#f7e3a8" opacity="0"/>
  <g class="layer">
    <path d="M612 700H666V748H612Z" fill="#b8845e"/>
    <path d="M600 748H678" stroke="#6e503b" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="628" cy="688" rx="22" ry="16" fill="#517c67"/><ellipse cx="656" cy="678" rx="18" ry="20" fill="#6f9463"/><ellipse cx="640" cy="664" rx="14" ry="16" fill="#9cac66"/>
  </g>
  </svg>`;
}

const frame = (aria, bg, disc, inner) => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
  <rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${disc}"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>${inner}</svg>`;

function phoneBook() {
  return frame(
    'Een groot open telefoonboek, met namen op de linkerbladzijde en nummers op de rechter',
    '#e4eadc',
    '#f6f1e4',
    `<ellipse cx="360" cy="470" rx="210" ry="18" fill="#c4b08e" opacity=".28"/>
    <path d="M150 168H350V500H140Z" fill="#fbf8f1"/><path d="M370 168H580V490H360Z" fill="#f3ead6"/>
    <rect x="344" y="156" width="22" height="356" fill="#c4a882"/>
    ${lines(176, 210, 7, 140, 32, '#ddd4c2')}${lines(396, 210, 7, 140, 32, '#ddd4c2')}
    <rect x="176" y="306" width="140" height="16" rx="3" fill="#9cac66"/>
    <rect x="396" y="338" width="120" height="16" rx="3" fill="#517c67"/>
    <g class="m-float"><circle cx="500" cy="250" r="34" fill="#d7e3d2" opacity=".85"/><circle cx="500" cy="250" r="34" fill="none" stroke="#284f3d" stroke-width="8"/><path d="M524 274L558 316" stroke="#284f3d" stroke-width="10" stroke-linecap="round"/></g>
    <path class="m-twinkle" d="M210 150l6 14 14 6-14 6-6 14-6-14-14-6 14-6Z" fill="#f7e3a8"/>`,
  );
}

function warehouse() {
  const box = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/>`;
  return frame(
    'Een magazijn met planken vol dozen en boeken, en een pakketje dat naar binnen zweeft',
    '#eadcc7',
    '#f3ead8',
    `<rect x="150" y="150" width="420" height="360" fill="#d8c4a4"/>
    <rect x="170" y="188" width="300" height="14" fill="#a88862"/><rect x="170" y="300" width="300" height="14" fill="#a88862"/><rect x="170" y="412" width="300" height="14" fill="#a88862"/>
    ${box(186, 210, 52, 64, '#f7f3e8')}${box(246, 222, 44, 52, '#517c67')}${box(300, 206, 58, 68, '#284f3d')}${box(368, 218, 40, 56, '#c4a47a')}${box(418, 214, 36, 60, '#f4efe4')}
    ${box(186, 322, 70, 64, '#9cac66')}${box(266, 330, 48, 56, '#f7f3e8')}${box(324, 318, 60, 68, '#6e503b')}${box(396, 328, 54, 58, '#517c67')}
    ${box(190, 434, 46, 52, '#eadcc7')}${box(248, 428, 64, 58, '#284f3d')}${box(324, 436, 40, 48, '#f4efe4')}${box(376, 430, 58, 56, '#9cac66')}
    <path d="M500 168H590V510H500Z" fill="#5c4636"/><path d="M508 176H548V510H508Z" fill="#3e342c"/><circle cx="534" cy="340" r="6" fill="#e8c36a"/>
    <g class="m-drift">${box(250, 470, 70, 48, '#f7e3a8')}<path d="M258 470V518M320 470V518M250 494H320" stroke="#e0c98a" stroke-width="3"/></g>`,
  );
}

function serverRoom() {
  const lights = Array.from({ length: 5 }, (_, i) => `<circle class="m-twinkle" style="--d:${-i * .6}s" cx="${300 + (i % 2) * 28}" cy="${250 + i * 48}" r="6" fill="#d5e2b8"/>`).join('');
  return frame(
    'Een serverkast die ’s nachts aan blijft, met de maan voor het raam',
    '#e7e2d4',
    '#24382f',
    `<circle class="m-float" cx="470" cy="180" r="28" fill="#f7e3a8"/>
    <circle class="m-twinkle" cx="200" cy="150" r="3" fill="#f7f3e8"/><circle class="m-twinkle" style="--d:-1.4s" cx="560" cy="210" r="2.5" fill="#f7f3e8"/><circle class="m-twinkle" style="--d:-2.2s" cx="240" cy="230" r="2" fill="#f7f3e8"/>
    <rect x="250" y="200" width="200" height="280" rx="8" fill="#1b3128"/>
    <rect x="268" y="220" width="164" height="36" rx="4" fill="#284f3d"/>
    <rect x="268" y="268" width="164" height="36" rx="4" fill="#284f3d"/>
    <rect x="268" y="316" width="164" height="36" rx="4" fill="#284f3d"/>
    <rect x="268" y="364" width="164" height="36" rx="4" fill="#284f3d"/>
    <rect x="268" y="412" width="164" height="36" rx="4" fill="#284f3d"/>
    ${lights}
    <rect x="318" y="480" width="64" height="28" fill="#14261f"/>
    <ellipse cx="250" cy="530" rx="16" ry="8" fill="#14261f"/><path d="M244 530V500" stroke="#9cac66" stroke-width="4"/><ellipse cx="236" cy="496" rx="14" ry="8" fill="#517c67"/><ellipse cx="258" cy="490" rx="12" ry="10" fill="#6f9463"/>`,
  );
}

function chain() {
  const book = `<path d="M0 8H28V52H-4Z" fill="#fbf8f1"/><path d="M32 8H62V52H32Z" fill="#f0e6d2"/><rect x="26" y="4" width="8" height="52" fill="#c4a882"/>`;
  const crate = `<rect x="4" y="10" width="52" height="40" rx="3" fill="#c9aa7c"/><path d="M4 10L30 0L56 10" fill="#a88862"/>`;
  const tower = `<rect x="16" y="4" width="28" height="52" rx="2" fill="#284f3d"/><circle cx="30" cy="18" r="4" fill="#d5e2b8"/><circle cx="30" cy="32" r="4" fill="#d5e2b8"/><circle cx="30" cy="46" r="4" fill="#9cac66"/>`;
  const medal = (x, y, inner) => `<g transform="translate(${x} ${y})"><circle cx="30" cy="36" r="52" fill="#f7f3e8"/><g transform="translate(0 10)">${inner}</g></g>`;
  return frame(
    'Een boek, een magazijn en een server op een rij, met daaronder een laptop waarop een verhaal openstaat',
    '#e6eadc',
    '#f4efe4',
    `<path d="M180 206H540" stroke="#c4b08e" stroke-width="6" stroke-dasharray="2 10" stroke-linecap="round"/>
    ${medal(120, 170, book)}${medal(300, 170, crate)}${medal(480, 170, tower)}
    <path d="M250 400H470V470H250Z" fill="#284f3d"/><path d="M264 414H456V548H264Z" fill="#f7f4ea"/><path d="M264 414H456V442H264Z" fill="#517c67"/>
    ${lines(284, 460, 3, 120, 20, '#ddd4c2')}
    <path d="M230 548H490L512 590H208Z" fill="#3e4f44"/>
    <path class="m-twinkle" d="M500 390l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" fill="#f7e3a8"/>`,
  );
}

function ready() {
  return frame(
    'Een open laptop met een verhaal op het scherm, en een klein lampje van de server dat nog brandt',
    '#eadcc7',
    '#f6f0e4',
    `<rect x="520" y="150" width="70" height="120" rx="4" fill="#284f3d"/>
    <circle class="m-twinkle" cx="555" cy="186" r="6" fill="#d5e2b8"/><circle class="m-twinkle" style="--d:-1.2s" cx="555" cy="214" r="6" fill="#d5e2b8"/><circle class="m-twinkle" style="--d:-2s" cx="555" cy="242" r="6" fill="#9cac66"/>
    <ellipse cx="360" cy="500" rx="180" ry="16" fill="#c4b08e" opacity=".3"/>
    <path d="M176 250H544V430H176Z" fill="#284f3d"/><path d="M196 270H524V520H196Z" fill="#f7f4ea"/><path d="M196 270H524V312H196Z" fill="#517c67"/>
    ${lines(224, 340, 4, 200, 28, '#ddd4c2')}
    <path d="M150 520H570L604 590H116Z" fill="#3e4f44"/>
    <path class="m-bob" d="M360 214C360 214 316 186 316 162C316 146 330 134 344 134C354 134 360 142 360 142C360 142 366 134 376 134C390 134 404 146 404 162C404 186 360 214 360 214Z" fill="#b76e55"/>`,
  );
}

export const hero = id => room(id);
export const chapter = i => [phoneBook, warehouse, serverRoom, chain][i - 1]();
export const completion = () => ready();
export const card = () => room('card');
