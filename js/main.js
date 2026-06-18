/**
 * Hexo Theme - Ink
 * Main JavaScript
 */

(function() {
  'use strict';

  // =============================================
  // Dark Mode
  // =============================================
  const ThemeManager = {
    STORAGE_KEY: 'ink-theme',
    
    init() {
      this.themeToggle = document.getElementById('theme-toggle');
      if (!this.themeToggle) return;
      
      // Apply saved theme immediately (prevent flash)
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      
      this.themeToggle.addEventListener('click', () => this.toggle());
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
      });
    },
    
    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(this.STORAGE_KEY, next);
    },
    
    get() {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
  };

  // =============================================
  // Mobile Navigation
  // =============================================
  const MobileNav = {
    init() {
      this.toggle = document.getElementById('mobile-menu-toggle');
      this.nav = document.getElementById('header-nav');
      if (!this.toggle || !this.nav) return;
      
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close on link click
      this.nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.toggle.contains(e.target) && !this.nav.contains(e.target)) {
          this.close();
        }
      });
      
      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });
    },
    
    toggleMenu() {
      this.toggle.classList.toggle('active');
      this.nav.classList.toggle('mobile-open');
    },
    
    close() {
      this.toggle.classList.remove('active');
      this.nav.classList.remove('mobile-open');
    }
  };

  // =============================================
  // Search (uses InkSearch module from search.js)
  // =============================================
  const SearchManager = {
    init() {
      this.searchToggle = document.getElementById('search-toggle');
      this.searchModal = document.getElementById('search-modal');
      this.searchOverlay = document.getElementById('search-overlay');
      this.searchInput = document.getElementById('search-input');
      this.searchClose = document.getElementById('search-close');
      this.searchResults = document.getElementById('search-results');
      this._debounceTimer = null;
      
      if (!this.searchToggle || !this.searchModal) return;
      
      // Preload search data
      if (window.InkSearch) {
        window.InkSearch.load(function() {});
      }
      
      this.searchToggle.addEventListener('click', () => this.open());
      this.searchClose.addEventListener('click', () => this.close());
      this.searchOverlay.addEventListener('click', () => this.close());
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.searchModal.classList.contains('open')) {
          this.close();
        }
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.open();
        }
      });
      
      this.searchInput.addEventListener('input', () => {
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => this.doSearch(), 200);
      });
    },
    
    open() {
      this.searchModal.classList.add('open');
      setTimeout(() => this.searchInput.focus(), 100);
      // Focus trap
      this._trapFocus = (e) => {
        if (e.key !== 'Tab') return;
        const focusable = this.searchModal.querySelectorAll('input, button, a[href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', this._trapFocus);
    },
    
    close() {
      this.searchModal.classList.remove('open');
      this.searchInput.value = '';
      this.searchResults.innerHTML = '';
      if (this._trapFocus) {
        document.removeEventListener('keydown', this._trapFocus);
        this._trapFocus = null;
      }
    },
    
    doSearch() {
      const query = this.searchInput.value.trim();
      if (!query) {
        this.searchResults.innerHTML = '';
        return;
      }
      
      if (!window.InkSearch) {
        this.searchResults.innerHTML = '<div class="search-no-results">搜索模块未加载</div>';
        return;
      }
      
      const self = this;
      window.InkSearch.load(function() {
        const results = window.InkSearch.search(query);
        self.renderResults(results, query);
      });
    },
    
    renderResults(results, query) {
      if (results.length === 0) {
        this.searchResults.innerHTML = '<div class="search-no-results">未找到结果</div>';
        return;
      }
      
      var html = '';
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        var title = window.InkSearch.highlight(r.title, query);
        var excerpt = window.InkSearch.highlight(r.excerpt, query);
        html += '<a href="' + r.link + '" class="search-result-item">' +
          '<div class="search-result-title">' + title + '</div>' +
          '<div class="search-result-excerpt">' + excerpt + '</div>' +
          '</a>';
      }
      this.searchResults.innerHTML = html;
    }
  };

  // =============================================
  // Back to Top
  // =============================================
  const BackToTop = {
    init() {
      this.button = document.getElementById('back-to-top');
      if (!this.button) return;
      
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
      this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    handleScroll() {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // =============================================
  // Reading Progress (post pages only)
  // =============================================
  const ReadingProgress = {
    init() {
      if (!document.querySelector('.post-article')) return;
      
      this.bar = document.createElement('div');
      this.bar.className = 'reading-progress';
      document.body.appendChild(this.bar);
      
      window.addEventListener('scroll', () => this.update(), { passive: true });
    },
    
    update() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min((scrolled / docHeight) * 100, 100);
      this.bar.style.width = progress + '%';
    }
  };

  // =============================================
  // Table of Contents
  // =============================================
  const TOCManager = {
    init() {
      this.tocBody = document.getElementById('toc-body');
      this.tocToggle = document.getElementById('toc-toggle');
      
      if (!this.tocBody || !this.tocToggle) return;
      
      this.tocToggle.addEventListener('click', () => this.toggle());
      
      // Highlight active TOC item on scroll
      this.setupScrollSpy();
    },
    
    toggle() {
      this.tocBody.classList.toggle('collapsed');
      this.tocToggle.classList.toggle('collapsed');
    },
    
    setupScrollSpy() {
      const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3');
      const tocLinks = this.tocBody.querySelectorAll('a');
      
      if (headings.length === 0 || tocLinks.length === 0) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach(link => {
              const li = link.parentElement;
              li.classList.remove('toc-active');
              if (link.getAttribute('href') === '#' + id) {
                li.classList.add('toc-active');
                // Scroll TOC to keep active item visible
                link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
              }
            });
          }
        });
      }, { rootMargin: '-80px 0px -80% 0px' });
      
      headings.forEach(h => {
        if (h.id) observer.observe(h);
      });
    }
  };

  // =============================================
  // Image Lazy Loading & Lightbox
  // =============================================
  const ImageManager = {
    init() {
      // Add loading="lazy" to images
      document.querySelectorAll('.post-content img, .page-content img').forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
  };

  // =============================================
  // Callout Blocks (GitHub-style > [!NOTE])
  // =============================================
  const CalloutProcessor = {
    init() {
      const content = document.querySelector('.post-content, .page-content');
      if (!content) return;
      
      const typeMap = {
        'NOTE': 'note',
        'TIP': 'tip',
        'WARNING': 'warning',
        'CAUTION': 'caution',
        'IMPORTANT': 'important'
      };
      
      content.querySelectorAll('blockquote').forEach(bq => {
        const firstP = bq.querySelector('p:first-child');
        if (!firstP) return;
        
        // Match > [!TYPE] or > **TYPE** or > TYPE:
        const text = firstP.textContent.trim();
        let type = null;
        let title = null;
        
        // [!TYPE] syntax
        const bracketMatch = text.match(/^\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]$/i);
        if (bracketMatch) {
          type = bracketMatch[1].toUpperCase();
          title = type.charAt(0) + type.slice(1).toLowerCase();
          firstP.remove();
        }
        
        // > **TYPE** or > **Title:**
        if (!type) {
          const strong = firstP.querySelector('strong');
          if (strong) {
            const strongText = strong.textContent.trim();
            for (const [key, val] of Object.entries(typeMap)) {
              if (strongText.toUpperCase().includes(key)) {
                type = key;
                title = strongText;
                break;
              }
            }
          }
        }
        
        if (type) {
          bq.classList.add('callout', 'callout-' + (typeMap[type] || type.toLowerCase()));
          if (title && !bq.querySelector('.callout-title')) {
            const titleEl = document.createElement('div');
            titleEl.className = 'callout-title';
            titleEl.textContent = title;
            bq.insertBefore(titleEl, bq.firstChild);
          }
        }
      });
    }
  };

  // =============================================
  // Code Copy Button
  // =============================================
  const CodeCopy = {
    init() {
      const blocks = document.querySelectorAll('.highlight');
      blocks.forEach(block => {
        // Wrap for hover detection
        if (!block.parentElement.classList.contains('highlight-wrap')) {
          const wrap = document.createElement('div');
          wrap.className = 'highlight-wrap';
          block.parentNode.insertBefore(wrap, block);
          wrap.appendChild(block);
        }

        const btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> 复制';
        btn.setAttribute('aria-label', '复制代码');

        btn.addEventListener('click', () => {
          const code = block.querySelector('.code pre') || block.querySelector('pre');
          if (!code) return;
          const text = code.textContent;
          navigator.clipboard.writeText(text).then(() => {
            btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 已复制!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> 复制';
              btn.classList.remove('copied');
            }, 2000);
          }).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 已复制!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> 复制';
              btn.classList.remove('copied');
            }, 2000);
          });
        });

        block.style.position = 'relative';
        block.appendChild(btn);
      });
    }
  };

  // =============================================
  // External Links
  // =============================================
  const LinkManager = {
    init() {
      // Open external links in new tab
      const selectors = [
        '.post-content a',
        '.page-content a',
        '.links-content a',
        '.post-card-excerpt a',
        '.archive-link'
      ];
      document.querySelectorAll(selectors.join(', ')).forEach(link => {
        if (link.hostname && link.hostname !== window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  };

  // =============================================
  // Header Scroll Effect
  // =============================================
  const HeaderScroll = {
    init() {
      this.header = document.getElementById('site-header');
      if (!this.header) return;
      
      this.lastScrollY = 0;
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },
    
    handleScroll() {
      const scrollY = window.scrollY;
      
      if (scrollY > 10) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      this.lastScrollY = scrollY;
    }
  };

  // =============================================
  // Initialize
  // =============================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MobileNav.init();
    SearchManager.init();
    BackToTop.init();
    ReadingProgress.init();
    TOCManager.init();
    ImageManager.init();
    CalloutProcessor.init();
    CodeCopy.init();
    LinkManager.init();
    HeaderScroll.init();
  });
})();
