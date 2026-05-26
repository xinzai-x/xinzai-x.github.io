'use strict';

/**
 * Auto-route pages to layout templates based on source path.
 * This allows about/index.md and link/index.md to use the
 * dedicated about.ejs / links.ejs templates without requiring
 * a `layout` field in the front-matter.
 */
hexo.extend.filter.register('before_post_render', function(data) {
  const source = data.source || '';

  if (source.endsWith('about/index.md')) {
    data.layout = 'about';
  } else if (source.endsWith('link/index.md') || source.endsWith('links/index.md')) {
    data.layout = 'links';
  }

  return data;
});