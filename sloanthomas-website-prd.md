# Product Requirements Document: sloanthomas.com

## Overview

A personal website for Thomas Sloan, a freelance marketing consultant specializing in behavioral science-driven friction diagnostics. The site serves as both a conversion tool for prospective clients and a portfolio showcasing Thomas's thinking and writing.

**Core positioning:** "Your customers aren't irrational. Your funnel is."

**Design ethos:** Calm expertise. The site should feel like a well-edited journal article, not a SaaS landing page. It should talk confidently, not yell. Every design decision should reinforce the idea that Thomas is a thoughtful, rigorous practitioner — not a growth hacker or agency.

---

## Required Skills

Before writing any code, Claude Code MUST read and follow these skill files:

1. **`/Users/thomassloan/.claude/skills/copy-editing`** — Apply to ALL copy on the website: hero text, philosophy descriptions, service cards, CTAs, form labels, navigation, footer. Every word on this site should feel intentional and polished.
2. **`/Users/thomassloan/.claude/skills/frontend-taste`** — Apply to ALL design implementation: spacing, color application, component styling, layout decisions. This is the primary design reference.
3. **`/Users/thomassloan/.claude/skills/ux-ui-pro-max`** — Apply to design planning, layout architecture, interaction patterns, responsive behavior, and accessibility decisions.

These skills take precedence over generic defaults. Read them first, then build.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Astro** | Static site generator. All pages compile to static HTML/CSS/JS. |
| Styling | **Tailwind CSS** | Utility-first CSS. Use Tailwind's config to define the design system (colors, typography, spacing). |
| Animations | **CSS animations + Intersection Observer API** | Scroll-triggered fade-ins and SVG animation playback. No heavy animation libraries unless needed. GSAP is acceptable if CSS alone is insufficient. |
| Forms | **Formspree** | Contact form submissions. Endpoint URL to be configured by Thomas post-build. |
| Hosting | **GitHub Pages** | Use Astro's official GitHub Pages integration. Deploy on push to `main`. |
| Fonts | **Google Fonts** | Fraunces, DM Sans, Space Mono. Self-host or use Google Fonts CDN. |

### Astro Configuration Notes

- Use Astro's content collections for blog/writing articles (markdown files in `src/content/writing/`)
- Use Astro components for reusable elements (Nav, Footer, ServiceCard, PhilosophyCard, TestimonialCard, ArticleCard)
- Output: `static` (no SSR)
- Configure for GitHub Pages deployment with the appropriate `base` and `site` values

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Twilight Indigo** | `#142E52` | Primary. Headlines, nav, footer background, primary buttons. The dominant color. |
| **Soft Linen** | `#E6E5DB` | Background. Page background, card backgrounds. Warm off-white that avoids sterile white. |
| **Blue Slate** | `#5A6572` | Secondary text. Body text, descriptions, subtle UI elements. |
| **Carrot Orange** | `#F28F2C` | Accent. CTAs, hover states, active indicators, links on dark backgrounds. Use sparingly — this is the spice, not the main course. |

**Color application rules:**
- Background: Soft Linen (`#E6E5DB`) as the default page background
- Text: Twilight Indigo (`#142E52`) for headlines. Blue Slate (`#5A6572`) for body text.
- Accent: Carrot Orange (`#F28F2C`) only for interactive elements (CTA buttons, link hovers, active nav states). Never use for large areas or backgrounds.
- Dark sections (e.g., footer, optional hero variation): Twilight Indigo background with Soft Linen text.
- Never use pure white (`#FFFFFF`) or pure black (`#000000`).

### Typography

| Role | Font | Weight(s) | Usage |
|------|------|-----------|-------|
| **Headlines** | Fraunces | 600, 700, 800 | H1, H2, H3. The personality font. Fraunces is a variable serif with character — use its optical size axis (`opsz`) if available for better rendering at different sizes. |
| **Body** | DM Sans | 400, 500, 600 | Paragraph text, descriptions, form labels, nav links. Clean and highly readable. |
| **Accents/Labels** | Space Mono | 400, 700 | Section labels (e.g., "How I Think"), metadata (article dates, tags), nav items, small UI labels. Use monospace to signal "analytical/technical" in small doses. |

