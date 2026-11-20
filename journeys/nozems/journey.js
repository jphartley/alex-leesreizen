// Vetkuiven en leren jacks: how the nozems became the first real youth culture in the Netherlands in the 1950s.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'nozems',
  name: 'De nozems',
  number: '21',
  meta: { title: 'Vetkuiven en leren jacks: De opkomst van de nozems', description: "Hoe de nozems in de jaren '50 de allereerste echte jeugdcultuur van Nederland werden. Een interactief Nederlands leesavontuur voor Alex." },
  card: { title: 'Vetkuiven en *leren jacks*', blurb: "Brommers, petticoats en rock-'n-roll. Ontdek hoe de nozems de eerste echte jeugdcultuur van Nederland werden." },
  home: {
    label: 'LEESREIS 21 · NEDERLAND', greeting: 'Hé Alex, zet de radio maar aan!', heading: ['Vetkuiven en', '*leren jacks.*'],
    description: "Brommers, rock-'n-roll en spijkerbroeken. Ontdek hoe de nozems in de jaren '50 de allereerste echte jeugdcultuur van Nederland werden.",
    cta: 'Begin je reis', location: 'AMSTERDAM, NEDERLAND', stamp: ['ROCK', 'Nozems', "JAREN '50"],
    caption: 'Waar jongeren hun eigen stijl vonden.', routeHeading: "Jouw route door de jaren '50",
  },
  chapters: [
    { title:'Een compleet nieuwe groep', short:'De nozems', label:"NEDERLAND · DE JAREN '50", icon:'✦', aside:'Er gebeurt iets nieuws in de stad', caption:'Een bouwkraan helpt mee aan de wederopbouw. Op straat staat een jongen met een vetkuif naast zijn brommer. Hoor je de muziek uit het radiootje?', note:'DE REIS BEGINT' },
    { title:'Eindelijk eigen geld', short:'Eigen geld', label:'DE ECONOMIE · VOOR HET EERST EIGEN LOON', icon:'¤', aside:'Een loonzakje voor jezelf', caption:'De fabriek draait weer en er zit geld in het loonzakje. Kijk eens wat erboven zweeft: wat zou jij ermee doen?', note:'KIJK EENS GOED' },
    { title:'Een vleugje Amerika', short:'De stijl', label:'BIOSCOOP & RADIO · UIT DE VERENIGDE STATEN', icon:'♫', aside:'Wat trek jij aan?', caption:'Een leren jack, een spijkerbroek en een pot haarvet, of juist een petticoat. Tik hieronder en kijk aan het kledingrek.', note:'STOER GEKLEED', variants:[{ id:'jongens', label:'Jongens' }, { id:'meiden', label:'Meiden' }] },
    { title:'Lol trappen op de brommer', short:'De brommers', label:'AMSTERDAM · DE NIEUWENDIJK', icon:'✺', aside:'Rondscheuren door de stad', caption:'Straatlantaarns, verlichte etalages en een brommer die flink herrie maakt. Hier hingen de nozems graag rond.', note:'JOUW EIGEN STIJL' },
  ],
  dictionary: {
    wederopbouw:'Het opnieuw opbouwen van huizen, fabrieken en wegen die in de oorlog kapot waren gegaan.',
    jeugdcultuur:'Een eigen manier van kleden, muziek luisteren en doen die bij een groep jongeren hoort.',
    arbeidersgezinnen:'Gezinnen waarin de ouders met hun handen werkten, bijvoorbeeld in een fabriek.',
    maatschappij:'Alle mensen in een land samen, met hun regels en gewoontes.',
    inspiratie:'Een idee of voorbeeld waardoor je zin krijgt om zelf iets te doen.',
    brutaal:'Iets durven wat anderen niet netjes of niet gepast vinden.',
    petticoats:'Wijde onderrokken waardoor een rok of jurk mooi opbolt.',
    herrieschoppers:'Mensen die veel lawaai maken en ruzie zoeken.',
    identiteit:'Wie je bent en wat jou anders maakt dan anderen.',
  },
  questions: [
    { q:"Waar was Nederland in de jaren '50 vooral druk mee bezig?", options:['Met het bouwen van bioscopen.','Met de wederopbouw na de oorlog.',"Met het maken van rock-'n-rollmuziek.",'Met brommers verkopen aan Amerika.'], answer:1, chapter:0, explanation:'De tekst begint ermee: na de Tweede Wereldoorlog was Nederland druk bezig met de wederopbouw. De volwassenen werkten hard.' },
    { q:'Waartegen zetten de jonge nozems zich af?', options:['Tegen de Amerikaanse films in de bioscoop.','Tegen de hippies en de provo’s.','Tegen de hoge prijzen van brommers.','Tegen de strenge maatschappij van hun ouders.'], answer:3, chapter:1, explanation:'De nieuwe generatie wilde vrijheid. Ze zetten zich af tegen de saaie, strenge maatschappij van hun ouders.' },
    { q:'Waar haalden de nozems hun inspiratie vandaan?', options:['Uit de Verenigde Staten.','Uit de kerk en de school.','Uit oude Nederlandse liedjes.','Uit de kleren van hun ouders.'], answer:0, chapter:2, explanation:'De nozems keken niet naar Nederland, maar naar Amerika. Via de bioscoop en de radio leerden ze Amerikaanse acteurs en muziek kennen.' },
    { q:'Waarom was het zo opvallend dat meiden een spijkerbroek droegen?', options:['Omdat spijkerbroeken toen heel duur waren.','Omdat jongens die broeken niet mochten dragen.','Omdat vrouwen vroeger alleen rokken droegen.','Omdat James Dean nooit een spijkerbroek droeg.'], answer:2, chapter:2, explanation:'Voor het eerst droegen jongens én meiden spijkerbroeken. Dat was brutaal, want vrouwen droegen daarvoor alleen rokken of jurken.' },
    { q:'Waar hingen de nozems in Amsterdam vaak rond?', options:['In de bioscoop bij het Leidseplein.','Op straat, op de Nieuwendijk.','In de kerk, na de dienst.','In de fabriek van hun ouders.'], answer:1, chapter:3, explanation:'De tekst noemt de Nieuwendijk in Amsterdam. Daar hingen de nozems vaak rond op straat.' },
    { q:'Soms gingen de nozems *op de vuist* met elkaar. Wat betekent dat?', options:['Ze schudden elkaar netjes de hand.','Ze staken hun vuist op om te zwaaien.','Ze speelden samen een potje kaart.','Ze gingen met elkaar vechten.'], answer:3, chapter:3, explanation:'Op de vuist gaan betekent vechten. De tekst zegt dat het rondhangen soms uit de hand liep.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['De nozems maakten de weg vrij voor jongeren met een eigen stijl.','De nozems zorgden ervoor dat Nederland na de oorlog werd herbouwd.','De nozems wilden net zo leven als hun strenge, hardwerkende ouders.',"De nozems bedachten zelf de rock-'n-roll en de spijkerbroek."], answer:0, chapter:3, explanation:'De nozems waren de eerste echte jeugdcultuur in Nederland. Volwassenen vonden ze herrieschoppers, maar ze maakten de weg vrij voor jongeren om hun eigen stijl en identiteit te kiezen.' },
  ],
  written: [
    { q:"In de tekst wordt uitgelegd dat de nozemcultuur halverwege de jaren '50 kon ontstaan omdat de economie in Nederland langzaam verbeterde. Leg in je eigen woorden uit hoe deze economische groei zorgde voor het ontstaan van de nozems.", label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Omdat het beter ging met de economie, hadden jongeren uit arbeidersgezinnen voor het eerst wat eigen geld. Ze hoefden niet meer al hun loon thuis in te leveren. Met dat geld konden ze zelf keuzes maken, bijvoorbeeld naar de bioscoop gaan of muziek luisteren. Zo konden ze hun vrijheid zoeken en zich afzetten tegen de strenge wereld van hun ouders.' },
    { q:'De nozems en de latere hippies kwamen allebei in opstand tegen de wereld van de oudere generatie, maar ze deden dit op een heel andere manier. Wat was volgens de tekst het grote verschil in wat ze wilden bereiken (hun doel)?', label:'TEKSTBEGRIP & ANALYSE', chapter:3, model:'De hippies hadden grote politieke doelen: zij wilden de wereld verbeteren. De nozems hadden die doelen niet en voerden geen actie. Zij wilden gewoon lol trappen, ontsnappen aan de regels en hard rondscheuren op hun brommers.' },
  ],
  quiz: { mcEyebrow: 'JOUW NOZEMKENNIS', mcHeading: "Tijd voor de rock-'n-rollquiz, Alex." },
  completion: {
    heading: ['Goed gedaan,', "*rock-'n-roller Alex.*"],
    text: 'Van loonzakjes tot vetkuiven en brommers: jij weet nu hoe de nozems de weg vrijmaakten voor een eigen stijl. Deze plaat draait speciaal voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
