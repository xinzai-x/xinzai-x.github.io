/**
 * Cleartext Theme — Dark Mode Toggle
 * Works with inline anti-flash script (head.ejs)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cleartext-theme';
  var DARK_CLASS = 'dark';
  var LIGHT_CLASS = 'light';
  var AUTO = 'auto';

  var toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  // Get saved preference (already applied by inline script)
  function getThemePreference() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === DARK_CLASS || saved === LIGHT_CLASS) return saved;
    if (saved === AUTO) return AUTO;
    return AUTO;
  }

  // Apply theme to <html> (sync with inline script)
  function setTheme(theme) {
    var html = document.documentElement;
    var isDark;

    if (theme === AUTO) {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.remove(LIGHT_CLASS);
      html.classList.toggle(DARK_CLASS, isDark);
    } else {
      isDark = theme === DARK_CLASS;
      html.classList.remove(LIGHT_CLASS, DARK_CLASS);
      html.classList.add(theme);
    }

    // Save preference
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Cycle through themes: auto → light → dark
  function cycleTheme() {
    var current = getThemePreference();
    var next;
    if (current === AUTO) next = LIGHT_CLASS;
    else if (current === LIGHT_CLASS) next = DARK_CLASS;
    else next = AUTO;
    setTheme(next);
  }

  // Listen for system changes when in auto mode
  function watchSystem() {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', function (e) {
      if (getThemePreference() === AUTO) {
        setTheme(AUTO);
      }
    });
  }

  // Initialize (theme already set by inline script)
  watchSystem();
  toggle.addEventListener('click', cycleTheme);
})();