/**
 * Cleartext Theme v3.0 — Search Engine
 * Loads search.xml, tokenizes, fuzzy matches, history, keyboard shortcuts
 */
(function () {
  'use strict';

  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var closeBtn = document.getElementById('search-close');
  var searchBtn = document.getElementById('search-btn');
  var historyContainer = document.getElementById('search-history');

  var SEARCH_DATA_URL = (overlay && overlay.getAttribute('data-search-url')) || '/search.xml';
  var HISTORY_KEY = 'cleartext-search-history';
  var HISTORY_MAX = 10;
  var DEBOUNCE_DELAY = 300;

  if (!overlay || !input || !results) return;

  var searchData = null;
  var searchHistory = [];
  var debounceTimer = null;

  /* Load search data */
  function loadSearchData() {
    if (searchData) return Promise.resolve(searchData);
    return fetch(SEARCH_DATA_URL)
      .then(function (res) { return res.text(); })
      .then(function (xml) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, 'application/xml');
        var items = doc.querySelectorAll('entry');
        searchData = Array.from(items).map(function (item) {
          return {
            title: item.querySelector('title').textContent,
            url: item.querySelector('url').textContent,
            content: item.querySelector('content').textContent,
            categories: Array.from(item.querySelectorAll('categories')).map(function (c) { return c.textContent; }),
            tags: Array.from(item.querySelectorAll('tags')).map(function (t) { return t.textContent; }),
            date: item.querySelector('date') ? item.querySelector('date').textContent : ''
          };
        });
        return searchData;
      })
      .catch(function (e) {
        console.error('Failed to load search data', e);
        return [];
      });
  }

  /* Load search history */
  function loadHistory() {
    try {
      var saved = localStorage.getItem(HISTORY_KEY);
      if (saved) searchHistory = JSON.parse(saved);
    } catch (e) { /* ignore */ }
    renderHistory();
  }

  /* Save search history */
  function saveHistory(query) {
    if (!query.trim()) return;
    searchHistory = searchHistory.filter(function (q) { return q !== query; });
    searchHistory.unshift(query);
    if (searchHistory.length > HISTORY_MAX) searchHistory.pop();
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    } catch (e) { /* ignore */ }
    renderHistory();
  }

  /* Render history */
  function renderHistory() {
    if (!historyContainer || searchHistory.length === 0) {
      if (historyContainer) historyContainer.style.display = 'none';
      return;
    }
    historyContainer.style.display = 'block';
    var html = '<div class="search-history-title">最近搜索</div><ul class="search-history-list">';
    searchHistory.forEach(function (query) {
      html += '<li class="search-history-item">' +
        '<button class="history-query" data-query="' + escapeHtml(query) + '">' + escapeHtml(query) + '</button>' +
        '</li>';
    });
    html += '<li><button class="search-history-clear" id="clear-history">清除</button></li>';
    html += '</ul>';
    historyContainer.innerHTML = html;

    /* Bind history query clicks */
    historyContainer.querySelectorAll('.history-query').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var query = this.getAttribute('data-query');
        input.value = query;
        performSearch(query);
      });
    });

    /* Clear history */
    var clearBtn = document.getElementById('clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchHistory = [];
        try { localStorage.removeItem(HISTORY_KEY); } catch (e) {}
        historyContainer.style.display = 'none';
      });
    }
  }

  /* Search function */
  function performSearch(query) {
    if (!searchData) return;
    var terms = query.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 0; });
    if (terms.length === 0) {
      showNoResults();
      return;
    }

    var matches = searchData.map(function (item) {
      var score = 0;
      var title = item.title.toLowerCase();
      var content = item.content.toLowerCase();
      var categories = item.categories.join(' ').toLowerCase();
      var tags = item.tags.join(' ').toLowerCase();

      terms.forEach(function (term) {
        if (title.includes(term)) score += 10;
        if (content.includes(term)) score += 5;
        if (categories.includes(term)) score += 8;
        if (tags.includes(term)) score += 8;
      });

      return { item: item, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; });

    renderResults(matches, query);
  }

  /* Highlight matches */
  function highlight(text, query) {
    var terms = query.toLowerCase().split(/\s+/);
    var regex = new RegExp('(' + terms.filter(function (t) { return t.length > 1; }).join('|') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /* Render results */
  function renderResults(matches, query) {
    if (matches.length === 0) {
      showNoResults();
      return;
    }

    var html = '<div class="search-results-count">找到 ' + matches.length + ' 个结果</div><ul class="search-results-list">';
    matches.forEach(function (match) {
      var item = match.item;
      var title = highlight(item.title, query);
      var snippet = item.content.substring(0, 200).replace(/<[^>]+>/g, '');
      snippet = highlight(snippet, query) + '...';

      html += '<li>' +
        '<a href="' + item.url + '" class="search-result-link">' +
        '<div class="search-result-title">' + title + '</div>' +
        '<div class="search-result-snippet">' + snippet + '</div>' +
        '<div class="search-result-meta">';
      if (item.categories.length > 0) {
        html += '<span class="search-result-categories">' +
          item.categories.map(function (c) { return '<span class="tag">' + escapeHtml(c) + '</span>'; }).join('') +
          '</span>';
      }
      if (item.tags.length > 0) {
        html += '<span class="search-result-tags">' +
          item.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join('') +
          '</span>';
      }
      html += '</div></a></li>';
    });
    html += '</ul>';
    results.innerHTML = html;
  }

  /* Show no results */
  function showNoResults() {
    results.innerHTML = '<div class="search-no-results">没有找到相关文章，试试其他关键词。</div>';
  }

  /* Show hint */
  function showHint() {
    results.innerHTML = '<div class="search-hint">输入关键词搜索文章标题和内容</div>';
  }

  /* Open search */
  function openSearch() {
    overlay.classList.add('active');
    document.body.classList.add('search-open');
    input.focus();
    showHint();
    loadHistory();
  }

  /* Close search */
  function closeSearch() {
    overlay.classList.remove('active');
    document.body.classList.remove('search-open');
    input.value = '';
    results.innerHTML = '';
  }

  /* Debounced search */
  function onInput() {
    clearTimeout(debounceTimer);
    var query = input.value.trim();
    if (query.length === 0) {
      showHint();
      return;
    }
    debounceTimer = setTimeout(function () {
      performSearch(query);
    }, DEBOUNCE_DELAY);
  }

  /* Keyboard shortcuts */
  function onKeydown(e) {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  }

  /* Escape HTML */
  function escapeHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (c) { return map[c]; });
  }

  /* Event bindings */
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });
  input.addEventListener('input', onInput);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var query = input.value.trim();
      if (query) saveHistory(query);
    }
  });
  document.addEventListener('keydown', onKeydown);

  /* Load data on first open */
  overlay.addEventListener('transitionend', function () {
    if (overlay.classList.contains('active') && !searchData) {
      loadSearchData();
    }
  }, { once: true });

  /* Initial load */
  loadSearchData();
})();
