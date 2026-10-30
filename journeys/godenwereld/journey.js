// De levende godenwereld: village gods, brand-new gods and gods that cross borders in Hinduism.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'godenwereld',
  name: 'De levende godenwereld',
  number: '14',
  meta: { title: 'De levende godenwereld', description: 'Van slangengodinnen tot de Visa-god: ontdek hoe de hindoeïstische godenwereld blijft groeien. Een leesreis voor Alex.' },
  card: { title: 'De levende *godenwereld*', blurb: 'Een slangengodin, een versierde motorfiets en een god die naar Japan reisde. Ontdek een godenwereld die blijft groeien.' },
  home: {
    label: 'LEESREIS 14 · INDIA', greeting: 'Hé Alex, hoeveel goden zou jij kunnen noemen?', heading: ['De levende', '*godenwereld.*'],
    description: 'Dorpsgoden, een motorfiets vol bloemenslingers en een god voor je visum. Ontdek hoe een eeuwenoude godenwereld nog elke dag verandert.',
    cta: 'Begin je ontdekkingsreis', location: 'INDIA · EEN DORPSTEMPEL', stamp: ['ONTDEK', 'India', 'LEES & VERWONDER'],
    caption: 'Waar lampjes branden en bloemen hangen.', routeHeading: 'Jouw route door de godenwereld',
  },
  chapters: [
    { title: 'Miljoenen goden', short: 'Een levende traditie', label: 'INDIA · HET HINDOEÏSTISCHE PANTHEON', icon: '❁', aside: 'Een tempel vol licht', caption: 'Bloemenslingers, olielampjes en wapperende vlaggetjes. Hier begint je reis door de godenwereld.', note: 'DE REIS BEGINT' },
    { title: 'Goden van het dorp', short: 'Grama Devatas', label: 'HET DORP · GODEN VOOR ELKE DAG', icon: '❧', aside: 'Een klein heiligdom onder een boom', caption: 'Onder een grote boom staat een klein altaar. Zie je de slang die er rustig omheen kronkelt?', note: 'KIJK EENS GOED' },
    { title: 'Gloednieuwe goden', short: 'Moderne goden', label: 'RAJASTHAN EN HYDERABAD · NIEUWE GODEN', icon: '✦', aside: 'Wat vereren mensen hier?', caption: 'Een versierde motorfiets langs de weg, of een tempel voor reizigers. Tik hieronder en kijk.', note: 'ONTDEK HET ZELF', variants: [{ id: 'bullet', label: 'Bullet Baba' }, { id: 'visa', label: 'Visa-god' }] },
    { title: 'Goden zonder grenzen', short: 'Over de grens', label: 'VAN INDIA TOT JAPAN', icon: '☼', aside: 'Een lange reis over zee', caption: 'Van een Indiase tempel naar een Japanse pagode. Volg het stippellijntje over het water.', note: 'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    voortdurend: 'Steeds weer, zonder op te houden.',
    oppermachtige: 'Met de allergrootste macht, machtiger dan alle anderen.',
    talloze: 'Zo veel dat je ze bijna niet kunt tellen.',
    alledaagse: 'Gewoon, zoals het elke dag voorkomt.',
    besmettelijke: 'Ziektes die je van iemand anders kunt krijgen.',
    vereren: 'Iemand of iets heel diep respecteren en aanbidden.',
    fenomeen: 'Een bijzonder verschijnsel of iets opvallends dat gebeurt.',
    visum: 'Een officiële toestemming om een ander land in te mogen, bijvoorbeeld om er te studeren.',
    boeddhistische: 'Horend bij het boeddhisme, een geloof dat begon met de lessen van Boeddha.',
    goddelijk: 'Zoals een god, of horend bij een god.',
  },
  questions: [
    { q: 'Hoeveel goden telt het hindoeïstische pantheon volgens de tekst?', options: ['Een paar honderd.', 'Precies twee: Ganesha en Shiva.', 'Miljoenen.', 'Zeven, één voor elke dag.'], answer: 2, chapter: 0, explanation: 'De tekst zegt dat het pantheon enorm is en miljoenen goden telt. Ganesha en Shiva zijn alleen twee bekende voorbeelden.' },
    { q: 'Wat bedoelt de tekst met ‘de godenwereld is geen gesloten, oud boek’?', options: ['De godenwereld is niet af: er kunnen nog steeds nieuwe goden bij komen.', 'Er bestaat geen enkel boek over het hindoeïsme.', 'Je mag de oude boeken over goden niet openslaan.', 'Alle goden zijn in één heel oud boek opgeschreven.'], answer: 0, chapter: 0, explanation: 'Een gesloten boek verandert niet meer. De tekst zegt juist dat het een levende traditie is die zich voortdurend aanpast en meegroeit.' },
    { q: 'Wat zijn ‘Grama Devatas’?', options: ['De machtigste goden van heel India.', 'Boeddhistische monniken uit Japan.', 'Oude tempels in de jungle.', 'Lokale dorpsgoden.'], answer: 3, chapter: 1, explanation: 'De tekst legt het zelf uit: Grama Devatas zijn lokale dorpsgoden. Ze helpen bij specifieke, alledaagse problemen.' },
    { q: 'Waarom bidden mensen in sommige regio’s tot de godin Manasa?', options: ['Om rijk te worden.', 'Om niet door een slang gebeten te worden in de jungle.', 'Om een veilige rit in het verkeer te krijgen.', 'Om beter te worden van een besmettelijke ziekte.'], answer: 1, chapter: 1, explanation: 'Manasa is de godin van de slangen. Mensen bidden tot haar om te voorkomen dat ze in de jungle gebeten worden.' },
    { q: 'Waardoor ontstaan er volgens de tekst vandaag de dag nog steeds nieuwe goden?', options: ['Doordat de oude goden allemaal verdwenen zijn.', 'Doordat iemand in Japan dat besloten heeft.', 'Doordat filmsterren dat verplicht stellen.', 'Doordat de behoeften van mensen door de eeuwen heen veranderen.'], answer: 3, chapter: 2, explanation: 'De derde alinea begint met de oorzaak: omdat de behoeften van mensen veranderen, ontstaan er ook nu nog nieuwe goden.' },
    { q: 'Wat betekent ‘vervaagt’ in de zin ‘de grens tussen mens en god vervaagt soms’?', options: ['De grens wordt steeds strenger bewaakt.', 'De grens wordt minder duidelijk.', 'De grens wordt opnieuw getekend op een kaart.', 'De grens verschuift naar een ander land.'], answer: 1, chapter: 3, explanation: 'Iets dat vervaagt, wordt wazig en minder scherp. Het verschil tussen mensen en goden is dan niet altijd meer duidelijk.' },
    { q: 'Wat is de belangrijkste boodschap van de hele tekst?', options: ['In India worden alleen motorfietsen vereerd.', 'Het hindoeïsme heeft maar een paar bekende goden.', 'De hindoeïstische godenwereld is levend en blijft groeien en veranderen.', 'Alle Indiase goden wonen tegenwoordig in Japan.'], answer: 2, chapter: 3, explanation: 'De tekst laat dorpsgoden, nieuwe goden en goden over de grens zien. Samen tonen ze dat de godenwereld meegroeit met wat mensen nodig hebben.' },
  ],
  written: [
    { q: 'In de tekst wordt gesteld dat het hindoeïstische pantheon "geen gesloten, oud boek is" maar meegroeit met de moderne tijd. Noem twee voorbeelden uit de derde alinea die deze bewering bewijzen.', label: 'TEKSTBEGRIP & ANALYSE', chapter: 2, model: 'Een eerste voorbeeld is Bullet Baba in Rajasthan. Daar vereren mensen een oude motorfiets en bidden reizigers voor een veilige rit in het verkeer. Een tweede voorbeeld is de Visa-god in Hyderabad, waar studenten bidden om een visum om in de Verenigde Staten te studeren. Ook Corona Devi, een godin die in de coronatijd werd bedacht, is een goed voorbeeld.' },
    { q: 'Uit welke twee feiten in de laatste alinea kun je opmaken dat het hindoeïsme zich weinig aantrekt van strikte grenzen tussen religies of tussen goden en mensen?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 3, model: 'Ten eerste reisde Ganesha met boeddhistische monniken mee naar Japan, waar hij nog steeds als de god Kangiten wordt vereerd. Hij hoort dus niet alleen bij het hindoeïsme. Ten tweede zijn er in India tempels waar filmsterren of beroemde sporters als levende goden worden vereerd. Daar is de grens tussen mens en god dus niet streng.' },
  ],
  quiz: { mcEyebrow: 'JOUW GODENKENNIS', mcHeading: 'Wat weet jij nu van de levende godenwereld, Alex?' },
  completion: {
    heading: ['Prachtig gedaan,', '*godenkenner Alex.*'],
    text: 'Van een slangengodin in het dorp tot een god die helemaal naar Japan reisde: jij weet nu hoe een eeuwenoude godenwereld steeds blijft groeien. Dit lampje brandt voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
