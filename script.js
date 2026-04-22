"use strict";

/* ── 1. THEME TOGGLE ── */
var html = document.documentElement;
var themeBtn = document.getElementById("theme-toggle");
var saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ── 2. NAVBAR SCROLL & BURGER ── */
var navbar = document.getElementById("navbar");
var burger = document.getElementById("burger");
var mobileMenu = document.getElementById("mobile-menu");
window.addEventListener("scroll", function () {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });
if (burger && mobileMenu) {
  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });
}

/* ── 3. REVEAL ON SCROLL ── */
var reveals = document.querySelectorAll(".reveal");
function doReveal() {
  var vh = window.innerHeight;
  reveals.forEach(function (el) {
    if (el.getBoundingClientRect().top < vh - 40) el.classList.add("visible");
  });
}
doReveal();
window.addEventListener("scroll", doReveal, { passive: true });
window.addEventListener("load", doReveal);

/* ── 4. TYPING ANIMATION ── */
var typedEl = document.getElementById("typed-text");
if (typedEl) {
  var phrases = ["web experiences.", "clean interfaces.", "fast frontends.", "modern UIs."];
  var ci = 0, pi = 0, del = false;
  function tick() {
    var phrase = phrases[pi];
    if (!del) {
      typedEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { del = true; setTimeout(tick, 1800); return; }
    } else {
      typedEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, del ? 55 : 95);
  }
  setTimeout(tick, 800);
}

/* ── 5. SKILL BARS ── */
function animateBars() {
  document.querySelectorAll(".skill-bar-fill").forEach(function (bar) {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.width + "%";
    }
  });
}
animateBars();
window.addEventListener("scroll", animateBars, { passive: true });

/* ── 6. SKILL MODAL ── */
var modal = document.getElementById("skill-modal");
var modalClose = document.getElementById("modal-close");
var SKILLS = {
  html:  { emoji:"🌐", title:"HTML",       level:"90% — Mahir",    desc:"Bahasa dasar struktur setiap halaman web. Fondasi utama seorang web developer.", tags:["Semantik","Form","SEO","Aksesibilitas"] },
  css:   { emoji:"🎨", title:"CSS",        level:"80% — Mahir",    desc:"Mengatur tampilan visual: warna, layout, animasi, dan responsivitas di semua layar.", tags:["Flexbox","Grid","Animasi","Responsif"] },
  js:    { emoji:"⚡", title:"JavaScript", level:"70% — Menengah", desc:"Membuat halaman interaktif: klik, API, validasi form, dan fitur dinamis lainnya.", tags:["DOM","ES6+","Fetch","Async/Await"] },
  react: { emoji:"⚛️", title:"React",      level:"60% — Menengah", desc:"Library UI berbasis komponen dari Meta. Kode lebih terorganisir dan bisa dipakai ulang.", tags:["Hooks","State","Props","JSX"] },
  git:   { emoji:"🐙", title:"Git",        level:"75% — Mahir",    desc:"Version control untuk kolaborasi tim, riwayat perubahan, branching, dan rollback.", tags:["Commit","Branch","Merge","GitHub"] },
  figma: { emoji:"✏️", title:"Figma",      level:"65% — Menengah", desc:"Desain UI/UX untuk wireframe, mockup, dan prototipe. Membantu mengimplementasi desain ke kode.", tags:["Wireframe","Mockup","Prototipe","Auto Layout"] }
};
if (modal && modalClose) {
  document.querySelectorAll(".skill-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var d = SKILLS[card.dataset.skill];
      if (!d) return;
      document.getElementById("modal-icon").textContent = d.emoji;
      document.getElementById("modal-title-text").textContent = d.title;
      document.getElementById("modal-level").textContent = d.level;
      document.getElementById("modal-desc").textContent = d.desc;
      var tags = document.getElementById("modal-tags");
      tags.innerHTML = "";
      d.tags.forEach(function (t) { var s = document.createElement("span"); s.textContent = t; tags.appendChild(s); });
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  function closeModal() { modal.classList.remove("open"); document.body.style.overflow = ""; }
  modalClose.addEventListener("click", closeModal);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
}

/* ── 7. CONTACT FORM ── */
var form = document.getElementById("contact-form");
var note = document.getElementById("form-note");
if (form && note) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var msg = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !msg) { note.style.color = "var(--coral)"; note.textContent = "Mohon isi semua kolom."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.style.color = "var(--coral)"; note.textContent = "Format email tidak valid."; return; }
    var btn = form.querySelector(".form-submit");
    btn.textContent = "Mengirim..."; btn.disabled = true;
    setTimeout(function () {
      note.style.color = "var(--teal)";
      note.textContent = "✓ Pesan terkirim! Saya akan segera membalas.";
      form.reset();
      btn.innerHTML = 'Kirim Pesan <span class="btn-arrow">→</span>';
      btn.disabled = false;
    }, 1200);
  });
}

