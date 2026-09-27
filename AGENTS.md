# Project overview

This is a personalised Dutch reading-comprehension app (begrijpend lezen) for Alex, Jeremy’s 11-year-old son. It makes daily reading fun through calm, illustrated reading journeys (leesreizen). Each journey is one Dutch text and two open questions supplied by Jeremy, with illustrations, multiple-choice questions and model answers written by Claude at development time. The first journey is about Taiwanese tea, from mountain-grown oolong to bubble tea. The app is explicitly a gift from papa Jeremy to Alex.

## Stack and running locally

- Plain HTML, CSS, and browser JavaScript modules; no framework, build step, or package dependencies. GSAP is vendored in `vendor/` (loaded as classic scripts) for the hero-scene animations.
- Requires Node.js 18 or newer. Run `npm start`, then open `http://localhost:3000`. `npm run check` validates all journeys.
- `server.mjs` binds to `127.0.0.1`, supports a `PORT` environment variable, and serves an explicit allowlist of core files plus journey files matching `journeys/<slug>/{text.md,journey.js,art.js,motion.js}`. Add other new browser assets to the allowlist.
- Open through the local server, not directly as a file: the app fetches each journey’s Markdown text.
- Google Fonts supplies the typefaces; local fallback fonts work without internet. Artwork is local SVG.

## Main files

- `index.html`: page shell, header with journey switcher, reading settings, and quiet-mode notice.
- `app.js`: journey-agnostic views (landing, journey home, chapters, quiz, completion, full reading), router, glossary, quiz logic, and switcher.
- `store.js`: saved data (load, migration from v1, save).
- `motion.js`: shared GSAP runtime; each journey supplies its own choreography.
- `styles.css`: responsive layouts, colours, typography, animations (including the shared `.m-*` motion classes), and reading modes.
- `journeys/index.js`: registry of journeys in display order.
- `journeys/<slug>/`: `text.md` (title and paragraphs), `journey.js` (all copy, chapters, glossary, questions), `art.js` (SVG illustrations), `motion.js` (hero animation).
- `scripts/check-journeys.mjs`: dev-time validator for journeys and the storage migration.
- `.claude/skills/new-journey/SKILL.md`: the checklist for adding a journey. Use it whenever Jeremy supplies a new text.
- `server.mjs`: local static server. `README.md`: user-facing setup and feature overview.

## Current experience

The landing page (“Kies je leesreis”) shows one illustrated card per journey, with no progress or state. The header switcher changes journey from anywhere. Each journey home leads through 3–5 illustrated chapters (one per paragraph), then seven multiple-choice questions followed by two written questions. Multiple-choice answers receive explanations and contribute to a score out of seven. Written answers are compared with example answers by the reader, not automatically graded. A personal message from papa Jeremy closes each journey.

Routes are `#/` (landing) and, per journey, `#/<slug>`, `#/<slug>/chapter-0` onwards, `#/<slug>/quiz-1` onwards, `#/<slug>/quiz-done` (completion), and `#/<slug>/reading` (the complete text). Old single-journey routes (`#home`, `#chapter-N`, `#quiz-N`, `#reading`) redirect to Taiwan. Navigation is free: any chapter or question can be opened at any time, and browser back and forward work.

Answers and settings are stored only in this browser’s `localStorage`, under `alex-leesavontuur-v2`: shared settings plus answers per journey slug. On first load, answers from the old key `alex-thee-avontuur-v1` migrate to Taiwan. The v1 key is only ever read, never written or deleted, so it stays as a backup. Reading progress is deliberately not tracked: no read markers, “continue” targets, or gates that stop the reader moving on. Multiple-choice answers stay locked until a reset. A reset button (journey home and completion) clears that journey’s answers after a confirmation and keeps settings and other journeys. There is no account system or remote answer storage.

## Conventions to preserve

- All user-facing copy must be in Dutch, including controls, explanations, accessibility labels, and errors.
- Everything else is in English: README, AGENTS.md, code comments, identifiers, commit messages, and other documentation. Dutch is only for the UI and the reading content. Storage keys and journey slugs are data and stay as they are.
- Keep the experience personal to Alex and papa Jeremy, warm, encouraging, and suitable for an 11-year-old. There is no timer or pressure to rush.
- Never change a journey’s text unless asked. Answers are stored by question index, so never reorder, insert, or remove questions of a published journey.
- Journey copy is plain text with optional `*emphasis*`; `app.js` escapes it through `inline()`. Escape source text, glossary definitions, and written answers before inserting them into HTML.
- Every SVG `id` starts with the journey slug, because the landing page shows several journeys at once.
- Keep the visual style consistent across journeys: warm paper, muted greens, serif reading text, flat and gentle illustrations. Animation stays subtle.
- “Rustig lezen” hides illustrations, stops animations, gives the reading text more space, and shows an explanatory notice. The separate letter-size button enlarges text.
- Preserve keyboard access, visible focus, responsive layouts (down to 360px), and support for `prefers-reduced-motion`. CSS rules do not stop GSAP: `motion.js` pauses it in quiet mode and skips it under reduced motion.

## Verification

There is no committed automated test suite. For JavaScript changes, run `node --check` on the changed files and `npm run check`.

For changes to the reading or quiz flow, check it in a browser for every journey: landing, switcher, chapters, glossary, multiple-choice-first order, answer explanations, written-answer comparison, free previous/next and question jumping, final score, per-journey reset, and saved answers after reload. For visual or settings changes, check desktop and mobile layouts and confirm that quiet mode visibly switches on and off. Use a separate browser profile or test context so checks do not overwrite Alex’s saved answers.
