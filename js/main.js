// Main JavaScript for Cleartext Theme v4.0 (Optimized �� Single File)
(function() {
  'use strict';

  // Shared utility: HTML entity escaping
  function escHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(new RegExp('[&<>"\']', 'g'), function(c) { return map[c]; });
  }

  /* ============================================================
     1. DOM Ready Initializations
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initCodeBlocks();
    initImages();
    initTables();
    initKeyboardShortcuts();
  });

  /* ============================================================
     2. Header Scroll Effect (simplified)
     ============================================================ */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function updateHeader() {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ============================================================
     3. Code Block Copy Button
     ============================================================ */
  function initCodeBlocks() {
    document.querySelectorAll('figure.highlight').forEach(function(figure) {
      var pre = figure.querySelector('td.code pre') || figure.querySelector('.code pre') || figure.querySelector('pre');
      if (!pre) return;

      // Extract language from figure class (e.g., "highlight javascript" �� "javascript")
      var lang = '';
      var classes = figure.className.split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] !== 'highlight') {
          lang = classes[i];
          break;
        }
      }
      if (!lang) lang = 'code';

      // Create header bar
      var header = document.createElement('div');
      header.className = 'code-block-header';

      var langLabel = document.createElement('span');
      langLabel.className = 'code-lang-label';
      langLabel.textContent = lang;

      var copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.setAttribute('aria-label', '���ƴ���');
      copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> ����';

      copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var lineSpans = pre.querySelectorAll('.line');
        var code;
        if (lineSpans.length > 0) {
          code = Array.from(lineSpans).map(function(span) { return span.textContent; }).join('\n');
        } else {
          code = pre.textContent;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(function() {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> �Ѹ���';
            setTimeout(function() {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> ����';
            }, 2000);
          });
        }
      });

      header.appendChild(langLabel);
      header.appendChild(copyBtn);
      figure.insertBefore(header, figure.firstChild);
    });
  }

  /* ============================================================
     4. Lazy Loading Images
     ============================================================ */
  function initImages() {
    var images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length) return;

    var imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  /* ============================================================
     5. Responsive Tables
     ============================================================ */
  function initTables() {
    document.querySelectorAll('table').forEach(function(table) {
      var wrapper = document.createElement('div');
      wrapper.style.overflowX = 'auto';
      wrapper.style.margin = 'var(--space-6) 0';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  /* ============================================================
     6. Keyboard Shortcuts
     ============================================================ */
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        var searchBtn = document.querySelector('.search-btn');
        if (searchBtn) searchBtn.click();
      }
    });
  }

  /* ============================================================
     7. Smooth Scrolling for Anchor Links
     ============================================================ */
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    var id = link.getAttribute('href').substring(1);
    if (!id) return;
    
    var target = document.getElementById(id);
    if (!target) return;
    
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });


/* ============================================================
   8. Dark Mode Toggle
   ============================================================ */
(function() {
  'use strict';
  var CLASS_DARK = 'dark';
  var html = document.documentElement;
  var btn = document.getElementById('dark-mode-btn');
  var sunIcon = document.getElementById('dm-sun');
  var moonIcon = document.getElementById('dm-moon');

  function getCurrentMode() {
    if (html.classList.contains(CLASS_DARK)) return 'dark';
    return 'light';
  }

  function applyMode(mode) {
    if (mode === 'dark') {
      html.classList.add(CLASS_DARK);
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = '';
      if (btn) btn.setAttribute('aria-label', '�л�����ɫģʽ');
    } else {
      html.classList.remove(CLASS_DARK);
      if (sunIcon) sunIcon.style.display = '';
      if (moonIcon) moonIcon.style.display = 'none';
      if (btn) btn.setAttribute('aria-label', '�л�����ɫģʽ');
    }
    try { localStorage.setItem('cleartext-theme-mode', mode); } catch(e) {}
  }

  // Initialize icon state on page load
  applyMode(getCurrentMode());

  if (btn) {
    btn.addEventListener('click', function() {
      applyMode(getCurrentMode() === 'dark' ? 'light' : 'dark');
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      try {
        var saved = localStorage.getItem('cleartext-theme-mode');
        if (!saved || saved === 'auto') applyMode(e.matches ? 'dark' : 'light');
      } catch(_) {}
    });
  }
})();


