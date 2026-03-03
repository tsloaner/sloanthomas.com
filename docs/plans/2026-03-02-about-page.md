# About Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full About page for sloanthomas.com — a single scrolling page with 6 full-viewport sections, a sticky section nav, scroll-snap, and animated content.

**Architecture:** Replace the placeholder `src/pages/about.astro` with a complete page using the existing `BaseLayout`, Tailwind design tokens, and `scroll-fade-in`/`is-visible` animation system. All 6 sections are inline in one file (no new component files). One inline `<script>` handles section nav active state and mobile timeline collapse.

**Tech Stack:** Astro 5, Tailwind CSS v4, Intersection Observer API, CSS transitions

---

## Reference Files (read before writing any code)

- `src/layouts/BaseLayout.astro` — wrapper with Nav, Footer, scroll observer init
- `src/styles/global.css` — design tokens, `scroll-fade-in` / `is-visible` classes, `data-delay`
- `src/components/Nav.astro` — fixed header, adds `h-28` spacer (112px = 7rem)
- `src/components/ScrollFadeIn.astro` — wraps elements with `scroll-fade-in` class
- `src/components/BottomCTA.astro` — reference for CTA button style on indigo background
- `src/components/Hero.astro` — reference for first-paint animation (no scroll trigger needed)
- `PRD_About_Page.md` — full content, section specs, and placeholder comments

---

### Task 1: Page Shell + Scroll Snap

**Files:**
- Modify: `src/pages/about.astro` (full replacement)

**Step 1: Replace about.astro with the BaseLayout shell + scroll-snap global style**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About — Thomas Sloan" description="Marketing strategist, behavioral science practitioner, Boulder CO.">
  <!-- Section Nav injected in Task 2 -->

  <!-- Sections injected in Tasks 3–8 -->
</BaseLayout>

<style is:global>
  /* Scroll snap — scoped to about page only via body class */
  body.about-page {
    scroll-snap-type: y mandatory;
    scroll-padding-top: 7rem;
  }
  body.about-page section[id] {
    scroll-snap-align: start;
  }
</style>

<script>
  document.body.classList.add('about-page');
</script>
```

**Step 2: Start dev server and verify page loads**

Run: `npm run dev`
Navigate to `http://localhost:4321/about`
Expected: Blank page with nav + footer, no errors in console

**Step 3: Commit**

```bash
git add src/pages/about.astro docs/plans/2026-03-02-about-page.md docs/plans/2026-03-02-about-page-design.md
git commit -m "feat: scaffold about page shell with scroll-snap"
```

---

### Task 2: Sticky Section Nav

**Files:**
- Modify: `src/pages/about.astro` (add nav element + script)

**Step 1: Add the sticky section nav HTML after the BaseLayout opening tag**

```astro
<!-- Sticky Section Nav -->
<nav
  aria-label="Page sections"
  id="section-nav"
  class="fixed z-40 hidden lg:flex flex-col gap-4 right-6 top-1/2 -translate-y-1/2"
>
  {[
    { label: 'Story',    href: '#story'    },
    { label: 'Spark',    href: '#spark'    },
    { label: 'Beliefs',  href: '#beliefs'  },
    { label: 'Journey',  href: '#journey'  },
    { label: 'Life',     href: '#life'     },
    { label: 'Contact',  href: '#contact'  },
  ].map(({ label, href }) => (
    <a
      href={href}
      data-section={href.slice(1)}
      class="section-nav-link font-mono text-[11px] uppercase tracking-widest text-slate-blue hover:text-orange transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
    >
      {label}
    </a>
  ))}
</nav>
```

**Step 2: Add the active-state script at the bottom of about.astro**

```astro
<script>
  document.body.classList.add('about-page');

  function initSectionNav() {
    const links = document.querySelectorAll<HTMLAnchorElement>('.section-nav-link');
    const sections = Array.from(links).map(l =>
      document.getElementById(l.dataset.section!)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(l => {
              const active = l.dataset.section === id;
              l.classList.toggle('text-orange', active);
              l.classList.toggle('text-slate-blue', !active);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(s => observer.observe(s));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionNav);
  } else {
    initSectionNav();
  }
</script>
```

