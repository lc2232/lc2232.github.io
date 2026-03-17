# lc2232.github.io

My personal portfolio and blog, built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

🌐 **Live site**: [lc2232.github.io](https://lc2232.github.io)

---

## Local Development

**Prerequisites**: Ruby 3+ and Bundler (`gem install bundler`).

```bash
# Install dependencies (first time only)
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Open http://localhost:4000
```

---

## Updating Content

### ✍️ Writing a new blog post

Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "My Post Title"
date: 2026-04-01
tags: [go, backend]
excerpt: "Short summary shown on the blog listing."
---

Your **Markdown** content goes here.
```

Jekyll picks it up automatically — no config changes needed.

### 👤 Updating the About page

Edit [`about.md`](about.md) directly. It's plain Markdown with a small front matter header at the top:

```yaml
---
layout: page
title: About Me
subtitle: Your subtitle here.
permalink: /about/
---
```

To update your profile photo, replace `assets/img/profile.png` with a new image (keep the same filename), or update the `<img>` tag in `about.md` to point to your new file.

### 🛠️ Updating the Projects page

Edit [`projects.md`](projects.md). Each project is an `<article class="project-card-full">` block. Copy an existing block and update the title, description, tags and links.

### 🏠 Updating the Homepage

Edit [`index.html`](index.html). The featured project cards are in the `#projects` section. The recent posts section is auto-populated from your latest `_posts/` entries.

### ⚙️ Updating site settings (title, URL, author)

Edit [`_config.yml`](_config.yml). After changing this file you need to restart `bundle exec jekyll serve` for changes to take effect.

---

## Deployment

Push to `main` — GitHub Pages builds and deploys automatically.

```bash
git add .
git commit -m "your message"
git push origin main
```