/* ============================================================
   9. Mobile Menu Toggle
   ============================================================ */
(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('click', function(e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    toggle.setAttribute('aria-expanded', 'false');
  });
})();


/* ============================================================
   10. Table of Contents (TOC) �� Lazy: runs only on post pages
   ============================================================ */
(function() {
  'use strict';
  var tocDesktop = document.getElementById('toc-desktop');
  var tocMobile = document.getElementById('toc-mobile');
  var postContent = document.querySelector('.post-content');

  if (!postContent || (!tocDesktop && !tocMobile)) return;

  var headings = postContent.querySelectorAll('h1, h2, h3, h4');
  if (headings.length === 0) {
    var dw = document.getElementById('toc-desktop-wrapper');
    var mw = document.getElementById('toc-mobile-wrapper');
    if (mw) { mw.style.display = 'none'; }
    if (dw) { dw.style.display = 'none'; }
    return;
  }

  headings.forEach(function(h) {
    if (!h.id) h.id = 'heading-' + Math.random().toString(36).substr(2, 9);
  });

  function buildTocTree(headings) {
    var root = [];
    var stack = [{ level: 1, children: root }];
    headings.forEach(function(h) {
      var level = parseInt(h.tagName.charAt(1));
      if (level > 4) level = 4; if (level < 2) level = 2;
      var item = { id: h.id, text: h.textContent.trim(), level: level, children: [] };
      while (stack.length > 0 && stack[stack.length - 1].level >= level) stack.pop();
      if (stack.length > 0) { stack[stack.length - 1].children.push(item); } else { root.push(item); }
      stack.push(item);
    });
    return root;
  }


  function renderTocTree(tree) {
    if (!tree || tree.length === 0) return '';
    var html = '<ul class="toc-list">';
    tree.forEach(function(item) {
      html += '<li class="toc-item toc-level-' + item.level + '"><a href="#' + item.id + '">' + escHtml(item.text) + '</a>';
      if (item.children.length > 0) {
        html += '<ul class="toc-sublist">';
        item.children.forEach(function(child) { html += '<li class="toc-item toc-level-' + child.level + '"><a href="#' + child.id + '">' + escHtml(child.text) + '</a></li>'; });
        html += '</ul>';
      }
      html += '</li>';
    });
    html += '</ul>';
    return html;
  }

  var tocHtml = renderTocTree(buildTocTree(headings));
  if (tocDesktop) tocDesktop.innerHTML = tocHtml;
  if (tocMobile) tocMobile.innerHTML = tocHtml;

  var tocLinksDesktop = tocDesktop ? tocDesktop.querySelectorAll('a') : [];
  var tocLinksMobile = tocMobile ? tocMobile.querySelectorAll('a') : [];

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var id = entry.target.getAttribute('id');
        if (!id || !entry.isIntersecting) return;
        [tocLinksDesktop, tocLinksMobile].forEach(function(links) {
          links.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        });
      });
    }, { rootMargin: '-80px 0px -66% 0px', threshold: 0 });
    headings.forEach(function(h) { if (h.id) observer.observe(h); });
  }

  function bindTocClicks(container) {
    if (!container) return;
    container.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;
      var targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var header = document.getElementById('site-header');
      var offset = header ? header.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      history.pushState(null, null, targetId);
      var details = document.getElementById('toc-mobile-details');
      if (details && details.open && window.innerWidth <= 768) details.open = false;
    });
  }
  bindTocClicks(tocDesktop);
  bindTocClicks(tocMobile);
})();


/* ============================================================
   11. Search Engine �� Lazy: loads only when search overlay opens
   ============================================================ */
