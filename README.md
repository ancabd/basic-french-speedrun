# Cartes

A self-paced French learning game for your phone. You follow a 21-day plan on a map. Each day has lessons (grammar, listening, writing, speaking and one or two short reading texts). Every lesson you pass earns a card, and once the day's lessons are done you fight that day's boss with your deck. During a fight, every attack comes with a multiple-choice French question that decides how hard it lands.

## Run it

**Just open `index.html` in a browser.** It is one self-contained file with no install and no server. Progress is saved in that browser.

To use it on your phone, the easiest options are:

- **GitHub Pages:** in the repository settings, open *Pages*, choose *Deploy from a branch*, pick `main` and `/ (root)`. The app is then at `https://<you>.github.io/<repo>/`. On the phone, use *Add to Home Screen* for an app-like icon.
- **Inside claude.ai** (as a published artifact). This also syncs progress to your account and turns on the two features that use Claude: fresh grammar sentences and corrections of your free written and spoken answers. Outside claude.ai those quietly fall back: grammar uses the built-in sentence patterns and free answers are judged on length.

## Change it

The app is built from small source files in `src/`. **Never edit `index.html` by hand.** Edit `src/`, then rebuild:

```
node build.js
```

That needs only Node.js (18 or newer), with no packages. It joins `src/index.html`, `src/styles.css` and every `src/js/*.js` file, in filename order, into `index.html`.

| File | What is in it |
| --- | --- |
| `src/js/21-course-plan.js` | The four phases: goals, lesson weights per skill, checklists, day notes |
| `src/js/22-course-grammar.js` | Grammar concepts and their sentence patterns, each with the day it unlocks |
| `src/js/23-course-numbers.js` | Numbers (generated, so every spelling is right) |
| `src/js/24-course-vocab.js` | Vocabulary lists, each with the day it starts |
| `src/js/26-course-texts.js` | The 35 reading texts with glossaries and questions (format explained at the top) |
| `src/js/28-course-build.js` | Turns the course files into one structure the app reads |
| `src/js/10-game-data.js` | Skills, the 8 cards, the bosses |
| `src/js/20-state.js` | Saved data and how old saves are upgraded |
| `src/js/35-srs.js` | Which words come up, and spaced repetition |
| `src/js/40-lessons.js` | Lessons, free answers, the reading lesson |
| `src/js/50-battle.js` | Fights, boss HP per day; `60`–`70` are the screens; `90-app.js` wires up buttons |

**Course content is separate from your progress.** The save only stores progress (flashcard history by word id, current day, deck, checklist ticks) and lists you import yourself. Fixing a translation or adding a text reaches existing saves automatically. Word ids come from the French text (`v:le-lac`), so changing a word's English keeps its history; changing its French starts it fresh.

**If you change the shape of the saved data**, bump `SCHEMA` in `src/js/20-state.js` and add a step to `MIGRATIONS`, so older saves and backups still load.

## Check it

```
npm install     # once: installs jsdom, used only by the checks
npm test        # rebuilds, then plays through the app in a simulated browser
```

The tests check the course (every day has its texts, every glossary word appears in its text, every question has four options), play through a day from lessons to boss, upgrade a real save from the previous version (`tools/fixtures/schema1-save.json`), and test importing and backups.

```
npm run balance
```

This replays thousands of simulated fights per day and prints new boss HP values for `DAYHP` in `src/js/50-battle.js`. Run it after changing lessons, cards or bosses. The target is that a player answering 75% of questions right, with only the required lessons, wins about 7 fights in 10.
