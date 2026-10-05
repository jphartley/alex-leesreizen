// Kowloon Walled City artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'kowloon';

const fills = { off: '#16241e', on: '#e6c98a', hot: '#f8e7b6', rose: '#e7a090', lime: '#d5e2b8' };

function grid(x, y, cols, rows, sx, sy, pick) {
  let out = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const kind = pick(c, r, rows);
      const fill = fills[kind] || fills.off;
      const flick = (kind === 'hot' || kind === 'rose' || kind === 'lime') && (c + r) % 4 === 0;
      out += `<rect x="${x + c * sx}" y="${y + r * sy}" width="${Math.max(4, sx - 9)}" height="${Math.max(5, sy - 10)}" rx="1" fill="${fill}"${flick ? ' class="win"' : ''}/>`;
    }
  }
  return out;
}

function person(x, y, shirt, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="7" fill="#e4b48a"/><path d="M-6.4 -1 Q-7 -8.2 0 -8.4 Q7 -8.2 6.4 -1 Q3.2 -3.6 0 -3.6 Q-3.2 -3.6 -6.4 -1 Z" fill="#6b4530"/><circle cx="-2.3" cy="-0.2" r="0.8" fill="#3e342c"/><circle cx="2.3" cy="-0.2" r="0.8" fill="#3e342c"/><path d="M-2 2.6 Q0 4.2 2 2.6" fill="none" stroke="#3e342c" stroke-width="0.7" stroke-linecap="round"/><path d="M-9 10 h18 l3 24 h-24 Z" fill="${shirt}"/><path d="M-7 34 h5 l-1 12 h-5 Z M2 34 h5 l1 12 H3 Z" fill="#2c3832"/></g>`;
}

function planeShape() {
  return `<path d="M0 0 L28 -3.5 L9 0 L28 3.5 Z" fill="#f7f5ed"/><path d="M6 0 L-2 -8 L2 0 L-2 8 Z" fill="#6e9474"/>`;
}

function tree(x, y, s, delay) {
  return `<g class="m-sway" style="--d:${delay}s"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 92 V28" stroke="#6e503b" stroke-width="8"/><circle cx="-18" cy="18" r="30" fill="#517c67"/><circle cx="20" cy="24" r="24" fill="#3f6b56"/><circle cx="2" cy="0" r="26" fill="#6e9474"/></g></g>`;
}

function maze(x, y, s) {
  const blocks = [[0, 10, 8, 18], [10, 4, 7, 24], [19, 12, 8, 16], [29, 2, 6, 26], [37, 8, 8, 20]];
  const lights = [[3, 14], [13, 8], [22, 18], [32, 6], [40, 12], [16, 20], [26, 10]];
  return `<g transform="translate(${x} ${y}) scale(${s})">${blocks.map(([bx, by, w, h]) => `<rect x="${bx}" y="${by}" width="${w}" height="${h}" fill="#3d5c4c"/>`).join('')}${lights.map(([lx, ly], i) => `<rect class="m-twinkle" style="--d:${(-i * 0.35).toFixed(2)}s" x="${lx}" y="${ly}" width="2.4" height="2.4" fill="#f6e2a8"/>`).join('')}</g>`;
}

