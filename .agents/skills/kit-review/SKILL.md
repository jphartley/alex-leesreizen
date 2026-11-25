---
name: kit-review
description: Review the shared kit (art-kit.js and game.js) against the journeys added since the last review, and propose additions, fixes or removals. Use when Jeremy sends /kit-review or asks to review the kit.
---

# Review the shared kit

Read `docs/kit.md` first: its rules (fit first), the **Last review** and **Next review due** lines, and the log. A review can run at any time, also before it is due.

1. **Collect.** The log entries since the last review, and the `art.js` and `motion.js` of every journey added since then (numbers above the last review). For repeated code (step 2), all journeys count. Skim the kit files themselves (`art-kit.js`, `game.js`) for what exists.
2. **Look for:**
   - drawing or motion code repeated in two or more journeys: a candidate for the kit. Search **all** journeys for this, not only the recent ones: older journeys keep their own copies, so a helper repeated across older journeys counts too, and a shape in a recent journey counts more if older journeys already drew it. Search rather than read everything: `grep` for helper names and signatures (`grep -n "^const \|^function " journeys/*/art.js journeys/*/motion.js`) and compare the ones that recur;
   - kit pieces that were worked around, copied and altered, or that made a scene worse: fix, loosen or drop them;
   - signs of bias: journeys that look too alike, or kit figures used where the story didn't call for them.
3. **Propose.** Give Jeremy a short list (add, change, leave alone), each with the journeys it comes from and a rough size. Change nothing without his OK. If nothing is worth changing, say so; that is a fine outcome.
4. **Apply what he approves.** Kit changes must leave every journey that already imports the kit looking and playing the same: `node --check` the changed files, `npm run check`, `npm run check:browser -- <slugs that import the kit>` (find them with `grep -l "art-kit.js\|game.js" journeys/*/*.js`), `npm run play` for their games, and before/after screenshots of their scenes. Older journeys keep their own copies unless Jeremy asks. Update the comments in the kit files, and the lists of helpers in `AGENTS.md` and the two journey skills if helpers were added or removed.
5. **Update the record in `docs/kit.md`,** also when nothing changed: move the reviewed log entries into a one-line summary under *Past reviews*, set **Last review** to the newest journey number and **Next review due** to that number plus three. This stops the reminder.
6. Commit on `main` only when Jeremy asks, as with any change that isn't a new journey.
