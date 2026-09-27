// Smaken uit het verleden artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'smaken-verleden';

// A muted Dutch flag; the hero animates it with the .flag class.
const flag = (x, y, w) => `<g transform="translate(${x} ${y})"><g class="flag"><path d="M0 0H${w}V${w/5.4}H0Z" fill="#b76e55"/><path d="M0 ${w/5.4}H${w}V${w/2.7}H0Z" fill="#f5ecd4"/><path d="M0 ${w/2.7}H${w}V${w/1.8}H0Z" fill="#5f7f9b"/></g></g>`;
const cane = (x, top) => `<g class="cane"><path d="M${x} 730V${top}" stroke="#9cac66" stroke-width="9" stroke-linecap="round"/>${Array.from({length:Math.floor((730-top)/46)},(_,i)=>`<path d="M${x-6} ${706-i*46}h12" stroke="#6f8448" stroke-width="3"/>`).join('')}<path d="M${x} ${top+40}q34-26 70-12M${x} ${top+92}q-34-24-66-6M${x} ${top+150}q30-20 62-4M${x} ${top+8}q-20-30-44-34" stroke="#6f9463" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
const battlements = (x, y, w) => Array.from({length:Math.floor(w/20)},(_,i)=>`<path d="M${x+i*20} ${y}h12v10h-12Z"/>`).join('');

function harbour(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van de haven van Tainan met een Nederlands zeilschip, een stenen fort, suikerriet en een grazende koe">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#d6dcc4"/><stop offset="1" stop-color="#f1ead2"/></linearGradient><linearGradient id="${p}-sea" x2="0" y2="1"><stop stop-color="#86a898"/><stop offset="1" stop-color="#5d8876"/></linearGradient><clipPath id="${p}-seaclip"><path d="M0 372H720V560H0Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="180" cy="170" r="58" fill="#f7e3a8" opacity=".4"/>
  <circle cx="180" cy="170" r="58" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".6"><ellipse cx="470" cy="150" rx="130" ry="16"/><ellipse cx="610" cy="215" rx="90" ry="12"/><ellipse cx="90" cy="265" rx="110" ry="11"/></g>
  <path class="layer" style="--i:0" d="M0 380V330Q90 270 170 305T330 290Q420 250 520 300T720 285V380Z" fill="#a9bea6"/>
  <path fill="url(#${p}-sea)" d="M0 372H720V640H0Z"/>
  <g class="waves-back" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M30 400q20-8 40 0t40 0M420 392q20-8 40 0t40 0M600 430q20-8 40 0t40 0M250 520q20-8 40 0t40 0"/></g>
  <g class="waves" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M60 470q20-8 40 0t40 0t40 0M380 480q20-8 40 0t40 0M120 540q20-8 40 0t40 0M520 540q20-8 40 0t40 0"/></g>
  <g clip-path="url(#${p}-seaclip)"><ellipse class="glint" cx="-160" cy="440" rx="110" ry="5" fill="#fffbe0" opacity="0"/><ellipse class="glint" cx="-260" cy="505" rx="80" ry="4" fill="#fffbe0" opacity="0"/></g>
  <g class="layer" style="--i:1"><path d="M440 520Q480 468 570 460L720 452V560H420Z" fill="#7c9a6a"/><path d="M420 560Q450 520 520 512L720 505V560Z" fill="#e0d2a4"/>
  <g transform="translate(560 380)"><path d="M0 40H130V90H0Z" fill="#b8845e"/><g fill="#b8845e">${battlements(0,30,130)}</g><path d="M40 0H84V42H40Z" fill="#c49269"/><g fill="#c49269">${battlements(40,-10,50)}</g><path d="M55 90V70Q62 60 69 70V90Z" fill="#6e503b"/><path d="M52 14h8v12h-8ZM66 14h8v12h-8ZM14 55h10v12H14ZM104 55h10v12h-10Z" fill="#7d5c43"/><path d="M-6 91H136" stroke="#6b5b43" stroke-width="4"/><path d="M62 0V-34" stroke="#5a4332" stroke-width="3"/>${flag(63,-34,26)}</g></g>
  <g transform="translate(150 300)"><ellipse cx="97" cy="164" rx="112" ry="8" fill="#4f7766" opacity=".5"/><g class="ship-drift"><g class="ship">
  <path d="M-2 120H192L166 160H24Z" fill="#6e503b"/><path d="M8 130H182" stroke="#9a7552" stroke-width="5"/><path d="M150 94H196V122H150Z" fill="#7c5a42"/><path d="M158 102h8v8h-8ZM174 102h8v8h-8Z" fill="#e8c98a"/><path d="M190 118 236 94" stroke="#5a4332" stroke-width="4"/>
  <path d="M55 12H60V122H55ZM115 -40H120V122H115Z" fill="#5a4332"/>
  <path class="sail" d="M30 26Q57 40 84 26V80Q57 93 30 80Z" fill="#f3ead0"/><path class="sail" d="M88 4Q117 20 146 4V72Q117 86 88 72Z" fill="#f6eed8"/><path class="sail" d="M96 -28Q117 -18 138 -28V-2Q117 8 96-2Z" fill="#f3ead0"/>
  ${flag(120,-40,30)}</g></g></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2"><path class="bird" d="m300 148 9-5 9 5"/><path class="bird" d="m332 162 7-4 7 4"/></g>
  <path class="layer" style="--i:2" d="M0 600Q180 555 360 590T720 575V760H0Z" fill="#517c67"/>
  <path d="M0 646Q200 606 380 638T720 626V760H0Z" fill="#6b8f63"/>
  ${cane(40,430)}${cane(78,470)}${cane(112,445)}${cane(146,500)}
  <g transform="translate(515 596)"><g class="cow"><path class="tail" d="M3 14Q-16 30-11 56" stroke="#4a4038" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-15 54q4 10 8 0Z" fill="#4a4038"/>
  <path d="M12 50h9v28h-9ZM30 50h9v26h-9ZM78 50h9v28h-9ZM96 50h9v26h-9Z" fill="#4a4038"/>
  <path d="M0 20Q0 0 20 0H95Q115 0 115 20V45Q115 56 104 56H11Q0 56 0 45Z" fill="#f2ead6"/><path d="M25 8q20-4 26 12t-18 16q-14-6-8-28ZM72 26q16-6 22 8t-14 14q-12-4-8-22Z" fill="#4a4038"/>
  <g class="cow-head"><path d="M108 8Q138 2 146 26Q148 46 128 48Q110 46 106 28Z" fill="#f2ead6"/><path d="M114 4q-6-10 2-12M136 6q8-8 2-14" stroke="#cdb88f" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="137" cy="40" rx="11" ry="8" fill="#e3b9a0"/><circle cx="128" cy="20" r="3" fill="#3b342e"/></g></g></g>
  </svg>`;
}

