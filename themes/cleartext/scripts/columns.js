/**
 * Cleartext Theme ?Columns Shortcode
 *
 * Usage:
 *   {% columns %}          ?2 equal columns (default)
 *   {% columns 3 %}        ?3 equal columns
 *   {% columns 2-1 %}      ?2 columns, left wider (2:1 ratio)
 *   {% columns 1-2 %}      ?2 columns, right wider (1:2 ratio)
 *
 *   {% column %}
 *     Content for this column...
 *   {% endcolumn %}
 *
 *   {% endcolumns %}
 *
 * Example:
 *   {% columns %}
 *   {% column %}
 *   Left column content with **markdown**.
 *   {% endcolumn %}
 *   {% column %}
 *   Right column content.
 *   {% endcolumn %}
 *   {% endcolumns %}
 */

'use strict';

hexo.extend.tag.register('columns', function (args, content) {
  var count = 2; // default: 2 columns
  var modeClass = 'cols-2';

  if (args.length > 0) {
    if (args[0] === '3') {
      count = 3;
      modeClass = 'cols-3';
    } else if (args[0] === '2-1') {
      count = 2;
      modeClass = 'cols-2 col-2-1';
    } else if (args[0] === '1-2') {
      count = 2;
      modeClass = 'cols-2 col-1-2';
    }
  }

  var result = '<div class="columns ' + modeClass + '">' + content + '</div>';

  return result;
}, { ends: true });

hexo.extend.tag.register('column', function (args, content) {
  return '<div class="column">' + content + '</div>';
}, { ends: true });