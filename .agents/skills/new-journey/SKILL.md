---
name: new-journey
description: Add a new reading journey to Alex's app from a Dutch text and two open questions Jeremy supplies. Use when Jeremy sends /new-journey, pastes a new text, or asks for a new journey, leesreis or story. Writes the journey data, quiz questions, SVG illustrations and hero animation, registers the journey, and checks it in a browser.
---

# Add a reading journey

Jeremy supplies a Dutch text (a title and 3–6 paragraphs) and two open questions. You write everything else, including the seven multiple-choice questions.

**Project instructions.** Work from the repository root. Follow `AGENTS.md`; read it first if your tool has not already loaded it. This workflow uses standard file editing and shell commands and works with Claude Code, Cursor and OpenAI Codex.

**Work efficiently.** Use `journeys/smaken-verleden/` as the reference: read its `journey.js` for the schema, and its `art.js` and `motion.js` for patterns. Only open `journeys/taiwan/` if you need a second example. Write each file in one go, don't re-read files you've just written, and let the scripts in step 6 do the checking. Only dig into output when something fails.

UI copy is Dutch; code, comments and commit messages are English. The copy is warm, encouraging and personal to Alex and papa Jeremy, with no pressure and nothing left over from another journey.

## 1. Confirm the input

- Don't ask Jeremy for usage or cost readings. If he volunteers before and after readings himself, add a row to `COSTS.md` (date, before, after, cost = after − before); otherwise skip it.
- Check there is a title, 3–6 paragraphs and two open questions. If the open questions are missing, ask for them before writing anything. If a paragraph is very long (over ~150 words), say so and ask whether to keep it; don't split it yourself.
- Suggest a slug (lowercase, dashes, e.g. `ijsland`) and the next visible number (`02`, `03`, …), based on `visibleJourneys` in `journeys/index.js`. Archived journeys do not count toward menu numbering. Match the number in `home.label`, and keep existing journey slugs and question order unchanged. Ask only if unclear.
- Correct clear grammatical, spelling and factual errors in the text and open questions yourself, without asking. Keep each fix minimal, in Jeremy's wording and style, and change nothing else (no rewriting for style, no added or removed content). Check the facts you are unsure of before writing; if something is only doubtful or disputed, leave it and mention it. Carry each fix through to the chapter labels, questions and model answers.

## 2. `journeys/<slug>/text.md`

`# Title`, a blank line, then the paragraphs as supplied (with only the corrections from step 1), separated by blank lines. `*word*` marks emphasis. A paragraph may end in a list: put each item on its own line starting with `- `, directly under the paragraph with no blank line, and the app shows them as bullet points. Nothing else in the file: the open questions go in `journey.js`, not here, and subheadings in the supplied text become chapter titles.

## 3. `journeys/<slug>/journey.js`

Default export following the Taiwan schema: `slug`, `name` (short, for the switcher), `number`, `meta`, `card`, `home`, `chapters`, `dictionary`, `questions`, `written`, `quiz`, `completion`, `art`, `animate`. Plain text only; `*emphasis*` is allowed; no HTML.

