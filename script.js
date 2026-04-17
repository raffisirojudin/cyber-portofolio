/* ═══════════════════════════════════════
   PORTFOLIO SCRIPT — Takisozu
═══════════════════════════════════════ */

"use strict";

/* ──────────────────────────────────────
   1. CUSTOM CURSOR
────────────────────────────────────── */
(function initCursor() {
  var dot = document.getElementById("cursor-dot");
  var ring = document.getElementById("cursor-ring");
  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var rx = mx, ry = my;

  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  var hoverEls = document.querySelectorAll("a, button, .skill-card, .proj-card, .pf-card, input, textarea");
  hoverEls.forEach(function (el) {
    el.addEventListener("mouseenter", function () { ring.classList.add("hovered"); });
    el.addEventListener("mouseleave", function () { ring.classList.remove("hovered"); });
  });

  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    dot.style.opacity = "1";
    ring.style.opacity = "0.7";
  });
})();

/* ──────────────────────────────────────
   2. PARTICLE CANVAS
────────────────────────────────────── */
(function initParticles() {
  var canvas = document.getElementById("particles-canvas");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var COUNT = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function getAccentColor() {
    var isDark = document.documentElement.getAttribute("data-theme") !== "light";
    return isDark ? "123, 110, 246" : "101, 87, 245";
  }

  for (var i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.05
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var color = getAccentColor();

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + color + "," + p.alpha + ")";
      ctx.fill();
    });

    // Draw connections
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = "rgba(" + color + "," + (0.08 * (1 - dist / 120)) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

/* ──────────────────────────────────────
   3. DARK / LIGHT MODE TOGGLE
────────────────────────────────────── */
(function initTheme() {
  var btn = document.getElementById("theme-toggle");
  var html = document.documentElement;

  var saved = localStorage.getItem("theme");
  if (saved) html.setAttribute("data-theme", saved);

  btn.addEventListener("click", function () {
    var current = html.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

/* ──────────────────────────────────────
   4. NAVBAR: scroll + active + burger
────────────────────────────────────── */
(function initNavbar() {
  var navbar = document.getElementById("navbar");
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobile-menu");
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  // Scrolled state
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveLink();
  }, { passive: true });

  // Active link on scroll
  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (a) { a.classList.remove("active"); });
        var match = document.querySelector('.nav-links a[href="#' + section.id + '"]');
        if (match) match.classList.add("active");
      }
    });
  }

  // Burger
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
})();

/* ──────────────────────────────────────
   5. TYPING ANIMATION — HERO
────────────────────────────────────── */
(function initTyping() {
  var el = document.getElementById("typed-text");
  var phrases = [
    "web experiences.",
    "clean interfaces.",
    "fast frontends.",
    "modern UIs.",
    "responsive apps."
  ];
  var current = 0;
  var charIndex = 0;
  var isDeleting = false;
  var pause = false;

  function type() {
    var phrase = phrases[current];

    if (!isDeleting) {
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        pause = true;
        setTimeout(function () {
          pause = false;
          isDeleting = true;
          type();
        }, 1800);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        current = (current + 1) % phrases.length;
      }
    }

    var speed = isDeleting ? 55 : 95;
    setTimeout(type, speed);
  }

  setTimeout(type, 600);
})();

