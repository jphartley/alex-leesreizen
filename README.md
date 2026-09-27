# Alex’s reading journeys

Personalised Dutch reading journeys (leesreizen), made especially for Alex by papa Jeremy.

## Running it

With Node.js 18 or newer, run this in the project folder:

```sh
npm start
```

Then open [the reading journeys](http://localhost:3000).

## What’s inside

- A landing page and header switcher to choose a journey. Journeys so far:
  - 01 · Van bergtop tot bubble tea (Taiwanese tea)
  - 02 · Smaken uit het verleden (how colonial history shaped Taiwanese food)
- Each journey: 3–5 illustrated chapters, word explanations, seven multiple-choice questions, and two written questions with example answers to compare, alone or together with papa. Written answers are not graded automatically.
- An explanation for every quiz answer, a personal closing message, and the option to practise again.
- Quiet reading mode, larger text, keyboard support, and support for reduced motion.
- Answers are stored locally in this browser, per journey. No answers are sent anywhere.

The illustrations are original local SVG drawings. Each journey’s opening scene is animated with GSAP, which is stored locally in `vendor/`. Only the fonts load from Google Fonts; without internet, the page uses built-in fallback fonts. There are no packages to install. The web server only listens on this computer.

## Adding a journey

Give Claude Code the Dutch text (a title and 3–5 paragraphs) and two open questions, and run `/new-journey`. It writes the multiple-choice questions, model answers, illustrations and animation into `journeys/<slug>/`. Run `npm run check` to validate all journeys.

## Working on it with Claude Code

Start a new session in this folder. `AGENTS.md` has the project rules, the checks to run and how to test in a browser without touching Alex’s saved answers. Adding a journey uses the `/new-journey` skill.
