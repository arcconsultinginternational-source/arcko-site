# Arcko website — latest approved version

Complete static HTML, CSS and JavaScript. Includes Spark, the supplied logo, six programmes, long-term learning and the mobile contact screen. No framework, Git history or co-author attribution is included.

## Publish

1. Copy the contents of this folder into your website repository.
2. Confirm your production domain in `site-settings.json`. It currently uses `https://www.arc-international-edu.com`.
3. If settings change, run `node scripts/configure.mjs` (Node.js 18+).
4. Push to your repository and connect it to a static host. Publish directory: repository root. Build command: leave empty.

Keep `index.html`, CSS, JavaScript and the entire assets folder together. Do not upload only the HTML file. Existing hosting configuration and unrelated repository files should be preserved.

For a local preview: `python3 -m http.server 8000`, then open http://localhost:8000.

## Files

- `index.html`: website content, SEO metadata and structured data.
- `styles.css`: desktop and mobile layouts, branding and animation.
- `site.js`: programme dialogs, filters, gallery, design-thinking steps and hero motion.
- `site-settings.json`: domain, LINE and optional marketing settings.
- `scripts/configure.mjs`: regenerates metadata, sitemap and browser configuration.
- `marketing.js`: optional GTM integration and interaction events. Tracking is disabled until you configure and enable it.
- `assets/images/`: clearly named replaceable images.
- `docs/IMAGES.md`: image replacement instructions.
- `docs/MARKETING.md`: analytics, advertising and launch setup.

## Contacts

LINE: https://lin.ee/Sv8YgSv (@arcko.creative)
WhatsApp: https://wa.me/66835193659
Maps: https://maps.app.goo.gl/bFaTsB1kM1ziKFkr7
Instagram: https://www.instagram.com/arcko.creative/
Email: arckocreative@gmail.com
Phone: +66 83 519 3659

If a contact changes, update its visible link in `index.html` as well as any corresponding configuration. Mobile contact buttons appear at widths up to 800px; the academy website continues below them. Desktop opens on the full website.

## Validation

JavaScript syntax, local assets, section links, programme mappings, metadata and interaction checks are included in the handoff validation. Responsive styling is included, but real-device visual testing has not been completed. Before launch, review on your phones and verify your public domain in Search Console.

No automatic deployment, tracking accounts, passwords or API keys are included. Images and fonts retain their applicable licences; see the assets and image guide.

## Articles

See `docs/ARTICLES.md`. To publish a new article, copy the Markdown template, edit it, set `draft: false`, run `node scripts/configure.mjs`, and push the generated files. No package installation is required.
