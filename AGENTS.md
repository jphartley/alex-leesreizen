# Project overview

This is a personalised Dutch reading-comprehension app (begrijpend lezen) for Alex, Jeremy’s 11-year-old son. It makes daily reading fun through a calm, illustrated journey. The current story is about Taiwanese tea, from mountain-grown oolong to bubble tea. The app is explicitly a gift from papa Jeremy to Alex.

## Stack and running locally

- Plain HTML, CSS, and browser JavaScript modules; no framework, build step, or package dependencies. GSAP is vendored in `vendor/` (loaded as classic scripts) for the mountain animation.
- Requires Node.js 18 or newer. Run `npm start`, then open `http://localhost:3000`.
- `server.mjs` serves an explicit allowlist of files, binds to `127.0.0.1`, and supports a `PORT` environment variable. Add new browser assets to its allowlist when needed.
- Open through the local server, not directly as a file: the app fetches its Markdown source.
- Google Fonts supplies the typefaces; local fallback fonts work without internet. Artwork is local SVG.

## Main files

- `09-26-alex-reading.md`: original Dutch reading text and three comprehension questions.
- `index.html`: page shell, personal dedication, reading settings, and quiet-mode notice.
- `app.js`: Markdown loading, chapter content, vocabulary definitions, hash navigation, quiz logic, and saved progress.
- `art.js`: original SVG illustrations of mountains, tea varieties, and bubble tea.
- `motion.js`: GSAP animation of the mountain scene (entrance, gentle loops, occasional breeze). Other illustrations use CSS animation.
- `styles.css`: responsive layouts, colours, typography, animations, and reading modes.
- `server.mjs`: local static server.
- `README.md`: user-facing setup and feature overview.

## Current experience

The home page leads through four illustrated chapters, then seven multiple-choice questions followed by three written questions. Multiple-choice answers receive explanations and contribute to a score out of seven. Written answers are compared with example answers by the reader, not automatically graded. A personal message from papa Jeremy closes the journey.

Routes are `#home`, `#chapter-0` through `#chapter-3`, `#quiz-1` through `#quiz-10`, `#quiz-done` (completion), and `#reading` (the complete reading text). `#quiz` redirects to `#quiz-1`. Navigation is free: any chapter or question can be opened at any time, and browser back and forward work. Readers can revisit the text during the quiz.

Answers and settings are stored only in this browser’s `localStorage`, under `alex-thee-avontuur-v1`. Reading progress is deliberately not tracked: no read markers, “continue” targets, or gates that stop the reader moving on. Multiple-choice answers stay locked until a reset. A reset button (home page and completion) clears all answers after a confirmation and keeps settings. There is no account system or remote answer storage. Preserve existing saved answers when changing the flow. Written-answer indexes are separate from their positions in the overall quiz.

## Conventions to preserve

- All user-facing copy must be in Dutch, including controls, explanations, accessibility labels, and errors.
- Everything else is in English: README, AGENTS.md, code comments, identifiers, commit messages, and other documentation. Dutch is only for the UI and the reading content. The storage key `alex-thee-avontuur-v1` stays as it is so saved progress is kept.
- Keep the experience personal to Alex and papa Jeremy, warm, encouraging, and suitable for an 11-year-old. There is no timer or pressure to rush.
- Preserve the original reading text and questions unless asked to change them. The current parser expects exactly four paragraphs and three numbered questions, using `## Begripsvragen` as the section boundary; it is not a general Markdown parser. Changing the source structure requires updating the parser and chapter/question mappings together.
- Keep the visual style consistent: warm paper, muted greens, serif reading text, and gentle tea-themed illustrations.
- “Rustig lezen” hides illustrations, stops animations, gives the reading text more space, and shows an explanatory notice. The separate letter-size button enlarges text.
- Preserve keyboard access, visible focus, responsive layouts, and support for `prefers-reduced-motion`. CSS rules do not stop GSAP: `motion.js` pauses it in quiet mode and skips it under reduced motion.
- Escape source text and written answers before inserting them into HTML.

## Verification

There is no committed automated test suite. For JavaScript changes, run `node --check app.js`, `node --check art.js`, `node --check motion.js`, and `node --check server.mjs` as appropriate.

For changes to the reading or quiz flow, check it in a browser: chapters, multiple-choice-first order, answer explanations, written-answer comparison, free previous/next and question jumping, final score, reset, and saved answers after reload. For visual or settings changes, check desktop and mobile layouts and confirm that quiet mode visibly switches on and off. Use a separate browser profile or test context so checks do not overwrite Alex’s saved answers.
