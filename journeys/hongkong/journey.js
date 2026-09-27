// Van vissersdorp tot smeltkroes: how Hong Kong grew under British rule and how east and west meet in its food.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'hongkong',
  name: 'Hongkong',
  number: '03',
  meta: { title: 'Van vissersdorp tot smeltkroes', description: 'Hoe Hongkong groeide en hoe oost en west samenkwamen in de keuken. Een interactief Nederlands leesavontuur voor Alex.' },
  card: { title: 'Van vissersdorp tot *smeltkroes*', blurb: 'Jonken, wolkenkrabbers en dampende bamboemandjes. Ontdek hoe oost en west samen op je bord kwamen.' },
  home: {
    label: 'LEESREIS 03 · HONGKONG', greeting: 'Hé Alex, zin in een haventje?', heading: ['Van vissersdorp', 'tot *smeltkroes.*'],
    description: 'Een rustig vissersgebied dat uitgroeit tot een wereldstad vol torens. Ontdek hoe Britse en Chinese smaken in Hongkong door elkaar gingen.',
    cta: 'Begin je havenreis', location: 'VICTORIAHAVEN, HONGKONG', stamp: ['PROEF', 'Hongkong', 'OOST & WEST'],
    caption: 'Waar oost en west elkaar ontmoeten.', routeHeading: 'Jouw route door Hongkong',
  },
  chapters: [
    { title:'Van vissersgebied tot wereldstad', short:'Een stad groeit', label:'HONGKONG · 1842 TOT 1997', icon:'✳', aside:'Een haven vol leven', caption:'Een oude jonk met rode zeilen, een veerboot en torens tot in de wolken. Wat een verschil met vroeger!', note:'DE REIS BEGINT' },
    { title:'Hapjes uit bamboemandjes', short:'Dim sum', label:'DIM SUM · DE KANTONESE KEUKEN', icon:'❧', aside:'Samen delen', caption:'Dampende mandjes met garnalendumplings en zachte broodjes, en een pot hete thee. Wie pakt het eerste hapje?', note:'EET SMAKELIJK' },
    { title:'Een heerlijke chaos', short:'Oost ontmoet west', label:'HET EETCAFÉ · OOST ONTMOET WEST', icon:'✺', aside:'Wat bestel jij?', caption:'Een druk eetcafé met een ventilator aan het plafond. Tik hieronder en kijk wat er op tafel komt.', note:'BLIJF NIEUWSGIERIG', variants:[{ id:'melkthee', label:'Melkthee' }, { id:'eggtart', label:'Egg tart' }] },
  ],
  dictionary: {
    Opiumoorlog:'Een oorlog tussen Groot-Brittannië en China, die begon omdat de Britten de drug opium in China wilden blijven verkopen.',
    uitbreidingen:'Stukken die erbij kwamen, waardoor iets groter werd.',
    migranten:'Mensen die van het ene land of gebied naar het andere verhuizen om daar te gaan wonen.',
    metropool:'Een enorm grote en drukke stad.',
    wolkenkrabbers:'Heel hoge gebouwen die bijna tot in de wolken lijken te reiken.',
    kolonie:'Een gebied dat bestuurd wordt door een ander, vaak ver weg gelegen land.',
    verfijnde:'Heel zorgvuldig en netjes gemaakt, met veel aandacht voor details.',
    culinaire:'Alles wat met koken en eten te maken heeft.',
    gecondenseerde:'Ingedikt: er is water uitgehaald, zodat de melk dik en zoet wordt.',
    smeltkroes:'Een plek waar veel verschillende culturen samenkomen en zich met elkaar mengen.',
  },
  questions: [
    { q:'Na welke gebeurtenis kregen de Britten het eiland Hongkong in handen?', options:['Na de bouw van de eerste wolkenkrabber.','Na een grote storm op zee.','Na de Eerste Opiumoorlog in 1842.','Na de terugkeer naar China in 1997.'], answer:2, chapter:0, explanation:'De tekst begint ermee: na de Eerste Opiumoorlog in 1842 kregen de Britten het eiland Hongkong in handen.' },
    { q:'Hongkong veranderde ‘razendsnel’. Wat betekent dat hier?', options:['Heel snel.','Heel langzaam.','Met veel ruzie.','Bijna niet.'], answer:0, chapter:0, explanation:'Razendsnel betekent heel erg snel. In korte tijd werd het rustige vissersgebied een drukke stad vol torens.' },
    { q:'Waardoor veranderde Hongkong van een rustig vissersgebied in een bruisende metropool?', options:['Doordat de vissers allemaal vertrokken.','Doordat China er een nieuwe hoofdstad bouwde.','Doordat er opeens veel thee groeide.','Door de uitbreidingen en de komst van miljoenen Chinese migranten.'], answer:3, chapter:0, explanation:'Dit is oorzaak en gevolg: door de uitbreidingen van het gebied en de komst van miljoenen Chinese migranten groeide Hongkong razendsnel.' },
    { q:'Waarin worden de dim sum-hapjes geserveerd?', options:['Op grote platte borden.','In ronde bamboemandjes.','In houten lunchboxen.','In papieren zakjes.'], answer:1, chapter:1, explanation:'De tekst zegt dat de hapjes geserveerd worden in ronde bamboemandjes, en dat je ze deelt met je tafelgenoten.' },
    { q:'De basis van de Hongkongse keuken is vooral Kantonees. Waar komt de Kantonese keuken vandaan?', options:['Uit Groot-Brittannië.','Uit Japan.','Uit Noord-China.','Uit Zuid-China.'], answer:3, chapter:1, explanation:'Tussen haakjes staat het in de tekst: Kantonees betekent uit Zuid-China.' },
    { q:'Waarmee is een egg tart gevuld?', options:['Met warme, zoete eiercrème.','Met pindakaas.','Met ham en macaroni.','Met gecondenseerde melk en thee.'], answer:0, chapter:2, explanation:'Een egg tart is een knapperig deegtaartje gevuld met warme, zoete eiercrème.' },
    { q:'Wat is de belangrijkste boodschap van de hele tekst?', options:['Britse gerechten zijn lekkerder dan Chinese gerechten.','In Hongkong eet je alleen dim sum.','In de keuken van Hongkong proef je hoe oost en west door de geschiedenis samenkwamen.','Hongkong is nog steeds een rustig vissersdorp.'], answer:2, chapter:2, explanation:'De tekst laat zien hoe Hongkong groeide als Britse kolonie met een Chinese basis. Daardoor is het een smeltkroes waar de geschiedenis letterlijk op je bord ligt.' },
  ],
  written: [
    { q:'Uit welke drie delen bestond de Britse kolonie Hongkong uiteindelijk nadat ze in 1860 en 1898 waren uitgebreid?', label:'TEKSTBEGRIP & ANALYSE', chapter:0, model:'De kolonie bestond uit drie delen. Het eerste deel was het eiland Hongkong, dat de Britten in 1842 kregen. In 1860 kwam het stuk vasteland Kowloon erbij. In 1898 pachtten (huurden) ze nog een groot stuk land: de New Territories.' },
    { q:'Wat is een Cha Chaan Teng en waarom is dit soort eetcafés een goed voorbeeld van de geschiedenis van Hongkong?', label:'TEKSTBEGRIP & ANALYSE', chapter:2, model:'Een Cha Chaan Teng is een typisch, levendig Hongkongs eetcafé. De koks mixen er westerse ingrediënten met Chinese kookstijlen, zoals macaroni in kippenbouillon met ham. Het is een goed voorbeeld van de geschiedenis, omdat Hongkong een Chinese stad was die lang door de Britten werd bestuurd. Oost en west kwamen samen, en dat proef je op je bord.' },
  ],
  quiz: { mcEyebrow: 'JOUW HONGKONGKENNIS', mcHeading: 'Tijd voor de havenquiz, Alex.' },
  completion: {
    heading: ['Top gedaan,', '*Hongkong-kenner Alex.*'],
    text: 'Van een rustig vissersgebied tot wolkenkrabbers en dampende dim sum: jij weet nu hoe oost en west samen op je bord kwamen. Deze egg tart en melkthee zijn voor jou!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
