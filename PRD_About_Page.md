# PRD: About Page — sloanthomas.com

## Overview

Build the "About" page for sloanthomas.com — a single scrolling page with distinct full-screen sections, a sticky section nav, and anchored navigation. The page should feel like a presentation as you scroll (each section occupies the full viewport), but uses standard HTML scrolling rather than slide-deck click-through navigation.

**Before writing any code**, inspect the existing site codebase to understand:
- Framework and build tools in use (Astro + Tailwind CSS expected)
- Existing design tokens, color variables, typography, and component patterns
- Site navigation structure and how this page integrates
- Any existing layout or section components that can be reused
- How other pages handle responsive design

Match all conventions found in the existing code. Do not introduce new dependencies or design patterns unless the existing codebase lacks what's needed.

---

## Design System (Reference — verify against existing code)

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Twilight Indigo | `#142e52` | Primary dark, section backgrounds, headings |
| Soft Linen | `#e6e5db` | Light background, default section bg |
| Blue Slate | `#5a6572` | Secondary text, timeline line, subtle accents |
| Carrot Orange | `#f28f2c` | CTA buttons, accent highlights, icon color |

### Typography
- **Headlines:** Fraunces (serif) — verify this is loaded in the existing site
- **Body:** DM Sans — verify this is loaded in the existing site
- If different fonts are found in the codebase, use those instead

### Animation Style
- Understated and elegant
- Subtle fade-in on scroll (Intersection Observer)
- No dramatic scale transforms, parallax, or particle effects
- Respect `prefers-reduced-motion`

---

## Page Structure

Single scrolling page. Each section occupies full viewport height (`100vh` / `100dvh`). Scroll-snap enabled for presentation feel. Sticky section nav with anchor links.

### Sticky Section Nav
- Fixed position, right side (desktop) or top (mobile)
- Labels: **Story · Spark · Beliefs · Journey · Life · Contact**
- Active state highlights current section on scroll (Intersection Observer)
- Clicking a label smooth-scrolls to that section's anchor
- Style: understated — small text, Blue Slate default, Carrot Orange active state
- Hides or collapses on very small viewports if needed

---

## Sections

### Section 1: "The Short Version"

**Anchor:** `#story`
**Background:** Soft Linen
**Layout:** Two-column on desktop — text left (60%), photo placeholder right-aligned (40%). Single column on mobile — photo above text.

**Content:**

Heading area (not a traditional h1 — styled as a name/title block):
```
Thomas Sloan
Marketing Strategist · Boulder, CO
```

Body copy:
```
I have a non-traditional background spanning SaaS, startups, higher ed, and private equity. I've learned what works and why across different environments. Educated by degrees and relentless self-directed learning in behavioral science, I'm focused on applying what I've learned to help you grow.
```

**Photo placeholder:** A styled container (right-aligned on desktop) with a subtle border or background treatment. Dimensions approximately 350×450px. Include an `<!-- PHOTO: Professional headshot -->` comment and a visible placeholder state (not a broken image icon — use a styled empty div with a subtle icon or border).

**Design notes:**
- This section should feel clean and immediate — no animation on initial load
- Name in Fraunces, large but not overwhelming
- Title/location in DM Sans, Blue Slate color
- Body copy in DM Sans, comfortable reading size

---

### Section 2: "The Spark"

**Anchor:** `#spark`
**Background:** Twilight Indigo (`#142e52`), all text light (Soft Linen or white)
**Layout:** Centered column, max-width ~700px. Generous whitespace. This section should feel like a pause — slower, more reflective.

**Content:**

```
The summer after college, I picked up Thinking, Fast & Slow. Something clicked that had been nagging me since Econ 101 — professors kept talking about "rational actors" and I knew humans were anything but.

That book connected dots across everything I'd been drawn to — psychology, philosophy, how people actually make decisions. It never left my head.

Years of experience since then — in SaaS, startups, higher ed — and I keep seeing the same pattern. Marketing doesn't fail because the product is bad or the team is lazy. It fails because nobody stopped to think about how humans actually process information and choose.
```