function railway() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een stoomtrein rijdt langs een klein ziekenhuis en groene heuvels">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="360" cy="300" r="225" fill="#ebecd9"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="360" cy="300" r="248" stroke-dasharray="3 9"/></g>
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="250" cy="150" rx="70" ry="12"/><ellipse cx="470" cy="118" rx="55" ry="10"/></g>
  <path d="M130 420Q230 330 330 380T590 360Q610 380 600 420Z" fill="#a9bea6"/>
  <g transform="translate(430 270)"><path d="M0 40H130V150H0Z" fill="#f3ead6"/><path d="M-8 40 65 0 138 40Z" fill="#7c9a6a"/><path d="M55 100h20v50H55Z" fill="#9a7552"/><path d="M18 60h20v20H18ZM92 60h20v20H92ZM18 104h20v20H18ZM92 104h20v20H92Z" fill="#b8c9b0"/><path d="M58 56h14v8H58Zm3-5h8v18h-8Z" fill="#b76e55"/><g class="m-sway"><path d="M65 0V-30" stroke="#5a4332" stroke-width="3"/><path d="M66 -30h24v12H66Z" fill="#b76e55"/></g></g>
  <path d="M110 470H610" stroke="#8c7a5c" stroke-width="5"/><path d="M110 486H610" stroke="#8c7a5c" stroke-width="5"/>
  <g fill="#b39d73">${Array.from({length:13},(_,i)=>`<path d="M${120+i*38} 466h14v26h-14Z"/>`).join('')}</g>
  <g transform="translate(150 330)">
  <g fill="#f8f5e5"><circle class="m-steam" cx="40" cy="-8" r="16"/><circle class="m-steam" style="--d:-1.6s" cx="22" cy="-38" r="20"/><circle class="m-steam" style="--d:-3.2s" cx="-4" cy="-70" r="24"/></g>
  <path d="M30 0h22v40H30Z" fill="#3e4a3e"/><path d="M0 40H150V120H0Z" fill="#284f3d"/><path d="M110 10H190V120H110Z" fill="#35604a"/><path d="M122 24h28v30h-28ZM158 24h22v30h-22Z" fill="#e8d9a8"/><path d="M-14 110H0V120H-14Z" fill="#3e4a3e"/><path d="M0 64H150" stroke="#9cac66" stroke-width="4"/>
  <path d="M200 30H330V120H200Z" fill="#9a7552"/><path d="M214 44h28v26h-28ZM252 44h28v26h-28ZM290 44h28v26h-28Z" fill="#f1e2b6"/><path d="M190 100h10v8h-10Z" fill="#3e4a3e"/>
  <g fill="#3a3a32">${[30,80,130,168,225,305].map(x=>`<circle cx="${x}" cy="128" r="${x<150?20:14}"/>`).join('')}</g><g fill="#b39d73">${[30,80,130,168,225,305].map(x=>`<circle cx="${x}" cy="128" r="5"/>`).join('')}</g>
  </g></svg>`;
}

function lunchbox() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een houten biàndang-lunchbox met rijst, groenten, een eitje en een stukje vis, met eetstokjes ernaast">
  <rect width="720" height="650" fill="#eadcc7"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <ellipse cx="360" cy="492" rx="190" ry="22" fill="#775e48" opacity=".13"/>
  <path d="M170 200Q170 180 190 180H530Q550 180 550 200V460Q550 480 530 480H190Q170 480 170 460Z" fill="#b98b62"/>
  <path d="M186 196H534V464H186Z" fill="#d8b58a"/><path d="M366 196V464M366 330H534" stroke="#b98b62" stroke-width="8"/>
  <path d="M196 206H358V454H196Z" fill="#f8f4e6"/>${Array.from({length:18},(_,i)=>`<ellipse cx="${214+(i%6)*27}" cy="${236+Math.floor(i/6)*70+(i%2)*14}" rx="3" ry="1.6" fill="#d9ceb2"/>`).join('')}<circle cx="277" cy="330" r="17" fill="#b75f50"/><path d="M277 313q6-8 12-4" stroke="#6f9463" stroke-width="3" fill="none"/>
  <g fill="#7c9a5a"><circle cx="400" cy="250" r="20"/><circle cx="428" cy="238" r="18"/><circle cx="420" cy="268" r="17"/></g><g fill="#5f7f4a"><path d="M398 266h6v20h-6ZM426 280h6v14h-6Z"/></g>
  <g fill="#d9965a"><circle cx="490" cy="240" r="16"/><circle cx="505" cy="275" r="14"/></g><g fill="#eab47e"><circle cx="490" cy="240" r="7"/><circle cx="505" cy="275" r="6"/></g>
  <path d="M378 350H524V440H378Z" fill="#e6a58a"/><path d="M378 372q36 10 72 0t74 0M378 404q36 10 72 0t74 0" stroke="#f3cdb8" stroke-width="5" fill="none"/>
  <circle cx="232" cy="410" r="22" fill="#fbf5e0"/><circle cx="232" cy="410" r="11" fill="#e8b646"/>
  <g transform="rotate(-12 600 330)"><path d="M586 180h10v300h-10ZM604 180h10v300h-10Z" fill="#8c6a4c"/><path d="M582 390h36v50h-36Z" fill="#b76e55"/></g>
  <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M250 190Q232 168 250 146T250 108"/><path class="m-steam" style="--d:-1.8s" d="M300 186Q282 164 300 142T300 104"/></g>
  </svg>`;
}

