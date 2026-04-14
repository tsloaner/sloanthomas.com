# Thomas Sloan — Friction Diagnostics

Personal website and portfolio for Thomas Sloan, built with Astro and Tailwind CSS.

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

The site will be available at `http://localhost:4321`.

## Adding Articles

To add a new article to the Writing section:
1. Create a `.md` file in `src/content/writing/`.
2. Ensure you have the required frontmatter at the top of the file:
   ```yaml
   ---
   title: "Your Article Title"
   summary: "A brief 2-3 sentence summary of the article."
   date: 2025-03-01
   draft: false
   ---
   ```
3. Write your article content below the frontmatter using Markdown.
4. Keep `draft: true` until you are ready to publish. Set to `false` and commit to deploy.

## Updating the Contact Form

The contact form uses Formspree. Ensure you replace the placeholder URL with your actual Formspree endpoint in `src/components/ContactForm.astro`:

```html
<!-- Replace YOUR_FORMSPREE_ID with your actual Formspree form ID -->
<form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```

## Deployment

The site is configured to deploy automatically to GitHub Pages via GitHub Actions.
Pushing to the `main` branch will trigger the deployment workflow.
