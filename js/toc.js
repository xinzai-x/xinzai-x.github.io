/**
 * Cleartext Theme — Table of Contents (TOC)
 * Generates TOC from headings, supports scroll highlighting
 */
(function () {
  'use strict';

  var MAX_DEPTH = 3; // h2, h3, h4
  var tocDesktop = document.getElementById('toc-desktop');
  var tocMobile = document.getElementById('toc-mobile-nav');
  var tocMobileToggle = document.querySelector('#toc-mobile summary');
  var postContent = document.querySelector('.post-content');

  if (!postContent || (!tocDesktop && !tocMobile)) return;

  // Collect headings
  var headings = postContent.querySelectorAll('h2, h3, h4');
  if (headings.length < 2) {
    if (tocDesktop) tocDesktop.style.display = 'none';
    if (tocMobile) tocMobile.parentElement.style.display = 'none';
    return;
  }

  var tocItems = [];

  headings.forEach(function (h, idx) {
    var level = parseInt(h.tagName[1]);
    if (level > MAX_DEPTH + 1) return;

    // Ensure heading has an ID
    var id = h.id;
    if (!id) {
      id = 'heading-' + idx;
      h.id = id;
    }

    tocItems.push({
      id: id,
      text: h.textContent,
      level: level,
      element: h
    });
  });

  // Build TOC HTML
  function buildTocHTML() {
    var html = '<ul class="toc-list">';
    var lastLevel = 2;

    tocItems.forEach(function (item) {
      var level = item.level;
      var diff = level - lastLevel;

      if (diff > 0) {
        for (var i = 0; i < diff; i++) html += '<ul class="toc-sublist">';
      } else if (diff < 0) {
        for (var i = 0; i < -diff; i++) html += '</ul>';
      }

      html += '<li class="toc-item toc-level-' + level + '">' +
        '<a href="#' + item.id + '" class="toc-link" data-id="' + item.id + '">' + item.text + '</a>' +
        '</li>';

      lastLevel = level;
    });

    // Close remaining lists
    while (lastLevel > 2) {
      html += '</ul>';
      lastLevel--;
    }

    html += '</ul>';
    return html;
  }

  var tocHTML = buildTocHTML();

  // Insert into both TOCs
  if (tocDesktop) tocDesktop.innerHTML = tocHTML;
  if (tocMobile) tocMobile.innerHTML = tocHTML;

  // Scroll highlighting
  var tocLinks = document.querySelectorAll('.toc-link');
  var observer;

  function setActiveLink(id) {
    tocLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-id') === id) {
        link.classList.add('active');
      }
    });
  }

  function initIntersectionObserver() {
    var options = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, options);

    tocItems.forEach(function (item) {
      observer.observe(item.element);
    });
  }

  // Smooth scroll for TOC links
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile TOC if open
        if (tocMobile && tocMobile.parentElement.hasAttribute('open')) {
          tocMobile.parentElement.removeAttribute('open');
        }
      }
    });
  });

  // Initialize
  if (window.IntersectionObserver) {
    initIntersectionObserver();
  } else {
    // Fallback: highlight on scroll
    window.addEventListener('scroll', function () {
      var current = null;
      tocItems.forEach(function (item) {
        var rect = item.element.getBoundingClientRect();
        if (rect.top <= 100) {
          current = item.id;
        }
      });
      if (current) setActiveLink(current);
    });
  }
})();