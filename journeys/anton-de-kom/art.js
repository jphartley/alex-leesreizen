// Anton de Kom artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'anton-de-kom';

// A white wooden Paramaribo house with green shutters on a brick foundation; base is the ground line.
const house = (x, base, w, h, roof) => {
  const n = 2 * Math.max(1, Math.floor(w / 88)), s = w / n, top = -14 - h;
  const windows = [top + 16, top + h / 2 + 8].flatMap(y => Array.from({ length: n }, (_, c) => {
    const cx = s * (c + .5);
    return `<path d="M${cx - 7} ${y}h14v22h-14Z" fill="#e8d9a8"/><path d="M${cx - 13} ${y}h6v22h-6ZM${cx + 7} ${y}h6v22h-6Z" fill="#3f6b52"/>`;
  })).join('');
  return `<g transform="translate(${x} ${base})"><path d="M-4 0H${w + 4}V-14H-4Z" fill="#b8845e"/><path d="M0 -14H${w}V${top}H0Z" fill="#f5efe0"/>
  <path d="M0 ${top + h / 2}H${w}" stroke="#e2d8c2" stroke-width="3"/><path d="M-12 ${top}L${w / 2} ${top - w * .36}L${w + 12} ${top}Z" fill="${roof}"/>${windows}
  <path d="M${w / 2 - 9} -14V-42h18V-14Z" fill="#3f6b52"/><path d="M${w / 2 - 14} 0h28v-6h-28Z" fill="#e2d8c2"/></g>`;
};

const palm = (x, base, h, lean) => `<g class="palm"><path d="M${x} ${base}Q${x + lean * .3} ${base - h * .6} ${x + lean} ${base - h}" stroke="#8c6a4c" stroke-width="11" fill="none" stroke-linecap="round"/>
  <g transform="translate(${x + lean} ${base - h})" fill="none" stroke-linecap="round"><path d="M0 0q-50-30-96 6M0 0q-30-50-80-46M0 0q20-52 70-50M0 0q52-20 96 14M0 0q-10 40-56 64M0 0q30 30 52 72" stroke="#4f7a5a" stroke-width="10"/>
  <path d="M0 0q-40-14-74 18M0 0q40-6 74 30" stroke="#6f9463" stroke-width="8"/><circle r="9" fill="#6e503b" stroke="none"/></g></g>`;

// A simple waiting person: skin and clothing colours vary; x is the centre, base the feet.
const person = (x, base, skin, coat, tall = 1, d = 0) => `<g class="m-bob" style="--d:${d}s"><path d="M${x - 9} ${base}v-${34 * tall}h7v${34 * tall}ZM${x + 2} ${base}v-${34 * tall}h7v${34 * tall}Z" fill="#4a4038"/>
  <path d="M${x - 20} ${base - 30 * tall}Q${x - 20} ${base - 84 * tall} ${x} ${base - 84 * tall}Q${x + 20} ${base - 84 * tall} ${x + 20} ${base - 30 * tall}Z" fill="${coat}"/>
  <circle cx="${x}" cy="${base - 98 * tall}" r="${15 * tall}" fill="${skin}"/></g>`;

