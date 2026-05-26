/**
 * Cleartext Theme — MathJax Injector
 *
 * Ensures MathJax renders content on every page.
 * Injects a small script that tells MathJax to re-process
 * the page after dynamic content loads.
 */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  // Add 'mathjax-process' class to content if it contains math delimiters
  if (data.content && /\$\$|\\\[|\\\(|\$/.test(data.content)) {
    data.content = '<div class="mathjax-process">' + data.content + '</div>';
  }
  return data;
});