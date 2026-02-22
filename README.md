![gyanranjanpriyam.tech](/public/og.png)

# gyanranjanpriyam.tech

Source code for my personal portfolio — [gyanranjanpriyam.tech](https://gyanranjanpriyam.tech).

Built from scratch with a focus on immersive visuals, fluid interactions, and technical craftsmanship. The site layers a 3D environment, content surfaces, and real-time fluid simulation into a single cohesive experience.

---

## Architecture

The site is structured around three rendering layers that composite together in the browser:

### 1. Background — 3D Scene

A persistent WebGL scene rendered with React Three Fiber sits behind the DOM. It provides depth, atmosphere, and a living backdrop that responds to scroll position and viewport state.

### 2. Content — DOM Layer

All pages, text, projects, and interactive elements live in the standard DOM, styled with SCSS Modules and animated with GSAP + ScrollTrigger. The layout uses a responsive column grid system with `vw`-based sizing and custom breakpoints.

**"Window" cutouts** are carved into the content layer using shaped `box-shadow` insets, allowing the 3D background to bleed through and creating a layered, dimensional feel.

### 3. Overlay — Fluid Simulation

A full-viewport canvas sits above everything, running a real-time fluid dynamics simulation driven by cursor movement. It uses `mix-blend-mode` to interact visually with the layers beneath, producing a painterly, organic texture over the entire interface.

---

## Tech Stack

| Layer       | Technology                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework   | [Next.js 14](https://nextjs.org/) (Pages Router)                                                                                                                    |
| 3D / WebGL  | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/), [Drei](https://github.com/pmndrs/drei), [Rapier](https://rapier.rs/) |
| Animation   | [GSAP](https://greensock.com/gsap/) + ScrollTrigger                                                                                                                 |
| Scroll      | [Lenis](https://lenis.darkroom.engineering/) smooth scroll                                                                                                          |
| State       | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                                            |
| Styling     | SCSS Modules, CSS custom properties                                                                                                                                 |
| Transitions | Custom GSAP-powered page transitions via `react-transition-group`                                                                                                   |
| Hosting     | [Vercel](https://vercel.com)                                                                                                                                        |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build && npm start
```

The site runs at `http://localhost:3000`.

---

## Project Structure

```
src/
  components/
    animationComponents/   # Reusable animated primitives (text reveals, tooltips, links)
    canvas/                # WebGL background + fluid overlay
    dom/                   # Layout shell, navbar, footer, scrollbar, loader
    imageComponents/       # SVG / icon components
  pages/
    index.page.jsx         # Home
    about/                 # About section with overview, services, process
    projects/              # Project listing + dynamic [id] pages
    components/            # Page-level section components
  hooks/                   # Custom hooks (scroll, intersection, mobile detect)
  constants/               # Project data
  styles/                  # Global SCSS — variables, grid, typography, colors, reset
```

---

## Key Implementation Details

- **Responsive grid** — 16-column (desktop) / 6-column (mobile) layout system exposed as CSS custom properties (`--layout-columns-gap`, `--layout-margin`, `--layout-column-width`).
- **Typography** — `vw`-based fluid type scale using Neue Haas Grotesk Display Pro at multiple weights (450–750).
- **Scroll-triggered reveals** — intersection-observer-based `AppearTitle` / `AppearBlock` components animate content into view.
- **Interactive tooltips** — GSAP-animated tooltip cards rendered via React portal (`position: fixed`, `z-index: 10000`) to escape ancestor `overflow: hidden` clipping.
- **Noise overlay** — a `::before` pseudo-element on `#layout` renders a full-viewport animated noise texture at `z-index: 9999`.
- **Custom page transitions** — GSAP timelines orchestrate enter/exit animations between routes using `react-transition-group`.
- **Fluid cursor effect** — WebGL-based fluid simulation responds to pointer movement and composites over all content via blend modes.

---

## Assets & Privacy

- Personal and client visuals (images, logos, portraits) are **blurred, replaced, or omitted** in this repository.
- The full visual experience is available at [gyanranjanpriyam.tech](https://gyanranjanpriyam.tech).
- Do not reuse images or branding without permission.

---

## License

MIT License with required attribution.

> If you use this code or parts of it, credit is required:
>
> _"Original portfolio design and development by Gyanranjan Priyam — [gyanranjanpriyam.tech](https://gyanranjanpriyam.tech)"_

Do not claim this work as your own or use it commercially without permission.

---

## Contact

- [gyanranjanpriyam@gmail.com](mailto:gyanranjanpriyam@gmail.com)
- [linkedin.com/in/gyanranjan-priyam](https://linkedin.com/in/gyanranjan-priyam)
- [gyanranjanpriyam.tech](https://gyanranjanpriyam.tech)
- [@gyanranjanpriyam](https://instagram.com/gyanranjanpriyam)
