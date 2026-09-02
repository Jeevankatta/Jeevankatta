# Jeevan Katta — portfolio

A streaming-service-styled portfolio for a DevOps and Cloud engineer.
React 19 + Vite + Framer Motion. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the build
```

## Deploy

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Source → GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys.

If the site lives at `https://<user>.github.io/<repo>/` rather than a custom domain
or `<user>.github.io`, set `base: '/<repo>/'` in `vite.config.js`.

## Editing content

Everything is in `src/data.js`. Nothing else needs touching to change text.

- `PROFILE` — name, role, links, summary, hero tags
- `HERO_DETAIL` — what the hero "More info" button opens
- `ROWS` — the four rows and their cards

Each card takes:

| field | purpose |
|---|---|
| `title`, `sub` | card face |
| `glyph` | large watermark character |
| `palette` | `red` `blue` `teal` `amber` `violet` `slate` `green` `rose` |
| `badge`, `year` | the line under the card |
| `progress` | optional 0–100, draws a red progress bar |
| `desc`, `points` | modal body |
| `role`, `stack`, `link` | modal sidebar |

## Before going live

- [ ] Drop `resume.pdf` into `public/`
- [ ] Check the years on the AWS cert, ETL and Oracle cards
- [ ] Decide whether to name the banking client (currently "US banking client")
