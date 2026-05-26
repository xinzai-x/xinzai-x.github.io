// Back to Top & Back to Bottom Buttons
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const topBtn = document.getElementById('back-to-top');
    const bottomBtn = document.getElementById('back-to-bottom');
    if (!topBtn && !bottomBtn) return;

    function updateButtons() {
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight >= docHeight - 200;

      [topBtn, bottomBtn].forEach(function(btn) {
        if (!btn) return;
        if (scrollY > 300) {
          btn.style.opacity = '1';
          btn.style.visibility = 'visible';
          btn.style.transform = 'translateY(0)';
        } else {
          btn.style.opacity = '0';
          btn.style.visibility = 'hidden';
          btn.style.transform = 'translateY(10px)';
        }
      });

      if (bottomBtn && nearBottom) {
        bottomBtn.style.opacity = '0';
        bottomBtn.style.visibility = 'hidden';
        bottomBtn.style.transform = 'translateY(10px)';
      }
    }

    if (topBtn) {
      topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.blur();
      });
    }

    if (bottomBtn) {
      bottomBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        this.blur();
      });
    }

    updateButtons();
    window.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons, { passive: true });
  });
})();