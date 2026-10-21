// Manga: five chapters about Japanese comics and three influential makers.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'manga',
  name: 'Japanse manga',
  number: '10',
  meta: { title: 'De Magische Wereld van Japanse Manga', description: 'Ontdek Japanse stripboeken en de makers achter Astro Boy, Dragon Ball en One Piece. Een leesreis voor Alex.' },
  card: { title: 'De magische wereld van *manga*', blurb: 'Een robotjongen, een snelle vechter en een piratenavontuur. Ontdek de makers achter Japanse strips.' },
  home: {
    label: 'LEESREIS 10 · JAPAN', greeting: 'Hé Alex, welk avontuur sla jij open?', heading: ['De magische wereld', 'van *Japanse manga.*'],
    description: 'Van oude boekrollen naar verhalen die de wereld over reizen. Maak kennis met drie makers die stripboeken iets bijzonders gaven.',
    cta: 'Begin je mangareis', location: 'JAPAN · VERHALEN OP PAPIER', stamp: ['ONTDEK', 'Manga', 'LEES & VERBEELD'],
    caption: 'Een heel avontuur tussen twee kaften.', routeHeading: 'Jouw route door de mangawereld',
  },
  chapters: [
    { title: 'Een wereld op papier', short: 'Manga ontdekken', label: 'JAPAN · VAN BOEKROL TOT STRIP', icon: '❧', aside: 'Sla een nieuw verhaal open', caption: 'Bergen, zeeën en avonturen passen allemaal in een stripboek.', note: 'DE REIS BEGINT' },
    { title: 'De makers achter de verhalen', short: 'De mangaka', label: 'HET ATELIER · SCHRIJVEN EN TEKENEN', icon: '✎', aside: 'Alles begint met een idee', caption: 'Papier, een pen en ruimte om iets te verzinnen. Hier ontstaat een nieuwe wereld.', note: 'KIJK ACHTER DE SCHERMEN' },
    { title: 'Een robot met gevoelens', short: 'Osamu Tezuka', label: 'TEZUKA · ASTRO BOY', icon: '✦', aside: 'Een bijzondere hoofdrolspeler', caption: 'Een vriendelijke robot tussen de schetsen: techniek en gevoel in één verhaal.', note: 'ONTDEK DE TEKENSTIJL' },
    { title: 'Actie die verder reist', short: 'Akira Toriyama', label: 'TORIYAMA · DRAGON BALL', icon: '✳', aside: 'Kun je snelheid tekenen?', caption: 'Een oefenplek in de bergen, met een springende figuur en lijnen die beweging laten zien.', note: 'VOLG DE BEWEGING' },
    { title: 'Een avontuur dat blijft boeien', short: 'Eiichiro Oda', label: 'ODA · ONE PIECE', icon: '☼', aside: 'Op weg naar een grote droom', caption: 'Een klein zeilschip vaart naar de horizon. Welke avonturen wachten daar?', note: 'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    boekrollen: 'Lange stroken papier of ander materiaal die je oprolt en waarop tekst of tekeningen staan.',
    legendarische: 'Zo beroemd en bijzonder dat mensen er nog lang over vertellen.',
    mangaka: 'Een maker van Japanse stripboeken.',
    emoties: 'Gevoelens, zoals blijheid, verdriet of boosheid.',
    handelsmerk: 'Een kenmerk waaraan je iemand of iets meteen herkent.',
    epische: 'Groots en indrukwekkend, alsof je naar een enorm avontuur kijkt.',
    inspiratie: 'Een idee of voorbeeld waardoor je zelf iets wilt maken.',
    exemplaren: 'Losse stuks van hetzelfde boek of voorwerp.',
    hype: 'Iets waar veel mensen korte tijd heel enthousiast over zijn.',
  },
  questions: [
    { q: 'Wanneer begon de moderne manga volgens de tekst pas echt te groeien?', options: ['Toen de eerste Japanse boekrollen werden gemaakt.', 'Na de Tweede Wereldoorlog.', 'Pas na het begin van Dragon Ball in 1984.', 'Pas toen Luffy in 1997 werd bedacht.'], answer: 1, chapter: 0, explanation: 'De tekst maakt een verschil tussen oude tekeningen op boekrollen en moderne manga. Moderne manga begon pas echt te groeien na de Tweede Wereldoorlog.' },
    { q: 'Wat betekent het woord ‘mangaka’ in deze tekst?', options: ['Een lezer die Japanse boeken verzamelt.', 'Een personage in een Japanse strip.', 'Een maker van Japanse stripboeken.', 'Een oude Japanse boekrol.'], answer: 2, chapter: 1, explanation: 'De tekst noemt schrijvers en tekenaars en legt tussen haakjes uit dat zo’n maker in Japan een mangaka heet.' },
    { q: 'Wat is er bijzonder aan de hoofdpersoon van Astro Boy?', options: ['Het is een robotjongen met menselijke emoties.', 'Het is een piraat die koning wil worden.', 'Het is een vechter zonder gevoelens.', 'Het is een tekenaar die boekrollen verzamelt.'], answer: 0, chapter: 2, explanation: 'Tezuka bedacht Astro Boy in de jaren ’50. De tekst beschrijft de hoofdpersoon als een robotjongen met menselijke emoties.' },
    { q: 'Welk gevolg had Toriyama’s werk volgens de tekst voor latere actie-strips?', options: ['Ze kregen allemaal dezelfde hoofdpersoon Goku.', 'Ze werden alleen nog in Japan gelezen.', 'Ze lieten snelheid en humor voortaan weg.', 'Veel makers haalden er inspiratie uit.'], answer: 3, chapter: 3, explanation: 'Toriyama’s stijl zat vol snelheid, humor en vechtscènes. Volgens de tekst haalden vrijwel alle beroemde Japanse actie-strips die daarna kwamen inspiratie uit zijn werk.' },
    { q: 'Welke droom heeft Luffy?', options: ['De beroemdste tekenaar van Japan worden.', 'De koning van de piraten worden.', 'Een robot met menselijke gevoelens bouwen.', 'Een nieuw soort stripboek uitvinden.'], answer: 1, chapter: 4, explanation: 'In het avontuur dat Oda in 1997 begon, wil Luffy de koning van de piraten worden.' },
    { q: 'Welke combinatie past bij Toriyama’s tekenstijl?', options: ['Snelheid, humor en epische vechtscènes.', 'Stilte, verdriet en gewone schooldagen.', 'Alleen oude boekrollen en geschiedenistekeningen.', 'Langzame reizen zonder actie of grapjes.'], answer: 0, chapter: 3, explanation: 'De tekst noemt precies deze drie kenmerken van Toriyama’s stijl: snelheid, humor en epische vechtscènes.' },
    { q: 'Wat is de belangrijkste boodschap van de hele tekst?', options: ['Manga gaat altijd over robots en piraten.', 'Japanse strips zijn vooral een tijdelijke rage.', 'Manga groeide uit tot een wereldwijd succes, met een belangrijke rol voor drie makers.', 'Alle mangamakers tekenen op precies dezelfde manier.'], answer: 2, chapter: 4, explanation: 'De tekst beschrijft hoe manga wereldwijd succesvol werd. Daarna laat hij zien welke rol Tezuka, Toriyama en Oda daarin speelden.' },
  ],
  written: [
    { q: 'Hoe lees je een Japanse manga en waarom voelt dat voor ons in Europa vreemd aan?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 0, model: 'Je leest een Japanse manga van rechts naar links, zoals een normaal Japans boek. Dat voelt voor ons vreemd, omdat we in Europa gewend zijn van links naar rechts te lezen.' },
    { q: 'Waarom hebben veel manga-personages zulke grote ogen, en door wie komt dat?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 2, model: 'Volgens de tekst nam Osamu Tezuka de grote ogen over uit de tekenfilms van Walt Disney, waar hij fan van was. Die tekenstijl werd een herkenbaar kenmerk van manga.' },
    { q: 'Welke manga heeft het wereldrecord voor de meeste verkochte exemplaren?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 4, model: 'Dat is One Piece van Eiichiro Oda. Volgens de tekst zijn er wereldwijd ruim 500 miljoen exemplaren van verkocht.' },
  ],
  quiz: { mcEyebrow: 'JOUW MANGAKENNIS', mcHeading: 'Wat heb jij ontdekt in de mangawereld, Alex?' },
  completion: {
    heading: ['Mooi ontdekt,', '*mangalezer Alex.*'],
    text: 'Van een oude boekrol tot een eindeloos piratenavontuur: jij hebt gezien hoeveel werelden er in stripboeken passen. Welk verhaal zou jij zelf willen tekenen?',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
