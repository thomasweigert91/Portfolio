# Alex Vance — Cinematic Scroll-Story Personal Portfolio

A cinematic, high-performance portfolio website built with React 19, TypeScript, Tailwind CSS v4, and a 60 FPS HTML5 Canvas scroll engine.

---

## Architecture Overview

1. **Pinned Viewport Scroll Engine (`CinematicHero.tsx`):**
   - Renders a multi-layer 60 FPS canvas with continuous camera dolly zoom, atmospheric vignette, and mouse-parallax responsiveness.
   - 3D kinetic particle dust field reacting to scroll velocity and cursor momentum.
   - Smooth piecewise timeline scrubbing through 3 scenes + 2 transition beats:
     - **Scene 01 (Ignition):** Luminous crystalline prism core in deep obsidian space.
     - **Transition Beat 1:** Core refracts into procedural geometric wireframe coordinates.
     - **Scene 02 (Systems in Motion):** Holographic UI interfaces, design systems, and responsive kinetic surfaces.
     - **Transition Beat 2:** Interfaces fold into a focused vertical light beam.
     - **Scene 03 (Resolution):** Expansive gallery horizon settling into warm luminescence.
   - Decoupled semantic HTML typography chapters anchored cleanly to preserve high contrast, text selection, and screen-reader accessibility without blocking focal imagery.

2. **Brand Identity & Style Tile (`StyleTileModal.tsx`):**
   - Editable SVG Vector Master logo mark (`/public/logo.svg`).
   - Atmosphere color tokens (Obsidian Void `#08090C`, Deep Charcoal `#10141D`, Cyan Spark `#00F0FF`, Solar Amber `#FFB300`).
   - Typographic hierarchy using Syne (Display), Plus Jakarta Sans (Body), and JetBrains Mono (Telemetry).
   - Interactive button states, badges, and sample component cards with one-click hex/SVG clipboard copy.

3. **Content Decoupling (`portfolioData.ts` & `content.json`):**
   - All profile biography, skills, projects, philosophy, and copy are cleanly separated in `src/data/portfolioData.ts`.
   - In-browser Content Editor modal allows drafting copy in `localStorage` and exporting clean JSON for git commits.

4. **Accessibility & Reduced Motion:**
   - Detects system `prefers-reduced-motion` and provides a manual toggle in the navigation bar.
   - In reduced motion mode, the continuous scrub engine switches to static editorial chapters with zero animations or scroll velocity dependencies.

5. **Case Studies & Contact Form:**
   - Filterable project grid with rich tags, metrics, and an interactive detail modal (`ProjectModal.tsx`).
   - Contact form with client-side validation, demo mode feedback toast, and direct one-click email copying.

---

## Local Development & Commands

Run within `d:\Portfolio2.0`:

```bash
# Start local development server with Hot Module Replacement (HMR)
npm run dev

# Compile TypeScript and build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## File Structure

```
d:/Portfolio2.0/
├── public/
│   ├── assets/
│   │   ├── scene1.jpg        # Scene 01 visual plate (Ignition)
│   │   ├── scene2.jpg        # Scene 02 visual plate (Systems in Motion)
│   │   ├── scene3.jpg        # Scene 03 visual plate (Horizon Resolution)
│   │   ├── proj1.jpg         # Project 01 mockup (Kinetix OS)
│   │   ├── proj2.jpg         # Project 02 mockup (Aetheria WebGL)
│   │   └── proj3.jpg         # Project 03 mockup (Nexus AI)
│   ├── favicon.svg           # Scalable vector favicon
│   └── logo.svg              # Editable SVG vector master logo mark
├── src/
│   ├── components/
│   │   ├── CinematicHero.tsx        # 60 FPS pinned canvas scroll stage
│   │   ├── ContactSection.tsx       # Commission inquiry form & direct email
│   │   ├── ContentEditorModal.tsx   # In-browser copy editor & JSON exporter
│   │   ├── ExperienceAndSkills.tsx  # Career timeline & categorized skill matrix
│   │   ├── Footer.tsx               # Telemetry footer with Zurich CET time
│   │   ├── Navbar.tsx               # Floating glass header & control tools
│   │   ├── ProcessSection.tsx       # Core architectural philosophy
│   │   ├── ProjectModal.tsx         # Detailed case study drawer
│   │   ├── ProjectsSection.tsx      # Filterable showcase grid
│   │   └── StyleTileModal.tsx       # Live design system tokens & brand board
│   ├── data/
│   │   ├── content.json             # Portable JSON export scaffold
│   │   └── portfolioData.ts         # Strongly-typed source of truth
│   ├── App.tsx                      # Root application layout
│   ├── index.css                    # Tailwind CSS v4 directives & custom tokens
│   ├── main.tsx                     # React 19 bootstrap entry
│   └── vite-env.d.ts                # TypeScript client environment types
├── index.html                       # HTML template with Google Fonts
├── package.json                     # Dependencies and build scripts
├── tsconfig.json                    # Strict TypeScript configuration
└── vite.config.ts                   # Vite + React + Tailwind plugin config
```

---

## How to Customize Content

1. **Update Biography & Projects:**
   - Open `src/data/portfolioData.ts`.
   - Modify the `profile`, `projects`, `philosophy`, or `experience` arrays.
   - The UI will instantly hot-reload.
2. **Replace Generated Visual Plates:**
   - Simply drop your new 16:9 images or WebP/video frames into `public/assets/scene1.jpg`, `scene2.jpg`, and `scene3.jpg`.
3. **Connect a Production Contact Endpoint:**
   - In `src/components/ContactSection.tsx`, replace the simulated demo timeout in `handleSubmit` with your API or Formspree/Resend webhook fetch call.
