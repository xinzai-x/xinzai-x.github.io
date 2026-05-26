/**
 * Cleartext Theme — Link Card Shortcode
 *
 * Usage:
 *   {% link https://example.com Title Description https://example.com/favicon.ico %}
 *
 * Parameters:
 *   1. URL (required)
 *   2. Title (required)
 *   3. Description (optional, default: "")
 *   4. Icon URL (optional, default: "")
 *
 * Note: Hexo splits arguments by space, not comma. Use spaces for separation.
 *
 * Example:
 *   {% link https://book.aip.sh/01@%e4%b8%bb%e9%a1%b5 使用教程 "" https://book.aip.sh/favicon.ico %}
 */

'use strict';

hexo.extend.tag.register('link', function (args) {
  // Parse arguments (Hexo splits by space)
  var url = args[0] || '';
  var title = args[1] || '';
  var description = '';
  var icon = '';
  
  // Determine what the remaining args are based on count
  // Args can be: [URL, title, description, icon] or [URL, title, icon]
  if (args.length === 3) {
    // args[2] is either description or icon — check if it looks like a URL
    var third = (args[2] || '').trim().replace(/,+$/, '');
    if (third && /^https?:\/\//.test(third)) {
      icon = third;
    } else {
      description = third;
    }
  } else if (args.length >= 4) {
    description = args[2] || '';
    icon = args[3] || '';
  }
  
  // Clean up URL (strip trailing commas and whitespace)
  url = url.trim().replace(/,+$/, '');
  title = title.trim().replace(/,+$/, '');
  description = description.trim().replace(/,+$/, '');
  if (icon) {
    icon = icon.trim().replace(/,+$/, '');
  }
  
  // Handle special cases for empty description
  if (!description || description === '""' || description === "''" || description === ',,') {
    description = '';
  }
  
  // Validate required parameters
  if (!url || !title) {
    return '<div class="link-card link-card-error">Error: URL and title are required for link card.</div>';
  }
  
  // Build the link card HTML
  var html = '<div class="link-card">';
  html += '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="link-card-inner">';
  
  // Icon — always present, with fallback
  html += '<div class="link-card-icon">';
  html += '<svg class="link-card-icon-fallback" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  html += '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>';
  html += '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>';
  html += '</svg>';
  if (icon && icon !== '""' && icon !== "''") {
    html += '<img src="' + icon + '" alt="" onerror="this.style.display=\'none\'" />';
  }
  html += '</div>';
  
  // Content
  html += '<div class="link-card-content">';
  html += '<div class="link-card-title">' + title + '</div>';
  
  if (description) {
    html += '<div class="link-card-description">' + description + '</div>';
  }
  
  html += '<div class="link-card-url">' + url.replace(/^https?:\/\//, '') + '</div>';
  html += '</div>'; // .link-card-content
  
  // External link indicator
  html += '<div class="link-card-arrow">→</div>';
  
  html += '</a>'; // .link-card-inner
  html += '</div>'; // .link-card
  
  return html;
}, false);