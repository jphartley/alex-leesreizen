// De grenzeloze groei van de mangawereld: the anime boost, Webtoons and manga made outside Japan.
// Question order is fixed once published: saved answers are stored by index.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'mangawereld',
  name: 'Groeiende mangawereld',
  number: '12',
  meta: { title: 'De grenzeloze groei van de mangawereld', description: 'Hoe manga de hele wereld veroverde: van volle boekenkasten tot strips op je telefoon. Een leesreis voor Alex.' },
  card: { title: 'De grenzeloze groei van *manga*', blurb: 'Volle boekenkasten, anime op je scherm en strips op je telefoon. Ontdek hoe manga de wereld veroverde.' },
  home: {
    label: 'LEESREIS 12 · WERELDWIJD', greeting: 'Hé Alex, lees jij op papier of op een scherm?', heading: ['De grenzeloze groei', 'van de *mangawereld.*'],
    description: 'Van stripwinkels om de hoek tot strips waar je doorheen scrolt. Ontdek hoe manga de hele wereld rondreisde en nog steeds verandert.',
    cta: 'Start je ontdekkingstocht', location: 'VAN JAPAN TOT FRANKRIJK', stamp: ['ONTDEK', 'Manga', 'LEES & SCROL'],
    caption: 'Hele kasten vol nieuwe avonturen.', routeHeading: 'Jouw route langs vier grote veranderingen',
  },
  chapters: [
    { title: 'Hele kasten vol manga', short: 'Manga overal', label: 'DE BOEKHANDEL · VAN ZOEKEN TOT VOLLE KASTEN', icon: '❧', aside: 'Kijk eens wat er op de plank staat', caption: 'Vroeger moest je lang zoeken, nu staan de kasten vol. Welk boekje pak jij?', note: 'DE REIS BEGINT' },
    { title: 'De anime-boost', short: 'Van scherm naar boek', label: 'STREAMING · VAN TEKENFILM NAAR STRIPBOEK', icon: '✦', aside: 'Eén aflevering, en dan?', caption: 'Een spannende aflevering op het scherm en een stapel stripboeken die steeds hoger wordt.', note: 'KIJK EENS GOED' },
    { title: 'Een digitale verschuiving', short: 'Lezen op je telefoon', label: 'WEBTOONS · LEZEN OP JE SMARTPHONE', icon: '✳', aside: 'Papier of scherm?', caption: 'Een telefoon en een papieren boekje naast elkaar. Hoe lees jij het liefst?', note: 'VERGELIJK MAAR' },
    { title: 'Manga uit Europa', short: 'Manfra', label: 'FRANKRIJK · NIEUWE MAKERS', icon: '☼', aside: 'Nieuwe tekenaars, bekende stijl', caption: 'Een tekentafel met uitzicht op Parijs. Hier ontstaat een strip in Japanse stijl.', note: 'BLIJF NIEUWSGIERIG' },
  ],
  dictionary: {
    gespecialiseerde: 'Helemaal gericht op één soort ding, zoals een winkel die alleen strips verkoopt.',
    streamingdiensten: 'Websites en apps waar je films en series via internet kunt kijken, zoals Netflix.',
    verkoopcijfers: 'Getallen die laten zien hoeveel er van iets verkocht wordt.',
    verschuiving: 'Een verandering waarbij iets langzaam een andere kant op gaat.',
    fysieke: 'Echt en tastbaar, zodat je het kunt vastpakken, zoals een papieren boek.',
    uitgeverijen: 'Bedrijven die boeken en strips laten maken, drukken en verkopen.',
    verticale: 'Van boven naar beneden, rechtop, in plaats van van links naar rechts.',
    afkomst: 'Waar iemand of iets oorspronkelijk vandaan komt.',
    uitsluitend: 'Alleen maar, en verder niets anders.',
    miljardenindustrie: 'Een soort bedrijvigheid waarin heel veel geld omgaat: miljarden euro’s.',
  },
  questions: [
    { q: 'Waar moest je in Europa vroeger naar manga zoeken?', options: ['In de bibliotheek van school.', 'In gespecialiseerde stripwinkels.', 'In de kasten van grote boekhandels.', 'Alleen in winkels in Japan.'], answer: 1, chapter: 0, explanation: 'De tekst zegt dat je er vroeger echt naar moest zoeken in gespecialiseerde stripwinkels. Pas tegenwoordig staan ze ook in grote boekhandels.' },
    { q: 'Welke series noemt de tekst als goede voorbeelden van de anime-boost?', options: ['One Piece en Dragon Ball.', 'Astro Boy en Naruto.', 'Webtoons en manfra.', 'Jujutsu Kaisen en Demon Slayer.'], answer: 3, chapter: 1, explanation: 'In de tekst staat: ‘Series zoals Jujutsu Kaisen en Demon Slayer zijn hier goede voorbeelden van.’' },
    { q: 'Wat bedoelt de tekst met ‘exploderen de verkoopcijfers’?', options: ['De stripboeken gaan kapot in de winkel.', 'Er worden ineens veel meer stripboeken verkocht.', 'De winkels worden veel te vol.', 'De stripboeken worden veel goedkoper.'], answer: 1, chapter: 1, explanation: 'Er ontploft hier niets echt. Het betekent dat de verkoop heel snel en heel sterk stijgt.' },
    { q: 'Waardoor lezen steeds meer jongeren manga op hun smartphone?', options: ['Deels door de opkomst van Zuid-Koreaanse Webtoons.', 'Doordat papieren boekjes in Japan niet meer verkocht worden.', 'Doordat alle stripwinkels in Europa dicht zijn.', 'Doordat manga alleen nog op Netflix te zien zijn.'], answer: 0, chapter: 2, explanation: 'De tekst zegt: ‘Dit komt deels door de opkomst van Zuid-Koreaanse Webtoons.’ Papieren boekjes worden in Japan juist nog altijd veel verkocht.' },
    { q: 'In welk land wordt na Japan de meeste manga ter wereld verkocht?', options: ['In Zuid-Korea.', 'In Nederland.', 'In Frankrijk.', 'In de Verenigde Staten.'], answer: 2, chapter: 3, explanation: 'De tekst noemt Frankrijk ‘het land waar na Japan de meeste manga ter wereld wordt verkocht’.' },
    { q: 'Wat is ‘manfra’ volgens de tekst?', options: ['Strips in de bekende Japanse stijl, gemaakt door Europese artiesten.', 'Een Franse tekenfilm op Crunchyroll.', 'Een Japanse uitgeverij in Frankrijk.', 'Een digitale strip uit Zuid-Korea.'], answer: 0, chapter: 3, explanation: 'In Frankrijk maken Europese artiesten hun eigen verhalen in Japanse stijl. Die strips worden ook wel manfra genoemd.' },
    { q: 'Wat is de belangrijkste boodschap van de hele tekst?', options: ['Manga is alleen populair bij jongeren in Japan.', 'Papieren stripboeken verdwijnen binnenkort helemaal.', 'Manga is uitgegroeid tot een wereldwijde industrie die steeds blijft veranderen.', 'Franse strips zijn beter dan Japanse manga.'], answer: 2, chapter: 3, explanation: 'De tekst laat drie grote veranderingen zien: de anime-boost, het lezen op je telefoon en nieuwe makers buiten Japan. Samen maken ze van manga een wereldwijde industrie die continu in beweging is.' },
  ],
  written: [
    { q: 'Oorzaak en gevolg: Hoe zorgen streamingdiensten er precies voor dat er wereldwijd meer papieren manga\'s worden verkocht?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 1, model: 'Een mangaserie wordt bewerkt tot een anime en komt op streamingdiensten zoals Netflix of Crunchyroll. Veel mensen kijken de afleveringen en willen weten hoe het verhaal verdergaat. Ze hebben geen geduld om een jaar op het volgende seizoen te wachten. Daarom gaan ze naar de winkel en lezen ze de rest van het verhaal meteen in de manga.' },
    { q: 'Vergelijking: Wat zijn de twee belangrijkste verschillen tussen een Zuid-Koreaanse Webtoon en een traditionele Japanse manga, zoals beschreven in de tekst?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 2, model: 'Ten eerste is een Webtoon in kleur, terwijl een traditionele manga zwart-wit is. Ten tweede sla je een manga om als een boek, maar een Webtoon lees je door van boven naar beneden over je scherm te scrollen.' },
  ],
  quiz: { mcEyebrow: 'JOUW MANGAKENNIS', mcHeading: 'Hoe goed ken jij de nieuwe mangawereld, Alex?' },
  completion: {
    heading: ['Knap gedaan,', '*wereldlezer Alex.*'],
    text: 'Van volle boekenkasten tot strips die je over je scherm scrolt: jij weet nu hoe manga de hele wereld rondreisde. Misschien teken jij later wel je eigen strip!',
    tag: 'VOOR ALEX · VAN PAPA JEREMY ♡',
  },
  art,
  animate,
};