(function() {
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
  var searchData = null;
  var searchHistory = [];
  var debounceTimer = null;

  if (!overlay || !input || !results) return;

  function loadSearchData() {
    if (searchData) return Promise.resolve(searchData);
    return fetch(SEARCH_DATA_URL)
      .then(function(res) { return res.text(); })
      .then(function(xml) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, 'application/xml');
        var items = doc.querySelectorAll('entry');
        searchData = Array.from(items).map(function(item) {
          return {
            title: item.querySelector('title').textContent,
            url: item.querySelector('url').textContent,
            content: item.querySelector('content').textContent,
            categories: Array.from(item.querySelectorAll('categories')).map(function(c) { return c.textContent; }),
            tags: Array.from(item.querySelectorAll('tags')).map(function(t) { return t.textContent; }),
            date: item.querySelector('date') ? item.querySelector('date').textContent : ''
          };
        });
        return searchData;
      })
      .catch(function(e) { console.warn('Search data unavailable', e); return []; });
  }

  function loadHistory() {
    try { var saved = localStorage.getItem(HISTORY_KEY); if (saved) searchHistory = JSON.parse(saved); } catch(e) {}
    renderHistory();
  }

  function saveHistory(query) {
    if (!query.trim()) return;
    searchHistory = searchHistory.filter(function(q) { return q !== query; });
    searchHistory.unshift(query);
    if (searchHistory.length > HISTORY_MAX) searchHistory.pop();
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory)); } catch(e) {}
    renderHistory();
  }

  function renderHistory() {
    if (!historyContainer || searchHistory.length === 0) {
      if (historyContainer) historyContainer.style.display = 'none';
      return;
    }
    historyContainer.style.display = 'block';
    var html = '<div class="search-history-title">�������</div><ul class="search-history-list">';
    searchHistory.forEach(function(query) {
      html += '<li class="search-history-item"><button class="history-query" data-query="' + escHtml(query) + '">' + escHtml(query) + '</button></li>';
    });
    html += '<li><button class="search-history-clear" id="clear-history">���</button></li></ul>';
    historyContainer.innerHTML = html;

    historyContainer.querySelectorAll('.history-query').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var query = this.getAttribute('data-query');
        input.value = query;
        performSearch(query);
      });
    });

    var clearBtn = document.getElementById('clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        searchHistory = [];
        try { localStorage.removeItem(HISTORY_KEY); } catch(e) {}
        historyContainer.style.display = 'none';
      });
    }
  }

  function performSearch(query) {
    if (!searchData) return;
    var terms = query.toLowerCase().split(/\s+/).filter(function(t) { return t.length > 0; });
    if (terms.length === 0) { showNoResults(); return; }

    var matches = searchData.map(function(item) {
      var score = 0;
      var title = item.title.toLowerCase();
      var content = item.content.toLowerCase();
      var categories = item.categories.join(' ').toLowerCase();
      var tags = item.tags.join(' ').toLowerCase();
      terms.forEach(function(term) {
        if (title.includes(term)) score += 10;
        if (content.includes(term)) score += 5;
        if (categories.includes(term)) score += 8;
        if (tags.includes(term)) score += 8;
      });
      return { item: item, score: score };
    }).filter(function(r) { return r.score > 0; })
      .sort(function(a, b) { return b.score - a.score; });

    renderResults(matches, query);
  }

  function highlight(text, query) {
    var terms = query.toLowerCase().split(/\s+/);
    var regex = new RegExp('(' + terms.filter(function(t) { return t.length > 1; }).join('|') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function renderResults(matches, query) {
    if (matches.length === 0) { showNoResults(); return; }
    var html = '<div class="search-results-count">�ҵ� ' + matches.length + ' �����</div><ul class="search-results-list">';
    matches.forEach(function(match) {
      var item = match.item;
      var title = highlight(item.title, query);
      var snippet = item.content.substring(0, 200).replace(/<[^>]+>/g, '');
      snippet = highlight(snippet, query) + '...';
      html += '<li><a href="' + item.url + '" class="search-result-link">' +
        '<div class="search-result-title">' + title + '</div>' +
        '<div class="search-result-snippet">' + snippet + '</div>' +
        '<div class="search-result-meta">';
      if (item.categories.length > 0) {
        html += '<span class="search-result-categories">' +
          item.categories.map(function(c) { return '<span class="tag">' + escHtml(c) + '</span>'; }).join('') +
          '</span>';
      }
      if (item.tags.length > 0) {
        html += '<span class="search-result-tags">' +
          item.tags.map(function(t) { return '<span class="tag">' + escHtml(t) + '</span>'; }).join('') +
          '</span>';
      }
      html += '</div></a></li>';
    });
    html += '</ul>';
    results.innerHTML = html;
  }

  function showNoResults() {
    results.innerHTML = '<div class="search-no-results">û���ҵ�������£����������ؼ��ʡ�</div>';
  }

  function showHint() {
    results.innerHTML = '<div class="search-hint">����ؼ����������±��������</div>';
  }

  function openSearch() {
    overlay.classList.add('active');
    document.body.classList.add('search-open');
    input.focus();
    showHint();
    loadHistory();
  }

  function closeSearch() {
    overlay.classList.remove('active');
    document.body.classList.remove('search-open');
    input.value = '';
    results.innerHTML = '';
  }

  function onInput() {
    clearTimeout(debounceTimer);
    var query = input.value.trim();
    if (query.length === 0) { showHint(); return; }
    debounceTimer = setTimeout(function() { performSearch(query); }, DEBOUNCE_DELAY);
  }

  function onKeydown(e) {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  }


  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeSearch(); });
  input.addEventListener('input', onInput);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var query = input.value.trim();
      if (query) saveHistory(query);
    }
  });
  document.addEventListener('keydown', onKeydown);

  overlay.addEventListener('transitionend', function() {
    if (overlay.classList.contains('active') && !searchData) loadSearchData();
  }, { once: true });
  // Fallback: load data on first open even if transitionend is unreliable
  var _dataLoaded = false;
  var _origOpenSearch = openSearch;
  openSearch = function() {
    _origOpenSearch();
    if (!_dataLoaded) { _dataLoaded = true; loadSearchData(); }
  };
})();

