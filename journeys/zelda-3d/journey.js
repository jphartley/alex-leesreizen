// De 3D-revolutie van Zelda: why Ocarina of Time (1998) is still seen as revolutionary, from its two
// predecessors to Z-targeting, the context-sensitive button and the day-night cycle.
// The hero scene doubles as a small Z-targeting game on desktop (lock on, circle and strike); see motion.js.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'zelda-3d',
  name: 'Zelda in 3D',
  number: '20',
  meta: { title: 'De 3D-revolutie van Zelda: Ocarina of Time', description: 'Waarom Ocarina of Time uit 1998 nog steeds een van de meest revolutionaire games aller tijden is. Een interactief Nederlands leesavontuur voor Alex, met een spelletje om zelf monsters te richten.' },
  card: { title: 'De 3D-revolutie *van Zelda*', blurb: 'Hoe Ocarina of Time in 1998 de games van nu veranderde, van Z-targeting tot dag en nacht.' },
  home: {
    label: 'LEESREIS 20 · GAMES', greeting: 'Hé Alex, kun jij goed richten?', heading: ['De 3D-revolutie', 'van *Zelda.*'],
    description: 'In 1998 kon je voor het eerst een enorm koninkrijk in 3D verkennen. Lees welke slimme uitvindingen Ocarina of Time zo bijzonder maakten. En probeer zelf de monsters te richten met de Z-toets!',
    cta: 'Begin je gamereis', location: 'NINTENDO 64 · 1998', stamp: ['1998', '3D', 'Zelda'],
    caption: 'Eén druk op Z, en je doel staat vast.', routeHeading: 'Jouw route door de 3D-revolutie',
  },
  chapters: [
    { title:'Een revolutie in 3D', short:'Een revolutie in 3D', label:'NINTENDO 64 · 1998', icon:'✧', aside:'Een held op een open veld', caption:'Een held oefent op een strooien pop, met een gouden richtkruis eromheen. Op de startpagina kun je zelf monsters richten met de Z-toets.', note:'DE REIS BEGINT' },
    { title:'Twee grote voorgangers', short:'Twee voorgangers', label:'1991 EN 1996 · VAN 2D NAAR 3D', icon:'❧', aside:'Van 2D naar 3D', caption:'Links een platte wereld, van bovenaf gezien. Rechts een figuurtje dat met een joystick door de ruimte rent. Samen worden ze één groot koninkrijk in 3D.', note:'TWEE VOORGANGERS' },
    { title:'Het probleem met het zwaard', short:'Z-targeting', label:'DE Z-KNOP · RICHTEN IN 3D', icon:'◎', aside:'Naast of raak?', caption:'Twee keer dezelfde held en hetzelfde monster. Kies hieronder en vergelijk: wat is er anders?', note:'VERGELIJK', variants:[{ id:'zonder', label:'Zonder Z' }, { id:'met', label:'Met Z-targeting' }] },
    { title:'De slimme A-knop', short:'De slimme A-knop', label:'ÉÉN KNOP · VEEL ACTIES', icon:'✳', aside:'Eén knop, veel acties', caption:'Dezelfde knop, maar steeds een andere actie. Kies hieronder waar de held staat.', note:'KIES ER EEN', variants:[{ id:'kist', label:'Voor een kist' }, { id:'blok', label:'Naast een blok' }] },
    { title:'Dag en nacht', short:'Dag en nacht', label:'HET DORP · ALS DE ZON ONDERGAAT', icon:'☾', aside:'Als de zon ondergaat', caption:'Links is het dag en is de winkel open. Rechts is de zon onder: de luiken zijn dicht en er kruipen monsters uit de grond.', note:'DE WERELD LEEFT' },
  ],
  dictionary: {
    driedimensionaal:'Met lengte, breedte én diepte, zodat je er echt omheen en doorheen kunt lopen.',
    revolutionaire:'Zo nieuw en anders dat alles erna verandert.',
    personage:'Een figuur in een game, boek of film, zoals de held die je bestuurt.',
    onhandig:'Lastig en niet makkelijk om te doen.',
    inschatten:'Zonder te meten bedenken hoe ver, groot of veel iets is.',
    cirkelen:'In een rondje om iets heen bewegen.',
    richtsysteem:'Een slimme manier in een game om precies op je doel te mikken.',
    contextgevoelige:'Iets wat anders werkt, afhankelijk van waar je bent of wat er om je heen is.',
    nachtcyclus:'Het steeds terugkerende rondje van dag naar nacht en weer terug.',
    definitieve:'Blijvend; het staat vast en verandert niet meer.',
  },
  questions: [
    { q:'Wat konden spelers in Ocarina of Time voor het eerst doen?', options:['Online met vrienden tegen elkaar vechten.','Als Link een enorm 3D-koninkrijk verkennen.','Met blokken een eigen koninkrijk bouwen.','Met een joystick door een platte 2D-wereld rennen.'], answer:1, chapter:0, explanation:'In het eerste hoofdstuk staat dat spelers voor het eerst als de held Link een enorm, driedimensionaal koninkrijk konden verkennen.' },
    { q:'Wat wilden de makers overnemen van A Link to the Past uit 1991?', options:['De camera die vastklikt op een vijand.','Een A-knop die steeds iets anders doet.','De winkels die ’s nachts dichtgaan.','Het magische avontuurgevoel en het verhaal.'], answer:3, chapter:1, explanation:'De tekst zegt dat de makers het magische avontuurgevoel en het verhaal van de populaire 2D-game A Link to the Past naar een 3D-wereld wilden overbrengen.' },
    { q:"'Ocarina of Time bouwde voort op twee grote voorgangers.' Wat betekent 'voorgangers' hier?", options:['Games die al eerder uitkwamen.','Spelers die de game als eerste uitspeelden.','Monsters die voor Link uit lopen.','Makers die bij Nintendo de leiding hadden.'], answer:0, chapter:1, explanation:'Voorgangers zijn hier games die eerder kwamen: A Link to the Past uit 1991 en Super Mario 64 uit 1996. Ocarina of Time bouwde daarop voort.' },
    { q:'Wat zegt de tekst over de 3D-actiegames van nu?', options:['Ze hebben allemaal een echte dag- en nachtcyclus.','Ze gebruiken geen zwaarden of monsters meer.','Bijna allemaal gebruiken ze zo’n richtsysteem.','Ze werken alleen met de controller van Nintendo.'], answer:2, chapter:2, explanation:'De tekst zegt dat vrijwel elke 3D-actiegame tegenwoordig nog steeds een variant van dit richtsysteem gebruikt.' },
    { q:'Waarom bleef de besturing van Ocarina of Time simpel?', options:['Omdat elke actie een eigen knop op de controller kreeg.','Omdat de A-knop deed wat bij de plek paste.','Omdat je alleen kisten kon openmaken.','Omdat de controller maar één knop had.'], answer:1, chapter:3, explanation:'Dit is oorzaak en gevolg: de A-knop veranderde op basis van waar je stond. Voor een kist deed je hem open, naast een blok ging je duwen. Zo had je niet voor elke actie een eigen knop nodig.' },
    { q:'Wat gebeurde er in het spel als de zon onderging?', options:['De winkels in het dorp gingen juist open.','Link viel in slaap tot de volgende ochtend.','Alle monsters verdwenen onder de grond.','De winkels sloten en er kwamen monsters.'], answer:3, chapter:4, explanation:'In het laatste hoofdstuk staat: als de zon onderging, sloten de winkels in het dorp en kwamen er buiten gevaarlijke monsters uit de grond.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Met slimme vondsten legde Ocarina of Time de basis voor de games van nu.','Ocarina of Time was eigenlijk gewoon Super Mario 64 met een zwaard erbij.','Zwaardvechten in 3D was zo lastig dat bijna niemand het spel uitspeelde.','Oude 2D-games zoals A Link to the Past waren mooier dan alle 3D-games.'], answer:0, chapter:0, explanation:'De tekst laat zien welke vernieuwingen Ocarina of Time zo bijzonder maakten: Z-targeting, de slimme A-knop en dag en nacht. Daarmee legde het spel de basis voor de actie-avonturengames van nu.' },
  ],
  written: [
    { q:"Wat was het grote probleem met zwaardvechten in vroege 3D-games, en hoe loste het nieuwe 'Z-targeting'-systeem dit probleem op?", label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'In 3D moest je diepte inschatten. Daardoor sloeg je met je zwaard al snel naast je vijand. Met Z-targeting druk je op de Z-knop, en dan klikt de camera vast op de vijand. Zo kun je makkelijk om het monster heen cirkelen, achteruit springen om aanvallen te ontwijken en gericht terugslaan.' },
    { q:'De ontwerpers van Ocarina of Time lieten zich inspireren door Super Mario 64 (uit 1996). Wat had deze Mario-game al eerder met succes gedaan, wat de makers voor Zelda wilden gebruiken?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Super Mario 64 was het eerste spel dat bewees dat je een personage met een joystick soepel door een 3D-ruimte kon laten rennen. Die techniek leenden de makers van Ocarina of Time voor hun Zelda-game.' },
  ],
  quiz: { mcEyebrow: 'JOUW GAMEKENNIS', mcHeading: 'Tijd voor de 3D-quiz, Alex.' },
  completion: {
    heading: ['Raak gericht,', '*held Alex.*'],
    text: 'Van A Link to the Past en Super Mario 64 tot de Z-knop, de slimme A-knop en dag en nacht: jij weet nu waarom Ocarina of Time de gamewereld veranderde. Papa is trots op je!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
