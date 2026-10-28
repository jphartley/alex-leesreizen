// Keti Koti artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'keti-koti';

// A palm with its base at the origin; the hero animates the inner .palm group.
const palm = (x, y, h, lean) => `<g transform="translate(${x} ${y})"><g class="palm"><path d="M0 0Q${lean * .2} ${-h * .5} ${lean} ${-h}" stroke="#8a6f4f" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g fill="none" stroke-width="7" stroke-linecap="round">${[[40,-18,62,8,'#4f7a5c'],[-36,-20,-60,6,'#4f7a5c'],[24,-30,46,-20,'#6b9463'],[-22,-32,-44,-22,'#6b9463'],[44,4,58,32,'#517c67'],[-40,2,-54,30,'#517c67']].map(([cx,cy,ex,ey,c])=>`<path d="M${lean} ${-h}q${cx} ${cy} ${ex} ${ey}" stroke="${c}"/>`).join('')}</g></g></g>`;
const grass = (x, y) => `<g transform="translate(${x} ${y})"><g class="grass" fill="none" stroke="#3f6a52" stroke-width="4" stroke-linecap="round"><path d="M0 0q-6-30-18-52M0 0q2-36 4-62M0 0q8-28 22-46"/></g></g>`;
const bird = (x, y, s = 1) => `<path d="M${x} ${y}q${8*s} ${-7*s} ${16*s} 0q${8*s} ${-7*s} ${16*s} 0"/>`;
// A chain link seen from the front (ring) or from the side (bar).
const ring = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="15" fill="none" stroke="#6e6252" stroke-width="9"/>`;
const bar = (x, y) => `<rect x="${x - 20}" y="${y - 5}" width="40" height="10" rx="5" fill="#857865"/>`;
const backdrop = (bg, disc) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="315" r="223" fill="${disc}"/>
  <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>`;

