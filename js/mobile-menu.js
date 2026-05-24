/**
 * Cleartext Theme v3.0 — Mobile Menu
 * Smooth animations, scroll lock, swipe-to-close, ESC key
 */
(function () {
  'use strict';

  var toggle = document.getElementById('mobile-menu-toggle');
  var nav = document.querySelector('.site-nav');
  var body = document.body;

  if (!toggle || !nav) return;

  var SCROLL_LOCK_CLASS = 'menu-open';
  var CLOSE_THRESHOLD = 80;
  var touchStartY = 0;
  var isOpen = false;

  function openMenu() {
    isOpen = true;
    nav.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add(SCROLL_LOCK_CLASS);

    var firstLink = nav.querySelector('.nav-link');
    if (firstLink) setTimeout(function () { firstLink.focus(); }, 300);
  }

  function closeMenu() {
    isOpen = false;
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove(SCROLL_LOCK_CLASS);
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (isOpen) closeMenu();
    else openMenu();
  });

  /* Close on nav link click */
  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (isOpen && !nav.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  /* Swipe to close */
  nav.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
  }, { passive: true });

  nav.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1) {
      var deltaY = e.touches[0].clientY - touchStartY;
      if (deltaY < -CLOSE_THRESHOLD && isOpen) closeMenu();
    }
  }, { passive: true });
})();
