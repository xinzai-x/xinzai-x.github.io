/**
 * Cleartext Theme ?Search XML Generator
 * Generates search.xml for client-side search with categories & tags
 */
'use strict';

hexo.extend.generator.register('search-xml', function (locals) {
  var posts = locals.posts.sort('-date');
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<search>\n';

  posts.each(function (post) {
    var esc = function (s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };

    var title = esc(post.title);
    var url = hexo.config.root + post.path;

    // Strip HTML/Markdown to get plain text content
    var content = post.content
      .replace(/<[^>]+>/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    // Summary: first 300 chars of plain text
    var summary = content.substring(0, 300);

    // Categories
    var categories = '';
    if (post.categories && post.categories.length) {
      categories = post.categories.map(function (c) { return c.name; }).join(', ');
    }

    // Tags
    var tags = '';
    if (post.tags && post.tags.length) {
      tags = post.tags.map(function (t) { return t.name; }).join(', ');
    }

    var date = post.date.format('YYYY-MM-DD');
    var updated = post.updated ? post.updated.format('YYYY-MM-DD') : '';

    xml += '  <entry>\n';
    xml += '    <title>' + esc(title) + '</title>\n';
    xml += '    <url>' + esc(url) + '</url>\n';
    xml += '    <content>' + esc(content) + '</content>\n';
    xml += '    <summary>' + esc(summary) + '</summary>\n';
    xml += '    <date>' + date + '</date>\n';
    xml += '    <updated>' + updated + '</updated>\n';
    xml += '    <categories>' + esc(categories) + '</categories>\n';
    xml += '    <tags>' + esc(tags) + '</tags>\n';
    xml += '  </entry>\n';
  });

  xml += '</search>\n';

  return {
    path: 'search.xml',
    data: xml
  };
});