/* ──────────────────────────────────────
   6. SCROLL REVEAL
────────────────────────────────────── */
(function initReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = el.dataset.delay || 0;
        setTimeout(function () {
          el.classList.add("visible");
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  // Stagger reveals in grid/list
  document.querySelectorAll(".skills-grid .skill-card, .projects-other .proj-card, .about-stats .stat-box").forEach(function (el, i) {
    el.dataset.delay = i * 80;
  });

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
})();

/* ──────────────────────────────────────
   7. SKILL BARS — animate on reveal
────────────────────────────────────── */
(function initSkillBars() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var w = bar.getAttribute("data-width");
        setTimeout(function () {
          bar.style.width = w + "%";
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".skill-bar-fill").forEach(function (bar) {
    observer.observe(bar);
  });
})();

/* ──────────────────────────────────────
   8. SKILL MODAL
────────────────────────────────────── */
(function initSkillModal() {
  var modal = document.getElementById("skill-modal");
  var backdrop = modal.querySelector(".modal-backdrop");
  var closeBtn = document.getElementById("modal-close");

  var SKILL_DATA = {
    html: {
      emoji: "🌐", title: "HTML", level: "90% — Mahir",
      desc: "HyperText Markup Language adalah bahasa dasar pembentuk struktur setiap halaman web. Semua elemen yang terlihat — teks, gambar, form, tombol — semuanya ditulis dengan HTML. Ini adalah skill pertama yang harus dikuasai setiap web developer.",
      tags: ["Struktur", "Semantik", "Form", "Aksesibilitas", "SEO"]
    },
    css: {
      emoji: "🎨", title: "CSS", level: "80% — Mahir",
      desc: "Cascading Style Sheets mengatur tampilan visual halaman web. Dengan CSS kamu bisa mengatur warna, font, layout, animasi, dan membuat tampilan yang responsif di semua ukuran layar mulai dari HP hingga desktop.",
      tags: ["Flexbox", "Grid", "Animasi", "Responsif", "Variables"]
    },
    js: {
      emoji: "⚡", title: "JavaScript", level: "70% — Menengah",
      desc: "JavaScript adalah bahasa pemrograman yang membuat halaman web menjadi interaktif. Dengan JS kamu bisa merespons klik, mengambil data dari API, membuat animasi, validasi form, dan membangun fitur-fitur dinamis.",
      tags: ["DOM", "ES6+", "Fetch", "Event", "Async/Await"]
    },
    react: {
      emoji: "⚛️", title: "React", level: "60% — Menengah",
      desc: "React adalah library JavaScript buatan Meta untuk membangun UI berbasis komponen. Dengan React kamu bisa memecah tampilan menjadi bagian-bagian kecil yang bisa dipakai ulang, sehingga kode lebih terorganisir.",
      tags: ["Component", "Hooks", "State", "Props", "JSX"]
    },
    git: {
      emoji: "🐙", title: "Git", level: "75% — Mahir",
      desc: "Git adalah sistem version control untuk mencatat setiap perubahan kode. Dengan Git kamu bisa bekerja sama dengan tim, menyimpan riwayat perubahan, membuat branch, dan rollback jika ada kesalahan.",
      tags: ["Commit", "Branch", "Merge", "GitHub", "Pull Request"]
    },
    figma: {
      emoji: "✏️", title: "Figma", level: "65% — Menengah",
      desc: "Figma adalah aplikasi desain UI/UX berbasis web untuk membuat wireframe, mockup, dan prototipe interaktif. Memahami Figma membantu developer membaca desain dan mengimplementasikannya ke kode secara akurat.",
      tags: ["Wireframe", "Mockup", "Prototipe", "Komponen", "Auto Layout"]
    }
  };

  function openModal(key) {
    var data = SKILL_DATA[key];
    if (!data) return;
    document.getElementById("modal-icon").textContent = data.emoji;
    document.getElementById("modal-title-text").textContent = data.title;
    document.getElementById("modal-level").textContent = data.level;
    document.getElementById("modal-desc").textContent = data.desc;
    var tagsEl = document.getElementById("modal-tags");
    tagsEl.innerHTML = "";
    data.tags.forEach(function (tag) {
      var span = document.createElement("span");
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".skill-card").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card.dataset.skill); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") openModal(card.dataset.skill);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();

/* ──────────────────────────────────────
   9. CONTACT FORM — basic validation
────────────────────────────────────── */
(function initContactForm() {
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      note.style.color = "var(--coral)";
      note.textContent = "Mohon isi semua kolom.";
      return;
    }

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      note.style.color = "var(--coral)";
      note.textContent = "Format email tidak valid.";
      return;
    }

    // Simulate send — replace with actual backend/FormSubmit/EmailJS
    var btn = form.querySelector(".form-submit");
    btn.textContent = "Mengirim...";
    btn.disabled = true;

    setTimeout(function () {
      note.style.color = "var(--teal)";
      note.textContent = "✓ Pesan terkirim! Saya akan membalas segera.";
      form.reset();
      btn.innerHTML = 'Kirim Pesan <span class="btn-arrow">→</span>';
      btn.disabled = false;
    }, 1200);
  });
})();

/* ──────────────────────────────────────
   10. FOOTER YEAR
────────────────────────────────────── */
(function setYear() {
  var el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
})();

console.log("%c Rafi Sirojudin Portfolio ", "background:#7b6ef6;color:#fff;font-family:monospace;font-size:14px;padding:4px 8px;border-radius:4px;");
