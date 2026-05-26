// Image Lightbox — click to zoom, arrow/nav to browse, click overlay to close
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var images = [];
    var currentIndex = -1;
    var overlay = null;
    var imgEl = null;
    var isOpen = false;

    // Collect all post content images
    function collectImages() {
      var imgs = document.querySelectorAll('.post-content img');
      images = [];
      imgs.forEach(function(img) {
        var src = img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          images.push(src);
          img.style.cursor = 'zoom-in';
          img.addEventListener('click', function(e) {
            e.preventDefault();
            open(images.indexOf(this.src));
          });
        }
      });
    }

    function buildOverlay() {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', '图片查看器');
      overlay.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'background:rgba(0,0,0,0.9);z-index:9999;display:none;' +
        'align-items:center;justify-content:center;flex-direction:column;' +
        'cursor:zoom-out;user-select:none;-webkit-user-select:none;';

      // Image
      imgEl = document.createElement('img');
      imgEl.style.cssText =
        'max-width:90vw;max-height:80vh;object-fit:contain;' +
        'border-radius:4px;box-shadow:0 4px 24px rgba(0,0,0,0.5);' +
        'cursor:default;transition:opacity 0.2s;';
      overlay.appendChild(imgEl);

      // Counter
      var counter = document.createElement('div');
      counter.className = 'lightbox-counter';
      counter.style.cssText =
        'color:rgba(255,255,255,0.6);font-size:14px;margin-top:16px;' +
        'font-family:monospace;cursor:default;';
      overlay.appendChild(counter);

      // Navigation buttons
      function makeBtn(label, left) {
        var btn = document.createElement('button');
        btn.setAttribute('aria-label', label);
        btn.innerHTML = left
          ? '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"/></svg>'
          : '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>';
        btn.style.cssText =
          'position:absolute;top:50%;transform:translateY(-50%);' +
          (left ? 'left:16px;' : 'right:16px;') +
          'background:rgba(255,255,255,0.08);border:none;border-radius:50%;' +
          'color:rgba(255,255,255,0.7);cursor:pointer;width:48px;height:48px;' +
          'display:flex;align-items:center;justify-content:center;' +
          'transition:background 0.15s,color 0.15s;';
        btn.addEventListener('mouseenter', function() {
          btn.style.background = 'rgba(255,255,255,0.18)';
          btn.style.color = '#fff';
        });
        btn.addEventListener('mouseleave', function() {
          btn.style.background = 'rgba(255,255,255,0.08)';
          btn.style.color = 'rgba(255,255,255,0.7)';
        });
        return btn;
      }

      var prevBtn = makeBtn('上一张', true);
      var nextBtn = makeBtn('下一张', false);

      prevBtn.addEventListener('click', function(e) { e.stopPropagation(); prev(); });
      nextBtn.addEventListener('click', function(e) { e.stopPropagation(); next(); });

      overlay.appendChild(prevBtn);
      overlay.appendChild(nextBtn);

      // Close btn (X)
      var closeBtn = document.createElement('button');
      closeBtn.setAttribute('aria-label', '关闭');
      closeBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      closeBtn.style.cssText =
        'position:absolute;top:16px;right:16px;background:none;border:none;' +
        'color:rgba(255,255,255,0.5);cursor:pointer;width:40px;height:40px;' +
        'display:flex;align-items:center;justify-content:center;';
      closeBtn.addEventListener('click', function(e) { e.stopPropagation(); close(); });
      closeBtn.addEventListener('mouseenter', function() { closeBtn.style.color = '#fff'; });
      closeBtn.addEventListener('mouseleave', function() { closeBtn.style.color = 'rgba(255,255,255,0.5)'; });
      overlay.appendChild(closeBtn);

      // Click overlay to close
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) close();
      });

      document.body.appendChild(overlay);
    }

    function open(index) {
      if (index < 0 || index >= images.length) return;
      currentIndex = index;
      showCurrent();
      overlay.style.display = 'flex';
      isOpen = true;
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.style.display = 'none';
      isOpen = false;
      currentIndex = -1;
      document.body.style.overflow = '';
    }

    function showCurrent() {
      imgEl.style.opacity = '0';
      setTimeout(function() {
        imgEl.src = images[currentIndex];
        imgEl.style.opacity = '1';
        var counterEl = overlay.querySelector('.lightbox-counter');
        if (counterEl) {
          counterEl.textContent = images.length > 1
            ? (currentIndex + 1) + ' / ' + images.length
            : '';
        }
      }, 100);
    }

    function prev() {
      if (currentIndex > 0) { currentIndex--; showCurrent(); }
      else { currentIndex = images.length - 1; showCurrent(); }
    }

    function next() {
      if (currentIndex < images.length - 1) { currentIndex++; showCurrent(); }
      else { currentIndex = 0; showCurrent(); }
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowLeft') { prev(); }
      if (e.key === 'ArrowRight') { next(); }
    });

    buildOverlay();

    // Re-collect after page loaded (in case of lazy images)
    collectImages();
    window.addEventListener('load', collectImages);
  });
})();