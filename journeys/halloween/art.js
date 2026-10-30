// Van Keltisch vuur tot griezelfeest artwork: original SVG illustrations, all local and friendly rather than scary.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'halloween';

// A friendly jack-o'-lantern; the face group carries `cls` so it can flicker like a candle.
const pumpkin = (x, y, s = 1, cls = 'flame') => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="0" cy="0" rx="46" ry="38" fill="#c97a48"/><ellipse cx="-20" cy="0" rx="26" ry="36" fill="#d98b5a"/><ellipse cx="20" cy="0" rx="26" ry="36" fill="#d98b5a"/><ellipse cx="0" cy="0" rx="17" ry="38" fill="#e09a66"/>
  <path d="M-3-36q2-14 10-18l3 5q-6 4-6 13Z" fill="#517c67"/>
  <g class="${cls}" fill="#f7d98a"><path d="M-24-8l10-13 8 13Z"/><path d="M6-8l10-13 8 13Z"/><path d="M-24 6Q0 30 24 6Q0 17-24 6Z"/></g></g>`;

const bat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="bat" d="M0 0Q-6-8-14-8Q-10-4-12 0Q-18-2-22 2Q-14 2-8 6Q-4 4 0 8Q4 4 8 6Q14 2 22 2Q18-2 12 0Q10-4 14-8Q6-8 0 0Z" fill="#2f3f38"/></g>`;

function house(x, w, h, wall, chimney = false) {
  const top = 600 - h, wy = top + 34;
  return `${chimney ? `<path d="M${x + w * .7} ${top - w * .45}h18v40h-18Z" fill="#5a4332"/>` : ''}
  <path d="M${x} 600V${top}H${x + w}V600Z" fill="${wall}"/><path d="M${x - 12} ${top + 2}L${x + w / 2} ${top - w * .55}L${x + w + 12} ${top + 2}Z" fill="#3e4a3e"/>
  <rect class="window" x="${x + w * .14}" y="${wy}" width="30" height="36" rx="3" fill="#f2c76b"/><rect class="window" x="${x + w * .86 - 30}" y="${wy}" width="30" height="36" rx="3" fill="#f2c76b"/>
  <path d="M${x + w * .14 + 15} ${wy}v36M${x + w * .86 - 15} ${wy}v36" stroke="${wall}" stroke-width="3"/>
  <path d="M${x + w / 2 - 16} 600V552Q${x + w / 2} 538 ${x + w / 2 + 16} 552V600Z" fill="#284f3d"/>
  <path d="M${x + w / 2 - 26} 600h52v8h-52Z" fill="#7c5a42"/>`;
}

