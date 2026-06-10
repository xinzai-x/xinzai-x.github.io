/**
 * Sticky Posts for Cleartext Theme
 * Sorts posts by 	op field (true/false), then by date descending.
 * Sticky posts appear first on homepage, category pages, etc.
 *
 * Priority:
 *  1. top: true posts (sorted by date, newest first)
 *  2. top: false / undefined posts (sorted by date, newest first)
 */
'use strict';

hexo.extend.filter.register('template_locals', function (locals) {
  var posts = locals.site.posts;
  if (!posts || posts.__stickyPatched) return locals;

  var originalSort = posts.sort.bind(posts);
  posts.sort = function () {
    var result = originalSort.apply(posts, arguments);
    if (!result || !result.sort) return result;
    return result.sort(function (a, b) {
      var topA = (a.top === true || a.top === 'true') ? 1 : 0;
      var topB = (b.top === true || b.top === 'true') ? 1 : 0;
      if (topA !== topB) return topB - topA;
      return b.date - a.date;
    });
  };
  posts.__stickyPatched = true;
  return locals;
}, 20);
