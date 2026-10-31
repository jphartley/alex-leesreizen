// De mythische oorsprong van Pokémon: the gods, myths and folk tales behind Ninetales, Gyarados, Froslass and Thundurus.
// The hero scene doubles as a small keyboard game (the Dragon Gate) on desktop; see motion.js.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'pokemon-mythes',
  name: 'Pokémon-mythes',
  number: '16',
  meta: { title: 'De mythische oorsprong van Pokémon: Monsters of legendes?', description: 'De goden, mythes en volksverhalen achter bekende Pokémon. Een interactief Nederlands leesavontuur voor Alex, met een spel bij de Drakenpoort.' },
  card: { title: 'De mythische oorsprong van *Pokémon*', blurb: 'Monsters of legendes? Ontdek de goden en geesten achter Ninetales, Gyarados, Froslass en Thundurus.' },
  home: {
    label: 'LEESREIS 16 · MYTHES', greeting: 'Hé Alex, geloof jij in legendes?', heading: ['De mythische oorsprong', 'van *Pokémon.*'],
    description: 'Een vos met negen staarten, een karper die een draak wordt, een sneeuwvrouw en een dondergod. Ontdek de oude verhalen achter bekende Pokémon. En spring zelf over de Drakenpoort!',
    cta: 'Begin je legendereis', location: 'JAPAN & CHINA', stamp: ['MYTHISCH', 'Legendes', 'LEES & SPEEL'],
    caption: 'Waar een karper een draak kan worden.', routeHeading: 'Jouw route langs vier legendes',
  },
  chapters: [
    { title:'Monsters of legendes?', short:'Legendes in het spel', label:'JAPAN · GODEN, MYTHES EN VOLKSVERHALEN', icon:'✦', aside:'Vier legendes in één dal', caption:'Een vos met negen staarten op de oever, een waterval met een poort, besneeuwde toppen en een dondergod op zijn wolk. Op de startpagina kun je de karper zelf laten springen.', note:'DE REIS BEGINT' },
    { title:'Ninetales (De magische Kitsune)', short:'De Kitsune', label:'JAPAN · DE MAGISCHE VOS', icon:'❧', aside:'Tel de staarten', caption:'Hoe ouder en wijzer, hoe meer staarten. Deze vos heeft er negen, en om haar heen zweven vossenvuurtjes.', note:'KIJK EENS GOED' },
    { title:'Magikarp en Gyarados (De Drakenpoort)', short:'De Drakenpoort', label:'CHINA · DE WATERVAL VAN DE GODEN', icon:'✺', aside:'Van karper tot draak', caption:'Een zwakke karper springt tegen de stroom in. Boven de waterval wacht de poort, en in de wolken al een draak.', note:'HOU VOL' },
    { title:'Froslass (De ijzige Yuki-onna)', short:'De Yuki-onna', label:'JAPAN · DE BERGEN IN DE SNEEUWSTORM', icon:'❄', aside:'Een vrouw in de sneeuwstorm', caption:'Een witte kimono die boven de sneeuw zweeft, en een reiziger met een lantaarn die beter kan omkeren.', note:'BRRR' },
    { title:'Thundurus (Raijin, de dondergod)', short:'Raijin', label:'JAPAN · DE GOD VAN DE DONDER', icon:'✧', aside:'Trommels in de lucht', caption:'Een gespierde god op een donkere wolk, met een ring van trommels om zich heen. Elke slag is een donderklap.', note:'HOOR JE HET?' },
  ],
  dictionary: {
    eeuwenoude:'Honderden jaren oud, al heel veel eeuwen bestaand.',
    volksverhalen:'Verhalen die mensen al heel lang aan elkaar doorvertellen, van ouders op kinderen.',
    mythologie:'Alle oude verhalen van een volk over goden, helden en wonderlijke wezens.',
    gedaante:'De vorm of het uiterlijk van iemand of iets. Van gedaante veranderen is er anders uit gaan zien.',
    illusies:'Dingen die je denkt te zien, maar die er niet echt zijn.',
    evolueert:'Verandert langzaam in een nieuwe, vaak sterkere vorm.',
    stroomopwaarts:'Tegen de stroom van de rivier in, de kant op waar het water vandaan komt.',
    folklore:'De oude verhalen, gebruiken en liedjes van een volk.',
    legendarische:'Zo bijzonder en beroemd dat er verhalen over worden verteld, bijna als een legende.',
  },
  questions: [
    { q:'Wat is Gyarados volgens de tekst?', options:['Een zwakke vis die op de grond spartelt.','Een magische vos met negen staarten.','Een angstaanjagende vliegende zeedraak.','Een god die op een wolk door de lucht raast.'], answer:2, chapter:2, explanation:'Magikarp evolueert tot ieders verbazing in Gyarados, een angstaanjagende vliegende zeedraak.' },
    { q:'Hoe krijgt een Kitsune volgens de oude verhalen meer staarten?', options:['Door ouder en wijzer te worden, tot maximaal negen staarten.','Door vuur te spuwen naar reizigers.','Door elke winter een nieuwe staart te laten groeien.','Door met andere vossen te vechten.'], answer:0, chapter:1, explanation:'Volgens de verhalen geldt: hoe ouder en wijzer een Kitsune wordt, hoe meer staarten hij krijgt, met een maximum van negen.' },
    { q:'Hoe kennen spelers Magikarp volgens de tekst?', options:['Als de snelste zwemmer van het spel.','Als een vis die vuur kan spuwen.','Als een draak die in een vis is veranderd.','Als een zwakke vis die vaak alleen maar wat op de grond spartelt.'], answer:3, chapter:2, explanation:'De tekst zegt dat iedereen Magikarp kent als een zwakke vis die vaak alleen maar een beetje op de grond spartelt.' },
    { q:'Wanneer verschijnt de Yuki-onna volgens de mythe aan reizigers?', options:['Op warme zomeravonden bij een meer.','Tijdens zware sneeuwstormen in de bergen.','Alleen op de eerste dag van het nieuwe jaar.','Als reizigers een lantaarn aansteken.'], answer:1, chapter:3, explanation:'Volgens de mythe verschijnt de beeldschone Yuki-onna tijdens zware sneeuwstormen aan reizigers in de bergen.' },
    { q:"Wat betekent het woord 'folklore' in de zin over de Yuki-onna?", options:['Een soort sneeuwstorm in de bergen.','Een Japans woord voor spookhuis.','De oude verhalen en gebruiken van een volk.','Een boek met regels voor het spel.'], answer:2, chapter:3, explanation:'Folklore is het geheel van oude verhalen, gebruiken en liedjes van een volk. De Yuki-onna is zo’n figuur uit de Japanse verhalen.' },
    { q:"Waarom noemt de tekst Thundurus een 'overduidelijke kopie' van Raijin?", options:['Omdat Thundurus ook in Japan is bedacht.','Omdat Raijin zelf in het spel voorkomt als Pokémon.','Omdat Thundurus net als Raijin op de grond leeft.','Omdat Thundurus net als Raijin onweer veroorzaakt en hun uiterlijk sterk overeenkomt.'], answer:3, chapter:4, explanation:'Dit is oorzaak en gevolg: Thundurus raast op een wolk door de lucht en veroorzaakt onweer, net als de god van bliksem en donder. Bovendien lijken ze sterk op elkaar. Daarom is hij een overduidelijke kopie.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Pokémon zijn gevaarlijker dan de wezens uit oude mythes.','Veel Pokémon zijn gebaseerd op eeuwenoude goden, mythes en volksverhalen, die zo tot leven komen in het spel.','De Japanse bedenkers hebben alle Pokémon helemaal zelf verzonnen.','Alleen Japanse legendes zijn gebruikt voor Pokémon.'], answer:1, chapter:0, explanation:'De tekst laat met vier voorbeelden zien dat Pokémon geen losse fantasie zijn: veel ervan zijn gebaseerd op eeuwenoude goden, mythes en volksverhalen uit de hele wereld.' },
  ],
  written: [
    { q:'In de spellen vinden veel spelers Magikarp in eerste instantie een nutteloze Pokémon. Hoe verklaart de Chinese legende van de Drakenpoort waarom het logisch is dat juist deze zwakke vis in de machtige draak Gyarados verandert?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Volgens de Chinese legende is een karper een gewone, zwakke vis. Maar als hij de zware tocht stroomopwaarts aflegt en helemaal over de waterval (de Drakenpoort) weet te springen, wordt hij door de goden beloond en verandert hij in een machtige draak. Daarom is het logisch dat juist de zwakke Magikarp na veel moeite in de machtige draak Gyarados verandert: de zwakke vis die volhoudt, wordt beloond.' },
    { q:'Ninetales en Froslass zijn allebei gebaseerd op figuren uit Japanse mythes met bijzondere of gevaarlijke krachten. Welke krachten hebben de Kitsune en de Yuki-onna volgens de tekst?', label:'TEKSTBEGRIP & ANALYSE', chapter:1, model:'De Kitsune kan volgens de tekst vuur spuwen, van gedaante veranderen en mensen betoveren met illusies. De Yuki-onna heeft een ijskoude adem waarmee ze mensen bevriest die in de bergen zijn verdwaald.' },
  ],
  quiz: { mcEyebrow: 'JOUW LEGENDEKENNIS', mcHeading: 'Tijd voor de legendequiz, Alex.' },
  completion: {
    heading: ['Goed gedaan,', '*legendekenner Alex.*'],
    text: 'Van de negen staarten van de Kitsune tot de trommels van Raijin: jij weet nu welke oude verhalen in Pokémon verstopt zitten. Deze rol vol legendes is voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
