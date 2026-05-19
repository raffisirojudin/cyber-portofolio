"use strict";

/* ─── PAGE LOADER ─────────────────────────────────── */
(function () {
  var loader = document.getElementById("page-loader");
  var bar = document.querySelector(".loader-bar");
  if (!loader) return;
  var prog = 0;
  var iv = setInterval(function () {
    prog += Math.random() * 18;
    if (prog > 90) prog = 90;
    if (bar) bar.style.width = prog + "%";
  }, 80);
  function hideLoader() {
    clearInterval(iv);
    if (bar) bar.style.width = "100%";
    setTimeout(function () {
      loader.classList.add("loader-done");
      setTimeout(function () {
        loader.style.display = "none";
      }, 600);
    }, 300);
  }
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }
  setTimeout(hideLoader, 3000);
})();

/* ─── THEME TOGGLE ────────────────────────────────── */
var html = document.documentElement;
var themeBtn = document.getElementById("theme-toggle");
var saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeBtn.setAttribute(
      "aria-label",
      "Switch to " + (next === "dark" ? "light" : "dark") + " theme",
    );
  });
}

/* ─── NAVBAR SCROLL & BURGER ──────────────────────── */
var navbar = document.getElementById("navbar");
var burger = document.getElementById("burger");
var mobileMenu = document.getElementById("mobile-menu");

window.addEventListener(
  "scroll",
  function () {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
  },
  { passive: true },
);

if (burger && mobileMenu) {
  burger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    burger.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu navigasi",
    );
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Buka menu navigasi");
    });
  });
}

/* ─── REVEAL ON SCROLL ────────────────────────────── */
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

/* ─── TYPING ANIMATION ────────────────────────────── */
var typedEl = document.getElementById("typed-text");
if (typedEl) {
  var phrases = [
    "web experiences.",
    "clean interfaces.",
    "fast frontends.",
    "modern UIs.",
  ];
  var ci = 0,
    pi = 0,
    del = false;
  function tick() {
    var phrase = phrases[pi];
    if (!del) {
      typedEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        del = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      typedEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, del ? 55 : 95);
  }
  setTimeout(tick, 1200);
}

/* ─── SKILL BARS ──────────────────────────────────── */
/* ─── SKILLS SCROLL 3D ANIMATION ─────────────────────── */
(function () {
  var section = document.getElementById("skills");
  var card3d = document.getElementById("skills-card3d");
  var header = document.querySelector(".skills-header-block");
  if (!section || !card3d || !header) return;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function onSkillsScroll() {
    var rect = section.getBoundingClientRect();
    var total = section.offsetHeight - window.innerHeight;
    var prog = Math.max(0, Math.min(1, -rect.top / total));

    var rot = lerp(22, 0, prog);
    var sc = lerp(0.88, 1, prog);
    var hY = lerp(0, -50, prog);
    var hOp = Math.min(1, 0.6 + prog * 0.8);

    card3d.style.transform =
      "perspective(1200px) rotateX(" + rot + "deg) scale(" + sc + ")";
    header.style.transform = "translateY(" + hY + "px)";
    header.style.opacity = hOp;
  }

  window.addEventListener("scroll", onSkillsScroll, { passive: true });
  onSkillsScroll();
})();

/* ─── SKILL MODAL ─────────────────────────────────── */
var modal = document.getElementById("skill-modal");
var modalClose = document.getElementById("modal-close");
var SKILLS = {
  html: {
    emoji: "🌐",
    title: "HTML",
    level: "90% — Mahir",
    desc: "Bahasa dasar struktur setiap halaman web. Fondasi utama seorang web developer.",
    tags: ["Semantik", "Form", "SEO", "Aksesibilitas"],
  },
  css: {
    emoji: "🎨",
    title: "CSS",
    level: "80% — Mahir",
    desc: "Mengatur tampilan visual: warna, layout, animasi, dan responsivitas di semua layar.",
    tags: ["Flexbox", "Grid", "Animasi", "Responsif"],
  },
  js: {
    emoji: "⚡",
    title: "JavaScript",
    level: "70% — Menengah",
    desc: "Membuat halaman interaktif: klik, API, validasi form, dan fitur dinamis lainnya.",
    tags: ["DOM", "ES6+", "Fetch", "Async/Await"],
  },
  react: {
    emoji: "⚛️",
    title: "React",
    level: "60% — Menengah",
    desc: "Library UI berbasis komponen dari Meta. Kode lebih terorganisir dan bisa dipakai ulang.",
    tags: ["Hooks", "State", "Props", "JSX"],
  },
  git: {
    emoji: "🐙",
    title: "Git",
    level: "75% — Mahir",
    desc: "Version control untuk kolaborasi tim, riwayat perubahan, branching, dan rollback.",
    tags: ["Commit", "Branch", "Merge", "GitHub"],
  },
  figma: {
    emoji: "✏️",
    title: "Figma",
    level: "65% — Menengah",
    desc: "Desain UI/UX untuk wireframe, mockup, dan prototipe. Membantu mengimplementasi desain ke kode.",
    tags: ["Wireframe", "Mockup", "Prototipe", "Auto Layout"],
  },
};

