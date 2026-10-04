# Project overview

This is a personalised Dutch reading-comprehension app (begrijpend lezen) for Alex, Jeremy’s son. It makes daily reading fun through calm, illustrated reading journeys (leesreizen). Each journey is one Dutch text and two open questions supplied by Jeremy, with illustrations, multiple-choice questions and model answers written by Claude at development time. The first journey is about Taiwanese tea, from mountain-grown oolong to bubble tea. The app is explicitly a gift from papa Jeremy to Alex.

## Start here

- **Journeys so far:** `01 taiwan` (Taiwanese tea), `02 smaken-verleden` (how colonial history shaped Taiwanese food), `03 hongkong` (Hong Kong's growth and its east-meets-west food), `04 tempels` (the gods and goddesses of Taiwan's temples), `05 pizza` (the strangest pizza flavours of Asia), `06 a350` (flying the Airbus A350 to Hong Kong) and `07 website` (how alex-reads.ink works, from the name to the server). The registry is `journeys/index.js`.
- **Adding a journey:** Jeremy pastes a Dutch text (title + 3–5 paragraphs) and two open questions. Run the `/new-journey` skill (`.claude/skills/new-journey/SKILL.md`) and follow it step by step.
- **Other changes:** read the relevant files, make the change, run the checks under Verification, and describe what was verified and what wasn’t.
- **Git:** Jeremy is the only developer, and this is a personal project. Work happens on `main`. Do not create feature branches or pull requests. A new journey is committed on `main` as part of adding it. Any other change is committed and pushed only when Jeremy asks, and the push goes straight to `main` on the public GitHub repo `jphartley/alex-leesreizen`. Once Railway is connected, that push publishes `https://alex-reads.ink` (see `docs/railway.md`). Because the repo is public, never commit secrets or personal details about Alex beyond his first name (no age, school, photos or saved answers). Commit messages are English and end with the attribution line the environment provides.
- **Alex’s data:** never open or test in Alex’s browser profile. Saved answers must survive every change (see the storage section below).
- **Replies to Jeremy:** keep answers to simple questions short and direct; save detail for when it’s asked for.
- **No knowledge graph:** this project has no `graphify-out/`. Don’t run `graphify update .` here; it creates one.

## Stack and running locally

- Plain HTML, CSS, and browser JavaScript modules; no framework, build step, or package dependencies. GSAP is vendored in `vendor/` (loaded as classic scripts) for the hero-scene animations.
- Requires Node.js 18 or newer. Run `npm start` (foreground), or `npm run serve [-- <slug>]` to start it in the background and get the link; then open `http://localhost:3000`. `npm run check` validates all journeys.
- `server.mjs` binds to `127.0.0.1` locally, and to `0.0.0.0` when `RAILWAY_ENVIRONMENT` is set. It supports a `PORT` environment variable, and serves an explicit allowlist of core files plus journey files matching `journeys/<slug>/{text.md,journey.js,art.js,motion.js}`. Add other new browser assets to the allowlist. The app reads no other environment variables.
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
- `scripts/check-journeys.mjs` (`npm run check`): static validator for journeys and the storage migration.
- `scripts/check-browser.mjs` (`npm run check:browser`) and `scripts/screenshot.mjs` (`npm run screenshot`): browser checks and screenshots as text; shared code in `scripts/lib/`.
- `.claude/skills/new-journey/SKILL.md`: the checklist for adding a journey. Use it whenever Jeremy supplies a new text.
- `server.mjs`: local static server; `scripts/serve.mjs` (`npm run serve`) starts it in the background if it isn't running. `README.md`: user-facing setup and feature overview.
- `COSTS.md`: optional log of what a journey cost to generate, only when Jeremy volunteers usage readings. Never ask for them.

## Current experience

The landing page (“Kies je leesreis”) shows one illustrated card per journey, with no progress or state. The header switcher changes journey from anywhere. Each journey home leads through 3–5 illustrated chapters (one per paragraph), then seven multiple-choice questions followed by two written questions. Multiple-choice answers receive explanations and contribute to a score out of seven. Written answers are compared with example answers by the reader, not automatically graded. A personal message from papa Jeremy closes each journey.