**Typography scale (desktop):**
- H1 (Hero): 56–72px, Fraunces 700–800
- H2 (Section headers): 36–44px, Fraunces 700
- H3 (Card headers / philosophy headlines): 24–28px, Fraunces 600
- Body: 17–18px, DM Sans 400, line-height 1.6
- Small / Labels: 13–14px, Space Mono 400, letter-spacing 0.05em, uppercase

**Mobile scale:** Reduce proportionally. H1 should not go below 36px. Body stays at 16–17px minimum.

### Spacing & Layout

- Max content width: 1200px, centered
- Section padding: 80–120px vertical (desktop), 48–64px (mobile)
- Use generous whitespace. When in doubt, add more space, not less.
- Grid: 12-column on desktop. Content typically spans 8–10 columns centered.
- Philosophy grid: 2×2 on desktop, 1-column stacked on mobile

### Animations

**Global animation rules:**
- All scroll-triggered animations use **Intersection Observer** with a threshold of ~0.15–0.2
- Animation style: `fade-in-up` — elements start opacity 0, translateY(20–30px), animate to opacity 1, translateY(0)
- Duration: 500–700ms
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` or similar ease-out
- Stagger: When multiple elements enter at once (e.g., philosophy grid cards), stagger by 100–150ms
- **Each element animates only once.** No repeat on scroll-back.
- Keep it subtle. The goal is "the page feels alive," not "look at these animations."

**SVG animation placeholders:**
- Each philosophy card includes a container (roughly 200×200px or flexible aspect ratio) for a future SVG/animated illustration
- For now, render a subtle placeholder: a rounded rectangle with a dashed border in Blue Slate, containing a small icon or label like "Animation" in Space Mono
- These placeholders should be designed to be easily replaceable with actual SVG files later

### Buttons & Interactive Elements

- **Primary CTA:** Carrot Orange background, Twilight Indigo text, DM Sans 600. Border-radius: 4–6px (slightly rounded, not pill-shaped). Hover: darken orange slightly, subtle lift shadow.
- **Secondary/Ghost button:** Transparent background, Twilight Indigo border, Twilight Indigo text. Hover: fill with Twilight Indigo, text becomes Soft Linen.
- **Links in body text:** Carrot Orange, no underline by default, underline on hover.
- **Nav links:** DM Sans 500 or Space Mono 400. No underline. Hover: Carrot Orange color transition.

---

## Site Architecture

```
sloanthomas.com/
├── / (Home)
├── /services
├── /writing
├── /writing/[slug] (individual article pages)
├── /about
└── /contact
```

---

## Navigation

**Desktop:** Horizontal nav bar, fixed/sticky on scroll.
- Left: "Thomas Sloan" — wordmark in Fraunces 700, Twilight Indigo. Links to home.
- Right: Home | Services | Writing | About | Contact — DM Sans 500 or Space Mono 400
- Active page indicator: Carrot Orange underline or color change
- Background: Soft Linen with subtle opacity/blur on scroll (so content is visible beneath)

**Mobile:** Hamburger menu.
- Same wordmark top-left
- Hamburger icon top-right
- Opens full-screen or slide-in overlay with nav links stacked vertically
- Background: Twilight Indigo with Soft Linen text

---

## Page Specifications

### Page 1: Home (`/`)

The home page is the primary conversion tool. It flows as a single scrolling narrative:

**Hero → Philosophy → Services Preview → Testimonials → CTA → Footer**

---

#### Section 1.1: Hero

**Layout:** Full-width section, vertically centered content. Generous vertical padding (min 70vh or close to full viewport on desktop).

**Content:**
```
[H1, Fraunces 800]
Your customers aren't irrational. Your funnel is.

[Subtext, DM Sans 400, Blue Slate, 20-22px]
I use behavioral science to find and fix the friction your analytics miss.

