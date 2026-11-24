// De mythische wortels van The Legend of Zelda: the old stories behind Hyrule, from King Arthur's sword in
// the stone and Japanese Shinto to the Celtic goddess Epona and Peter Pan.
// The hero scene doubles as a small sword-in-the-stone game on desktop (time three pulls); see motion.js.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'zelda-mythen',
  name: 'Zelda-mythen',
  number: '22',
  meta: { title: 'De mythische wortels van The Legend of Zelda', description: 'Welke eeuwenoude mythen en legendes zitten er verstopt in The Legend of Zelda? Een interactief Nederlands leesavontuur voor Alex, met een spelletje om zelf het zwaard uit de steen te trekken.' },
  card: { title: 'De mythische wortels *van Zelda*', blurb: 'Van Koning Arthur en Japanse natuurgeesten tot Peter Pan: de oude verhalen achter Hyrule.' },
  home: {
    label: 'LEESREIS 22 · GAMES', greeting: 'Hé Alex, ben jij de uitverkoren held?', heading: ['De mythische wortels', 'van *Zelda.*'],
    description: 'The Legend of Zelda voelt als een heel oud verhaal. Dat is geen toeval! Lees uit welke mythen en sprookjes de makers hebben geleend. En probeer zelf het zwaard uit de steen te trekken!',
    cta: 'Begin je mythereis', location: 'HYRULE · SINDS 1986', stamp: ['SINDS', '1986', 'HYRULE'],
    caption: 'Alleen de ware held krijgt het zwaard los.', routeHeading: 'Jouw route langs de oude verhalen',
  },
  chapters: [
    { title:'Een eeuwig verhaal', short:'Een eeuwig verhaal', label:'HYRULE · SINDS 1986', icon:'△', aside:'Het zwaard in de steen', caption:'Een held staat bij een zwaard in een stenen sokkel, diep in het bos. Boven het zwaard zweven drie gouden driehoeken. Op de startpagina kun je zelf proberen het zwaard eruit te trekken.', note:'DE REIS BEGINT' },
    { title:'Het zwaard in de steen', short:'Koning Arthur', label:'MIDDELEEUWEN · DE LEGENDE VAN ARTHUR', icon:'✠', aside:'Twee zwaarden, twee helden', caption:'Links houdt de jonge Arthur een zwaard omhoog bij een steen, met een gouden kroon boven zich. Rechts doet een held hetzelfde bij een sokkel in het bos. Zie je wat ze gemeen hebben?', note:'VERGELIJK' },
    { title:'Geesten in de natuur', short:'Shintoïsme', label:'JAPAN · DE GEESTEN VAN DE NATUUR', icon:'✿', aside:'Een bezielde boom', caption:'Een eeuwenoude reuzenboom met een vriendelijk gezicht en een heilig touw om zijn stam. Ervoor staat een rode poort en overal zweven lichtjes: de geesten van de natuur. Op de vlag staan drie driehoeken.', note:'BEZIELDE NATUUR' },
    { title:'Een paard en een sprookje', short:'Epona en Peter Pan', label:'KELTISCHE MYTHEN · WESTERSE SPROOKJES', icon:'❧', aside:'Twee oude bronnen', caption:'Kies hieronder: een paard bij oude Keltische stenen, of een jongen in een groene tuniek die met een klein elfje over de daken vliegt.', note:'KIES ER EEN', variants:[{ id:'epona', label:'Het paard Epona' }, { id:'peterpan', label:'Peter Pan' }] },
    { title:'Een oud verhaal in een nieuw jasje', short:'Een nieuw jasje', label:'OOST EN WEST · SAMEN IN ÉÉN GAME', icon:'✳', aside:'Alles komt samen', caption:'Drie linten komen samen in één scherm: een poort uit Japan, een zwaard uit de ridderverhalen en een sprookjesboek. Samen vormen ze de wereld van Zelda.', note:'ALLES KOMT SAMEN' },
  ],
  dictionary: {
    relikwie:'Een heilig voorwerp dat heel oud en heel kostbaar is.',
    'reïncarnatie':'Het idee dat iemand na zijn dood steeds opnieuw geboren wordt.',
    veroveraar:'Iemand die met geweld landen of gebieden in zijn macht wil krijgen.',
    zwijgzame:'Iemand die bijna nooit iets zegt.',
    sokkel:'Een stevig blok waar iets bovenop staat, zoals een standbeeld.',
    rechtmatige:'Degene die er volgens de regels echt recht op heeft.',
    bezield:'Met een eigen geest of ziel, alsof het leeft.',
    familiewapen:'Een teken dat bij een familie hoort, vaak op een schild of vlag.',
    vruchtbaarheid:'Het laten groeien van nieuw leven, zoals jonge dieren of gewassen op het land.',
    samensmelting:'Het samenvoegen van verschillende dingen tot één geheel.',
  },
  questions: [
    { q:'Waar staan de drie driehoeken van de Triforce voor?', options:['Kracht, Wijsheid en Moed.','Kracht, Snelheid en Geluk.','Hyrule, Japan en Europa.','Bomen, bergen en rivieren.'], answer:0, chapter:0, explanation:'In het eerste hoofdstuk staat dat de Triforce bestaat uit drie driehoeken die staan voor Kracht, Wijsheid en Moed.' },
    { q:"'Dit zwaard zit muurvast in een stenen sokkel.' Wat betekent 'muurvast' hier?", options:['Het hangt aan de muur van een tempel.','Het zit zo vast dat het bijna niet los kan.','Het is net als een muur van steen gemaakt.','Het ligt achter een muur in een diep bos.'], answer:1, chapter:1, explanation:'Muurvast betekent heel erg vast. Het zwaard zit zo stevig in de sokkel dat alleen de uitverkoren held het eruit kan trekken.' },
    { q:'Wat geloven mensen in het shintoïsme?', options:['Dat alleen tempels door goden worden bewoond.','Dat een zwaard in een steen altijd een koning kiest.','Dat de Triforce ooit uit de hemel is gevallen.','Dat de hele natuur door geesten wordt bewoond.'], answer:3, chapter:2, explanation:'De tekst zegt dat men in het shintoïsme gelooft dat de hele natuur bezield is: bomen, bergen, rivieren en bossen worden bewoond door geesten, de kami.' },
    { q:'Waar lijkt het ontwerp van de Triforce sterk op?', options:['Op het schild van Koning Arthur.','Op de bladeren van een heilige reuzenboom.','Op het wapen van een samoeraiclan.','Op een Keltisch teken voor paarden.'], answer:2, chapter:2, explanation:'Volgens de tekst lijkt het ontwerp met drie driehoeken sterk op het historische familiewapen van de machtige Hojo-samoeraiclan.' },
    { q:'Naar wie is Links paard Epona vernoemd?', options:['Naar een Keltische godin.','Naar de moeder van Miyamoto.','Naar het paard van Koning Arthur.','Naar een Japanse natuurgeest.'], answer:0, chapter:3, explanation:'Epona is vernoemd naar de Keltische godin van de paarden en de vruchtbaarheid.' },
    { q:'Waarom heeft Link een groene tuniek en een klein elfje bij zich?', options:['Omdat groen de kleur van de Triforce van Moed is.','Omdat Epona in het donkere bos niet goed kan zien.','Omdat het elfje een kami uit het shintoïsme is.','Omdat Miyamoto zich liet inspireren door Peter Pan.'], answer:3, chapter:3, explanation:'Dit is oorzaak en gevolg: bedenker Shigeru Miyamoto liet zich voor het uiterlijk van Link inspireren door Peter Pan. Daarom lijken de groene tuniek en het elfje op Peter Pan en Tinkelbel.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Zelda is eigenlijk een kopie van de legende van Koning Arthur.','In Zelda komen oude verhalen uit oost en west samen.','Japanse games gaan bijna altijd over natuurgeesten en goden.','Zelda is vooral zo beroemd omdat het al sinds 1986 bestaat.'], answer:1, chapter:4, explanation:'De tekst laat zien hoe Zelda leent uit Koning Arthur, het shintoïsme, Keltische mythen en Peter Pan. Door die mix van oost en west ontstaat een rijke wereld.' },
  ],
  written: [
    { q:'Volgens de inleiding en het slot voelt het fantasieverhaal van The Legend of Zelda "tijdloos en herkenbaar" aan. Hoe verklaart de schrijver dit?', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'Volgens de schrijver is dat geen toeval. De Japanse makers verwerkten talloze eeuwenoude mythen en legendes uit de hele wereld in het spel, zoals Koning Arthur, het shintoïsme, Keltische mythen en Peter Pan. Zo vertelt Zelda eigenlijk een oeroud verhaal over goed en kwaad, maar in een modern, interactief jasje. Omdat we die oude verhalen al kennen, voelt het herkenbaar.' },
    { q:'In de tweede alinea wordt het Master Sword vergeleken met de legende van Koning Arthur. Welke concrete overeenkomst noemt de tekst, en wat bewijst het personage in beide verhalen door deze proef te doorstaan?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'In beide verhalen zit een zwaard vast in steen, en alleen de uitverkorene kan het eruit trekken. Arthur bewees daarmee dat hij de rechtmatige koning was. Link bewijst dat hij de uitverkoren held is, die waardig genoeg is om het kwaad te verslaan.' },
  ],
  quiz: { mcEyebrow: 'JOUW MYTHEKENNIS', mcHeading: 'Tijd voor de mythequiz, Alex.' },
  completion: {
    heading: ['Waardig bevonden,', '*held Alex.*'],
    text: 'Van Koning Arthur en de Japanse kami tot Epona en Peter Pan: jij weet nu welke oeroude verhalen er in Hyrule verstopt zitten. Kracht, wijsheid én moed: jij hebt ze alle drie. Papa is trots op je!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
