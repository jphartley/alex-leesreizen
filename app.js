import { mountains, teaArt, bobaArt } from './art.js';
import { animateMountains } from './motion.js';

const main = document.querySelector('#main');
const storageKey = 'alex-thee-avontuur-v1';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
const state = {
  answers: saved.answers && typeof saved.answers === 'object' ? saved.answers : {},
  written: saved.written && typeof saved.written === 'object' ? saved.written : {},
  calm: !!saved.calm, large: !!saved.large,
};
let paragraphs = [], currentChapter = 0, questionIndex = 0, flavor = 'classic';
let showingModel = false, readback = false;
const chapters = [
  { title:'Een eiland vol thee', short:'De bergen in', label:'TAIWAN · EEN BIJZONDER BEGIN', icon:'♧', aside:'Hoog in de mist', caption:'Hoge bergen, veel regen en koele mist. Een fijne plek voor een theeplant.', note:'DE REIS BEGINT', art:()=>mountains('chapter') },
  { title:'Het geheim van de blaadjes', short:'De smaak van thee', label:'ALISHAN & LISHAN · VAN BLAD TOT THEE', icon:'❧', aside:'Drie kleuren, één verhaal', caption:'Groene thee, oolongthee en zwarte thee. Let tijdens het lezen op de verschillen.', note:'KIJK EENS GOED', art:teaArt },
  { title:'Hallo, bubble tea!', short:'Tijd voor boba', label:'TAICHUNG · EEN BRUISEND IDEE', icon:'♙', aside:'Een drankje met een twist', caption:'Melkthee, ijs en… balletjes! Ontdek hoe een experiment een beroemd drankje werd.', note:'EEN NIEUW IDEE', art:()=>bobaArt() },
  { title:'Thee blijft verrassen', short:'Nieuwe ontdekkingen', label:'TAIWAN · EEN WERELD VOL SMAAK', icon:'✳', aside:'Wat wordt jouw favoriet?', caption:'De theewereld blijft nieuwe dingen bedenken. Tik hieronder en ontdek de illustraties.', note:'BLIJF NIEUWSGIERIG', art:()=>bobaArt(flavor) },
];
const dictionary = {
  immigranten:'Mensen die vanuit een ander land naar een land verhuizen om daar te wonen.',
  klimaat:'Het weer dat meestal in een gebied voorkomt, over een lange periode.',
  geconcentreerde:'Hier: een volle smaak, doordat er veel smaak in het blaadje zit.',
  revolutionairs:'Iets heel nieuws dat veel verandert.',
  tapioca:'Een ingrediënt gemaakt van de cassavewortel. Hiervan worden de taaie balletjes gemaakt.',
  rage:'Iets dat in korte tijd heel populair wordt.',
  innoveren:'Nieuwe ideeën bedenken en gebruiken om iets te vernieuwen.',
  fotogenieke:'Dingen die er mooi uitzien op een foto.',
};
let writtenQuestions = [];
const models = [
  'Oolongthee zit qua bewerking en smaak tussen groene en zwarte thee in. In Alishan en Lishan is het hoog in de bergen koud. Daardoor groeien de blaadjes langzaam en krijgen ze een geconcentreerde, zachte en zoete smaak.',
  'De balletjes worden traditioneel gemaakt van tapioca. Tapioca wordt gemaakt van de cassavewortel.',
  'Innoveren betekent hier: nieuwe ideeën bedenken en gebruiken om thee en theedrankjes te vernieuwen, bijvoorbeeld met fruit of kaasschuim.',
];
const questions = [
  { q:'Hoe kwamen de eerste theestruiken volgens de tekst naar Taiwan?', options:['Ze groeiden vanzelf op de hoogste bergen.','Immigranten namen ze mee vanuit China.','Een theehuis in Taichung bedacht ze.','Ze werden vanuit Europa gebracht.'], answer:1, chapter:0, explanation:'Immigranten brachten ruim tweehonderd jaar geleden theestruiken vanuit het vasteland van China naar Taiwan.' },
  { q:'Waarom is Taiwan volgens de tekst zo geschikt voor theeplanten?', options:['Er is veel zon en het regent er nooit.','Het eiland is helemaal vlak.','Er zijn hoge bergen, veel regen en koele mist.','Het is overal op het eiland erg warm.'], answer:2, chapter:0, explanation:'De tekst noemt juist deze combinatie: hoge bergen, veel regen en een koele mist. Samen zorgen ze voor een ideaal klimaat.' },
  { q:'Welk rijtje past bij wat je las over de blaadjes in Alishan en Lishan?', options:['Koud → langzaam groeien → zacht en zoet.','Koud → snel groeien → bitter en donker.','Warm → langzaam groeien → zout en fris.','Warm → snel groeien → zacht en zoet.'], answer:0, chapter:1, explanation:'Dit is een oorzaak en een gevolg: door de kou groeien de blaadjes langzaam. Dat zorgt voor de zachte en zoete smaak.' },
  { q:'Welke thee wordt volgens de tekst rondom het Zonnemaanmeer verbouwd?', options:['Alleen groene thee.','Alleen oolongthee.','Thee met kaasschuim.','Uitstekende zwarte thee.'], answer:3, chapter:1, explanation:'Rondom het lager gelegen Zonnemaanmeer wordt uitstekende zwarte thee verbouwd. De beroemde oolong komt juist uit hoge berggebieden.' },
  { q:'Wat gebeurde er in de jaren tachtig in een theehuis in Taichung?', options:['De eerste theeplanten kwamen naar Taiwan.','Iemand voegde tapiocaballetjes toe aan ijskoude melkthee.','De theeplanten stopten met groeien.','Cold brew werd over de hele wereld verboden.'], answer:1, chapter:2, explanation:'In Taichung schudde men ijskoude melkthee en voegde zoete, taaie tapiocaballetjes toe. Zo beschrijft de tekst het ontstaan van bubble tea.' },
  { q:'Wat betekent ‘een wereldwijde rage’ in de tekst?', options:['Iets dat maar in één dorp bekend is.','Een oud recept dat niemand meer gebruikt.','Iets dat over de hele wereld heel populair is.','Een wedstrijd voor de beste theemaker.'], answer:2, chapter:3, explanation:'Een rage is iets dat heel populair wordt. ‘Wereldwijd’ vertelt je dat het in allerlei landen populair is geworden.' },
  { q:'Wat is de belangrijkste boodschap van het hele verhaal?', options:['Taiwan heeft een rijke theecultuur die zich blijft vernieuwen.','Alle thee in Taiwan smaakt precies hetzelfde.','Bubble tea is de enige thee die in Taiwan wordt gedronken.','Thee kan alleen als warme drank worden gedronken.'], answer:0, chapter:3, explanation:'Het verhaal gaat van traditionele bergthee naar bubble tea en nieuwe creaties. De theecultuur heeft dus een lange geschiedenis én blijft veranderen.' },
];
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(text, vocab=false) {
  let result = escape(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
  if (vocab) for (const word of Object.keys(dictionary)) result = result.replace(new RegExp(`\\b${word}\\b`, 'g'), `<button class="vocab" data-word="${word}" aria-label="Wat betekent ${word}?">${word}</button>`);
  return result;
}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}}
function announce(text){document.querySelector('#announcement').textContent=text;}
function focusMain(){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function applySettings(){
  document.body.classList.toggle('calm',state.calm);document.body.classList.toggle('large-text',state.large);
  document.querySelector('#calm-toggle').setAttribute('aria-pressed',state.calm);
  document.querySelector('#calm-notice').hidden=!state.calm;
  document.querySelector('#font-toggle').setAttribute('aria-pressed',state.large);
  document.querySelector('#font-toggle').setAttribute('aria-label',state.large?'Normale letters':'Grotere letters');
}
document.querySelector('#calm-toggle').onclick=()=>{state.calm=!state.calm;persist();applySettings();announce(state.calm?'Rustige leesstand aan. De illustraties zijn verborgen en de animaties staan stil.':'Rustige leesstand uit.');};
document.querySelector('#calm-disable').onclick=()=>document.querySelector('#calm-toggle').click();
document.querySelector('#font-toggle').onclick=()=>{state.large=!state.large;persist();applySettings();};
function writtenQuestionIndex(){return questionIndex-questions.length;}
function hasAnswers(){return Object.keys(state.answers).length>0||Object.values(state.written).some(t=>String(t).trim());}
function resetAnswers(){
 if(!confirm('Weet je het zeker? Al je antwoorden worden gewist.'))return false;
 state.answers={};state.written={};persist();announce('Je antwoorden zijn gewist.');return true;
}
function home(){
 main.innerHTML=`<div class="home"><section class="hero"><div class="hero-copy"><div class="travel-label"><span></span> LEESREIS 01 · TAIWAN</div><p class="greeting">Hé Alex, ga je mee?</p><h1><span class="title-line">Van bergtop</span><span class="title-line">tot <em>bubble tea.</em></span></h1><p class="hero-description">Een eiland in de mist. Bijzondere theeblaadjes. En een drankje vol verrassingen. Ontdek de magie van Taiwanese thee.</p><a class="primary" href="#chapter-0">Begin je thee-avontuur <span class="arrow" aria-hidden="true">↗</span></a><div class="hero-meta"><span>4 korte hoofdstukken</span><span>10 vragen</span><span>Op jouw tempo</span></div><div class="dedication"><span class="heart" aria-hidden="true">♡</span><span>Speciaal voor Alex, gemaakt door <strong>papa Jeremy</strong></span></div></div><div class="hero-art">${mountains('hero')}<div class="location-tag"><span aria-hidden="true">⌖</span> ALISHAN, TAIWAN</div><div class="stamp">ONTDEK<b>Taiwan</b>LEES & REIS</div><div class="illustration-caption">Waar jouw thee-avontuur begint.</div></div></section><section class="route" aria-label="Kies een hoofdstuk"><div class="section-heading"><h2>Jouw route door Taiwan</h2><a class="text-button" href="#quiz-1">Naar de vragen ↗</a></div><div class="chapter-grid">${chapters.map((c,i)=>`<button class="chapter-card" data-chapter="${i}"><span class="chapter-icon" aria-hidden="true">${c.icon}</span><span><small>HOOFDSTUK 0${i+1}</small><strong>${c.short}</strong></span><span class="card-arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section><div class="home-note"><span aria-hidden="true">❧</span> Geen haast, Alex. De mooiste ontdekkingen doe je op je eigen tempo. <a href="#reading">Alles rustig lezen →</a></div>${hasAnswers()?'<button class="text-button reset-link" data-action="reset">Antwoorden wissen en opnieuw beginnen</button>':''}</div>`;
}
function chapter(i){
 currentChapter=i;const c=chapters[i];
 main.innerHTML=`<div class="reader"><div class="reader-top"><a class="text-button" href="#home">← Jouw reis</a><nav class="chapter-nav" aria-label="Hoofdstukken">${chapters.map((ch,n)=>`${n?'<span class="nav-connector" aria-hidden="true"></span>':''}<button class="chapter-dot ${n===i?'active':''}" data-chapter="${n}" aria-label="Hoofdstuk ${n+1}: ${ch.title}" ${n===i?'aria-current="step"':''}>${n+1}</button>`).join('')}<span class="nav-connector" aria-hidden="true"></span><a class="text-button" href="#quiz-1">Quiz ↗</a></nav></div><div class="reader-layout"><article class="story-panel"><div class="eyebrow"><span class="line"></span>${c.label}</div><h1>${c.title}</h1><div class="story-text"><p>${inline(paragraphs[i],true)}</p></div><div id="word-help" class="word-help" role="status"></div><div class="story-bottom"><span class="reading-hint">${i===0?'Tip van papa: tik op een groen woord voor de betekenis.':'Lees gerust nog een keer. Jij bepaalt het tempo.'}</span><button class="primary" data-action="read-next">${i===3?'Gelezen! Naar de vragen':'Gelezen! Verder'} <span class="arrow" aria-hidden="true">→</span></button></div>${i?`<button class="text-button" data-chapter="${i-1}">← Vorig hoofdstuk</button>`:''}</article><aside class="reader-aside"><div class="reader-art" id="chapter-art">${c.art()}</div><div class="aside-caption"><div class="eyebrow">${c.note}</div><h2>${c.aside}</h2><p>${c.caption}</p>${i===3?`<div class="discovery" role="group" aria-label="Kies een illustratie"><button class="flavor-button" data-flavor="classic" aria-pressed="${flavor==='classic'}">Boba</button><button class="flavor-button" data-flavor="fruit" aria-pressed="${flavor==='fruit'}">Fruitthee</button><button class="flavor-button" data-flavor="cheese" aria-pressed="${flavor==='cheese'}">Kaasthee</button></div>`:''}</div></aside></div></div>`;
}
function quiz(){
 if(questionIndex>=10){completion();return;}
 const written=questionIndex>=questions.length, qi=questionIndex, q=written?null:questions[qi];
 const answered=!written&&Number.isInteger(state.answers[qi]), choice=state.answers[qi];
 main.innerHTML=`<div class="quiz-shell"><div class="quiz-topline"><a class="text-button" href="#home">← Jouw reis</a><span class="quiz-kicker">VRAAG ${questionIndex+1} VAN 10</span></div><nav class="question-nav" aria-label="Vragen">${Array.from({length:10},(_,n)=>`<a class="chapter-dot ${n===qi?'active':''}" href="#quiz-${n+1}" aria-label="Vraag ${n+1}" ${n===qi?'aria-current="step"':''}>${n+1}</a>`).join('')}</nav><div class="eyebrow"><span class="line"></span>${written?'IN JE EIGEN WOORDEN':'JOUW THEEKENNIS'}</div><h1>${written?'Wat heb jij ontdekt, Alex?':'Tijd voor de theequiz, Alex.'}</h1><p class="quiz-intro">${written?'Nu de drie vragen in je eigen woorden. Schrijf wat je denkt en vergelijk daarna met het voorbeeldantwoord.':'We beginnen met zeven meerkeuzevragen. Je mag altijd teruglezen. Er is geen klok.'}</p><section class="question-card" aria-labelledby="question-title"><div class="question-label">${written?(writtenQuestionIndex()===2?'WOORDENSCHAT':'TEKSTBEGRIP & ANALYSE'):'KIES ÉÉN ANTWOORD'}</div><h2 id="question-title">${written?inline(writtenQuestions[writtenQuestionIndex()]):escape(q.q)}</h2>${written?writtenMarkup():`<div class="answer-options">${q.options.map((o,n)=>`<button class="answer-option ${answered&&n===q.answer?'correct':''} ${answered&&choice===n&&n!==q.answer?'incorrect':''}" data-answer="${n}" ${answered?'disabled':''}><span class="answer-letter" aria-hidden="true">${answered&&n===q.answer?'✓':answered&&choice===n?'↗':'ABCD'[n]}</span><span>${escape(o)}</span></button>`).join('')}</div>${answered?`<div class="feedback ${choice===q.answer?'':'warm'}" role="status"><strong>${choice===q.answer?'Goed ontdekt, Alex!':'Bijna! Dit is een mooie om te onthouden.'}</strong>${q.explanation}</div>`:''}`}</section><div class="quiz-bottom"><button class="text-button" data-action="readback" aria-expanded="${readback}">${readback?'Verberg de tekst ↑':'Even teruglezen ↗'}</button><span class="quiz-steps">${qi?`<a class="text-button" href="#quiz-${qi}">← Vorige</a>`:''}<button class="primary" data-action="next-question">${qi===9?'Bekijk je ontdekkingen':'Volgende vraag'} <span class="arrow" aria-hidden="true">→</span></button></span></div>${readback?readbackMarkup(written?[1,2,3][writtenQuestionIndex()]:q.chapter):''}<p class="quiz-note">${written?'Je eigen woorden zijn goed. Het hoeft niet precies hetzelfde te zijn.':'Van een fout antwoord leer je ook iets nieuws. — Papa Jeremy'}</p></div>`;
}
function writtenMarkup(){return `<label class="input-label" for="written-answer">Jouw antwoord, Alex</label><textarea class="answer-input" id="written-answer" placeholder="Ik denk dat…" >${escape(state.written[writtenQuestionIndex()]||'')}</textarea>${showingModel?`<div class="feedback model-answer" tabindex="-1"><strong>Een voorbeeldantwoord</strong><p>${models[writtenQuestionIndex()]}</p></div>`:`<button class="text-button compare" data-action="show-model" ${String(state.written[writtenQuestionIndex()]||'').trim()?'':'disabled'}>Vergelijk met een voorbeeldantwoord ↗</button>`}`;}
function readbackMarkup(i){return `<aside class="readback"><h3>${chapters[i].title}</h3><p>${inline(paragraphs[i])}</p></aside>`;}
function completion(){
 const score=questions.reduce((s,q,i)=>s+(state.answers[i]===q.answer?1:0),0);
 main.innerHTML=`<section class="completion"><div><div class="eyebrow"><span class="line"></span>JOUW REIS IS COMPLEET</div><h1>Goed gedaan,<br><em>thee-ontdekker Alex.</em></h1><p>Van de mistige bergen tot de laatste tapiocaparel: jij hebt Taiwan een beetje beter leren kennen. Deze bubble tea is voor jou!</p><div class="score-badge"><span aria-hidden="true">✳</span> ${score} van 7 quizvragen goed · 3 eigen antwoorden</div><div class="personal-note">“Ik vind het heerlijk om samen met jou nieuwe dingen te ontdekken. Blijf lezen, blijf vragen stellen en blijf jezelf. Ik ben trots op je, Alex.”<small>Met liefde gemaakt, speciaal voor jou. — Papa Jeremy ♡</small></div><div class="completion-actions"><a class="primary" href="#reading">Lees het verhaal nog eens <span aria-hidden="true">↗</span></a><a class="text-button" href="#quiz-10">← Terug naar de vragen</a><button class="text-button" data-action="reset">Antwoorden wissen en opnieuw beginnen ↻</button></div></div><div class="completion-art">${bobaArt()}<div class="location-tag">VOOR ALEX · VAN PAPA JEREMY ♡</div></div></section>`;
}
function fullReading(){main.innerHTML=`<article class="all-reading"><a class="text-button" href="#home">← Terug naar jouw reis</a><p class="eyebrow">SPECIAAL VOOR ALEX · VAN PAPA JEREMY</p><h1>De Magie van Taiwanese Thee: Van Bergtop tot Bubble Tea</h1>${chapters.map((c,i)=>`<section><h2>${i+1}. ${c.title}</h2><div class="story-text"><p>${inline(paragraphs[i])}</p></div></section>`).join('')}<a class="primary" href="#quiz">Naar de vragen <span aria-hidden="true">→</span></a></article>`;}
function navigate(){
 const route=location.hash;
 if(/^#chapter-[0-3]$/.test(route))chapter(Number(route.at(-1)));
 else if(route==='#quiz'){location.replace('#quiz-1');return;}
 else if(/^#quiz-([1-9]|10|done)$/.test(route)){const n=route.slice(6);questionIndex=n==='done'?10:Number(n)-1;showingModel=false;readback=false;quiz();}
 else if(route==='#reading')fullReading();
 else home();
 animateMountains(main.querySelector('.hero-art, #chapter-art'));
 focusMain();
}
main.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.chapter!==undefined){location.hash=`chapter-${button.dataset.chapter}`;return;}
 if(button.dataset.word){document.querySelector('#word-help').innerHTML=`<b>${escape(button.dataset.word)}</b>${dictionary[button.dataset.word]}`;return;}
 if(button.dataset.flavor){flavor=button.dataset.flavor;document.querySelector('#chapter-art').innerHTML=bobaArt(flavor);main.querySelectorAll('[data-flavor]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.flavor===flavor));return;}
 if(button.dataset.answer!==undefined){const qi=questionIndex;if(Number.isInteger(state.answers[qi]))return;state.answers[qi]=Number(button.dataset.answer);persist();quiz();document.querySelector('[data-action="next-question"]').focus({preventScroll:true});return;}
 switch(button.dataset.action){
  case 'read-next':location.hash=currentChapter===3?'quiz-1':`chapter-${currentChapter+1}`;break;
  case 'show-model':if(!String(state.written[writtenQuestionIndex()]||'').trim())return;showingModel=true;quiz();document.querySelector('.model-answer').focus({preventScroll:true});break;
  case 'next-question':location.hash=questionIndex===9?'quiz-done':`quiz-${questionIndex+2}`;break;
  case 'readback':readback=!readback;quiz();document.querySelector('[data-action="readback"]').focus({preventScroll:true});break;
  case 'reset':if(!resetAnswers())return;if(location.hash==='#quiz-1')navigate();else location.hash='quiz-1';break;
 }
});
main.addEventListener('input',event=>{
 if(event.target.id==='written-answer'){state.written[writtenQuestionIndex()]=event.target.value;persist();const compare=document.querySelector('[data-action="show-model"]');if(compare)compare.disabled=!event.target.value.trim();}
});
applySettings();
try{
 const response=await fetch('09-26-alex-reading.md');if(!response.ok)throw new Error('Bronbestand niet gevonden');
 const markdown=await response.text();
 paragraphs=markdown.split('## Begripsvragen')[0].split(/\n\s*\n/).map(p=>p.trim()).filter(p=>p&&!p.startsWith('#')&&p!=='Antwoordsleutel');
 writtenQuestions=[...markdown.matchAll(/^\d+\. (.+)$/gm)].map(m=>m[1]);
 if(paragraphs.length!==4||writtenQuestions.length!==3)throw new Error('De indeling van de leestekst is veranderd');
 // Ignore invalid answer indexes if saved browser data has been edited.
 for(const key of Object.keys(state.answers)){if(!questions[key]||!Number.isInteger(state.answers[key])||state.answers[key]<0||state.answers[key]>3)delete state.answers[key];}
 window.addEventListener('hashchange',navigate);navigate();
}catch(error){main.innerHTML='<div class="loading"><h1>De thee staat nog niet klaar.</h1><p>De leestekst kon niet worden geladen. Controleer of het Markdown-bestand naast de pagina staat en open de pagina via het lokale webadres.</p><button class="primary" onclick="location.reload()">Probeer opnieuw</button></div>';console.error(error);}
