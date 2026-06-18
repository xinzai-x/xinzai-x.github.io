/**
 * Hexo Theme - Ink
 * Image Lightbox with zoom & pan
 */
(function() {
  'use strict';

  var overlay = null;
  var imgEl = null;
  var scale = 1;
  var panX = 0, panY = 0;
  var isDragging = false;
  var startX, startY;
  var MIN_SCALE = 0.5;
  var MAX_SCALE = 8;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML =
      '<div class="lightbox-container">' +
        '<img class="lightbox-img" draggable="false">' +
        '<div class="lightbox-toolbar">' +
          '<button class="lightbox-btn lightbox-zoom-in" title="Zoom In">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
          '</button>' +
          '<button class="lightbox-btn lightbox-zoom-out" title="Zoom Out">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
          '</button>' +
          '<button class="lightbox-btn lightbox-reset" title="Reset">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
          '</button>' +
          '<span class="lightbox-zoom-level">100%</span>' +
          '<button class="lightbox-btn lightbox-close" title="Close">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox-img');

    // Close
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });

    // Zoom buttons
    overlay.querySelector('.lightbox-zoom-in').addEventListener('click', function() {
      zoomTo(scale * 1.3);
    });
    overlay.querySelector('.lightbox-zoom-out').addEventListener('click', function() {
      zoomTo(scale / 1.3);
    });
    overlay.querySelector('.lightbox-reset').addEventListener('click', function() {
      resetView();
    });

    // Mouse wheel zoom
    overlay.addEventListener('wheel', function(e) {
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomTo(scale * factor);
    }, { passive: false });

    // Drag to pan
    overlay.addEventListener('mousedown', function(e) {
      if (e.target !== imgEl && !e.target.closest('.lightbox-container')) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      overlay.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      applyTransform();
    });

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        if (overlay) overlay.style.cursor = 'grab';
      }
    });

    // Touch support
    var lastTouchDist = 0;
    var lastTouchMid = { x: 0, y: 0 };

    overlay.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - panX;
        startY = e.touches[0].clientY - panY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist = Math.sqrt(dx * dx + dy * dy);
        lastTouchMid = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2
        };
      }
    }, { passive: true });

    overlay.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging) {
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        applyTransform();
      } else if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDist > 0) {
          var factor = dist / lastTouchDist;
          zoomTo(scale * factor);
        }
        lastTouchDist = dist;
      }
    }, { passive: false });

    overlay.addEventListener('touchend', function() {
      isDragging = false;
      lastTouchDist = 0;
    }, { passive: true });

    // Keyboard
    document.addEventListener('keydown', function(e) {
      if (!overlay || !overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') zoomTo(scale * 1.3);
      if (e.key === '-') zoomTo(scale / 1.3);
      if (e.key === '0') resetView();
    });
  }

  function open(src) {
    if (!overlay) createOverlay();
    imgEl.src = src;
    resetView();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function zoomTo(newScale) {
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    applyTransform();
    updateZoomLevel();
  }

  function resetView() {
    scale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
    updateZoomLevel();
  }

  function applyTransform() {
    if (!imgEl) return;
    imgEl.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + scale + ')';
  }

  function updateZoomLevel() {
    var el = overlay.querySelector('.lightbox-zoom-level');
    if (el) el.textContent = Math.round(scale * 100) + '%';
  }

  function init() {
    var content = document.querySelector('.post-content, .page-content');
    if (!content) return;

    content.querySelectorAll('img').forEach(function(img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        open(img.src);
      });
    });
  }

  // Export
  window.ImageLightbox = { init: init };

  document.addEventListener('DOMContentLoaded', init);
})();
