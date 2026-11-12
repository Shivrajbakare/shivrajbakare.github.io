# Shivraj Bakare: Portfolio

An editorial portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Editing content

All copy lives in **`src/content/site.ts`**: profile, projects, experience, education, skills, achievements and the "Beyond" section. Every fact there comes from `shivraj-bakare-resume.pdf` or a public GitHub repo. Update that file and the pages update with it.

- To replace the résumé, overwrite `public/shivraj-bakare-resume.pdf` (keep the filename, or change `profile.resume`).
- To add a project, add an entry to `projects`. It gets a case-study page at `/work/<slug>` automatically. Each project also needs a diagram ("plate") in `src/components/plates/Plates.tsx`.

## Structure

```
src/app/                 layout (fonts, SEO, loader), home page, /work/[slug] case studies,
                         sitemap, robots, OG image, icon, 404
src/components/sections  Hero, About, Projects, Experience, Education, Skills,
                         Achievements, Beyond, Contact
src/components/plates    Per-project SVG diagrams
src/components           Nav, Reveal/RevealWords, CountUp, LatticeCanvas, SectionHead, SiteFooter
```

## Deploying

Vercel works with no configuration. For any other host, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) so canonical URLs, the sitemap and Open Graph tags point at the right domain.

## Design notes

- Type: Instrument Serif (display), DM Sans (body), IBM Plex Mono (labels).
- Palette: ivory paper `#f2eee5`, ink `#1b1a17`, burnt orange `#b0502a`, olive `#5b6140`.
- The hero lattice is a live phonon simulation (`LatticeCanvas.tsx`). Moving the pointer over it adds "heat".
- Animation respects `prefers-reduced-motion`: the loader is skipped and motion collapses to instant.
