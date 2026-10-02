// Vliegen in de toekomst: the Airbus A350, how it compares with the Boeing 777 and 787, and flying it to Hong Kong.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'a350',
  name: 'Vliegen in de toekomst',
  number: '06',
  meta: { title: 'Vliegen in de toekomst', description: 'Met de Airbus A350 naar Hongkong. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Vliegen in de *toekomst*', blurb: 'Koolstofvezel, grote ramen en een luchthaven op een eiland. Stap in de A350 naar Hongkong.' },
  home: {
    label: 'LEESREIS 06 · HONGKONG', greeting: 'Hé Alex, klaar voor vertrek?', heading: ['Vliegen in de', '*toekomst.*'],
    description: 'Een vliegtuig van koolstofvezel, een luchthaven op een eiland en lekker eten boven de wolken. Stap in de A350 naar Hongkong.',
    cta: 'Instappen maar', location: 'OP WEG NAAR HONGKONG', stamp: ['BOARDING', 'Hongkong', 'A350'],
    caption: 'Waar het avontuur al in de lucht begint.', routeHeading: 'Jouw vluchtroute',
  },
  chapters: [
    { title:'Een vliegtuig van de toekomst', short:'De A350', label:'AIRBUS A350 · HOOG BOVEN DE WOLKEN', icon:'✈', aside:'Op weg naar Hongkong', caption:'Een lange, slanke romp en vleugels die omhoog buigen. Zo zweeft de A350 boven de wolken.', note:'DE REIS BEGINT' },
    { title:'Drie beroemde vliegtuigen', short:'Vergelijken', label:'BOEING 777 · BOEING 787 · AIRBUS A350', icon:'✦', aside:'Zoek de verschillen', caption:'Tik hieronder: bekijk de drie vliegtuigen naast elkaar, of kijk dwars door de romp naar binnen.', note:'KIJK EENS GOED', variants:[{ id:'naast', label:'Naast elkaar' }, { id:'doorsnede', label:'Doorsnede' }] },
    { title:'Welkom aan boord', short:'Cathay Pacific', label:'HONGKONG · DE THUISBASIS', icon:'❖', aside:'Bijna geland!', caption:'Tik hieronder: kijk naar de luchthaven op het eiland, of naar wat er op je dienblad ligt.', note:'WELKOM IN HONGKONG', variants:[{ id:'luchthaven', label:'Luchthaven' }, { id:'maaltijd', label:'Maaltijd' }] },
  ],
  dictionary: {
    geavanceerde:'Heel slim en modern gemaakt, met de nieuwste technieken.',
    romp:'Het lange, ronde middenstuk van een vliegtuig, waar de passagiers in zitten.',
    koolstofvezel:'Een heel sterk en licht materiaal van dunne draadjes, vastgeplakt met een soort lijm.',
    luchtdruk:'Hoe hard de lucht om je heen drukt; hoog in de lucht is die veel lager dan op de grond.',
    jetlag:'Een moe en raar gevoel na een lange vlucht, omdat je lichaam nog in een andere tijd leeft.',
    betrouwbaar:'Je kunt erop rekenen dat het altijd goed werkt.',
    opgespoten:'Gemaakt door zand uit zee op te pompen tot er nieuw land ontstaat.',
    gastvrijheid:'Gasten heel vriendelijk en hartelijk ontvangen en goed voor ze zorgen.',
    hypermoderne:'Supermodern, met alles van de allernieuwste soort.',
  },
  questions: [
    { q:'Wat voor vliegtuig is de Airbus A350 volgens de tekst?', options:['Een van de modernste en meest geavanceerde passagiersvliegtuigen ter wereld.','Een klein propellervliegtuigje voor korte tochtjes.','Een oud vrachtvliegtuig zonder passagiers.','Het grootste en zwaarste vliegtuig dat er bestaat.'], answer:0, chapter:0, explanation:'In de eerste alinea staat dat de A350 een van de modernste en meest geavanceerde passagiersvliegtuigen ter wereld is.' },
    { q:'Hoe lang duurt de vlucht naar Hongkong ongeveer, volgens de tekst?', options:['2 uur.','6 uur.','12 uur.','24 uur.'], answer:2, chapter:0, explanation:'De tekst noemt een vlucht van 12 uur. Dat is een lange reis, ongeveer een halve dag.' },
    { q:'‘De Boeing 777 is een absolute *klassieker*.’ Wat betekent klassieker in deze zin?', options:['Een vliegtuig dat alleen in musea staat.','Een bekend model dat al heel lang meegaat en waar mensen op vertrouwen.','Een vliegtuig waar klassieke muziek in speelt.','Een gloednieuw vliegtuig dat net is uitgevonden.'], answer:1, chapter:1, explanation:'Een klassieker is iets bekends dat al lang bestaat. De tekst zegt dat de 777 al jarenlang betrouwbaar de wereld overvliegt.' },
    { q:'Welke bijnaam heeft de Boeing 787?', options:['De Klassieker.','De Stille Reus.','De Hongkong-flyer.','De Dreamliner.'], answer:3, chapter:1, explanation:'In de tekst staat dat de Boeing 787 ook wel de ‘Dreamliner’ wordt genoemd.' },
    { q:'Waar ligt de thuisbasis van Cathay Pacific?', options:['Midden in de stad, tussen de wolkenkrabbers.','Op een enorme luchthaven op een opgespoten eiland voor de kust.','Hoog in de bergen van Hongkong.','In Europa, bij de fabriek van Airbus.'], answer:1, chapter:2, explanation:'De thuisbasis is de enorme luchthaven op een opgespoten eiland voor de kust van Hongkong.' },
    { q:'Waarom is het extra bijzonder om met Cathay Pacific te vliegen?', options:['Omdat het de enige maatschappij is die naar Azië vliegt.','Omdat je er alleen in de business class mag zitten.','Omdat de vluchten van Cathay Pacific maar een uur duren.','Omdat het de nationale luchtvaartmaatschappij van Hongkong is, bekend om uitstekende service en gastvrijheid.'], answer:3, chapter:2, explanation:'Dit is oorzaak en gevolg: Cathay Pacific is de flag carrier van Hongkong en staat bekend om service en Aziatische gastvrijheid. Daardoor is de reis extra bijzonder.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['De Boeing 777 is het beste vliegtuig ter wereld.','Vliegen naar Hongkong is saai en duurt te lang.','Met de moderne A350 van Cathay Pacific begint je avontuur naar Hongkong al in de lucht.','In de economy class krijg je geen eten.'], answer:2, chapter:2, explanation:'De tekst vertelt waarom de A350 zo modern is en waarom Cathay Pacific bijzonder is. De slotzin zegt: je Hongkong-avontuur begint eigenlijk al in de lucht.' },
  ],
  written: [
    { q:'Waarvan is de romp van de Airbus A350 voor een groot deel gemaakt en wat zijn de twee grootste voordelen daarvan voor de vlucht en de passagiers?', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'De romp is voor een groot deel gemaakt van koolstofvezel. Dat is supersterk, maar veel lichter dan aluminium. Voordeel 1: het vliegtuig verbruikt daardoor flink minder kerosine. Voordeel 2: de luchtdruk in de cabine kan hoger blijven, zodat je na een lange vlucht veel minder last hebt van een jetlag.' },
    { q:'Wat is de belangrijkste overeenkomst én het belangrijkste verschil tussen de Airbus A350 en de Boeing 787 Dreamliner?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'De overeenkomst: allebei zijn ze gemaakt van lichte koolstofvezel. Het verschil: de A350 is vanbinnen nét iets breder en staat erom bekend dat hij nog stiller is tijdens de vlucht.' },
  ],
  quiz: { mcEyebrow: 'JOUW VLIEGKENNIS', mcHeading: 'Tijd voor de vliegquiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*kapitein Alex.*'],
    text: 'Van koolstofvezel tot Aziatische gastvrijheid: jij weet nu waarom de A350 zo bijzonder is. Kijk maar eens uit het raampje, Hongkong ligt al onder je!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