/* Focus trap helper */
function trapFocus(el) {
  var focusable = el.querySelectorAll(
    'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
  );
  if (!focusable.length) return;
  var first = focusable[0],
    last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== "Tab") return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  el._trap = handler;
  el.addEventListener("keydown", handler);
  setTimeout(function () {
    var close = el.querySelector(
      '.modal-close,.cs-close,[aria-label*="Tutup"]',
    );
    if (close) close.focus();
  }, 80);
}
function releaseFocus(el) {
  if (el._trap) {
    el.removeEventListener("keydown", el._trap);
    delete el._trap;
  }
}

if (modal && modalClose) {
  var lastFocused = null;
  document.querySelectorAll(".skill-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var d = SKILLS[card.dataset.skill];
      if (!d) return;
      lastFocused = document.activeElement;
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
      trapFocus(modal);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    releaseFocus(modal);
    if (lastFocused) lastFocused.focus();
  }
  modalClose.addEventListener("click", closeModal);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
      if (window.closeCaseStudy) window.closeCaseStudy();
    }
  });
}

/* ─── CONTACT FORM ────────────────────────────────── */
var form = document.getElementById("contact-form");
var note = document.getElementById("form-note");
if (form && note) {
  var textarea = document.getElementById("cf-msg");
  if (textarea) {
    var MAX_CHARS = 500;
    textarea.setAttribute("maxlength", MAX_CHARS);
    var counter = document.createElement("span");
    counter.setAttribute("aria-live", "polite");
    counter.style.cssText =
      "position:absolute;bottom:10px;right:14px;font-family:var(--font-mono);font-size:.65rem;color:var(--text-3);pointer-events:none;transition:color .2s;";
    counter.textContent = "0 / " + MAX_CHARS;
    var fg = textarea.closest(".form-group");
    if (fg) {
      fg.style.position = "relative";
      fg.appendChild(counter);
    }
    textarea.addEventListener("input", function () {
      var n = textarea.value.length;
      counter.textContent = n + " / " + MAX_CHARS;
      counter.style.color =
        n > 450 ? "var(--coral)" : n > 350 ? "var(--gold)" : "var(--text-3)";
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var msg = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !msg) {
      note.style.color = "var(--coral)";
      note.textContent = "Mohon isi semua kolom.";
      announce("Error: Mohon isi semua kolom.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.style.color = "var(--coral)";
      note.textContent = "Format email tidak valid.";
      announce("Error: Format email tidak valid.");
      return;
    }
    var btn = form.querySelector(".form-submit");
    btn.textContent = "Mengirim…";
    btn.disabled = true;
    setTimeout(function () {
      note.style.color = "var(--teal)";
      note.textContent = "✓ Pesan terkirim! Saya akan segera membalas.";
      form.reset();
      btn.innerHTML = 'Kirim Pesan <span class="btn-arrow">→</span>';
      btn.disabled = false;
      announce("Pesan berhasil terkirim. Terima kasih!");
    }, 1200);
  });
}

/* ─── FOOTER YEAR & NAV ACTIVE ───────────────────── */
var yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
var sections = document.querySelectorAll("section[id]");
window.addEventListener(
  "scroll",
  function () {
    var pos = window.scrollY + 100;
    sections.forEach(function (s) {
      var link = document.querySelector('.nav-links a[href="#' + s.id + '"]');
      if (link)
        link.classList.toggle(
          "active",
          pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight,
        );
    });
  },
  { passive: true },
);

/* ─── BACK TO TOP PROGRESS RING ──────────────────── */
(function () {
  var btn = document.getElementById("back-top-ring");
  var fill = document.getElementById("btr-fill");
  if (!btn || !fill) return;
  var C = 2 * Math.PI * 15.9;
  fill.style.strokeDasharray = C;
  fill.style.strokeDashoffset = C;
  function updateRing() {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var progress = total > 0 ? scrolled / total : 0;
    fill.style.strokeDashoffset = C - C * progress;
    btn.classList.toggle("btr-visible", scrolled > 200);
  }
  window.addEventListener("scroll", updateRing, { passive: true });
  updateRing();
})();

/* ─── CASE STUDY MODAL ────────────────────────────── */
(function () {
  var CASE_STUDIES = {
    pyquest: {
      tag: "Game-Based Learning",
      tagColor: "#69F0AE",
      title: "PyQuest",
      problem:
        "Belajar Python sering terasa membosankan bagi pemula — tutorial teks panjang tanpa feedback instan, tidak ada motivasi untuk melanjutkan, dan tidak ada narasi yang membuat konsep terasa bermakna.",
      solution:
        "Platform belajar Python interaktif bergaya game RPG: 25 quest dengan narasi cerita, editor kode langsung di browser, mini Python interpreter client-side, sistem nyawa + XP + bintang, chapter boss, dan desain Minecraft pixel-art murni CSS.",
      result:
        "Platform lengkap dengan 5 chapter dan 25 level yang mengajarkan Python dari print() hingga fungsi. Interpreter Python mini berjalan 100% di browser tanpa server.",
      features: [
        "⚔ 25 Quest Level Terstruktur",
        "🐍 Mini Python Interpreter (client-side)",
        "❤️ Lives & XP System",
        "⭐ Star Rating per Quest",
        "🏆 Chapter Boss Battles",
        "🗺 Adventure Map Navigation",
        "🔊 8-bit Web Audio SFX",
        "🏰 Minecraft Pixel-Art UI (pure CSS)",
        "💾 Progress Tersimpan (LocalStorage)",
        "📱 Responsive — Mobile & Desktop",
      ],
      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Canvas API",
        "Web Audio API",
        "LocalStorage",
      ],
      previewBg: "linear-gradient(135deg,#0d1209,#0a0a15,#12090e)",
      previewEmoji: "⚔",
    },
    curtainbiz: {
      tag: "Featured Project",
      tagColor: "var(--accent)",
      title: "CurtainBiz Manager",
      problem:
        "Pemilik bisnis curtain kesulitan melacak pesanan, stok, dan keuangan secara manual menggunakan spreadsheet. Data tercecer, laporan HPP tidak akurat, dan tidak ada visibilitas real-time.",
      solution:
        "Membangun sistem manajemen berbasis web dengan dashboard KPI real-time, manajemen pesanan multi-channel, alert stok otomatis, dan kalkulator HPP terintegrasi menggunakan HTML, CSS, JavaScript, dan Supabase sebagai backend.",
      result:
        "Pemilik bisnis dapat memantau 4 KPI utama sekaligus, mengelola 100+ order tanpa spreadsheet, dan mendapatkan laporan keuangan otomatis. Waktu rekap bulanan berkurang dari 4 jam menjadi under 10 menit.",
      features: [
        "📊 Dashboard KPI Real-time",
        "🛒 Order Management Multi-channel",
        "💰 Kalkulator HPP Otomatis",
        "📦 Alert Stok Rendah",
        "📈 Grafik Penjualan Bulanan",
        "🔐 Auth & Multi-user",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Supabase"],
      previewBg: "linear-gradient(135deg,#0f0f1a,#13131a)",
      previewEmoji: "📊",
    },
    kinetic: {
      tag: "Gen-Art Engine",
      tagColor: "#ff006e",
      title: "Kinetic·Soul",
      problem:
        "Tidak ada tool generative art berbasis browser yang ringan, open-source, dan bisa dikustomisasi tanpa pengetahuan coding mendalam.",
      solution:
        "Membangun mesin generative art interaktif di atas Canvas API dengan sistem partikel fisika inverse square law, Perlin noise flow field, 3 visual mode, efek bloom, dan 6 palette warna. Fully client-side, zero dependency.",
      result:
        "Aplikasi berjalan smooth 60 FPS dengan 120+ partikel aktif di browser manapun. User bisa menghasilkan karya unik setiap saat.",
      features: [
        "✦ 3 Visual Modes (Galaxy, Web, Explosion)",
        "🎨 6 Color Palettes",
        "⚡ Perlin Noise Physics",
        "🔊 Procedural Audio",
        "📸 Export PNG",
        "🎛 Parameter Sliders",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Canvas API", "Web Audio API"],
      previewBg: "linear-gradient(135deg,#050508,#1a0a2e)",
      previewEmoji: "✦",
    },
    lentera: {
      tag: "Interactive Storytelling",
      tagColor: "#f97316",
      title: "Lentera Kecil",
      problem:
        "Anak-anak Indonesia kehilangan akses ke dongeng tradisional Nusantara yang interaktif. Konten digital anak mayoritas berformat video pasif.",
      solution:
        "Mesin dongeng interaktif dengan 38 cerita rakyat Nusantara, karakter SVG animasi original, background scene dinamis, ambient sound procedural, dan sistem progress berbintang.",
      result:
        "Platform yang dapat dinikmati anak usia 4–10 tahun tanpa koneksi internet, dengan 38 cerita lengkap dengan pesan moral.",
      features: [
        "📚 38 Dongeng Nusantara",
        "🎭 Karakter SVG Animasi Original",
        "🔊 Ambient Sound Engine",
        "⭐ Sistem Progress & Reward",
        "🔍 Filter & Pencarian Cerita",
        "💾 Offline-capable",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Web Audio API", "SVG Animation"],
      previewBg: "linear-gradient(180deg,#87ceeb,#66bb6a)",
      previewEmoji: "🏮",
    },
    easysolve: {
      tag: "Science Calculator",
      tagColor: "#38d9a9",
      title: "EasySolve",
      problem:
        "Pelajar sering kesulitan memahami langkah-langkah pengerjaan soal sains. Kalkulator biasa hanya memberikan jawaban tanpa penjelasan.",
      solution:
        "Platform kalkulator sains komprehensif dengan 100+ rumus dari 7 mata pelajaran yang menampilkan langkah pengerjaan step-by-step dengan render KaTeX.",
      result:
        "Pelajar dapat mengerjakan soal dari 7 mata pelajaran berbeda dalam satu platform dan memahami proses perhitungan secara visual.",
      features: [
        "🔢 100+ Rumus Lengkap",
        "📚 7 Mata Pelajaran",
        "📝 Step-by-step Explanation",
        "⚡ Render KaTeX",
        "🔍 Pencarian Rumus",
        "📱 Responsive Design",
      ],
      tech: ["HTML", "CSS", "JavaScript", "KaTeX"],
      previewBg: "linear-gradient(135deg,#0a1a14,#0d1e17)",
      previewEmoji: "∑",
    },
    basecalc: {
      tag: "Number Base Converter",
      tagColor: "#22d3ee",
      title: "BaseCalc·Insight",
      problem:
        "Pelajar kesulitan memahami konversi antar sistem bilangan karena alat yang tersedia hanya menampilkan hasil akhir tanpa menjelaskan prosesnya.",
      solution:
        "Konverter 4-basis (Biner, Oktal, Desimal, Heksadesimal) yang menampilkan setiap langkah perhitungan secara transparan menggunakan BigInt untuk akurasi penuh.",
      result:
        "Alat edukasi yang tidak hanya mengkonversi angka secara instan, tapi juga mengajarkan cara berpikirnya. Mendukung angka hingga tak terbatas.",
      features: [
        "🔢 Konversi 4 Sistem Bilangan Sekaligus",
        "🔍 Step-by-step Breakdown Interaktif",
        "⚡ BigInt — Presisi Tanpa Batas",
        "🟦 Bit Grouping Visual (3-bit & 4-bit)",
        "✅ Validasi Input Real-time",
        "🎨 Terminal / Cyberpunk UI",
      ],
      tech: ["HTML", "CSS", "JavaScript", "BigInt API"],
      previewBg: "linear-gradient(135deg,#080b10,#0d1523)",
      previewEmoji: "⌗",
    },
    neuroshelf: {
      tag: "Knowledge Graph",
      tagColor: "#00d4ff",
      title: "Neuro·Shelf",
      problem:
        "Pengelolaan catatan tradisional (linear) tidak mencerminkan bagaimana otak manusia benar-benar menyimpan informasi — dalam jaringan koneksi, bukan daftar.",
      solution:
        "Sistem visualisasi pengetahuan berbasis Force-Directed Graph menggunakan D3.js dengan auto-linking, BFS path finder, Convex Hull grouping, minimap, undo/redo, dan export PNG.",
      result:
        "User dapat memvisualisasikan 100+ node pengetahuan dalam jaringan interaktif dan menemukan koneksi tersembunyi antar topik secara otomatis.",
      features: [
        "🕸 Force-Directed Graph D3.js",
        "🔗 BFS Path Finder",
        "✦ Auto-Link by Keyword Tags",
        "🗺 Minimap + Convex Hull",
        "↩ Undo / Redo 40 Steps",
        "🖼 Export PNG & JSON",
      ],
      tech: ["HTML", "CSS", "JavaScript", "D3.js v7", "localStorage"],
      previewBg: "linear-gradient(135deg,#070b12,#0d1523)",
      previewEmoji: "🕸",
    },
    strivepro: {
      tag: "Habit-Building Engine",
      tagColor: "#4a8c62",
      title: "Strive·Pro",
      problem:
        "Mayoritas habit tracker menggunakan logika biner: berhasil atau gagal. Ini menciptakan efek 'ah sudahlah' — sekali gagal, motivasi langsung runtuh.",
      solution:
        "Adaptive Momentum Engine berbasis skor 0–100 dengan Pity System, Cognitive Load Guard, Dynamic SVG Arboretum, dan Ghost Streak Visualizer.",
      result:
        "Sistem habit yang aktif memprediksi keberhasilan, memitigasi kegagalan, dan memvisualisasikan pertumbuhan karakter.",
      features: [
        "⚡ Adaptive Momentum Engine (0–100)",
        "🛡 Pity System — Cegah Efek 'Ah Sudahlah'",
        "🧠 Cognitive Load Guard + Alert",
        "🌳 SVG Arboretum Dinamis",
        "👻 Ghost Streak Visualizer",
        "🔗 Habit Stacking System",
        "⏱ Focus Timer",
        "💾 LocalStorage Persistence",
      ],
      tech: ["HTML", "CSS", "JavaScript", "SVG", "Canvas API", "LocalStorage"],
      previewBg: "linear-gradient(160deg,#1c3329,#2d5040)",
      previewEmoji: "🌿",
    },

    carnival: {
      tag: "Arcade Game Collection",
      tagColor: "#e8304a",
      title: "Carnival·Arcade",
      problem:
        "Tidak ada platform browser yang mengumpulkan berbagai mini-game arcade klasik dalam satu tempat dengan sistem reward yang konsisten.",
      solution:
        "Platform arcade game kolektif berbasis Canvas dengan 12 mini-game terintegrasi sistem tiket universal, Web Audio FX, dan dukungan penuh touchscreen & keyboard.",
      result:
        "Platform arcade lengkap yang bisa dinikmati di mobile maupun desktop, dengan sistem tiket yang mendorong pemain menjelajahi semua 12 game.",
      features: [
        "🎮 12 Mini-Games Klasik",
        "🎫 Sistem Tiket Universal",
        "📱 Mobile Touch Controls",
        "🖥 Desktop Keyboard Support",
        "🔊 Web Audio Sound FX",
        "🏆 Papan Skor Persisten",
      ],
      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Canvas API",
        "Web Audio API",
        "localStorage",
      ],
      previewBg: "linear-gradient(135deg,#1a0208,#2d0a18)",
      previewEmoji: "🎪",
    },
    indotextqc: {
      tag: "Indonesian Language QC",
      tagColor: "#cf8733",
      title: "IndoText QC",
      problem:
        "Mahasiswa akhir dan pencari kerja kesulitan menyisir kata tidak baku, ejaan salah, " +
        "dan bahasa informal dalam dokumen formal seperti skripsi atau surat lamaran. " +
        "Proses manual memakan waktu, rentan terlewat, dan tidak ada standar acuan yang mudah diakses.",
      solution:
        "Platform pemeriksa bahasa Indonesia berbasis Claude AI — menganalisis teks secara menyeluruh " +
        "berdasarkan KBBI Edisi V dan EYD V. Setiap kata diperiksa untuk 6 kategori kesalahan dengan " +
        "highlight warna berbeda. Koreksi bisa dilakukan satu per satu atau massal sekaligus, dengan " +
        "tombol Abaikan untuk menolak false positive.",
      result:
        "Sistem mampu menganalisis ribuan kata dalam hitungan detik menggunakan Claude AI. " +
        "Teks diproses sepenuhnya di browser — tidak ada data yang dikirim ke server pihak ketiga. " +
        "Fallback ke kamus statis (150+ entri) tersedia otomatis saat API tidak dapat diakses.",
      features: [
        "✦ Claude AI sebagai mesin analisis utama",
        "🔴 Merah — kata tidak baku (KBBI & EYD V)",
        "🟣 Ungu — kemungkinan typo struktural",
        "🔵 Biru — salah kapitalisasi (hari/bulan/agama)",
        "🟡 Amber — spasi sebelum tanda baca",
        "⚡ Koreksi Semua Otomatis (satu klik)",
        "✕ Tombol Abaikan untuk false positive",
        "↻ Verifikasi Ulang dengan AI",
        "📋 Daftar kesalahan bernomor + label kategori",
        "🔒 Privasi — teks tidak disimpan di server",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Claude API"],
      previewBg: "linear-gradient(135deg, #0d1e14, #152b1e)",
      previewEmoji: "✦",
    },
  };

  var csModal = document.getElementById("cs-modal");
  var csPanel = document.getElementById("cs-panel");
  var csBackdrop = document.getElementById("cs-backdrop");
  var csClose = document.getElementById("cs-close");
  if (!csModal) return;

  var csLastFocused = null;

  function openCaseStudy(key) {
    var d = CASE_STUDIES[key];
    if (!d) return;
    csLastFocused = document.activeElement;
    document.getElementById("cs-tag").textContent = d.tag;
    document.getElementById("cs-tag").style.color = d.tagColor;
    document.getElementById("cs-tag").style.borderColor = d.tagColor;
    document.getElementById("cs-tag").style.background = d.tagColor + "15";
    document.getElementById("cs-title").textContent = d.title;
    document.getElementById("cs-problem").textContent = d.problem;
    document.getElementById("cs-solution").textContent = d.solution;
    document.getElementById("cs-result").textContent = d.result;
    var previewBox = document.getElementById("cs-preview-box");
    previewBox.style.background = d.previewBg;
    previewBox.innerHTML =
      '<div class="cs-preview-emoji">' +
      d.previewEmoji +
      '</div><div class="cs-preview-name">' +
      d.title +
      "</div>";
    document.getElementById("cs-features").innerHTML = d.features
      .map(function (f) {
        return '<div class="cs-feat-item">' + f + "</div>";
      })
      .join("");
    document.getElementById("cs-tech").innerHTML = d.tech
      .map(function (t) {
        return '<span class="cs-tech-tag">' + t + "</span>";
      })
      .join("");
    csModal.classList.add("cs-open");
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      csPanel.classList.add("cs-panel-in");
    }, 10);
    trapFocus(csModal);
    var body = document.querySelector(".cs-body");
    var hint = document.getElementById("cs-scroll-hint");
    if (body) {
      body.scrollTop = 0;
      if (hint) hint.classList.remove("cs-hint-hidden");
      body.addEventListener(
        "scroll",
        function onScroll() {
          if (body.scrollTop > 40) {
            if (hint) hint.classList.add("cs-hint-hidden");
            body.removeEventListener("scroll", onScroll);
          }
        },
        { passive: true },
      );
    }
  }

  function closeCaseStudy() {
    csPanel.classList.remove("cs-panel-in");
    releaseFocus(csModal);
    setTimeout(function () {
      csModal.classList.remove("cs-open");
      document.body.style.overflow = "";
      if (csLastFocused) csLastFocused.focus();
    }, 350);
  }
  window.closeCaseStudy = closeCaseStudy;

  document.querySelectorAll(".cs-open-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openCaseStudy(btn.dataset.project);
    });
  });
  if (csClose) csClose.addEventListener("click", closeCaseStudy);
  if (csBackdrop) csBackdrop.addEventListener("click", closeCaseStudy);
})();

