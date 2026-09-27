// Original SVG illustrations: all artwork lives locally, with no image services.
const leaf = (x,y,r=0,s=1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0C-35-48-16-81 0-96C30-73 34-31 0 0" fill="#9cac66"/><path d="M0 0V-77" stroke="#526e48" stroke-width="2"/></g>`;
export function mountains(id='mountain') {
  const rustle = (d, leafSvg) => `<g class="rustle" style="--d:${d}s">${leafSvg}</g>`;
  return `<svg viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van mistige Taiwanese bergen met groene theevelden en een klein theehuis">
  <defs><linearGradient id="${id}-sky" x2="0" y2="1"><stop stop-color="#c4d7c4"/><stop offset="1" stop-color="#eef0d6"/></linearGradient><linearGradient id="${id}-hill" x2=".5" y2="1"><stop stop-color="#668c66"/><stop offset="1" stop-color="#254f41"/></linearGradient><linearGradient id="${id}-light"><stop stop-color="#fffbe0" stop-opacity="0"/><stop offset=".5" stop-color="#fffbe0" stop-opacity=".2"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></linearGradient><clipPath id="${id}-clip"><path d="M0 521Q142 363 361 503T720 440V760H0Z"/></clipPath></defs>
  <path fill="url(#${id}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="537" cy="145" r="64" fill="#f9ebbb" opacity=".4"/>
  <circle cx="537" cy="145" r="64" fill="#f9ebbb"/>
  <g class="cloud cloud-one" fill="#f7f6de" opacity=".5"><ellipse cx="137" cy="176" rx="150" ry="18"/><ellipse cx="390" cy="288" rx="200" ry="19"/></g>
  <g class="layer" style="--i:0"><path d="M-30 385 95 248 163 308 289 133 399 283 491 209 615 348 737 220V760H0Z" fill="#9fbba5"/>
  <path d="m139 361 150-228 55 110-54-25-38 63-24-7Z" fill="#d1decb" opacity=".7"/></g>
  <path class="layer" style="--i:1" d="M-20 417 86 343 157 384 350 252 464 383 550 312 753 433V760H0Z" fill="#779b83"/>
  <path class="layer" style="--i:2" d="M-20 493 105 407 217 443 438 321 535 425 614 390 740 452V760H0Z" fill="#517c67"/>
  <g class="cloud cloud-two" fill="#e7edda" opacity=".38"><path d="M-100 384Q131 350 331 383T830 377L810 402Q540 410 330 399T-100 412Z"/><path d="M-100 469Q107 444 350 455T830 440L820 461Q523 491 300 476T-100 491Z"/></g>
  <path d="M0 521Q142 363 361 503T720 440V760H0Z" fill="url(#${id}-hill)"/>
  <g clip-path="url(#${id}-clip)" fill="none" stroke-linecap="round">
  ${Array.from({length:11},(_,i)=>`<path d="M-90 ${501+i*32}Q110 ${370+i*31} 331 ${518+i*24}T820 ${461+i*29}" stroke="${i%2?'#97ad68':'#aabd7c'}" stroke-width="12"/><path d="M-90 ${514+i*32}Q110 ${383+i*31} 331 ${531+i*24}T820 ${474+i*29}" stroke="#234f40" stroke-width="7" opacity=".55"/>`).join('')}
  <g transform="skewX(-18)"><rect class="field-light" x="-200" y="360" width="240" height="420" fill="url(#${id}-light)"/></g>
  </g>
  <path d="M551 513Q437 552 397 615T370 760H422Q400 674 433 626T573 527Z" fill="#dbcd98"/>
  <g transform="translate(521 430)"><g fill="#f3f1dd"><circle class="smoke" cx="58" cy="-18" r="5"/><circle class="smoke" cx="58" cy="-18" r="5" style="--d:-2.3s"/><circle class="smoke" cx="58" cy="-18" r="5" style="--d:-4.6s"/></g><path d="M54-12H62V4H54Z" fill="#344b41"/><path d="M0 25H78V80H0Z" fill="#e9d7ac"/><path d="m-15 27 49-41 59 41Z" fill="#344b41"/><path d="m-21 29 55-49 65 49-10 6H-16Z" fill="#344b41"/><path d="M32 45H53V80H32Z" fill="#6a6c50"/><path class="window" d="M9 42H23V59H9ZM61 42H71V59H61Z" fill="#a3996b"/><path d="M-5 81H85" stroke="#254d3d" stroke-width="5"/></g>
  <g fill="#254f40" stroke="#254f40" stroke-width="7"><path class="tree" d="M29 550V446M1 495q29-62 58 0M4 472q25-61 53 0"/><path class="tree" style="--d:-2.7s" d="M665 487V383M636 446q29-62 58 0M641 422q25-61 53 0"/></g>
  <g class="birds" stroke="#496b58" fill="none" stroke-width="2"><path class="bird" d="m133 163 9-5 9 5"/><path class="bird" style="--d:-.6s" d="m164 175 7-4 7 4"/></g>
  <g transform="translate(30 757)">${rustle(0,leaf(0,0,-39,1.6))}${rustle(-1.8,leaf(20,5,7,1.4))}${rustle(-3.1,leaf(45,10,49,1.5))}</g>
  <g transform="translate(680 775)">${rustle(-.9,leaf(0,0,-35,1.4))}${rustle(-2.4,leaf(20,5,15,1.8))}${rustle(-4,leaf(45,10,49,1.5))}</g>
  </svg>`;
}
export function teaArt() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Drie geïllustreerde kopjes groene thee, oolongthee en zwarte thee">
  <rect width="720" height="650" fill="#e2e4c8"/><circle cx="350" cy="291" r="222" fill="#ebecd9"/>
  <g opacity=".45" stroke="#a3ae83" fill="none"><circle cx="350" cy="291" r="245" stroke-dasharray="3 9"/></g>
  ${[[170,270,'#a6b668','GROENE THEE'],[365,230,'#be9051','OOLONGTHEE'],[548,310,'#825039','ZWARTE THEE']].map(([x,y,c,t],i)=>`<g transform="translate(${x} ${y})"><ellipse cy="91" rx="91" ry="24" fill="#617253" opacity=".12"/><ellipse cy="77" rx="93" ry="29" fill="#f8f5e5"/><ellipse cy="76" rx="70" ry="17" fill="#d3d5b5"/><path d="M62 0C114-7 114 61 66 56" fill="none" stroke="#faf6e8" stroke-width="16"/><path d="M-69-5Q-67 79 0 80Q67 79 69-5Z" fill="#faf6e8"/><ellipse cy="-5" rx="69" ry="24" fill="#d5d6bd"/><ellipse cy="-4" rx="59" ry="18" fill="${c}"/><path d="M-39-8Q-13-21 19-14" stroke="#fff9dd" stroke-width="3" fill="none" opacity=".5"/><g class="steam steam-${i}" fill="none" stroke="#fffdf0" stroke-width="4" stroke-linecap="round"><path d="M-15-42Q-33-65-15-87T-15-128"/><path d="M13-35Q-5-58 13-80T13-116"/></g><text y="144" text-anchor="middle" fill="#435741" font-family="sans-serif" font-size="13" letter-spacing="2">${t}</text></g>`).join('')}
  <g transform="translate(340 590)">${leaf(0,0,-60,.7)}${leaf(4,0,-15,.85)}${leaf(8,0,40,.8)}</g></svg>`;
}
export function bobaArt(flavor='classic') {
 const drink=flavor==='fruit'?'#d79964':flavor==='cheese'?'#b39d73':'#bd9b7d';
 return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een geïllustreerde beker bubble tea met tapiocaballetjes en een groen rietje">
 <defs><clipPath id="cup-${flavor}"><path d="M247 196H473L450 523Q360 553 270 523Z"/></clipPath></defs>
 <rect width="720" height="650" fill="${flavor==='fruit'?'#ecdbbb':'#eadcc7'}"/><circle cx="360" cy="315" r="223" fill="#f6ebd4"/>
 <g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="315" r="247" stroke-dasharray="3 9"/></g>
 <g class="floating-leaf">${leaf(172,202,-40,.62)}</g><g class="floating-leaf second">${leaf(572,458,53,.7)}</g>
 <ellipse cx="361" cy="555" rx="133" ry="21" fill="#775e48" opacity=".13"/>
 <g class="boba-cup"><path d="m382 241 39-151" stroke="#315e49" stroke-width="23"/><path d="m383 235 37-145" stroke="#6f9270" stroke-width="6"/>
 <path d="M247 196H473L450 523Q360 553 270 523Z" fill="#f8f1da"/>
 <g clip-path="url(#cup-${flavor})"><path d="M245 257Q360 282 478 257V553H245Z" fill="${drink}"/><path d="M247 258Q357 288 475 258" fill="none" stroke="#e7c9a4" stroke-width="17"/>
 ${flavor==='cheese'?'<path d="M246 240Q360 260 476 240V300Q353 319 246 296Z" fill="#fff3cd"/>':''}
 ${[[300,490],[339,511],[380,514],[420,494],[320,459],[361,475],[401,461],[292,433],[435,432],[353,431],[390,414]].map(([x,y],i)=>`<g class="pearl pearl-${i%3}"><circle cx="${x}" cy="${y}" r="16" fill="#443e32"/><circle cx="${x-4}" cy="${y-5}" r="4" fill="#807059"/></g>`).join('')}
 ${flavor==='fruit'?'<g fill="#e7b646" stroke="#f7d376" stroke-width="4"><circle cx="293" cy="327" r="26"/><circle cx="416" cy="367" r="23"/></g>':''}
 <path d="M274 237 291 408" stroke="#fffbed" opacity=".32" stroke-width="14" stroke-linecap="round"/>
 </g><ellipse cx="360" cy="196" rx="115" ry="22" fill="#f9f3df" stroke="#d5c8ab" stroke-width="3"/><ellipse cx="360" cy="194" rx="100" ry="12" fill="#e8dbc0"/><path d="m390 210 31-120" stroke="#315e49" stroke-width="23"/><path d="m393 200 27-110" stroke="#6f9270" stroke-width="6"/>
 <g transform="translate(360 361)"><circle r="40" fill="#f7ecd0"/><path d="M0 19C-27-11-7-28 15-27C26-5 13 12 0 19Z" fill="#58794f"/><path d="m-8 27 18-43" stroke="#f7ecd0" stroke-width="2"/></g></g>
 <g fill="#a28056"><path d="m181 370 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z"/><path d="m526 176 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></g></svg>`;
}
