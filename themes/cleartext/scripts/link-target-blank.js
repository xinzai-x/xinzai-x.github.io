/**
 * Cleartext Theme — Link Target Blank
 *
 * After post rendering, add target="_blank" rel="noopener noreferrer"
 * to all links in post content that navigate away from the current page.
 *
 * Excludes:
 *   - Anchor links (href starts with #)
 *   - Links that already have a target attribute
 */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  if (!data.content) return data;

  // Match <a> tags that:
  //   - Do NOT have target= already
  //   - href does NOT start with #
  // We use a careful regex to avoid modifying anchor links
  data.content = data.content.replace(
    /<a\b(?![^>]*\btarget\s*=)(?![^>]*\bhref\s*=\s*["']#)([^>]*)>/gi,
    function (match, attrs) {
      return '<a' + attrs + ' target="_blank" rel="noopener noreferrer">';
    }
  );

  return data;
});