/**
 * Fix: Hexo 7.3.0 _generateLocals().Locals only sets `page`, not `post`.
 * This causes post.ejs templates that reference `post.xxx` to crash silently,
 * producing 0-byte output files.
 *
 * This filter ensures `locals.post` is available for all pages.
 */
hexo.extend.filter.register('template_locals', function (locals) {
  if (!locals.post && locals.page) {
    locals.post = locals.page;
  }
  return locals;
}, 5); // Priority 5, runs before i18n filter (priority 10)

/**
 * Fix: Ensure site variable is available for helper pages (categories, tags)
 * in Hexo 7.3.0.
 */
hexo.extend.filter.register('template_locals', function (locals) {
  if (typeof locals.site === 'undefined') {
    locals.site = hexo.locals.toObject();
  }
  return locals;
}, 1);