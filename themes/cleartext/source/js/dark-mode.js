/**
 * Cleartext Theme v3.0 — Dark Mode
 * Three modes: auto (OS preference), light, dark
 * Persists to localStorage
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cleartext-theme-mode';
  var CLASS_DARK = 'dark';
  var html = document.documentElement;

  var btn = document.getElementById('dark-mode-btn');
  var sunIcon = document.getElementById('dm-sun');
  var moonIcon = document.getElementById('dm-moon');

  /* Detect current mode */
  function getCurrentMode() {
    if (html.classList.contains(CLASS_DARK)) return 'dark';
    return 'light';
  }

  /* Apply mode */
  function applyMode(mode) {
    if (mode === 'dark') {
      html.classList.add(CLASS_DARK);
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = '';
      if (btn) btn.setAttribute('aria-label', '切换到亮色模式');
    } else {
      html.classList.remove(CLASS_DARK);
      if (sunIcon) sunIcon.style.display = '';
      if (moonIcon) moonIcon.style.display = 'none';
      if (btn) btn.setAttribute('aria-label', '切换到暗色模式');
    }
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) { /* ignore */ }
  }

  /* Toggle */
  function toggleMode() {
    var current = getCurrentMode();
    applyMode(current === 'dark' ? 'light' : 'dark');
  }

  /* Initialize from storage or OS preference */
  function init() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') {
        applyMode('dark');
        return;
      }
      if (saved === 'light') {
        applyMode('light');
        return;
      }
    } catch (e) { /* ignore */ }

    /* OS preference */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyMode('dark');
    } else {
      applyMode('light');
    }
  }

  /* Listen for OS preference changes (auto mode) */
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (!saved || saved === 'auto') {
          applyMode(e.matches ? 'dark' : 'light');
        }
      } catch (_) {}
    });
  }

  /* Button click */
  if (btn) {
    btn.addEventListener('click', function () {
      toggleMode();
    });
  }

  /* Init */
  init();
})();