function pot(x, y, delay) {
  return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="46" rx="48" ry="10" fill="#1b3128" opacity=".14"/><path d="M-42 6 h84 l-10 34 h-64 Z" fill="#c4a882"/><ellipse cx="0" cy="6" rx="42" ry="12" fill="#8d6248"/><ellipse cx="0" cy="6" rx="28" ry="7" fill="#f0d2a4"/><path class="m-steam" style="--d:${delay}s" d="M-14 -2 Q-28 -30 -10 -52" fill="none" stroke="#f7f4ea" stroke-width="4" stroke-linecap="round"/><path class="m-steam" style="--d:${delay - 1.3}s" d="M16 -2 Q32 -28 12 -54" fill="none" stroke="#f7f4ea" stroke-width="4" stroke-linecap="round"/></g>`;
}

function seated(x, y, screen) {
  return `<g transform="translate(${x} ${y})"><circle cx="0" cy="0" r="11" fill="#e4b48a"/><path d="M-9 -2 Q-10 -12 0 -12.4 Q10 -12 9 -2 Q5 -5 0 -5 Q-5 -5 -9 -2 Z" fill="#6b4530"/><circle cx="-3.2" cy="0" r="1.1" fill="#3e342c"/><circle cx="3.2" cy="0" r="1.1" fill="#3e342c"/><path d="M-3 3.6 Q0 5.8 3 3.6" fill="none" stroke="#3e342c" stroke-width="1" stroke-linecap="round"/><path d="M-14 14 h28 l6 26 h-40 Z" fill="#517c67"/><path d="M-18 40 h20 l4 10 h-22 Z M6 40 h18 l6 10 H10 Z" fill="#3e4a42"/><path d="M-6 22 q22 10 40 2" fill="none" stroke="#e4b48a" stroke-width="5" stroke-linecap="round"/><g transform="translate(18 10)"><rect width="48" height="32" rx="4" fill="#1b3128"/><rect x="4" y="4" width="40" height="24" rx="2" fill="#14241e"/>${maze(7, 6, screen)}</g></g>`;
}

// The walled city seen from the alley, looking up. scene=true is the animated hero.
function canyon({ id, scene, h, aria }) {
  const p = `${slug}-${id}`;
  const Y = f => Math.round(f * h);
  const L = f => Math.round(230 + 80 * f);
  const R = f => Math.round(490 - 80 * f);
  const mid = f => Math.round((L(f) + R(f)) / 2);
  const attr = (g, c, d = 0) => (scene ? `class="${g}"` : `class="${c}"${d ? ` style="--d:${d}s"` : ''}`);

  const wallWindows = side => {
    const cols = 15;
    const rows = Math.ceil(h / 22);
    let out = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const yy = 16 + r * 22;
        const xx = side === 'left' ? 12 + c * 20 : 430 + c * 18;
        const depth = yy / h;
        const n = c * 3 + r * 5 + (side === 'right' ? 1 : 0);
        let kind = 'off';
        if (depth < 0.4) kind = n % 5 === 0 ? 'hot' : n % 3 === 0 ? 'off' : 'on';
        else if (n % 9 === 0) kind = n % 2 === 0 ? 'rose' : 'lime';
        const fill = fills[kind];
        const flick = kind !== 'off' && kind !== 'on' && n % 2 === 0;
        out += `<rect x="${xx}" y="${yy}" width="8" height="11" rx="1" fill="${fill}"${flick ? ' class="win"' : ''}/>`;
      }
    }
    return out;
  };

  const signs = [
    { f: 0.7, side: 'right', w: 64, h: 16, fill: '#e8a84a', d: 0 },
    { f: 0.56, side: 'left', w: 50, h: 18, fill: '#d5e2b8', d: -0.8 },
    { f: 0.42, side: 'right', w: 74, h: 16, fill: '#e7a090', d: -1.5 },
    { f: 0.3, side: 'left', w: 56, h: 18, fill: '#f0c36a', d: -2.1 },
  ].map(s => {
    const yy = Y(s.f);
    const x = s.side === 'left' ? L(s.f) - 14 : R(s.f) - s.w + 14;
    const glow = scene ? 'neon-glow' : 'm-twinkle';
    const style = scene ? '' : ` style="--d:${s.d}s"`;
    const arm = s.side === 'left'
      ? `<rect x="${x - 16}" y="${yy + s.h / 2 - 2}" width="18" height="4" fill="#4a4036"/>`
      : `<rect x="${x + s.w - 2}" y="${yy + s.h / 2 - 2}" width="18" height="4" fill="#4a4036"/>`;
    return `<g class="sign">${arm}<rect class="${glow}"${style} x="${x - 4}" y="${yy - 4}" width="${s.w + 8}" height="${s.h + 8}" rx="3" fill="${s.fill}" opacity=".34"/><rect class="bulb" x="${x}" y="${yy}" width="${s.w}" height="${s.h}" rx="2" fill="${s.fill}"/></g>`;
  }).join('');

  const cables = [0.2, 0.36, 0.5, 0.64].map((f, i) => {
    const y1 = Y(f);
    const x1 = L(f) - 2;
    const x2 = R(f) + 2;
    const sag = 18 + (i % 2) * 12;
    return `<g ${attr('cable', 'm-sway', -i * 0.7)}><path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 + sag} ${x2} ${y1 - 8}" fill="none" stroke="#241c16" stroke-width="2.2" stroke-linecap="round"/><circle cx="${(x1 + x2) / 2 - 18}" cy="${y1 + sag * 0.6}" r="2.4" fill="#241c16"/></g>`;
  }).join('');

  const ly = Y(0.24);
  const laundry = `<g ${attr('laundry', 'm-sway', -0.5)}><path d="M${L(0.24)} ${ly} H${Math.min(R(0.24), L(0.24) + 120)}" stroke="#6b5344" stroke-width="2"/><path d="M${L(0.24) + 14} ${ly} l6 22 h12 l-4 -22" fill="#f7f5ed"/><path d="M${L(0.24) + 44} ${ly} l5 16 h14 l-3 -16" fill="#517c67"/><path d="M${L(0.24) + 76} ${ly} l6 24 h12 l-4 -24" fill="#c9897a"/></g>`;

  const pipeX = L(0.48) - 14;
  const pipeTop = Y(0.34);
  const pipeH = Math.round(h * 0.2);
  const drips = `<rect x="${pipeX}" y="${pipeTop}" width="8" height="${pipeH}" rx="3" fill="#7f9188"/><rect x="${pipeX - 8}" y="${pipeTop + pipeH - 4}" width="24" height="6" rx="2" fill="#6e8078"/><circle ${attr('drip', 'm-twinkle', 0)} cx="${pipeX + 3}" cy="${pipeTop + pipeH + 8}" r="2.4" fill="#b7ccc8"/><circle ${attr('drip', 'm-twinkle', -0.8)} cx="${pipeX + 16}" cy="${pipeTop + pipeH + 6}" r="2" fill="#b7ccc8"/>${scene ? `<circle class="drip-surge" cx="${pipeX + 10}" cy="${pipeTop + pipeH + 4}" r="2.6" fill="#d5e6e2" opacity="0"/>` : ''}`;

  const tooth = `<g ${attr('hang', 'm-sway', -1.1)}><g transform="translate(${L(0.47) - 6} ${Y(0.47)})"><path d="M12 0 v12" stroke="#4a4036" stroke-width="2"/><rect x="0" y="10" width="24" height="28" rx="4" fill="#f7f5ed"/><rect x="5" y="16" width="5" height="14" rx="2" fill="#fffdf8"/><rect x="13" y="15" width="5" height="16" rx="2" fill="#fffdf8"/></g></g>`;

  const steam = scene ? 'steam' : 'm-steam';
  const stall = `<g transform="translate(${L(0.82) - 6} ${Y(0.8)})"><path d="M-2 -6 h50 l-8 12 H6 Z" fill="#c47a62"/><rect x="4" y="6" width="6" height="34" fill="#5c4636"/><rect x="34" y="6" width="6" height="34" fill="#5c4636"/><rect x="2" y="26" width="40" height="8" rx="1" fill="#c4a882"/><ellipse cx="22" cy="26" rx="13" ry="4" fill="#e8d0a4"/><path class="${steam}" d="M12 22 Q6 8 14 -4" fill="none" stroke="#f7f4ea" stroke-width="3" stroke-linecap="round"/><path class="${steam}" ${scene ? '' : 'style="--d:-1.4s"'} d="M28 22 Q36 6 26 -6" fill="none" stroke="#f7f4ea" stroke-width="3" stroke-linecap="round"/></g>`;

  const folk = `<g ${attr('folk', 'm-bob', -1)}>${person(mid(0.86) - 8, Y(0.84), '#517c67', 0.82)}${person(mid(0.86) + 22, Y(0.845), '#b76e55', 0.82)}<ellipse cx="${mid(0.86) + 10}" cy="${Y(0.84) + 16}" rx="8" ry="3" fill="#f6f1e6"/><path d="M${mid(0.86) + 3} ${Y(0.84) + 16} q7 6 14 0" fill="#e8c9a0"/></g>`;

  const plant = `<g ${attr('plant', 'm-bob', -0.7)}><g transform="translate(${L(0.38) + 6} ${Y(0.38)})"><path d="M-7 0 h14 l-2 8 h-10 Z" fill="#b08968"/><circle cx="-1" cy="-6" r="7" fill="#517c67"/><circle cx="5" cy="-2" r="5" fill="#6e9474"/></g></g>`;

  const a = L(0.05);
  const b = R(0.05);
  const base = Y(0.16);
  const roofs = `<path d="M${a} ${base} L${a + 28} ${Y(0.09)} L${a + 62} ${base - 8} L${a + 102} ${Y(0.04)} L${a + 146} ${base - 12} L${a + 190} ${Y(0.075)} L${a + 230} ${base - 4} L${b} ${Y(0.1)} L${b} ${base + 18} L${a} ${base + 18} Z" fill="#5d7c6c"/>`;

  const sunX = mid(0.05) + 24;
  const sunY = Y(0.075);
  const farX = L(0.18) + 6;
  const farW = R(0.18) - 8 - farX;
  const farTop = Y(0.15);
  const farBot = Y(0.42);
  const farWins = grid(farX + 8, farTop + 12, Math.max(3, Math.floor((farW - 16) / 16)), Math.max(3, Math.floor((farBot - farTop - 20) / 20)), 16, 20, (c, r, rows) => (r < rows * 0.45 ? (c + r) % 3 === 0 ? 'on' : 'off' : (c + r) % 7 === 0 ? 'hot' : 'off'));

  const cat = `<g transform="translate(72 ${Y(0.5)})"><rect x="-18" y="10" width="40" height="6" rx="1" fill="#cbb89a"/><rect x="-8" y="-8" width="18" height="16" rx="1" fill="#f6e2a8"/><ellipse cx="0" cy="8" rx="11" ry="6" fill="#c4a882"/><circle cx="9" cy="3" r="5.5" fill="#c4a882"/><path d="M5 -1 l2 -7 4 6z M13 -1 l2 -6 4 6z" fill="#c4a882"/><circle cx="8" cy="2.6" r="0.7" fill="#3e342c"/><circle cx="11.4" cy="2.6" r="0.7" fill="#3e342c"/><path ${attr('tail', 'm-sway', -0.6)} d="M-10 8 q-10 -2 -6 -12" fill="none" stroke="#c4a882" stroke-width="2.4" stroke-linecap="round"/></g>`;

  const boxes = [[36, 0.22], [70, 0.41], [28, 0.58], [600, 0.28], [640, 0.46], [560, 0.63]]
    .map(([x, f]) => `<rect x="${x}" y="${Y(f)}" width="16" height="10" rx="1" fill="#d9d0bc"/>`).join('');

  const sceneAttr = scene ? ' data-scene preserveAspectRatio="xMidYMid slice"' : '';
  return `<svg${sceneAttr} viewBox="0 0 720 ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">
    <defs>
      <linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#c5d4c2"/><stop offset=".65" stop-color="#e7efdc"/><stop offset="1" stop-color="#f6f1e4"/></linearGradient>
      <linearGradient id="${p}-shaft" x2="0" y2="1"><stop stop-color="#7d9a88"/><stop offset=".42" stop-color="#24382e"/><stop offset="1" stop-color="#101a16"/></linearGradient>
      <linearGradient id="${p}-left" x2="0" y2="1"><stop stop-color="#f6f0e4"/><stop offset=".36" stop-color="#c4b49a"/><stop offset=".7" stop-color="#3c5448"/><stop offset="1" stop-color="#15211c"/></linearGradient>
      <linearGradient id="${p}-right" x2="0" y2="1"><stop stop-color="#e7dcc8"/><stop offset=".45" stop-color="#8d7d6c"/><stop offset="1" stop-color="#121c18"/></linearGradient>
      <clipPath id="${p}-clip-l"><path d="M0 0 H${L(0)} L${L(1)} ${h} H0 Z"/></clipPath>
      <clipPath id="${p}-clip-r"><path d="M${R(0)} 0 H720 V${h} H${R(1)} Z"/></clipPath>
    </defs>
    <rect width="720" height="${h}" fill="url(#${p}-sky)"/>
    <circle ${attr('sun-glow', 'm-twinkle')} cx="${sunX}" cy="${sunY}" r="50" fill="#f7e3a8" opacity=".42"/>
    <circle cx="${sunX}" cy="${sunY}" r="26" fill="#f8e7b4"/>
    <g ${attr('cloud', 'm-drift')} fill="#f8f4e8" opacity=".82"><ellipse cx="${sunX - 78}" cy="${Y(0.05)}" rx="34" ry="8"/><ellipse cx="${sunX + 36}" cy="${Y(0.085)}" rx="26" ry="6"/></g>
    <g class="layer"><path d="M${L(0.12)} ${Y(0.12)} L${L(1)} ${h} L${R(1)} ${h} L${R(0.12)} ${Y(0.12)} Z" fill="url(#${p}-shaft)"/>${roofs}</g>
    <g class="layer"><rect x="${farX}" y="${farTop}" width="${Math.max(farW, 24)}" height="${farBot - farTop}" fill="#6e8b78"/>${farWins}<g transform="translate(${farX + 12} ${farTop - 18})"><rect width="16" height="18" rx="2" fill="#d9d3c2"/><rect x="20" y="5" width="13" height="13" rx="2" fill="#cfc8b6"/></g><g transform="translate(${farX + farW * 0.45} ${farTop})"><path d="M0 0 V-24" stroke="#2a261f" stroke-width="2"/><circle class="${scene ? 'beacon' : 'm-twinkle'}" cx="0" cy="-26" r="3" fill="#e8b15a"/></g></g>
    <g class="layer" clip-path="url(#${p}-clip-l)"><path d="M0 0 H${L(0)} L${L(1)} ${h} H0 Z" fill="url(#${p}-left)"/>${wallWindows('left')}${cat}</g>
    <g class="layer" clip-path="url(#${p}-clip-r)"><path d="M${R(0)} 0 H720 V${h} H${R(1)} Z" fill="url(#${p}-right)"/>${wallWindows('right')}</g>
    <g class="layer">${boxes}${cables}${laundry}${signs}${tooth}${plant}${drips}${stall}${folk}<ellipse ${attr('reflect', 'm-twinkle', -0.4)} cx="${mid(0.93)}" cy="${Y(0.95)}" rx="34" ry="6" fill="#e8a84a" opacity=".2"/></g>
    <g ${attr('plane', 'm-float')}><g transform="translate(${a + 36} ${Y(0.06)}) rotate(-16)">${planeShape()}</g></g>
  </svg>`;
}