function voyage(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een oud zeilschip op de oceaan in het ochtendlicht, met de groene kust van Suriname, palmbomen en plantagevelden">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#e2dcc2"/><stop offset="1" stop-color="#f4ead4"/></linearGradient><linearGradient id="${p}-sea" x2="0" y2="1"><stop stop-color="#82a596"/><stop offset="1" stop-color="#557f6e"/></linearGradient><clipPath id="${p}-seaclip"><path d="M0 360H720V600H0Z"/></clipPath></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="560" cy="240" r="62" fill="#f2d49a" opacity=".4"/>
  <circle cx="560" cy="240" r="62" fill="#f2d49a"/>
  <g class="cloud" fill="#f8f4e2" opacity=".6"><ellipse cx="200" cy="130" rx="130" ry="15"/><ellipse cx="420" cy="190" rx="90" ry="11"/><ellipse cx="640" cy="120" rx="100" ry="12"/></g>
  <path fill="url(#${p}-sea)" d="M0 360H720V640H0Z"/>
  <g class="waves-back" stroke="#d7e4d2" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"><path d="M30 390q20-8 40 0t40 0M300 384q20-8 40 0t40 0M520 398q20-8 40 0t40 0M200 520q20-8 40 0t40 0"/></g>
  <g class="waves" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M40 480q20-8 40 0t40 0t40 0M300 450q20-8 40 0t40 0M90 560q20-8 40 0t40 0M260 590q20-8 40 0t40 0"/></g>
  <g clip-path="url(#${p}-seaclip)"><ellipse class="glint" cx="-160" cy="430" rx="110" ry="5" fill="#fffbe0" opacity="0"/><ellipse class="glint" cx="-260" cy="500" rx="80" ry="4" fill="#fffbe0" opacity="0"/></g>
  <g transform="translate(110 296)"><ellipse cx="97" cy="164" rx="112" ry="8" fill="#4f7766" opacity=".5"/><g class="ship-drift"><g class="ship">
  <path d="M-2 120H192L166 160H24Z" fill="#6e503b"/><path d="M8 130H182" stroke="#9a7552" stroke-width="5"/><path d="M150 94H196V122H150Z" fill="#7c5a42"/><path d="M158 102h8v8h-8ZM174 102h8v8h-8Z" fill="#e8c98a"/><path d="M190 118 236 94" stroke="#5a4332" stroke-width="4"/>
  <path d="M55 12H60V122H55ZM115 -40H120V122H115Z" fill="#5a4332"/>
  <path class="sail" d="M30 26Q57 40 84 26V80Q57 93 30 80Z" fill="#f3ead0"/><path class="sail" d="M88 4Q117 20 146 4V72Q117 86 88 72Z" fill="#f6eed8"/><path class="sail" d="M96 -28Q117 -18 138 -28V-2Q117 8 96-2Z" fill="#f3ead0"/>
  </g></g></g>
  <g class="layer" style="--i:0"><path d="M360 482Q420 438 520 432L720 420V520H360Z" fill="#e0d2a4"/><path d="M392 478Q440 446 530 442L720 432V640H392Z" fill="#7c9a6a"/>
  <g fill="#9cac66">${Array.from({length:5},(_,r)=>Array.from({length:11},(_,c)=>`<ellipse cx="${448-r*10+c*26}" cy="${484+r*22}" rx="${7+r}" ry="${4+r*.5}"/>`).join('')).join('')}</g>
  ${palm(470,456,110,14)}${palm(548,446,142,-10)}${palm(640,438,122,12)}${palm(700,440,92,-8)}</g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2" stroke-linecap="round"><g class="bird">${bird(320,170,.6)}</g><g class="bird">${bird(352,186,.45)}</g><g class="bird">${bird(296,196,.5)}</g></g>
  <path class="layer" style="--i:1" d="M0 610Q180 572 360 600T720 586V760H0Z" fill="#517c67"/>
  <path class="layer" style="--i:2" d="M0 664Q200 630 380 654T720 644V760H0Z" fill="#6b8f63"/>
  ${grass(60,690)}${grass(130,712)}${grass(590,700)}${grass(670,684)}
  </svg>`;
}

function freedom() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een gebroken ketting op een pad naar de opkomende zon, met een bordje 1863 vooraan en een bordje 1873 verderop, en vogels die vrij wegvliegen">
  ${backdrop('#e6e2c8', '#f3ecd8')}
  <circle class="m-twinkle" cx="360" cy="330" r="112" fill="#f2d49a" opacity=".35"/><circle cx="360" cy="330" r="84" fill="#f2d49a"/>
  <path d="M120 410Q240 350 360 380T600 368L604 420H116Z" fill="#a9bea6"/>
  <path d="M104 408Q360 380 616 408L636 560H84Z" fill="#9cac66"/>
  <path d="M290 560 352 398H368L430 560Z" fill="#e0d2a4"/>
  <g transform="translate(222 452)"><path d="M-3 0h6v62h-6Z" fill="#8c6a4c"/><rect x="-36" y="-30" width="72" height="32" rx="4" fill="#f7f5ed"/><text x="0" y="-8" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="700" fill="#6e503b">1863</text></g>
  <g transform="translate(414 392)"><path d="M-2 0h4v36h-4Z" fill="#8c6a4c"/><rect x="-24" y="-20" width="48" height="22" rx="3" fill="#f7f5ed"/><text x="0" y="-4" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#284f3d">1873</text></g>
  <ellipse cx="360" cy="548" rx="230" ry="12" fill="#5a4f3e" opacity=".12"/>
  <g transform="rotate(-6 250 530)">${ring(150,530)}${bar(196,530)}${ring(242,530)}${bar(288,530)}<path d="M312 524a26 15 0 1 0 -4 18" fill="none" stroke="#6e6252" stroke-width="9" stroke-linecap="round"/></g>
  <g transform="rotate(6 470 530)"><path d="M408 524a26 15 0 1 1 4 18" fill="none" stroke="#6e6252" stroke-width="9" stroke-linecap="round"/>${bar(432,530)}${ring(478,530)}${bar(524,530)}${ring(570,530)}</g>
  <g fill="none" stroke="#56705f" stroke-width="3" stroke-linecap="round"><g class="m-float">${bird(344,470)}</g><g class="m-float" style="--d:-1.5s">${bird(372,420,.8)}</g><g class="m-float" style="--d:-3s">${bird(338,372,.7)}</g><g class="m-float" style="--d:-4.5s">${bird(394,330,.55)}</g></g>
  <g fill="#c9a24e"><path class="m-twinkle" d="m360 500 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/><path class="m-twinkle" style="--d:-1.4s" d="m318 462 2-7 2 7 7 2-7 2-2 7-2-7-7-2Z"/><path class="m-twinkle" style="--d:-2.8s" d="m410 476 2-7 2 7 7 2-7 2-2 7-2-7-7-2Z"/></g>
  </svg>`;
}

