// Smaken uit het verleden: how Dutch, Chinese and Japanese rule shaped Taiwanese food.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'smaken-verleden',
  name: 'Smaken uit het verleden',
  number: '02',
  meta: { title: 'Smaken uit het verleden', description: 'Hoe de geschiedenis van Taiwan op je bord terechtkwam. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Smaken uit het *verleden*', blurb: 'Forten, treinen en avondmarkten. Proef hoe Nederland, China en Japan het eten in Taiwan veranderden.' },
  home: {
    label: 'LEESREIS 02 · TAIWAN', greeting: 'Hé Alex, heb je al trek?', heading: ['Smaken uit', 'het *verleden.*'],
    description: 'Nederlandse forten, Chinese kookkunsten en Japanse lunchboxen. Ontdek hoe de geschiedenis van Taiwan op je bord terechtkwam.',
    cta: 'Begin je smaakreis', location: 'TAINAN, TAIWAN', stamp: ['PROEF', 'Taiwan', 'LEES & EET'],
    caption: 'Waar schepen nieuwe smaken brachten.', routeHeading: 'Jouw route door de geschiedenis',
  },
  chapters: [
    { title:'Forten, runderen en dumplings', short:'Nieuwe smaken', label:'TAINAN · DE ZEVENTIENDE EEUW', icon:'♜', aside:'Schepen aan de horizon', caption:'Handelsschepen, een stevig fort en velden vol suikerriet. Zo begon de mix van smaken.', note:'DE REIS BEGINT' },
    { title:'Een moderne modelkolonie', short:'De Japanse tijd', label:'TAIWAN · 1895 TOT 1945', icon:'✦', aside:'Nieuwe sporen door het land', caption:'Treinen, ziekenhuizen en een nieuwe eetcultuur. Let op wat Japan allemaal bouwde.', note:'KIJK EENS GOED' },
    { title:'Lunch in de trein', short:'De biàndang', label:'BIÀNDANG · VAN BENTO TOT LUNCHBOX', icon:'❖', aside:'Alles netjes op een rij', caption:'Rijst, groenten en een stukje vis in een houten doosje. Handig voor onderweg!', note:'EET SMAKELIJK' },
    { title:'Proeven op de avondmarkt', short:'De avondmarkt', label:'AVONDMARKT · EEN MIX VAN SMAKEN', icon:'✺', aside:'Wat kies jij?', caption:'Lampjes, kraampjes en lekkere luchtjes. Tik hieronder en ontdek wat er te koop is.', note:'BLIJF NIEUWSGIERIG', variants:[{ id:'tianbula', label:'Tianbula' }, { id:'mochi', label:'Mochi' }] },
  ],
  dictionary: {
    overheersers:'Mensen of landen die de baas worden over een ander land, vaak zonder dat de bewoners dat willen.',
    forten:'Stevige, verdedigde gebouwen met dikke muren, om een plek te beschermen.',
    suikerriet:'Een hoge plant met dikke stengels waar suiker uit wordt gemaakt.',
    kolonie:'Een gebied dat bestuurd wordt door een ander, vaak ver weg gelegen land.',
    introduceerden:'Ze brachten iets nieuws mee en lieten het aan anderen kennen.',
    overblijfsel:'Iets dat is overgebleven uit een vroegere tijd.',
    bouillon:'Een warme, hartige soep of vloeistof waarin iets gekookt wordt.',
    inheemse:'Van oorsprong uit dat land zelf, er al van oudsher.',
  },
  questions: [
    { q:'Wat brachten de Nederlanders volgens de tekst naar Taiwan?', options:['Sushi, sashimi en misosoep.','Runderen, suikerriet en nieuwe koolsoorten.','Sojasaus en gestoomde dumplings.','Houten lunchboxen voor in de trein.'], answer:1, chapter:0, explanation:'De Nederlanders van de VOC brachten runderen, suikerriet en nieuwe koolsoorten naar het eiland. Sojasaus en dumplings kwamen later met de leiders uit China.' },
    { q:'Waar bouwden de Nederlanders hun forten?', options:['In de hoofdstad Taipei.','Op de hoogste bergtoppen.','In de zuidelijke stad Tainan.','Op een eilandje bij Japan.'], answer:2, chapter:0, explanation:'In de zeventiende eeuw bouwde de VOC forten in Tainan, een stad in het zuiden van Taiwan.' },
    { q:'Hoe lang regeerden de Japanners Taiwan als kolonie?', options:['Vijftig jaar, van 1895 tot 1945.','Tien jaar, van 1935 tot 1945.','Honderd jaar, van 1845 tot 1945.','Twee eeuwen lang.'], answer:0, chapter:1, explanation:'De tekst noemt de jaren 1895 tot 1945. Dat is precies vijftig jaar.' },
    { q:'Wat bedoelt de tekst met een ‘modelkolonie’?', options:['Een kolonie waar alleen fotomodellen wonen.','Een klein speelgoedeiland.','Een land dat nooit iets verandert.','Een moderne kolonie die als voorbeeld moest dienen.'], answer:3, chapter:1, explanation:'Een model is hier een voorbeeld. Japan wilde laten zien hoe modern Taiwan kon worden, met spoorwegen en ziekenhuizen.' },
    { q:'Waardoor maakten de Taiwanezen opeens kennis met sushi en misosoep?', options:['Doordat ze op vakantie gingen naar Japan.','Doordat Japan het eiland regeerde en zijn eigen eetcultuur meebracht.','Doordat de Nederlanders sushi hadden meegenomen.','Doordat iemand het op een avondmarkt had bedacht.'], answer:1, chapter:2, explanation:'Dit is oorzaak en gevolg: Japan regeerde Taiwan en introduceerde zijn eigen eetcultuur. Daardoor leerden de Taiwanezen Japanse gerechten kennen.' },
    { q:'Wat is tianbula volgens de tekst?', options:['Viskoekjes in een hartige bouillon.','Zachte deegballetjes met een zoete vulling.','Rauwe vis op een klein bordje.','Een houten lunchbox met rijst.'], answer:0, chapter:3, explanation:'Op de avondmarkt verkopen ze tianbula: viskoekjes in een hartige bouillon. De naam komt van het Japanse woord tempura.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Japanse gerechten zijn lekkerder dan Chinese gerechten.','In Taiwan eet je alleen op avondmarkten.','In het eten van Taiwan kun je de geschiedenis van het eiland proeven.','De Nederlanders hebben het Taiwanese eten uitgevonden.'], answer:2, chapter:3, explanation:'De tekst laat zien dat Nederlanders, Chinezen en Japanners allemaal iets meebrachten. Het Taiwanese eten is daardoor een mix waarin je de geschiedenis proeft.' },
  ],
  written: [
    { q:'Welke drie verschillende culturen (of landen) hebben volgens de tekst invloed gehad op het eten in Taiwan? Noem bij elke cultuur minimaal één product of gerecht dat zij hebben meegebracht.', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'De Nederlanders brachten onder andere runderen, suikerriet en nieuwe koolsoorten. De leiders uit China brachten Chinese kookkunsten mee, zoals wokken, sojasaus, noedelsoepen en dumplings. De Japanners brachten gerechten zoals sushi, sashimi, misosoep en de biàndang.' },
    { q:'Waarom werd de biàndang (lunchbox) juist in de Japanse periode zo populair in Taiwan? (Kijk naar wat de Japanners nog meer bouwden).', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'De Japanners legden overal spoorwegen aan. De biàndang was speciaal bedacht voor de passagiers in de nieuwe treinen. Zo konden mensen onderweg makkelijk een lekkere lunch eten.' },
  ],
  quiz: { mcEyebrow: 'JOUW SMAAKKENNIS', mcHeading: 'Tijd voor de smaakquiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*smaakdetective Alex.*'],
    text: 'Van Nederlandse forten tot kleverige mochi: jij weet nu dat je in Taiwan de geschiedenis kunt proeven. Deze mochi is voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