function stack() {
  const floors = [
    { y: 62, w: 246, h: 60, fill: '#f6f1e6' },
    { y: 120, w: 312, h: 62, fill: '#ead9c4' },
    { y: 180, w: 214, h: 58, fill: '#dcc7a8' },
    { y: 236, w: 352, h: 68, fill: '#c5d0bc' },
    { y: 302, w: 268, h: 64, fill: '#8eaa96' },
    { y: 364, w: 384, h: 70, fill: '#4f6f60' },
    { y: 432, w: 308, h: 62, fill: '#2a4036' },
  ];
  const cx = 444;
  const bands = floors.map((f, i) => {
    const x = cx - f.w / 2;
    const cols = Math.max(3, Math.floor((f.w - 18) / 18));
    const dark = f.y > 320;
    const wins = grid(x + 10, f.y + 12, cols, 2, 18, 22, (c, r) => {
      if (dark) return (c + i) % 3 === 0 ? (i % 2 ? 'rose' : 'hot') : 'off';
      return (c + r + i) % 4 === 0 ? 'off' : 'on';
    });
    return `<rect x="${x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="${f.fill}"/>${wins}`;
  }).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van huizen die bovenop een oud fort zijn gestapeld, naast twee kleine voetbalvelden">
    <rect width="720" height="650" fill="#f3ecdf"/>
    <circle class="m-twinkle" cx="478" cy="70" r="54" fill="#f7e3a8" opacity=".35"/>
    <circle cx="478" cy="70" r="32" fill="#f8e7b4"/>
    <path d="M0 560 H720 V650 H0 Z" fill="#e6d7c2"/>
    <g><rect x="46" y="520" width="86" height="48" rx="2" fill="#6e9474"/><rect x="52" y="526" width="74" height="36" fill="none" stroke="#f7f5ed" stroke-width="1.5"/><path d="M89 526 V562 M52 544 H126" stroke="#f7f5ed" stroke-width="1.5"/></g>
    <g><rect x="146" y="534" width="74" height="40" rx="2" fill="#6e9474"/><rect x="151" y="539" width="64" height="30" fill="none" stroke="#f7f5ed" stroke-width="1.5"/><path d="M183 539 V569 M151 554 H215" stroke="#f7f5ed" stroke-width="1.5"/></g>
    ${person(78, 492, '#b76e55', 0.5)}${person(176, 508, '#517c67', 0.46)}
    <path d="M268 488 H620 V608 H268 Z" fill="#7e8e84"/><path d="M264 488 H624 V504 H264 Z" fill="#6a7a70"/><path d="M412 608 V552 q32 -40 64 0 V608 Z" fill="#1c2e26"/>
    ${bands}
    <g transform="translate(392 40)"><rect width="22" height="24" rx="2" fill="#d9d3c2"/><rect x="28" y="6" width="16" height="18" rx="2" fill="#cfc8b6"/></g>
    <g class="m-sway" style="--d:-0.5s"><g transform="translate(276 298)"><rect width="16" height="22" fill="#f7f5ed"/><rect x="20" width="14" height="18" fill="#c9897a"/></g></g>
    <g class="m-sway" style="--d:-1.3s"><g transform="translate(590 298)"><rect width="16" height="24" fill="#517c67"/></g></g>
    <g class="m-bob" style="--d:-0.8s"><g transform="translate(262 292)"><path d="M-8 0 h16 l-2 9 h-12 Z" fill="#b08968"/><circle cy="-8" r="8" fill="#517c67"/></g></g>
    <g class="m-float"><g transform="translate(168 150)">${planeShape()}</g></g>
  </svg>`;
}

function alley() {
  const p = `${slug}-steeg`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een donkere steeg met elektriciteitskabels, een druipende leiding, neonlicht en twee bewoners die een kom delen">
    <defs>
      <linearGradient id="${p}-l" x2="0" y2="1"><stop stop-color="#e4d5c0"/><stop offset="1" stop-color="#24382e"/></linearGradient>
      <linearGradient id="${p}-r" x2="0" y2="1"><stop stop-color="#cbbba6"/><stop offset="1" stop-color="#1c2e26"/></linearGradient>
    </defs>
    <rect width="720" height="650" fill="#101c18"/>
    <path d="M0 80 L250 230 L250 420 L0 600 Z" fill="url(#${p}-l)"/>
    <path d="M720 80 L470 230 L470 420 L720 600 Z" fill="url(#${p}-r)"/>
    <path d="M250 230 H470 V400 H250 Z" fill="#2c463c"/>
    ${grid(262, 246, 8, 6, 24, 24, (c, r) => ((c + r) % 4 === 0 ? 'hot' : 'off'))}
    <path d="M0 0 H720 L470 230 H250 L0 0 Z" fill="#14241c"/>
    <path d="M250 400 L470 400 L720 600 L720 650 L0 650 L0 600 Z" fill="#1a2822"/>
    <path d="M0 600 L250 420 L470 420 L720 600" fill="none" stroke="#2a3a32" stroke-width="8"/>
    <rect class="m-twinkle" x="48" y="250" width="100" height="30" rx="3" fill="#e8a84a"/>
    <rect class="m-twinkle" style="--d:-1.1s" x="560" y="220" width="90" height="26" rx="3" fill="#e7a090"/>
    <rect class="m-twinkle" style="--d:-1.8s" x="90" y="360" width="72" height="20" rx="3" fill="#d5e2b8"/>
    <g class="m-sway" fill="none" stroke="#241c16" stroke-width="3" stroke-linecap="round"><path d="M0 130 Q360 190 720 110"/><path d="M20 180 Q360 250 700 160"/><path d="M0 230 Q280 280 640 200"/></g>
    <rect x="36" y="150" width="12" height="180" rx="4" fill="#7f9188"/><rect x="28" y="322" width="28" height="8" rx="2" fill="#6e8078"/>
    <circle cx="42" cy="348" r="3" fill="#b7ccc8"/><circle cx="54" cy="364" r="2.5" fill="#b7ccc8"/>
    <g class="m-sway" style="--d:-0.8s"><g transform="translate(30 188)"><path d="M14 0 v10" stroke="#4a4036" stroke-width="2"/><rect x="0" y="8" width="28" height="30" rx="4" fill="#f7f5ed"/><rect x="6" y="14" width="6" height="16" rx="2" fill="#fffdf8"/><rect x="15" y="13" width="6" height="18" rx="2" fill="#fffdf8"/></g></g>
    ${person(300, 470, '#517c67')}${person(368, 478, '#b76e55')}
    <ellipse cx="338" cy="500" rx="12" ry="5" fill="#f4efe4"/><path d="M328 500 q10 8 20 0" fill="#e8c9a0"/>
    <rect x="70" y="520" width="34" height="8" rx="1" fill="#5c4636"/>
    <path class="m-steam" d="M80 518 Q72 490 84 468" fill="none" stroke="#f7f4ea" stroke-width="3" stroke-linecap="round"/>
    <path class="m-steam" style="--d:-1.1s" d="M96 518 Q106 492 90 466" fill="none" stroke="#f7f4ea" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function noodles() {
  const strands = Array.from({ length: 12 }, (_, i) => `<path d="M${108 + i * 18} 150 q${i % 2 ? 8 : -8} 36 0 78" fill="none" stroke="#f3e6c4" stroke-width="3.5" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een klein noedelfabriekje met dampende pannen, hangende noedels en een neonbord bij de deur">
    <rect width="720" height="650" fill="#3a3128"/>
    <rect x="0" y="0" width="720" height="90" fill="#2a241e"/>
    <rect x="36" y="90" width="470" height="390" fill="#4e433a"/>
    <rect x="548" y="140" width="140" height="390" fill="#1c2e26"/>
    <rect class="m-twinkle" x="572" y="190" width="92" height="28" rx="3" fill="#e8a84a"/>
    <rect class="m-twinkle" style="--d:-1.3s" x="590" y="240" width="56" height="16" rx="2" fill="#d5e2b8"/>
    <rect x="70" y="138" width="250" height="14" rx="2" fill="#6e503b"/>
    ${strands}
    <rect x="48" y="110" width="14" height="220" rx="4" fill="#7f9188"/>
    <circle cx="54" cy="340" r="3.2" fill="#b7ccc8"/>
    <rect x="200" y="468" width="300" height="16" rx="2" fill="#6e503b"/>
    <rect x="214" y="484" width="12" height="36" fill="#5a4030"/><rect x="474" y="484" width="12" height="36" fill="#5a4030"/>
    ${person(118, 408, '#517c67', 1.15)}
    ${pot(250, 424, 0)}${pot(360, 430, -0.8)}${pot(460, 418, -1.6)}
    <rect x="60" y="548" width="470" height="14" rx="2" fill="#5c4636"/>
    <ellipse cx="150" cy="546" rx="28" ry="8" fill="#e7d3b4"/><ellipse cx="230" cy="548" rx="22" ry="7" fill="#d7c4a4"/>
  </svg>`;
}

function cyber() {
  const towers = [[0, 150, 108], [96, 80, 86], [170, 190, 120], [278, 110, 96], [364, 60, 110], [464, 140, 90], [544, 96, 100], [630, 170, 90]];
  const city = towers.map(([x, y, w], i) => {
    const height = 440 - y;
    const wins = grid(x + 8, y + 14, Math.max(2, Math.floor((w - 14) / 16)), Math.max(2, Math.floor((height - 20) / 20)), 16, 20, (c, r) => ((c + r + i) % 5 === 0 ? 'hot' : (c + r) % 2 === 0 ? 'on' : 'off'));
    return `<rect x="${x}" y="${y}" width="${w}" height="${height}" fill="${i % 2 ? '#345445' : '#3d5a4c'}"/>${wins}`;
  }).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een toekomststad vol neon, met een vliegend voertuig en een scherm waarop dezelfde stad te zien is">
    <rect width="720" height="650" fill="#d7e0cc"/>
    <circle cx="70" cy="64" r="26" fill="#f8e7b4" opacity=".8"/>
    ${city}
    <g class="m-float"><g transform="translate(420 148)"><ellipse cx="0" cy="24" rx="50" ry="8" fill="#1b3128" opacity=".12"/><rect x="-52" y="-16" width="104" height="32" rx="16" fill="#f7f5ed"/><rect x="-34" y="-8" width="42" height="16" rx="4" fill="#7fa89a"/><circle class="m-twinkle" cx="32" cy="-1" r="5" fill="#e8a84a"/></g></g>
    <g transform="translate(145 400)"><rect width="430" height="220" rx="24" fill="#1c2e26"/><rect x="18" y="16" width="394" height="156" rx="10" fill="#12211c"/>${maze(40, 40, 6.2)}<circle cx="78" cy="192" r="9" fill="#517c67"/><rect x="186" y="186" width="64" height="12" rx="6" fill="#284f3d"/><circle class="m-twinkle" cx="352" cy="192" r="9" fill="#e8a84a"/></g>
  </svg>`;
}