**Pull quote — large, distinct treatment:**
```
"Your customers aren't irrational. Your funnel is."
```

Closing line:
```
This isn't one book from a decade ago. It's an evolving framework built from behavioral economics, social psychology, and real-world pattern recognition across industries.
```

**Design notes:**
- Pull quote gets special treatment: Fraunces, significantly larger than body text, Carrot Orange color or Carrot Orange left-border accent
- Body text in DM Sans, Soft Linen color, comfortable line-height (1.6+)
- *Thinking, Fast & Slow* should be italicized
- Fade-in animation on scroll entry (subtle, 0.6s)

---

### Section 3: "What I Believe"

**Anchor:** `#beliefs`
**Background:** Soft Linen
**Layout:** Four belief blocks stacked vertically, each with: icon placeholder (left) + bold statement heading + 1-2 sentence explanation (right). On mobile, icon above text.

**Content — four belief blocks:**

**Block 1:**
- Icon placeholder: `<!-- ICON: Misaligned gears — represents broken process -->`
- Heading: `Most marketing doesn't fail because of bad ideas. It fails because of broken processes.`
- Detail: `Decision-by-committee, the highest-paid person's opinion, over-reliance on "best practices." Ask ten people to pick an ice cream flavor and you get vanilla.`

**Block 2:**
- Icon placeholder: `<!-- ICON: Dashboard with question mark — represents measurement flaws -->`
- Heading: `Data is a tool, not a strategy.`
- Detail: `The marketing world worships metrics, but measurement has real flaws — especially now. If you're only optimizing what you can measure, you're ignoring most of what actually drives decisions.`

**Block 3:**
- Icon placeholder: `<!-- ICON: Signal tower — represents signaling in the AI age -->`
- Heading: `In the AI age, being more human is the competitive advantage.`
- Detail: `Execution is getting cheaper by the day. When everyone has agents creating content, measuring, and iterating — standing out means signaling care, credibility, and quality in ways that can't be automated.`

**Block 4:**
- Icon placeholder: `<!-- ICON: Brain with groove/path — represents working with human nature -->`
- Heading: `Work with human nature, not against it.`
- Detail: `Reduce friction by operating within the grooves of how people actually think and decide — not how you wish they did.`

**Icon placeholders:** Each icon zone should be a styled `<div>` approximately 48-64px square. Use a subtle Carrot Orange border or background tint as the placeholder state. The owner will replace these with custom SVG line-art icons later. Structure the HTML so swapping in an `<svg>` or `<img>` is trivial.

**Design notes:**
- Belief headings in Fraunces, bold, Twilight Indigo
- Detail text in DM Sans, Blue Slate
- Carrot Orange accent on icons or as a subtle left-border on each block
- Stagger fade-in animation: each block enters 100-150ms after the previous
- Each block should have enough vertical spacing to breathe — do not cram all four into a tight stack

---

### Section 4: "How I Got Here"

**Anchor:** `#journey`
**Background:** Soft Linen base, with optional subtle Blue Slate tint alternating on timeline entries
**Layout:** Vertical timeline — a thin vertical line (Blue Slate) running down the left side (desktop) or center (mobile), with content blocks branching off.

**Responsive behavior:**
- **Desktop:** Headers and expanded detail visible simultaneously. Headers are bold/prominent, detail text is standard body.
- **Mobile:** Headers visible. Detail text collapsed by default, expands on tap with smooth height animation. Include a subtle expand/collapse indicator (chevron or `+`/`-`).

**Timeline entries:**

**Entry 1:**
- Header: `Started with the big questions`
- Subheader: `Wake Forest — Philosophy & Political Science`
- Detail: `I was always drawn to the big, messy questions that mattered. How people think and act, how and why certain systems work better than others.`

