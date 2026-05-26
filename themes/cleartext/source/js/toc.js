/**
 * Cleartext Theme v3.0 — Table of Contents
 * Generates TOC from h2-h4 headings with IntersectionObserver scroll spy
 */
(function () {
  'use strict';

  var tocDesktop = document.getElementById('toc-desktop');
  var tocMobile = document.getElementById('toc-mobile');
  var tocDesktopWrapper = document.getElementById('toc-desktop-wrapper');
  var tocMobileWrapper = document.getElementById('toc-mobile-wrapper');
  var postContent = document.querySelector('.post-content');

  if (!postContent) return;
  if (!tocDesktop && !tocMobile) return;

  var headings = postContent.querySelectorAll('h2, h3, h4');
  if (headings.length === 0) {
    if (tocMobileWrapper) {
      tocMobileWrapper.style.display = 'none';
      tocMobileWrapper.style.visibility = 'hidden';
    }
    if (tocDesktopWrapper) {
      tocDesktopWrapper.style.display = 'none';
      tocDesktopWrapper.style.visibility = 'hidden';
    }
    return;
  }

  /* Generate IDs for headings that lack them */
  headings.forEach(function(h) {
    if (!h.id) {
      h.id = 'heading-' + Math.random().toString(36).substr(2, 9);
    }
  });

  /* Build TOC */
  var tocTree = buildTocTree(headings);
  var tocHtml = renderTocTree(tocTree);

  if (tocDesktop) tocDesktop.innerHTML = tocHtml;
  if (tocMobile) tocMobile.innerHTML = tocHtml;

  /* Scroll spy with IntersectionObserver */
  var tocLinksDesktop = tocDesktop ? tocDesktop.querySelectorAll('a') : [];
  var tocLinksMobile = tocMobile ? tocMobile.querySelectorAll('a') : [];

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        if (!id) return;
        if (entry.isIntersecting) {
          highlightTocLink(tocLinksDesktop, id);
          highlightTocLink(tocLinksMobile, id);
        }
      });
    }, { rootMargin: '-80px 0px -66% 0px', threshold: 0 });

    headings.forEach(function (h) {
      if (h.id) observer.observe(h);
    });
  }

  /* TOC link click — smooth scroll with offset */
  function bindTocClicks(container) {
    if (!container) return;
    container.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      var headerHeight = document.getElementById('site-header');
      var offset = headerHeight ? headerHeight.offsetHeight + 16 : 80;

      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      /* Close mobile TOC if open */
      var details = document.getElementById('toc-mobile-details');
      if (details && details.open && window.innerWidth <= 768) {
        details.open = false;
      }

      /* Update URL hash */
      history.pushState(null, null, targetId);
    });
  }

  bindTocClicks(tocDesktop);
  bindTocClicks(tocMobile);

  /* Auto-collapse mobile TOC after selecting on mobile */
  if (tocMobile) {
    tocMobile.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      if (window.innerWidth <= 768) {
        var details = document.getElementById('toc-mobile-details');
        if (details) {
          setTimeout(function () { details.open = false; }, 300);
        }
      }
    });
  }

  /* ============================================================
     Helper: Build TOC Tree
     ============================================================ */
  function buildTocTree(headings) {
    var root = [];
    var stack = [{ level: 1, children: root }];

    headings.forEach(function (h) {
      var level = parseInt(h.tagName.charAt(1));
      var item = { id: h.id, text: h.textContent.trim(), level: level, children: [] };

      /* Ensure level is between 2 and 4 */
      if (level > 4) level = 4;
      if (level < 2) level = 2;

      /* Find parent */
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      if (stack.length > 0) {
        stack[stack.length - 1].children.push(item);
      } else {
        root.push(item);
      }
      stack.push(item);
    });

    return root;
  }

  /* ============================================================
     Helper: Render TOC Tree to HTML
     ============================================================ */
  function renderTocTree(tree) {
    if (!tree || tree.length === 0) return '';
    var html = '<ul class="toc-list">';
    tree.forEach(function (item) {
      html += '<li class="toc-item toc-level-' + item.level + '">';
      html += '<a href="#' + item.id + '">' + escapeHtml(item.text) + '</a>';
      if (item.children.length > 0) {
        html += '<ul class="toc-sublist">';
        item.children.forEach(function (child) {
          html += renderTocItem(child);
        });
        html += '</ul>';
      }
      html += '</li>';
    });
    html += '</ul>';
    return html;
  }

  function renderTocItem(item) {
    var html = '<li class="toc-item toc-level-' + item.level + '">';
    html += '<a href="#' + item.id + '">' + escapeHtml(item.text) + '</a>';
    if (item.children.length > 0) {
      html += '<ul class="toc-sublist">';
      item.children.forEach(function (child) {
        html += renderTocItem(child);
      });
      html += '</ul>';
    }
    html += '</li>';
    return html;
  }

  /* ============================================================
     Helper: Highlight active TOC link
     ============================================================ */
  function highlightTocLink(links, id) {
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ============================================================
     Helper: Escape HTML
     ============================================================ */
  function escapeHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (c) { return map[c]; });
  }
})();