- **Chapters:** one per paragraph, in order. Each has `title`, `short`, `label` (CAPS place/theme line), `icon` (one typographic symbol such as ♧ ❧ ✳ ☼), `aside`, `caption`, `note`. `variants` is optional (illustration switcher buttons, like Taiwan's chapter 4).
- **Glossary:** 5–10 words that are hard for a young reader, written exactly as they appear in the text (including inflection, e.g. `revolutionairs`). Definitions are one short, child-friendly sentence.
- **7 multiple-choice questions:** 4 options each, one clearly correct and answerable from the text alone.
  - Spread the correct answers over A–D (no letter more than 3 times).
  - Cover every chapter at least once and set `chapter` to where the answer is.
  - Include at least one cause-and-effect question and one word-in-context question. The last question asks for the main message of the whole text.
  - Wrong options are plausible but clearly wrong on rereading; no trick questions, no "all of the above".
  - **Length must not give the answer away.** Alex learned to pick the longest option, because correct answers used to be the longest in 70% of questions. The usual cause is a correct answer that carries every detail and qualifier while the wrong ones stay bare. Write the options with this in mind from the first draft:
    - Keep the correct option to its core: one fact or idea, in the shortest natural sentence. Leave the extra detail for the `explanation`.
    - Give wrong options the same kind of concrete detail (a place, a number, a who or a why), preferably words or facts from the text used in the wrong way. Never pad with filler such as "echt", "heel erg" or "eigenlijk".
    - Main-message questions need the most care: four full sentences of similar length, not one rich answer and three short jokes.
    - Per journey, the correct option is the longest in 1 or 2 questions and the shortest in 1 or 2 (ties count; a question whose four options are exactly equally long is skipped), and in no question is it more than 25% and 8 characters longer than every wrong option. Too few counts as a cue too: if the answer is never the longest or shortest, a reader learns to skip those. `npm run check` enforces all of this.
    - After adjusting lengths, reread every question: the correct option must still be the one the text supports, and every option must sound like something a person would write.
  - `explanation` points back to what the text says, in one or two sentences.
- **2 open questions:** Jeremy's two questions, word for word (apart from corrections from step 1) and in his order. You add `label` (`TEKSTBEGRIP & ANALYSE` or `WOORDENSCHAT`), `chapter` (the chapter to reread) and `model`: an example answer in simple sentences, taken from the text, that Alex can compare with.
- Write the multiple-choice questions so they don't give away the answers to the open questions.
- **Order is permanent once published.** Saved answers are stored by index, so never reorder, insert or remove questions of a journey Alex may have used.

## 4. `journeys/<slug>/art.js`

Original inline SVG, drawn in code like Taiwan's. Export:

- `hero(id)`: the scene for the journey home and chapter 1. `viewBox="0 0 720 760"`, `preserveAspectRatio="xMidYMid slice"`, and a `data-scene` attribute. Give moving parts classes for GSAP (like `.layer`, `.bird`, `.smoke`). Wrap elements that already have a `transform` attribute in a `<g>` before animating them.
- `chapter(i, variant)`: illustrations for chapters 2 to n, `viewBox="0 0 720 650"`. Gentle motion uses only the shared CSS classes `m-float`, `m-bob`, `m-sway`, `m-drift`, `m-steam`, `m-twinkle` (with `style="--d:-2s"` for delays).
- `completion()`: a closing illustration (720×650).
- `card()`: the landing-page card; usually `hero` with another id. It is never animated.

Rules for every SVG:

- Every `id` starts with `<slug>-` (e.g. `` `${slug}-${id}-sky` ``), because several journeys can share a page.
- `role="img"` and a Dutch `aria-label` describing the picture.
- The house palette: warm paper (`#f7f5ed`, `#eadcc7`), muted greens (`#284f3d`, `#517c67`, `#9cac66`), soft creams and earth tones. Flat shapes, no outlines, calm and gentle.
- No external images, fonts or links; no text except short labels in `font-family="sans-serif"`.

## 5. `journeys/<slug>/motion.js`

`export function animate({ gsap, q, random, alive })`: the hero choreography. Keep it subtle, not a flash ad. Use a short entrance, then slow loops (5–30 s) of small transforms and opacity. One occasional coordinated moment (like Taiwan's breeze) is welcome. Check `alive()` before scheduling anything from a callback. The shared `motion.js` already handles quiet mode, reduced motion and clean-up. The context also carries `svg` and `container` (`.hero-art` on the journey home, `#chapter-art` on chapter 1), and `animate()` may return a clean-up function; only needed when you add event listeners or a `gsap.ticker` callback, as the `pokemon-mythes` Dragon Gate game does. Interactive scenes capture keys only while the SVG has focus, stay desktop-only and never store anything. Sound, as in the `ocarina` melody game, uses Web Audio, starts only after a key press or click and is closed in the clean-up function.

## 6. Register and check

1. Import the journey and append it to `journeys` in `journeys/index.js`, in display order. Leave all existing entries, including archived journeys, in the registry. New journeys are active by default; `visibleJourneys` automatically includes them.
2. `node --check` each new file, then `npm run check`. Fix every error; handle warnings or explain them.
3. `npm run check:browser -- <slug>`. It covers the switcher, home, hero motion, every chapter and variant, the glossary, all questions, the model answers, the score, saving, reset, quiet mode, reduced motion and 360px layouts, in a throwaway profile. It prints only failures and a summary line (about 20 seconds per journey).
4. As soon as both checks pass, run `npm run serve -- <slug>`. It starts the local server in the background if it isn't already running and prints the link. Give Jeremy that link straight away so he can test in a private window, then carry on with the steps below without waiting for him.
5. Inspect the generated screenshots using your tool’s image viewer. If image viewing is unavailable, use the text tone maps:
   - Hero layout and motion: `npm run screenshot -- '#/<slug>' --selector=.hero-art --at=3000,5000 --text=60 --diff`
   - Each chapter: `npm run screenshot -- '#/<slug>/chapter-<i>' --selector=#chapter-art --text=56`
   In the tone map, darker characters are darker areas; check that shapes sit where you drew them and nothing leaves a gap (for example, sky showing between layers). In the diff map, the moving parts should appear and the rest stay blank. Ask Jeremy to judge colours and feel.
6. Add the journey to the "Journeys so far" table in `README.md` and the "Journeys so far" line in `AGENTS.md`.
7. Commit on `main` with an English message. Don't wait for usage readings or other input before committing.
8. In the final reply, repeat the link and give a short overview of every correction made in step 1 (what was changed and why), or say that none were needed.
