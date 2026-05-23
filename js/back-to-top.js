/**
 * Cleartext Theme — Back to Top Button
 * Lazy-initialized via requestIdleCallback
 */
(function () {
  'use strict';

  var init = function () {
    var button = document.getElementById('back-to-top');
    if (!button) return;

    var SCROLL_THRESHOLD = 300;
    var IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    function updateVisibility() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (IS_TOUCH) {
      button.style.touchAction = 'manipulation';
      button.style.userSelect = 'none';
    }

    button.addEventListener('click', function (e) {
      scrollToTop();
      e.preventDefault();
    });

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
  };

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(init);
  } else {
    setTimeout(init, 500);
  }
})();