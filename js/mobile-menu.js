// Mobile Menu Toggle
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.site-nav');
    
    if (!toggle || !nav) return;

    // Toggle menu
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      
      if (nav.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', '关闭菜单');
        document.body.style.overflow = 'hidden';
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('open') && 
          !nav.contains(e.target) && 
          !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
        document.body.style.overflow = '';
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    // Close menu on window resize (desktop breakpoint)
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Initial ARIA attributes
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开菜单');
  });
})();