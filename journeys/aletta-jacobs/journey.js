// Aletta Jacobs: the first Dutch woman to study at a university and the country's first female
// doctor, who campaigned for women's suffrage (1854-1929).
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'aletta-jacobs',
  name: 'Aletta Jacobs',
  number: '19',
  meta: { title: 'Aletta Jacobs: Pionier voor gelijke rechten', description: 'Hoe Aletta Jacobs de eerste vrouwelijke arts van Nederland werd en streed voor vrouwenkiesrecht. Een Nederlandse leesreis voor Alex.' },
  card: { title: 'Pionier voor *gelijke rechten*', blurb: 'Een brutale brief, een dokterstas en een lange strijd om te mogen stemmen. Lees hoe Aletta Jacobs de regels veranderde.' },
  home: {
    label: 'LEESREIS 19 · NEDERLAND', greeting: 'Hé Alex, vandaag lees je over een echte doorzetter.', heading: ['Pionier voor', '*gelijke rechten.*'],
    description: 'Meisjes mochten vroeger niet studeren. Toch wilde Aletta Jacobs dokter worden. Lees hoe zij met een brutale brief en heel veel doorzettingsvermogen de regels veranderde.',
    cta: 'Begin met lezen', location: 'SAPPEMEER, GRONINGEN', stamp: ['DURF', 'Aletta', '1854–1929'],
    caption: 'Waar Aletta opgroeide, met één grote droom.', routeHeading: 'Jouw route door haar leven',
  },
  chapters: [
    { title:'Eén grote droom', short:'De droom', label:'NEDERLAND · DE NEGENTIENDE EEUW', icon:'☼', aside:'Een dorp aan de vaart', caption:'Een molen, een schip op het water en het huis van de dokter. Hier droomde Aletta over een eigen dokterstas.', note:'DE REIS BEGINT' },
    { title:'Een brutale brief', short:'De brief', label:'GRONINGEN · 1871 TOT 1878', icon:'✎', aside:'Een ganzenveer en veel moed', caption:'Een inktpot, een kaars en een stapel dikke boeken. Kijk eens goed naar de envelop: aan wie is die gericht?', note:'KIJK EENS GOED' },
    { title:'Een dokter voor iedereen', short:'De dokter', label:'AMSTERDAM · DOKTER ALETTA', icon:'✚', aside:'Een deur die openstaat', caption:'Voor de deur wachten moeders met hun kinderen. Tik hieronder en kijk ook even in de winkel.', note:'ZORG VOOR IEDEREEN', variants:[{ id:'spreekuur', label:'Spreekuur' }, { id:'winkel', label:'Winkel' }] },
    { title:'Een stem voor vrouwen', short:'Het kiesrecht', label:'NEDERLAND · 1894 TOT 1922', icon:'✦', aside:'Samen de straat op', caption:'Hoeden, vlaggetjes en een groot spandoek. Jarenlang kwamen vrouwen op voor hun recht om te stemmen.', note:'NOOIT OPGEVEN' },
  ],
  dictionary: {
    huishouden:'Het werk in en om het huis, zoals koken, wassen en schoonmaken.',
    brutale:'Heel durvend, ook al hoort het eigenlijk niet zo.',
    'minister-president':'De leider van de regering van een land.',
    spreekuur:'Een vaste tijd waarop je bij de dokter langs kunt komen met je klachten.',
    arbeidersgezinnen:'Gezinnen van mensen die hard met hun handen werkten, bijvoorbeeld in een fabriek, en vaak weinig geld hadden.',
    uitsluitend:'Alleen maar; er was niemand anders.',
    toonbank:'De lange tafel in een winkel waar de verkoper achter staat.',
    feministen:'Mensen die vinden dat vrouwen en mannen dezelfde rechten moeten hebben, en zich daarvoor inzetten.',
    kiesrecht:'Het recht om te stemmen bij verkiezingen en zo mee te beslissen wie het land bestuurt.',
    stembus:'De dichte bak waarin je je stembiljet stopt als je gaat stemmen.',
  },
  questions: [
    { q:'Wat werd er in de negentiende eeuw van meisjes verwacht?', options:['Dat ze net als jongens doorleerden voor een mooi beroep.','Dat ze thuisbleven en later het huishouden deden.','Dat ze allemaal dokter werden, net als hun vader.','Dat ze een brief schreven aan de minister-president.'], answer:1, chapter:0, explanation:'De tekst zegt dat jongens konden doorleren voor een mooi beroep, maar dat van meisjes werd verwacht dat ze thuisbleven en later het huishouden deden.' },
    { q:'Aletta besloot ‘de stoute schoenen aan te trekken’. Wat betekent dat hier?', options:['Ze trok haar mooiste schoenen aan voor de minister.','Ze werd boos en liep weg van school.','Ze gaf haar droom op en bleef thuis.','Ze durfde iets spannends te doen, ook al was dat eng.'], answer:3, chapter:1, explanation:'Wie de stoute schoenen aantrekt, durft iets spannends te doen. Aletta durfde een brutale brief te schrijven aan de machtige minister-president.' },
    { q:'Aan wie was het antwoord op Aletta’s brief gericht?', options:['Aan haar vader.','Aan Aletta zelf.','Aan de universiteit.','Aan haar oude school.'], answer:0, chapter:1, explanation:'De tekst zegt dat de brief ‘ouderwets genoeg’ aan haar vader was gericht. Het ging over Aletta, maar het antwoord ging naar haar vader.' },
    { q:'Hoe vaak hield Aletta in Amsterdam een gratis spreekuur?', options:['Elke dag van de week.','Eén keer per maand.','Twee dagen per week.','Alleen op zondag.'], answer:2, chapter:2, explanation:'In de tekst staat het precies: twee dagen per week hield Aletta een gratis spreekuur.' },
    { q:'Waarom richtten Aletta en de eerste feministen de Vereniging voor Vrouwenkiesrecht op?', options:['Omdat ze samen een ziekenhuis wilden bouwen.','Omdat ze het onrechtvaardig vonden dat alleen rijke mannen de wetten mochten bepalen.','Omdat de minister-president hun dat had gevraagd.','Omdat vrouwen al wel mochten stemmen, maar mannen nog niet.'], answer:1, chapter:3, explanation:'Dit is oorzaak en gevolg: zij vonden het onrechtvaardig dat alleen rijke mannen de wetten mochten bepalen. Daarom gingen ze samen actievoeren voor het kiesrecht.' },
    { q:'Hoe lang voerden de feministen actie voordat vrouwen in 1919 kiesrecht kregen?', options:['25 jaar lang.','Zeven jaar lang.','Twee dagen.','68 jaar lang.'], answer:0, chapter:3, explanation:'De tekst zegt: na 25 jaar lang actievoeren en demonstreren was het eindelijk zover. Zeven jaar is hoe lang Aletta studeerde, en 68 was haar leeftijd in 1922.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Aletta Jacobs vond haar werk als dokter belangrijker dan stemmen.','In de negentiende eeuw mochten meisjes alles wat jongens ook mochten.','Aletta Jacobs zette door en streed haar hele leven voor gelijke rechten voor vrouwen.','Een brief aan de minister-president lost altijd alle problemen op.'], answer:2, chapter:3, explanation:'Van haar brutale brief tot het kiesrecht: Aletta gaf nooit op. Ze bleef zich inzetten voor gelijke rechten, als dokter én als actievoerder.' },
  ],
  written: [
    { q:'In de tekst staat dat Aletta in Amsterdam een gratis spreekuur hield. Waarom was dit speciale, gratis spreekuur hard nodig voor deze specifieke patiënten?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Het spreekuur was voor arme arbeidersgezinnen. Zij hadden weinig geld en konden een dokter vaak niet betalen. Daarom was een gratis spreekuur zo belangrijk voor hen. Vooral veel vrouwen kwamen naar Aletta toe. Omdat zij zelf een vrouw was, begreep ze hun lichamen en klachten veel beter dan de mannelijke dokters uit die tijd.' },
    { q:'Welke concrete, praktische verandering op de werkvloer wist Aletta als dokter af te dwingen voor jonge winkelmeisjes?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Winkelmeisjes moesten soms elf uur lang achter elkaar staan. Dankzij het actievoeren van Aletta kwam er een nieuwe wet: winkels moesten een stoel achter de toonbank zetten. Zo konden de meisjes eindelijk af en toe even zitten.' },
  ],
  quiz: { mcEyebrow: 'WAT HEB JIJ ONTDEKT?', mcHeading: 'Tijd voor de quiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*doorzetter Alex.*'],
    text: 'Jij weet nu hoe Aletta Jacobs met één brutale brief begon en daarna nooit meer opgaf. Dankzij doorzetters zoals zij mogen meisjes nu gewoon studeren en mogen vrouwen meebeslissen bij de verkiezingen. Deze tulpen zijn voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
