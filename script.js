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
    if (el.getBoundingClientRect().top < vh - 40) {
      el.classList.add("visible");
    }
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
      d.tags.forEach(function (t) {
        var s = document.createElement("span");
        s.textContent = t;
        tags.appendChild(s);
      });
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
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
    btn.textContent = "Mengirim...";
    btn.disabled = true;
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
var navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", function () {
  var pos = window.scrollY + 100;
  sections.forEach(function (s) {
    var link = document.querySelector('.nav-links a[href="#' + s.id + '"]');
    if (link) link.classList.toggle("active", pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight);
  });
}, { passive: true });