Routes are `#/` (landing) and, per journey, `#/<slug>`, `#/<slug>/chapter-0` onwards, `#/<slug>/quiz-1` onwards, `#/<slug>/quiz-done` (completion), and `#/<slug>/reading` (the complete text). Old single-journey routes (`#home`, `#chapter-N`, `#quiz-N`, `#reading`) redirect to Taiwan. Navigation is free: any chapter or question can be opened at any time, and browser back and forward work.

Answers and settings are stored only in this browser’s `localStorage`, under `alex-leesavontuur-v2`: shared settings plus answers per journey slug. On first load, answers from the old key `alex-thee-avontuur-v1` migrate to Taiwan. The v1 key is only ever read, never written or deleted, so it stays as a backup. Reading progress is deliberately not tracked: no read markers, “continue” targets, or gates that stop the reader moving on. Multiple-choice answers stay locked until a reset. A reset button (journey home and completion) clears that journey’s answers after a confirmation and keeps settings and other journeys. There is no account system or remote answer storage.

## Conventions to preserve

- All user-facing copy must be in Dutch, including controls, explanations, accessibility labels, and errors.
- Everything else is in English: README, AGENTS.md, code comments, identifiers, commit messages, and other documentation. Dutch is only for the UI and the reading content. Storage keys and journey slugs are data and stay as they are.
- Keep the experience personal to Alex and papa Jeremy, warm, encouraging, and suitable for a young reader. There is no timer or pressure to rush.
- Never change a journey’s text unless asked. Answers are stored by question index, so never reorder, insert, or remove questions of a published journey.
- Journey copy is plain text with optional `*emphasis*`; `app.js` escapes it through `inline()`. Escape source text, glossary definitions, and written answers before inserting them into HTML.
- Every SVG `id` starts with the journey slug, because the landing page shows several journeys at once.
- Keep the visual style consistent across journeys: warm paper, muted greens, serif reading text, flat and gentle illustrations. Animation stays subtle.
- “Rustig lezen” hides illustrations, stops animations, gives the reading text more space, and shows an explanatory notice. The separate letter-size button enlarges text.
- Preserve keyboard access, visible focus, responsive layouts (down to 360px), and support for `prefers-reduced-motion`. CSS rules do not stop GSAP: `motion.js` pauses it in quiet mode and skips it under reduced motion.

## Verification

For JavaScript changes, run `node --check` on the changed files, `npm run check`, and `npm run check:browser`.

### Browser checks

- `npm run check:browser [-- <slug>...]` runs the full end-to-end check for every journey (or the ones named), driven by the journey data. It starts its own server and a headless Chrome with a throwaway profile, and prints only failures plus a summary. It can't tell whether a quiz answer key is factually right; that needs a human read.
- `npm run screenshot -- '<hash>' [--selector=.hero-art] [--at=3000,5000] [--text[=cols]] [--diff] [--mobile] [--reduced-motion]` saves PNGs to `.screenshots/` (gitignored). The Read tool may return nothing for images in this environment, so `--text` prints a tone map (layout) and `--diff` a change map between frames (motion). Ask Jeremy to judge colour and feel.
- For a one-off check, write a short script on top of `scripts/lib/browser.mjs` (`startServer`, `launch`, `page.eval/go/reload/screenshot/viewport/reducedMotion`). Seed `localStorage` and then `page.reload()`: a hash change alone doesn't reload the page. Chrome is found automatically on macOS and Linux, or set `CHROME=/path`.
- Playwright isn't installed and the npm registry may be unreachable, so don't rely on installing packages. If a browser library is ever needed, download a single file from cdn.jsdelivr.net, as was done for GSAP.

For changes to the reading or quiz flow, check it in a browser for every journey: landing, switcher, chapters, glossary, multiple-choice-first order, answer explanations, written-answer comparison, free previous/next and question jumping, final score, per-journey reset, and saved answers after reload. For visual or settings changes, check desktop and mobile layouts and confirm that quiet mode visibly switches on and off. Use a separate browser profile or test context so checks do not overwrite Alex’s saved answers.
