/**
 * Hexo Theme - Ink
 * Local Search Engine
 * Requires: hexo-generator-search plugin
 */

(function() {
  'use strict';

  var searchData = null;
  var searchIndex = null;
  var isLoaded = false;
  var isLoading = false;

  /**
   * Load and parse search.xml
   */
  function loadSearchData(callback) {
    if (isLoaded) {
      callback(searchData);
      return;
    }
    if (isLoading) {
      // Wait for existing load
      var check = setInterval(function() {
        if (isLoaded) {
          clearInterval(check);
          callback(searchData);
        }
      }, 50);
      return;
    }

    isLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.searchPath || '/search.xml', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        isLoading = false;
        if (xhr.status === 200) {
          searchData = parseSearchXML(xhr.responseText);
          buildIndex(searchData);
          isLoaded = true;
          callback(searchData);
        } else {
          console.warn('[Ink Search] Failed to load search.xml:', xhr.status);
          callback([]);
        }
      }
    };
    xhr.send();
  }

  /**
   * Parse search XML into array of objects
   */
  function parseSearchXML(xmlText) {
    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlText, 'text/xml');
    var entries = xml.querySelectorAll('entry');
    var results = [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var title = getTextContent(entry, 'title');
      var content = getTextContent(entry, 'content');
      var link = getLinkHref(entry);
      var categories = getCategories(entry);

      if (title || content) {
        results.push({
          title: title,
          content: content,
          link: link,
          categories: categories
        });
      }
    }

    return results;
  }

  function getTextContent(parent, tag) {
    var el = parent.querySelector(tag);
    return el ? el.textContent : '';
  }

  function getLinkHref(entry) {
    var link = entry.querySelector('link');
    return link ? (link.getAttribute('href') || link.textContent || '') : '';
  }

  function getCategories(entry) {
    var cats = entry.querySelectorAll('category');
    var result = [];
    for (var i = 0; i < cats.length; i++) {
      result.push(cats[i].textContent);
    }
    return result;
  }

  /**
   * Build simple search index for faster lookups
   */
  function buildIndex(data) {
    searchIndex = data.map(function(item) {
      return {
        title: item.title.toLowerCase(),
        content: item.content.toLowerCase(),
        link: item.link,
        titleOriginal: item.title,
        contentOriginal: item.content,
        categories: item.categories
      };
    });
  }

  /**
   * Search with scoring
   */
  function search(query) {
    if (!searchIndex || !query) return [];

    var queryLower = query.toLowerCase();
    var queryTerms = queryLower.split(/\s+/).filter(function(t) { return t.length > 0; });
    var results = [];

    for (var i = 0; i < searchIndex.length; i++) {
      var item = searchIndex[i];
      var score = 0;
      var matchedTerms = 0;

      for (var j = 0; j < queryTerms.length; j++) {
        var term = queryTerms[j];

        // Title match (higher weight)
        if (item.title.indexOf(term) !== -1) {
          score += 10;
          matchedTerms++;
          // Exact title match bonus
          if (item.title === queryLower) score += 20;
        }

        // Content match
        if (item.content.indexOf(term) !== -1) {
          score += 3;
          matchedTerms++;
        }
      }

      // All terms must match at least once
      if (matchedTerms >= queryTerms.length && score > 0) {
        results.push({
          title: item.titleOriginal,
          link: item.link,
          excerpt: buildExcerpt(item.contentOriginal, queryTerms),
          score: score
        });
      }
    }

    // Sort by score descending
    results.sort(function(a, b) { return b.score - a.score; });

    return results;
  }

  /**
   * Strip HTML tags and decode entities to plain text
   */
  function stripHtml(html) {
    if (!html) return '';
    // Remove script/style blocks entirely
    var text = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
    // Remove markdown-it anchor links and their text (e.g. <a class="header-anchor">)
    text = text.replace(/<a[^>]*class="[^"]*(?:header-anchor|markdownIt-Anchor)[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
    // Drop all remaining tags
    text = text.replace(/<[^>]+>/g, '');
    // Decode common HTML entities
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#x27;/g, "'")
               .replace(/&#39;/g, "'")
               .replace(/&hellip;/g, '…');
    // Collapse whitespace
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Build excerpt with context around match
   */
  function buildExcerpt(content, terms) {
    // Clean HTML first so excerpts are pure text
    content = stripHtml(content);
    if (!content) return '';

    var bestIdx = -1;
    var bestTerm = '';

    // Find first matching term position
    for (var i = 0; i < terms.length; i++) {
      var idx = content.toLowerCase().indexOf(terms[i]);
      if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
        bestIdx = idx;
        bestTerm = terms[i];
      }
    }

    if (bestIdx === -1) {
      return content.substring(0, 120) + (content.length > 120 ? '...' : '');
    }

    var start = Math.max(0, bestIdx - 60);
    var end = Math.min(content.length, bestIdx + bestTerm.length + 60);
    var excerpt = '';

    if (start > 0) excerpt += '...';
    excerpt += content.substring(start, end);
    if (end < content.length) excerpt += '...';

    return excerpt;
  }

  /**
   * Highlight query terms in text
   */
  function highlight(text, query) {
    if (!query || !text) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var terms = escaped.split(/\s+/).filter(function(t) { return t.length > 0; });
    if (terms.length === 0) return text;

    var regex = new RegExp('(' + terms.join('|') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Public API
   */
  window.InkSearch = {
    load: loadSearchData,
    search: search,
    highlight: highlight
  };
})();