/* ─── KINETIC SOUL CANVAS ────────────────────────── */
(function () {
  var canvas = document.getElementById("ks-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var W = 0,
    H = 0,
    dpr = 1,
    particles = [],
    noiseT = 0,
    rafId = null,
    started = false;
  var PALETTE = [
    "#ff006e",
    "#ff4da6",
    "#8338ec",
    "#a855f7",
    "#3a86ff",
    "#60a5fa",
    "#ff85c2",
  ];
  var MAX = 120;
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
    fillBg();
  }
  function noise(x, y) {
    var X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255;
    var xf = x - Math.floor(x),
      yf = y - Math.floor(y);
    var u = xf * xf * xf * (xf * (xf * 6 - 15) + 10),
      v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
    var h1 = (X * 374761393 + Y * 668265263) & 0x7fffffff,
      h2 = ((X + 1) * 374761393 + Y * 668265263) & 0x7fffffff,
      h3 = (X * 374761393 + (Y + 1) * 668265263) & 0x7fffffff,
      h4 = ((X + 1) * 374761393 + (Y + 1) * 668265263) & 0x7fffffff;
    var g = function (h, px, py) {
      h = h & 3;
      var gx = h < 2 ? (h === 0 ? 1 : -1) : 0;
      var gy = h >= 2 ? (h === 2 ? 1 : -1) : 0;
      return gx * px + gy * py;
    };
    return (
      (1 - u) * (1 - v) * g(h1, xf, yf) +
      u * (1 - v) * g(h2, xf - 1, yf) +
      (1 - u) * v * g(h3, xf, yf - 1) +
      u * v * g(h4, xf - 1, yf - 1)
    );
  }
  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = 0;
    this.vy = 0;
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.alpha = 0.5 + Math.random() * 0.5;
    this.r = 1 + Math.random() * 2;
    this.noiseOff = Math.random() * 1000;
    this.trail = [];
    this.orbitA = Math.random() * Math.PI * 2;
    this.orbitR = 30 + Math.random() * Math.min(W, H) * 0.35;
    this.orbitSpd =
      (0.0004 + Math.random() * 0.0007) * (Math.random() < 0.5 ? 1 : -1);
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
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(5,5,8,0.18)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    var cx = W / 2,
      cy = H / 2;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.orbitA += p.orbitSpd * dt;
      var n = noise(
        (p.x / W) * 3 + noiseT + p.noiseOff,
        (p.y / H) * 3 + noiseT * 0.7,
      );
      var flowA = n * Math.PI * 4;
      var tx = cx + Math.cos(p.orbitA) * p.orbitR,
        ty = cy + Math.sin(p.orbitA) * p.orbitR;
      p.vx += (tx - p.x) * 0.016 * dt + Math.cos(flowA) * 0.25;
      p.vy += (ty - p.y) * 0.016 * dt + Math.sin(flowA) * 0.25;
      p.vx *= 0.93;
      p.vy *= 0.93;
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 12) p.trail.shift();
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (var t = 1; t < p.trail.length; t++)
          ctx.lineTo(p.trail[t].x, p.trail[t].y);
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
    noiseT += 0.0015;
  }
  (function earlyInit() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var wrap = canvas.parentElement;
    if (wrap && wrap.clientWidth > 0) {
      W = wrap.clientWidth;
      H = wrap.clientHeight || 220;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      fillBg();
    }
  })();
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !started) {
            started = true;
            init();
            rafId = requestAnimationFrame(loop);
          } else if (!e.isIntersecting && started) {
            cancelAnimationFrame(rafId);
            rafId = null;
            started = false;
          }
        });
      },
      { threshold: 0.05 },
    );
    obs.observe(canvas);
  } else {
    init();
    rafId = requestAnimationFrame(loop);
  }
  window.addEventListener(
    "resize",
    function () {
      if (started && rafId) {
        cancelAnimationFrame(rafId);
        init();
        rafId = requestAnimationFrame(loop);
      } else {
        fillBg();
      }
    },
    { passive: true },
  );
})();

