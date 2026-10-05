// De stad zonder regels: Kowloon Walled City, the lawless maze in Hong Kong that inspired cyberpunk.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'kowloon-opus5-5-xhigh',
  name: 'De stad zonder regels',
  number: '09',
  meta: { title: 'De stad zonder regels', description: 'Een reis door Kowloon Walled City, het donkere doolhof in Hongkong dat cyberpunk inspireerde. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'De stad *zonder regels*', blurb: 'Huizen op huizen, flikkerend neon en steegjes waar de zon nooit kwam. Ontdek de stad die films en games inspireerde.' },
  home: {
    label: 'LEESREIS 09 · HONGKONG', greeting: 'Hé Alex, pak je zaklamp maar.', heading: ['De stad', 'zonder *regels.*'],
    description: 'Een vergeten fort, duizenden buren en steegjes vol neonlicht. Ontdek hoe een piepklein stukje Hongkong een doolhof werd dat nog altijd voortleeft in films en games.',
    cta: 'Stap het doolhof in', location: 'KOWLOON, HONGKONG', stamp: ['DOOLHOF', 'Kowloon', 'LEES & ZOEK'],
    caption: 'Waar vliegtuigen bijna de antennes raakten.', routeHeading: 'Jouw route door het doolhof',
  },
  chapters: [
    { title:'Waar de zon nooit de grond raakte', short:'Een echte stad', label:'KOWLOON · MIDDEN IN HONGKONG', icon:'▦', aside:'Een stad als een bijenkorf', caption:'Duizenden ramen, een bos van antennes en wapperend wasgoed. Vlak naast de stad lag een vliegveld: let maar eens op!', note:'DE REIS BEGINT' },
    { title:'Een vergeten stukje land', short:'Het vergeten fort', label:'VAN FORT TOT WOONTOREN', icon:'⌂', aside:'Zo groeide de stad', caption:'Eerst een fort, toen steeds meer huisjes en daarna huizen bovenop huizen. Tik hieronder en kijk hoe de stad groeide.', note:'KIJK EENS GOED', variants:[{ id:'fort', label:'Het fort' }, { id:'huizen', label:'Steeds meer huizen' }, { id:'stad', label:'50.000 mensen' }] },
    { title:'Een doolhof vol draden', short:'Binnen in het doolhof', label:'DE STEEGJES · ALTIJD SCHEMER', icon:'≋', aside:'Wie woont en werkt hier?', caption:'Kabels, druppels en flikkerend neon. Tik hieronder en kijk achter de deurtjes in het steegje.', note:'LOOP MAAR MEE', variants:[{ id:'tandarts', label:'Tandarts' }, { id:'noedels', label:'Noedels' }, { id:'buren', label:'Buren' }] },
    { title:'De ultieme Cyberpunk-stad', short:'De cyberpunk-stad', label:'CYBERPUNK · HIGH TECH, LOW LIFE', icon:'◈', aside:'Een stad uit de toekomst', caption:'Boven glimmende torens, vliegende auto’s en een zwevende vis van licht. Beneden rommelige huisjes vol neon. Zo stellen games de toekomst voor.', note:'STAP IN DE GAME' },
    { title:'Van doolhof tot stadspark', short:'Het rustige park', label:'KOWLOON WALLED CITY PARK · NU', icon:'❀', aside:'Kijk eens in het water', caption:'Waar vroeger het doolhof stond, zwemmen nu vissen in een vijver. Maar kijk eens goed naar de weerspiegeling…', note:'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    werkelijkheid:'Wat echt bestaat of echt gebeurt, dus niet verzonnen.',
    verantwoordelijk:'Als je ergens verantwoordelijk voor bent, moet jij ervoor zorgen dat het goed gaat.',
    dichtstbevolkte:'De plek waar de meeste mensen op het kleinste stukje grond wonen.',
    wirwarren:'Grote, rommelige knopen van draden of lijnen die door elkaar lopen.',
    onbevoegde:'Mensen die een beroep uitoefenen zonder de opleiding of toestemming die daarvoor nodig is.',
    maffia:'Een groep criminelen die stiekem de baas wil spelen en zich niet aan de wet houdt.',
    hechte:'Sterk met elkaar verbonden, zoals mensen die veel om elkaar geven en elkaar helpen.',
    inspiratiebron:'Iets waar mensen nieuwe ideeën door krijgen.',
    geavanceerde:'Heel modern, slim bedacht en ver ontwikkeld.',
    virtuele:'Niet echt, maar gemaakt op een computer, zoals de wereld in een game.',
  },
  questions: [
    { q:'Wat was Kowloon Walled City volgens het begin van de tekst?', options:['Een stad die alleen in een film bestond.','Een groot eiland voor de kust van China.','Een echte stad op een piepklein stukje land midden in Hongkong.','Een nieuwe wijk met veel politie en strenge regels.'], answer:2, chapter:0, explanation:'De tekst zegt: “Dit was geen film, maar werkelijkheid.” Kowloon Walled City was een echt, piepklein stukje land midden in Hongkong.' },
    { q:'Waardoor was Kowloon Walled City de dichtstbevolkte plek op aarde?', options:['Er woonden 50.000 mensen op een stukje land zo groot als een paar voetbalvelden.','Er stonden de hoogste wolkenkrabbers van heel Hongkong.','Er kwamen elke dag 50.000 toeristen op bezoek.','Er woonden 50 soldaten samen in één klein fort.'], answer:0, chapter:1, explanation:'Dit is oorzaak en gevolg: er woonden maar liefst 50.000 mensen op een oppervlakte zo groot als een paar voetbalvelden. Daardoor was het de dichtstbevolkte plek op aarde.' },
    { q:'De tekst noemt de stad vanbinnen ‘een doolhof van vochtige, donkere steegjes’. Wat betekent dat hier?', options:['Er was een speeltuin met een doolhof van heggen.','De steegjes waren breed en recht, zodat je ver kon kijken.','Je moest een kaartje kopen om naar binnen te mogen.','Er liepen zoveel smalle, kronkelige steegjes door elkaar dat je makkelijk kon verdwalen.'], answer:3, chapter:2, explanation:'Een doolhof is een plek met veel paden waar je makkelijk de weg kwijtraakt. Zo waren de smalle, donkere steegjes van de Walled City ook.' },
    { q:'In de steegjes was het vochtig en donker, en de maffia had veel macht. Wat vertelt de tekst daarna, met het woordje ‘Toch’?', options:['Dat iedereen er zo snel mogelijk weg wilde.','Dat de bewoners een hechte gemeenschap waren en elkaar hielpen overleven.','Dat de maffia ervoor zorgde dat er overal licht kwam.','Dat de bewoners nooit met elkaar praatten.'], answer:1, chapter:2, explanation:'Met ‘Toch’ laat de tekst een andere kant zien: ondanks alle problemen was het een hechte gemeenschap waar bewoners elkaar hielpen overleven.' },
    { q:'Cyberpunk draait om ‘high tech, low life’. Wat bedoelt de tekst daarmee?', options:['Hoge wolkenkrabbers voor rijke mensen en lage, gezellige huisjes op het platteland.','Een wereld zonder computers, waarin iedereen weer rustig leeft zoals vroeger.','Slimme, moderne technologie, terwijl gewone mensen in donkere, overvolle steden leven.','Een toekomst waarin robots al het werk doen en mensen nooit meer naar buiten gaan.'], answer:2, chapter:3, explanation:'High tech betekent geavanceerde technologie. Low life betekent dat gewone mensen in donkere, rommelige en overvolle megasteden leven. Allebei tegelijk: dat is cyberpunk.' },
    { q:'Wat gebeurde er in 1993 met Kowloon Walled City?', options:['De stad werd nog twee keer zo hoog gebouwd.','Er kwam eindelijk een politiebureau in het midden.','De stad werd een filmset voor The Matrix.','De stad werd afgebroken en veranderd in een rustig stadspark.'], answer:3, chapter:4, explanation:'In 1993 werd de Walled City afgebroken. Op die plek ligt nu een rustig stadspark.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Tandartsen in Hongkong hadden vroeger geen opleiding nodig.','Een overvolle stad zonder regels bestaat niet meer, maar leeft voort als grote inspiratie voor cyberpunk.','Cyberpunk-games zijn bedacht door de bewoners van Kowloon.','In Hongkong mag je je huis bouwen waar je maar wilt.'], answer:1, chapter:4, explanation:'De tekst vertelt hoe Kowloon Walled City ontstond en hoe het daar was. De stad is afgebroken, maar in films en games over cyberpunk leeft het doolhof nog altijd voort.' },
  ],
  written: [
    { q:'Waarom golden er in Kowloon Walled City eigenlijk geen wetten en regels?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Toen de Britten de rest van Hongkong gingen besturen, werd dit stukje land ‘vergeten’. China en Groot-Brittannië voelden zich allebei niet verantwoordelijk. Niemand zorgde er dus voor wetten of politie. Daardoor werd het een plek zonder regels.' },
    { q:'Waarom was het op de onderste verdiepingen en in de steegjes altijd donker?', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'De gebouwen stonden zo dicht op elkaar dat het zonlicht de grond nooit raakte. Mensen bouwden hun huizen ook nog bovenop de huizen van anderen, dus de stad werd steeds hoger en voller. Het licht kwam daardoor niet tot beneden. Daarom brandden daar flikkerende neonlampen.' },
  ],
  quiz: { mcEyebrow: 'JOUW DOOLHOFKENNIS', mcHeading: 'Vind jij de weg door de quiz, Alex?' },
  completion: {
    heading: ['Level uitgespeeld,', '*neonverkenner Alex.*'],
    text: 'Van een vergeten fort tot een neonstad in een game: jij vond de weg door het doolhof van Kowloon. Dit neonbord brandt speciaal voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