**Step 3: Add active style to global CSS or inline style block**

Add to the `<style is:global>` block:

```css
.section-nav-link.text-orange {
  font-weight: 600;
}
```

**Step 4: Verify in browser**

Navigate to `/about`. Confirm the vertical nav appears on the right side on desktop (≥1024px). No JS errors.

**Step 5: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add sticky section nav to about page"
```

---

### Task 3: Section 1 — Story (#story)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add the Story section inside BaseLayout, before the closing tag**

```astro
<!-- Section 1: Story -->
<section
  id="story"
  class="min-h-[100dvh] bg-linen flex items-center px-6 py-24"
>
  <div class="max-w-[1200px] w-full mx-auto grid lg:grid-cols-[3fr_2fr] gap-16 items-center">

    <!-- Text column -->
    <div>
      <!-- Name block — no animation on first load -->
      <div class="mb-8">
        <h1 class="font-display font-bold text-[clamp(2.75rem,5vw+1rem,4rem)] text-indigo leading-tight tracking-tight">
          Thomas Sloan
        </h1>
        <p class="font-body text-slate-blue mt-2 text-[1.0625rem]">
          Marketing Strategist · Boulder, CO
        </p>
      </div>

      <div class="w-12 h-0.5 bg-orange mb-8"></div>

      <p class="scroll-fade-in font-body text-slate-blue text-[1.0625rem] leading-relaxed max-w-[60ch]">
        I have a non-traditional background spanning SaaS, startups, higher ed, and private equity.
        I've learned what works and why across different environments. Educated by degrees and relentless
        self-directed learning in behavioral science, I'm focused on applying what I've learned to help you grow.
      </p>
    </div>

    <!-- Photo column -->
    <div class="flex justify-center lg:justify-end">
      <!-- PHOTO: Professional headshot -->
      <div
        class="scroll-fade-in w-[280px] lg:w-[350px] aspect-[7/9] rounded-sm border-2 border-slate-blue/20 bg-linen flex items-center justify-center"
        aria-label="Headshot placeholder"
      >
        <svg class="w-16 h-16 text-slate-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>

  </div>
</section>
```

**Step 2: Verify in browser**

Two-column layout on desktop, single-column on mobile. Name is large, Fraunces font. No animation needed on first paint.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add Story section to about page"
```

---

### Task 4: Section 2 — Spark (#spark)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add Spark section after Story section**

```astro
<!-- Section 2: Spark -->
<section
  id="spark"
  class="min-h-[100dvh] bg-indigo flex items-center px-6 py-24"
>
  <div class="max-w-[700px] w-full mx-auto space-y-8">

    <p class="scroll-fade-in font-body text-linen/90 text-[1.0625rem] leading-relaxed">
      The summer after college, I picked up <em>Thinking, Fast &amp; Slow</em>. Something clicked that had been
      nagging me since Econ 101 — professors kept talking about "rational actors" and I knew humans were anything but.
    </p>

    <p class="scroll-fade-in font-body text-linen/90 text-[1.0625rem] leading-relaxed" data-delay="100">
      That book connected dots across everything I'd been drawn to — psychology, philosophy, how people actually make
      decisions. It never left my head.
    </p>

    <p class="scroll-fade-in font-body text-linen/90 text-[1.0625rem] leading-relaxed" data-delay="200">
      Years of experience since then — in SaaS, startups, higher ed — and I keep seeing the same pattern. Marketing
      doesn't fail because the product is bad or the team is lazy. It fails because nobody stopped to think about how
      humans actually process information and choose.
    </p>

    <!-- Pull quote -->
    <blockquote class="scroll-fade-in border-l-4 border-orange pl-6 py-2 my-10" data-delay="300">
      <p class="font-display font-bold text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] text-orange leading-snug">
        "Your customers aren't irrational. Your funnel is."
      </p>
    </blockquote>

    <p class="scroll-fade-in font-body text-linen/70 text-[1.0rem] leading-relaxed" data-delay="400">
      This isn't one book from a decade ago. It's an evolving framework built from behavioral economics, social
      psychology, and real-world pattern recognition across industries.
    </p>

  </div>
</section>
```

