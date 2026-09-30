// Kleurrijke tempels artwork: original SVG illustrations, all local, with no image services.
// Every id is prefixed with the journey slug so several journeys can share a page.
const slug = 'tempels';

// A hanging lantern; the hero sways .lantern and swings .lantern-swing during the breeze.
const lantern = (x, y) => `<g transform="translate(${x} ${y})"><g class="lantern-swing"><g class="lantern"><path d="M0 0v18" stroke="#6b5b43" stroke-width="2"/><ellipse class="lantern-glow" cx="0" cy="40" rx="30" ry="34" fill="#e0a060" opacity=".25"/><ellipse cx="0" cy="40" rx="16" ry="19" fill="#c8664f"/><path d="M-9 22h18M-9 58h18" stroke="#8c4a3a" stroke-width="4"/><path d="M0 60v12" stroke="#e0b060" stroke-width="2"/></g></g></g>`;
// A roof dragon climbing towards the pearl; flip = -1 mirrors it for the right-hand side.
const dragon = flip => `<g transform="translate(360 0) scale(${flip} 1)"><g class="dragon"><path d="M-120 328q10-24 24-6t24-6t24-6t22-6" stroke="#7fa37a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-120 328l-14-14 3 18Z" fill="#7fa37a"/><path d="M-96 318l-4-10 8 6M-72 312l-4-10 8 6M-48 306l-4-10 8 6" fill="#9cac66"/><ellipse cx="-22" cy="300" rx="12" ry="8" fill="#6f9463"/><path d="M-28 293l-6-10 10 6" fill="#6f9463"/><circle cx="-20" cy="297" r="2" fill="#f7f5ed"/><path d="M-12 304q8 4 12 0" stroke="#9cac66" stroke-width="2" fill="none"/></g></g>`;
const tree = (x, s) => `<g transform="translate(${x} 0) scale(${s} 1)"><g class="tree"><path d="M0 600V470" stroke="#6e503b" stroke-width="16"/><circle cx="-6" cy="430" r="70" fill="#517c67"/><circle cx="46" cy="472" r="52" fill="#6b8f63"/><circle cx="-50" cy="484" r="48" fill="#6b8f63"/></g></g>`;
// A pair of moon blocks: flat side up shows a half disc, round side up a dome. One of each means yes.
const blocks = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="80" cy="34" rx="100" ry="10" fill="#775e48" opacity=".14"/><g transform="rotate(-8 30 14)"><path d="M0 0H64Q58 30 32 32Q6 30 0 0Z" fill="#b5503f"/><path d="M0 0H64" stroke="#d98b72" stroke-width="5" stroke-linecap="round"/></g><g transform="rotate(10 130 14)"><path d="M96 30Q128-12 164 30Z" fill="#b5503f"/><path d="M110 16q18-14 36-4" stroke="#d98b72" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>`;
const sparkle = (x, y, s, d) => `<path class="m-twinkle" style="--d:${d}s" d="m${x} ${y-s} ${s/3} ${s*2/3} ${s*2/3} ${s/3}-${s*2/3} ${s/3}-${s/3} ${s*2/3}-${s/3}-${s*2/3}-${s*2/3}-${s/3} ${s*2/3}-${s/3}Z" fill="#e0b060"/>`;
const backdrop = (bg, disc) => `<rect width="720" height="650" fill="${bg}"/><circle cx="360" cy="310" r="225" fill="${disc}"/><g fill="none" stroke="#bcb18d" opacity=".55"><circle cx="360" cy="310" r="248" stroke-dasharray="3 9"/></g>`;

function temple(id) {
  const p = `${slug}-${id}`;
  return `<svg data-scene viewBox="0 0 720 760" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustratie van een kleurrijke Taiwanese tempel met twee draken op het dak, rode lampionnen en een wierookbrander waaruit zoete rook opstijgt">
  <defs><linearGradient id="${p}-sky" x2="0" y2="1"><stop stop-color="#dfe0c6"/><stop offset="1" stop-color="#f4ecd6"/></linearGradient></defs>
  <path fill="url(#${p}-sky)" d="M0 0H720V760H0Z"/>
  <circle class="sun-glow" cx="560" cy="150" r="52" fill="#f7e3a8" opacity=".4"/><circle cx="560" cy="150" r="52" fill="#f7e3a8"/>
  <g class="cloud" fill="#f8f4e2" opacity=".65"><ellipse cx="220" cy="130" rx="120" ry="15"/><ellipse cx="420" cy="215" rx="90" ry="11"/><ellipse cx="640" cy="250" rx="100" ry="12"/></g>
  <g class="birds" stroke="#56705f" fill="none" stroke-width="2"><path class="bird" d="m150 190 9-5 9 5"/><path class="bird" d="m182 206 7-4 7 4"/></g>
  <path class="layer" style="--i:0" d="M0 480V380Q100 300 200 340T400 320Q500 280 600 330T720 320V480Z" fill="#b8c7a8"/>
  <path class="layer" style="--i:1" d="M0 540V440Q140 390 260 430T520 420T720 430V540Z" fill="#9fb592"/>
  ${tree(70, 1)}${tree(650, -1)}
  <path d="M0 590Q360 572 720 590V760H0Z" fill="#e2d3b3"/>
  <g stroke="#d2c19d" stroke-width="2" opacity=".7"><path d="M0 640Q360 626 720 640M0 700Q360 688 720 700M180 590 120 760M540 590 600 760"/></g>
  <g class="layer" style="--i:2">
  <path d="M200 414H520V566H200Z" fill="#efe4cc"/><path d="M196 414H524V434H196Z" fill="#b76e55"/>
  <g fill="#e0b060">${Array.from({length:15},(_,i)=>`<circle cx="${212+i*21}" cy="424" r="2.5"/>`).join('')}</g>
  <path d="M214 434h18v132h-18ZM296 434h18v132h-18ZM408 434h18v132h-18ZM490 434h18v132h-18Z" fill="#b76e55"/>
  <path d="M322 470h76v96h-76Z" fill="#8c5a3c"/><path d="M360 470v96" stroke="#6e4432" stroke-width="3"/>
  <g fill="#e0b060">${[0,1,2,3].map(r=>[334,348,372,386].map(x=>`<circle cx="${x}" cy="${486+r*20}" r="2.5"/>`).join('')).join('')}</g>
  <path d="M334 442h52v20h-52Z" fill="#284f3d"/><path d="M338 446h44v12h-44Z" fill="none" stroke="#e0b060" stroke-width="2"/>
  <circle cx="264" cy="496" r="22" fill="#9cac66"/><circle cx="456" cy="496" r="22" fill="#9cac66"/><path d="M242 496h44M264 474v44M434 496h44M456 474v44" stroke="#6f8448" stroke-width="3"/>
  <path d="M130 404Q176 428 222 414H498Q544 428 590 404Q560 398 540 384L500 332H220L180 384Q160 398 130 404Z" fill="#3f6b55"/>
  <g stroke="#517c67" stroke-width="3">${Array.from({length:14},(_,i)=>`<path d="M${232+i*20} 338V410"/>`).join('')}</g>
  <path d="M140 406Q178 426 222 418H498Q542 426 580 406" stroke="#c49269" stroke-width="5" fill="none"/>
  <path d="M212 330H508" stroke="#c49269" stroke-width="10" stroke-linecap="round"/>
  <path d="M214 330Q190 332 176 312Q172 300 184 298M506 330Q530 332 544 312Q548 300 536 298" stroke="#c49269" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${dragon(1)}${dragon(-1)}
  <path d="M352 326h16l-3-10h-10Z" fill="#c49269"/><circle class="pearl-glow" cx="360" cy="304" r="20" fill="#f3d98a" opacity=".35"/><circle cx="360" cy="304" r="11" fill="#e8c46a"/><circle cx="356" cy="300" r="3" fill="#fbf1cf"/>
  ${lantern(174, 404)}${lantern(546, 404)}
  <path d="M160 562H560V570H160Z" fill="#c4ad85"/><path d="M170 570H550V594H170Z" fill="#d2bd97"/>
  <path d="M316 594H404V606H316Z" fill="#cdb68e"/><path d="M306 606H414V618H306Z" fill="#c4ad85"/></g>
  <g transform="translate(596 624)"><path d="M0 20h56v44H0Z" fill="#efe4cc"/><path d="M-8 22 28 0 64 22Z" fill="#b76e55"/><path d="M18 34h20v30H18Z" fill="#8c5a3c"/><circle class="ember" cx="28" cy="46" r="4" fill="#f0b060"/></g>
  <path class="layer" style="--i:3" d="M0 700Q120 670 220 698T460 694T720 686V760H0Z" fill="#6b8f63"/>
  <path d="M0 730Q180 712 360 728T720 722V760H0Z" fill="#517c67"/>
  <g stroke="#6e503b" stroke-width="5" stroke-linecap="round"><path d="M332 702l-8 22M388 702l8 22"/></g>
  <path d="M316 660Q320 710 360 710Q400 710 404 660Z" fill="#6e503b"/><path d="M304 664q-8-14 6-16M416 664q8-14-6-16" stroke="#6e503b" stroke-width="5" fill="none"/>
  <ellipse cx="360" cy="660" rx="48" ry="9" fill="#8c6a4c"/><path d="M330 684h60" stroke="#c49269" stroke-width="4"/>
  <g stroke="#b76e55" stroke-width="3"><path d="M348 660V620M360 660V612M372 660V620"/></g>
  <g fill="#f0a060"><circle class="ember" cx="348" cy="619" r="3"/><circle class="ember" cx="360" cy="611" r="3"/><circle class="ember" cx="372" cy="619" r="3"/></g>
  <g stroke="#fbf7ea" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"><path class="smoke" d="M348 612q-10-20 0-40t0-40t0-40"/><path class="smoke" d="M360 604q10-20 0-40t0-40t0-44"/><path class="smoke" d="M372 612q-10-22 0-42t0-40t0-36"/></g>
  </svg>`;
}

function mazu() {
  const burst = (x, y, r, c, d) => `<g class="m-twinkle" style="--d:${d}s" stroke="${c}" stroke-width="3" stroke-linecap="round">${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<path d="M${(x+Math.cos(a)*r*.4).toFixed(1)} ${(y+Math.sin(a)*r*.4).toFixed(1)}L${(x+Math.cos(a)*r).toFixed(1)} ${(y+Math.sin(a)*r).toFixed(1)}"/>`;}).join('')}</g>`;
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een vissersbootje vaart over de golven naar een tempeltje op de rotsen, terwijl er vuurwerk in de lucht knalt">
  <defs><clipPath id="${slug}-mazu-clip"><circle cx="360" cy="310" r="225"/></clipPath></defs>
  ${backdrop('#dde3cf', '#ecefdf')}
  <g class="m-drift" fill="#f8f5e5" opacity=".85"><ellipse cx="250" cy="170" rx="70" ry="12"/><ellipse cx="440" cy="140" rx="50" ry="9"/></g>
  ${burst(270, 210, 34, '#d98b5a', 0)}${burst(360, 160, 26, '#e0b060', -1.1)}${burst(470, 220, 30, '#c8664f', -2.2)}
  <g clip-path="url(#${slug}-mazu-clip)">
  <path d="M440 420Q470 330 530 318Q590 312 620 360L660 440Z" fill="#7c9a6a"/><path d="M470 420Q500 370 560 368Q610 370 640 420Z" fill="#6b8f63"/>
  <g transform="translate(508 262)"><path d="M6 24h52v36H6Z" fill="#efe4cc"/><path d="M26 38h12v22H26Z" fill="#8c5a3c"/><path d="M-10 28Q10 30 14 12H50Q54 30 74 28Q60 22 56 6H8Q4 22-10 28Z" fill="#3f6b55"/><path d="M10 6H54" stroke="#c49269" stroke-width="5" stroke-linecap="round"/><path d="M-2 24h68" stroke="#b76e55" stroke-width="3"/></g>
  <path d="M0 400H720V650H0Z" fill="#7fa393"/><path d="M0 470H720V650H0Z" fill="#6a9483"/>
  <g class="m-drift" stroke="#e4ecdc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"><path d="M160 430q20-8 40 0t40 0M380 450q20-8 40 0t40 0M200 500q20-8 40 0t40 0t40 0M440 520q20-8 40 0t40 0"/></g>
  <g class="m-bob"><g transform="translate(220 360)"><path d="M0 60H150L128 92H22Z" fill="#9a7552"/><path d="M6 68H144" stroke="#c49269" stroke-width="4"/><path d="M92 36h36v24H92Z" fill="#efe4cc"/><path d="M100 42h8v8h-8ZM114 42h8v8h-8Z" fill="#8fb0a0"/><path d="M60 -40V60" stroke="#5a4332" stroke-width="4"/><path d="M64 -34Q96 -4 64 48Z" fill="#f3ead0"/><path d="M58 -40h-24l6 7-6 7h24Z" fill="#b5503f"/></g></g>
  <ellipse cx="295" cy="454" rx="80" ry="6" fill="#4f7766" opacity=".35"/>
  </g></svg>`;
}

function kuanyin() {
  const petals = (r, c, rx, ry) => [-64,-32,0,32,64].map(a=>`<ellipse cx="360" cy="${410-ry}" rx="${rx}" ry="${ry}" transform="rotate(${a*r} 360 410)" fill="${c}"/>`).join('');
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een roze lotusbloem drijft op een rustige vijver, terwijl er druppels helend water uit een witte vaas vallen">
  <defs><clipPath id="${slug}-kuanyin-clip"><circle cx="360" cy="310" r="225"/></clipPath></defs>
  ${backdrop('#e6e0c8', '#f4efdc')}
  <g clip-path="url(#${slug}-kuanyin-clip)">
  <path d="M0 400H720V650H0Z" fill="#9dbaa8"/><path d="M0 460H720V650H0Z" fill="#8aae9c"/>
  <g class="m-drift" fill="none" stroke="#c9dccd" stroke-width="3" opacity=".7"><ellipse cx="360" cy="440" rx="150" ry="18"/><ellipse cx="360" cy="440" rx="210" ry="28"/></g>
  <g fill="#6f9463"><path d="M190 470a46 16 0 1 0 60-12l-18 10Z"/><path d="M500 500a52 18 0 1 0 64-16l-20 12Z"/><path d="M430 560a40 14 0 1 0 54-10l-16 9Z"/></g>
  <path d="M240 440V372" stroke="#6f8448" stroke-width="4"/><path d="M240 372q-14-22 0-40q14 18 0 40Z" fill="#e8b7b0"/>
  <path d="M540 470V392" stroke="#6f8448" stroke-width="4"/><path d="M540 392q-12-20 0-36q12 16 0 36Z" fill="#e8b7b0"/>
  <g class="m-bob"><ellipse cx="360" cy="424" rx="96" ry="18" fill="#6f9463"/>${petals(1, '#e8b7b0', 22, 52)}${petals(.55, '#f2cfc6', 18, 44)}<ellipse cx="360" cy="398" rx="20" ry="12" fill="#e8c46a"/></g>
  </g>
  <g transform="rotate(-38 500 170)"><path d="M480 110h40v14q24 20 24 56q0 40-44 44q-44-4-44-44q0-36 24-56Z" fill="#f8f4e6"/><path d="M500 124q20 20 20 56q0 40-20 44q34-4 44-44q0-36-24-56Z" fill="#e2dccb"/><path d="M460 176h80" stroke="#9cb8a8" stroke-width="8"/><path d="M476 104h48" stroke="#c9d7c8" stroke-width="6" stroke-linecap="round"/></g>
  <g class="m-sway"><path d="M468 128q-30-40-10-80" stroke="#6f8448" stroke-width="3" fill="none"/><g fill="#9cac66"><ellipse cx="452" cy="80" rx="5" ry="12" transform="rotate(-30 452 80)"/><ellipse cx="466" cy="100" rx="5" ry="12" transform="rotate(30 466 100)"/><ellipse cx="450" cy="58" rx="4" ry="10"/></g></g>
  <g fill="#b9d4cc">${[[430,236,0],[416,268,-.6],[402,300,-1.2],[390,332,-1.8],[380,362,-2.4]].map(([x,y,d])=>`<ellipse class="m-twinkle" style="--d:${d}s" cx="${x}" cy="${y}" rx="5" ry="7"/>`).join('')}</g>
  ${sparkle(210, 200, 12, -.5)}${sparkle(560, 290, 10, -1.7)}
  </svg>`;
}