function commemoration() {
  const houses = [[150,74,150,'#b8845e'],[224,62,176,'#9a7552'],[286,70,140,'#c49269'],[434,66,160,'#7c5a42'],[500,70,144,'#b8845e']];
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een herdenking in Amsterdam: grachtenpanden, een monument met een boog waar figuren doorheen stappen, bloemen bij het monument, een spreekgestoelte en mensen die samen luisteren">
  ${backdrop('#e2e4c8', '#ebecd9')}
  <g class="m-drift" fill="#f8f5e5" opacity=".8"><ellipse cx="250" cy="140" rx="70" ry="12"/><ellipse cx="480" cy="116" rx="55" ry="10"/></g>
  ${houses.map(([x,w,h,c])=>`<g><path d="M${x} 400V${400-h}h${w*.2}l${w*.3}-30l${w*.3} 30h${w*.2}V400Z" fill="${c}"/>${[0,1,2].map(r=>[0,1].map(k=>`<path d="M${x+w*.18+k*w*.4} ${400-h+18+r*40}h${w*.24}v24h${-w*.24}Z" fill="#f1e2b6"/>`).join('')).join('')}</g>`).join('')}
  <g class="m-sway"><path d="M136 470V380" stroke="#6e503b" stroke-width="8"/><circle cx="136" cy="350" r="44" fill="#7c9a6a"/><circle cx="120" cy="370" r="30" fill="#6b8f63"/></g>
  <g class="m-sway" style="--d:-2.5s"><path d="M584 470V380" stroke="#6e503b" stroke-width="8"/><circle cx="584" cy="350" r="44" fill="#7c9a6a"/><circle cx="600" cy="370" r="30" fill="#6b8f63"/></g>
  <path d="M110 400H610V480H110Z" fill="#cfc3a0"/>
  <path d="M276 470H444V488H276Z" fill="#b39d73"/>
  <path d="M292 470V330Q360 262 428 330V470H406V338Q360 290 314 338V470Z" fill="#4f5a4e"/>
  <g fill="#5d6b5c"><circle cx="340" cy="372" r="11"/><path d="M328 386h24l4 84h-32Z"/><circle cx="372" cy="364" r="12"/><path d="M359 379h26l6 91h-38Z"/></g>
  <g fill="#3e4a3e"><circle cx="420" cy="388" r="13"/><path d="M405 404h30l8 66h-14l-6-30-6 30h-20Z"/><path d="M432 410l20-30" stroke="#3e4a3e" stroke-width="8" stroke-linecap="round"/></g>
  ${[[290,'#d98b5a',0],[312,'#e0b060',-1],[334,'#f5ecd4',-2],[386,'#b76e55',-.5],[408,'#e0b060',-1.5],[430,'#d98b5a',-2.5]].map(([x,c,d])=>`<g class="m-sway" style="--d:${d}s"><path d="M${x} 488v-20" stroke="#517c67" stroke-width="3"/><circle cx="${x}" cy="464" r="9" fill="${c}"/><circle cx="${x}" cy="464" r="3" fill="#8c5a3c"/></g>`).join('')}
  <g transform="translate(508 410)"><path d="M-14 20h28l6 66h-40Z" fill="#8c6a4c"/><path d="M-22 8h44l-6 14h-32Z" fill="#9a7552"/><path d="M6 8q4-18 14-24" stroke="#3e4a3e" stroke-width="3" fill="none"/><circle cx="21" cy="-17" r="4" fill="#3e4a3e"/></g>
  ${[[150,'#284f3d'],[205,'#8c7a5c'],[262,'#517c67'],[320,'#6e503b'],[378,'#6b8f63'],[436,'#284f3d'],[494,'#9a7552'],[552,'#517c67']].map(([x,c],i)=>`<g fill="${c}"><circle cx="${x+18}" cy="${548-(i%2)*8}" r="18"/><path d="M${x-8} ${600-(i%2)*8}q26-46 52 0Z"/></g>`).join('')}
  <path d="M100 592H620V604H100Z" fill="#cfc3a0"/>
  </svg>`;
}

function blossom() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een open ketting in het gras waar bloemen doorheen groeien, met vogels die vrij wegvliegen onder een warme zon">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <circle class="m-twinkle" cx="360" cy="250" r="92" fill="#f2d49a" opacity=".35"/><circle cx="360" cy="250" r="66" fill="#f2d49a"/>
  <g fill="none" stroke="#56705f" stroke-width="3" stroke-linecap="round"><g class="m-float">${bird(250,200,.8)}</g><g class="m-float" style="--d:-1.2s">${bird(430,170,.7)}</g><g class="m-float" style="--d:-2.4s">${bird(480,230,.6)}</g><g class="m-float" style="--d:-3.6s">${bird(200,260,.55)}</g></g>
  <path d="M126 420Q240 330 360 366T594 356L604 470H116Z" fill="#9cac66"/>
  <path d="M108 452Q360 404 612 452V530H108Z" fill="#7c9a6a"/>
  <ellipse cx="360" cy="498" rx="200" ry="12" fill="#3f5a48" opacity=".18"/>
  ${ring(200,486)}${bar(246,486)}<path d="M268 480a26 15 0 1 0 -4 18" fill="none" stroke="#6e6252" stroke-width="9" stroke-linecap="round"/>
  <path d="M452 480a26 15 0 1 1 4 18" fill="none" stroke="#6e6252" stroke-width="9" stroke-linecap="round"/>${bar(474,486)}${ring(520,486)}
  ${[[200,'#d98b5a',0,64],[360,'#e0b060',-1,92],[310,'#f5ecd4',-2,58],[410,'#b76e55',-.6,70],[520,'#e0b060',-1.6,62],[160,'#f5ecd4',-2.4,44],[566,'#d98b5a',-3,48]].map(([x,c,d,h])=>`<g class="m-sway" style="--d:${d}s"><path d="M${x} 500q-4-${h/2} 0-${h}" stroke="#517c67" stroke-width="4" fill="none"/><path d="M${x} ${500-h*.45}q14-10 20-2q-10 8-20 2Z" fill="#6b9463"/>${[0,72,144,216,288].map(a=>`<ellipse cx="${x}" cy="${500-h-9}" rx="6" ry="10" fill="${c}" transform="rotate(${a} ${x} ${500-h})"/>`).join('')}<circle cx="${x}" cy="${500-h}" r="5" fill="#8c5a3c"/></g>`).join('')}
  </svg>`;
}

export const hero = id => voyage(id);
export const chapter = i => i === 1 ? freedom() : commemoration();
export const completion = () => blossom();
export const card = () => voyage('card');