function market(item = 'tianbula') {
  const bowl = item === 'mochi'
    ? `<ellipse cx="360" cy="440" rx="140" ry="26" fill="#f8f3e2"/><ellipse cx="360" cy="436" rx="116" ry="18" fill="#ece3cc"/>
      <g class="m-bob"><circle cx="300" cy="400" r="38" fill="#f5f1e6"/><circle cx="360" cy="392" r="42" fill="#c9d7b0"/><circle cx="420" cy="400" r="38" fill="#e8c3c0"/>
      <path d="M338 380q22-14 42 0" stroke="#e3ecd2" stroke-width="5" fill="none"/><ellipse cx="420" cy="400" rx="16" ry="14" fill="#7a4a3e"/></g>`
    : `<path d="M230 400Q236 480 360 482Q484 480 490 400Z" fill="#f8f3e2"/><ellipse cx="360" cy="400" rx="130" ry="24" fill="#d8b27a"/>
      <g fill="#e4c497" stroke="#b98b62" stroke-width="3"><rect x="280" y="382" width="62" height="26" rx="12"/><rect x="352" y="378" width="70" height="26" rx="12"/><circle cx="440" cy="398" r="16"/></g>
      <path d="M400 330 470 420" stroke="#8c6a4c" stroke-width="5" stroke-linecap="round"/>
      <g fill="none" stroke="#fffdf0" stroke-width="5" stroke-linecap="round"><path class="m-steam" d="M320 360Q302 338 320 316T320 278"/><path class="m-steam" style="--d:-2s" d="M380 356Q362 334 380 312T380 274"/></g>`;
  const label = item === 'mochi' ? 'drie zachte mochi-balletjes op een bordje' : 'een kom tianbula met viskoekjes in bouillon';
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een kraampje op de avondmarkt met lampionnen en ${label}">
  <rect width="720" height="650" fill="#e3d9c4"/><circle cx="360" cy="315" r="223" fill="#f1e8d6"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
  <path d="M110 150Q360 230 610 150" stroke="#6b5b43" stroke-width="2" fill="none"/>
  ${[[170,178,'#d98b5a',0],[265,200,'#e0b060',-1.2],[360,207,'#d98b5a',-2.4],[455,200,'#e0b060',-.8],[550,178,'#d98b5a',-3]].map(([x,y,c,d])=>`<g class="m-sway" style="--d:${d}s"><path d="M${x} ${y-14}v10" stroke="#6b5b43" stroke-width="2"/><ellipse class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y+14}" rx="30" ry="34" fill="${c}" fill-opacity=".35"/><ellipse cx="${x}" cy="${y+14}" rx="18" ry="22" fill="${c}"/><path d="M${x-10} ${y-6}h20M${x-10} ${y+34}h20" stroke="#8c5a3c" stroke-width="4"/></g>`).join('')}
  <path d="M150 300H570L590 340H130Z" fill="#b76e55"/>${Array.from({length:6},(_,i)=>`<path d="M${170+i*70} 300h35l4 40h-43Z" fill="#f5ecd4"/>`).join('')}
  <path d="M160 340h10v140h-10ZM550 340h10v140h-10Z" fill="#8c6a4c"/>
  <path d="M140 470H580V500H140Z" fill="#9a7552"/><path d="M140 500H580" stroke="#7c5a42" stroke-width="6"/>
  ${bowl}
  <g class="m-float" fill="#a28056"><path d="m196 420 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/><path d="m526 250 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g>
  </svg>`;
}

export const hero = id => harbour(id);
export const chapter = (i, variant) => i === 1 ? railway() : i === 2 ? lunchbox() : market(variant);
export const completion = () => market('mochi');
export const card = () => harbour('card');