**Entry 2:**
- Header: `Explored before specializing`
- Subheader: `Topanga Partners → UpContent`
- Detail: `Private equity gave me exposure to various startups. That led to UpContent, a marketing SaaS startup. Energized by the small team, hands-on work, and thinking deeply about customer journeys.`

**Entry 3:**
- Header: `Found marketing through the side door`
- Subheader: `Techstars`
- Detail: `Customer Success made me realize I didn't care about support. It was understanding why people engaged or didn't, and designing better systems around that.`

**Entry 4:**
- Header: `Got serious about the craft`
- Subheader: `MS Marketing — University of Denver`
- Detail: `One year of intensive study. Consumed more and more behavioral science and consumer behavior research. Formalized what experience had been teaching me.`

**Entry 5:**
- Header: `Tested it in the real world`
- Subheader: `CU Boulder`
- Detail: `Managed email campaigns to 200K+ alumni, 44% open rate. Complex stakeholder environment. Learned what works — and more about how organizational friction kills good marketing.`

**Entry 6:**
- Header: `Went independent`
- Subheader: (none)
- Detail: `Being on the outside lets me evaluate with fresh eyes and without the worry of upsetting a manager I have to work with indefinitely. I kept seeing the same problems — good marketing killed by bad process, misguided optimization, and a lack of understanding of human nature. Now I fix them.`

**Design notes:**
- Timeline line: 2px, Blue Slate, runs full height of section
- Timeline nodes/dots at each entry: small circles (8-12px), Carrot Orange fill
- Headers in Fraunces, Twilight Indigo
- Subheaders in DM Sans, Blue Slate, smaller
- Detail text in DM Sans, standard body size
- On mobile, the expand/collapse interaction must be smooth (CSS transition on max-height or use of grid-template-rows animation)
- Fade-in on scroll for the entire timeline, then stagger individual entries

---

### Section 5: "Outside Work"

**Anchor:** `#life`
**Background:** Soft Linen, Carrot Orange accents
**Layout:** Short text block centered above a photo placeholder grid. Grid: 2×2 on desktop (4 photos), 2×2 or stacked on mobile.

**Content:**

```
Based in Boulder, CO with my partner and our dog. In my free time you can find me playing in the mountains on my feet, bike, or snowboard, making music with ROUNDTREE, or lifting things at the gym or out of the oven.
```

- "ROUNDTREE" links to: `https://instagram.com/roundtreemusic` (opens in new tab)

**Photo placeholder grid — 4 slots:**
1. `<!-- PHOTO: Mountains / hiking -->`
2. `<!-- PHOTO: Snowboarding or cycling -->`
3. `<!-- PHOTO: Band performance (ROUNDTREE) -->`
4. `<!-- PHOTO: Gym or cooking -->`

Each placeholder: styled `<div>` with subtle border, approximately 300×200px on desktop, maintaining aspect ratio. Visible placeholder state (not broken images).

**Design notes:**
- This is the lightest section — brief text, photo-forward
- Text in DM Sans, centered, relaxed tone
- Photo grid should have small gap (8-12px), subtle rounded corners (4-8px)
- Fade-in on scroll, photo grid staggers in

---

### Section 6: "See How I Can Help"

**Anchor:** `#contact`
**Background:** Twilight Indigo (`#142e52`)
**Layout:** Centered, minimal. Maximum content width ~600px.

**Content:**

```
I work with B2B and SaaS teams to find and fix the friction in their customer decision paths.
```

**Primary CTA button:**
- Text: `See How I Can Help →`
- Links to: `/services` (internal link)
- Style: Carrot Orange background, Twilight Indigo text (or white), rounded corners, generous padding
- Hover state: subtle brightness increase or scale (1.02)

**Secondary link:**
- Email: `sloan.thomas.a@gmail.com`
- Styled as a text link below the button, Soft Linen color, underline on hover

