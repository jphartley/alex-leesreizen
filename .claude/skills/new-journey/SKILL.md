---
name: new-journey
description: Add a new reading journey to Alex's app from a Dutch text and two open questions Jeremy supplies. Use when Jeremy pastes a new text or asks for a new journey, leesreis or story. Writes the journey data, quiz questions, SVG illustrations and hero animation, registers the journey, and checks it in a browser.
---

# Add a reading journey

Jeremy supplies a Dutch text (a title and 3–5 paragraphs) and two open questions. You write everything else, including the seven multiple-choice questions.

**Work efficiently.** `AGENTS.md` is already loaded as project instructions, so don't re-read it. Use `journeys/smaken-verleden/` as the reference: read its `journey.js` for the schema, and its `art.js` and `motion.js` for patterns. Only open `journeys/taiwan/` if you need a second example. Write each file in one go, don't re-read files you've just written, and let the scripts in step 6 do the checking. Only dig into output when something fails.

UI copy is Dutch; code, comments and commit messages are English. The copy is warm, encouraging and personal to Alex (11) and papa Jeremy, with no pressure and nothing left over from another journey.

## 1. Confirm the input

- Check there is a title, 3–5 paragraphs and two open questions. If the open questions are missing, ask for them before writing anything. If a paragraph is very long (over ~150 words), say so and ask whether to keep it; don't split it yourself.
- Suggest a slug (lowercase, dashes, e.g. `ijsland`) and the next number (`02`, `03`, …). Ask only if unclear.
- Never change the text or the open questions. Point out typos or factual doubts you notice and let Jeremy decide.

## 2. `journeys/<slug>/text.md`

`# Title`, a blank line, then the paragraphs exactly as supplied, separated by blank lines. `*word*` marks emphasis. Nothing else in the file: the open questions go in `journey.js`, not here.

## 3. `journeys/<slug>/journey.js`

Default export following the Taiwan schema: `slug`, `name` (short, for the switcher), `number`, `meta`, `card`, `home`, `chapters`, `dictionary`, `questions`, `written`, `quiz`, `completion`, `art`, `animate`. Plain text only; `*emphasis*` is allowed; no HTML.

- **Chapters:** one per paragraph, in order. Each has `title`, `short`, `label` (CAPS place/theme line), `icon` (one typographic symbol such as ♧ ❧ ✳ ☼), `aside`, `caption`, `note`. `variants` is optional (illustration switcher buttons, like Taiwan's chapter 4).
- **Glossary:** 5–10 words that are hard for an 11-year-old, written exactly as they appear in the text (including inflection, e.g. `revolutionairs`). Definitions are one short, child-friendly sentence.
- **7 multiple-choice questions:** 4 options each, one clearly correct and answerable from the text alone.
  - Spread the correct answers over A–D (no letter more than 3 times).
  - Cover every chapter at least once and set `chapter` to where the answer is.
  - Include at least one cause-and-effect question and one word-in-context question. The last question asks for the main message of the whole text.
  - Wrong options are plausible but clearly wrong on rereading; no trick questions, no "all of the above".
  - `explanation` points back to what the text says, in one or two sentences.
- **2 open questions:** Jeremy's two questions, word for word and in his order. You add `label` (`TEKSTBEGRIP & ANALYSE` or `WOORDENSCHAT`), `chapter` (the chapter to reread) and `model`: an example answer in simple sentences, taken from the text, that Alex can compare with.
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

`export function animate({ gsap, q, random, alive })`: the hero choreography. Keep it subtle, not a flash ad. Use a short entrance, then slow loops (5–30 s) of small transforms and opacity. One occasional coordinated moment (like Taiwan's breeze) is welcome. Check `alive()` before scheduling anything from a callback. The shared `motion.js` already handles quiet mode, reduced motion and clean-up.

## 6. Register and check

1. Add the journey to `journeys/index.js`, in display order.
2. `node --check` each new file, then `npm run check`. Fix every error; handle warnings or explain them.
3. `npm run check:browser -- <slug>`. It covers the switcher, home, hero motion, every chapter and variant, the glossary, all questions, the model answers, the score, saving, reset, quiet mode, reduced motion and 360px layouts, in a throwaway profile. It prints only failures and a summary line (about 20 seconds per journey).
4. Look at the art as text (the Read tool may not show images here):
   - Hero layout and motion: `npm run screenshot -- '#/<slug>' --selector=.hero-art --at=3000,5000 --text=60 --diff`
   - Each chapter: `npm run screenshot -- '#/<slug>/chapter-<i>' --selector=#chapter-art --text=56`
   In the tone map, darker characters are darker areas; check that shapes sit where you drew them and nothing leaves a gap (for example, sky showing between layers). In the diff map, the moving parts should appear and the rest stay blank. Ask Jeremy to judge colours and feel.
5. Add the journey to the list in `README.md` and the "Journeys so far" line in `AGENTS.md`.
6. Commit on a branch with an English message, and ask Jeremy to review it in the browser before merging.
