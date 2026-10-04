// Achter de schermen: how alex-reads.ink gets from a name to a story on the screen.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'website',
  name: 'Achter de schermen',
  number: '07',
  meta: { title: 'Achter de schermen', description: 'Hoe alex-reads.ink werkt, van de naam tot de server. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Achter de *schermen*', blurb: 'Een telefoonboek, een digitaal magazijn en een computer die nooit slaapt. Kijk hoe alex-reads.ink werkt.' },
  home: {
    label: 'LEESREIS 07 · DE WEBSITE', greeting: 'Hé Alex, nieuwsgierig?', heading: ['Achter de', '*schermen.*'],
    description: 'Jij typt een naam in, en in een flits gaan er drie systemen aan het werk. Ontdek hoe een verhaal op je scherm komt.',
    cta: 'Kijk achter de schermen', location: 'ALEX-READS.INK', stamp: ['KIJK', 'mee', 'LEES & ZIE'],
    caption: 'Drie systemen, en dan staat het verhaal klaar.', routeHeading: 'Jouw route achter de schermen',
  },
  chapters: [
    { title:'Drie systemen, één verhaal', short:'Een fractie', label:'ALEX-READS.INK · DE START', icon:'✳', aside:'Alles in een flits', caption:'Een laptop op een bureau, en daarachter het boek, het magazijn en de server.', note:'DE REIS BEGINT' },
    { title:'Het telefoonboek van het internet', short:'Het DNS', label:'DNS · NAMEN EN NUMMERS', icon:'❧', aside:'Een naam, een nummer', caption:'Een groot open boek. Links de namen, rechts de nummers die erbij horen.', note:'KIJK EENS GOED' },
    { title:'Het digitale magazijn', short:'GitHub', label:'GITHUB · DE KLUIS', icon:'▣', aside:'Veilig opgeborgen', caption:'Planken vol dozen en boeken. Een nieuw pakketje is onderweg naar de kluis.', note:'GOED OPGEBORGEN' },
    { title:'De computer die nooit slaapt', short:'Railway', label:'RAILWAY · ALTIJD AAN', icon:'☼', aside:'Dag en nacht', caption:'Buiten is het nacht. Binnen brandt het licht van de server gewoon door.', note:'ALTIJD WAKKER' },
    { title:'Klaar om te lezen', short:'De keten', label:'VAN NAAM TOT VERHAAL', icon:'✧', aside:'En nu lezen', caption:'Boek, magazijn en server op een rij. Daarna ligt het verhaal open op het scherm.', note:'BEGIN MET LEZEN' },
  ],
  dictionary: {
    surft:'Je gaat met je computer of telefoon naar een website.',
    fractie:'Een heel klein stukje. Een fractie van een seconde is bijna meteen.',
    'IP-adres':'Het eigen nummer van een computer of website op het internet.',
    DNS:'Domain Name System, het telefoonboek van het internet.',
    bliksemsnel:'Heel erg snel, bijna zo snel als de bliksem.',
    programmeurs:'Mensen die de code van een website schrijven.',
    server:'Een krachtige computer die altijd aanstaat en een website laat zien.',
    gepusht:'Naar GitHub gestuurd, alsof je de nieuwste versie erheen duwt.',
  },
  questions: [
    { q:'Met hoeveel belangrijke systemen werkt jouw computer samen als je naar alex-reads.ink gaat?', options:['Alleen met jouw eigen computer.','Met twee systemen: een laptop en een printer.','Met drie belangrijke systemen.','Met vier systemen, één voor elke alinea.'], answer:2, chapter:0, explanation:'In het begin zegt de tekst dat jouw computer samenwerkt met drie belangrijke systemen. Dat gebeurt in een fractie van een seconde.' },
    { q:'Wat is een IP-adres volgens de tekst?', options:['Een eigen, uniek nummer van een computer of website.','De titel van een verhaal op alex-reads.ink.','Een doos in het digitale magazijn.','Een lampje dat nooit uitgaat.'], answer:0, chapter:1, explanation:'De tekst zegt dat elke computer en website een eigen, uniek nummer heeft. Dat nummer noemen we een IP-adres.' },
    { q:'Welk voorbeeld van een IP-adres staat in de tekst?', options:['alex-reads.ink','GitHub','Railway','192.168.1.50'], answer:3, chapter:1, explanation:'Als voorbeeld van een IP-adres noemt de tekst het nummer 192.168.1.50.' },
    { q:'Wat gebeurt er met de code zodra een verhaal klaar is?', options:['Hij blijft voor altijd alleen op de laptop staan.','Hij wordt naar GitHub gestuurd.','Hij wordt meteen van het internet gewist.','Hij verandert in een IP-adres.'], answer:1, chapter:2, explanation:'Zodra een verhaal klaar is, wordt de code naar GitHub gestuurd. GitHub is het digitale magazijn waar de website bewaard wordt.' },
    { q:'Wat betekent het woord ‘push’ in deze tekst?', options:['De server een tijdje laten slapen.','Een verhaal hardop voorlezen.','De nieuwste versie van de website naar GitHub duwen.','De laptop dichtdoen als je klaar bent.'], answer:2, chapter:2, explanation:'Push is het Engelse woord voor duwen. In de tekst betekent het dat de allernieuwste versie veilig naar GitHub wordt gestuurd.' },
    { q:'Waardoor zet Railway een nieuwe tekst live op het internet?', options:['Omdat de maan opkomt.','Omdat jij een hoofdstuk opnieuw leest.','Omdat GitHub elke avond op slot gaat.','Omdat Railway een seintje krijgt zodra de tekst is gepusht.'], answer:3, chapter:3, explanation:'Railway is gekoppeld aan GitHub. Krijgt het een seintje, dan pakt het de nieuwe code uit het magazijn en zet die meteen live.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Alleen de bouwer van de website mag de verhalen lezen.','Achter een website werken systemen samen, zodat jij meteen de nieuwste teksten kunt lezen.','GitHub is een trein die de verhalen bij je thuis brengt.','De server staat alleen in de nacht aan.'], answer:1, chapter:4, explanation:'De tekst sluit af met het idee dat jij altijd direct kunt beginnen met lezen. Dat kan doordat de systemen achter de website samenwerken.' },
  ],
  written: [
    { q:'Waarom gebruiken we namen zoals alex-reads.ink in plaats van IP-adressen om naar een website te gaan?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Mensen zijn niet zo goed in het onthouden van lange getallen. Een naam zoals alex-reads.ink is veel makkelijker te onthouden dan een IP-adres.' },
    { q:'Wat is de taak van het DNS in het internetproces?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Het DNS is het telefoonboek van het internet. Zodra jij een websitenaam intypt, zoekt het DNS bliksemsnel het juiste IP-nummer erbij. Zo weet jouw apparaat met welke computer hij moet bellen.' },
  ],
  quiz: { mcEyebrow: 'JOUW WEBSITEKENNIS', mcHeading: 'Tijd voor de quiz, Alex.' },
  completion: {
    heading: ['Goed gekeken,', '*Alex.*'],
    text: 'Jij weet nu wat er achter alex-reads.ink gebeurt, nog voor het verhaal op je scherm staat. De server blijft wakker, en jij mag gewoon beginnen met lezen.',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