[CTA Button, Primary]
Get in touch
```

**Behavior:**
- Hero content fades in on page load (not scroll-triggered — it's above the fold)
- Subtle animation: the H1 could fade in first, followed by the subtext 200ms later, then the CTA 200ms after that. Staggered reveal.
- No hero image. Let the typography do the work. The bold Fraunces headline on the warm Soft Linen background IS the visual.
- Optional: a very subtle decorative element — a thin Carrot Orange horizontal rule between H1 and subtext, or a small SVG mark.

**Design notes:**
- The hero should feel like an opening page of a book. Restrained. Confident. The words are the design.
- Do NOT center the text on mobile. Left-align on all breakpoints. Centered hero text is a SaaS cliché.

---

#### Section 1.2: Philosophy ("How I Think")

**Layout:** Hybrid layout.
- **Desktop:** Left one-third contains the section label. Right two-thirds contains a 2×2 grid of philosophy cards.
- **Mobile:** Section label on top, then single-column stack of cards.

**Section label:**
```
[Space Mono 400, uppercase, 13-14px, letter-spacing 0.05em, Blue Slate]
How I Think
```

This label should be vertically aligned with the top of the grid (sticky on scroll if the grid is tall enough to warrant it — use judgment).

**Philosophy cards (4 total):**

Each card contains:
1. **SVG animation placeholder** (top of card) — container for future animated illustration
2. **Headline** (Fraunces 600, 24–28px, Twilight Indigo)
3. **Thesis sentence** (DM Sans 400, 17px, Blue Slate) — always visible
4. **Expand trigger** — a subtle "Read more" link or chevron icon
5. **Expanded detail** (DM Sans 400, 16px, Blue Slate) — hidden by default, revealed on click with a smooth height transition

**Card 1:**
- Headline: "Your dashboard is lying to you"
- Thesis: "The friction that's costing you customers is invisible to analytics."
- Expanded: "The hesitation before a click, the confusion on a pricing page, copy that damages trust. I find what your data doesn't."
- Animation placeholder: conceptual — "data/dashboard" theme

**Card 2:**
- Headline: "The best marketing doesn't feel like marketing"
- Thesis: "People don't resist purchases — they resist being pushed."
- Expanded: "Instead of a funnel that pushes, I create a journey that pulls — so the next step always feels obvious, not forced."
- Animation placeholder: conceptual — "push vs. pull" theme

**Card 3:**
- Headline: "Work with human nature, not against it"
- Thesis: "Attention, trust, and memory follow patterns that behavioral science has mapped for decades."
- Expanded: "I use those patterns to design customer journeys that convert — by removing friction."
- Animation placeholder: conceptual — "behavioral patterns / human cognition" theme

**Card 4:**
- Headline: "Strategy is choosing what to ignore"
- Thesis: "Most marketing fails not from a lack of effort, but from a lack of focus."
- Expanded: "I find and fix the friction in your strategy using the same behavioral science lens — because the problem isn't always in the funnel."
- Animation placeholder: conceptual — "focus / signal vs. noise" theme

**Card styling:**
- Background: slightly lighter or slightly different from page background — subtle differentiation. Could use white with very low opacity, or a 1px border in Blue Slate at 20% opacity.
- Border-radius: 8px
- Padding: 24–32px
- Hover: very subtle lift (1–2px shadow increase) or border color change

**Animation behavior:**
- Cards fade-in-up with stagger (card 1, then 2, then 3, then 4 — 100-150ms apart)
- SVG placeholder area should be designed to support a future animated SVG that plays once when the card enters the viewport

---

#### Section 1.3: Services Preview

**Layout:** Narrative intro paragraph, followed by 3 service cards in a horizontal row (desktop) or stacked (mobile).

**Content:**

```
[Section label, Space Mono 400, uppercase]
What I Do

[Intro paragraph, DM Sans 400, 18-20px, max-width ~700px]
Every engagement starts with the same question: where is the friction?
Whether it lives in your customer journey, your positioning, or your
team's decision-making process — I find it, explain why it's there,
and give you a clear plan to fix it.