function street(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gezellige straat in de avond met verlichte huizen, uitgeholde pompoenen met vrolijke gezichten, vleermuizen bij de maan en twee verklede kinderen">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#3f5a52"/><stop offset=".6" stop-color="#7f8f78"/><stop offset="1" stop-color="#d9bf94"/></linearGradient>
  <radialGradient id="${p}-glow"><stop stop-color="#f7d98a" stop-opacity=".7"/><stop offset="1" stop-color="#f7d98a" stop-opacity="0"/></radialGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <g fill="#f3e6bf">${[[80, 70], [160, 130], [300, 60], [410, 110], [650, 60], [240, 200], [660, 260], [110, 300]].map(([x, y], i) => `<circle class="star" cx="${x}" cy="${y}" r="${i % 2 ? 2 : 2.8}"/>`).join('')}</g>
  <circle class="moon-glow" cx="540" cy="160" r="100" fill="url(#${p}-glow)"/>
  <circle cx="540" cy="160" r="54" fill="#f3e6bf"/><circle cx="522" cy="146" r="9" fill="#e6d6a8"/><circle cx="558" cy="180" r="6" fill="#e6d6a8"/>
  <g class="cloud" fill="#9fb2a2" opacity=".45"><ellipse cx="420" cy="215" rx="110" ry="12"/><ellipse cx="170" cy="250" rx="120" ry="12"/></g>
  <g class="bats">${bat(300, 150, 1.1)}${bat(352, 178, .8)}${bat(258, 198, .7)}</g>
  <path class="layer" d="M0 470Q140 400 280 440T560 420T720 430V600H0Z" fill="#4f6b5c"/>
  <g class="layer">${house(110, 150, 170, '#8a684f')}${house(300, 170, 205, '#9a7552', true)}${house(520, 160, 160, '#7c5a42')}</g>
  <path d="M0 600H720V760H0Z" fill="#c9aa83"/><path d="M0 664Q360 648 720 664V760H0Z" fill="#b99770"/>
  <g transform="translate(46 600)"><g class="tree"><path d="M-9 0Q-4-90-10-180H6Q4-90 10 0Z" fill="#5a4332"/>
  <path d="M-2-120Q-30-150-44-196M0-150Q30-186 62-206M-4-90Q-30-100-40-126M2-170Q-6-206 2-236" stroke="#5a4332" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g fill="#d98b5a"><circle cx="-44" cy="-200" r="13"/><circle cx="64" cy="-210" r="15"/><circle cx="2" cy="-240" r="14"/><circle cx="36" cy="-188" r="11"/></g><g fill="#c9a24e"><circle cx="-26" cy="-170" r="11"/><circle cx="-40" cy="-130" r="10"/><circle cx="20" cy="-222" r="10"/></g></g></g>
  <g>${[[40, 380, '#d98b5a'], [80, 410, '#c9a24e'], [20, 420, '#d98b5a'], [100, 380, '#c97a48'], [60, 440, '#c9a24e']].map(([x, y, c]) => `<path class="fall" d="M${x} ${y}q8-10 16 0q-8 10-16 0Z" fill="${c}" opacity="0"/>`).join('')}</g>
  ${pumpkin(152, 582, .55)}${pumpkin(420, 580, .62)}${pumpkin(458, 590, .42)}${pumpkin(632, 582, .55)}
  <g transform="translate(250 636)"><g class="kid"><path d="M-26 70V10Q-26-24 0-24Q26-24 26 10V70L17 62 9 70 0 62-9 70-17 62Z" fill="#f7f5ed"/><ellipse cx="-9" cy="4" rx="4" ry="6" fill="#284f3d"/><ellipse cx="9" cy="4" rx="4" ry="6" fill="#284f3d"/><path d="M-4 20q4 4 8 0" stroke="#284f3d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M20 26q16 6 20 22" stroke="#f7f5ed" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M30 46h20l-3 18h-14Z" fill="#d98b5a"/><path d="M33 46q7-10 14 0" stroke="#517c67" stroke-width="2.5" fill="none"/></g></g>
  <g transform="translate(336 636)"><g class="kid"><path d="M-8 52h6v26h-6ZM4 52h6v26h-6Z" fill="#3e4a3e"/><path d="M-30 64 0-6 30 64Z" fill="#284f3d"/><path d="M-20 60 0 6 20 60Z" fill="#b76e55"/><path d="M-12 2H12V56H-12Z" fill="#3e4a3e"/><path d="M-16 4-10-8H10L16 4Z" fill="#b76e55"/>
  <circle cx="0" cy="-20" r="15" fill="#eadcc7"/><path d="M-15-22Q-16-38 0-38Q16-38 15-22L8-28 0-22-8-28Z" fill="#2f3f38"/><circle cx="-5" cy="-19" r="2" fill="#284f3d"/><circle cx="5" cy="-19" r="2" fill="#284f3d"/><path d="M-5-11q5 4 10 0" stroke="#284f3d" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>
  </svg>`;
}

// Chapter frames: a round window on warm paper; scenes inside are clipped to the circle.
const frame = (label, sky, inside, outside = '') => `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs><clipPath id="${slug}-circle"><circle cx="360" cy="315" r="225"/></clipPath></defs>
  <rect width="720" height="650" fill="#eadcc7"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="248" stroke-dasharray="3 9"/></g>
  <circle cx="360" cy="315" r="225" fill="${sky}"/><g clip-path="url(#${slug}-circle)">${inside}</g>${outside}</svg>`;

const stars = pts => `<g fill="#f3e6bf">${pts.map(([x, y], i) => `<circle class="m-twinkle" style="--d:${-i * .7}s" cx="${x}" cy="${y}" r="${i % 2 ? 2 : 3}"/>`).join('')}</g>`;

const masked = (x, flip = 1) => `<g transform="translate(${x} 470) scale(${flip} 1)">
  <path d="M-30 0Q-36-58-22-80Q0-94 22-80Q36-58 30 0Z" fill="#6e5440"/><path d="M-22-80Q0-70 22-80L18-60Q0-52-18-60Z" fill="#8a684f"/>
  <path d="M-12-118Q-26-140-20-162M-20-142Q-32-148-36-160M12-118Q26-140 20-162M20-142Q32-148 36-160" stroke="#c9aa83" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="-100" rx="18" ry="22" fill="#eadcc7"/><ellipse cx="-7" cy="-104" rx="4" ry="6" fill="#2f3f38"/><ellipse cx="7" cy="-104" rx="4" ry="6" fill="#2f3f38"/><path d="M-6-88q6-4 12 0" stroke="#2f3f38" stroke-width="2.5" fill="none"/></g>`;

function samhain() {
  return frame('Een groot vreugdevuur op een heuvel in de nacht, met twee figuren in maskers en dierenhuiden, oude stenen en schoven graan van de oogst', '#34504a', `
  ${stars([[220, 140], [300, 110], [430, 120], [250, 210], [470, 200], [180, 260], [560, 270]])}
  <circle cx="520" cy="150" r="28" fill="#f3e6bf"/>
  <g class="m-drift" fill="#5d7a6c" opacity=".6"><ellipse cx="300" cy="170" rx="70" ry="9"/></g>
  <path d="M120 410Q220 330 330 372T620 352V560H120Z" fill="#2f4a3f"/>
  <g fill="#7d857c">${[[180, 372], [206, 362], [232, 358], [258, 362]].map(([x, y]) => `<path d="M${x} ${y}h14v-34q-7-6-14 0Z"/>`).join('')}<path d="M200 330h52v8h-52Z"/></g>
  <path d="M100 454Q360 424 620 454V560H100Z" fill="#284f3d"/>
  <circle class="m-twinkle" cx="360" cy="440" r="120" fill="#f2c76b" opacity=".22"/>
  <path d="M308 474 412 446M308 446 412 474" stroke="#6e503b" stroke-width="14" stroke-linecap="round"/>
  <g class="m-sway"><path d="M318 458Q314 402 344 370Q340 410 362 402Q356 360 380 328Q394 380 402 400Q414 390 410 368Q434 412 402 458Z" fill="#d98b5a"/><path d="M338 458Q336 420 358 400Q360 426 372 420Q372 394 386 378Q400 420 386 458Z" fill="#f2c76b"/></g>
  <g fill="#f7d98a">${[[350, 330, 0], [372, 312, -1.2], [392, 340, -2.4], [340, 300, -3.4], [384, 290, -.6]].map(([x, y, d]) => `<circle class="m-steam" style="--d:${d}s" cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
  ${masked(236)}${masked(484, -1)}
  <g stroke="#d8b27a" stroke-width="4" stroke-linecap="round">${[-12, -6, 0, 6, 12].map(dx => `<path d="M560 500Q${560 + dx * .3} 470 ${560 + dx * 2} 430"/>`).join('')}</g><path d="M548 470h24" stroke="#a28056" stroke-width="6"/>`);
}

function church() {
  const lit = (x, d) => `<path class="m-twinkle" style="--d:${d}s" d="M${x - 10} 410V386Q${x} 372 ${x + 10} 386V410Z" fill="#f2c76b"/>`;
  return frame('Een kleine kerk in de avond met verlichte ramen en kaarsjes ervoor, met daaronder de woorden All Hallows’ Eve en Halloween', '#b8c2ac', `
  <circle cx="500" cy="170" r="34" fill="#f3e6bf"/>
  <g class="m-drift" fill="#e8ead8" opacity=".8"><ellipse cx="240" cy="160" rx="70" ry="10"/><ellipse cx="460" cy="230" rx="60" ry="9"/></g>
  <path d="M100 400Q240 350 380 380T620 370V560H100Z" fill="#9cac8a"/>
  <path d="M100 470Q360 436 620 470V560H100Z" fill="#7c9a6a"/>
  <path d="M260 470V350H460V470Z" fill="#d8c7a6"/><path d="M248 354 360 290 472 354Z" fill="#6e503b"/>
  <path d="M330 470V240H390V470Z" fill="#e2d3b4"/><path d="M322 244 360 160 398 244Z" fill="#5a4332"/><path d="M357 132h6v30h-6ZM350 140h20v6h-20Z" fill="#5a4332"/>
  <path d="M344 470V432Q360 412 376 432V470Z" fill="#6e503b"/>
  <path class="m-twinkle" d="M350 300V280Q360 266 370 280V300Z" fill="#f2c76b"/>
  ${lit(290, -1)}${lit(430, -2.2)}
  ${[200, 226, 252, 468, 494, 520].map((x, i) => `<rect x="${x}" y="462" width="10" height="24" rx="2" fill="#f7f5ed"/><path class="m-twinkle" style="--d:${-i * .6}s" d="M${x + 5} 448q-6 7 0 12q6-5 0-12Z" fill="#f2c76b"/>`).join('')}`,
  `<g transform="translate(360 594)"><rect x="-170" y="-22" width="340" height="44" rx="22" fill="#284f3d"/><text x="0" y="7" text-anchor="middle" font-family="sans-serif" font-size="19" fill="#f7f5ed" letter-spacing="1">All Hallows’ Eve  →  Halloween</text></g>`);
}

function porch() {
  const bunting = ['#d98b5a', '#517c67', '#f2c76b', '#7c5a42', '#d98b5a', '#517c67', '#f2c76b', '#7c5a42', '#d98b5a'];
  const candy = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M-14-6-22-10V10L-14 6ZM14-6 22-10V10L14 6Z" fill="${c}"/><ellipse rx="14" ry="9" fill="${c}"/><path d="M-6-8v16M6-8v16" stroke="#f7f5ed" stroke-width="2" opacity=".6"/></g>`;
  return frame('Een veranda van een Amerikaans huis in de avond, met grote lichtgevende pompoenen, een schaal vol snoep en vrolijke vlaggetjes', '#9fb2a2', `
  ${stars([[200, 130], [300, 100], [430, 110], [530, 150]])}
  <path d="M150 196H570V470H150Z" fill="#9a7552"/>${Array.from({ length: 11 }, (_, i) => `<path d="M150 ${220 + i * 24}H570" stroke="#8a684f" stroke-width="3"/>`).join('')}
  <path d="M126 200H594L566 166H154Z" fill="#3e4a3e"/>
  <path d="M188 250H282V334H188Z" fill="#f2c76b"/><path d="M235 250V334M188 292H282" stroke="#9a7552" stroke-width="5"/>
  <path d="M400 262H470V440H400Z" fill="#284f3d"/><circle cx="458" cy="356" r="5" fill="#d8b27a"/>
  <circle class="m-twinkle" cx="500" cy="290" r="22" fill="#f7d98a" opacity=".6"/><rect x="494" y="280" width="12" height="20" rx="2" fill="#f2c76b"/>
  <path d="M170 214Q360 250 550 214" stroke="#6b5b43" stroke-width="2" fill="none"/>
  ${bunting.map((c, i) => { const x = 190 + i * 42, y = 214 + Math.sin(Math.PI * (x - 170) / 380) * 30; return `<g class="m-sway" style="--d:${-i * .5}s"><path d="M${x - 11} ${y}H${x + 11}L${x} ${y + 24}Z" fill="${c}"/></g>`; }).join('')}
  <path d="M120 440H600V470H120Z" fill="#8a684f"/>
  <path d="M100 470H620V560H100Z" fill="#6b8f63"/><path d="M380 470H490V490H380ZM370 490H500V510H370Z" fill="#7c5a42"/>
  <circle class="m-twinkle" cx="320" cy="404" r="62" fill="#f7d98a" opacity=".3"/>
  ${pumpkin(320, 406, .9, 'm-twinkle')}${pumpkin(546, 486, .5, 'm-twinkle')}
  <path d="M170 410Q172 440 210 442Q248 440 250 410Z" fill="#517c67"/><path d="M164 406H256V414H164Z" fill="#284f3d"/>
  ${candy(194, 400, '#d98b5a')}${candy(226, 396, '#f2c76b')}${candy(210, 386, '#b76e55')}
  <g transform="translate(330 214)"><path d="M0 0V30" stroke="#6b5b43" stroke-width="2"/><g class="m-float"><path d="M-16 66V40Q-16 22 0 22Q16 22 16 40V66L10 60 5 66 0 60-5 66-10 60Z" fill="#f7f5ed"/><circle cx="-5" cy="40" r="2.5" fill="#284f3d"/><circle cx="5" cy="40" r="2.5" fill="#284f3d"/></g></g>`);
}

function finale() {
  const sparkle = (x, y, s, d) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="m-twinkle" style="--d:${d}s" d="M0-14 4-4 14 0 4 4 0 14-4 4-14 0-4-4Z" fill="#d6b56e"/></g>`;
  const sweet = (x, y, c, d) => `<g transform="translate(${x} ${y})"><g class="m-float" style="--d:${d}s"><path d="M-12-5-20-9V9L-12 5ZM12-5 20-9V9L12 5Z" fill="${c}"/><ellipse rx="12" ry="8" fill="${c}"/></g></g>`;
  return frame('Een grote vrolijke pompoen met een lachend gezicht, omringd door snoepjes, sterretjes en een hartje voor Alex', '#f6ebd4', `
  <circle class="m-twinkle" cx="360" cy="360" r="170" fill="#f7d98a" opacity=".35"/>
  <ellipse cx="360" cy="468" rx="130" ry="16" fill="#775e48" opacity=".14"/>
  ${pumpkin(360, 370, 2.3, 'm-twinkle')}
  <g fill="#d98b5a"><path d="M200 470q10-12 20 0q-10 12-20 0Z"/><path d="M500 476q10-12 20 0q-10 12-20 0Z"/></g><g fill="#c9a24e"><path d="M230 486q8-10 16 0q-8 10-16 0Z"/><path d="M474 490q8-10 16 0q-8 10-16 0Z"/></g>
  <g transform="translate(360 180)"><g class="m-bob"><path d="M0 26C-38 2-24-24 0-9C24-24 38 2 0 26Z" fill="#b76e55"/></g></g>
  ${sweet(196, 260, '#517c67', 0)}${sweet(530, 250, '#d98b5a', -2.4)}${sweet(170, 390, '#f2c76b', -4.2)}${sweet(556, 384, '#b76e55', -1.2)}
  ${sparkle(250, 160, .8, 0)}${sparkle(480, 150, .7, -1.5)}${sparkle(600, 300, .6, -2.8)}${sparkle(120, 300, .6, -.7)}`);
}

export const hero = id => street(id);
export const chapter = i => i === 1 ? samhain() : i === 2 ? church() : porch();
export const completion = () => finale();
export const card = () => street('card');