**Step 2: Update global.css `data-delay` to add 500ms option** (needed for later tasks)

In `src/styles/global.css`, after the existing `data-delay="400"` rule, add:

```css
.scroll-fade-in[data-delay="500"] { transition-delay: 500ms; }
.scroll-fade-in[data-delay="600"] { transition-delay: 600ms; }
.scroll-fade-in[data-delay="700"] { transition-delay: 700ms; }
```

**Step 3: Verify in browser**

Dark indigo section, pull quote in Fraunces + Carrot Orange with left border. Content fades in on scroll.

**Step 4: Commit**

```bash
git add src/pages/about.astro src/styles/global.css
git commit -m "feat: add Spark section and extend delay utilities"
```

---

### Task 5: Section 3 — Beliefs (#beliefs)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add Beliefs section after Spark**

```astro
<!-- Section 3: Beliefs -->
<section
  id="beliefs"
  class="min-h-[100dvh] bg-linen flex items-center px-6 py-24"
>
  <div class="max-w-[900px] w-full mx-auto">

    <h2 class="scroll-fade-in font-display font-bold text-indigo mb-16">
      What I Believe
    </h2>

    <div class="space-y-12">

      <!-- Block 1 -->
      <div class="scroll-fade-in flex gap-6 items-start" data-delay="100">
        <div class="shrink-0 w-14 h-14 rounded-sm border-2 border-orange/40 bg-orange/10 flex items-center justify-center">
          <!-- ICON: Misaligned gears — represents broken process -->
          <svg class="w-7 h-7 text-orange" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 class="font-display font-bold text-indigo text-[1.25rem] leading-snug mb-2">
            Most marketing doesn't fail because of bad ideas. It fails because of broken processes.
          </h3>
          <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
            Decision-by-committee, the highest-paid person's opinion, over-reliance on "best practices." Ask ten people to pick an ice cream flavor and you get vanilla.
          </p>
        </div>
      </div>

      <!-- Block 2 -->
      <div class="scroll-fade-in flex gap-6 items-start" data-delay="200">
        <div class="shrink-0 w-14 h-14 rounded-sm border-2 border-orange/40 bg-orange/10 flex items-center justify-center">
          <!-- ICON: Dashboard with question mark — represents measurement flaws -->
          <svg class="w-7 h-7 text-orange" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 class="font-display font-bold text-indigo text-[1.25rem] leading-snug mb-2">
            Data is a tool, not a strategy.
          </h3>
          <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
            The marketing world worships metrics, but measurement has real flaws — especially now. If you're only optimizing what you can measure, you're ignoring most of what actually drives decisions.
          </p>
        </div>
      </div>

      <!-- Block 3 -->
      <div class="scroll-fade-in flex gap-6 items-start" data-delay="300">
        <div class="shrink-0 w-14 h-14 rounded-sm border-2 border-orange/40 bg-orange/10 flex items-center justify-center">
          <!-- ICON: Signal tower — represents signaling in the AI age -->
          <svg class="w-7 h-7 text-orange" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <div>
          <h3 class="font-display font-bold text-indigo text-[1.25rem] leading-snug mb-2">
            In the AI age, being more human is the competitive advantage.
          </h3>
          <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
            Execution is getting cheaper by the day. When everyone has agents creating content, measuring, and iterating — standing out means signaling care, credibility, and quality in ways that can't be automated.
          </p>
        </div>
      </div>

      <!-- Block 4 -->
      <div class="scroll-fade-in flex gap-6 items-start" data-delay="400">
        <div class="shrink-0 w-14 h-14 rounded-sm border-2 border-orange/40 bg-orange/10 flex items-center justify-center">
          <!-- ICON: Brain with groove/path — represents working with human nature -->
          <svg class="w-7 h-7 text-orange" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 class="font-display font-bold text-indigo text-[1.25rem] leading-snug mb-2">
            Work with human nature, not against it.
          </h3>
          <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
            Reduce friction by operating within the grooves of how people actually think and decide — not how you wish they did.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

Scroll to Beliefs. Four blocks appear staggered. Icon placeholders visible as orange-tinted squares. Headings in Fraunces.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add Beliefs section to about page"
```

---

### Task 6: Section 4 — Journey (#journey)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add Journey section after Beliefs**

