// Hongkong artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'hongkong';

// Skyline towers as [x, width, top, colour]; each tower's windows form one .lights group for the hero.
const towers = [[18,46,262,'#9fb39c'],[68,38,300,'#c9c3a8'],[110,52,214,'#7f9b86'],[166,42,276,'#b5b996'],[212,58,150,'#6e8f7c'],[274,40,246,'#c7bfa2'],[318,52,196,'#8ea68f'],[374,40,286,'#b3b894'],[418,56,228,'#9fb39c'],[478,44,264,'#c9c3a8'],[526,60,176,'#7f9b86'],[590,46,254,'#b5b996'],[640,44,296,'#9fb39c'],[688,40,232,'#c7bfa2']];
const base = 432;
const tower = ([x, w, top, c]) => {
  const cols = w > 48 ? 3 : 2, gap = w / (cols + 1), rows = Math.floor((base - top - 24) / 22);
  const wins = Array.from({ length: rows * cols }, (_, n) => `<path d="M${(x + gap * (n % cols + 1) - 4).toFixed(1)} ${top + 16 + Math.floor(n / cols) * 22}h8v10h-8Z"/>`).join('');
  const roof = top === 150 ? `<path d="M${x} ${top}L${x + w / 2} ${top - 44}L${x + w} ${top}Z" fill="${c}"/><path d="M${x + w / 2} ${top - 44}V${top - 74}" stroke="#56705f" stroke-width="3"/><path d="M${x} ${top + 60}L${x + w} ${top}M${x} ${top + 60}L${x + w} ${top + 120}M${x} ${top + 180}L${x + w} ${top + 120}" stroke="#5c7d6a" stroke-width="2" opacity=".6"/>` : '';
  return `${roof}<path d="M${x} ${top}H${x + w}V${base}H${x}Z" fill="${c}"/><g class="lights" fill="#f6eac6" opacity=".55">${wins}</g>`;
};
// A junk with ribbed, fan-shaped sails; battens are drawn as darker lines across each sail.
const junkSail = (x, top, w, h) => `<path class="sail" d="M${x} ${top}Q${x + w * .6} ${top - 12} ${x + w} ${top + 8}L${x + w * .92} ${top + h}H${x + 4}Z" fill="#c07a5a"/><g stroke="#8c5a3c" stroke-width="2.5">${Array.from({ length: 4 }, (_, i) => `<path d="M${x + 2} ${top + (i + 1) * h / 5}H${x + w * .96}"/>`).join('')}</g>`;

