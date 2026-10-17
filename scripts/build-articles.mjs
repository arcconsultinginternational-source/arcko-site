/** Build crawlable article pages from plain Markdown. No dependencies. */
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  rm,
  access,
} from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const out = resolve(root, option("--output") || ".");
let settings = {};
try {
  settings = JSON.parse(
    await readFile(resolve(root, "site-settings.json"), "utf8"),
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const base = (option("--base") || settings.siteUrl || "").replace(/\/$/, "");
if (!/^https:\/\/[^/?#]+$/.test(base))
  throw Error("Set a valid HTTPS siteUrl in site-settings.json.");
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const json = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
function inline(text) {
  return escape(text)
    .replace(
      /\[([^\]]+)\]\((https:\/\/[^\s)]+|\/(?!\/)[^\s)]*)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
function markdown(source) {
  const html = [];
  let paragraph = [],
    list = false;
  const flush = () => {
    if (paragraph.length) {
      html.push("<p>" + inline(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }
  };
  const closeList = () => {
    if (list) {
      html.push("</ul>");
      list = false;
    }
  };
  for (const line of source.split("\n")) {
    if (!line.trim()) {
      flush();
      closeList();
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flush();
      closeList();
      const n = heading[1].length;
      html.push(`<h${n}>${inline(heading[2])}</h${n}>`);
      continue;
    }
    if (line.startsWith("# "))
      throw Error(
        "Use ## and ### headings; the title already supplies the H1.",
      );
    if (line.startsWith("- ")) {
      flush();
      if (!list) {
        html.push("<ul>");
        list = true;
      }
      html.push("<li>" + inline(line.slice(2)) + "</li>");
      continue;
    }
    closeList();
    paragraph.push(line.trim());
  }
  flush();
  closeList();
  return html.join("\n");
}
const home = await readFile(resolve(out, "index.html"), "utf8");
const brand =
  home
    .match(/<a\b[^>]*class="brand"[\s\S]*?<\/a\s*>/)?.[0]
    .replace('href="#"', 'href="/"')
    .replaceAll('src="assets/', 'src="/assets/') ||
  '<a class="article-wordmark" href="/">Arcko</a>';
const articles = [];
for (const file of await readdir(resolve(root, "content/articles"))) {
  if (!file.endsWith(".md") || file.startsWith("_")) continue;
  const slug = file.slice(0, -3);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw Error(`Use lowercase hyphenated filenames: ${file}`);
  const raw = (
    await readFile(resolve(root, "content/articles", file), "utf8")
  ).replaceAll("\r\n", "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw Error(`Missing metadata in ${file}`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const split = line.indexOf(":");
    if (split < 1) throw Error(`Invalid metadata in ${file}`);
    meta[line.slice(0, split).trim()] = line.slice(split + 1).trim();
  }
  if (meta.draft !== "false") continue;
  for (const field of ["title", "description", "date"])
    if (!meta[field]) throw Error(`${file}: ${field} is required`);
  for (const date of [meta.date, meta.updated].filter(Boolean))
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      new Date(date).toISOString().slice(0, 10) !== date
    )
      throw Error(`Invalid date in ${file}`);
  if (meta.updated && meta.updated < meta.date)
    throw Error(`Updated date precedes publication in ${file}`);
  if (meta.image) {
    if (
      !/^assets\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp)$/.test(meta.image) ||
      meta.image.includes("..")
    )
      throw Error(`Invalid image path in ${file}`);
    await access(resolve(out, meta.image));
    if (!meta.imageAlt) throw Error(`Add imageAlt in ${file}`);
  }
  const body = markdown(match[2]);
  if (!body.trim()) throw Error(`Empty article: ${file}`);
  articles.push({ ...meta, slug, body });
}
articles.sort(
  (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
);
function page({ title, description, path, content, schema, image }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | Arcko</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${base}${path}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${base}${path}"><meta property="og:type" content="${schema["@type"] === "BlogPosting" ? "article" : "website"}"><meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">${image ? `<meta property="og:image" content="${base}/${escape(image)}"><meta name="twitter:image" content="${base}/${escape(image)}">` : ""}<link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${json(schema)}</script></head><body><a class="skip" href="#article-main">Skip to content</a><header class="header article-header">${brand}<nav aria-label="Main navigation"><a href="/">Home</a><a href="/articles/" aria-current="${path === "/articles/" ? "page" : "false"}">Articles</a><a class="button small" href="https://lin.ee/Sv8YgSv">Let’s talk ↗</a></nav></header><main id="article-main" class="article-main">${content}</main><footer class="article-footer"><p>Arcko Creative & Design Academy · Sathorn, Bangkok</p><a href="/">Explore the academy ↗</a></footer></body></html>`;
}
await mkdir(resolve(out, "articles"), { recursive: true });
for (const a of articles) {
  const path = `/articles/${a.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date + "T09:00:00+07:00",
    dateModified: (a.updated || a.date) + "T09:00:00+07:00",
    author: {
      "@type": "Organization",
      name: "Arcko Creative & Design Academy",
      url: base + "/",
    },
    publisher: {
      "@type": "Organization",
      name: "Arcko Creative & Design Academy",
      url: base + "/",
    },
    mainEntityOfPage: base + path,
    ...(a.image ? { image: base + "/" + a.image } : {}),
  };
  const content = `<nav class="article-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/articles/">Articles</a></nav><article><header><p class="eyebrow">ARCKO JOURNAL</p><h1>${escape(a.title)}</h1><p class="article-lead">${escape(a.description)}</p><p class="article-meta">By Arcko Creative & Design Academy · <time datetime="${a.date}">${a.date}</time>${a.updated ? ` · Updated <time datetime="${a.updated}">${a.updated}</time>` : ""}</p></header>${a.image ? `<img class="article-cover" src="/${escape(a.image)}" alt="${escape(a.imageAlt)}">` : ""}<div class="article-body">${a.body}</div></article><aside class="article-cta"><h2>Curious about learning with Arcko?</h2><p>Explore 3D Printing, Tech Toy Design and Digital Arts in Sathorn.</p><a class="button" href="https://lin.ee/Sv8YgSv">Chat with us on LINE ↗</a></aside><a class="text-link" href="/articles/">← All articles</a>`;
  await mkdir(resolve(out, "articles", a.slug), { recursive: true });
  await writeFile(
    resolve(out, "articles", a.slug, "index.html"),
    page({
      title: a.title,
      description: a.description,
      path,
      content,
      schema,
      image: a.image,
    }),
  );
}
const cards = articles
  .map(
    (a) =>
      `<article class="article-card"><p class="eyebrow"><time datetime="${a.date}">${a.date}</time></p><h2><a href="/articles/${a.slug}/">${escape(a.title)}</a></h2><p>${escape(a.description)}</p><a class="text-link" href="/articles/${a.slug}/">Read article ↗</a></article>`,
  )
  .join("");
await writeFile(
  resolve(out, "articles/index.html"),
  page({
    title: "Articles for curious families",
    description:
      "Explore creative learning, design thinking and ideas for families from Arcko Creative & Design Academy in Sathorn, Bangkok.",
    path: "/articles/",
    content: `<p class="eyebrow">THE ARCKO JOURNAL</p><h1>Little questions.<br>Big discoveries.</h1><p class="article-lead">Ideas and perspectives on creativity, design and learning.</p>${cards ? `<div class="article-grid">${cards}</div>` : '<div class="article-empty"><h2>Our journal is taking shape.</h2><p>New articles are on the way. In the meantime, discover how children learn and create at Arcko.</p><a class="button" href="/#programmes">Explore our programmes ↗</a></div>'}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Arcko Articles",
      url: base + "/articles/",
    },
  }),
);
// Remove only previously generated article pages that are no longer published.
const manifest = resolve(root, "content/articles/.generated.json");
let previous = [];
try {
  previous = JSON.parse(await readFile(manifest, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
for (const slug of previous)
  if (
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) &&
    !articles.some((a) => a.slug === slug)
  )
    await rm(resolve(out, "articles", slug), { recursive: true, force: true });
await writeFile(
  manifest,
  JSON.stringify(
    articles.map((a) => a.slug),
    null,
    2,
  ) + "\n",
);
const urls = [
  { path: "/" },
  { path: "/articles/" },
  ...articles.map((a) => ({
    path: `/articles/${a.slug}/`,
    date: a.updated || a.date,
  })),
];
await writeFile(
  resolve(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${escape(base + u.path)}</loc>${u.date ? `<lastmod>${u.date}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`,
);
console.log(
  `Built article index, ${articles.length} published articles and sitemap.`,
);