/* ── 8. FOOTER YEAR ── */
var yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── 9. NAV ACTIVE LINK ── */
var sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", function () {
  var pos = window.scrollY + 100;
  sections.forEach(function (s) {
    var link = document.querySelector('.nav-links a[href="#' + s.id + '"]');
    if (link) link.classList.toggle("active", pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight);
  });
}, { passive: true });

/* ── 10. KINETIC SOUL — Live Canvas Preview ──
   FIX: canvas diisi background hitam #050508 sejak awal
   FIX: IntersectionObserver trigger langsung resize + fill background
   sehingga tidak ada "layar hitam kosong" sebelum partikel muncul
── */
(function () {
  var canvas = document.getElementById("ks-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, dpr = 1;
  var particles = [], noiseT = 0, rafId = null, started = false;
  var PALETTE = ["#ff006e","#ff4da6","#8338ec","#a855f7","#3a86ff","#60a5fa","#ff85c2"];
  var MAX = 120;

  /* FIX: isi canvas dengan warna background sebelum animasi mulai */
  function fillBg() {
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var wrap = canvas.parentElement;
    W = wrap.clientWidth || 400;
    H = wrap.clientHeight || 200;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    fillBg(); /* FIX: isi background langsung setelah resize */
  }

  function noise(x, y) {
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    var xf = x - Math.floor(x), yf = y - Math.floor(y);
    var u = xf*xf*xf*(xf*(xf*6-15)+10), v = yf*yf*yf*(yf*(yf*6-15)+10);
    var h1=(X*374761393+Y*668265263)&0x7FFFFFFF, h2=((X+1)*374761393+Y*668265263)&0x7FFFFFFF;
    var h3=(X*374761393+(Y+1)*668265263)&0x7FFFFFFF, h4=((X+1)*374761393+(Y+1)*668265263)&0x7FFFFFFF;
    var g = function(h, px, py) {
      h = h & 3;
      var gx = h < 2 ? (h === 0 ? 1 : -1) : 0;
      var gy = h >= 2 ? (h === 2 ? 1 : -1) : 0;
      return gx * px + gy * py;
    };
    return (1-u)*(1-v)*g(h1,xf,yf) + u*(1-v)*g(h2,xf-1,yf) + (1-u)*v*g(h3,xf,yf-1) + u*v*g(h4,xf-1,yf-1);
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.vx = 0; this.vy = 0;
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.alpha = 0.5 + Math.random() * 0.5;
    this.r = 1 + Math.random() * 2;
    this.noiseOff = Math.random() * 1000;
    this.trail = [];
    this.orbitA = Math.random() * Math.PI * 2;
    this.orbitR = 30 + Math.random() * Math.min(W, H) * 0.35;
    this.orbitSpd = (0.0004 + Math.random() * 0.0007) * (Math.random() < 0.5 ? 1 : -1);
  };

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < MAX; i++) particles.push(new Particle());
  }

  var lastT = 0;
  function loop(ts) {
    rafId = requestAnimationFrame(loop);
    var dt = Math.min((ts - lastT) / 16.67, 3);
    lastT = ts;
    noiseT += 0.0015;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(5,5,8,0.18)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    var cx = W / 2, cy = H / 2;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.orbitA += p.orbitSpd * dt;
      var n = noise((p.x/W)*3 + noiseT + p.noiseOff, (p.y/H)*3 + noiseT * 0.7);
      var flowA = n * Math.PI * 4;
      var tx = cx + Math.cos(p.orbitA) * p.orbitR;
      var ty = cy + Math.sin(p.orbitA) * p.orbitR;
      p.vx += (tx - p.x) * 0.016 * dt + Math.cos(flowA) * 0.25;
      p.vy += (ty - p.y) * 0.016 * dt + Math.sin(flowA) * 0.25;
      p.vx *= 0.93; p.vy *= 0.93;
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 12) p.trail.shift();
      p.x += p.vx * dt; p.y += p.vy * dt;

      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (var t = 1; t < p.trail.length; t++) ctx.lineTo(p.trail[t].x, p.trail[t].y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.lineWidth = p.r * 0.7;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  /* FIX: langsung resize + fillBg saat load agar tidak blank hitam */
  (function earlyInit() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var wrap = canvas.parentElement;
    if (wrap && wrap.clientWidth > 0) {
      W = wrap.clientWidth; H = wrap.clientHeight || 220;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      fillBg();
    }
  })();

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !started) {
          started = true;
          init(); /* re-init dengan ukuran yang sudah benar */
          rafId = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && started) {
          cancelAnimationFrame(rafId);
          rafId = null;
          started = false;
        }
      });
    }, { threshold: 0.05 }); /* FIX: threshold lebih kecil agar trigger lebih awal */
    obs.observe(canvas);
  } else {
    init();
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", function () {
    if (started && rafId) { cancelAnimationFrame(rafId); init(); rafId = requestAnimationFrame(loop); }
    else { fillBg(); } /* FIX: tetap isi background saat resize meski belum started */
  }, { passive: true });
})();