**Design notes:**
- CTA text in DM Sans
- Bridge text in DM Sans, Soft Linen color
- Generous vertical padding — this section should feel like a confident, clean ending
- Button should be the most visually prominent interactive element on the entire page

---

## Responsive Requirements

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full two-column layouts where specified, timeline expanded, sticky nav on right side |
| Tablet (768-1023px) | Single column, timeline expanded, sticky nav at top |
| Mobile (<768px) | Single column, timeline collapsed/expandable, sticky nav at top (minimal), photo grids stack or remain 2×2 |

### Scroll-Snap

- Enable `scroll-snap-type: y mandatory` on the page container
- Each section gets `scroll-snap-align: start`
- Sections use `min-height: 100vh` (not fixed height) — content should not be clipped if it exceeds viewport on small screens. Use `100dvh` as progressive enhancement.

**Important:** Unlike a slide deck, content must not be hidden by `overflow: hidden` on sections. If a section's content is taller than the viewport on mobile, it should scroll naturally within the snap point. Prioritize content accessibility over rigid viewport fitting.

---

## Accessibility

- All sections use semantic HTML (`<section>`, `<nav>`, `<h2>`, `<p>`, etc.)
- Sticky nav uses `<nav>` with `aria-label="Page sections"`
- Timeline expand/collapse buttons have `aria-expanded` states
- External links have `rel="noopener noreferrer"` and `target="_blank"`
- All photo placeholders include descriptive `alt` text in comments for when real images are added
- Color contrast meets WCAG AA: verify Soft Linen text on Twilight Indigo passes (it should — check)
- Respect `prefers-reduced-motion`: disable all animations, use `scroll-behavior: auto`

---

## Animation Spec

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Section content | Scroll into viewport | Fade-in + translateY(20px→0) | 0.6s | ease-out |
| Belief blocks | Scroll into viewport | Staggered fade-in (100-150ms delay between each) | 0.6s | ease-out |
| Timeline entries | Scroll into viewport | Staggered fade-in | 0.5s | ease-out |
| Photo grid items | Scroll into viewport | Staggered fade-in | 0.5s | ease-out |
| Pull quote | Scroll into viewport | Fade-in (slightly slower) | 0.8s | ease-out |
| Mobile timeline expand | Tap | Height expand with opacity | 0.3s | ease-in-out |

Use Intersection Observer with `threshold: 0.15` for scroll triggers. Add a `.visible` class that activates CSS transitions.

---

## File & Integration Notes

- This page should integrate into the existing site routing and navigation
- Check how other pages are structured (file naming, layout wrappers, shared components) and follow the same pattern
- Reuse any existing section, button, or layout components where they fit
- If the site has a shared page transition or layout animation, apply it here too
- Ensure the site's global navigation links to this About page correctly

---

## Placeholder Summary

The following elements need manual replacement after build:

| Placeholder | Location | Expected Asset |
|-------------|----------|----------------|
| Professional headshot | Section 1, right column | Photo (~350×450px) |
| Icon: Misaligned gears | Section 3, Block 1 | Custom SVG, line-art, Carrot Orange |
| Icon: Dashboard + question mark | Section 3, Block 2 | Custom SVG, line-art, Carrot Orange |
| Icon: Signal tower | Section 3, Block 3 | Custom SVG, line-art, Carrot Orange |
| Icon: Brain with groove | Section 3, Block 4 | Custom SVG, line-art, Carrot Orange |
| Photo: Mountains/hiking | Section 5, Grid slot 1 | Lifestyle photo |
| Photo: Snowboarding/cycling | Section 5, Grid slot 2 | Lifestyle photo |
| Photo: Band performance | Section 5, Grid slot 3 | Lifestyle photo |
| Photo: Gym/cooking | Section 5, Grid slot 4 | Lifestyle photo |

All placeholders should be clearly marked in HTML comments and styled as visible empty containers (not broken image states).
