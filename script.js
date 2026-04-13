// ── NAVBAR BURGER ──────────────────────────
var burger = document.getElementById("burger");
var navMenu = document.querySelector(".nav-menu");

if (burger && navMenu) {
  burger.onclick = function () {
    navMenu.classList.toggle("open");
  };
  navMenu.querySelectorAll("a").forEach(function (a) {
    a.onclick = function () {
      navMenu.classList.remove("open");
    };
  });
}

// ── SKILL BAR ANIMASI ──────────────────────
window.addEventListener("load", function () {
  document.querySelectorAll(".skill-bar").forEach(function (bar) {
    var w = bar.getAttribute("data-width");
    if (w) bar.style.width = w + "%";
  });
});

// ── DATA MODAL SKILL ───────────────────────
var skillInfo = {
  html: {
    emoji: "🌐",
    title: "HTML",
    level: "90% — Mahir",
    desc: "HyperText Markup Language adalah bahasa dasar pembentuk struktur setiap halaman web. Semua elemen yang kamu lihat — teks, gambar, form, tombol — semuanya ditulis dengan HTML. Ini adalah skill pertama yang harus dikuasai setiap web developer.",
    tags: ["Struktur", "Semantik", "Form", "Aksesibilitas", "SEO"],
  },
  css: {
    emoji: "🎨",
    title: "CSS",
    level: "80% — Mahir",
    desc: "Cascading Style Sheets mengatur tampilan visual halaman web. Dengan CSS kamu bisa mengatur warna, font, layout, animasi, dan membuat tampilan yang responsif di semua ukuran layar mulai dari HP hingga desktop.",
    tags: ["Flexbox", "Grid", "Animasi", "Responsif", "Variables"],
  },
  js: {
    emoji: "⚡",
    title: "JavaScript",
    level: "70% — Menengah",
    desc: "JavaScript adalah bahasa pemrograman yang membuat halaman web menjadi interaktif. Dengan JS kamu bisa merespons klik, mengambil data dari API, membuat animasi, validasi form, dan membangun fitur-fitur dinamis lainnya.",
    tags: ["DOM", "ES6+", "Fetch", "Event", "Async/Await"],
  },
  react: {
    emoji: "⚛️",
    title: "React",
    level: "60% — Menengah",
    desc: "React adalah library JavaScript buatan Meta untuk membangun UI berbasis komponen. Dengan React kamu bisa memecah tampilan menjadi bagian-bagian kecil yang bisa dipakai ulang, sehingga kode lebih terorganisir dan mudah dikembangkan.",
    tags: ["Component", "Hooks", "State", "Props", "JSX"],
  },
  git: {
    emoji: "🐙",
    title: "Git",
    level: "75% — Mahir",
    desc: "Git adalah sistem version control untuk mencatat setiap perubahan kode. Dengan Git kamu bisa bekerja sama dengan tim, menyimpan riwayat perubahan, membuat branch untuk fitur baru, dan rollback jika ada kesalahan.",
    tags: ["Commit", "Branch", "Merge", "GitHub", "Pull Request"],
  },
  figma: {
    emoji: "✏️",
    title: "Figma",
    level: "65% — Menengah",
    desc: "Figma adalah aplikasi desain UI/UX berbasis web yang digunakan untuk membuat wireframe, mockup, dan prototipe interaktif. Memahami Figma sangat membantu developer untuk membaca desain dan mengimplementasikannya ke kode secara akurat.",
    tags: ["Wireframe", "Mockup", "Prototipe", "Komponen", "Auto Layout"],
  },
};

// ── MODAL LOGIC ────────────────────────────
var overlay = document.getElementById("modal-overlay");
var modalClose = document.getElementById("modal-close");

function bukaModal(key) {
  var data = skillInfo[key];
  if (!data || !overlay) return;

  document.getElementById("modal-emoji").textContent = data.emoji;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-level").textContent = data.level;
  document.getElementById("modal-desc").textContent = data.desc;

  var tagsEl = document.getElementById("modal-tags");
  tagsEl.innerHTML = "";
  data.tags.forEach(function (tag) {
    var span = document.createElement("span");
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function tutupModal() {
  if (!overlay) return;
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

// Pasang klik ke setiap skill card
document.querySelectorAll(".skill-card").forEach(function (card) {
  card.onclick = function () {
    var key = card.getAttribute("data-skill");
    bukaModal(key);
  };
});

// Tutup modal
if (modalClose) modalClose.onclick = tutupModal;
if (overlay) {
  overlay.onclick = function (e) {
    if (e.target === overlay) tutupModal();
  };
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") tutupModal();
});

console.log("✅ Script berjalan dengan baik");
