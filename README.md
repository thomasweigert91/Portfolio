# Thomas Weigert — Personal Frontend Engineer Portfolio

A warm, cinematic, high-performance portfolio website built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and a custom **60 FPS HTML5 Canvas scroll engine**.

Designed and engineered to present the journey, real-world customer projects, and personal values of **Thomas Weigert** — Frontend Engineer specializing in modern React & Next.js ecosystems, performant Nx Monorepos, and business-critical web applications.

---

## 🌿 Concept & Visual Identity

Departing from generic, sterile tech aesthetics, this portfolio communicates personality, grounding, and reliability:

- **Warm Editorial Atmosphere:** Deep hearth charcoal (`#14110F`), walnut timber (`#1A1613`), and solar amber (`#E5983A`) accents.
- **Typography:** **Fraunces** (warm serif editorial display), **Plus Jakarta Sans** (clean, readable interface typography), and **JetBrains Mono** (technical precision and telemetry).
- **Core Philosophy:** Great software is written by people for people. Just like in cooking (*Mise en Place*, precise timing) and finance (accountability, risk analysis), frontend architecture thrives on clean types, thoughtful state management, and reliable execution.

---

## 🚀 Key Features & Architecture

### 1. 60 FPS Cinematic Scroll Stage (`CinematicHero.tsx`)
- High-performance, native HTML5 Canvas rendering loop at 60 FPS without hijacking scroll behavior.
- Ambient golden sunlight motes, depth blur, dynamic camera dolly zoom, and cursor parallax tracking.
- Three semantic narrative scenes reflecting Thomas' journey:
  - **Scene 01 // Wurzeln & Natur (Roots & Nature):** Clarity and focus derived from northern forests, dog walks, and acoustic country music.
  - **Scene 02 // Handwerk & Code (Craft & Precision):** Bridging 8 years of banking experience with modern React, TanStack Query, and Nx Monorepo development.
  - **Scene 03 // Verlässlichkeit & Ankommen (Reliability & Trust):** Evening hearth, warmth, and readiness to bring value to an ambitious team.
- Decoupled HTML typography layer ensuring full text selectable contrast, SEO indexability, and screen-reader accessibility.

### 2. Dual-Mode Motion & Accessibility
- Automatic detection of the OS `prefers-reduced-motion: reduce` media query.
- Interactive toggle in the navigation bar (`60 FPS Motion` ↔ `Modus: Statisch`).
- In static reading mode, the canvas engine gracefully deactivates in favor of a clean, accessible editorial column layout.

### 3. Fully Bilingual Architecture (`[ DE | EN ]`)
- One-click language toggle located in the navigation bar and mobile drawer.
- **Zero-Overhead Typed i18n:** Built on a dedicated React Context (`LanguageContext.tsx`) backed by parallel typed datasets (`portfolioDataDE`, `portfolioDataEN`) and a complete UI dictionary (`uiTranslations`).
- 100% build-time type-safety (`tsc -b`).
- Persistent language choice saved in `localStorage` (`portfolio_lang`) and synchronized with `<html lang="...">` for accessibility.

### 4. Selected Real-World Production Projects (`melting elements`)
- **bAV Admin-Tool (Company Pension Administration):** Business-critical React platform within an Nx monorepo. Legacy refactoring and a 3-second speedup in data tables via intelligent TanStack Query prefetching and caching.
- **Mobile Onboarding App & HR Dashboard (Greenfield):** Next.js, TypeScript, Zustand, Auth.js, React Hook Form, and Zod validation built for a major energy provider.
- **Enterprise Pension Portals:** Modular React components, responsive CSS, and strict web accessibility (a11y) standards.
- Detailed modal drawer (`ProjectModal.tsx`) with key metrics, milestone checklists, and tech chips.

### 5. Personal Values & Passions (`PassionsSection.tsx`)
- What drives Thomas beyond code:
  - 🌲 **Nature & Slowing Down** (Forests and trails in Henstedt-Ulzburg / Hamburg)
  - 🐕 **My Dogs** (Loyalty, daily exercise in all weather, grounding)
  - 🎸 **Country Music & Acoustic Sound** (Authentic storytelling without superficial noise)
  - 🍳 **Cooking & Culinary Craft** (Mise en Place, patience, and timing applied to UI architecture)
  - 🏛️ **8 Years Banking & Finance Roots** (Sparkasse, Finanzcheck, Smava, McMakler)