function park() {
  const p = `${slug}-park`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een rustig stadspark in de zon, met een paviljoen, een bankje en een scherm waarop het oude doolhof nog gloeit">
    <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d5e4c8"/><stop offset="1" stop-color="#f7f1e2"/></linearGradient></defs>
    <rect width="720" height="650" fill="url(#${p}-sky)"/>
    <circle class="m-twinkle" cx="540" cy="92" r="74" fill="#f7e3a8" opacity=".38"/>
    <circle cx="540" cy="92" r="42" fill="#f8e7b4"/>
    <g class="m-drift" fill="#f8f4e8" opacity=".8"><ellipse cx="180" cy="86" rx="54" ry="12"/><ellipse cx="150" cy="94" rx="22" ry="8"/><ellipse cx="300" cy="60" rx="36" ry="8"/></g>
    <path d="M0 340 Q200 300 400 340 T720 310 V650 H0 Z" fill="#a9c4a0"/>
    <path d="M0 410 Q220 380 420 430 T720 400 V650 H0 Z" fill="#7ea37a"/>
    <ellipse cx="430" cy="490" rx="200" ry="40" fill="#f8e7b8" opacity=".5"/>
    <path d="M60 650 C180 500 280 470 390 490 C520 470 600 540 700 650 Z" fill="#ead7b8"/>
    <g transform="translate(36 392)"><path d="M0 78 H110 V36 H88 V8 H22 V36 H0 Z" fill="#8d9a90"/><path d="M28 78 V52 Q55 30 82 52 V78 Z" fill="#7ea37a"/></g>
    ${tree(80, 250, 1.15, 0)}${tree(210, 300, 0.75, -1.1)}${tree(640, 240, 1.05, -0.5)}
    <g transform="translate(300 268)"><path d="M-88 34 Q0 -10 88 34" fill="#b76e55"/><path d="M-74 26 Q0 -14 74 26" fill="#e0b08a"/><rect x="-58" y="34" width="116" height="78" fill="#f6f1e6"/><rect x="-18" y="70" width="36" height="42" fill="#6e503b"/><rect x="-42" y="48" width="16" height="22" fill="#8fb0a4"/><rect x="26" y="48" width="16" height="22" fill="#8fb0a4"/></g>
    <g transform="translate(400 455)"><path d="M0 18 H160" stroke="#6e503b" stroke-width="8" stroke-linecap="round"/><path d="M16 18 V50 M144 18 V50" stroke="#6e503b" stroke-width="6"/><path d="M0 6 H160" stroke="#c4a882" stroke-width="8" stroke-linecap="round"/></g>
    ${seated(455, 400, 0.62)}
    <g class="m-float"><g transform="translate(250 120)">${planeShape()}</g></g>
    <g class="m-float" style="--d:-1.4s"><g transform="translate(180 430)"><ellipse cx="-7" cy="0" rx="8" ry="4" fill="#e7c9a4"/><ellipse cx="7" cy="0" rx="8" ry="4" fill="#d5e2b8"/><path d="M0 -3 V4" stroke="#6e503b" stroke-width="1.5"/></g></g>
  </svg>`;
}

function finale() {
  const p = `${slug}-einde`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een zonnig park waarin een papieren vliegtuigje vrij vliegt en een scherm het oude doolhof nog toont">
    <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d9e6cc"/><stop offset="1" stop-color="#f8f3e6"/></linearGradient></defs>
    <rect width="720" height="650" fill="url(#${p}-sky)"/>
    <circle class="m-twinkle" cx="180" cy="120" r="80" fill="#f7e3a8" opacity=".4"/>
    <circle cx="180" cy="120" r="48" fill="#f8e7b4"/>
    <g class="m-drift" fill="#fffdf6" opacity=".75"><ellipse cx="420" cy="90" rx="70" ry="14"/><ellipse cx="470" cy="78" rx="28" ry="10"/></g>
    <path d="M0 390 Q360 340 720 400 V650 H0 Z" fill="#8fb58a"/>
    <path d="M0 470 Q300 430 720 480 V650 H0 Z" fill="#c6ad84"/>
    <ellipse cx="360" cy="500" rx="220" ry="36" fill="#f8e7b8" opacity=".45"/>
    ${tree(80, 300, 1.2, 0)}${tree(600, 280, 1.3, -0.8)}
    <g transform="translate(250 430)"><path d="M0 16 H200" stroke="#6e503b" stroke-width="8" stroke-linecap="round"/><path d="M18 16 V48 M182 16 V48" stroke="#6e503b" stroke-width="6"/><path d="M0 4 H200" stroke="#c4a882" stroke-width="8" stroke-linecap="round"/></g>
    ${seated(320, 372, 0.85)}
    <g class="m-float"><g transform="translate(430 150) rotate(-8)">${planeShape()}</g></g>
    <g class="m-float" style="--d:-1.6s"><g transform="translate(520 240)"><ellipse cx="-8" cy="0" rx="9" ry="5" fill="#e7c9a4"/><ellipse cx="8" cy="0" rx="9" ry="5" fill="#d5e2b8"/><path d="M0 -4 V5" stroke="#6e503b" stroke-width="1.5"/></g></g>
  </svg>`;
}

const heroAria = 'Illustratie van Kowloon Walled City: een smalle steeg tussen hoge huizen, met neonborden, kabels, druipende leidingen en een streepje lucht bovenin';

export const hero = id => canyon({ id, scene: true, h: 760, aria: heroAria });
export const card = () => hero('card');
export const chapter = (i, variant) => {
  if (i === 1) return stack();
  if (i === 2) return variant === 'noedels' ? noodles() : alley();
  if (i === 3) return cyber();
  return variant === 'stad'
    ? canyon({ id: 'stad', scene: false, h: 650, aria: 'Illustratie van de dichtbebouwde stad, met neon, kabels en bijna geen lucht tussen de huizen' })
    : park();
};
export const completion = () => finale();
