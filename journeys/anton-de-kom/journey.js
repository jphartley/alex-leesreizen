// Anton de Kom: the Surinamese writer, activist and resistance hero (1898-1945).
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'anton-de-kom',
  name: 'Anton de Kom',
  number: '18',
  meta: { title: 'Anton de Kom: Strijder tegen onrecht', description: 'Het leven van Anton de Kom, schrijver, activist en verzetsheld. Een Nederlandse leesreis voor Alex.' },
  card: { title: 'Strijder tegen *onrecht*', blurb: 'Een schrijver uit Paramaribo, een beroemd boek en een moedige strijd. Lees het verhaal van Anton de Kom.' },
  home: {
    label: 'LEESREIS 18 · SURINAME & NEDERLAND', greeting: 'Hé Alex, vandaag lees je over een echte held.', heading: ['Strijder', 'tegen *onrecht.*'],
    description: 'Anton de Kom schreef het eerste geschiedenisboek over Suriname door een Surinamer, hielp arme mensen en verzette zich tegen de nazi’s. Lees rustig, en denk er gerust even over na.',
    cta: 'Begin met lezen', location: 'PARAMARIBO, SURINAME', stamp: ['MOED', 'De Kom', '1898–1945'],
    caption: 'Waar het verhaal van Anton begint.', routeHeading: 'Jouw route door zijn leven',
  },
  chapters: [
    { title:'Een jongen uit Paramaribo', short:'Paramaribo', label:'PARAMARIBO · 1898', icon:'❧', aside:'Houten huizen aan de rivier', caption:'Witte huizen met groene luiken, palmbomen en een kano op de rivier. Hier werd Anton geboren.', note:'DE REIS BEGINT' },
    { title:'Een boek dat alles veranderde', short:'Het boek', label:'NEDERLAND · 1921 TOT 1934', icon:'✎', aside:'Schrijven aan het bureau', caption:'Een typemachine, een kopje thee en een boek dat nog nooit zo geschreven was.', note:'KIJK EENS GOED' },
    { title:'Papa De Kom', short:'Papa De Kom', label:'PARAMARIBO · 1933', icon:'♡', aside:'Iedereen is welkom', caption:'Voor het huisje van Anton wachten mensen op raad en hulp. Zie je het bordje bij de deur?', note:'HELPEN WAAR HET KAN' },
    { title:'Verzet in de oorlog', short:'Het verzet', label:'NEDERLAND · 1940 TOT 1945', icon:'✦', aside:'Schrijven in het geheim', caption:'Een lamp in de nacht en een stapel kranten. Het verzet werkte stil en voorzichtig.', note:'MOEDIG TOT HET EINDE' },
  ],
  dictionary: {
    activist:'Iemand die zich actief inzet om iets in de samenleving te veranderen.',
    verzetsheld:'Iemand die moedig vocht tegen een vijand die het land onderdrukte.',
    kolonie:'Een gebied dat bestuurd wordt door een ander, vaak ver weg gelegen land.',
    afgeschaft:'Officieel gestopt, zodat het niet meer mag.',
    racisme:'Mensen slechter behandelen vanwege hun huidskleur of afkomst.',
    uitbuiting:'Mensen heel hard laten werken voor weinig of niets, zodat een ander er rijk van wordt.',
    adviesbureau:'Een kantoortje waar je terechtkunt voor raad en hulp.',
    verbannen:'Weggestuurd uit een land, en je mag er niet meer terugkomen.',
    illegale:'Verboden door de wet; deze krant werd in het geheim gemaakt.',
    concentratiekamp:'Een wreed gevangenkamp van de nazi’s, waar heel veel mensen zijn gestorven.',
  },
  questions: [
    { q:'Waarom kon Antons vader vertellen over de wrede tijd van de slavernij?', options:['Hij had er veel boeken over gelezen.','Hij was zelf nog als slaaf geboren.','Hij werkte als geschiedenisleraar.','Hij had de verhalen in Nederland gehoord.'], answer:1, chapter:0, explanation:'De tekst zegt dat Antons vader wél als slaaf was geboren. Hij had die tijd dus zelf meegemaakt.' },
    { q:'Wat bedoelt de tekst met een ‘gemengd huwelijk’?', options:['Een huwelijk tussen mensen van verschillende afkomst.','Een bruiloft met veel verschillende soorten eten.','Een huwelijk dat maar heel kort duurde.','Een bruiloft die in twee landen tegelijk werd gevierd.'], answer:0, chapter:1, explanation:'Anton kwam uit Suriname en Petronella was een witte Nederlandse. Zo’n huwelijk tussen mensen van verschillende afkomst was toen zeer ongewoon.' },
    { q:'Waarom vertrok Anton in 1921 naar Nederland?', options:['Hij wilde graag beroemd worden als schrijver.','Hij wilde Petronella opzoeken, die hij al een tijd kende.','Hij moest daar zijn diploma’s gaan halen.','Door racisme kreeg hij in Suriname geen eerlijke kans.'], answer:3, chapter:1, explanation:'Dit is oorzaak en gevolg: Anton had zijn diploma’s, maar door ongelijkheid en racisme kreeg hij geen eerlijke kans. Daarom vertrok hij.' },
    { q:'Waarom ging Anton begin 1933 tijdelijk terug naar Suriname?', options:['Om een nieuw boek te schrijven.','Om een demonstratie te leiden.','Om zijn zieke moeder te bezoeken.','Om er te gaan wonen met Petronella.'], answer:2, chapter:2, explanation:'De tekst zegt dat Anton terugkeerde om zijn zieke moeder te bezoeken. Daar opende hij ook zijn adviesbureau.' },
    { q:'Hoe kwam Anton aan de bijnaam ‘papa De Kom’?', options:['Hij hielp veel arme Surinamers.','Hij had zelf heel veel kinderen.','Zo noemde zijn vader hem altijd.','Hij was de oudste schrijver van Suriname.'], answer:0, chapter:2, explanation:'Anton opende een adviesbureau voor arme Surinamers en hielp zoveel mensen dat ze hem ‘papa De Kom’ gingen noemen.' },
    { q:'Wat deed Anton tijdens de Tweede Wereldoorlog?', options:['Hij ging terug naar Suriname.','Hij werkte als soldaat in het Duitse leger.','Hij ging in het verzet en schreef voor De Vonk.','Hij stopte met schrijven en bleef veilig thuis.'], answer:2, chapter:3, explanation:'De tekst vertelt dat Anton zich aansloot bij het verzet tegen de nazi’s en onder andere schreef voor de illegale krant De Vonk.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Anton de Kom was vooral beroemd om zijn adviesbureau.','Het leven in Suriname was vroeger makkelijk.','Anton de Kom woonde liever in Nederland dan in Suriname.','Anton de Kom streed zijn hele leven moedig tegen onrecht.'], answer:3, chapter:3, explanation:'Of het nu in Suriname of in Nederland was: Anton bleef zich inzetten tegen onrecht. Daarom wordt hij nu breed geëerd om zijn moedige, levenslange strijd.' },
  ],
  written: [
    { q:'Waarom was de publicatie van het boek Wij slaven van Suriname in 1934 zo bijzonder voor die tijd?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Het was het allereerste geschiedenisboek over Suriname dat door een Surinamer zelf was geschreven. Bovendien wisten Nederlanders toen heel weinig over het slavernijverleden en de uitbuiting in Suriname. Met dit boek vertelde Anton dat verhaal zelf.' },
    { q:'Anton de Kom zette zich graag in voor anderen, maar dit had in Suriname zware gevolgen voor hem. Waarom werd hij door de regering uiteindelijk uit Suriname verbannen?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Anton hielp met zijn adviesbureau zoveel arme Surinamers dat hij veel invloed kreeg. De koloniale regering werd bang dat die invloed zou leiden tot een grote opstand. Daarom werd hij opgesloten. Zelfs een grote demonstratie voor zijn vrijlating hielp niet: hij werd voorgoed verbannen.' },
  ],
  quiz: { mcEyebrow: 'WAT WEET JIJ NOG?', mcHeading: 'Tijd voor de vragen, Alex.' },
  completion: {
    heading: ['Goed gelezen,', '*Alex.*'],
    text: 'Jij kent nu het verhaal van Anton de Kom: een schrijver die opkwam voor anderen, ook toen dat gevaarlijk was. Fijn dat je zo goed hebt nagedacht over dit belangrijke verhaal. Deze bloemen zijn voor hem.',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