function paramaribo(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van Paramaribo: witte houten huizen met groene luiken aan de rivier, palmbomen, rode vogels en een kano op het water">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#dfe0c6"/><stop offset="1" stop-color="#f4e7c9"/></linearGradient><linearGradient id="${p}-river" x2="0" y2="1"><stop stop-color="#8aa894"/><stop offset="1" stop-color="#5d8876"/></linearGradient><clipPath id="${p}-riverclip"><path d="M0 456H720V640H0Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="540" cy="150" r="56" fill="#f7e3a8" opacity=".4"/>
  <circle cx="540" cy="150" r="56" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".65"><ellipse cx="220" cy="130" rx="130" ry="15"/><ellipse cx="90" cy="200" rx="90" ry="11"/><ellipse cx="640" cy="240" rx="100" ry="12"/></g>
  <g class="birds"><g fill="none" stroke="#c0604c" stroke-width="3" stroke-linecap="round"><path class="bird" d="m300 196 10-6 10 6"/><path class="bird" d="m338 212 8-5 8 5"/><path class="bird" d="m268 222 7-4 7 4"/></g></g>
  <path class="layer" style="--i:0" d="M0 446V350Q60 318 120 342T240 330T360 338T480 324T600 342T720 330V446Z" fill="#7c9a6a"/>
  <g class="layer" style="--i:1">
  ${house(30, 446, 120, 84, '#8a5a46')}${house(176, 446, 100, 96, '#6f7f6c')}${house(302, 446, 150, 80, '#9b6a50')}${house(478, 446, 104, 90, '#6f7f6c')}${house(606, 446, 120, 82, '#8a5a46')}
  <path d="M0 446H720V460H0Z" fill="#c9b48e"/></g>
  <path fill="url(#${p}-river)" d="M0 458H720V650H0Z"/>
  <g class="waves-back" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M40 486q20-8 40 0t40 0M440 480q20-8 40 0t40 0M600 520q20-8 40 0t40 0M200 560q20-8 40 0t40 0"/></g>
  <g class="waves" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M90 530q20-8 40 0t40 0t40 0M470 570q20-8 40 0t40 0M80 600q20-8 40 0t40 0"/></g>
  <g clip-path="url(#${p}-riverclip)"><ellipse class="glint" cx="-160" cy="500" rx="110" ry="5" fill="#fffbe0" opacity="0"/><ellipse class="glint" cx="-260" cy="574" rx="80" ry="4" fill="#fffbe0" opacity="0"/></g>
  <g transform="translate(300 560)"><ellipse cx="80" cy="14" rx="110" ry="7" fill="#4f7766" opacity=".45"/><g class="boat-drift"><g class="boat">
  <path d="M-20 -6Q80 6 180 -6Q170 16 80 18Q-10 16 -20 -6Z" fill="#6e503b"/><path d="M-12 -4Q80 6 172 -4" stroke="#9a7552" stroke-width="3" fill="none"/>
  <path d="M66 -4Q64 -40 80 -44Q96 -40 94 -4Z" fill="#c9915b"/><circle cx="80" cy="-56" r="11" fill="#6e4630"/><path d="M66 -60q14-12 28 0Z" fill="#e8d9a8"/>
  <g class="paddle"><path d="M86 -30 126 22" stroke="#8c6a4c" stroke-width="4" stroke-linecap="round"/><ellipse cx="128" cy="26" rx="5" ry="11" transform="rotate(-38 128 26)" fill="#8c6a4c"/></g></g></g></g>
  <path class="layer" style="--i:2" d="M0 630Q180 600 360 624T720 612V760H0Z" fill="#517c67"/>
  <path d="M0 676Q200 646 380 672T720 662V760H0Z" fill="#6b8f63"/>
  ${palm(80, 700, 300, 26)}${palm(650, 710, 260, -22)}
  <g fill="#9cac66">${[150, 196, 520, 572].map((x, i) => `<g class="grass"><path d="M${x} 700q-6-30-18-44M${x} 700q2-34 10-50M${x} 700q10-24 24-34" stroke="#9cac66" stroke-width="5" fill="none" stroke-linecap="round" style="--d:${-i}s"/></g>`).join('')}</g>
  </svg>`;
}

function desk() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een schrijfbureau met een typemachine, een kopje thee en het boek Wij slaven van Suriname, met door het raam Nederlandse grachtenhuizen">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#ebecd9"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <path d="M210 90H510V300H210Z" fill="#8c6a4c"/><path d="M224 104H496V286H224Z" fill="#d6e0d4"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".9"><ellipse cx="300" cy="134" rx="46" ry="9"/><ellipse cx="430" cy="124" rx="36" ry="7"/></g>
  <g fill="#b8845e"><path d="M232 286V200l24-26 24 26v86Z"/><path d="M372 286V196l22-30 22 30v90Z"/></g><g fill="#9b6a50"><path d="M282 286V186l20-24 20 24v100Z"/><path d="M420 286V206l26-28 26 28v80Z"/></g><path d="M324 286V210l24-22 24 22v76Z" fill="#c49269"/>
  <g fill="#f1e2b6">${[[244, 214], [294, 200], [336, 222], [384, 208], [434, 220], [294, 240], [384, 244], [434, 252]].map(([x, y]) => `<path d="M${x} ${y}h12v16h-12Z"/>`).join('')}</g>
  <path d="M224 270H496V286H224Z" fill="#6b8fa0"/><path d="M360 104V286M224 195H496" stroke="#8c6a4c" stroke-width="8"/>
  <g class="m-bob" style="--d:-1s"><ellipse cx="470" cy="290" rx="16" ry="11" fill="#9a9a8e"/><circle cx="482" cy="280" r="7" fill="#9a9a8e"/><path d="M488 279l7 2-7 2Z" fill="#d6a550"/></g>
  <path d="M190 296H530V310H190Z" fill="#e2d8c2"/>
  <path d="M90 420H630V444H90Z" fill="#9a7552"/><path d="M110 444h20v160h-20ZM590 444h20v160h-20Z" fill="#7c5a42"/>
  <g transform="translate(130 300)"><path d="M0 0H76V120H0Z" fill="#b76e55"/><path d="M76 0H88V120H76Z" fill="#8c4e3c"/><path d="M8 14H68V68H8Z" fill="#f5ecd4"/>
  <text x="38" y="36" font-family="sans-serif" font-size="11" font-weight="700" fill="#5a3a2c" text-anchor="middle">WIJ SLAVEN</text><text x="38" y="50" font-family="sans-serif" font-size="9" font-weight="700" fill="#5a3a2c" text-anchor="middle">VAN SURINAME</text>
  <text x="38" y="100" font-family="sans-serif" font-size="12" fill="#f5ecd4" text-anchor="middle">1934</text></g>
  <g transform="translate(260 300)"><path class="m-sway" style="--d:-2s" d="M50 0H150V70H50Z" fill="#fbf7ea"/><path d="M62 18h76M62 32h70M62 46h76" stroke="#c9bfa4" stroke-width="3"/>
  <path d="M20 60H180L196 120H4Z" fill="#284f3d"/><path d="M36 60H164V76H36Z" fill="#3e4a3e"/>
  <g fill="#e8d9a8">${Array.from({ length: 24 }, (_, i) => `<circle cx="${34 + (i % 8) * 19 + Math.floor(i / 8) * 4}" cy="${86 + Math.floor(i / 8) * 11}" r="4"/>`).join('')}</g></g>
  <g transform="translate(500 360)"><path d="M0 0H56L50 56Q28 64 6 56Z" fill="#f5efe0"/><path d="M56 12q22 4 14 26-6 10-18 8" stroke="#f5efe0" stroke-width="7" fill="none"/><ellipse cx="28" cy="62" rx="40" ry="6" fill="#e2d8c2"/>
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M16 -10Q0 -32 16 -54T16 -92"/><path class="m-steam" style="--d:-1.8s" d="M40 -10Q24 -32 40 -54T40 -92"/></g></g>
  </svg>`;
}

