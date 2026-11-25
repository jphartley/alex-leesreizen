// Keep every journey routable, including archived journeys with existing links and saved answers.
import taiwan from './taiwan/journey.js';
import smakenVerleden from './smaken-verleden/journey.js';
import hongkong from './hongkong/journey.js';
import tempels from './tempels/journey.js';
import pizza from './pizza/journey.js';
import a350 from './a350/journey.js';
import website from './website/journey.js';
import kowloon from './kowloon/journey.js';
import kowloonOpus from './kowloon-opus5-5-xhigh/journey.js';
import shooters from './shooters/journey.js';
import manga from './manga/journey.js';
import ketiKoti from './keti-koti/journey.js';
import mangawereld from './mangawereld/journey.js';
import halloween from './halloween/journey.js';
import godenwereld from './godenwereld/journey.js';
import pokemonKnuffels from './pokemon-knuffels/journey.js';
import pokemonMythes from './pokemon-mythes/journey.js';
import ocarina from './ocarina/journey.js';
import antonDeKom from './anton-de-kom/journey.js';
import alettaJacobs from './aletta-jacobs/journey.js';
import zelda3d from './zelda-3d/journey.js';
import nozems from './nozems/journey.js';
import zeldaMythen from './zelda-mythen/journey.js';
import zeldaTijdlijn from './zelda-tijdlijn/journey.js';

export const journeys = [taiwan, smakenVerleden, hongkong, tempels, pizza, a350, website, kowloon, kowloonOpus, shooters, manga, ketiKoti, mangawereld, halloween, godenwereld, pokemonKnuffels, pokemonMythes, ocarina, antonDeKom, alettaJacobs, zelda3d, nozems, zeldaMythen, zeldaTijdlijn];
// Only active journeys appear on the landing page and in the header switcher.
export const visibleJourneys = journeys.filter(j => !j.archived);
