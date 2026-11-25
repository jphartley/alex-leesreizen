---
name: journey-game
description: Turn a journey's hero scene into a small keyboard game on the desktop journey home. Use only when Jeremy asks for a game (with /new-journey or for an existing journey); most journeys have none.
---

# Add a hero-scene game

Some journeys turn their hero scene into a small game, playable on the desktop journey home. Only build one when Jeremy asks for it. With `/new-journey`, follow `.agents/skills/new-journey/SKILL.md` as usual and use this file for the hero scene's `art.js` and `motion.js`. For an existing journey, change only `art.js` and `motion.js`: the text, questions and their order stay as they are.

**Reference:** `journeys/zelda-tijdlijn/` is built on the shared `game.js` (read its `motion.js` first; read only the hero function in `art.js`). Older games (`pokemon-mythes`, `ocarina`, `zelda-3d`, `zelda-mythen`) do the same things by hand. Don't copy their plumbing.

## 1. Design the game

- **Use the story.** The game acts out something from the text or Jeremy's request, and its hints can wink at the text (for example, "in the real games they never marry… but here they do!").
- **One input, one idea.** Usually one key (space) timed against something moving, or a few arrow keys. It should be playable in 20–40 seconds, about three rounds that get a little harder, with a clear reward at the end, followed by a calm reset so it can be played again.
- **No pressure.** No score, timer, lives or game over. A miss just restarts the round, with a friendly Dutch hint. Timing windows are generous (in `zelda-tijdlijn`, about ±0.15 s).
- **Don't repeat a mechanic.** Used so far:

  | Journey | Game | Input |
  |---|---|---|
  | `pokemon-mythes` | Magikarp leaps the Dragon Gate | arrows, space |
  | `ocarina` | play back a melody | number/letter keys |
  | `zelda-3d` | lock on to monsters at night | arrows, Z, space |
  | `zelda-mythen` | sword in the stone: pull as a shrinking ring meets the hilt | space |
  | `zelda-tijdlijn` | bat a light ball back to free Zelda, then a wedding | space |

- **Ambient demo.** When not in focus, the scene runs a short demo of the game now and then (a throw and a return, a tug at the sword), so it moves on phones and in the card too. It never needs input.
- All visible text is Dutch. The characters are original, not copied from games or films (the made-up adventurer from the Zelda journeys is fine to reuse).

## 2. `art.js`

- Take figures from `../../art-kit.js` where they fit: `adventurer({ sword: true })` gives the `.swing` arm (turn it around `SHOULDERS[1]`), `adventurer({ hands })` arms that `armPath()` can bend, plus `princess`, `fairy`, `desertKing` (`.gan-arm` turns around `KING_SHOULDER`), `boar`, `swordUp`/`swordDown` and `burst()`. Classes starting with `c-` let you recolour them.
- Draw every moving actor on its own origin (feet or centre) inside a `<g class="…">` without other transforms, so `motion.js` can set `transform` each tick. Export the positions `motion.js` needs (spots, pivots, scale) as constants.
- Put reward elements (arch, burst, shards) in the SVG from the start with `opacity="0"`. If GSAP will move an element that has a `transform` attribute, wrap it in a `<g>` first.
- End the SVG with a veil if you need a fade, then `${hintBar('…start hint…')}` from `../../game.js` (`import { hintBar } from '../../game.js';`). Keep the hint under about 70 characters. Move the bar with `{ x, y, width }` if the scene needs it.
- The card and chapter 1 use the same hero, so the still picture must work without the game.

## 3. `motion.js`

```js
import { setupGame } from '../../game.js';

export function animate({ gsap, q, random, alive, svg, container }) {
  // ambient loops …
  const state = { mode: 'idle', focused: false };
  const game = setupGame({
    svg, container, gsap, q, alive,
    start: 'Klik op … en …',                       // hint while not in focus
    help: 'Spel: klik op … of ga ernaartoe met Tab. … Stop met Escape.', // added to the aria-label
    keys: [' '],                                    // default: space and Enter
    onKey: (key, down) => down && attempt(),        // held keys also get down = false on release
    onStart: () => onFocus(), onStop: () => onBlur(),
    when: () => state.mode === 'play',              // follow-up hints only in these modes
  });
  const { say, tone, tune, melody } = game;         // safe to call anywhere: no-ops off desktop
  const tick = (time, dtMs) => { if (!alive() || document.body.classList.contains('calm')) return; … game.cue(hitWouldSucceed); render(time); };
  gsap.ticker.add(tick);
  // demo scheduling …
  if (!game.active) return () => gsap.ticker.remove(tick);
  // onFocus, onBlur, idle …
  return () => { gsap.ticker.remove(tick); game.cleanup(); };
}
```

`setupGame()` handles the desktop check, focus, blur, Escape, clicks, keys (only while the SVG has focus), the hint bar, the aria-label, Web Audio (silent until a key press or click) and its own clean-up. Don't rebuild any of that.

- **Helpers from `game.js`:** `walkTo(gsap, actor, x, { face })` walks an actor object with a little bounce; `burstAt(gsap, burstEl, x, y, size)` flashes a `burst()`.
- **Actors as plain objects.** Keep each actor's state in a plain object (`{ x, y, face, hop }`), tween those with GSAP, and draw them in one `gsap.ticker` callback by setting attributes. Skip the tick when quiet mode (`body.calm`) is on.
- **A small state machine.** A `state.mode` string (`idle`, `demo`, `pause`, `play`, `win`, …), with `state.run` holding the pending timeline or `delayedCall` so `idle()` can kill it. Check `alive()` at the start of every callback.
- **Focus and blur.** On focus, stop the demo and start round one. On blur mid-round, go back to `idle()` (heal the scene, restart the demo). A reward sequence may finish first and then go idle.
- **`say(text, then)`** shows a hint and returns to `then` after 1.8 s while the game is in focus and `when()` holds. Use it for "Raak!", then the instructions again.
- **`game.cue(bool)` every tick.** Set it true while an input would succeed right now (a narrower window than the real one, about half). `npm run play` presses the key on it.
- **Sound.** Short, soft tones only: `tone(freq, length, volume, type, delay)`, `tune([freqs])`, `melody([[freq, beats], …])`. Only public-domain or original melodies, never game music.
- Nothing is stored, and there is no `localStorage`.

## 4. Check it

1. The checks from the new-journey skill: `node --check`, `npm run check`, `npm run check:browser -- <slug>`.
2. `npm run play -- <slug> --until="<text of the hint after the reward>"`. It starts the game, presses the key on every `game.cue()`, logs each hint with a timestamp, saves a screenshot the first time each hint appears (`.screenshots/<slug>-play-NN.png`), and then checks Escape and that the chapter 1 scene is not focusable. Add `--miss=1` to see the miss path, `--key=enter` for another key. Games that need several different keys can't be auto-played: for those, the log and the Escape check still run.
3. Look at the screenshots. Ask Jeremy to judge whether the timing is easy enough for Alex.
4. Mention the game in the journey's `README.md` row, its `AGENTS.md` entry ("its hero scene is …, on desktop journey home only") and the header comment of `journey.js`.
