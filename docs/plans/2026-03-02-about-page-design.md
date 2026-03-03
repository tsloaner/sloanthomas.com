# About Page Design — sloanthomas.com
Date: 2026-03-02

## Decision
Single `src/pages/about.astro` file. All 6 sections inline. No new component files (YAGNI — sections are never reused).

## Stack
Astro 5 + Tailwind CSS v4. No new dependencies. Uses existing `BaseLayout`, `scroll-fade-in`/`is-visible` animation system, and all confirmed design tokens.

## Scroll Snap
- `html { scroll-snap-type: y mandatory; scroll-padding-top: 7rem; }` scoped via `<style is:global>` in about.astro only
- Sections: `min-height: 100dvh; scroll-snap-align: start`
- Content never clipped — sections overflow naturally on short viewports

## Section Nav
- Desktop: `position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%);` — vertical pill, z-40
- Mobile: `position: fixed; top: 7rem; left: 50%; transform: translateX(-50%);` — horizontal dots, z-40
- Active state via second Intersection Observer (separate from scroll animations)
- Labels: Story · Spark · Beliefs · Journey · Life · Contact

## Sections
1. `#story` — bg-linen, two-col desktop (text 60% / photo 40%), single-col mobile
2. `#spark` — bg-indigo, centered 700px max, pull quote in Fraunces + Carrot Orange
3. `#beliefs` — bg-linen, 4 belief blocks with icon placeholders, staggered fade-in
4. `#journey` — bg-linen, vertical timeline, desktop expanded / mobile collapsible
5. `#life` — bg-linen, centered text + 2×2 photo grid
6. `#contact` — bg-indigo, centered CTA button to /services + email link

## Animation
Reuses existing `scroll-fade-in` + `is-visible` + `data-delay` system from global.css.
Extended delays (500ms, 600ms) added via inline style for timeline/grid stagger.
One inline `<script>` in about.astro handles:
- Section nav active state (Intersection Observer, threshold 0.5)
- Mobile timeline expand/collapse (max-height CSS transition)

## Accessibility
- Semantic `<section>`, `<nav aria-label="Page sections">`, `<h2>` per section
- Timeline toggles: `<button aria-expanded>` with aria updates on click
- External links: `target="_blank" rel="noopener noreferrer"`
- `prefers-reduced-motion` respected via existing global.css rule
