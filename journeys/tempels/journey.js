// Kleurrijke tempels: the gods and goddesses of Taiwan, from Mazu to Kuan Yin and the moon blocks.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'tempels',
  name: 'Kleurrijke tempels',
  number: '04',
  meta: { title: 'Kleurrijke tempels', description: 'De goden en godinnen van Taiwan, van Mazu tot Kuan Yin. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Kleurrijke *tempels*', blurb: 'Wierook, draken en maanstenen. Ontmoet Mazu en Kuan Yin, twee geliefde godinnen van Taiwan.' },
  home: {
    label: 'LEESREIS 04 · TAIWAN', greeting: 'Hé Alex, ruik je de wierook al?', heading: ['Kleurrijke', '*tempels.*'],
    description: 'Draken op het dak, een godin van de zee en rode maanstenen die antwoord geven. Stap binnen in de tempels van Taiwan.',
    cta: 'Stap de tempel binnen', location: 'OVERAL IN TAIWAN', stamp: ['TEMPEL', 'Taiwan', 'LEES & ONTDEK'],
    caption: 'Waar de wierook zoet ruikt en draken over het dak waken.', routeHeading: 'Jouw route langs de goden',
  },
  chapters: [
    { title:'Wierook en draken', short:'De tempels', label:'TAIWAN · EEN EILAND VOL TEMPELS', icon:'☯', aside:'Draken op het dak', caption:'Een kleurrijke tempel, draken op het dak en zoete rook uit de wierookbrander.', note:'DE REIS BEGINT' },
    { title:'Mazu, godin van de zee', short:'Mazu', label:'MAZU · DE ZEE EN DE ZEELIEDEN', icon:'≈', aside:'Veilig terug naar de haven', caption:'Een vissersbootje op de golven en een tempeltje op de rots. Zie je het vuurwerk?', note:'KIJK EENS GOED' },
    { title:'Kuan Yin, vol vriendelijkheid', short:'Kuan Yin', label:'KUAN YIN · BARMHARTIGHEID EN COMPASSIE', icon:'❀', aside:'Een lotus in de vijver', caption:'Een vaas vol helend water en een lotusbloem die rustig op het water drijft.', note:'NEEM JE TIJD' },
    { title:'Praten met de goden', short:'Maanstenen', label:'IN DE TEMPEL · FRUIT EN MAANSTENEN', icon:'☾', aside:'Ja of nee?', caption:'Vers fruit op het altaar, kaarsjes en twee rode maanstenen op de grond.', note:'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    wierook:'Stokjes of korrels die een lekkere geur geven als je ze laat smeulen.',
    volksgeloven:'Oude geloven die de gewone mensen al heel lang van generatie op generatie doorgeven.',
    beschermvrouwe:'Een vrouw of godin die over een groep mensen waakt en hen beschermt.',
    bedwingen:'Iets of iemand onder controle krijgen, zodat het rustig wordt.',
    gadegeslagen:'Bekeken of in de gaten gehouden.',
    barmhartigheid:'Medelijden hebben met anderen en hen dan ook echt helpen.',
    compassie:'Meeleven met iemand die verdriet of pijn heeft.',
    offeren:'Iets cadeau geven aan een god, als teken van respect of dankbaarheid.',
    maanstenen:'Twee houten blokjes in de vorm van een halve maan, waarmee je de goden een vraag stelt.',
  },
  questions: [
    { q:'Wat ruik je volgens de tekst al snel als je in Taiwan rondloopt?', options:['De geur van gebakken vis.','De zoete geur van wierook.','De geur van verse thee.','De geur van vuurwerk.'], answer:1, chapter:0, explanation:'De tekst begint zo: wie in Taiwan rondloopt, ruikt al snel de zoete geur van wierook.' },
    { q:'‘Boeddhisme, taoïsme en oude volksgeloven lopen *naadloos* in elkaar over.’ Wat betekent naadloos hier?', options:['Met een duidelijke grens ertussen.','Heel langzaam en moeizaam.','Zonder dat je ziet waar het een ophoudt en het ander begint.','Zonder dat iemand het mag weten.'], answer:2, chapter:0, explanation:'Een naad is de plek waar twee stukken aan elkaar vastzitten. Naadloos betekent dat je geen grens ziet: de geloven gaan vloeiend in elkaar over.' },
    { q:'Waarom staan er in één tempel vaak beelden van allerlei verschillende goden naast elkaar?', options:['Omdat de mensen in Taiwan verschillende geloven met elkaar mengen.','Omdat er te weinig tempels zijn voor alle goden.','Omdat de goden ruzie hebben en elkaar in de gaten houden.','Omdat toeristen dat graag willen zien.'], answer:0, chapter:0, explanation:'Dit is oorzaak en gevolg: mensen in Taiwan mengen boeddhisme, taoïsme en volksgeloven. Daardoor staan goden uit verschillende geloven vredig samen in één tempel.' },
    { q:'Wat gebeurt er elk jaar ter ere van Mazu?', options:['Er wordt een grote bootrace op zee gehouden.','Iedereen blijft een dag lang stil thuis.','Er wordt een nieuwe tempel voor haar gebouwd.','Miljoenen mensen lopen dagenlang achter haar beeld aan.'], answer:3, chapter:1, explanation:'Elk jaar is er een gigantische wandeltocht. Miljoenen mensen lopen dan dagenlang achter het beeld van Mazu aan door steden en dorpen.' },
    { q:'Hoe wordt Kuan Yin vaak afgebeeld?', options:['Op een draak, hoog in de lucht.','Met een vaas vol helend water of zittend op een lotusbloem.','Met een visnet en een boot.','Met twee rode maanstenen in haar handen.'], answer:1, chapter:2, explanation:'De tekst zegt dat Kuan Yin vaak wordt afgebeeld met een vaas vol helend water of zittend op een lotusbloem.' },
    { q:'Wat offeren mensen volgens de tekst in de tempels?', options:['Vers fruit.','Nieuwe kleren.','Zakjes thee.','Kleine bootjes.'], answer:0, chapter:3, explanation:'In de laatste alinea staat dat mensen in de tempels vers fruit offeren aan de goden.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['In Taiwan gaat iedereen alleen op zondag naar de tempel.','Mazu is de enige godin die er echt toe doet.','Religie in Taiwan is kleurrijk en levendig, met veel goden die een plek in het dagelijks leven hebben.','Tempels in Taiwan zijn vooral bedoeld voor toeristen.'], answer:2, chapter:3, explanation:'De tekst laat zien dat Taiwanezen verschillende geloven mengen, veel goden vereren en elke dag met hen praten. Daardoor is religie er levendig en dagelijks.' },
  ],
  written: [
    { q:'Mazu en Kuan Yin worden voor verschillende redenen vereerd. Waarvoor bidden mensen tot Mazu en waarvoor tot Kuan Yin?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Mazu is de godin van de zee. Mensen bidden tot haar om vissers en zeelieden te beschermen, want zij kan hen uit zware stormen redden. Tot Kuan Yin bidden mensen als ze troost zoeken, als ze ziek zijn of als ze hulp nodig hebben bij een moeilijke beslissing.' },
    { q:'Hoe proberen mensen in de tempels een \'ja\' of \'nee\' antwoord te krijgen op hun vragen aan de goden?', label:'TEKSTBEGRIP & ANALYSE', chapter:3, model:'Ze gooien twee rode, houten maanstenen op de grond. Zo stellen ze de goden een vraag waarop het antwoord ja of nee is.' },
  ],
  quiz: { mcEyebrow: 'JOUW TEMPELKENNIS', mcHeading: 'Tijd voor de tempelquiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*tempelkenner Alex.*'],
    text: 'Van de godin van de zee tot de rode maanstenen: jij weet nu hoe kleurrijk en levendig de tempels van Taiwan zijn. En is papa trots op je? De maanstenen zeggen: ja!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
