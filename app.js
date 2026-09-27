import { journeys } from './journeys/index.js';
import { animateScene } from './motion.js';
import { load, save } from './store.js';

const main = document.querySelector('#main');
const switcher = document.querySelector('#journey-switch');
let storage = null;
try { storage = localStorage; } catch {}
const data = load(storage);
const numberWords = ['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien'];
const texts = {};
let journey = null, entry = null, title = '', paragraphs = [], variants = {};
let currentChapter = 0, questionIndex = 0, showingModel = false, readback = false, navigation = 0;

const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Glossary words are matched in one pass with Unicode-aware boundaries, so words with accents work
// and a later word can never match inside an earlier word's button.
function inline(text, dictionary) {
  let result = escape(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const words = dictionary ? Object.keys(dictionary) : [];
  if (words.length) result = result.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${words.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}])`, 'gu'), word => `<button class="vocab" data-word="${word}" aria-label="Wat betekent ${word}?">${word}</button>`);
  return result;
}
const mcCount = () => journey.questions.length;
const total = () => journey.questions.length + journey.written.length;
const route = view => `#/${journey.slug}${view ? `/${view}` : ''}`;
const writtenIndex = () => questionIndex - mcCount();
const variantFor = i => variants[i] ?? journey.chapters[i].variants?.[0].id;
const chapterArt = i => i === 0 ? journey.art.hero('chapter') : journey.art.chapter(i, variantFor(i));
function persist(){save(storage,data);}
function announce(text){document.querySelector('#announcement').textContent=text;}
function focusMain(){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function applySettings(){
  document.body.classList.toggle('calm',data.settings.calm);document.body.classList.toggle('large-text',data.settings.large);
  document.querySelector('#calm-toggle').setAttribute('aria-pressed',data.settings.calm);
  document.querySelector('#calm-notice').hidden=!data.settings.calm;
  document.querySelector('#font-toggle').setAttribute('aria-pressed',data.settings.large);
  document.querySelector('#font-toggle').setAttribute('aria-label',data.settings.large?'Normale letters':'Grotere letters');
}
document.querySelector('#calm-toggle').onclick=()=>{data.settings.calm=!data.settings.calm;persist();applySettings();announce(data.settings.calm?'Rustige leesstand aan. De illustraties zijn verborgen en de animaties staan stil.':'Rustige leesstand uit.');};
document.querySelector('#calm-disable').onclick=()=>document.querySelector('#calm-toggle').click();
document.querySelector('#font-toggle').onclick=()=>{data.settings.large=!data.settings.large;persist();applySettings();};
// The skip link would otherwise change the hash and be treated as a route.
document.querySelector('.skip-link').onclick=event=>{event.preventDefault();focusMain();};
function hasAnswers(){return Object.keys(entry.answers).length>0||Object.values(entry.written).some(t=>String(t).trim());}
function resetAnswers(){
 if(!confirm('Weet je het zeker? Al je antwoorden van deze leesreis worden gewist.'))return false;
 entry.answers={};entry.written={};persist();announce('Je antwoorden zijn gewist.');return true;
}

// The text file is "# Title" followed by one paragraph per chapter, separated by blank lines.
function parseText(markdown){
 const blocks=markdown.split(/^## /m)[0].split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean);
 const heading=blocks.find(b=>b.startsWith('# '));
 return {title:heading?heading.slice(2).trim():'',paragraphs:blocks.filter(b=>!b.startsWith('#'))};
}
async function openJourney(next){
 if(!texts[next.slug]){
  const response=await fetch(`journeys/${next.slug}/text.md`);if(!response.ok)throw new Error(`Text for ${next.slug} not found`);
  const text=parseText(await response.text());
  if(text.paragraphs.length!==next.chapters.length)throw new Error(`${next.slug}: ${text.paragraphs.length} paragraphs for ${next.chapters.length} chapters`);
  texts[next.slug]=text;
 }
 if(journey!==next)variants={};
 journey=next;({title,paragraphs}=texts[next.slug]);
 entry=data.journeys[next.slug]??={answers:{},written:{}};
 // Ignore invalid answer indexes if saved browser data has been edited.
 for(const key of Object.keys(entry.answers)){const q=/^\d+$/.test(key)&&journey.questions[key],v=entry.answers[key];if(!q||!Number.isInteger(v)||v<0||v>=q.options.length)delete entry.answers[key];}
 for(const key of Object.keys(entry.written)){if(!/^\d+$/.test(key)||!journey.written[key]||typeof entry.written[key]!=='string')delete entry.written[key];}
}

function landing(){
 main.innerHTML=`<div class="landing"><section class="landing-intro"><div class="travel-label"><span></span> KLEINE WERELD · GROTE VERHALEN</div><p class="greeting">Hé Alex, waar gaan we heen?</p><h1>Kies je <em>leesreis.</em></h1><p class="hero-description">Elke leesreis is een verhaal om rustig te lezen, met tekeningen, uitleg bij moeilijke woorden en vragen om over na te denken. Kies er een die je nieuwsgierig maakt.</p></section><div class="journey-grid">${journeys.map(j=>`<a class="journey-card" href="#/${j.slug}"><div class="journey-card-art" aria-hidden="true">${j.art.card()}</div><div class="journey-card-body"><small>LEESREIS ${escape(j.number)} · ${escape(j.name.toUpperCase())}</small><strong>${inline(j.card.title)}</strong><span>${inline(j.card.blurb)}</span></div><span class="card-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><div class="home-note"><span aria-hidden="true">♡</span> Speciaal voor Alex, gemaakt door papa Jeremy.</div></div>`;
}
function home(){
 const h=journey.home,n=journey.chapters.length;
 main.innerHTML=`<div class="home"><section class="hero"><div class="hero-copy"><div class="travel-label"><span></span> ${escape(h.label)}</div><p class="greeting">${inline(h.greeting)}</p><h1>${h.heading.map(line=>`<span class="title-line">${inline(line)}</span>`).join('')}</h1><p class="hero-description">${inline(h.description)}</p><a class="primary" href="${route('chapter-0')}">${escape(h.cta)} <span class="arrow" aria-hidden="true">↗</span></a><div class="hero-meta"><span>${n} korte hoofdstukken</span><span>${total()} vragen</span><span>Op jouw tempo</span></div><div class="dedication"><span class="heart" aria-hidden="true">♡</span><span>Speciaal voor Alex, gemaakt door <strong>papa Jeremy</strong></span></div></div><div class="hero-art">${journey.art.hero('hero')}<div class="location-tag"><span aria-hidden="true">⌖</span> ${escape(h.location)}</div><div class="stamp">${escape(h.stamp[0])}<b>${escape(h.stamp[1])}</b>${escape(h.stamp[2])}</div><div class="illustration-caption">${inline(h.caption)}</div></div></section><section class="route" aria-label="Kies een hoofdstuk"><div class="section-heading"><h2>${inline(h.routeHeading)}</h2><a class="text-button" href="${route('quiz-1')}">Naar de vragen ↗</a></div><div class="chapter-grid" style="--chapters:${n}">${journey.chapters.map((c,i)=>`<button class="chapter-card" data-chapter="${i}"><span class="chapter-icon tone-${i%4}" aria-hidden="true">${escape(c.icon)}</span><span><small>HOOFDSTUK 0${i+1}</small><strong>${inline(c.short)}</strong></span><span class="card-arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section><div class="home-note"><span aria-hidden="true">❧</span> Geen haast, Alex. De mooiste ontdekkingen doe je op je eigen tempo. <a href="${route('reading')}">Alles rustig lezen →</a></div>${hasAnswers()?'<button class="text-button reset-link" data-action="reset">Antwoorden wissen en opnieuw beginnen</button>':''}</div>`;
}
function chapter(i){
 currentChapter=i;const c=journey.chapters[i],last=i===journey.chapters.length-1;
 main.innerHTML=`<div class="reader"><div class="reader-top"><a class="text-button" href="${route('')}">← Jouw reis</a><nav class="chapter-nav" aria-label="Hoofdstukken">${journey.chapters.map((ch,n)=>`${n?'<span class="nav-connector" aria-hidden="true"></span>':''}<button class="chapter-dot ${n===i?'active':''}" data-chapter="${n}" aria-label="Hoofdstuk ${n+1}: ${escape(ch.title)}" ${n===i?'aria-current="step"':''}>${n+1}</button>`).join('')}<span class="nav-connector" aria-hidden="true"></span><a class="text-button" href="${route('quiz-1')}">Quiz ↗</a></nav></div><div class="reader-layout"><article class="story-panel"><div class="eyebrow"><span class="line"></span>${escape(c.label)}</div><h1>${inline(c.title)}</h1><div class="story-text"><p>${inline(paragraphs[i],journey.dictionary)}</p></div><div id="word-help" class="word-help" role="status"></div><div class="story-bottom"><span class="reading-hint">${i===0?'Tip van papa: tik op een groen woord voor de betekenis.':'Lees gerust nog een keer. Jij bepaalt het tempo.'}</span><button class="primary" data-action="read-next">${last?'Gelezen! Naar de vragen':'Gelezen! Verder'} <span class="arrow" aria-hidden="true">→</span></button></div>${i?`<button class="text-button" data-chapter="${i-1}">← Vorig hoofdstuk</button>`:''}</article><aside class="reader-aside"><div class="reader-art" id="chapter-art">${chapterArt(i)}</div><div class="aside-caption"><div class="eyebrow">${escape(c.note)}</div><h2>${inline(c.aside)}</h2><p>${inline(c.caption)}</p>${c.variants?`<div class="discovery" role="group" aria-label="Kies een illustratie">${c.variants.map(v=>`<button class="flavor-button" data-variant="${escape(v.id)}" aria-pressed="${v.id===variantFor(i)}">${escape(v.label)}</button>`).join('')}</div>`:''}</div></aside></div></div>`;
}
function quiz(){
 const count=total(),mc=mcCount();
 if(questionIndex>=count){completion();return;}
 const qi=questionIndex,written=qi>=mc,q=written?journey.written[qi-mc]:journey.questions[qi];
 const answered=!written&&Number.isInteger(entry.answers[qi]),choice=entry.answers[qi];
 main.innerHTML=`<div class="quiz-shell"><div class="quiz-topline"><a class="text-button" href="${route('')}">← Jouw reis</a><span class="quiz-kicker">VRAAG ${qi+1} VAN ${count}</span></div><nav class="question-nav" aria-label="Vragen">${Array.from({length:count},(_,n)=>`<a class="chapter-dot ${n===qi?'active':''}" href="${route(`quiz-${n+1}`)}" aria-label="Vraag ${n+1}" ${n===qi?'aria-current="step"':''}>${n+1}</a>`).join('')}</nav><div class="eyebrow"><span class="line"></span>${written?'IN JE EIGEN WOORDEN':escape(journey.quiz.mcEyebrow)}</div><h1>${written?'Wat heb jij ontdekt, Alex?':inline(journey.quiz.mcHeading)}</h1><p class="quiz-intro">${written?`Nu de ${numberWords[journey.written.length]} vragen in je eigen woorden. Schrijf wat je denkt en vergelijk daarna met het voorbeeldantwoord.`:`We beginnen met ${numberWords[mc]} meerkeuzevragen. Je mag altijd teruglezen. Er is geen klok.`}</p><section class="question-card" aria-labelledby="question-title"><div class="question-label">${written?escape(q.label):'KIES ÉÉN ANTWOORD'}</div><h2 id="question-title">${inline(q.q)}</h2>${written?writtenMarkup(q):`<div class="answer-options">${q.options.map((o,n)=>`<button class="answer-option ${answered&&n===q.answer?'correct':''} ${answered&&choice===n&&n!==q.answer?'incorrect':''}" data-answer="${n}" ${answered?'disabled':''}><span class="answer-letter" aria-hidden="true">${answered&&n===q.answer?'✓':answered&&choice===n?'↗':'ABCD'[n]}</span><span>${escape(o)}</span></button>`).join('')}</div>${answered?`<div class="feedback ${choice===q.answer?'':'warm'}" role="status"><strong>${choice===q.answer?'Goed ontdekt, Alex!':'Bijna! Dit is een mooie om te onthouden.'}</strong>${inline(q.explanation)}</div>`:''}`}</section><div class="quiz-bottom"><button class="text-button" data-action="readback" aria-expanded="${readback}">${readback?'Verberg de tekst ↑':'Even teruglezen ↗'}</button><span class="quiz-steps">${qi?`<a class="text-button" href="${route(`quiz-${qi}`)}">← Vorige</a>`:''}<button class="primary" data-action="next-question">${qi===count-1?'Bekijk je ontdekkingen':'Volgende vraag'} <span class="arrow" aria-hidden="true">→</span></button></span></div>${readback?readbackMarkup(q.chapter):''}<p class="quiz-note">${written?'Je eigen woorden zijn goed. Het hoeft niet precies hetzelfde te zijn.':'Van een fout antwoord leer je ook iets nieuws. — Papa Jeremy'}</p></div>`;
}
function writtenMarkup(q){const text=String(entry.written[writtenIndex()]||'');return `<label class="input-label" for="written-answer">Jouw antwoord, Alex</label><textarea class="answer-input" id="written-answer" placeholder="Ik denk dat…">${escape(text)}</textarea>${showingModel?`<div class="feedback model-answer" tabindex="-1"><strong>Een voorbeeldantwoord</strong><p>${inline(q.model)}</p></div>`:`<button class="text-button compare" data-action="show-model" ${text.trim()?'':'disabled'}>Vergelijk met een voorbeeldantwoord ↗</button>`}`;}
function readbackMarkup(i){return `<aside class="readback"><h3>${inline(journey.chapters[i].title)}</h3><p>${inline(paragraphs[i])}</p></aside>`;}
function completion(){
 const c=journey.completion,score=journey.questions.reduce((s,q,i)=>s+(entry.answers[i]===q.answer?1:0),0);
 main.innerHTML=`<section class="completion"><div><div class="eyebrow"><span class="line"></span>JOUW REIS IS COMPLEET</div><h1>${c.heading.map(line=>inline(line)).join('<br>')}</h1><p>${inline(c.text)}</p><div class="score-badge"><span aria-hidden="true">✳</span> ${score} van ${mcCount()} quizvragen goed · ${journey.written.length} eigen antwoorden</div><div class="personal-note">“Ik vind het heerlijk om samen met jou nieuwe dingen te ontdekken. Blijf lezen, blijf vragen stellen en blijf jezelf. Ik ben trots op je, Alex.”<small>Met liefde gemaakt, speciaal voor jou. — Papa Jeremy ♡</small></div><div class="completion-actions"><a class="primary" href="${route('reading')}">Lees het verhaal nog eens <span aria-hidden="true">↗</span></a><a class="text-button" href="${route(`quiz-${total()}`)}">← Terug naar de vragen</a><button class="text-button" data-action="reset">Antwoorden wissen en opnieuw beginnen ↻</button></div></div><div class="completion-art">${journey.art.completion()}<div class="location-tag">${escape(c.tag)}</div></div></section>`;
}
function fullReading(){main.innerHTML=`<article class="all-reading"><a class="text-button" href="${route('')}">← Terug naar jouw reis</a><p class="eyebrow">SPECIAAL VOOR ALEX · VAN PAPA JEREMY</p><h1>${inline(title)}</h1>${journey.chapters.map((c,i)=>`<section><h2>${i+1}. ${inline(c.title)}</h2><div class="story-text"><p>${inline(paragraphs[i])}</p></div></section>`).join('')}<a class="primary" href="${route('quiz-1')}">Naar de vragen <span aria-hidden="true">→</span></a></article>`;}
function journeyError(failed,error){
 journey=null;console.error(error);
 main.innerHTML=`<div class="loading"><h1>Deze leesreis staat nog niet klaar.</h1><p>De tekst van “${escape(failed.meta.title)}” kon niet worden geladen. Open de pagina via het lokale webadres en probeer het opnieuw.</p><button class="primary" onclick="location.reload()">Probeer opnieuw</button> <a class="text-button" href="#/">Alle leesreizen</a></div>`;
}

function renderSwitcher(){
 const label=journey?`Wissel van leesreis, nu: ${journey.name}`:'Kies een leesreis';
 switcher.innerHTML=`<button class="journey-toggle" id="journey-toggle" aria-expanded="false" aria-controls="journey-list" aria-label="${escape(label)}"><span class="journey-toggle-icon" aria-hidden="true">⌖</span><span class="journey-toggle-text" aria-hidden="true">${journey?escape(journey.name):'Kies een leesreis'}</span><span aria-hidden="true">▾</span></button><ul id="journey-list" class="journey-list" hidden>${journeys.map(j=>`<li><a href="#/${j.slug}" ${j===journey?'aria-current="page"':''}><small>LEESREIS ${escape(j.number)} · ${escape(j.name.toUpperCase())}</small>${inline(j.card.title)}</a></li>`).join('')}<li><a class="journey-all" href="#/">Alle leesreizen →</a></li></ul>`;
}
function setSwitcher(open){
 const toggle=switcher.querySelector('#journey-toggle'),list=switcher.querySelector('#journey-list');
 if(!toggle)return;toggle.setAttribute('aria-expanded',open);list.hidden=!open;
}
switcher.addEventListener('click',event=>{if(event.target.closest('#journey-toggle'))setSwitcher(switcher.querySelector('#journey-list').hidden);});
document.addEventListener('click',event=>{if(!switcher.contains(event.target))setSwitcher(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!switcher.querySelector('#journey-list')?.hidden){setSwitcher(false);switcher.querySelector('#journey-toggle').focus();}});

// Routes before multiple journeys existed all belonged to Taiwan.
const legacyRoutes={'#home':'','#reading':'reading','#quiz':'quiz-1','#quiz-10':'quiz-done','#quiz-done':'quiz-done'};
function legacyRoute(hash){
 if(Object.hasOwn(legacyRoutes,hash))return `#/taiwan${legacyRoutes[hash]?`/${legacyRoutes[hash]}`:''}`;
 const match=hash.match(/^#(chapter-[0-3]|quiz-[1-9])$/);
 return match?`#/taiwan/${match[1]}`:null;
}
function finish(){
 document.title=journey?`${journey.meta.title} · Alex’ leesavontuur`:'Alex’ leesavontuur';
 document.querySelector('meta[name="description"]').content=journey?journey.meta.description:'Persoonlijke Nederlandse leesreizen voor Alex, van papa Jeremy.';
 renderSwitcher();
 animateScene(main.querySelector('.hero-art, #chapter-art'),journey?.animate);
 focusMain();
}
async function navigate(){
 const hash=location.hash,ticket=++navigation;
 if(hash===''||hash==='#'||hash==='#/'){journey=null;landing();finish();return;}
 const legacy=legacyRoute(hash);if(legacy){location.replace(legacy);return;}
 const parts=hash.match(/^#\/([a-z0-9-]+)(?:\/(.+))?$/),next=parts&&journeys.find(j=>j.slug===parts[1]);
 if(!next){location.replace('#/');return;}
 try{await openJourney(next);}catch(error){if(ticket===navigation){journeyError(next,error);finish();}return;}
 if(ticket!==navigation)return;
 const view=parts[2]||'',chapterMatch=view.match(/^chapter-(\d)$/),quizMatch=view.match(/^quiz-(\d{1,2}|done)$/);
 if(!view)home();
 else if(chapterMatch&&Number(chapterMatch[1])<journey.chapters.length)chapter(Number(chapterMatch[1]));
 else if(quizMatch&&(quizMatch[1]==='done'||(Number(quizMatch[1])>=1&&Number(quizMatch[1])<=total()))){questionIndex=quizMatch[1]==='done'?total():Number(quizMatch[1])-1;showingModel=false;readback=false;quiz();}
 else if(view==='reading')fullReading();
 else{location.replace(route(''));return;}
 finish();
}

main.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.chapter!==undefined){location.hash=route(`chapter-${button.dataset.chapter}`);return;}
 if(button.dataset.word){document.querySelector('#word-help').innerHTML=`<b>${escape(button.dataset.word)}</b>${escape(journey.dictionary[button.dataset.word])}`;return;}
 if(button.dataset.variant){variants[currentChapter]=button.dataset.variant;document.querySelector('#chapter-art').innerHTML=chapterArt(currentChapter);main.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.variant===button.dataset.variant));return;}
 if(button.dataset.answer!==undefined){const qi=questionIndex;if(Number.isInteger(entry.answers[qi]))return;entry.answers[qi]=Number(button.dataset.answer);persist();quiz();document.querySelector('[data-action="next-question"]').focus({preventScroll:true});return;}
 switch(button.dataset.action){
  case 'read-next':location.hash=route(currentChapter===journey.chapters.length-1?'quiz-1':`chapter-${currentChapter+1}`);break;
  case 'show-model':if(!String(entry.written[writtenIndex()]||'').trim())return;showingModel=true;quiz();document.querySelector('.model-answer').focus({preventScroll:true});break;
  case 'next-question':location.hash=route(questionIndex===total()-1?'quiz-done':`quiz-${questionIndex+2}`);break;
  case 'readback':readback=!readback;quiz();document.querySelector('[data-action="readback"]').focus({preventScroll:true});break;
  case 'reset':if(!resetAnswers())return;if(location.hash===route('quiz-1'))navigate();else location.hash=route('quiz-1');break;
 }
});
main.addEventListener('input',event=>{
 if(event.target.id==='written-answer'){entry.written[writtenIndex()]=event.target.value;persist();const compare=document.querySelector('[data-action="show-model"]');if(compare)compare.disabled=!event.target.value.trim();}
});
applySettings();
window.addEventListener('hashchange',navigate);navigate();