[3 Service Cards]
```

**Service Card Template:**
Each card contains:
1. **Service name** (Fraunces 600, 22–24px)
2. **Short description** (DM Sans 400, 16px, 2–3 sentences)
3. **Link** → /services ("Learn more →")

**Placeholder services:**

Card 1:
- Name: "Decision Path Audit"
- Description: "A structured review of your customer journey from first touch to conversion. I identify the behavioral friction points your analytics miss and deliver a prioritized fix list."

Card 2:
- Name: "Friction Diagnostic"
- Description: "A deep-dive analysis of where and why customers disengage. Combines behavioral science frameworks with a practical assessment of your messaging, UX, and conversion flow."

Card 3:
- Name: "Strategy Sprint"
- Description: "A focused engagement to align your team's marketing priorities. I cut through low-impact work, identify decision-making bottlenecks, and build a clear execution plan."

**Card styling:**
- Clean, minimal cards. Subtle border or background differentiation.
- Each card links to /services. The link text should use Carrot Orange.
- Cards fade-in-up with stagger on scroll.

---

#### Section 1.4: Testimonials

**Layout:** 3 testimonial cards in a horizontal row (desktop), stacked (mobile).

**Content (placeholders):**

```
[Section label, Space Mono 400, uppercase]
What People Say
```

Testimonial card template:
1. Quote text (DM Sans 400 italic, 17px)
2. Name (DM Sans 600, 15px)
3. Title / Company (DM Sans 400, 14px, Blue Slate)

**Placeholder testimonials:**

Card 1:
- Quote: "Thomas helped us see what our dashboards couldn't. Within two weeks, we identified three critical friction points in our onboarding flow that were costing us customers."
- Name: "[Name]"
- Title: "[Title], [Company]"

Card 2:
- Quote: "What sets Thomas apart is his ability to explain why something isn't working — not just that it isn't. His recommendations were specific, prioritized, and immediately actionable."
- Name: "[Name]"
- Title: "[Title], [Company]"

Card 3:
- Quote: "We'd been throwing budget at the wrong problems for months. Thomas cut through the noise and gave us a focused plan that actually moved the needle."
- Name: "[Name]"
- Title: "[Title], [Company]"

**Styling:**
- Subtle quotation mark decorative element (large Fraunces quote mark in Carrot Orange at ~15% opacity behind the text, or a small orange accent bar on the left edge)
- Cards should feel like real quotes, not marketing material

---

#### Section 1.5: Bottom CTA

**Layout:** Full-width section with centered content. Background: Twilight Indigo. Text: Soft Linen.

**Content:**
```
[H2, Fraunces 700, Soft Linen]
Let's find your friction.

[Subtext, DM Sans 400, Soft Linen at 80% opacity]
Every engagement starts with a conversation.

