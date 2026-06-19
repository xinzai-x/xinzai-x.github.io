# Hexo Theme - Ink

A clean, reading-focused Hexo theme with a warm white (米白色) color palette.

## Features

### Design
- **Warm White** — `#faf8f5` background, warm tones for comfortable long-form reading
- **Dark Mode** — Auto-detects system preference, manual toggle, flash-free switching
- **Typography** — Serif body (Noto Serif SC), sans-serif headings, monospace code
- **Responsive** — Mobile-first, works beautifully on all screen sizes
- **Print Styles** — Clean layout for printing articles

### Reading Experience
- **Content Width** — 720px optimal reading width
- **Line Height** — 1.8 for comfortable scanning
- **Table of Contents** — Auto-generated with scroll spy, collapsible
- **Reading Progress Bar** — Visual indicator on post pages
- **Word Count + Reading Time** — Requires `hexo-wordcount` plugin

### Navigation & Search
- **Fixed Header** — Frosted glass effect, auto-shadow on scroll
- **Mobile Menu** — Animated hamburger toggle
- **Local Search** — `Cmd/Ctrl+K` to open, scored results with highlighting
- **Sidebar** — Recent posts, categories, tags widgets
- **Pagination** — Smart page numbers with ellipsis
- **Back to Top** — Appears after scrolling 300px

### Content
- **Code Highlighting** — Light + dark syntax themes, line hover, scrollable
- **Cover Images** — Optional per-post, lazy loaded, error fallback
- **Post Navigation** — Previous/next with titles
- **Tags & Categories** — Clickable badges, dedicated listing pages
- **404 Page** — Clean error page with home link

### Technical
- **SEO** — Open Graph meta, JSON-LD structured data (Article + WebSite)
- **RSS** — Auto-discovery link for Atom feed
- **Comments** — Disqus, Valine, Twikoo support
- **External Links** — Auto `target="_blank"` with `noopener`
- **No Dependencies** — Vanilla JS, no jQuery or frameworks

## Installation

```bash
cd your-hexo-site
# Option 1: Git clone
git clone <repo-url> themes/ink

# Option 2: Manual copy
cp -r path/to/theme-ink themes/ink
```

## Setup

### 1. Activate Theme

Edit your site's `_config.yml`:

```yaml
theme: ink
```

### 2. Install Recommended Plugins

```bash
# Search functionality
npm install hexo-generator-search --save

# Word count + reading time
npm install hexo-wordcount --save

# RSS feed
npm install hexo-generator-feed --save
```

### 3. Configure Theme

Either edit `themes/ink/_config.yml` directly, or (recommended for Hexo 5+) copy it:

```bash
cp themes/ink/_config.ink.yml _config.ink.yml
```

Then edit `_config.ink.yml` in your site root. Hexo will merge it with the theme defaults.

### 4. Search Setup

Add to your site `_config.yml`:

```yaml
search:
  path: search.xml
  field: post
```

## Configuration Reference

### Navigation

```yaml
menu:
  Home: /
  Archives: /archives
  About: /about
```

### Sidebar

```yaml
sidebar: right          # left / right / false
widgets:
  - recent_posts
  - categories
  - tags
  # - archive
```

### Appearance

```yaml
color_scheme: auto       # light / dark / auto
font:
  size: 16px
  line_height: 1.8
```

### Article Features

```yaml
toc: true                # Table of contents
reading_time: true       # Show reading time
word_count: true         # Show word count
post_navigation: true    # Prev/next links
excerpt_length: 200      # Excerpt characters on index
excerpt_link: true       # Show "Read more"
```

### Comments

```yaml
comments:
  enable: true
  # Pick one:
  disqus_shortname: your-shortname
  # valine:
  #   app_id: xxx
  #   app_key: xxx
  # twikoo:
  #   env_id: xxx
```

### Social Links (Footer)

```yaml
social:
  GitHub: https://github.com/you
  Twitter: https://twitter.com
  Email: mailto:you@example.com
  RSS: /atom.xml
```

### Custom CSS/JS

```yaml
custom_css:
  - /css/custom.css
custom_js:
  - /js/custom.js
```

## Post Front Matter

```yaml
---
title: My Post Title
date: 2024-01-01 12:00:00
updated: 2024-01-02 12:00:00
categories:
  - Tech
tags:
  - hexo
  - blog
cover: /img/cover.jpg      # Optional cover image
toc: true                   # Override global TOC setting
comments: true              # Enable/disable comments
author: Author Name         # Override site author
---
```

## Color Palette

### Light (米白色)

| Token | Hex | Usage |
|-------|-----|-------|
| bg-primary | `#faf8f5` | Page background |
| bg-secondary | `#f5f2ed` | Cards, footer |
| text-primary | `#2c2420` | Body text |
| accent | `#b8860b` | Links, highlights |
| border | `#e8e0d6` | Dividers |

### Dark

| Token | Hex | Usage |
|-------|-----|-------|
| bg-primary | `#1a1814` | Page background |
| bg-secondary | `#242019` | Cards, footer |
| text-primary | `#e8e0d6` | Body text |
| accent | `#d4a017` | Links, highlights |
| border | `#3a342c` | Dividers |

## File Structure

```
theme-ink/
├── _config.yml              # Theme defaults
├── _config.ink.yml          # User config template
├── package.json
├── README.md
├── layout/
│   ├── layout.ejs           # Main layout
│   ├── index.ejs            # Homepage
│   ├── post.ejs             # Article page
│   ├── page.ejs             # Static page
│   ├── archive.ejs          # Archive listing
│   ├── tag.ejs              # Tag listing
│   ├── category.ejs         # Category listing
│   ├── 404.ejs              # Error page
│   └── _partial/            # 12 reusable components
│       ├── head.ejs         # <head> with SEO, dark mode fix
│       ├── header.ejs       # Navigation bar
│       ├── footer.ejs       # Footer with social
│       ├── sidebar.ejs      # Widget sidebar
│       ├── post-header.ejs  # Post title + meta
│       ├── post-meta.ejs    # Date/words/time
│       ├── post-nav.ejs     # Prev/next navigation
│       ├── toc.ejs          # Table of contents
│       ├── pagination.ejs   # Page navigation
│       ├── search-modal.ejs # Search overlay
│       ├── back-to-top.ejs  # Scroll button
│       ├── comments.ejs     # Comment systems
│       └── scripts.ejs      # JS loading
└── source/
    ├── css/
    │   ├── style.css        # Main styles (1800+ lines)
    │   └── highlight.css    # Code syntax themes
    ├── js/
    │   ├── main.js          # Core interactions
    │   └── search.js        # Search engine module
    └── img/
        ├── logo.svg         # Default logo
        └── cover-placeholder.svg
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