```astro
<!-- Section 4: Journey -->
<section
  id="journey"
  class="min-h-[100dvh] bg-linen flex items-start px-6 py-24"
>
  <div class="max-w-[900px] w-full mx-auto">

    <h2 class="scroll-fade-in font-display font-bold text-indigo mb-16">
      How I Got Here
    </h2>

    <!-- Timeline -->
    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-[11px] top-0 bottom-0 w-0.5 bg-slate-blue/25"></div>

      <div class="space-y-10">

        <!-- Entry 1 -->
        <div class="scroll-fade-in relative pl-10" data-delay="100">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Started with the big questions
            </h3>
            <p class="font-mono text-[11px] uppercase tracking-widest text-slate-blue/70 mt-0.5 mb-2">
              Wake Forest — Philosophy &amp; Political Science
            </p>
            <!-- Desktop: always visible. Mobile: collapsible -->
            <div class="timeline-detail" id="detail-1">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                I was always drawn to the big, messy questions that mattered. How people think and act, how and why certain systems work better than others.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-1"
              data-target="detail-1"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry 2 -->
        <div class="scroll-fade-in relative pl-10" data-delay="200">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Explored before specializing
            </h3>
            <p class="font-mono text-[11px] uppercase tracking-widest text-slate-blue/70 mt-0.5 mb-2">
              Topanga Partners → UpContent
            </p>
            <div class="timeline-detail" id="detail-2">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                Private equity gave me exposure to various startups. That led to UpContent, a marketing SaaS startup. Energized by the small team, hands-on work, and thinking deeply about customer journeys.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-2"
              data-target="detail-2"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry 3 -->
        <div class="scroll-fade-in relative pl-10" data-delay="300">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Found marketing through the side door
            </h3>
            <p class="font-mono text-[11px] uppercase tracking-widest text-slate-blue/70 mt-0.5 mb-2">
              Techstars
            </p>
            <div class="timeline-detail" id="detail-3">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                Customer Success made me realize I didn't care about support. It was understanding why people engaged or didn't, and designing better systems around that.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-3"
              data-target="detail-3"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry 4 -->
        <div class="scroll-fade-in relative pl-10" data-delay="400">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Got serious about the craft
            </h3>
            <p class="font-mono text-[11px] uppercase tracking-widest text-slate-blue/70 mt-0.5 mb-2">
              MS Marketing — University of Denver
            </p>
            <div class="timeline-detail" id="detail-4">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                One year of intensive study. Consumed more and more behavioral science and consumer behavior research. Formalized what experience had been teaching me.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-4"
              data-target="detail-4"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry 5 -->
        <div class="scroll-fade-in relative pl-10" data-delay="500">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Tested it in the real world
            </h3>
            <p class="font-mono text-[11px] uppercase tracking-widest text-slate-blue/70 mt-0.5 mb-2">
              CU Boulder
            </p>
            <div class="timeline-detail" id="detail-5">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                Managed email campaigns to 200K+ alumni, 44% open rate. Complex stakeholder environment. Learned what works — and more about how organizational friction kills good marketing.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-5"
              data-target="detail-5"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry 6 -->
        <div class="scroll-fade-in relative pl-10" data-delay="600">
          <div class="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-orange border-4 border-linen shadow-sm"></div>
          <div>
            <h3 class="font-display font-bold text-indigo text-[1.125rem] leading-snug">
              Went independent
            </h3>
            <div class="timeline-detail" id="detail-6">
              <p class="font-body text-slate-blue text-[1.0rem] leading-relaxed max-w-[60ch]">
                Being on the outside lets me evaluate with fresh eyes and without the worry of upsetting a manager I have to work with indefinitely. I kept seeing the same problems — good marketing killed by bad process, misguided optimization, and a lack of understanding of human nature. Now I fix them.
              </p>
            </div>
            <button
              class="timeline-toggle lg:hidden mt-2 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
              aria-expanded="false"
              aria-controls="detail-6"
              data-target="detail-6"
            >
              <span class="toggle-label">More</span>
              <svg class="toggle-icon w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
```

**Step 2: Add timeline collapse CSS to the `<style>` block in about.astro**

