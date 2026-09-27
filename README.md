# Alex’s tea adventure

A personalised Dutch reading adventure, made especially for Alex by papa Jeremy.

## Running it

With Node.js 18 or newer, run this in the project folder:

```sh
npm start
```

Then open [the tea adventure](http://localhost:3000).

## What’s inside

- The four original paragraphs and three comprehension questions are read directly from `09-26-alex-reading.md`.
- Four illustrated chapters, word explanations, and seven extra multiple-choice questions.
- Written questions with example answers to compare, alone or together with papa. These are not graded automatically.
- An explanation for every quiz answer, a personal closing message, and the option to practise again.
- Quiet reading mode, larger text, keyboard support, and support for reduced motion.
- Progress and answers are stored locally in this browser. No answers are sent anywhere.

The illustrations are original local SVG drawings. The mountain is animated with GSAP, which is stored locally in `vendor/`. Only the fonts load from Google Fonts; without internet, the page uses built-in fallback fonts. There are no packages to install. The web server only listens on this computer.