/* ═══════════════════════════════════════════════════
   MICRO-INTERACTIONS & A11Y
═══════════════════════════════════════════════════ */
var skipLink = document.createElement("a");
skipLink.href = "#about";
skipLink.className = "skip-link";
skipLink.textContent = "Skip to main content";
document.body.insertBefore(skipLink, document.body.firstChild);

document.body.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Tab") document.body.classList.add("kb-nav");
  },
  { passive: true },
);
document.body.addEventListener(
  "mousedown",
  function () {
    document.body.classList.remove("kb-nav");
  },
  { passive: true },
);
document.body.addEventListener(
  "touchstart",
  function () {
    document.body.classList.remove("kb-nav");
  },
  { passive: true },
);

var progressBar = document.createElement("div");
progressBar.id = "scroll-progress";
document.body.appendChild(progressBar);
window.addEventListener(
  "scroll",
  function () {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
  },
  { passive: true },
);

function attachRipple(selector) {
  document.querySelectorAll(selector).forEach(function (el) {
    if (el._hasRipple) return;
    el._hasRipple = true;
    el.addEventListener("click", function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - 2,
        y = e.clientY - rect.top - 2;
      var maxR = Math.max(rect.width, rect.height);
      var r = document.createElement("span");
      r.className = "ripple";
      r.style.left = x + "px";
      r.style.top = y + "px";
      r.style.setProperty("--rs", Math.ceil(maxR * 0.55));
      el.appendChild(r);
      r.addEventListener("animationend", function () {
        r.remove();
      });
    });
  });
}
attachRipple(
  ".btn-primary,.btn-outline,.form-submit,.pf-link-primary,[class*='pf-link-primary--'],.pf-btn-3",
);