```css
/* Timeline detail — desktop always visible, mobile collapsible */
.timeline-detail {
  overflow: hidden;
}

@media (max-width: 1023px) {
  .timeline-detail {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms ease-in-out;
  }
  .timeline-detail > p {
    overflow: hidden;
  }
  .timeline-detail.is-open {
    grid-template-rows: 1fr;
  }
}
```

**Step 3: Add timeline toggle script to the existing `<script>` block**

Inside the `initSectionNav` function or as a separate `initTimeline` function called at the bottom:

```typescript
function initTimeline() {
  const toggles = document.querySelectorAll<HTMLButtonElement>('.timeline-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target!;
      const detail = document.getElementById(targetId);
      const label = btn.querySelector('.toggle-label');
      const icon = btn.querySelector<SVGElement>('.toggle-icon');
      if (!detail) return;

      const isOpen = detail.classList.contains('is-open');
      detail.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', (!isOpen).toString());
      if (label) label.textContent = isOpen ? 'More' : 'Less';
      if (icon) icon.style.transform = isOpen ? '' : 'rotate(180deg)';
    });
  });
}
```

**Step 4: Verify in browser**

Desktop: all 6 entries fully visible with staggered fade-in. Mobile: detail text hidden behind "More" button, expands smoothly on tap.

**Step 5: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add Journey timeline section to about page"
```

---

### Task 7: Section 5 — Life (#life)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add Life section after Journey**

```astro
<!-- Section 5: Life -->
<section
  id="life"
  class="min-h-[100dvh] bg-linen flex items-center px-6 py-24"
>
  <div class="max-w-[900px] w-full mx-auto text-center">

    <h2 class="scroll-fade-in font-display font-bold text-indigo mb-8">
      Outside Work
    </h2>

    <p class="scroll-fade-in font-body text-slate-blue text-[1.0625rem] leading-relaxed max-w-[60ch] mx-auto mb-16" data-delay="100">
      Based in Boulder, CO with my partner and our dog. In my free time you can find me playing in the mountains on my feet, bike, or snowboard, making music with{' '}
      <a
        href="https://instagram.com/roundtreemusic"
        target="_blank"
        rel="noopener noreferrer"
        class="text-orange underline decoration-transparent hover:decoration-orange underline-offset-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
      >ROUNDTREE</a>,
      or lifting things at the gym or out of the oven.
    </p>

    <!-- 2×2 Photo grid -->
    <div class="grid grid-cols-2 gap-2 sm:gap-3 max-w-[640px] mx-auto">

      <!-- Slot 1: Mountains / hiking -->
      <div class="scroll-fade-in aspect-[3/2] rounded-[4px] border border-slate-blue/15 bg-slate-blue/5 flex items-center justify-center" data-delay="200">
        <!-- PHOTO: Mountains / hiking -->
        <svg class="w-8 h-8 text-slate-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 3l4 8 3-4 4 8H3l2-4zm14 9l-3-6-4 8" />
        </svg>
      </div>

      <!-- Slot 2: Snowboarding or cycling -->
      <div class="scroll-fade-in aspect-[3/2] rounded-[4px] border border-slate-blue/15 bg-slate-blue/5 flex items-center justify-center" data-delay="300">
        <!-- PHOTO: Snowboarding or cycling -->
        <svg class="w-8 h-8 text-slate-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="1" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 2v20M2 12h20" />
        </svg>
      </div>

      <!-- Slot 3: Band performance (ROUNDTREE) -->
      <div class="scroll-fade-in aspect-[3/2] rounded-[4px] border border-slate-blue/15 bg-slate-blue/5 flex items-center justify-center" data-delay="400">
        <!-- PHOTO: Band performance (ROUNDTREE) -->
        <svg class="w-8 h-8 text-slate-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </div>

      <!-- Slot 4: Gym or cooking -->
      <div class="scroll-fade-in aspect-[3/2] rounded-[4px] border border-slate-blue/15 bg-slate-blue/5 flex items-center justify-center" data-delay="500">
        <!-- PHOTO: Gym or cooking -->
        <svg class="w-8 h-8 text-slate-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

    </div>

  </div>
