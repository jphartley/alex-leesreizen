// Een legende keert terug: why Nintendo rebuilt Ocarina of Time (1998) for the Switch 2, what changed and what fans think.
// The hero scene doubles as a small melody game on desktop (play a tune back on the ocarina); see motion.js.
// Chapter 4's paragraph ends in a "- " list, which app.js renders as bullet points.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'ocarina',
  name: 'Ocarina of Time',
  number: '17',
  meta: { title: 'Een legende keert terug: De Ocarina of Time Remake', description: 'Waarom Nintendo een game uit 1998 helemaal opnieuw bouwde voor de Switch 2, en wat er veranderde. Een interactief Nederlands leesavontuur voor Alex, met een ocarina om zelf te bespelen.' },
  card: { title: 'Een legende *keert terug*', blurb: 'Na 28 jaar is Ocarina of Time terug. Waarom bouwde Nintendo de game opnieuw, en wat vinden de fans ervan?' },
  home: {
    label: 'LEESREIS 17 · GAMES', greeting: 'Hé Alex, kun jij een melodie onthouden?', heading: ['Een legende', 'keert *terug.*'],
    description: 'In 1998 noemden heel veel mensen Ocarina of Time de beste game aller tijden. Nu, 28 jaar later, is hij helemaal opnieuw gebouwd voor de Switch 2. Lees wat er veranderde. En speel zelf een melodie na op de ocarina!',
    cta: 'Begin je gamereis', location: 'NINTENDO · 1998 → 2026', stamp: ['1998', 'Remake', '2026'],
    caption: 'Een oude legende, een nieuwe melodie.', routeHeading: 'Jouw route door de remake',
  },
  chapters: [
    { title:'Een legende keert terug', short:'Een legende keert terug', label:'NINTENDO 64 EN SWITCH 2 · 1998 → 2026', icon:'♪', aside:'Een ocarina in het avondveld', caption:'Een ocarina van klei zweeft boven het gras, terwijl de zon ondergaat boven een groot, stil veld. Op de startpagina kun je hem zelf bespelen.', note:'DE REIS BEGINT' },
    { title:'Waarom een remake?', short:'Waarom een remake?', label:'NINTENDO · OUDE LIEFDE, NIEUWE SPELERS', icon:'❧', aside:'Twee generaties, één game', caption:'Wie in 1998 speelde, is nu volwassen. Misschien zelfs een papa. Naast hem zit een nieuwe speler met een gloednieuwe spelcomputer.', note:'TOEN EN NU' },
    { title:'Wat levert het op?', short:'Een meesterzet', label:'DE WINKEL EN DE BEURS · RECORDS', icon:'✳', aside:'Over de toonbank', caption:'Dozen die over de toonbank vliegen, en een lijn die omhoog schiet. Wat zou de tekst bedoelen met dat vliegen?', note:'KIJK EENS GOED' },
    { title:'Wat is er veranderd in de gameplay?', short:'Nieuw in de gameplay', label:'SWITCH 2 · VIER SLIMME TOEVOEGINGEN', icon:'✧', aside:'Vier slimme toevoegingen', caption:'Trouw aan het origineel, maar veel soepeler om te spelen. Kies hieronder welke toevoeging je wilt zien.', note:'KIES ER EEN', variants:[{ id:'springen', label:'Springknop' }, { id:'stemmen', label:'Stemacteurs' }, { id:'menu', label:'Snelmenu' }, { id:'logboek', label:'Logboek' }] },
    { title:'Wat vinden de fans?', short:'Wat vinden de fans?', label:'FANS EN RECENSENTEN · 96 UIT 100', icon:'☼', aside:'Een 96 uit 100', caption:'Juichende fans en een hoog cijfer. Maar kijk ook eens naar het poppetje met het grote hoofd in dat echte landschap, en naar het lege veld erachter.', note:'DE RECENSIES' },
  ],
  dictionary: {
    remake:'Een oude game of film die helemaal opnieuw wordt gemaakt, met de technieken van nu.',
    exemplaren:'Losse stuks van hetzelfde ding, zoals losse dozen van dezelfde game.',
    producent:'Iemand die de leiding heeft bij het maken van een game of film.',
    nostalgie:'Het fijne, een beetje weemoedige gevoel als je terugdenkt aan vroeger.',
    meesterzet:'Een heel slimme zet of beslissing, zoals een meester bij het schaken die doet.',
    'pre-orders':'Bestellingen die mensen al doen voordat iets in de winkel ligt.',
    aandelen:'Kleine stukjes van een bedrijf die je kunt kopen. Gaat het goed met het bedrijf, dan worden ze meer waard.',
    beruchte:'Bekend om iets vervelends, gevaarlijks of heel moeilijks.',
    recensenten:'Mensen die een game, film of boek beoordelen en daar een stuk over schrijven.',
    lichaamsverhoudingen:'Hoe groot de delen van een lichaam zijn ten opzichte van elkaar, zoals een groot hoofd op een klein lijfje.',
  },
  questions: [
    { q:'Hoeveel exemplaren verkocht het originele Ocarina of Time uit 1998 wereldwijd?', options:['Zo’n 5 tot 6 miljoen.','Maar liefst 7,6 miljoen.','Precies 28 miljoen.','Bijna 96 miljoen.'], answer:1, chapter:0, explanation:'In het eerste hoofdstuk staat dat het origineel wereldwijd maar liefst 7,6 miljoen exemplaren verkocht. De 5 tot 6 miljoen gaat over de remake: zoveel verwachten kenners in de eerste maand.' },
    { q:'Wie is Eiji Aonuma volgens de tekst?', options:['Een van de nieuwe stemacteurs van de tussenfilmpjes.','Een recensent die de remake een 96 uit 100 gaf.','De jongste gamedesigner van het team.','Een producent van Nintendo.'], answer:3, chapter:1, explanation:'De tekst noemt hem *Nintendo-producent* Eiji Aonuma. Hij is degene die uitlegde hoe het team over de remake dacht.' },
    { q:"Kenners verwachten dat er in de eerste maand zo’n 5 tot 6 miljoen kopieën 'over de toonbank zullen vliegen'. Wat bedoelt de tekst daarmee?", options:['Dat de dozen per vliegtuig naar de winkels worden gebracht.','Dat winkels de dozen niet snel genoeg kunnen uitpakken.','Dat er in korte tijd heel veel exemplaren verkocht worden.','Dat spelers de game na een maand terugbrengen naar de winkel.'], answer:2, chapter:2, explanation:'*Over de toonbank vliegen* is een uitdrukking. Iets wordt zo snel en zo vaak verkocht dat het lijkt alsof de dozen over de toonbank vliegen. Echt vliegen doen ze natuurlijk niet.' },
    { q:'Wat heeft Link na 28 jaar eindelijk gekregen?', options:['Een nieuw paard om veel sneller over het veld te rijden.','Een vaste knop op de controller om zelf te springen.','Een kaart die altijd laat zien waar hij is.','Een tweede ocarina om samen mee te spelen.'], answer:1, chapter:3, explanation:'De tekst zegt: het klinkt simpel, maar na 28 jaar heeft Link eindelijk een vaste knop op de controller om zelf te kunnen springen.' },
    { q:"Waarvoor is het nieuwe 'Threads of Time'-systeem bedoeld?", options:['Om op te zoeken wat je volgende opdracht is.','Om de tussenfilmpjes in een andere taal te bekijken.','Om sneller door Hyrule Field te rennen.','Om je score te vergelijken met die van andere spelers.'], answer:0, chapter:3, explanation:'Het is een soort logboek. Als je verdwaald bent, kun je daarin makkelijk nazoeken wat je volgende opdracht eigenlijk is.' },
    { q:'Waarom vinden sommige spelers dat de oude personages een beetje gek afsteken?', options:['Omdat de personages in de remake geen stemmen meer hebben.','Omdat Hyrule Field veel te vol staat met personages.','Omdat de game bij verzamelwebsites maar een 96 uit 100 kreeg.','Omdat ze tekenfilmachtig zijn in een heel echte wereld.'], answer:3, chapter:4, explanation:'Dit is oorzaak en gevolg: omdat de nieuwe graphics zó indrukwekkend, gedetailleerd en realistisch zijn, past dat soms een beetje gek bij de tekenfilmachtige lichaamsverhoudingen van de oude personages.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['De remake is mislukt, omdat fans de nieuwe graphics niet mooi vinden.','Oude games kun je beter niet opnieuw maken.','De remake is trouw aan het origineel, met slimme verbeteringen.','De Nintendo Switch 2 is de best verkochte spelcomputer ooit.'], answer:2, chapter:0, explanation:'De tekst vertelt waarom Nintendo de oude game opnieuw bouwde, wat er veranderde en wat fans ervan vinden. Er is een klein beetje kritiek, maar de meesten noemen het nu al de mooiste remake ooit.' },
  ],
  written: [
    { q:'Noem twee redenen uit de tekst waarom Nintendo heeft besloten om juist deze oude game in 2026 helemaal opnieuw op te bouwen.', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Eén reden is dat de jongere gamedesigners bij Nintendo enorm veel liefde en respect voor het origineel hadden. Ze wilden de nostalgie van de jaren negentig terugbrengen voor de spelers die nu volwassen zijn. Een tweede reden is dat ze de game speelbaar wilden maken voor een hele nieuwe generatie jongeren, want de oude, ingewikkelde besturing is niet meer van deze tijd. Je kunt ook noemen dat het financieel een meesterzet is: de pre-orders braken records en de aandelen van Nintendo gingen omhoog.' },
    { q:'Welke nieuwe toevoeging (gameplay-verandering) zorgt er specifiek voor dat het doorlopen van de Water Temple in de nieuwe versie minder frustrerend is dan in de game uit 1998?', label:'TEKSTBEGRIP & ANALYSE', chapter:3, model:'Dat zijn de slimme menu’s: het nieuwe, moderne snelmenu. Daarmee kun je je speciale voorwerpen, zoals de zware Iron Boots, direct aan- en uittrekken. Hierdoor is de beruchte en lastige Water Temple nu veel beter te doen.' },
  ],
  quiz: { mcEyebrow: 'JOUW GAMEKENNIS', mcHeading: 'Tijd voor de remakequiz, Alex.' },
  completion: {
    heading: ['Goed gespeeld,', '*legende Alex.*'],
    text: 'Van de Nintendo 64 uit 1998 tot de gloednieuwe Switch 2: jij weet nu waarom Ocarina of Time opnieuw is gebouwd, wat er veranderde en wat de fans ervan vinden. Deze melodie is voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
