# Jeevan Katta — portfolio

An "operator console": a profile header with a live system-status block, a fixed sidebar,
and a content card the sidebar swaps. Only one section renders at a time, so nothing is
ever a long scroll. The Infrastructure section carries a live WebGL cluster whose nodes
double as navigation.

React 19 + Three.js + Vite. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

> This repo doubles as the GitHub **profile** repo (`Jeevankatta/Jeevankatta`), so the root
> `README.md` is the profile README shown on github.com/Jeevankatta. Do not overwrite it —
> project docs live here, in `README-project.md`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the build
```

## How it fits together

| file | role |
|---|---|
| `src/App.jsx` | section list, all section bodies, WebGL detection |
| `src/components/Profile.jsx` | header card: monogram, system status, CV button, socials |
| `src/components/Sidebar.jsx` | the nav that swaps the content card |
| `src/components/Scene.jsx` | the Three.js cluster in the Infrastructure section |
| `src/components/Entry.jsx` | one project, system or role |
| `src/components/Icon.jsx` | sidebar icons |
| `src/data.js` | **all content** |

### Notes

- Three.js is loaded with a dynamic `import()`, so it is a separate chunk — the console
  paints from a ~71 kB gzipped bundle and the scene arrives only on the Infra section.
- Cluster labels are real `<button>` elements positioned by projecting each node's world
  position each frame. No raycasting, so they stay keyboard reachable and screen-reader
  legible, and clicking one navigates to that section.
- The cluster scales to fit its card's **height**, which is what constrains a wide short
  container — see `resize()` in `Scene.jsx`.
- No WebGL renders a written explanation in place of the diagram; the rest of the site is
  unaffected.
- `prefers-reduced-motion` stops the drift, the packet flow and the pod bob.

## Editing content

Everything is in `src/data.js`.

- `PROFILE` — name, role, links, summary
- `HIGHLIGHTS` — the four "By the Numbers" tiles
- `DOING` — the four "What I'm Doing" cards
- `PIPELINE` — the commit-to-production cards in the Infra section
- `ROWS` — `row-projects`, `row-work`, `row-stack`, `row-background`

Each item takes `title`, `sub`, `badge`, `year`, `role`, `stack`, `link`, `desc`, `points`.
Commas inside parentheses in `stack` are safe — `splitStack.js` keeps
`Python (automation, data processing)` as one chip.

## Before going live

- [ ] Drop `resume.pdf` into `public/` — **Download CV** in the header 404s without it
- [ ] Replace the `HIGHLIGHTS` figures with real scale numbers (clusters, deploy frequency,
      environment size) — infra hiring managers filter on scale
- [ ] Check the years on the AWS cert, ETL and Oracle cards
- [ ] Decide whether to name the banking client (currently "US banking client")