function harbour(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van de haven van Hongkong met een jonk met rode zeilen, een groene veerboot, wolkenkrabbers en een berg erachter">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d6dcc4"/><stop offset="1" stop-color="#f1ead2"/></linearGradient><linearGradient id="${p}-sea" x2="0" y2="1"><stop stop-color="#86a898"/><stop offset="1" stop-color="#5d8876"/></linearGradient><clipPath id="${p}-seaclip"><path d="M0 430H720V660H0Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="560" cy="120" r="50" fill="#f7e3a8" opacity=".4"/>
  <circle cx="560" cy="120" r="50" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".6"><ellipse cx="200" cy="110" rx="130" ry="15"/><ellipse cx="420" cy="170" rx="90" ry="11"/><ellipse cx="660" cy="220" rx="100" ry="11"/></g>
  <path class="layer" style="--i:0" d="M0 440V290Q70 240 140 262Q230 150 320 178Q400 120 480 196Q580 170 640 214Q690 230 720 226V440Z" fill="#a9bea6"/>
  <g class="layer" style="--i:1">${towers.map(tower).join('')}<path d="M0 ${base - 2}H720V${base + 8}H0Z" fill="#6e8f7c"/></g>
  <path fill="url(#${p}-sea)" d="M0 438H720V680H0Z"/>
  <g fill="#f6eac6" opacity=".18">${towers.map(([x, w]) => `<path d="M${x + w / 2 - 3} 446h6v${40 + (x % 3) * 12}h-6Z"/>`).join('')}</g>
  <g class="waves-back" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M30 470q20-8 40 0t40 0M420 462q20-8 40 0t40 0M600 500q20-8 40 0t40 0M250 590q20-8 40 0t40 0"/></g>
  <g class="waves" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M60 540q20-8 40 0t40 0t40 0M320 620q20-8 40 0t40 0M120 620q20-8 40 0t40 0M560 610q20-8 40 0t40 0"/></g>
  <g clip-path="url(#${p}-seaclip)"><ellipse class="glint" cx="-160" cy="500" rx="110" ry="5" fill="#fffbe0" opacity="0"/><ellipse class="glint" cx="-260" cy="570" rx="80" ry="4" fill="#fffbe0" opacity="0"/></g>
  <g transform="translate(60 468)"><g class="ferry"><path d="M0 26H130L118 44H10Z" fill="#284f3d"/><path d="M12 8H118V26H12Z" fill="#f3ead6"/><path d="M26 0H104V8H26Z" fill="#35604a"/><g fill="#8ea68f">${Array.from({ length: 7 }, (_, i) => `<path d="M${20 + i * 14} 12h8v8h-8Z"/>`).join('')}</g><path d="M4 44H124" stroke="#4f7766" stroke-width="3" opacity=".5"/></g></g>
  <g transform="translate(370 470)"><ellipse cx="110" cy="154" rx="120" ry="8" fill="#4f7766" opacity=".5"/><g class="junk-drift"><g class="junk">
  <path d="M0 110Q-6 92 -14 88L20 110H190L226 80Q220 104 210 118L186 150H30Z" fill="#6e503b"/><path d="M12 124H200" stroke="#9a7552" stroke-width="5"/><path d="M160 94H214V116H160Z" fill="#7c5a42"/><path d="M170 100h8v8h-8ZM186 100h8v8h-8Z" fill="#e8c98a"/>
  <path d="M58 0H63V112H58ZM132 -34H137V112H132ZM190 30H194V96H190Z" fill="#5a4332"/>
  ${junkSail(22, 10, 64, 92)}${junkSail(92, -24, 84, 124)}${junkSail(176, 36, 36, 56)}
  </g></g></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2"><path class="bird" d="m140 180 9-5 9 5"/><path class="bird" d="m172 194 7-4 7 4"/></g>
  <path class="layer" style="--i:2" d="M0 640Q180 610 360 634T720 622V760H0Z" fill="#517c67"/>
  <path d="M0 680Q200 650 380 676T720 666V760H0Z" fill="#6b8f63"/>
  <path d="M430 700H720V716H430Z" fill="#9a7552"/><path d="M450 716h10v44h-10ZM560 716h10v44h-10ZM670 716h10v44h-10Z" fill="#7c5a42"/>
  <path d="M64 760V560" stroke="#5a4332" stroke-width="6"/><path d="M64 566H112" stroke="#5a4332" stroke-width="4"/>
  <g transform="translate(108 566)"><g class="lantern"><path d="M0 0V14" stroke="#5a4332" stroke-width="2"/><ellipse cx="0" cy="40" rx="30" ry="34" fill="#d98b5a" fill-opacity=".3"/><ellipse cx="0" cy="40" rx="18" ry="24" fill="#c9674e"/><path d="M-10 18h20M-10 62h20" stroke="#8c5a3c" stroke-width="4"/><path d="M0 64V78" stroke="#c9a36a" stroke-width="3"/></g></g>
  ${[[200,652,38],[250,660,30],[630,640,34]].map(([x, y, r]) => `<g class="tree"><path d="M${x} ${y + r + 40}V${y + 10}" stroke="#5a4332" stroke-width="7"/><circle cx="${x}" cy="${y}" r="${r}" fill="#35604a"/><circle cx="${x - r * .5}" cy="${y + r * .3}" r="${r * .7}" fill="#3f6b53"/><circle cx="${x + r * .55}" cy="${y + r * .2}" r="${r * .65}" fill="#2f5a45"/></g>`).join('')}
  </svg>`;
}

// A bamboo steamer seen at a slight angle, with its contents drawn on top.
const steamer = (x, y, r, inside) => `<g transform="translate(${x} ${y})"><path d="M${-r} 0V36Q0 ${36 + r * .32} ${r} 36V0Z" fill="#b98b62"/><g stroke="#9a7552" stroke-width="2" opacity=".7"><path d="M${-r} 14Q0 ${14 + r * .32} ${r} 14M${-r} 26Q0 ${26 + r * .32} ${r} 26"/></g><ellipse rx="${r}" ry="${r * .32}" fill="#d8b58a"/><ellipse rx="${r - 8}" ry="${r * .32 - 6}" fill="#f1e2b6"/>${inside}</g>`;
const dumpling = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-22 6Q-22 -22 0 -24Q22 -22 22 6Z" fill="#f4ecdc" opacity=".92"/><path d="M-12 -18Q-8 -8 -4 -20M-2 -22Q2 -10 6 -22M8 -18Q10 -8 14 -16" stroke="#e0caa6" stroke-width="2" fill="none"/><ellipse cx="0" cy="-4" rx="9" ry="6" fill="#eab8a0" opacity=".6"/></g>`;
const bun = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-24 8Q-26 -24 0 -26Q26 -24 24 8Z" fill="#fbf6e8"/><path d="M-6 -24Q0 -16 6 -24" stroke="#e8dcc0" stroke-width="3" fill="none"/><circle cy="-10" r="3.5" fill="#c9674e"/></g>`;

function dimSum() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twee dampende bamboemandjes met garnalendumplings en broodjes met varkensvlees, met een theepot, kopjes en eetstokjes">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <ellipse cx="360" cy="470" rx="250" ry="46" fill="#775e48" opacity=".12"/>
  ${steamer(260, 360, 110, `${dumpling(-44, 4)}${dumpling(8, -8)}${dumpling(52, 6)}${dumpling(4, 22)}`)}
  ${steamer(470, 420, 92, `${bun(-34, 8)}${bun(24, -4)}${bun(8, 26)}`)}
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M230 320Q212 298 230 276T230 238"/><path class="m-steam" style="--d:-1.6s" d="M290 316Q272 294 290 272T290 234"/><path class="m-steam" style="--d:-3s" d="M470 380Q452 358 470 336T470 298"/></g>
  <g transform="translate(540 250)"><path d="M-40 0Q-46 50 0 54Q46 50 40 0Z" fill="#5f7f6a"/><ellipse rx="40" ry="10" fill="#6e8f7c"/><path d="M-14 -14h28v8h-28Z" fill="#4f6f5c"/><circle cy="-18" r="7" fill="#4f6f5c"/><path d="M40 12Q66 8 72 -10" stroke="#5f7f6a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-40 6Q-62 12 -58 32Q-52 42 -38 36" stroke="#5f7f6a" stroke-width="6" fill="none"/></g>
  ${[[190, 500], [600, 330]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-18 0Q-16 24 0 26Q16 24 18 0Z" fill="#f8f3e2"/><ellipse rx="18" ry="5" fill="#b98b62"/></g>`).join('')}
  <g transform="rotate(-18 150 300)"><path d="M140 200h8v230h-8ZM156 200h8v230h-8Z" fill="#8c6a4c"/></g>
  <g class="m-float" fill="#a28056"><path d="m600 460 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/><path d="m150 170 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

const eggTart = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-34 0L-26 18H26L34 0Z" fill="#c98f4c"/><g stroke="#b37a3c" stroke-width="2">${[-24, -12, 0, 12, 24].map(dx => `<path d="M${dx} 2L${dx * .8} 16"/>`).join('')}</g><ellipse rx="34" ry="9" fill="#d9a55a"/><ellipse rx="26" ry="6" fill="#f0c75a"/><ellipse cx="-6" cy="-1" rx="8" ry="2" fill="#f7dd8a"/></g>`;
const milkTea = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cy="66" rx="58" ry="12" fill="#f8f3e2"/><path d="M-36 0Q-34 64 0 66Q34 64 36 0Z" fill="#fbf6e8"/><ellipse rx="36" ry="9" fill="#fbf6e8"/><ellipse rx="30" ry="6" fill="#c49a6c"/><path d="M34 14Q58 16 54 36Q50 50 30 46" stroke="#fbf6e8" stroke-width="8" fill="none"/>
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M-10 -10Q-28 -32 -10 -54T-10 -92"/><path class="m-steam" style="--d:-1.8s" d="M14 -12Q-4 -34 14 -56T14 -94"/></g></g>`;
const macaroni = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-60 0Q-56 50 0 52Q56 50 60 0Z" fill="#f8f3e2"/><ellipse rx="60" ry="14" fill="#e8d4a2"/><g fill="none" stroke="#e8c178" stroke-width="5" stroke-linecap="round">${[[-34, -2], [-16, 4], [4, -4], [22, 2], [38, -2], [-4, 6]].map(([dx, dy]) => `<path d="M${dx} ${dy}q5-6 10 0"/>`).join('')}</g><path d="M-26 -6h14v6h-14ZM10 0h16v6H10Z" fill="#e3a4a0"/></g>`;

function cafe(item = 'melkthee') {
  const table = item === 'eggtart'
    ? `<ellipse cx="360" cy="440" rx="120" ry="22" fill="#f8f3e2"/><ellipse cx="360" cy="436" rx="100" ry="15" fill="#ece3cc"/><g class="m-bob">${eggTart(310, 418)}${eggTart(410, 418)}${eggTart(360, 400)}</g>`
    : item === 'samen'
      ? `${milkTea(290, 360)}<ellipse cx="450" cy="440" rx="80" ry="16" fill="#f8f3e2"/><g class="m-bob">${eggTart(450, 420, 1.1)}</g>`
      : `${milkTea(290, 360)}${macaroni(450, 420)}`;
  const label = item === 'eggtart' ? 'drie egg tarts op een bord' : item === 'samen' ? 'een kop melkthee en een egg tart' : 'een kop melkthee en een kom macaroni in bouillon';
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een tafeltje in een Hongkongs eetcafé met een ventilator aan het plafond en ${label}">
  <rect width="720" height="650" fill="#e3d9c4"/><circle cx="360" cy="315" r="223" fill="#f1e8d6"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <path d="M200 150H520V300H200Z" fill="#b8c9b0"/><path d="M360 150V300M200 225H520" stroke="#f3ead6" stroke-width="8"/><path d="M190 142H530V150H190ZM190 300H530V310H190Z" fill="#8ea68f"/>
  <path d="M360 40V92" stroke="#5a4332" stroke-width="4"/><g class="m-sway"><ellipse cx="360" cy="98" rx="120" ry="10" fill="#6e8f7c"/><circle cx="360" cy="98" r="14" fill="#517c67"/></g>
  <path d="M150 470H570L550 486H170Z" fill="#35604a"/><path d="M130 380Q360 356 590 380V470H130Z" fill="#f8f5e5"/><path d="M130 380Q360 356 590 380" stroke="#e0d6ba" stroke-width="6" fill="none"/>
  <path d="M240 486h12v80h-12ZM468 486h12v80h-12Z" fill="#5a4332"/>
  ${table}
  <g class="m-float" fill="#a28056"><path d="m170 250 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/><path d="m560 230 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

export const hero = id => harbour(id);
export const chapter = (i, variant) => i === 1 ? dimSum() : cafe(variant);
export const completion = () => cafe('samen');
export const card = () => harbour('card');
