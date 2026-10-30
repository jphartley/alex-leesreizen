// Van Keltisch vuur tot griezelfeest: from the Celtic Samhain via All Hallows' Eve to American Halloween.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'halloween',
  name: 'De geschiedenis van Halloween',
  number: '13',
  meta: { title: 'Van Keltisch vuur tot griezelfeest', description: 'Waar komt Halloween vandaan? Van Keltische vreugdevuren tot lichtgevende pompoenen. Een leesreis voor Alex.' },
  card: { title: 'Van Keltisch vuur tot *griezelfeest*', blurb: 'Vreugdevuren, een oude kerk en lichtgevende pompoenen. Ontdek waar Halloween eigenlijk vandaan komt.' },
  home: {
    label: 'LEESREIS 13 · IERLAND EN AMERIKA', greeting: 'Hé Alex, als wat verkleed jij je?', heading: ['Van Keltisch vuur', 'tot *griezelfeest.*'],
    description: 'Van vuren op een heuvel tot pompoenen op de stoep. Ontdek hoe een eeuwenoud feest uitgroeide tot het Halloween van nu.',
    cta: 'Begin je griezelreis', location: '31 OKTOBER · EEN AVOND OP STRAAT', stamp: ['ONTDEK', 'Halloween', 'LEES & GRIEZEL'],
    caption: 'Waar de pompoenen lichtjes geven.', routeHeading: 'Jouw route door tweeduizend jaar Halloween',
  },
  chapters: [
    { title: 'Een gigantisch griezelfeest', short: 'Halloween nu', label: '31 OKTOBER · OVERAL OP STRAAT', icon: '☾', aside: 'Een straat vol pompoenen', caption: 'Verlichte ramen, vrolijke pompoenen en verklede kinderen. Maar waar komt dit feest vandaan?', note: 'DE REIS BEGINT' },
    { title: 'Het feest Samhain', short: 'De Kelten', label: 'IERLAND · RUIM TWEEDUIZEND JAAR GELEDEN', icon: '✺', aside: 'Een vuur op de heuvel', caption: 'Een groot vreugdevuur in de nacht, oude stenen en graan van de oogst. Wat zie je nog meer?', note: 'KIJK EENS GOED' },
    { title: 'All Hallows’ Eve', short: 'Allerheiligen', label: 'EUROPA · DE KERK EN DE PAUS', icon: '✦', aside: 'Kaarsjes bij de kerk', caption: 'Een kerk met lichtjes in de ramen. Zeg de woorden onder de tekening eens heel snel achter elkaar!', note: 'ZEG HET HARDOP' },
    { title: 'Een Amerikaans volksfeest', short: 'Naar Amerika', label: 'DE VERENIGDE STATEN · EEN NIEUW BEGIN', icon: '☼', aside: 'Snoep of je leven!', caption: 'Een veranda met lichtgevende pompoenen en een schaal vol snoep. Wie belt er als eerste aan?', note: 'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    uitgeholde: 'Waar de binnenkant uit is gehaald, zodat hij van binnen leeg is.',
    oorsprong: 'Het begin: waar iets vandaan komt.',
    markeerde: 'Liet duidelijk zien dat iets begon of ophield.',
    oogst: 'Het binnenhalen van graan, groente en fruit van het land.',
    vreugdevuren: 'Grote vuren die mensen buiten aansteken bij een feest.',
    angstaanjagende: 'Zo eng dat je er bang van wordt.',
    heidense: 'Horend bij oude geloven van vóór het christendom.',
    immigranten: 'Mensen die uit hun eigen land vertrekken om in een ander land te gaan wonen.',
    bijgeloof: 'Geloven in dingen die niet echt bewezen zijn, zoals geesten of geluk brengende voorwerpen.',
  },
  questions: [
    { q: 'Waar ligt volgens de tekst de oorsprong van Halloween?', options: ['In Amerika.', 'Bij de Kelten in Ierland en Groot-Brittannië.', 'In Rome, bij de paus.', 'In Nederland.'], answer: 1, chapter: 0, explanation: 'Veel mensen denken dat Halloween uit Amerika komt, maar de tekst zegt dat de oorsprong bij de Kelten in Ierland en Groot-Brittannië ligt.' },
    { q: 'Wat markeerde het feest Samhain voor de Kelten?', options: ['Het begin van de lente.', 'De verjaardag van de paus.', 'De aankomst in Amerika.', 'Het einde van de zomerse oogst en het begin van de winter.'], answer: 3, chapter: 1, explanation: 'De tekst zegt dat Samhain het einde van de zomerse oogst en het begin van de donkere, koude winter markeerde.' },
    { q: 'Wat betekent ‘flinterdun’ in de zin over de grens tussen de levenden en de doden?', options: ['Heel erg dun.', 'Heel erg hoog.', 'Heel erg ver weg.', 'Heel erg oud.'], answer: 0, chapter: 1, explanation: 'Flinterdun betekent zo dun als een flinter: bijna niets. De Kelten geloofden dat de grens die nacht bijna verdwenen was.' },
    { q: 'Waarom riep de paus 1 november uit tot Allerheiligen?', options: ['Omdat de Kelten daarom vroegen.', 'Omdat het die dag altijd mooi weer was.', 'Omdat de kerk het heidense feest wilde vervangen.', 'Omdat de pompoenen dan rijp waren.'], answer: 2, chapter: 2, explanation: 'Het christendom werd steeds machtiger, en de kerk probeerde het heidense feest te vervangen. Daarom kwam er op 1 november Allerheiligen.' },
    { q: 'Hoe is het woord ‘Halloween’ ontstaan?', options: ['Het is de naam van een Keltische koning.', 'Door ‘All Hallows’ Eve’ heel snel achter elkaar uit te spreken.', 'Het betekent ‘pompoen’ in het Iers.', 'Een Amerikaanse snoepfabriek heeft het bedacht.'], answer: 1, chapter: 2, explanation: 'De avond vóór Allerheiligen heette in het Engels ‘All Hallows’ Eve’. Als je dat snel zegt, hoor je vanzelf ‘Halloween’.' },
    { q: 'Wat betekent het dat het feest in de twintigste eeuw ‘commerciëler’ werd?', options: ['Het feest werd korter.', 'Er kwamen minder mensen op af.', 'Het feest werd alleen nog in de kerk gevierd.', 'Er ging steeds meer om verkopen en geld verdienen.'], answer: 3, chapter: 3, explanation: 'Commercieel heeft te maken met handel en geld. Winkels gingen steeds meer kostuums, snoep en versiering verkopen.' },
    { q: 'Wat is de belangrijkste boodschap van de hele tekst?', options: ['Halloween is in Amerika uitgevonden.', 'Halloween gaat alleen over horrorfilms.', 'Halloween begon als een oud Keltisch feest en veranderde door de eeuwen heen in het feest van nu.', 'De kerk heeft Halloween helemaal verboden.'], answer: 2, chapter: 3, explanation: 'De tekst volgt het feest van de Kelten via de kerk naar Amerika. Zo zie je hoe een oud feest langzaam veranderde in het griezelfeest van nu.' },
  ],
  written: [
    { q: 'Waarom droegen de Kelten oorspronkelijk maskers tijdens de nacht van 31 oktober, en hoe verschilt dit van de reden waarom mensen zich tegenwoordig met Halloween verkleden?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 1, model: 'De Kelten droegen angstaanjagende maskers en kostuums van dierenhuiden om kwade geesten af te schrikken en te verwarren. Zij geloofden dat er die nacht echt geesten terugkwamen. Tegenwoordig verkleden mensen zich vooral voor de lol, op een gezellig buurtfeest met trick-or-treat. Het is nu een spel en geen bescherming meer tegen geesten.' },
    { q: 'In de tekst staat dat de Ierse immigranten in Amerika hun traditie aanpasten omdat pompoenen handiger waren. Wat gebruikten zij oorspronkelijk in Europa om lichtjes van te maken?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 3, model: 'In Europa gebruikten ze knollen en rapen. Die holden ze uit om er lichtjes van te maken. In Amerika waren pompoenen veel groter en makkelijker uit te hollen.' },
  ],
  quiz: { mcEyebrow: 'JOUW HALLOWEENKENNIS', mcHeading: 'Wat weet jij nu van Halloween, Alex?' },
  completion: {
    heading: ['Griezelig goed,', '*Halloween-kenner Alex.*'],
    text: 'Van Keltische vreugdevuren tot lichtgevende pompoenen: jij weet nu hoe Halloween in tweeduizend jaar veranderde. Deze pompoen lacht speciaal voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