</section>
```

**Step 2: Verify in browser**

Scroll to Life section. Short text, 2×2 grid of placeholder boxes. ROUNDTREE links to Instagram. Grid staggered on entry.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add Life section to about page"
```

---

### Task 8: Section 6 — Contact (#contact)

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Add Contact section after Life**

```astro
<!-- Section 6: Contact -->
<section
  id="contact"
  class="min-h-[100dvh] bg-indigo flex items-center px-6 py-24"
>
  <div class="max-w-[600px] w-full mx-auto text-center">

    <h2 class="scroll-fade-in font-display font-bold text-linen mb-6">
      See How I Can Help
    </h2>

    <p class="scroll-fade-in font-body text-linen/80 text-[1.0625rem] leading-relaxed mb-12 max-w-[50ch] mx-auto" data-delay="100">
      I work with B2B and SaaS teams to find and fix the friction in their customer decision paths.
    </p>

    <div class="scroll-fade-in flex flex-col items-center gap-6" data-delay="200">
      <a
        href="/services"
        class="use-magnetic inline-block bg-orange text-indigo font-body font-semibold py-4 px-10 rounded-md transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo focus-visible:ring-orange"
      >
        See How I Can Help &rarr;
      </a>

      <a
        href="mailto:sloan.thomas.a@gmail.com"
        class="font-body text-linen/70 text-[0.9375rem] underline decoration-transparent hover:text-linen hover:decoration-linen underline-offset-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
      >
        sloan.thomas.a@gmail.com
      </a>
    </div>

  </div>
</section>
```

**Step 2: Verify in browser**

Scroll to the end. Dark indigo section, large orange CTA button, email link below. Button hover scales slightly.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add Contact CTA section to about page"
```

---

### Task 9: Polish Pass — Scroll Snap, Spacing, Responsive QA

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/styles/global.css` (if needed)

**Step 1: Test scroll-snap on desktop**

Navigate to `/about`. Scroll slowly. Each section should snap into position. If snapping feels too aggressive, change `y mandatory` to `y proximity` in the `<style is:global>` block.

**Step 2: Test mobile (resize to 375px)**

Check:
- [ ] Section nav hidden on mobile (should be hidden via `hidden lg:flex`)
- [ ] Story section: single column, photo above text (ensure `grid-cols-1` on mobile or rearrange order)
- [ ] Beliefs blocks: icon + text side by side (confirm readability)
- [ ] Journey: "More" buttons visible, detail text hidden by default, expands on tap
- [ ] Life: 2×2 grid looks balanced
- [ ] All text readable (no overflow)

**Step 3: Fix Story mobile photo order if needed**

On mobile, PRD says photo above text. In the current grid, text is first column. Add `order` utilities:

```astro
<!-- Photo column -->
<div class="flex justify-center lg:justify-end order-first lg:order-last">
```

```astro
<!-- Text column -->
<div class="order-last lg:order-first">
```

**Step 4: Verify section nav active state**

Scroll through each section on desktop. The correct label should highlight orange.

**Step 5: Test `prefers-reduced-motion`**

In DevTools → Rendering → Emulate prefers-reduced-motion. All elements should be immediately visible (no fade-in). This is handled by the existing global.css rule.

**Step 6: Accessibility check**

- All `<section>` elements have an `id`
- Section nav has `aria-label="Page sections"`
- Timeline buttons have `aria-expanded` and `aria-controls`
- External link (ROUNDTREE) has `target="_blank" rel="noopener noreferrer"`
- Photo placeholder divs have `aria-label`

**Step 7: Final commit**

```bash
git add src/pages/about.astro src/styles/global.css
git commit -m "feat: polish about page — responsive, a11y, scroll-snap QA"
```

---

## Completion Checklist

- [ ] All 6 sections render correctly
- [ ] Scroll-snap works on desktop
- [ ] Section nav highlights active section
- [ ] Timeline expand/collapse works on mobile
- [ ] Responsive layout correct at 375px, 768px, 1280px
- [ ] No console errors
- [ ] `prefers-reduced-motion` respected
- [ ] All placeholder comments visible in HTML source
- [ ] External link (ROUNDTREE) opens in new tab
- [ ] CTA button links to `/services`