document.querySelectorAll(".skill-card").forEach(function (card) {
  card.addEventListener(
    "mousemove",
    function (e) {
      var r = card.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      card.style.setProperty("--tilt-x", -dy * 9 + "deg");
      card.style.setProperty("--tilt-y", dx * 9 + "deg");
    },
    { passive: true },
  );
  card.addEventListener("mouseleave", function () {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

document.querySelectorAll(".pf-card").forEach(function (card) {
  card.addEventListener(
    "mousemove",
    function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty(
        "--mouse-x",
        (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%",
      );
      card.style.setProperty(
        "--mouse-y",
        (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%",
      );
    },
    { passive: true },
  );
});

document.querySelectorAll(".btn-primary,.btn-outline").forEach(function (btn) {
  btn.addEventListener(
    "mousemove",
    function (e) {
      var r = btn.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
      var dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
      btn.style.transform =
        "translate(" +
        dx.toFixed(1) +
        "px," +
        dy.toFixed(1) +
        "px) translateY(-2px)";
    },
    { passive: true },
  );
  btn.addEventListener("mouseleave", function () {
    btn.style.transform = "";
  });
});

var statEls = document.querySelectorAll(".stat-n");
if ("IntersectionObserver" in window && statEls.length) {
  var statObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.textContent, 10);
        var plus = el.querySelector(".stat-plus");
        var suffix = plus ? plus.outerHTML : "";
        if (isNaN(target) || target === 0) return;
        var dur = 900,
          t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var prog = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - prog, 3);
          el.innerHTML = Math.round(target * eased) + suffix;
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        statObs.unobserve(el);
      });
    },
    { threshold: 0.8 },
  );
  statEls.forEach(function (el) {
    statObs.observe(el);
  });
}