function altar() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Een tempelaltaar met een schaal vers fruit, brandende kaarsjes en wierook, met twee rode maanstenen op de grond">
  ${backdrop('#eadcc7', '#f6ebd4')}
  <path d="M110 500H610V540H110Z" fill="#d8c7a5"/>
  <g class="m-sway"><path d="M360 86v24" stroke="#6b5b43" stroke-width="2"/><ellipse cx="360" cy="140" rx="24" ry="28" fill="#c8664f"/><path d="M346 114h28M346 166h28" stroke="#8c4a3a" stroke-width="5"/></g>
  <path d="M170 372H550V388H170Z" fill="#8c5a3c"/><path d="M186 388h12v112h-12ZM522 388h12v112h-12Z" fill="#6e4432"/>
  <path d="M200 388H520V470H200Z" fill="#b76e55"/><path d="M200 456H520" stroke="#e0b060" stroke-width="5"/><path d="M340 400h40v40h-40Z" fill="none" stroke="#e0b060" stroke-width="3"/>
  <ellipse cx="280" cy="370" rx="64" ry="10" fill="#efe4cc"/>
  <path d="M232 354q14 22 46 16" stroke="#e8c46a" stroke-width="12" fill="none" stroke-linecap="round"/>
  <g fill="#e0934a"><circle cx="262" cy="346" r="17"/><circle cx="296" cy="344" r="17"/><circle cx="280" cy="320" r="17"/></g><circle cx="318" cy="354" r="13" fill="#c86a50"/><path d="M280 303v-8" stroke="#6f8448" stroke-width="3"/>
  <path d="M410 372q-4-30 30-30q34 0 30 30Z" fill="#c49269"/><path d="M406 342h68" stroke="#a07848" stroke-width="5" stroke-linecap="round"/>
  <g stroke="#b76e55" stroke-width="3"><path d="M430 342V296M440 342V288M450 342V296"/></g>
  <g fill="none" stroke="#fffdf0" stroke-width="4" stroke-linecap="round"><path class="m-steam" d="M430 290Q414 268 430 246T430 208"/><path class="m-steam" style="--d:-1.6s" d="M450 286Q466 264 450 242T450 204"/></g>
  <g fill="#c8664f"><path d="M206 300h16v72h-16ZM498 300h16v72h-16Z"/></g>
  <g fill="#f0b060"><ellipse class="m-twinkle" cx="214" cy="290" rx="6" ry="10"/><ellipse class="m-twinkle" style="--d:-1.3s" cx="506" cy="290" rx="6" ry="10"/></g>
  ${blocks(290, 540)}
  </svg>`;
}

function answer() {
  return `<svg viewBox="0 0 720 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twee rode maanstenen op de grond, één met de platte en één met de bolle kant boven: de goden zeggen ja. Erboven hangen lampionnen en twinkelen sterretjes">
  ${backdrop('#e8dcc4', '#f5ecd8')}
  ${[[230,-0],[360,-1.4],[490,-2.6]].map(([x,d])=>`<g class="m-sway" style="--d:${d}s"><path d="M${x} 90v30" stroke="#6b5b43" stroke-width="2"/><ellipse class="m-twinkle" style="--d:${d}s" cx="${x}" cy="152" rx="40" ry="44" fill="#e0a060" fill-opacity=".25"/><ellipse cx="${x}" cy="152" rx="24" ry="28" fill="#c8664f"/><path d="M${x-14} 126h28M${x-14} 178h28" stroke="#8c4a3a" stroke-width="5"/></g>`).join('')}
  <ellipse cx="360" cy="440" rx="200" ry="44" fill="#d9b98a"/><ellipse cx="360" cy="434" rx="184" ry="36" fill="#e6cda2"/>
  ${blocks(232, 390, 1.6)}
  ${sparkle(200, 300, 14, 0)}${sparkle(520, 280, 12, -.9)}${sparkle(360, 250, 10, -1.8)}${sparkle(560, 400, 9, -2.4)}
  <path class="m-float" d="M360 540c-12-14-34-10-34 8 0 16 22 26 34 36 12-10 34-20 34-36 0-18-22-22-34-8Z" fill="#c8664f"/>
  </svg>`;
}

export const hero = id => temple(id);
export const chapter = i => i === 1 ? mazu() : i === 2 ? kuanyin() : altar();
export const completion = () => answer();
export const card = () => temple('card');
