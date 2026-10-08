// Shooter history: six supplied paragraphs, with question order fixed after publication.
import * as art from './art.js';
import { animate } from './motion.js';

export default {
  slug: 'shooters', name: 'Van Doom tot Roblox', number: '10',
  meta: { title: 'Van Doom tot Roblox: De Evolutie van de Shooter', description: 'Van platte plaatjes tot samen spelen: ontdek de geschiedenis van shooters. Een Nederlandse leesreis voor Alex.' },
  card: { title: 'Van Doom tot *Roblox*', blurb: 'Een oude computer, werelden met diepte en vrienden online. Ontdek hoe shooters veranderden.' },
  home: {
    label: 'LEESREIS 10 · GAMEGESCHIEDENIS', greeting: 'Hé Alex, klaar voor een reis door games?', heading: ['Van Doom', 'tot *Roblox.*'],
    description: 'Hoe groeide een gamegenre van platte plaatjes naar grote online werelden? Reis langs Doom, Quake, Half-Life en Roblox Rivals.',
    cta: 'Begin je gamereis', location: 'VAN PIXELS TOT ONLINE WERELDEN', stamp: ['ONTDEK', 'Games', 'LEES & SPEEL'],
    caption: 'Elke nieuwe computerwereld bouwt voort op een vorige.', routeHeading: 'Jouw route door de gamegeschiedenis',
  },
  chapters: [
    { title: 'Door de ogen van je personage', short: 'Wat is een FPS?', label: 'START · EEN ANDER KIJKPUNT', icon: '◉', aside: 'Een venster naar een gamewereld', caption: 'Een oude monitor, een laptop en een telefoon: drie vensters naar games.', note: 'DE REIS BEGINT' },
    { title: 'Doom: een slimme illusie', short: 'Doom', label: 'DOOM · 1993', icon: '▦', aside: 'Diepte op een plat scherm', caption: 'Een gang lijkt diep, maar het figuurtje staat op een plat plaatje.', note: 'KIJK NAAR DE DIEPTE' },
    { title: 'Quake: diepte en verbinding', short: 'Quake', label: 'QUAKE · DRIE JAAR LATER', icon: '◇', aside: 'Een wereld met volume', caption: 'Een blok heeft een voorkant, zijkant en bovenkant. Computers raken met elkaar verbonden.', note: 'VAN PLAT NAAR RUIMTELIJK' },
    { title: 'Half-Life: midden in het verhaal', short: 'Half-Life', label: 'HALF-LIFE · EEN VERHALEND AVONTUUR', icon: '⚙', aside: 'Een nieuwsgierige blik in het laboratorium', caption: 'Een wetenschapper en een proefopstelling nodigen je uit om na te denken.', note: 'LEES WAT ER VERANDERT' },
    { title: 'Roblox Rivals: samen spelen', short: 'Roblox Rivals', label: 'ROBLOX RIVALS · VANDAAG', icon: '✦', aside: 'Veel spelers, verschillende schermen', caption: 'Vrolijke blokfiguren ontmoeten elkaar in een gedeelde wereld.', note: 'EEN WERELD VOL VERBINDINGEN' },
    { title: 'Van alleen naar samen', short: 'De grote verandering', label: 'TERUGBLIK · MEER DAN DERTIG JAAR', icon: '↗', aside: 'Zie jij de lijn door de geschiedenis?', caption: 'Van een logge computer naar een netwerk van kleine schermen.', note: 'ALLES KOMT SAMEN' },
  ],
  dictionary: {
    gamegenres: 'Soorten games, zoals racegames, puzzelgames of shooters.',
    mijlpalen: 'Belangrijke gebeurtenissen die een grote stap vooruit betekenen.',
    illusie: 'Iets dat echt lijkt, maar anders in elkaar zit dan je denkt.',
    volume: 'De ruimte die een voorwerp inneemt: het heeft niet alleen hoogte en breedte, maar ook diepte.',
    natuurkundige: 'Die te maken hebben met hoe dingen bewegen en hoe krachten werken.',
    interactieve: 'Waarbij je zelf meedoet en invloed hebt op wat er gebeurt.',
    toegankelijk: 'Makkelijk te bereiken of te gebruiken voor veel mensen.',
    evolutie: 'Een verandering die stap voor stap over een lange tijd gebeurt.',
    logge: 'Grote, zware en onhandige.',
  },
  questions: [
    { q: 'Vanuit welk gezichtspunt beleef je een FPS?', options: ['Vanuit een camera boven het hele speelveld.', 'Door de ogen van je personage.', 'Door de ogen van iemand die naar de game kijkt.', 'Vanuit een kaart waarop alleen stippen bewegen.'], answer: 1, chapter: 0, explanation: 'FPS staat voor First-Person Shooter. De tekst zegt dat je de actie direct door de ogen van je personage beleeft.' },
    { q: 'In welk jaar zorgde Doom volgens de tekst voor een doorbraak?', options: ['In 2003.', 'In 1983.', 'In 1993.', 'In 2013.'], answer: 2, chapter: 1, explanation: 'De alinea over Doom noemt 1993 als het moment waarop het genre doorbrak.' },
    { q: 'Waarvoor was Quake volgens de tekst speciaal gebouwd?', options: ['Om via het vroege internet tegen anderen te spelen.', 'Om alleen zonder internet te spelen.', 'Om uitsluitend op telefoons te werken.', 'Om spelers zelf films te laten opnemen.'], answer: 0, chapter: 2, explanation: 'Quake was speciaal gebouwd voor spelen tegen anderen via het vroege internet. Dat hielp de ontwikkeling van online multiplayer-games en e-sports.' },
    { q: 'Wat stond bij eerdere shooters volgens de alinea over Half-Life vooral centraal?', options: ['Een eigen huis bouwen.', 'Een film bekijken zonder mee te doen.', 'Met een klein team een nieuwe game maken.', 'Zo snel mogelijk rennen en schieten.'], answer: 3, chapter: 3, explanation: 'De alinea begint met de uitleg dat eerdere shooters vooral draaiden om zo snel mogelijk rennen en schieten.' },
    { q: 'Waarom is een peperdure pc volgens de tekst niet meer nodig om een snelle shooter te spelen?', options: ['Omdat alle oude computers vanzelf sneller worden.', 'Omdat een game zoals Rivals het genre voor veel mensen bereikbaar maakt.', 'Omdat shooters tegenwoordig helemaal geen beeld meer hebben.', 'Omdat je alleen nog zonder andere spelers kunt spelen.'], answer: 1, chapter: 4, explanation: 'Rivals laat zien hoe toegankelijk het genre is geworden. De tekst noemt samen spelen dat direct en gratis mogelijk is.' },
    { q: 'Wat betekent ‘logge’ in de laatste alinea?', options: ['Grote, zware en onhandige.', 'Kleine en makkelijk mee te nemen.', 'Snelle en lichte.', 'Doorzichtige en bijna onzichtbare.'], answer: 0, chapter: 5, explanation: 'De tekst spreekt over zware, logge computers. Log betekent hier groot, zwaar en onhandig.' },
    { q: 'Wat is de belangrijkste boodschap van de hele tekst?', options: ['Alle nieuwe games worden door enorme bedrijven gemaakt.', 'Shooters zijn in dertig jaar helemaal hetzelfde gebleven.', 'Door technische vooruitgang groeiden shooters van eenzame ervaringen naar verhalende en sociale online werelden.', 'Oude games kun je alleen op een telefoon spelen.'], answer: 2, chapter: 5, explanation: 'De voorbeelden laten stap voor stap veranderingen zien: andere beelden, verhalen en manieren om samen te spelen. De laatste alinea brengt die evolutie samen.' },
  ],
  written: [
    { q: 'Wat is het belangrijkste grafische verschil tussen de vijanden in *Doom* en de wereld van *Quake*?', label: 'TEKSTBEGRIP & ANALYSE', chapter: 2, model: 'In Doom waren de vijanden nog platte plaatjes. Ze draaiden steeds met hun gezicht naar de speler, zodat ze echt leken. In Quake waren de wereld, vijanden en voorwerpen volledig 3D: ze hadden diepte en volume.' },
    { q: 'Waarom voelde de game *Half-Life* meer aan als een interactieve film dan de shooters die daarvoor uitkwamen? (Noem twee redenen)', label: 'TEKSTBEGRIP & ANALYSE', chapter: 3, model: 'Ten eerste ging het verhaal zonder pauzes of losse filmpjes door, terwijl alles voor de ogen van de speler gebeurde. Ten tweede deed je mee aan dat verhaal: je praatte met wetenschappers en loste natuurkundige puzzels op, in plaats van alleen te rennen en te schieten.' },
  ],
  quiz: { mcEyebrow: 'JOUW GAMEKENNIS', mcHeading: 'Tijd voor de gamequiz, Alex.' },
  completion: { heading: ['Goed ontdekt,', '*gamekenner Alex.*'], text: 'Van Doom tot Roblox: jij hebt gezien hoe beelden, verhalen en samen spelen veranderden. Blijf nieuwsgierig naar wat er achter je favoriete games zit. Een dikke knuffel van papa Jeremy!', tag: 'VOOR ALEX · VAN PAPA JEREMY ♡' },
  art, animate,
};
