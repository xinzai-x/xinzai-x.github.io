/**
 * Cleartext Theme — Main JavaScript
 * Handles: scroll-aware header, smooth scroll, image lightbox,
 *          mobile touch optimizations, etc.
 */
(function () {
  'use strict';

  var IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;
  var IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ---------- Scroll-aware header shadow ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Image lightbox (lighter on mobile) ---------- */
  document.querySelectorAll('.post-content img').forEach(function (img) {
    img.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.className = 'image-lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', '图片查看器');
      overlay.style.cssText =
        'position:fixed;top:0;left:0;right:0;bottom:0;' +
        'background:rgba(0,0,0,0.92);z-index:9999;' +
        'display:flex;align-items:center;justify-content:center;' +
        'cursor:pointer;';
      var cloned = img.cloneNode(true);
      cloned.style.cssText =
        'max-width:92vw;max-height:92vh;object-fit:contain;' +
        'border-radius:4px;pointer-events:none;';
      overlay.appendChild(cloned);
      overlay.addEventListener('click', function () { document.body.removeChild(overlay); });
      overlay.addEventListener('touchend', function () { document.body.removeChild(overlay); });
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          document.body.removeChild(overlay);
          document.removeEventListener('keydown', escHandler);
        }
      });
      document.body.appendChild(overlay);
    });
  });

  /* ---------- External links open in new tab ---------- */
  document.querySelectorAll('.post-content a[href^="http"]').forEach(function (link) {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  /* ---------- Mobile: add loading="lazy" to below-fold images ---------- */
  if (IS_MOBILE) {
    var allImages = document.querySelectorAll('.post-content img:not([loading])');
    var foldThreshold = window.innerHeight;
    allImages.forEach(function (img) {
      var rect = img.getBoundingClientRect();
      if (rect.top > foldThreshold) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /* ---------- Mobile: add horizontal scroll indicators for tables and code blocks ---------- */
  document.querySelectorAll('.post-content pre, .post-content table').forEach(function (el) {
    if (el.scrollWidth > el.clientWidth) {
      el.setAttribute('data-scrollable', 'true');
      el.classList.add('scrollable');

      var updateIndicator = function () {
        var hasOverflow = el.scrollWidth > el.clientWidth + 2;
        el.classList.toggle('scrollable', hasOverflow);
        if (hasOverflow) el.setAttribute('data-scrollable', 'true');
        else el.removeAttribute('data-scrollable');
      };

      window.addEventListener('resize', function () {
        clearTimeout(updateIndicator._tid);
        updateIndicator._tid = setTimeout(updateIndicator, 200);
      });
    }
  });

  /* ---------- Mobile: prevent double-tap zoom on interactive elements ---------- */
  if (IS_TOUCH) {
    document.querySelectorAll('button, .header-btn, .tag, .cat-link, .nav-link, .pagination-item')
      .forEach(function (el) {
        el.style.touchAction = 'manipulation';
      });
  }

  /* ========== Header Shrink on Scroll (Desktop) ========== */
  if (header && !IS_MOBILE) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) header.classList.add('shrink');
      else header.classList.remove('shrink');
    }, { passive: true });
  }

  /* ========== Lazy Image Blur-to-Clear ========== */
  var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImgs.length && 'IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          imgObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '150px' });
    lazyImgs.forEach(function (img) { imgObserver.observe(img); });
  } else {
    lazyImgs.forEach(function (img) { img.classList.add('loaded'); });
  }

  /* ========== Button Ripple Effect ========== */
  document.addEventListener('click', function (e) {
    var rippleEl = e.target.closest('.ripple');
    if (!rippleEl) return;
    var rect = rippleEl.getBoundingClientRect();
    var ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    rippleEl.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
  });

  /* ========== Code Block Copy Button ========== */
  document.querySelectorAll('.post-content pre code').forEach(function (codeEl) {
    var pre = codeEl.parentNode;
    var lang = 'plaintext';
    var classes = codeEl.className || '';
    var m = classes.match(/lang(?:uage)?-(\w+)/) || classes.match(/language-(\w+)/);
    if (m) lang = m[1];
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    var header = document.createElement('div');
    header.className = 'code-block-header';
    var label = document.createElement('span');
    label.className = 'code-lang-label';
    label.textContent = lang;
    var copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn ripple';
    copyBtn.textContent = '复制代码';
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(codeEl.textContent || codeEl.innerText || '').then(function () {
        copyBtn.textContent = '已复制';
        copyBtn.classList.add('copied');
        setTimeout(function () {
          copyBtn.textContent = '复制代码';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
    header.appendChild(label);
    header.appendChild(copyBtn);
    wrapper.appendChild(header);
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
  });
})();