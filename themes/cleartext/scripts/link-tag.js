/**
 * Cleartext Theme — Link Card Shortcode
 * Usage: {% link URL Title Description IconURL %}
 */
'use strict';

hexo.extend.tag.register('link', function (args) {
  var url = (args[0] || '').trim().replace(/,+$/, '');
  var title = (args[1] || '').trim().replace(/,+$/, '');
  var description = '';
  var icon = '';

  if (args.length === 3) {
    var third = (args[2] || '').trim().replace(/,+$/, '');
    if (third && /^https?:\/\//.test(third)) { icon = third; }
    else { description = third; }
  } else if (args.length >= 4) {
    description = (args[2] || '').trim().replace(/,+$/, '');
    icon = (args[3] || '').trim().replace(/,+$/, '');
  }

  if (!description || description === '""' || description === "''" || description === ',,') { description = ''; }
  if (!url || !title) { return '<div class="link-card link-card-error">URL 和标题为必填项</div>'; }

  var domain = url.replace(/^https?:\/\//, '').split('/')[0];

  var html = '<div class="link-card">';
  html += '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="link-card-inner">';

  // Icon
  html += '<span class="link-card-icon">';
  if (icon && icon !== '""' && icon !== "''") {
    html += '<img src="' + icon + '" alt="" onerror="this.style.display=\'none\'" />';
  }
  html += '<svg class="link-card-fallback" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  html += '</span>';

  // Content
  html += '<span class="link-card-content">';
  html += '<span class="link-card-title">' + title + '</span>';
  if (description) { html += '<span class="link-card-desc">' + description + '</span>'; }
  html += '<span class="link-card-domain">' + domain + '</span>';
  html += '</span>';

  // Arrow
  html += '<span class="link-card-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>';

  html += '</a></div>';
  return html;
}, false);