var skillCards = Array.from(document.querySelectorAll(".skill-card"));
if (skillCards.length) {
  skillCards[0].setAttribute("tabindex", "0");
  skillCards.slice(1).forEach(function (c) {
    c.setAttribute("tabindex", "-1");
  });
  skillCards.forEach(function (card, i) {
    card.addEventListener("keydown", function (e) {
      var next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        next = (i + 1) % skillCards.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        next = (i - 1 + skillCards.length) % skillCards.length;
      if (next === -1) return;
      e.preventDefault();
      skillCards[i].setAttribute("tabindex", "-1");
      skillCards[next].setAttribute("tabindex", "0");
      skillCards[next].focus();
    });
  });
}

var liveRegion = document.createElement("div");
liveRegion.setAttribute("role", "status");
liveRegion.setAttribute("aria-live", "polite");
liveRegion.setAttribute("aria-atomic", "true");
liveRegion.style.cssText =
  "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;";
document.body.appendChild(liveRegion);
function announce(msg) {
  liveRegion.textContent = "";
  setTimeout(function () {
    liveRegion.textContent = msg;
  }, 50);
}

if (burger) {
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-controls", "mobile-menu");
  burger.setAttribute("aria-label", "Buka menu navigasi");
}
if (note) {
  note.setAttribute("role", "alert");
  note.setAttribute("aria-live", "assertive");
}
