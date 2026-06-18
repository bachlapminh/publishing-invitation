/* =================================================================
   ƯỚC RỒNG ONLINE — main.js
   Đọc nội dung từ content.js (window.SITE_CONTENT) và RENDER toàn bộ
   header / 14 section / footer lên UI, sau đó gắn các hành vi:
     - Placeholder ảnh (tự load ảnh thật khi có file đúng tên)
     - Mobile nav, scroll-spy, thanh tiến trình, back-to-top, reveal
   LƯU Ý: KHÔNG sửa chữ nội dung ở đây — chữ nằm hết trong content.js.
   ================================================================= */
(function () {
  'use strict';

  /* ---------------- HELPERS RENDER ---------------- */

  // Thoát ký tự HTML để hiển thị an toàn
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  }

  // Chuỗi dạng "[ABC]" -> chip placeholder; ngược lại trả chữ thường.
  // opt.inline = true dùng cho nền tối (footer / liên hệ).
  function txt(s, opt) {
    var t = String(s == null ? '' : s);
    if (/^\[.*\]$/.test(t.trim())) {
      var cls = (opt && opt.inline) ? 'ph ph--inline' : 'ph';
      return '<span class="' + cls + '">' + esc(t) + '</span>';
    }
    return esc(t);
  }

  // Khung ảnh placeholder (tự load ảnh thật). opt.cls thêm biến thể, opt.eager tắt lazy.
  function slot(filename, opt) {
    opt = opt || {};
    var cls = opt.cls ? ' ' + opt.cls : '';
    var loading = opt.eager ? '' : ' loading="lazy"';
    return '<figure class="image-slot' + cls + '" data-filename="' + esc(filename) + '">' +
      '<img src="assets/images/' + esc(filename) + '" alt="' + esc(filename) + '"' + loading + '></figure>';
  }

  // 1 mục danh sách: nhận chuỗi hoặc { t, soft }
  function li(item) {
    var o = (typeof item === 'string') ? { t: item } : (item || {});
    var soft = o.soft ? ' <em>' + esc(o.soft) + '</em>' : '';
    return '<li>' + txt(o.t) + soft + '</li>';
  }

  // 1 ô gallery (ảnh + caption)
  function galleryItem(g) {
    return '<div class="gallery__item">' +
      slot(g.image, { cls: 'image-slot--16x9' }) +
      '<p class="gallery__cap">' + esc(g.caption) + '</p></div>';
  }

  // Logo thương hiệu (SVG nhúng, luôn đẹp kể cả chưa có ảnh)
  var BRAND_SVG =
    '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M16 2l12 6v8c0 7.2-4.9 12.6-12 14C8.9 28.6 4 23.2 4 16V8l12-6z" fill="url(#g1)" stroke="#e7b54a" stroke-width="1.2"/>' +
    '<path d="M11 19c1.8-3.4 4.2-5.2 7.6-5.2 1.4 0 2.4.5 2.4 1.6 0 1.5-1.6 2-3.2 2.2 1.1.7 1.8 1.7 1.8 3 0 2.2-1.9 3.6-4.4 3.6-2 0-3.6-.9-4.2-2.4" stroke="#f4e3b0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="13.2" cy="13.4" r="1.05" fill="#f4e3b0"/>' +
    '<defs><linearGradient id="g1" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">' +
    '<stop stop-color="#1d5c40"/><stop offset="1" stop-color="#0e3527"/></linearGradient></defs></svg>';

  /* ---------------- BUILDERS TỪNG PHẦN ---------------- */

  function buildHeader(C) {
    var b = C.meta.brand, n = C.nav, lg = (C.meta.logos || {});
    // Logo game bên trái (ảnh); nếu lỗi -> chữ thương hiệu (xử lý ở initHeaderLogos)
    var brand =
      '<a class="brand" href="#top" aria-label="' + esc(b.lead + ' ' + b.strong) + ' — về đầu trang">' +
        (lg.game ? '<img class="brand__logo" src="assets/images/' + esc(lg.game) + '" alt="' + esc(b.lead + ' ' + b.strong) + '">' : '') +
        '<span class="brand__name"' + (lg.game ? ' hidden' : '') + '>' + esc(b.lead) + ' <strong>' + esc(b.strong) + '</strong></span>' +
      '</a>';
    // Logo studio bên phải, kèm nhãn "Sản xuất bởi"
    var studio = lg.studio
      ? '<div class="site-header__studio">' +
          (lg.studioLabel ? '<span class="site-header__by">' + esc(lg.studioLabel) + '</span>' : '') +
          '<img class="studio-logo" src="assets/images/' + esc(lg.studio) + '" alt="Logo studio">' +
        '</div>'
      : '';
    return '<div class="container site-header__inner">' +
      brand +
      '<nav class="site-nav" aria-label="Điều hướng chính">' +
        '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navList" aria-label="Mở menu">' +
          '<span></span><span></span><span></span></button>' +
        '<ul class="nav-list" id="navList">' +
          n.items.map(function (it) {
            return '<li><a href="' + esc(it.href) + '">' + esc(it.label) + '</a></li>';
          }).join('') +
        '</ul>' +
      '</nav>' +
      '<div class="site-header__right">' + studio +
        '<a class="btn btn--gold site-header__cta" href="' + esc(n.cta.href) + '">' + esc(n.cta.label) + '</a>' +
      '</div>' +
    '</div>';
  }

  function buildHero(C) {
    var h = C.hero;
    return '<section class="hero hero--solo" id="top">' +
      '<div class="hero__bg" aria-hidden="true">' +
        (h.bgImage ? slot(h.bgImage, { cls: 'image-slot--background', eager: true }) : '') +
        '<div class="hero__scrim"></div>' +
      '</div>' +
      '<div class="container hero__inner">' +
        '<div class="hero__content" data-reveal>' +
          '<p class="eyebrow eyebrow--light">' + txt(h.eyebrow) + '</p>' +
          '<h1 class="hero__title">' + esc(h.titleLead) + ' <span>' + esc(h.titleAccent) + '</span></h1>' +
          '<p class="hero__sub">' + esc(h.sub) + '</p>' +
          '<div class="hero__cta">' +
            h.ctas.map(function (c) {
              return '<a class="btn btn--' + esc(c.variant) + '" href="' + esc(c.href) + '">' + esc(c.label) + '</a>';
            }).join('') +
          '</div>' +
          (h.badges && h.badges.length
            ? '<ul class="hero__badges" aria-label="Đặc điểm chính">' +
                h.badges.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
            : '') +
        '</div>' +
      '</div>' +
      '<a class="hero__scroll-hint" href="#tong-quan" aria-label="Cuộn xuống"><span></span></a>' +
    '</section>';
  }

  // Header tiêu đề chung của section
  function head(eyebrow, title, id, opt) {
    var center = (opt && opt.center) ? ' section__head--center' : '';
    var eb = (opt && opt.light) ? 'eyebrow eyebrow--light' : 'eyebrow';
    return '<header class="section__head' + center + '" data-reveal>' +
      '<p class="' + eb + '">' + txt(eyebrow) + '</p>' +
      '<h2 class="section__title" id="' + id + '">' + esc(title) + '</h2></header>';
  }

  function buildExecutive(C) {
    var e = C.executive;
    var lead = e.lead ? '<p class="section__lead" data-reveal>' + esc(e.lead) + '</p>' : '';
    var stats = (e.stats && e.stats.length)
      ? '<div class="stats" data-reveal>' + e.stats.map(function (s) {
          return '<div class="stat"><span class="stat__num">' + esc(s.num) + '</span>' +
                 '<span class="stat__label">' + esc(s.label) + '</span></div>';
        }).join('') + '</div>'
      : '';
    return '<section class="section" id="tong-quan" aria-labelledby="tong-quan-title">' +
      '<div class="container">' + head(e.eyebrow, e.title, 'tong-quan-title') +
        lead + stats +
        '<div class="grid grid--3">' +
          e.cards.map(function (c) {
            return '<article class="card" data-reveal>' +
              '<span class="card__index">' + esc(c.index) + '</span>' +
              '<h3 class="card__title">' + esc(c.title) + '</h3>' +
              '<p>' + esc(c.body) + '</p></article>';
          }).join('') +
        '</div></div></section>';
  }

  function buildStudio(C) {
    var s = C.studio, m = s.media || {};
    var mainMedia = m.main
      ? '<div class="media">' + slot(m.main.image, { cls: 'image-slot--4x3' }) +
          '<p class="media__cap">' + esc(m.main.caption) + '</p></div>'
      : '';
    var rowMedia = (m.row && m.row.length)
      ? '<div class="media-row">' + m.row.map(function (r) {
          return '<div class="media">' + slot(r.image, { cls: 'image-slot--4x3' }) +
                 '<p class="media__cap">' + esc(r.caption) + '</p></div>';
        }).join('') + '</div>'
      : '';
    return '<section class="section section--alt" id="studio" aria-labelledby="studio-title">' +
      '<div class="container">' + head(s.eyebrow, s.title, 'studio-title') +
        '<div class="split"><div class="split__text" data-reveal>' +
          '<ul class="bullet-list">' + s.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
          '<dl class="facts">' + s.facts.map(function (f) {
            return '<div class="facts__row"><dt>' + esc(f.k) + '</dt><dd>' + txt(f.v) + '</dd></div>';
          }).join('') + '</dl>' +
        '</div>' +
        '<div class="split__media" data-reveal>' + mainMedia + rowMedia + '</div>' +
      '</div></div></section>';
  }

  function buildProduct(C) {
    var p = C.product;
    return '<section class="section" id="san-pham" aria-labelledby="san-pham-title">' +
      '<div class="container">' + head(p.eyebrow, p.title, 'san-pham-title') +
        '<div class="prose" data-reveal>' + p.paragraphs.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>' +
        '<div class="info-grid" data-reveal>' +
          p.specs.map(function (s) {
            return '<div class="info-grid__item' + (s.wide ? ' info-grid__item--wide' : '') + '">' +
              '<span class="info-grid__k">' + esc(s.k) + '</span>' +
              '<span class="info-grid__v">' + txt(s.v) + '</span></div>';
          }).join('') +
        '</div>' +
        '<div class="gallery gallery--3" data-reveal>' + p.gallery.map(galleryItem).join('') + '</div>' +
      '</div></section>';
  }

  function buildGameplay(C) {
    var g = C.gameplay;
    var arrow = '<li class="flow__arrow" aria-hidden="true"><svg viewBox="0 0 24 24">' +
      '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></li>';
    var steps = g.steps.map(function (s, i) {
      var step = '<li class="flow__step' + (s.accent ? ' flow__step--accent' : '') + '">' +
        '<span class="flow__num">' + esc(s.num) + '</span>' +
        '<span class="flow__label">' + esc(s.label) + '</span></li>';
      return (i > 0 ? arrow : '') + step;
    }).join('');
    return '<section class="section section--dark" id="gameplay" aria-labelledby="gameplay-title">' +
      '<div class="container">' + head(g.eyebrow, g.title, 'gameplay-title', { center: true, light: true }) +
        '<ol class="flow" data-reveal>' + steps + '</ol>' +
        '<p class="prose prose--center prose--light" data-reveal>' + esc(g.note) + '</p>' +
      '</div></section>';
  }

  function buildSystems(C) {
    var sy = C.systems;
    return '<section class="section" id="he-thong" aria-labelledby="he-thong-title">' +
      '<div class="container">' + head(sy.eyebrow, sy.title, 'he-thong-title') +
        '<div class="grid grid--3 grid--systems">' +
          sy.groups.map(function (grp) {
            return '<article class="syscard" data-reveal>' +
              '<h3 class="syscard__title">' + esc(grp.title) + '</h3>' +
              '<ul class="check-list">' + grp.items.map(li).join('') + '</ul></article>';
          }).join('') +
          '<article class="syscard syscard--media" data-reveal>' +
            slot(sy.mediaCard.image, { cls: 'image-slot--4x3' }) +
            '<p class="media__cap">' + esc(sy.mediaCard.caption) + '</p></article>' +
        '</div>' +
        '<div class="gallery gallery--2 mt-lg" data-reveal>' + sy.gallery.map(galleryItem).join('') + '</div>' +
      '</div></section>';
  }

  function buildGallery(C) {
    var ga = C.gallery;
    return '<section class="section section--alt" id="thu-vien" aria-labelledby="thu-vien-title">' +
      '<div class="container">' + head(ga.eyebrow, ga.title, 'thu-vien-title') +
        '<div class="gallery gallery--3" data-reveal>' + ga.items.map(galleryItem).join('') + '</div>' +
      '</div></section>';
  }

  function buildTechnical(C) {
    var t = C.technical;
    var cards = '<div class="grid grid--2 grid--tech">' +
      t.cards.map(function (c) {
        return '<article class="techcard"><h3 class="techcard__title">' + esc(c.title) + '</h3>' +
          '<ul class="dash-list">' + c.items.map(li).join('') + '</ul></article>';
      }).join('') + '</div>';
    var body;
    if (t.media) {
      body = '<div class="split split--reverse">' +
        '<div class="split__text" data-reveal>' + cards + '</div>' +
        '<div class="split__media" data-reveal><div class="media">' +
          slot(t.media.image, { cls: 'image-slot--4x3' }) +
          '<p class="media__cap">' + esc(t.media.caption) + '</p></div></div>' +
      '</div>';
    } else {
      body = '<div data-reveal>' + cards + '</div>';
    }
    return '<section class="section" id="ky-thuat" aria-labelledby="ky-thuat-title">' +
      '<div class="container">' + head(t.eyebrow, t.title, 'ky-thuat-title') +
        '<div class="prose" data-reveal><p>' + esc(t.intro) + '</p></div>' +
        body +
      '</div></section>';
  }

  function buildMonetization(C) {
    var m = C.monetization;
    return '<section class="section section--alt" id="doanh-thu" aria-labelledby="doanh-thu-title">' +
      '<div class="container">' + head(m.eyebrow, m.title, 'doanh-thu-title') +
        '<div class="prose" data-reveal><p>' + esc(m.intro) + '</p></div>' +
        '<div class="split split--top">' +
          '<div class="split__text" data-reveal>' +
            '<h3 class="subhead">' + esc(m.tagsTitle) + '</h3>' +
            '<ul class="tag-list">' + m.tags.map(li).join('') + '</ul></div>' +
          '<div class="split__text" data-reveal>' +
            '<h3 class="subhead">' + esc(m.principlesTitle) + '</h3>' +
            '<ul class="check-list">' + m.principles.map(li).join('') + '</ul></div>' +
        '</div></div></section>';
  }

  function buildRoadmap(C) {
    var r = C.roadmap;
    return '<section class="section" id="roadmap" aria-labelledby="roadmap-title">' +
      '<div class="container">' + head(r.eyebrow, r.title, 'roadmap-title') +
        '<ol class="timeline">' +
          r.phases.map(function (p) {
            return '<li class="timeline__item" data-reveal>' +
              '<span class="timeline__dot">' + esc(p.num) + '</span>' +
              '<div class="timeline__body"><h3 class="timeline__title">' + esc(p.title) + '</h3>' +
              '<p>' + esc(p.body) + '</p></div></li>';
          }).join('') +
        '</ol>' +
        (r.media
          ? '<div class="media media--wide" data-reveal>' + slot(r.media.image, { cls: 'image-slot--wide' }) +
              '<p class="media__cap">' + esc(r.media.caption) + '</p></div>'
          : '') +
      '</div></section>';
  }

  function buildCooperation(C) {
    var co = C.cooperation;
    return '<section class="section section--dark" id="hop-tac" aria-labelledby="hop-tac-title">' +
      '<div class="container">' + head(co.eyebrow, co.title, 'hop-tac-title', { center: true, light: true }) +
        '<div class="duo">' +
          co.columns.map(function (col) {
            return '<article class="duo__col" data-reveal>' +
              '<h3 class="duo__title"><span class="duo__chip' + (col.variant === 'gold' ? ' duo__chip--gold' : '') + '">' +
                esc(col.chip) + '</span></h3>' +
              '<ul class="check-list check-list--light">' + col.items.map(li).join('') + '</ul></article>';
          }).join('') +
        '</div>' +
        '<p class="note note--light" data-reveal>' + esc(co.note) + '</p>' +
      '</div></section>';
  }

  function buildProcess(C) {
    var pr = C.process;
    return '<section class="section" id="quy-trinh" aria-labelledby="quy-trinh-title">' +
      '<div class="container">' + head(pr.eyebrow, pr.title, 'quy-trinh-title') +
        '<div class="split split--top">' +
          '<div class="split__text" data-reveal>' +
            '<ol class="steps">' +
              pr.steps.map(function (s, i) {
                return '<li><span class="steps__n">' + (i + 1) + '</span> ' + esc(s) + '</li>';
              }).join('') +
            '</ol>' +
            '<p class="prose mt-md">' + esc(pr.note) + '</p></div>' +
          '<div class="split__media" data-reveal><div class="media media--qr">' +
            slot(pr.media.image, { cls: 'image-slot--qr' }) +
            '<p class="media__cap">' + esc(pr.media.caption) + '</p></div></div>' +
        '</div></div></section>';
  }

  function buildLegal(C) {
    var l = C.legal;
    return '<section class="section section--legal" id="phap-ly" aria-labelledby="phap-ly-title">' +
      '<div class="container container--narrow">' + head(l.eyebrow, l.title, 'phap-ly-title') +
        '<div class="prose" data-reveal>' + l.paragraphs.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>' +
        '<div class="panel" data-reveal>' +
          '<h3 class="panel__title">' + esc(l.optionsTitle) + '</h3>' +
          '<ul class="dash-list dash-list--2col">' + l.options.map(li).join('') + '</ul></div>' +
        '<p class="note" data-reveal>' + esc(l.note) + '</p>' +
      '</div></section>';
  }

  function buildContact(C) {
    var ct = C.contact;
    return '<section class="section section--contact" id="lien-he" aria-labelledby="lien-he-title">' +
      '<div class="container">' + head(ct.eyebrow, ct.title, 'lien-he-title', { center: true, light: true }) +
        '<div class="prose prose--center prose--light" data-reveal>' +
          ct.paragraphs.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>' +
        '<div class="cta-banner" data-reveal><p class="cta-banner__text">' +
          '<strong>' + esc(ct.ctaBanner.strong) + '</strong> ' + esc(ct.ctaBanner.text) + '</p></div>' +
        contactBlock(ct) +
      '</div></section>';
  }

  // Khối liên hệ — QR và logos là TÙY CHỌN (không có thì bỏ qua, không lỗi)
  function contactBlock(ct) {
    var info = '<div class="contact__info"><dl class="facts facts--light">' +
      ct.fields.map(function (f) {
        return '<div class="facts__row"><dt>' + esc(f.k) + '</dt><dd>' + txt(f.v, { inline: true }) + '</dd></div>';
      }).join('') + '</dl></div>';
    var qr = ct.qr
      ? '<div class="media media--qr">' + slot(ct.qr.image, { cls: 'image-slot--qr' }) +
          '<p class="media__cap media__cap--light">' + esc(ct.qr.caption) + '</p></div>'
      : '';
    var logos = (ct.logos && ct.logos.length)
      ? '<div class="contact__logos">' +
          ct.logos.map(function (fn) { return slot(fn, { cls: 'image-slot--logo' }); }).join('') + '</div>'
      : '';
    var media = (qr || logos) ? '<div class="contact__media">' + qr + logos + '</div>' : '';
    var cls = media ? 'contact' : 'contact contact--solo';
    return '<div class="' + cls + '" data-reveal>' + info + media + '</div>';
  }

  function buildFooter(C) {
    var f = C.footer, b = C.meta.brand;
    var year = new Date().getFullYear();
    return '<div class="container site-footer__inner">' +
      '<div class="site-footer__brand">' +
        '<span class="brand__name brand__name--light">' + esc(b.lead) + ' <strong>' + esc(b.strong) + '</strong></span>' +
        '<p class="site-footer__tag">' + esc(f.tagline) + '</p></div>' +
      '<p class="site-footer__copy">© ' + txt(f.copyrightCompany, { inline: true }) + ' — ' + year + '. ' + esc(f.copyrightSuffix) + '</p>' +
    '</div>';
  }

  // Thứ tự các section trên trang
  var SECTION_BUILDERS = [
    buildHero, buildExecutive, buildStudio, buildProduct, buildGameplay,
    buildSystems, buildGallery, buildTechnical, buildMonetization, buildRoadmap,
    buildCooperation, buildProcess, buildLegal, buildContact
  ];

  /* ---------------- META (title / mô tả / theme-color) ---------------- */
  function setMeta(name, content) {
    if (content == null) return;
    var el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function applyMeta(C) {
    var m = C.meta || {};
    if (m.lang) document.documentElement.lang = m.lang;
    if (m.title) document.title = m.title;
    setMeta('description', m.description);
    setMeta('theme-color', m.themeColor);
  }

  /* ---------------- RENDER TỔNG ---------------- */
  function render() {
    var C = window.SITE_CONTENT;
    var main = document.getElementById('main');
    if (!C) {
      if (main) main.innerHTML = '<p style="padding:3rem;text-align:center;color:#a33">' +
        'Không tìm thấy nội dung (content.js). Kiểm tra file assets/js/content.js.</p>';
      return false;
    }
    applyMeta(C);
    var header = document.getElementById('siteHeader');
    var footer = document.getElementById('siteFooter');
    if (header) header.innerHTML = buildHeader(C);
    if (main) main.innerHTML = SECTION_BUILDERS.map(function (fn) { return fn(C); }).join('');
    if (footer) footer.innerHTML = buildFooter(C);
    return true;
  }

  /* ================= HÀNH VI (sau khi render) ================= */

  /* 1. Image placeholder — phát hiện ảnh thật / ảnh thiếu */
  function initImageSlots() {
    document.querySelectorAll('.image-slot').forEach(function (s) {
      var img = s.querySelector('img');
      if (!img) return;
      var loaded = function () { if (img.naturalWidth > 0) { s.classList.add('is-loaded'); s.classList.remove('is-missing'); } };
      var missing = function () { s.classList.add('is-missing'); s.classList.remove('is-loaded'); };
      if (img.complete) { (img.naturalWidth > 0) ? loaded() : missing(); }
      img.addEventListener('load', loaded);
      img.addEventListener('error', missing);
    });
  }

  /* 1b. Logo header — nếu ảnh logo lỗi: game -> hiện chữ; studio -> ẩn khối */
  function initHeaderLogos() {
    var brandLogo = document.querySelector('.brand__logo');
    if (brandLogo) {
      var fallbackBrand = function () {
        var name = brandLogo.parentNode && brandLogo.parentNode.querySelector('.brand__name');
        if (name) name.removeAttribute('hidden');
        brandLogo.remove();
      };
      brandLogo.addEventListener('error', fallbackBrand);
      if (brandLogo.complete && brandLogo.naturalWidth === 0) fallbackBrand();
    }
    var studioLogo = document.querySelector('.studio-logo');
    if (studioLogo) {
      var hideStudio = function () {
        var box = studioLogo.closest('.site-header__studio');
        if (box) box.style.display = 'none';
      };
      studioLogo.addEventListener('error', hideStudio);
      if (studioLogo.complete && studioLogo.naturalWidth === 0) hideStudio();
    }
  }

  /* 2. Mobile nav */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var list = document.getElementById('navList');
    if (!toggle || !list) return;
    var setOpen = function (open) {
      list.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    };
    toggle.addEventListener('click', function () { setOpen(!list.classList.contains('is-open')); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* 3. Scroll-spy — highlight menu đang xem */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-list a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {}, sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = link; sections.push(sec); }
    });
    var setActive = function (id) {
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (map[id]) map[id].classList.add('is-active');
    };
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (sec) { obs.observe(sec); });
  }

  /* 4. Thanh tiến trình đọc */
  function initProgress() {
    var fill = document.getElementById('progressFill');
    if (!fill) return;
    var update = function () {
      var doc = document.documentElement;
      var sc = doc.scrollHeight - doc.clientHeight;
      fill.style.width = (sc > 0 ? (doc.scrollTop / sc) * 100 : 0).toFixed(2) + '%';
    };
    onScroll(update); update();
  }

  /* 5. Back-to-top + 6. Header shadow */
  function initScrollUI() {
    var btn = document.getElementById('backToTop');
    var header = document.getElementById('siteHeader');
    var update = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (btn) {
        var show = y > 600;
        btn.classList.toggle('is-visible', show);
        show ? btn.removeAttribute('hidden') : btn.setAttribute('hidden', '');
      }
      if (header) header.classList.toggle('is-scrolled', y > 8);
    };
    if (btn) btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
    onScroll(update); update();
  }

  /* 7. Reveal on scroll */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); o.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* Helpers */
  function onScroll(cb) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(function () { cb(); ticking = false; }); }
    }, { passive: true });
  }
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------------- KHỞI TẠO ---------------- */
  function init() {
    try {
      if (!render()) return;
      initImageSlots();
      initHeaderLogos();
      initNav();
      initScrollSpy();
      initProgress();
      initScrollUI();
      initReveal();
    } catch (err) {
      // Lỗi thường do content.js sai cú pháp — báo rõ ra console
      console.error('[main.js] Lỗi khi render nội dung:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