[CTA Button — inverted colors: Carrot Orange bg, Twilight Indigo text]
Get in touch → (links to /contact)
```

---

#### Section 1.6: Footer

**Layout:** Full-width, Twilight Indigo background (continuation of CTA section, or separated with subtle divider).

**Content:**
```
[Tagline, DM Sans 400, Soft Linen]
You made it this far. [Let's talk.](/contact)

[Copyright, Space Mono 400, 12px, Soft Linen at 50% opacity]
© 2025 Thomas Sloan
```

Keep the footer minimal. No multi-column link grids. No social icons unless Thomas specifies later. Just the tagline and copyright.

---

### Page 2: Services (`/services`)

**Layout:** Long-form page with narrative intro followed by detailed service cards.

**Content:**

```
[H1, Fraunces 700]
Services

[Intro, DM Sans 400, 18-20px, max-width ~700px]
I work with marketing teams and founders who suspect their
marketing has a friction problem but can't quite see where.
Every engagement starts with diagnosis — because the fix is
only as good as the understanding behind it.
```

**Detailed service cards:**

Same 3 services as the home page preview, but with more detail:
- Full description (3-5 sentences)
- What's included (short bullet list, 3-5 items)
- Ideal for (who this service is best for — 1 sentence)
- A CTA linking to /contact

These are placeholder content — Thomas will refine later. Build the component structure to support this level of detail.

**Bottom CTA:** Same pattern as home page bottom CTA section.

---

### Page 3: Writing (`/writing`)

**Layout:** Brief intro line + grid of article cards.

**Content:**

```
[H1, Fraunces 700]
Writing

[Intro, DM Sans 400, 18px, Blue Slate]
Longer explorations of the ideas behind my work.
```

**Article cards (3 placeholders):**

Each card contains:
1. **Title** (Fraunces 600, 22px)
2. **Summary** (DM Sans 400, 16px, 2-3 sentences)
3. **Date** (Space Mono 400, 13px, Blue Slate)
4. Entire card is clickable → links to `/writing/[slug]`

**Layout:** Cards displayed as a vertical list (not a grid). Each card is full-width within the content column, with generous vertical spacing between them. This creates an editorial/blog index feel rather than a magazine grid.

**Placeholder articles:**

Article 1:
- Title: "Data Is Killing Your Marketing"
- Summary: "The marketing industry's obsession with data has produced a generation of campaigns that are optimized, tested, and utterly forgettable. Here's what we lost — and how to get it back."
- Date: "2025"
- Slug: `data-is-killing-your-marketing`

Article 2:
- Title: "The Friction You Can't Measure"
- Summary: "Your analytics dashboard shows you what happened. It can't show you why someone hesitated, felt confused, or quietly lost trust. That's where the real problems live."
- Date: "2025"
- Slug: `the-friction-you-cant-measure`

Article 3:
- Title: "Why Taste Beats Testing"
- Summary: "A/B tests tell you which option won. They don't tell you if either option was any good. Making better marketing starts with developing better judgment."
- Date: "2025"
- Slug: `why-taste-beats-testing`

**Individual article pages (`/writing/[slug]`):**

These are rendered from markdown files in `src/content/writing/`. Layout:
- Article title (Fraunces 700, 36-44px)
- Date (Space Mono 400, 13px)
- Article body (DM Sans 400, 18px, max-width ~680px, line-height 1.7)
- Standard markdown rendering: headings, paragraphs, blockquotes, lists, links
- Back link to /writing at the top or bottom

For now, create the markdown files with placeholder body content (2-3 paragraphs of lorem ipsum or brief placeholder text). Thomas will write the actual articles.

---

### Page 4: About (`/about`)

**This page is a placeholder.** Thomas will design the scroll-driven career narrative separately using a different process.

**For now, create a simple page:**

```
[H1, Fraunces 700]
About

[Body, DM Sans 400, 18px]
This page is under construction. In the meantime, here's the short version:

I'm a marketing strategist with experience across SaaS, startups, and
higher education. I've led campaigns at Techstars, CU Boulder, and UpContent.
I hold an MS in Marketing from the University of Denver.

I believe the best marketing starts with understanding how people actually
make decisions — not how we wish they did. That belief drives everything
I do.

[CTA]
Want the longer story? [Get in touch.](/contact)
```

---

### Page 5: Contact (`/contact`)

**Layout:** Clean, simple contact page.

**Content:**

```
[H1, Fraunces 700]
Get in touch

[Subtext, DM Sans 400, 18px, Blue Slate]
Whether you have a specific project in mind or just want to explore
whether we're a good fit — I'd like to hear from you.
```

**Form fields:**
1. Name (text input, required)
2. Email (email input, required)
3. Company (text input, optional)
4. Message (textarea, required)
5. Submit button (Primary CTA style): "Send message"

**Form integration:**
- Form `action` points to Formspree endpoint
- Method: POST
- Include a hidden `_subject` field for email subject line
- Include a `_next` field to redirect to a simple "Thank you" page or back to /contact with a success message after submission
- Add a placeholder comment in the code: `<!-- Replace YOUR_FORMSPREE_ID with your actual Formspree endpoint -->`

**Form styling:**
- Input fields: clean, minimal. Soft Linen or white background, 1px Blue Slate border at 30% opacity. Focus state: Carrot Orange border.
- Labels: Space Mono 400, 13px, uppercase, Blue Slate
- Generous spacing between fields (24–32px)
- Form max-width: ~600px

---

## Responsive Behavior

| Breakpoint | Layout changes |
|-----------|---------------|
| Desktop (1024px+) | Full layouts as described. 12-column grid. Side-by-side elements. |
| Tablet (768–1023px) | Philosophy grid goes to 2×1 or stays 2×2 with smaller cards. Service cards stack if needed. Nav may collapse to hamburger. |
| Mobile (<768px) | Single column everything. Hamburger nav. Philosophy cards stack vertically. Generous touch targets (min 44px). Hero text left-aligned. |

---

## Accessibility Requirements

- All interactive elements keyboard-navigable
- Focus states visible (Carrot Orange outline)
- Color contrast meets WCAG AA (verify Twilight Indigo on Soft Linen, Blue Slate on Soft Linen)
- Alt text for all images/SVGs (even placeholders)
- Form inputs have associated labels
- Reduced motion: respect `prefers-reduced-motion` — disable scroll animations, use instant transitions
- Semantic HTML: proper heading hierarchy, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`

---

## File Structure

```
sloanthomas.com/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── fonts/ (if self-hosting)
│   └── images/
│       └── svg-placeholders/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro (HTML head, meta, fonts, global styles)
│   │   └── ArticleLayout.astro (layout for individual writing posts)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── PhilosophySection.astro
│   │   ├── PhilosophyCard.astro
│   │   ├── ServicesPreview.astro
│   │   ├── ServiceCard.astro
│   │   ├── TestimonialSection.astro
│   │   ├── TestimonialCard.astro
│   │   ├── ArticleCard.astro
│   │   ├── ContactForm.astro
│   │   ├── BottomCTA.astro
│   │   └── ScrollFadeIn.astro (reusable scroll-triggered animation wrapper)
│   ├── content/
│   │   └── writing/
│   │       ├── data-is-killing-your-marketing.md
│   │       ├── the-friction-you-cant-measure.md
│   │       └── why-taste-beats-testing.md
│   ├── pages/
│   │   ├── index.astro (Home)
│   │   ├── services.astro
│   │   ├── writing.astro (article index)
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── styles/
│   │   └── global.css (Tailwind imports + any custom CSS)
│   └── scripts/
│       └── scroll-observer.js (Intersection Observer logic)
└── .github/
    └── workflows/
        └── deploy.yml (GitHub Pages deploy action)
```

---

## Deployment

Use Astro's official GitHub Pages integration:
- GitHub Actions workflow that builds on push to `main`
- Outputs static files to GitHub Pages
- Custom domain: `sloanthomas.com` (configure in repo settings + Squarespace DNS)

Include a brief `README.md` in the repo with:
- How to run locally (`npm install` → `npm run dev`)
- How to add new articles (create markdown file in `src/content/writing/`)
- How to update Formspree endpoint
- How to deploy (push to main)

---

## What Is NOT In Scope

- About page scroll narrative design (separate process)
- Actual SVG animations (placeholders only — Thomas will create with AI tools)
- Real testimonial content (placeholders only)
- Blog CMS or admin panel
- Analytics integration (can be added later)
- SEO meta tags beyond basics (title, description, OG tags — include these with sensible defaults)
- Dark mode

---

## Quality Checklist

Before considering the build complete:

- [ ] All pages render correctly on desktop (1440px), tablet (768px), and mobile (375px)
- [ ] Scroll animations fire correctly — once, on first intersection
- [ ] Philosophy card expand/collapse works smoothly
- [ ] Navigation works on all pages, active state shows correctly
- [ ] Contact form submits (or shows clear placeholder for Formspree endpoint)
- [ ] Article pages render from markdown correctly
- [ ] Typography hierarchy is visually distinct and consistent
- [ ] Color palette is applied consistently — no rogue colors
- [ ] All text is readable (contrast check)
- [ ] Page loads fast — no unnecessary JS, images optimized
- [ ] `prefers-reduced-motion` is respected
- [ ] Footer tagline and link work
- [ ] GitHub Pages deployment pipeline works