### 6. Career Timeline & Reference Letter (`ExperienceAndSkills.tsx`)
- Verifiable excerpt from Thomas' official employer reference letter (*Note: Sehr gut*).
- Interactive career timeline, structured education history, categorized skills matrix, and language proficiencies.

### 7. Interactive Contact & Live Telemetry (`ContactSection.tsx` & `Footer.tsx`)
- Contact form with client-side validation, live character counter, draft preview payload, and reset capabilities.
- Quick one-click email and phone clipboard copy with visual checkmarks.
- Real-time Hamburg/Henstedt-Ulzburg telemetry clock with dynamic timezone label (`MEZ` / `CET`).

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & UI** | React 19, TypeScript, Tailwind CSS v4 |
| **Build Tool & Bundler** | Vite 8 with `@tailwindcss/vite` |
| **Icons & Visuals** | Lucide React, Custom SVG Vector Logo |
| **Typography** | Google Fonts (*Fraunces*, *Plus Jakarta Sans*, *JetBrains Mono*) |
| **State & Context** | React Context (`LanguageContext`), `localStorage` Persistence |
| **Deployment Target** | Static Hosting / Vercel / Netlify / Node |

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── assets/
│   │   ├── scene1.jpg            # Scene 01: Veranda & northern woods
│   │   ├── scene2.jpg            # Scene 02: Timber desk, coding & cooking craft
│   │   ├── scene3.jpg            # Scene 03: Cozy fireplace & evening atmosphere
│   │   ├── proj1.jpg             # bAV Admin Tool preview
│   │   ├── proj2.jpg             # Mobile Onboarding & HR Dashboard preview
│   │   └── proj3.jpg             # Enterprise Pension Portal preview
│   ├── favicon.svg               # Vector monogram favicon
│   └── logo.svg                  # Vector master logo mark
├── src/
│   ├── components/
│   │   ├── CinematicHero.tsx       # 60 FPS HTML5 canvas pinned scroll stage
│   │   ├── ContactSection.tsx      # Contact form with payload preview & direct details
│   │   ├── ExperienceAndSkills.tsx # Career timeline, reference letter & skill matrix
│   │   ├── Footer.tsx              # Telemetry clock, copyright & back-to-top
│   │   ├── Navbar.tsx              # Responsive header with [DE|EN] toggle & motion control
│   │   ├── PassionsSection.tsx     # Values beyond code (Nature, dogs, music, cooking)
│   │   ├── ProjectModal.tsx        # In-depth case study modal drawer
│   │   └── ProjectsSection.tsx     # Production project showcase grid
│   ├── context/
│   │   └── LanguageContext.tsx     # Bilingual context provider [DE | EN]
│   ├── data/
│   │   ├── content.json            # Portable content scaffold
│   │   └── portfolioData.ts        # Typed German & English datasets + UI translations
│   ├── App.tsx                     # Main layout & reduced motion orchestration
│   ├── index.css                   # Tailwind CSS v4 imports & custom amber tokens
│   ├── main.tsx                    # React 19 bootstrap entry
│   └── vite-env.d.ts               # Vite client typing
├── index.html                      # HTML template with Google Fonts & dark mode class
├── package.json                    # Scripts and dependencies
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite + React 19 + Tailwind v4 plugin setup
```

---

## 💻 Local Development

Ensure you have **Node.js 18+** installed.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (with HMR)
npm run dev

# 3. Check types and build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📬 Contact & Profiles

- **Developer:** Thomas Weigert
- **Role:** Frontend Engineer
- **Location:** Henstedt-Ulzburg / Hamburg, Germany (On-site & Remote)
- **Email:** [thomasweigert91@gmail.com](mailto:thomasweigert91@gmail.com)
- **Phone:** [+49 176 63646990](tel:+4917663646990)
- **LinkedIn:** [linkedin.com/in/thomas-weigert-frontend](https://linkedin.com/in/thomas-weigert-frontend/)
- **GitHub:** [github.com/thomasweigert91](https://github.com/thomasweigert91)