function office() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een klein wit houten huis in Paramaribo met een bordje ADVIES bij de deur, waar vier mensen in de rij wachten op hulp">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <circle cx="190" cy="150" r="40" fill="#f7e3a8"/>
  <g class="m-drift" fill="#fbf6e6" opacity=".9"><ellipse cx="320" cy="120" rx="60" ry="11"/><ellipse cx="500" cy="150" rx="46" ry="9"/></g>
  <path d="M100 480Q360 450 620 480V520H100Z" fill="#c9b48e"/>
  <g transform="translate(330 480)"><path d="M-4 0H244V-16H-4Z" fill="#b8845e"/><path d="M0 -16H240V-186H0Z" fill="#f5efe0"/><path d="M-16 -186L120 -262L256 -186Z" fill="#8a5a46"/>
  <path d="M30 -150h26v34H30ZM184 -150h26v34h-26Z" fill="#e8d9a8"/><path d="M20 -150h10v34H20ZM56 -150h10v34H56ZM174 -150h10v34h-10ZM210 -150h10v34h-10Z" fill="#3f6b52"/>
  <path d="M96 -16V-110h48V-16Z" fill="#f2c97a"/><path d="M96 -110h48v4H96Z" fill="#3f6b52"/><path d="M144 -110v94l22 10V-118Z" fill="#3f6b52"/>
  <path d="M86 0h68v-8H86Z" fill="#e2d8c2"/>
  <g class="m-sway" style="--d:-1s"><path d="M-30 -130v14M10 -130v14" stroke="#6b5b43" stroke-width="2"/><path d="M-44 -116H24V-90H-44Z" fill="#284f3d"/><text x="-10" y="-98" font-family="sans-serif" font-size="13" font-weight="700" fill="#f5ecd4" text-anchor="middle">ADVIES</text></g>
  <path d="M-50 -130H16" stroke="#8c6a4c" stroke-width="4"/></g>
  ${person(280, 490, '#6e4630', '#b76e55', 1, 0)}${person(222, 492, '#8a5a3c', '#517c67', 1.05, -1.2)}${person(168, 494, '#a9714c', '#d6a550', .7, -2.1)}${person(120, 496, '#5a3a2c', '#7c8fa0', 1, -.6)}
  <g class="m-sway" style="--d:-3s"><path d="M600 500Q596 420 610 330" stroke="#8c6a4c" stroke-width="9" fill="none" stroke-linecap="round"/><g transform="translate(610 330)" fill="none" stroke-linecap="round" stroke="#4f7a5a" stroke-width="8"><path d="M0 0q-40-24-76 6M0 0q-20-40-60-36M0 0q20-40 56-34M0 0q40-12 70 16M0 0q-6 30-40 46"/></g></g>
  <g class="m-float" fill="#c0604c"><path d="m470 160 8-5 8 5" stroke="#c0604c" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  </svg>`;
}

function resistance() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een kamer in de nacht met een brandende lamp, een stapel kranten van De Vonk en een raam met de maan en sterren">
  <rect width="720" height="650" fill="#2f4a3f"/><circle cx="360" cy="315" r="223" fill="#365648"/>
  <g fill="none" stroke="#5f8070" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <path d="M400 90H580V300H400Z" fill="#7c5a42"/><path d="M412 102H568V288H412Z" fill="#1f3a33"/>
  <circle cx="520" cy="150" r="24" fill="#f3ead0"/><circle cx="530" cy="144" r="20" fill="#1f3a33"/>
  <g fill="#f3ead0">${[[440, 130, 0], [470, 200, -1], [540, 230, -2], [450, 250, -.5], [500, 120, -1.5]].map(([x, y, d]) => `<circle class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
  <path d="M490 102V288M412 195H568" stroke="#7c5a42" stroke-width="7"/>
  <path d="M110 420H620V442H110Z" fill="#7c5a42"/><path d="M130 442h18v160h-18ZM582 442h18v160h-18Z" fill="#5f4433"/>
  <g transform="translate(200 270)"><circle class="m-twinkle" cx="40" cy="60" r="90" fill="#f2c97a" opacity=".22"/><path d="M28 150h24V90H28Z" fill="#8c6a4c"/><path d="M10 150h60v-10H10Z" fill="#5a4332"/>
  <path d="M0 90Q40 20 80 90Z" fill="#3f6b52"/><ellipse cx="40" cy="96" rx="14" ry="6" fill="#f7e3a8"/></g>
  <g transform="translate(330 330)">${[0, 1, 2, 3, 4].map(i => `<path d="M${i * 3} ${78 - i * 10}H${150 + i * 3}V${90 - i * 10}H${i * 3}Z" fill="${i % 2 ? '#e2d8c2' : '#f5efe0'}"/>`).join('')}
  <path d="M12 0H162V38H12Z" fill="#f5efe0"/><text x="87" y="26" font-family="sans-serif" font-size="18" font-weight="700" fill="#284f3d" text-anchor="middle">DE VONK</text>
  <path d="M24 38v10M150 38v10" stroke="#c9bfa4" stroke-width="3"/></g>
  <g transform="translate(520 360)"><path d="M0 60L8 0" stroke="#d6c7a0" stroke-width="5" stroke-linecap="round"/><path d="M6 6l4-10 4 12Z" fill="#3e4a3e"/></g>
  <g class="m-float" style="--d:-2s" fill="#f2c97a"><path d="m620 210 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

