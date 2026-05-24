/**
 * Cleartext Theme v3.0 — Main Script
 * Enterprise-grade: scroll effects, lazy images, lightbox, code copy, ripple, Giscus load
 */
(function () {
  'use strict';

  /* ============================================================
     1. SCROLL HEADER EFFECT
     ============================================================ */
  var header = document.getElementById('site-header');
  var SCROLL_THRESHOLD = 50;
  var ticking = false;

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();

  /* ============================================================
     2. IMAGE LAZY LOADING
     ============================================================ */
  var lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  var activeObserver = false;

  if ('IntersectionObserver' in window) {
    var lazyImageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add('loaded');
          lazyImageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach(function (img) {
      lazyImageObserver.observe(img);
    });
    activeObserver = true;
  } else {
    lazyImages.forEach(function (img) {
      img.classList.add('loaded');
    });
  }

  /* ============================================================
     3. IMAGE LIGHTBOX
     ============================================================ */
  var lightboxOverlay = null;

  function createLightbox() {
    if (lightboxOverlay) return lightboxOverlay;
    lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    lightboxOverlay.setAttribute('role', 'dialog');
    lightboxOverlay.setAttribute('aria-label', '图片放大预览');
    lightboxOverlay.innerHTML =
      '<div class="lightbox-bg"></div>' +
      '<img class="lightbox-image" src="" alt="" />' +
      '<button class="lightbox-close" aria-label="关闭预览">&times;</button>';
    document.body.appendChild(lightboxOverlay);

    /* Click to close */
    lightboxOverlay.addEventListener('click', closeLightbox);
    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('open')) {
        closeLightbox();
      }
    });
    return lightboxOverlay;
  }

  function openLightbox(src, alt) {
    var lb = createLightbox();
    var img = lb.querySelector('.lightbox-image');
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* Bind lightbox to post content images */
  function bindLightbox() {
    var postContent = document.querySelector('.post-content');
    if (!postContent) return;
    postContent.addEventListener('click', function (e) {
      var img = e.target.closest('img');
      if (!img || img.closest('a')) return;
      /* Exclude inline/small images */
      if (img.naturalWidth < 100 || img.naturalHeight < 100) return;
      openLightbox(img.src, img.alt);
    });
  }

  bindLightbox();

  /* ============================================================
     4. EXTERNAL LINKS — New Tab
     ============================================================ */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  /* ============================================================
     5. CODE BLOCK COPY BUTTON
     ============================================================ */
  function initCodeCopy() {
    var pres = document.querySelectorAll('.post-content pre');
    pres.forEach(function (pre) {
      if (pre.closest('.code-block-wrapper')) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      var header = document.createElement('div');
      header.className = 'code-block-header';

      var langLabel = document.createElement('span');
      langLabel.className = 'code-lang-label';
      var code = pre.querySelector('code');
      var lang = pre.className.match(/language-(\w+)/);
      langLabel.textContent = (lang ? lang[1] : 'code');
      header.appendChild(langLabel);

      var copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.textContent = '复制';
      copyBtn.setAttribute('aria-label', '复制代码');
      header.appendChild(copyBtn);

      wrapper.insertBefore(header, pre);

      copyBtn.addEventListener('click', function () {
        var text = code ? code.textContent : pre.textContent;
        copyToClipboard(text, copyBtn);
      });
    });
  }

  function copyToClipboard(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(btn);
      }).catch(function () {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {
      btn.textContent = '复制失败';
      setTimeout(function () { btn.textContent = '复制'; }, 2000);
    }
    document.body.removeChild(textarea);
  }

  function showCopied(btn) {
    btn.textContent = '已复制!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = '复制';
      btn.classList.remove('copied');
    }, 2000);
  }

  initCodeCopy();

  /* ============================================================
     6. TABLE WRAPPING
     ============================================================ */
  function wrapTables() {
    var tables = document.querySelectorAll('.post-content table');
    tables.forEach(function (table) {
      if (!table.parentElement.classList.contains('table-wrapper')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  wrapTables();

  /* ============================================================
     7. GISCUS LAZY LOAD
     ============================================================ */
  var giscusBtn = document.getElementById('load-giscus-btn');
  if (giscusBtn) {
    giscusBtn.addEventListener('click', function () {
      var placeholder = document.getElementById('giscus-placeholder');
      var container = document.getElementById('giscus-container');
      if (placeholder) placeholder.style.display = 'none';

      if (container && window.CLEARTEXT_GISCUS) {
        container.style.display = 'block';
        var cfg = window.CLEARTEXT_GISCUS;
        var giscusScript = document.createElement('script');
        giscusScript.src = 'https://giscus.app/client.js';
        giscusScript.setAttribute('data-repo', cfg.repo);
        giscusScript.setAttribute('data-repo-id', cfg.repo_id);
        giscusScript.setAttribute('data-category', cfg.category);
        giscusScript.setAttribute('data-category-id', cfg.category_id);
        giscusScript.setAttribute('data-mapping', cfg.mapping || 'pathname');
        giscusScript.setAttribute('data-strict', cfg.strict || '0');
        giscusScript.setAttribute('data-reactions-enabled', cfg.reactions_enabled || '1');
        giscusScript.setAttribute('data-emit-metadata', cfg.emit_metadata || '0');
        giscusScript.setAttribute('data-input-position', cfg.input_position || 'bottom');
        giscusScript.setAttribute('data-lang', cfg.lang || 'zh-CN');
        giscusScript.setAttribute('data-loading', cfg.loading || 'lazy');
        giscusScript.setAttribute('crossorigin', 'anonymous');
        giscusScript.async = true;
        container.appendChild(giscusScript);
      }
    });
  }

  /* ============================================================
     8. RIPPLER EFFECT (Reusable)
     ============================================================ */
  function createRipple(event) {
    var btn = event.currentTarget;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  }

  /* Attach ripple to buttons */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.header-btn, .back-to-top');
    if (btn && !btn.querySelector('.ripple')) {
      createRipple(e);
    }
  });

  /* ============================================================
     9. POST NAVIGATION — Keyboard Shortcuts
     ============================================================ */
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'ArrowLeft') {
      var prev = document.querySelector('.post-nav-link:first-child');
      if (prev) window.location.href = prev.href;
    }
    if (e.key === 'ArrowRight') {
      var next = document.querySelector('.post-nav .post-nav-link:last-child');
      if (next) window.location.href = next.href;
    }
  });

  /* ============================================================
     10. RE-INIT ON PAGE CHANGE (for PJAX / Turbolinks)
     ============================================================ */
  window.cleartextReinit = function () {
    bindLightbox();
    initCodeCopy();
    wrapTables();
    /* re-observe lazy images */
    if (activeObserver) {
      var newLazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]:not(.loaded)'));
      newLazyImages.forEach(function (img) { lazyImageObserver.observe(img); });
    }
  };
})();
