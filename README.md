# Thomas Weigert · Frontend Engineer Portfolio

Personal portfolio of Thomas Weigert, frontend engineer in Hamburg (TypeScript, React, Next.js). Bilingual (DE/EN), statically exported with Next.js, with a scroll-driven canvas hero and a reduced-motion reading mode.

**Live:** https://portfolio-lovat-mu-44.vercel.app (German: `/de/`, English: `/en/`)

<!-- TODO: add docs/screenshot.png (1440x900, first screen) and replace the line below with:
![Screenshot of the portfolio](docs/screenshot.png) -->
_Screenshot: coming soon._

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, design tokens in `src/app/globals.css` |
| Fonts | `next/font/google` (Fraunces, Plus Jakarta Sans, JetBrains Mono), self-hosted at build time |
| Icons | lucide-react |
| Quality | ESLint (`eslint-config-next`), `tsc --noEmit` |
| Hosting | Vercel (static files from `out/`) |

## Architecture

- **Static export.** `next build` renders every route to plain HTML in `out/`. Crawlers and link previews get the full text of the page; no server runtime is needed.
- **Route-based i18n.** `src/app/[lang]/` with `generateStaticParams` produces `/de/` and `/en/`, each with its own `<html lang>`, canonical URL and hreflang alternates. `/` forwards to `/de/` with a meta refresh, since a static export cannot send server redirects. No i18n library.
- **Single data source.** All content (profile, projects, experience, UI strings) lives in typed objects in `src/data/portfolioData.ts`. Pages pick the dictionary by route via `src/i18n/dictionaries.ts` and pass it down as props.
- **Server vs. client components.** Sections are server components. Only interactive parts are client components: navbar (menu, motion toggle), hero stage (scroll progress), project grid and modal, contact form, copy button, live clock.
- **Canvas hero.** The hero text is real HTML (`HeroIntro`, scene overlays). The canvas (`HeroCanvas`) is loaded with `next/dynamic` and `ssr: false`, fetches its scene images only after the page has loaded, and pauses when the tab is hidden or the hero leaves the viewport.
- **Reduced motion.** `prefers-reduced-motion` switches to a static editorial layout without the canvas; visitors can toggle it in the navbar.
- **Metadata.** Per-language title, description, Open Graph and Twitter cards, a statically generated OG image per language (`/de/og-image.png`, `/en/og-image.png`), `sitemap.xml`, `robots.txt` and JSON-LD (`Person`).
- **Contact form.** Posts from the browser to a form endpoint (FormSubmit by default); on failure it offers a prefilled `mailto:` link.

```
src/
  app/
    (redirect)/        "/" -> /de/
    [lang]/            page, layout + metadata, og-image.png route
    sitemap.ts, robots.ts, globals.css
  components/          sections (server) and interactive parts (client)
  data/portfolioData.ts
  i18n/dictionaries.ts
  lib/                 fonts, site URL
public/                images, CV, favicon
```

## Local setup

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000/de/
npm run build      # static export to out/ (preview with: npm start)
```

Checks: `npm run typecheck` and `npm run lint`.

## Deployment

Vercel with the Next.js framework preset and default build settings (`npm run build`). The static export in `out/` is served as is; no `vercel.json` is needed.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base for canonical URLs, Open Graph, sitemap and JSON-LD | `https://portfolio-lovat-mu-44.vercel.app` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Endpoint the contact form posts to | `https://formsubmit.co/ajax/thomasweigert91@gmail.com` |

> **TODO (November 2026):** move to the own domain. Buy `thomasweigert.dev`, connect it in Vercel and set `NEXT_PUBLIC_SITE_URL=https://thomasweigert.dev`. No code change is needed.

See `.env.example`.

## Contact

- Email: [thomasweigert91@gmail.com](mailto:thomasweigert91@gmail.com)
- LinkedIn: [linkedin.com/in/thomas-weigert-frontend](https://linkedin.com/in/thomas-weigert-frontend/)
- GitHub: [github.com/thomasweigert91](https://github.com/thomasweigert91)

Fonts in `src/assets/fonts/` (used for the OG image) are licensed under the SIL Open Font License; see the accompanying `OFL-*.txt` files.
