// Keti Koti: Dutch slavery, its abolition in 1863 and 1873, and the king's apology in 2023.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'keti-koti',
  name: 'Keti Koti',
  number: '11',
  meta: { title: 'Slavernij, Keti Koti en de excuses van de koning', description: 'Waarom Nederland elk jaar op 1 juli Keti Koti herdenkt. Een Nederlandse leesreis voor Alex.' },
  card: { title: 'De ketenen zijn *verbroken*', blurb: 'Schepen, plantages en een belangrijke toespraak. Lees waarom Nederland elk jaar op 1 juli Keti Koti herdenkt.' },
  home: {
    label: 'LEESREIS 11 · SURINAME & NEDERLAND', greeting: 'Hé Alex, vandaag lezen we een belangrijk verhaal.', heading: ['De ketenen', 'zijn *verbroken.*'],
    description: 'Over de slavernij, over het feest en de herdenking van Keti Koti, en over de dag waarop de koning zijn excuses aanbood. Lees rustig, en denk er gerust even over na.',
    cta: 'Begin met lezen', location: 'SURINAME · AMSTERDAM', stamp: ['HERDENK', 'Keti Koti', '1 JULI'],
    caption: 'Een geschiedenis om niet te vergeten.', routeHeading: 'Jouw route door de geschiedenis',
  },
  chapters: [
    { title:'Gedwongen over de oceaan', short:'De slavenhandel', label:'DE ATLANTISCHE OCEAAN · EEUWENLANG', icon:'❧', aside:'Een schip op weg naar Suriname', caption:'Een zeilschip op de oceaan, een groene kust en velden waar mensen gedwongen moesten werken.', note:'DE REIS BEGINT' },
    { title:'De ketenen zijn verbroken', short:'Keti Koti', label:'SURINAME · 1863 EN 1873', icon:'☼', aside:'Een lange weg naar vrijheid', caption:'Een gebroken ketting en een pad met twee jaartallen. Kijk goed welk jaar waar staat.', note:'LET OP DE JAARTALLEN' },
    { title:'De excuses van de koning', short:'De excuses', label:'AMSTERDAM · 1 JULI 2023', icon:'✦', aside:'Samen herdenken', caption:'Bloemen bij het monument, en veel mensen die samen luisteren naar de toespraak.', note:'EEN BIJZONDERE DAG' },
  ],
  dictionary: {
    'trans-Atlantische slavenhandel':'De handel in mensen die als slaaf werden verkocht en over de Atlantische Oceaan werden vervoerd.',
    ontvoerd:'Met geweld meegenomen, tegen hun wil.',
    onmenselijke:'Zo zwaar en wreed dat geen enkel mens zo behandeld mag worden.',
    plantagehouders:'De eigenaren van plantages: grote boerderijen waar suiker, koffie of katoen werd verbouwd.',
    afgeschaft:'Officieel gestopt, zodat het niet meer mag.',
    Sranantongo:'Een taal die veel mensen in Suriname spreken.',
    ketenen:'Zware kettingen waarmee mensen vroeger vastgebonden werden.',
    'misdaad tegen de menselijkheid':'Een heel ernstige misdaad waarbij grote groepen mensen wreed worden behandeld.',
    staatshoofd:'De belangrijkste persoon van een land. In Nederland is dat de koning.',
    erkend:'Officieel gezegd dat iets echt zo is gebeurd en dat het ertoe doet.',
  },
  questions: [
    { q:'Naar welke kolonie werden mensen uit Afrika volgens de tekst onder andere gebracht?', options:['Naar Indonesië.','Naar Suriname.','Naar Taiwan.','Naar Canada.'], answer:1, chapter:0, explanation:'De tekst zegt dat mensen per schip naar kolonies zoals Suriname werden gebracht.' },
    { q:'De tot slaaf gemaakten waren ‘het eigendom’ van de plantagehouders. Wat betekent dat?', options:['Dat ze samen met de plantagehouders een bedrijf hadden.','Dat ze een eigen stuk grond kregen om op te werken.','Dat de plantagehouders hen bezaten, alsof ze een ding waren.','Dat ze af en toe bij de plantagehouders op bezoek mochten.'], answer:2, chapter:0, explanation:'Iets dat je eigendom is, is van jou. De plantagehouders deden alsof deze mensen van hen waren. Daarom hadden ze geen enkele vrijheid.' },
    { q:'Wat betekent Keti Koti in het Sranantongo?', options:['De ketenen zijn verbroken.','Het feest van de zomer.','De lange reis over zee.','Welkom thuis.'], answer:0, chapter:1, explanation:'De tekst legt uit dat Keti Koti ‘de ketenen zijn verbroken’ betekent. Een keten is een zware ketting.' },
    { q:'Op welke dag wordt Keti Koti elk jaar herdacht en gevierd?', options:['Op 1 januari.','Op 5 mei.','Op 27 april.','Op 1 juli.'], answer:3, chapter:1, explanation:'Op 1 juli 1863 werd de wet aangenomen. Die historische dag wordt elk jaar herdacht en gevierd als Keti Koti.' },
    { q:'Waarom was 1 juli 2023 volgens de tekst een bijzondere dag voor de toespraak van de koning?', options:['Omdat de koning toen zelf jarig was.','Omdat het precies 150 jaar na de echte afschaffing was.','Omdat Amsterdam toen voor het eerst Keti Koti vierde.','Omdat de wet van 1863 toen pas werd gevonden.'], answer:1, chapter:2, explanation:'De tekst zegt dat 1 juli 2023 precies 150 jaar na de echte afschaffing was. Daarom was het een bijzonder moment voor de excuses.' },
    { q:'Hoe noemde de koning het slavernijsysteem in zijn toespraak?', options:['Een misdaad tegen de menselijkheid.','Een vergissing waar niemand iets aan kon doen.','Een gewone manier van werken in die tijd.','Een oud verhaal dat niet meer belangrijk is.'], answer:0, chapter:2, explanation:'De koning noemde het slavernijsysteem een misdaad tegen de menselijkheid: een heel ernstige misdaad tegen grote groepen mensen.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Suiker, koffie en katoen waren vroeger heel duur.','Keti Koti is vooral een feest met lekker eten en muziek.','Slavernij is een pijnlijk deel van de Nederlandse geschiedenis dat lang weinig aandacht kreeg en nu wordt erkend.','De koning houdt elk jaar een toespraak in Amsterdam.'], answer:2, chapter:2, explanation:'De tekst vertelt over de slavernij, de lange weg naar vrijheid en hoe de koning in 2023 eindelijk excuses aanbood. Het gaat over een donkere bladzijde uit de geschiedenis die nu wordt erkend.' },
  ],
  written: [
    { q:'Waarom spreken we pas in 1873 over de daadwerkelijke afschaffing van de slavernij in Suriname, terwijl de wet al in 1863 werd aangenomen?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'In 1863 werd de slavernij met een wet afgeschaft, maar de mensen waren toen nog niet echt vrij. De Nederlandse regering verplichtte hen om nog tien jaar op de plantages te blijven werken, voor een heel laag loon. Pas in 1873 waren ze in de praktijk echt vrij.' },
    { q:'In de tekst staat dat de excuses van de koning voor veel nazaten heel belangrijk waren. Welke reden wordt hiervoor in de tekst genoemd?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Hun pijn en hun geschiedenis werden eindelijk erkend door het staatshoofd, de koning. Jarenlang had de overheid er weinig aandacht voor gehad. Nu zei de koning officieel dat het slavernijsysteem een misdaad was.' },
  ],
  quiz: { mcEyebrow: 'JOUW KENNIS', mcHeading: 'Wat weet jij nog, Alex?' },
  completion: {
    heading: ['Goed gelezen,', '*Alex.*'],
    text: 'Je weet nu waarom Keti Koti elk jaar op 1 juli wordt herdacht en gevierd, en waarom echte vrijheid een lange weg was. Dit is een verhaal om te onthouden, en om over te praten. Fijn dat je het zo goed hebt gelezen.',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
