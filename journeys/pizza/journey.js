// Bizarre pizza's: how cooks across Asia turn pizza into a canvas for their own flavours.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'pizza',
  name: 'Bizarre pizza’s',
  number: '05',
  meta: { title: 'Bizarre pizza’s', description: 'De gekste pizzasmaken van Azië, van spinaziecurry tot stinkvrucht. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Bizarre *pizza’s*', blurb: 'Curry, garnalen, boba en een stinkende vrucht. Ontdek de gekste pizza’s van Azië.' },
  home: {
    label: 'LEESREIS 05 · AZIË', greeting: 'Hé Alex, zin in pizza?', heading: ['Bizarre', '*pizza’s.*'],
    description: 'Groene curry, zoete aardappel, tapiocaballetjes en de meest stinkende vrucht ter wereld. Ontdek wat koks in Azië allemaal op een pizza leggen.',
    cta: 'Begin je pizzareis', location: 'VAN INDIA TOT THAILAND', stamp: ['PROEF', 'Azië', 'DURF & EET'],
    caption: 'Waar een pizza een avontuur wordt.', routeHeading: 'Jouw route langs de gekste pizza’s',
  },
  chapters: [
    { title:'Een leeg canvas', short:'Geen regels', label:'AZIË · PIZZA OP Z’N EIGEN MANIER', icon:'✳', aside:'Wat leg jij erop?', caption:'Een warme oven, een ronde bodem en een berg ingrediënten. Hier begint het experiment.', note:'DE REIS BEGINT' },
    { title:'Groene curry op je pizza', short:'India', label:'INDIA · PALAK PANEER', icon:'❧', aside:'Spinazie en blokjes kaas', caption:'Geen rode tomatensaus, maar een groene, kruidige curry. Zie je de blokjes kaas?', note:'KIJK EENS GOED' },
    { title:'Zoet en hartig tegelijk', short:'Japan en Korea', label:'JAPAN & ZUID-KOREA · ZOET EN HARTIG', icon:'✺', aside:'Een oranje korst', caption:'Garnalen, inktvisringen, maïs en strepen mayonaise. En de rand is van zoete aardappel!', note:'PROEF MAAR' },
    { title:'Boba en een zwart ei', short:'Taiwan', label:'TAIWAN · VAN BOBA TOT HONDERDJARIG EI', icon:'❖', aside:'Welke durf jij?', caption:'Tik hieronder en kies: de zoete Boba-pizza of de extreme pizza met het zwarte ei.', note:'BLIJF NIEUWSGIERIG', variants:[{ id:'boba', label:'Boba-pizza' }, { id:'ei', label:'Honderdjarig ei' }] },
    { title:'De stinkvrucht in de oven', short:'De durian', label:'THAILAND & MALEISIË · DE DURIAN', icon:'☼', aside:'Stekels van buiten, romig van binnen', caption:'De durian ziet eruit als een stekelbal. Binnenin zit zacht, geel vruchtvlees.', note:'DURF JIJ?' },
  ],
  dictionary: {
    puristen:'Mensen die vinden dat iets precies volgens de oude, vaste regels moet.',
    canvas:'Het doek waarop een schilder schildert; hier een lege plek om iets nieuws op te maken.',
    experimenteren:'Nieuwe dingen uitproberen om te kijken wat er gebeurt.',
    hartig:'Zout of pittig van smaak, het tegenovergestelde van zoet.',
    berucht:'Bekend om iets wat mensen vreemd, eng of slecht vinden.',
    geconserveerd:'Zo bewaard dat het lang goed blijft en niet bederft.',
    ondraaglijk:'Zo erg dat je het bijna niet kunt uithouden.',
    grensverleggend:'Zo nieuw en gedurfd dat het verder gaat dan wat mensen gewend zijn.',
    culinair:'Te maken met koken en lekker eten.',
  },
  questions: [
    { q:'‘Wat in Europa misschien vreemd klinkt, is in veel Aziatische landen een ware *delicatesse*.’ Wat betekent delicatesse in deze zin?', options:['Iets wat je liever niet eet.','Een bijzonder en heel lekker gerecht.','Een gerecht dat uit Italië komt.','Een snelle, goedkope hap.'], answer:1, chapter:0, explanation:'Een delicatesse is iets bijzonders en heel lekkers. De tekst zegt: wat wij vreemd vinden, vinden ze daar juist een lekkernij.' },
    { q:'Wat komt er op de Palak Paneer-pizza in plaats van tomatensaus?', options:['Een kruidige, romige curry van spinazie.','Zoete theesaus.','Dikke strepen mayonaise.','Puree van zoete aardappel.'], answer:0, chapter:1, explanation:'In India wordt de tomatensaus vervangen door een kruidige, romige curry van spinazie, met blokjes Indiase kaas.' },
    { q:'Waar is de korst gemaakt op de pizza die in Japan en Zuid-Korea heel normaal is?', options:['Van rijst.','Van tapiocaballetjes.','Van gesmolten mozzarella.','Van zoete-aardappelpuree.'], answer:3, chapter:2, explanation:'De tekst noemt een korst van zoete-aardappelpuree. Daar komen garnalen, inktvis, maïs en mayonaise op.' },
    { q:'Wat ligt er op de Taiwanese Boba-pizza?', options:['Koriander en varkensbloedcake.','Spinazie en blokjes kaas.','Mozzarella, zoete theesaus en tapiocaballetjes.','Garnalen en inktvis.'], answer:2, chapter:3, explanation:'De Boba-pizza is belegd met gesmolten mozzarella, zoete theesaus en de taaie tapiocaballetjes die je ook in bubbelthee vindt.' },
    { q:'Waardoor wordt een ‘honderdjarig ei’ zwart?', options:['Doordat het wekenlang onder de grond wordt geconserveerd.','Doordat het honderd jaar oud is.','Doordat het in zwarte theesaus wordt gekookt.','Doordat het te lang in de pizzaoven ligt.'], answer:0, chapter:3, explanation:'Dit is oorzaak en gevolg: het ei wordt wekenlang onder de grond geconserveerd, en daardoor wordt het zwart. Het is dus niet echt honderd jaar oud.' },
    { q:'In welke landen kun je volgens de tekst een Durian-pizza vinden?', options:['In Italië en Spanje.','In landen in Zuidoost-Azië, zoals Thailand en Maleisië.','In Japan en Zuid-Korea.','Alleen in India.'], answer:1, chapter:4, explanation:'De tekst zegt dat de Durian-pizza in Zuidoost-Azië te vinden is, zoals in Thailand en Maleisië.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Pizza hoort altijd met tomatensaus en kaas.','De Boba-pizza is de lekkerste pizza van Azië.','In Azië maken koks van pizza een avontuur met hun eigen gekke smaken.','Toeristen moeten in Azië geen pizza bestellen.'], answer:2, chapter:4, explanation:'De tekst laat pizza’s uit India, Japan, Korea, Taiwan en Zuidoost-Azië zien. De slotzin vat het samen: pizza eten is daar een grensverleggend culinair avontuur.' },
  ],
  written: [
    { q:'Wat is het grote verschil tussen hoe Italianen over pizza denken en hoe Aziatische koks met pizza omgaan?', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'In Italië gelden strenge regels voor een traditionele pizza. Daar moet een pizza op een vaste manier gemaakt worden. Aziatische koks zijn geen puristen. Voor hen is de pizzabodem een leeg canvas om mee te experimenteren. Ze combineren westerse kooktechnieken met hun eigen ingrediënten.' },
    { q:'Waarom zou een Durian-pizza voor een Europese toerist een flinke uitdaging kunnen zijn?', label:'TEKSTBEGRIP & ANALYSE', chapter:4, model:'De durian staat bekend als de meest stinkende vrucht ter wereld. Veel toeristen vinden de geur ondraaglijk. Je moet dus durven proeven, ook al ruikt het heel sterk. Het vruchtvlees zelf is wel romig en zoet en smelt goed samen met de kaas.' },
  ],
  quiz: { mcEyebrow: 'JOUW PIZZAKENNIS', mcHeading: 'Tijd voor de pizzaquiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*pizzaproever Alex.*'],
    text: 'Van groene curry tot stinkende durian: jij weet nu dat pizza in Azië een echt avontuur is. Deze pizza met van alles een stukje is voor jou. Welk stuk durf jij als eerste?',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
