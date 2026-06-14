/* =================================================================
   ƯỚC RỒNG ONLINE — main.js (vanilla, không phụ thuộc)
   Xử lý:
     1. Image placeholder  — phát hiện ảnh thật / ảnh thiếu, tự load
     2. Mobile nav toggle
     3. Scroll-spy          — highlight mục menu đang xem
     4. Reading progress    — thanh tiến trình đọc
     5. Back-to-top
     6. Header shadow on scroll
     7. Reveal on scroll    — animation nhẹ khi section xuất hiện
   ================================================================= */
(function () {
  'use strict';

  /* ---------- 1. IMAGE PLACEHOLDER ----------
     Mỗi .image-slot có <img>. Khi ảnh load thành công -> .is-loaded (hiện ảnh,
     ẩn khung placeholder). Khi ảnh thiếu/lỗi -> .is-missing (giữ khung + tên file).
     Vì src đã trỏ đúng assets/images/, chỉ cần bỏ ảnh đúng tên vào là tự hiện. */
  function initImageSlots() {
    var slots = document.querySelectorAll('.image-slot');
    slots.forEach(function (slot) {
      var img = slot.querySelector('img');
      if (!img) return;

      var markLoaded = function () {
        slot.classList.add('is-loaded');
        slot.classList.remove('is-missing');
      };
      var markMissing = function () {
        slot.classList.add('is-missing');
        slot.classList.remove('is-loaded');
      };

      // Ảnh có thể đã xong trước khi JS chạy (script defer)
      if (img.complete) {
        if (img.naturalWidth > 0) {
          markLoaded();
        } else {
          // complete nhưng không có kích thước -> đã lỗi (hoặc lazy chưa tải)
          markMissing();
        }
      }

      img.addEventListener('load', function () {
        if (img.naturalWidth > 0) markLoaded();
      });
      img.addEventListener('error', markMissing);
    });
  }

  /* ---------- 2. MOBILE NAV ---------- */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var list = document.getElementById('navList');
    if (!toggle || !list) return;

    var setOpen = function (open) {
      list.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    };

    toggle.addEventListener('click', function () {
      setOpen(!list.classList.contains('is-open'));
    });

    // Đóng menu sau khi chọn 1 mục (mobile)
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Đóng menu khi nhấn Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- 3. SCROLL-SPY (active menu) ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-list a[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    // Map: id section -> link tương ứng
    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = link; sections.push(sec); }
    });

    var setActive = function (id) {
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (map[id]) map[id].classList.add('is-active');
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, {
      // Vùng kích hoạt nằm quanh 1/3 trên màn hình (bù header sticky)
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* ---------- 4. READING PROGRESS ---------- */
  function initProgress() {
    var fill = document.getElementById('progressFill');
    if (!fill) return;

    var update = function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      fill.style.width = pct.toFixed(2) + '%';
    };
    onScroll(update);
    update();
  }

  /* ---------- 5. BACK-TO-TOP + 6. HEADER SHADOW ---------- */
  function initScrollUI() {
    var btn = document.getElementById('backToTop');
    var header = document.getElementById('siteHeader');

    var update = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (btn) {
        var show = y > 600;
        btn.classList.toggle('is-visible', show);
        if (show) btn.removeAttribute('hidden'); else btn.setAttribute('hidden', '');
      }
      if (header) header.classList.toggle('is-scrolled', y > 8);
    };

    if (btn) {
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    }
    onScroll(update);
    update();
  }

  /* ---------- 7. REVEAL ON SCROLL ---------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    // Không có IO hoặc người dùng tắt animation -> hiện luôn
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Helpers ---------- */
  // Throttle scroll bằng requestAnimationFrame
  function onScroll(cb) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () { cb(); ticking = false; });
      }
    }, { passive: true });
  }

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Cập nhật năm ở footer
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Khởi tạo ---------- */
  function init() {
    initImageSlots();
    initNav();
    initScrollSpy();
    initProgress();
    initScrollUI();
    initReveal();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
