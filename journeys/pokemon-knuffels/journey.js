// De verborgen wereld van Pokémon-knuffels: four rare, absurd and handmade plush toys.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'pokemon-knuffels',
  name: 'Pokémon-knuffels',
  number: '15',
  meta: { title: 'De verborgen wereld van Pokémon-knuffels', description: 'Van een Pikachu met een Van Gogh-hoed tot een handgemaakte Arcanine. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'De verborgen wereld van *Pokémon-knuffels*', blurb: 'Zeldzaam, absurd en handgemaakt. Ontdek vier knuffels die je niet zomaar in de speelgoedwinkel vindt.' },
  home: {
    label: 'LEESREIS 15 · KNUFFELS', greeting: 'Hé Alex, klaar om te verzamelen?', heading: ['De verborgen wereld', 'van *Pokémon-knuffels.*'],
    description: 'Een Pikachu met een schildershoed, een spook met een tong van 1,7 meter en een Furret zo lang als een volwassene. Ontdek de zeldzaamste knuffels ter wereld.',
    cta: 'Begin je knuffelreis', location: 'VAN AMSTERDAM TOT JAPAN', stamp: ['ZELDZAAM', 'Knuffels', 'LEES & KIJK'],
    caption: 'Waar knuffels kunstwerken worden.', routeHeading: 'Jouw route langs vier bijzondere knuffels',
  },
  chapters: [
    { title:'Een verborgen wereld van knuffels', short:'De knuffelwereld', label:'KNUFFELS · OVERAL TER WERELD', icon:'✦', aside:'Meer dan een gewone Pikachu', caption:'Een plank vol knuffels: een gele met een hoed, een paars spook, een lange fret en een pluizige vuurhond. Welke wil jij het liefst?', note:'DE REIS BEGINT' },
    { title:"De 'Van Gogh' Pikachu", short:'Pikachu met hoed', label:'AMSTERDAM · HET VAN GOGH MUSEUM · 2023', icon:'❧', aside:'Een hoed van een schilder', caption:'Een gele knuffel met een grijze vilten hoed, op een sokkel in het museum. Het bordje zegt het al: uitverkocht.', note:'KIJK EENS GOED' },
    { title:'Gengar met de uitrolbare tong', short:'Het Gengar-bed', label:'BANDAI · EEN KNUFFEL OM IN TE SLAPEN', icon:'☾', aside:'Slaap lekker op een tong', caption:'Hoofd in de bek, tong uitgerold en slapen maar. Hoe lang zou die tong zijn? Lees het in de tekst.', note:'WELTERUSTEN' },
    { title:'De levensgrote Furret', short:'De lange Furret', label:'POKÉMON CENTER · LEVENSGROOT', icon:'✺', aside:'Groter dan je denkt', caption:'Naast de meetlat zie je hoe lang Furret echt is. En die doos? Die is zwaar en duur om te versturen.', note:'METEN IS WETEN' },
    { title:'Custom realistische Arcanine', short:'De custom Arcanine', label:'HET ATELIER · HANDGEMAAKT', icon:'✂', aside:'Gemaakt door een kunstenaar', caption:'Nepbont, glazen ogen en een draadje ijzer vanbinnen. Op de werktafel liggen naald, draad en een schaar.', note:'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    verzamelaars:'Mensen die zoveel mogelijk dingen van één soort bij elkaar sparen, zoals knuffels of kaarten.',
    handelaren:'Mensen die spullen kopen om ze daarna weer aan anderen te verkopen.',
    torenhoge:'Zo hoog als een toren. Hier: heel erg hoge prijzen.',
    bizarre:'Heel vreemd en gek, zo raar dat je ervan opkijkt.',
    'fret-achtige':'Lijkend op een fret, een lang, dun en lenig dier.',
    peperduur:'Heel erg duur, eigenlijk veel te duur.',
    hyperrealistische:'Zó echt gemaakt dat je bijna niet ziet dat het niet echt is.',
    nepbont:'Zachte stof die eruitziet en voelt als de vacht van een dier, maar niet echt is.',
    buigzaam:'Makkelijk te buigen zonder dat het breekt.',
  },
  questions: [
    { q:"Wat bedoelt de tekst met het woord 'plushies'?", options:['Verzamelaars die knuffels kopen.','Pokémon-knuffels.','Speelgoedwinkels met Pokémon-spullen.','Zeldzame Pokémon-kaarten.'], answer:1, chapter:0, explanation:'De tekst zegt het meteen aan het begin: Pokémon-knuffels worden ook wel plushies genoemd. Het is dus gewoon een ander woord voor knuffel.' },
    { q:'Met welk museum werkte The Pokémon Company in 2023 samen?', options:['Met het Rijksmuseum in Amsterdam.','Met een museum in Tokio.','Met het Pokémon Center.','Met het Van Gogh Museum in Amsterdam.'], answer:3, chapter:1, explanation:'In 2023 werkte het Van Gogh Museum in Amsterdam tijdelijk samen met The Pokémon Company. Daarvoor werd de speciale Pikachu ontworpen.' },
    { q:'Wat maakte de speciale Pikachu-knuffel zo herkenbaar?', options:['Hij droeg de beroemde grijze vilten hoed van de schilder.','Hij had een kwast en een schildersezel bij zich.','Hij was geschilderd in de kleuren van een zonnebloem.','Hij was twee keer zo groot als een gewone Pikachu.'], answer:0, chapter:1, explanation:'De knuffel was gekleed met de beroemde grijze vilten hoed van Van Gogh. Daardoor zag je meteen dat hij bij het museum hoorde.' },
    { q:'Waarvoor is de enorme Gengar-knuffel van Bandai eigenlijk bedoeld?', options:['Als zitzak voor in de woonkamer.','Als kussen voor in de auto.','Als bed: je legt je hoofd in de bek en slaapt op de uitgerolde tong.','Als tent om in te spelen.'], answer:2, chapter:2, explanation:'De Gengar-knuffel is eigenlijk een bed. Je legt je hoofd in de grote open bek en rolt een pluchen tong van 1,7 meter uit om op te slapen.' },
    { q:'Waardoor is de levensgrote Furret-knuffel tegenwoordig zo zeldzaam?', options:['Omdat Furret in het spel heel weinig voorkomt.','Doordat de knuffel zo groot is dat hij lastig te maken en peperduur te verzenden is.','Omdat het Pokémon Center er maar tien van heeft gemaakt.','Doordat kinderen hem niet schattig vonden.'], answer:1, chapter:3, explanation:'Dit is oorzaak en gevolg: de knuffel is 1,80 meter lang. Door dat gigantische formaat is hij lastig te maken en peperduur om te verzenden, en daardoor is hij nu erg zeldzaam.' },
    { q:'Wat voor Pokémon is Arcanine volgens de tekst?', options:['Een spook-Pokémon.','Een fret-achtige Pokémon.','Een elektrische muis.','Een vuurhond-Pokémon.'], answer:3, chapter:4, explanation:'De tekst noemt Arcanine een vuurhond-Pokémon. Gengar is de spook-Pokémon en Furret lijkt op een fret.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Naast gewone knuffels bestaat er een bijzondere wereld van zeldzame, absurde en op maat gemaakte Pokémon-knuffels.','Pokémon-knuffels zijn alleen leuk als ze heel groot zijn.','Je kunt het beste knuffels kopen in een museum.','Handgemaakte knuffels zijn altijd beter dan knuffels uit de fabriek.'], answer:0, chapter:0, explanation:'De tekst begint ermee en laat het met vier voorbeelden zien: naast de gewone Pikachu’s uit de winkel bestaat er een wereld van extreem zeldzame, absurde en op maat gemaakte knuffels.' },
  ],
  written: [
    { q:"In de tekst lees je dat de 'Van Gogh' Pikachu online voor torenhoge prijzen wordt verkocht. Hoe is deze knuffel, ondanks dat hij in een Nederlands museum lag, zo zeldzaam en duur geworden?", label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'De knuffel was zo gewild dat verzamelaars en handelaren de hele winkel van het museum leegkochten. Binnen een paar dagen was hij stijf uitverkocht. Omdat er daarna geen nieuwe meer te koop waren, is hij zeldzaam geworden en wordt hij nu online voor torenhoge prijzen doorverkocht.' },
    { q:'In de tekst worden vier knuffels besproken. Welke van deze vier knuffels is geen officieel product van het merk Pokémon, en wat maakt deze knuffel wezenlijk anders dan de knuffels die je in de winkel koopt? (Noem twee verschillen).', label:'TEKSTBEGRIP & ANALYSE', chapter:4, model:'De hyperrealistische Arcanine is geen officieel product. Het is een custom knuffel die een kunstenaar met de hand maakt, niet in een fabriek. Twee verschillen: hij is gemaakt van luxe nepbont met levensechte glazen ogen in plaats van gewone stof, en er zit een buigzaam skelet van ijzerdraad in, zodat je hem in verschillende houdingen kunt zetten. Bovendien kost zo’n uniek kunstwerk vaak honderden euro’s.' },
  ],
  quiz: { mcEyebrow: 'JOUW KNUFFELKENNIS', mcHeading: 'Tijd voor de knuffelquiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*verzamelaar Alex.*'],
    text: 'Van een hoed uit het museum tot een tong van 1,7 meter: jij weet nu welke knuffels echt bijzonder zijn. Deze vier staan op de plank, speciaal voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
