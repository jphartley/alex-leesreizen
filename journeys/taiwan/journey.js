// Taiwan journey: from mountain-grown oolong to bubble tea.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'taiwan',
  name: 'Taiwan',
  number: '01',
  meta: { title: 'De magie van Taiwanese thee', description: 'Van bergtop tot bubble tea. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Van bergtop tot bubble tea', blurb: 'Mistige bergen, bijzondere theeblaadjes en een drankje vol balletjes. Ontdek de magie van Taiwanese thee.' },
  home: {
    label: 'LEESREIS 01 · TAIWAN', greeting: 'Hé Alex, ga je mee?', heading: ['Van bergtop', 'tot *bubble tea.*'],
    description: 'Een eiland in de mist. Bijzondere theeblaadjes. En een drankje vol verrassingen. Ontdek de magie van Taiwanese thee.',
    cta: 'Begin je thee-avontuur', location: 'ALISHAN, TAIWAN', stamp: ['ONTDEK', 'Taiwan', 'LEES & REIS'],
    caption: 'Waar jouw thee-avontuur begint.', routeHeading: 'Jouw route door Taiwan',
  },
  chapters: [
  { title:'Een eiland vol thee', short:'De bergen in', label:'TAIWAN · EEN BIJZONDER BEGIN', icon:'♧', aside:'Hoog in de mist', caption:'Hoge bergen, veel regen en koele mist. Een fijne plek voor een theeplant.', note:'DE REIS BEGINT' },
  { title:'Het geheim van de blaadjes', short:'De smaak van thee', label:'ALISHAN & LISHAN · VAN BLAD TOT THEE', icon:'❧', aside:'Drie kleuren, één verhaal', caption:'Groene thee, oolongthee en zwarte thee. Let tijdens het lezen op de verschillen.', note:'KIJK EENS GOED' },
  { title:'Hallo, bubble tea!', short:'Tijd voor boba', label:'TAICHUNG · EEN BRUISEND IDEE', icon:'♙', aside:'Een drankje met een twist', caption:'Melkthee, ijs en… balletjes! Ontdek hoe een experiment een beroemd drankje werd.', note:'EEN NIEUW IDEE' },
  { title:'Thee blijft verrassen', short:'Nieuwe ontdekkingen', label:'TAIWAN · EEN WERELD VOL SMAAK', icon:'✳', aside:'Wat wordt jouw favoriet?', caption:'De theewereld blijft nieuwe dingen bedenken. Tik hieronder en ontdek de illustraties.', note:'BLIJF NIEUWSGIERIG', variants:[{ id:'classic', label:'Boba' }, { id:'fruit', label:'Fruitthee' }, { id:'cheese', label:'Kaasthee' }] },
  ],
  dictionary: {
  immigranten:'Mensen die vanuit een ander land naar een land verhuizen om daar te wonen.',
  klimaat:'Het weer dat meestal in een gebied voorkomt, over een lange periode.',
  geconcentreerde:'Hier: een volle smaak, doordat er veel smaak in het blaadje zit.',
  revolutionairs:'Iets heel nieuws dat veel verandert.',
  tapioca:'Een ingrediënt gemaakt van de cassavewortel. Hiervan worden de taaie balletjes gemaakt.',
  rage:'Iets dat in korte tijd heel populair wordt.',
  innoveren:'Nieuwe ideeën bedenken en gebruiken om iets te vernieuwen.',
  fotogenieke:'Dingen die er mooi uitzien op een foto.',
  },
  questions: [
  { q:'Hoe kwamen de eerste theestruiken volgens de tekst naar Taiwan?', options:['Ze groeiden vanzelf op de hoogste bergen.','Immigranten namen ze mee vanuit China.','Een theehuis in Taichung bedacht ze.','Ze werden vanuit Europa gebracht.'], answer:1, chapter:0, explanation:'Immigranten brachten ruim tweehonderd jaar geleden theestruiken vanuit het vasteland van China naar Taiwan.' },
  { q:'Waarom is Taiwan volgens de tekst zo geschikt voor theeplanten?', options:['Er is veel zon en het regent er nooit.','Het eiland is helemaal vlak.','Er zijn hoge bergen, veel regen en koele mist.','Het is overal op het eiland erg warm.'], answer:2, chapter:0, explanation:'De tekst noemt juist deze combinatie: hoge bergen, veel regen en een koele mist. Samen zorgen ze voor een ideaal klimaat.' },
  { q:'Welk rijtje past bij wat je las over de blaadjes in Alishan en Lishan?', options:['Koud → langzaam groeien → zacht en zoet.','Koud → snel groeien → bitter en donker.','Warm → langzaam groeien → zout en fris.','Warm → snel groeien → zacht en zoet.'], answer:0, chapter:1, explanation:'Dit is een oorzaak en een gevolg: door de kou groeien de blaadjes langzaam. Dat zorgt voor de zachte en zoete smaak.' },
  { q:'Welke thee wordt volgens de tekst rondom het Zonnemaanmeer verbouwd?', options:['Alleen groene thee.','Alleen oolongthee.','Thee met kaasschuim.','Uitstekende zwarte thee.'], answer:3, chapter:1, explanation:'Rondom het lager gelegen Zonnemaanmeer wordt uitstekende zwarte thee verbouwd. De beroemde oolong komt juist uit hoge berggebieden.' },
  { q:'Wat gebeurde er in de jaren tachtig in een theehuis in Taichung?', options:['De eerste theeplanten kwamen naar Taiwan.','Iemand voegde tapiocaballetjes toe aan ijskoude melkthee.','De theeplanten stopten met groeien.','Cold brew werd over de hele wereld verboden.'], answer:1, chapter:2, explanation:'In Taichung schudde men ijskoude melkthee en voegde zoete, taaie tapiocaballetjes toe. Zo beschrijft de tekst het ontstaan van bubble tea.' },
  { q:'Wat betekent ‘een wereldwijde rage’ in de tekst?', options:['Iets dat maar in één dorp bekend is.','Een oud recept dat niemand meer gebruikt.','Iets dat over de hele wereld heel populair is.','Een wedstrijd voor de beste theemaker.'], answer:2, chapter:3, explanation:'Een rage is iets dat heel populair wordt. ‘Wereldwijd’ vertelt je dat het in allerlei landen populair is geworden.' },
  { q:'Wat is de belangrijkste boodschap van het hele verhaal?', options:['Taiwan heeft een rijke theecultuur die zich blijft vernieuwen.','Alle thee in Taiwan smaakt precies hetzelfde.','Bubble tea is de enige thee die in Taiwan wordt gedronken.','Thee kan alleen als warme drank worden gedronken.'], answer:0, chapter:3, explanation:'Het verhaal gaat van traditionele bergthee naar bubble tea en nieuwe creaties. De theecultuur heeft dus een lange geschiedenis én blijft veranderen.' },
  ],
  written: [
    { q:'Wat is oolongthee en waarom smaken de blaadjes uit de gebieden Alishan en Lishan zo zoet en zacht?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'Oolongthee zit qua bewerking en smaak tussen groene en zwarte thee in. In Alishan en Lishan is het hoog in de bergen koud. Daardoor groeien de blaadjes langzaam en krijgen ze een geconcentreerde, zachte en zoete smaak.' },
    { q:'Waarvan worden de "bubbels" in bubble tea traditioneel gemaakt?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'De balletjes worden traditioneel gemaakt van tapioca. Tapioca wordt gemaakt van de cassavewortel.' },
  ],
  quiz: { mcEyebrow: 'JOUW THEEKENNIS', mcHeading: 'Tijd voor de theequiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*thee-ontdekker Alex.*'],
    text: 'Van de mistige bergen tot de laatste tapiocaparel: jij hebt Taiwan een beetje beter leren kennen. Deze bubble tea is voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
