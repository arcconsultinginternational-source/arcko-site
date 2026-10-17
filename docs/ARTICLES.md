# Publish an article

Articles are plain text files in `content/articles/`. Every published article gets a static HTML page, its own URL, SEO title and description, social metadata, BlogPosting structured data, a place in the article index and a sitemap entry. Readers and search engines do not need JavaScript to read articles.

## One-time setup

Have Node.js 18 or newer on your computer. No npm install is needed. Confirm `siteUrl` in `site-settings.json` is your final public domain.

## Add an article

1. Copy `content/articles/_template.md` to a descriptive filename such as `content/articles/3d-printing-for-kids.md`.
2. Edit the title, description and publication date at the top. Use plain text after each colon, without surrounding quotes.
3. Write the article below the second `---`. The title automatically becomes the page heading; use `##` and `###` for sections. Paragraphs, **bold**, bullet lists and `[link text](https://...)` or `[programmes](/#programmes)` links are supported. Raw HTML, tables and other Markdown syntax are not supported.
4. Keep `draft: true` while writing. Change it to `draft: false` when ready to publish. Files beginning with `_` are always excluded.
5. From the website folder run:

```bash
node scripts/configure.mjs
```

6. Push your changes, including the generated `articles/` folder, `sitemap.xml`, and `content/articles/.generated.json`. Upload the complete website folder if you do not use Git.

Your URL will be `/articles/3d-printing-for-kids/`. Do not edit generated HTML directly; the next build will replace it.

## Images and updates

An optional cover image goes in `assets/images/`. Enter its relative path in `image:` and a descriptive caption for accessibility in `imageAlt:`. Leave both blank if there is no image. For example:

```
image: assets/images/children-designing-a-toy.jpg
imageAlt: Children developing toy designs at Arcko
```

Keep the original `date`. When making a meaningful update, add the actual date to `updated:` using YYYY-MM-DD. Re-run the command and push. Avoid changing an established filename, as that changes its public URL. If you rename or remove published content, set up a redirect at your host where appropriate.

To unpublish, change `draft` to `true`, run the command and push all changes including deletions. The generator removes its previously published page and sitemap entry. Only write production articles inside this content folder; the included template stays unpublished.

## Launch

This section is initially empty, ready for your own articles. The static host must support folder index pages, for example `/articles/example/index.html` at `/articles/example/` (most static hosts do). Public access and your real production domain are needed for Google indexing. Submit `/sitemap.xml` in Search Console after publishing. Metadata supports search visibility; it does not guarantee rankings.

The visible article byline is Arcko Creative & Design Academy. There is no co-author attribution or Git history in this source package.