function memorial() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een open boek op een stenen sokkel met de naam Anton de Kom, met bloemen ervoor en de opkomende zon">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#efe9d4"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <circle class="m-twinkle" cx="360" cy="260" r="140" fill="#f7e3a8" opacity=".4"/><circle cx="360" cy="260" r="96" fill="#f7e3a8"/>
  <g class="m-drift" fill="#f8f5e5" opacity=".9"><ellipse cx="200" cy="170" rx="60" ry="10"/><ellipse cx="540" cy="200" rx="50" ry="9"/></g>
  <g class="m-float" stroke="#c0604c" stroke-width="3" fill="none" stroke-linecap="round"><path d="m470 130 9-5 9 5"/><path d="m500 150 7-4 7 4"/></g>
  <path d="M90 470Q360 430 630 470V540H90Z" fill="#9cac66"/>
  <path d="M270 300H450V480H270Z" fill="#d9ccb0"/><path d="M256 290H464V306H256ZM256 470H464V486H256Z" fill="#c4b594"/>
  <text x="360" y="370" font-family="sans-serif" font-size="20" font-weight="700" fill="#5a4a38" text-anchor="middle">ANTON DE KOM</text>
  <text x="360" y="398" font-family="sans-serif" font-size="14" fill="#5a4a38" text-anchor="middle">1898–1945</text>
  <g transform="translate(360 290)"><path d="M0 -4Q-40 -24 -86 -14V-2Q-40 -12 0 6Z" fill="#f5efe0"/><path d="M0 -4Q40 -24 86 -14V-2Q40 -12 0 6Z" fill="#fbf7ea"/><path d="M-70 -12q30-8 60 2M10 -10q30-8 60 2" stroke="#c9bfa4" stroke-width="2" fill="none"/></g>
  ${[[220, '#b76e55', 0], [250, '#e0b060', -1], [470, '#e0b060', -2], [500, '#b76e55', -.5], [530, '#d98b5a', -1.5], [190, '#d98b5a', -2.5]].map(([x, c, d]) => `<g class="m-sway" style="--d:${d}s"><path d="M${x} 500V430" stroke="#517c67" stroke-width="4"/><path d="M${x} 430q-14-10-10-28 6 8 10 0 4 8 10 0 4 18-10 28Z" fill="${c}"/><path d="M${x} 470q-14-4-18-16 12 0 18 10" fill="#6f9463"/></g>`).join('')}
  </svg>`;
}

export const hero = id => paramaribo(id);
export const chapter = i => i === 1 ? desk() : i === 2 ? office() : resistance();
export const completion = () => memorial();
export const card = () => paramaribo('card');
