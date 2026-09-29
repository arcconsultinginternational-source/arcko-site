# Arcko website

Ready-to-push static HTML, CSS and JavaScript. This export preserves the latest approved design, including the animated doodle hero, white section backgrounds, LINE/Instagram buttons and the three-stage journey overview. No framework, build dependencies, Git history or co-author metadata is included.

## Publish

1. Unzip this folder into your repository.
2. Check `site-settings.json`. The production domain is currently `https://www.arc-international-edu.com`. Change it if your rebrand will use another domain.
3. If you change settings, run `node scripts/configure.mjs` (Node.js 18+). This regenerates the static metadata, sitemap and browser configuration. Contact details displayed in HTML must also be updated if you change email/phone.
4. Upload the **entire folder** to a static website host or push it to your connected repository. There is no build command; set the publish directory to the repository root.
5. The homepage is `index.html`. All assets use relative paths. Canonical URLs assume the site is served from the domain root, not a subdirectory.

For a local preview, run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

If you are adding these files to an existing repository, preserve any unrelated files and your host's configuration. No existing website is changed by downloading this export.

## Edit the site

| File                        | Purpose                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `index.html`                | Visible page content, programme cards, metadata, schema and FAQs       |
| `styles.css`                | Approved desktop/mobile design and interaction styles                  |
| `site.js`                   | Programme details, navigation, gallery, hero motion and LINE behaviour |
| `site-settings.json`        | Domain, social/contact links and optional marketing IDs                |
| `site-config.js`            | Generated public browser settings; never place secrets here            |
| `marketing.js`              | Optional marketing event hooks and GTM loader                          |
| `assets/images/`            | Clearly named, replaceable images                                      |
| `assets/fonts/`             | Local Jua font and required font licence                               |
| `robots.txt`, `sitemap.xml` | Search crawler instructions and homepage sitemap                       |
| `docs/IMAGES.md`            | Image locations, filenames and replacement guidance                    |
| `docs/MARKETING.md`         | SEO setup, analytics events and campaign guidance                      |

## LINE

Your LINE URL (`https://lin.ee/Sv8YgSv`) and Instagram URL (`https://www.instagram.com/arcko.creative/`) are included. If these change, update the settings and floating links in `index.html`, then regenerate.

## Replace images

Replace a file in `assets/images/` using the same filename and extension. The current photographs are included, so the site works immediately. Update the associated `alt` text and captions when a replacement depicts different content. See `docs/IMAGES.md` for the exact map.

## SEO and marketing

The source includes crawlable HTML content, a descriptive title and meta description, canonical URL, Open Graph and X card metadata, EducationalOrganization structured data, alt text, robots.txt and a sitemap. Your actual domain must match the configuration.

No analytics or advertising scripts load by default. Tracking requires your own container, tag configuration and consent integration; see `docs/MARKETING.md`. No analytics IDs, advertising accounts or Search Console verification were invented.

## Checks completed

- JavaScript syntax; local image/font references; section links and unique IDs.
- DOM interaction checks: programme filters/details, gallery close, mobile menu, social contact tracking and reduced-motion handling.
- Static programme content, metadata, structured data and sitemap.
- Export includes only the required image assets and local heading font.

These are source/DOM checks, not a live-device rendering audit or a Google ranking guarantee. Once deployed, review desktop/mobile rendering and verify indexing in Search Console.
