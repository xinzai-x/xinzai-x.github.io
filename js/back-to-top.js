/**
 * Cleartext Theme v3.0 — Back to Top Button
 * Lazy-initialized via requestIdleCallback for performance
 */
(function () {
  'use strict';

  var init = function () {
    var button = document.getElementById('back-to-top');
    if (!button) return;

    var SCROLL_THRESHOLD = 300;
    var ticking = false;

    function updateVisibility() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
      ticking = false;
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    button.addEventListener('click', function (e) {
      scrollToTop();
      e.preventDefault();
    });

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });

    updateVisibility();
  };

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(init, { timeout: 3000 });
  } else {
    setTimeout(init, 500);
  }
})();
