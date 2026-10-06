# Portfolio — how it's built

A single scrolling page: a live pipeline console in the hero, highlights, production work,
projects with diagrams, a toolchain grid, a terminal you can type into, background and contact.

React 19 + Vite, fonts self-hosted with Fontsource. Deployed to GitHub Pages by GitHub Actions
on every push to `main`. No analytics or tracking.

| File | What it holds |
|---|---|
| `src/data.js` | all content: profile, projects, work, toolchain, background, highlights, pipeline |
| `src/App.jsx` | every section, the pipeline console and the terminal commands |
| `src/styles.css` | the whole design (dark theme, mint and cyan accents) |
| `public/Katta_Jeevan_Resume.pdf` | the CV behind every Download CV button |

To change wording, edit `src/data.js` and push. Animations switch off for visitors who
ask for reduced motion.