/* ============================================================
   12. Back-to-top & Back-to-bottom
   ============================================================ */
(function() {
  'use strict';
  var btnTop = document.getElementById('back-to-top');
  var btnBottom = document.getElementById('back-to-bottom');

  if (!btnTop || !btnBottom) return;

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    var docH = document.documentElement.scrollHeight;
    var winH = window.innerHeight;
    var nearBottom = (scrollY + winH >= docH - 200);
    var shouldShow = scrollY > 400 && !nearBottom;

    if (shouldShow) {
      btnTop.classList.add('visible');
      btnBottom.classList.add('visible');
    } else {
      btnTop.classList.remove('visible');
      btnBottom.classList.remove('visible');
    }
  }

  btnTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnBottom.addEventListener('click', function() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  })();


/* ============================================================
   12b. Image Lightbox Initialization
   ============================================================ */
(function() {
  initImageLightbox();
})();

  /* ============================================================
     13. IMAGE LIGHTBOX
     ============================================================ */
  function initImageLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (!lightbox) return;

    // Collect all post images (excluding lightbox image itself)
    const postImages = Array.from(document.querySelectorAll('.post-content img')).filter(img => !img.closest('#lightbox'));
    let currentIndex = 0;

    function updateLightbox() {
      if (postImages.length === 0) return;
      const img = postImages[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '����ͼƬ';
      lightboxCounter.textContent = `${currentIndex + 1} / ${postImages.length}`;
    }

    function openLightbox(index) {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function goPrev() {
      if (postImages.length === 0) return;
      currentIndex = (currentIndex - 1 + postImages.length) % postImages.length;
      updateLightbox();
    }

    function goNext() {
      if (postImages.length === 0) return;
      currentIndex = (currentIndex + 1) % postImages.length;
      updateLightbox();
    }

    // Bind events to post images
    postImages.forEach((img, index) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(index));
    });

    // Bind lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', goPrev);
    lightboxNext.addEventListener('click', goNext);

    // Close on overlay click (outside image)
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      switch (e.key) {
        case 'Escape': closeLightbox(); break;
        case 'ArrowLeft': goPrev(); break;
        case 'ArrowRight': goNext(); break;
      }
    });

    // Prevent scrolling while lightbox is open
    lightbox.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  }
})();