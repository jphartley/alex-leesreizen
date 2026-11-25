// De complexe tijdlijn van The Legend of Zelda: how all the main games form one timeline, from Skyward
// Sword and the eternal curse to Ganondorf and Ganon, the three-way split after Ocarina of Time, and the
// question whether Link and Zelda ever marry.
// The hero scene doubles as a small rally game on desktop (bat Ganondorf's light ball back three times to
// free Zelda, after which Link and Zelda marry); see motion.js.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'zelda-tijdlijn',
  name: 'Zelda-tijdlijn',
  number: '23',
  meta: { title: 'De complexe tijdlijn van The Legend of Zelda', description: 'Hoe passen alle Zelda-spellen in één grote tijdlijn? Een interactief Nederlands leesavontuur voor Alex, met een spelletje waarin Link prinses Zelda bevrijdt en eindelijk met haar trouwt.' },
  card: { title: 'De complexe tijdlijn *van Zelda*', blurb: 'Van een eeuwige vloek en de splitsing in drie tot de vraag of Link en Zelda ooit trouwen.' },
  home: {
    label: 'LEESREIS 23 · GAMES', greeting: 'Hé Alex, kun jij de tijdlijn volgen?', heading: ['De complexe tijdlijn', 'van *Zelda.*'],
    description: 'Waarom is er in bijna elk spel een nieuwe Link? En trouwen Link en Zelda ooit? Lees hoe alle Zelda-spellen samen één groot verhaal vormen. En help Link om Zelda te bevrijden, dan wacht er een verrassing!',
    cta: 'Begin je tijdreis', location: 'HYRULE · EEN EEUWIGE STRIJD', stamp: ['TIJDREIS', 'Hyrule', 'DOOR DE EEUWEN'],
    caption: 'Kaats de lichtbal terug en bevrijd Zelda.', routeHeading: 'Jouw route door de tijdlijn',
  },
  chapters: [
    { title:'Eén grote tijdlijn', short:'Eén tijdlijn', label:'HYRULE · ALLE SPELLEN SAMEN', icon:'✦', aside:'Een eeuwige strijd', caption:'Boven Hyrule loopt een gouden tijdlijn die zich in drieën splitst. Ganondorf houdt prinses Zelda gevangen in een kristal, en Link staat klaar met zijn zwaard. Op de startpagina kun je Link helpen.', note:'DE REIS BEGINT' },
    { title:'Waar alles begint', short:'Skyward Sword', label:'SKYWARD SWORD · 2011', icon:'❖', aside:'Drie draden, één vloek', caption:'Hoog boven de wolken glanst een nieuw gesmeed zwaard. Daaronder draaien drie draden om elkaar heen: groen voor de held, goud voor de godin en paars voor de demon. Door de vloek komen ze nooit meer los.', note:'HET BEGIN' },
    { title:'Twee gedaanten', short:'Ganondorf en Ganon', label:'DE WOESTIJN VAN DE GERUDO', icon:'◐', aside:'Mens of monster?', caption:'Links staat Ganondorf met zijn gouden kroon in de woestijn. Rechts zie je Ganon, het zwijnachtige monster, onder een donkere hemel. Kijk goed: wat is er anders?', note:'VERGELIJK' },
    { title:'Drie tijdlijnen', short:'De splitsing', label:'NA OCARINA OF TIME', icon:'❧', aside:'Eén spel, drie wegen', caption:'Kies hieronder: de plek waar de tijdlijn zich in drieën splitst, of een verre toekomst waarin de oude verhalen zijn vervaagd tot mythen.', note:'KIES ER EEN', variants:[{ id:'splitsing', label:'De splitsing' }, { id:'toekomst', label:'De verre toekomst' }] },
    { title:'Trouwen ze ooit?', short:'Link en Zelda', label:'EEN VRAAG VAN FANS', icon:'♡', aside:'Een open einde', caption:'Link en Zelda staan samen op een heuvel bij zonsondergang. Boven hen zweeft een hart met een vraagteken. Is het vriendschap of liefde? Dat mag jij zelf invullen.', note:'VUL HET ZELF IN' },
  ],
  dictionary: {
    chronologische:'In de volgorde waarin dingen in de tijd gebeuren.',
    gesmeed:'Gemaakt van heet metaal door het met een hamer in vorm te slaan.',
    vloek:'Een boze wens die iemand met magie over een ander uitspreekt.',
    'reïncarnaties':'Mensen die na hun dood opnieuw geboren worden in een nieuw lichaam.',
    gedaanten:'De vormen of lichamen waarin iemand zich laat zien.',
    ambitieuze:'Iemand die heel graag iets groots wil bereiken, zoals macht.',
    strateeg:'Iemand die slim plannen bedenkt om te winnen.',
    gereduceerd:'Teruggebracht tot iets kleiners of eenvoudigers.',
    opoffering:'Iets heel belangrijks opgeven om een ander te helpen.',
    huwelijksbootje:'In het huwelijksbootje stappen betekent: met elkaar trouwen.',
  },
  questions: [
    { q:'Wat is er volgens de eerste alinea vreemd aan de Zelda-spellen?', options:['De hoofdpersonen hebben in elk spel een andere naam.','De werelden sluiten vaak niet op elkaar aan.','Het verhaal speelt zich bijna nooit in Hyrule af.','Er bestaat helemaal geen officiële tijdlijn.'], answer:1, chapter:0, explanation:'De tekst zegt dat de werelden en gebeurtenissen vaak totaal niet op elkaar lijken aan te sluiten, terwijl de hoofdpersonen bijna altijd Link en Zelda heten.' },
    { q:'Met welk spel begint de geschiedenis van Hyrule?', options:['Met het allereerste spel uit 1986.','Met Ocarina of Time.','Met Breath of the Wild.','Met Skyward Sword uit 2011.'], answer:3, chapter:1, explanation:'Het beginpunt is niet het eerste spel uit 1986, maar Skyward Sword uit 2011. Daarin ontstaat Hyrule en wordt het Master Sword gesmeed.' },
    { q:'Waardoor verandert Ganondorf in Ganon?', options:['Doordat Link hem met het Master Sword raakt.','Doordat de godin een vloek over hem uitspreekt.','Doordat hij de kracht van de Triforce misbruikt.','Doordat hij eeuwen in de woestijn moet wachten.'], answer:2, chapter:2, explanation:'Dit is oorzaak en gevolg: als Ganondorf wordt overgenomen door duistere magie of de kracht van de Triforce misbruikt, verandert hij in Ganon.' },
    { q:'Waarom splitst de tijdlijn zich na Ocarina of Time in drieën?', options:['Omdat Link in dat spel door de tijd heen reist.','Omdat Hyrule in dat spel helemaal overstroomt.','Omdat Zelda in dat spel drie keer wordt geboren.','Omdat Ganondorf in dat spel de Triforce breekt.'], answer:0, chapter:3, explanation:'De tekst zegt: omdat Link in Ocarina of Time door de tijd reist, splitst de tijdlijn zich daarna op in drie richtingen.' },
    { q:"'Alle oude gebeurtenissen zijn vervaagd tot verre mythen.' Wat betekent 'vervaagd' hier?", options:['Ze zijn in Breath of the Wild opnieuw gebeurd.','Ze zijn onduidelijk geworden.','Ze zijn opgeschreven in een oud boek.','Ze zijn door de vloek verboden.'], answer:1, chapter:3, explanation:'Vervaagd betekent dat iets steeds minder duidelijk wordt. De oude gebeurtenissen zijn zo lang geleden dat ze alleen nog als vage verhalen bestaan.' },
    { q:'Waarom laat Nintendo de relatie tussen Link en Zelda bewust open?', options:['Omdat Zelda in de spellen al met een ander getrouwd is.','Omdat fans pas sinds kort over hun band nadenken.','Omdat Link en Zelda elkaar in de spellen nooit ontmoeten.','Zodat elke speler zelf kan invullen wat hun band is.'], answer:3, chapter:4, explanation:'Volgens de tekst zijn Link en Zelda vooral verbonden door plicht en het lot. Zo kan elke speler zelf bedenken of hun band vriendschappelijk of romantisch is.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['De Zelda-spellen verschillen veel, maar vormen samen één tijdlijn.','De Zelda-spellen gaan vooral over de liefde tussen Link en Zelda.','Ganondorf is in elk Zelda-spel een slimme en sluwe strateeg.','Je moet de Zelda-spellen spelen in de volgorde van verschijnen.'], answer:0, chapter:0, explanation:'De tekst legt uit dat de spellen er heel verschillend uitzien, maar dat ze samen één grote tijdlijn vormen, met steeds dezelfde thema’s: moed, opoffering en de strijd tussen licht en duisternis.' },
  ],
  written: [
    { q:'Waarom speel je in de meeste Zelda-spellen steeds met een nieuwe Link en Zelda, in plaats van dat dezelfde twee personages alle avonturen beleven?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Dat komt door een eeuwige vloek. Aan het einde van Skyward Sword spreekt een demonenkoning die vloek uit. Daardoor zijn de geest van de held (Link), de bloedlijn van de godin (Zelda) en de haat van de demon voor altijd met elkaar verbonden. Telkens als het kwaad eeuwen later terugkeert, worden er een nieuwe Link en een nieuwe Zelda geboren. Het zijn dus reïncarnaties die hetzelfde lot delen.' },
    { q:'Wat is volgens de derde alinea het verschil tussen Ganondorf en Ganon, zowel qua uiterlijk als qua gedrag?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Ganondorf is zijn menselijke vorm: hij ziet eruit als een mens, een koning van het woestijnvolk de Gerudo. Hij gedraagt zich sluw en ambitieus, als een slimme strateeg. Ganon is een monsterlijke, zwijnachtige demon. Hij gedraagt zich als een razend monster dat alleen maar verwoest.' },
  ],
  quiz: { mcEyebrow: 'JOUW TIJDLIJNKENNIS', mcHeading: 'Tijd voor de tijdlijnquiz, Alex.' },
  completion: {
    heading: ['Tijdreis voltooid,', '*held Alex.*'],
    text: 'Van Skyward Sword tot ver in de toekomst: jij kunt de ingewikkelde tijdlijn van Zelda nu zelf uitleggen. Je weet waarom er steeds een nieuwe Link is en wat het verschil is tussen Ganondorf en Ganon. En trouwen Link en Zelda? In de games niet, maar op jouw startpagina wel! Papa is trots op je.',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
