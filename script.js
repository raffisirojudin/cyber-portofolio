/* ═══════════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════════ */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --ink: #0c0c0f;
  --ink-2: #13131a;
  --ink-3: #1c1c26;
  --ink-4: #27273a;
  --stroke: rgba(255, 255, 255, 0.08);
  --stroke-2: rgba(255, 255, 255, 0.14);
  --text: #f0f0f5;
  --text-2: #9494a8;
  --text-3: #5f5f75;
  --accent: #7b6ef6;
  --accent-2: #9d92f8;
  --accent-glow: rgba(123, 110, 246, 0.2);
  --accent-rgb: 123, 110, 246;
  --gold: #f5c842;
  --teal: #38d9a9;
  --coral: #f08080;
  --font: "DM Sans", sans-serif;
  --font-display: "Syne", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --section-pad: clamp(4rem, 8vw, 8rem);
  --max-w: 1100px;
  --nav-h: 68px;
  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 20px;
  --r-xl: 28px;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}
[data-theme="light"] {
  --ink: #fafafc;
  --ink-2: #f0f0f5;
  --ink-3: #e4e4ef;
  --ink-4: #d4d4e8;
  --stroke: rgba(0, 0, 0, 0.07);
  --stroke-2: rgba(0, 0, 0, 0.12);
  --text: #0c0c0f;
  --text-2: #4a4a62;
  --text-3: #8888a4;
  --accent: #6557f5;
  --accent-2: #7b6ef6;
  --accent-glow: rgba(101, 87, 245, 0.15);
  --accent-rgb: 101, 87, 245;
}

html { scroll-behavior: smooth; }
body {
  background: var(--ink);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.7;
  font-weight: 300;
  transition: background 0.35s var(--ease), color 0.35s var(--ease);
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
#navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.5rem, 5vw, 3rem); height: var(--nav-h);
  background: rgba(12, 12, 15, 0);
  transition: background 0.4s var(--ease), box-shadow 0.4s var(--ease);
}
[data-theme="light"] #navbar { background: rgba(250, 250, 252, 0); }
#navbar.scrolled {
  background: rgba(12, 12, 15, 0.85);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--stroke);
}
[data-theme="light"] #navbar.scrolled { background: rgba(250, 250, 252, 0.88); }
.nav-logo {
  font-family: var(--font-display); font-size: 1.6rem; font-weight: 800;
  color: var(--accent); letter-spacing: -1px; z-index: 1;
}
.nav-links { display: flex; list-style: none; gap: 0.2rem; }
.nav-links a {
  font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-2);
  padding: 0.5rem 0.9rem; border-radius: var(--r-sm);
  transition: color 0.2s, background 0.2s;
}
.nav-links a[data-index]::before {
  content: attr(data-index) ". "; color: var(--accent); font-size: 0.65rem;
}
.nav-links a:hover, .nav-links a.active { color: var(--text); background: var(--stroke); }
.nav-right { display: flex; align-items: center; gap: 0.5rem; }
#theme-toggle {
  background: var(--ink-3); border: 1px solid var(--stroke-2);
  border-radius: var(--r-md); width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; color: var(--text-2); cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
#theme-toggle:hover { color: var(--text); background: var(--ink-4); }
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="light"] .icon-moon { display: none; }
#burger {
  display: none; background: none; border: none;
  flex-direction: column; gap: 5px; padding: 6px; width: 36px; cursor: pointer;
}
#burger span {
  display: block; height: 1.5px; background: var(--text);
  border-radius: 2px; transition: transform 0.3s var(--ease), opacity 0.3s;
}
#burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
#burger.open span:nth-child(2) { opacity: 0; }
#burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
#mobile-menu {
  position: fixed; top: var(--nav-h); left: 0; right: 0;
  background: var(--ink-2); border-bottom: 1px solid var(--stroke);
  padding: 1.5rem clamp(1.5rem, 5vw, 3rem); z-index: 490;
  display: none; animation: slideDown 0.25s var(--ease);
}
#mobile-menu.open { display: block; }
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
#mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
#mobile-menu a {
  display: block; font-family: var(--font-display); font-size: 1.5rem;
  font-weight: 700; padding: 0.5rem 0; color: var(--text-2); transition: color 0.2s;
}
#mobile-menu a:hover { color: var(--accent); }

/* ═══════════════════════════════════════════
   SECTION SHARED
═══════════════════════════════════════════ */
section { padding: var(--section-pad) clamp(1.5rem, 5vw, 3rem); position: relative; z-index: 1; }
.section-wrap { max-width: var(--max-w); margin: 0 auto; }
.section-label { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.label-num { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); }
.label-line { flex: 0 0 40px; height: 1px; background: var(--accent); opacity: 0.5; }
.label-text {
  font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-3);
  text-transform: uppercase; letter-spacing: 2px;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800; line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 1rem;
}
.section-sub { font-size: 0.875rem; color: var(--text-3); margin-bottom: 3rem; font-family: var(--font-mono); }
.reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
#hero { min-height: 100vh; display: flex; align-items: center; padding-top: var(--nav-h); }
.hero-wrap {
  max-width: var(--max-w); margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center; padding: clamp(1.5rem, 5vw, 3rem);
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: var(--ink-3); border: 1px solid var(--stroke-2);
  border-radius: 100px; padding: 0.4rem 1rem;
  font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-2); margin-bottom: 1.5rem;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--teal); animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(56, 217, 169, 0.5); }
  50% { box-shadow: 0 0 0 5px rgba(56, 217, 169, 0); }
}
.hero-name {
  font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 800; line-height: 1; letter-spacing: -3px; margin-bottom: 1rem;
}
.name-accent { color: var(--accent); }
.hero-role {
  font-family: var(--font-mono); font-size: clamp(0.9rem, 2vw, 1.3rem);
  color: var(--text-2); margin-bottom: 1.5rem; min-height: 2rem;
}
.role-prefix { color: var(--text-3); }
.typed { color: var(--accent-2); }
.typed-cursor { color: var(--accent); animation: blink 0.9s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.hero-desc { color: var(--text-2); max-width: 420px; margin-bottom: 2.5rem; font-size: 1rem; line-height: 1.8; }
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
.btn-primary {
  background: var(--accent); color: #fff; font-weight: 500; font-size: 0.9rem;
  padding: 0.8rem 1.8rem; border-radius: var(--r-md);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  display: inline-flex; align-items: center; gap: 0.5rem;
}
.btn-primary:hover { background: var(--accent-2); transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow); }
.btn-outline {
  border: 1px solid var(--stroke-2); color: var(--text-2); font-size: 0.9rem;
  padding: 0.8rem 1.8rem; border-radius: var(--r-md);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.btn-arrow { transition: transform 0.2s; }
.btn-primary:hover .btn-arrow { transform: translateX(3px); }
.hero-scroll {
  display: flex; align-items: center; gap: 0.8rem;
  font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3); letter-spacing: 1px;
}
.scroll-line { width: 40px; height: 1px; background: var(--text-3); position: relative; overflow: hidden; }
.scroll-line::after {
  content: ""; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: var(--accent); animation: scan 2s ease infinite;
}
@keyframes scan { to { left: 100%; } }
.hero-card {
  background: var(--ink-2); border: 1px solid var(--stroke-2);
  border-radius: var(--r-lg); overflow: hidden; font-family: var(--font-mono);
  font-size: 0.78rem; line-height: 1.75;
}
.hcard-header {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.8rem 1.2rem;
  background: var(--ink-3); border-bottom: 1px solid var(--stroke);
}
.hcard-dots { display: flex; gap: 0.45rem; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-r { background: #ff5f57; } .dot-y { background: #febc2e; } .dot-g { background: #28c840; }
.hcard-file { color: var(--text-3); font-size: 0.72rem; margin-left: auto; }
.hcard-body { padding: 1.2rem 1.5rem 1.4rem; white-space: pre-wrap; }
.t-kw { color: #c084fc; } .t-prop { color: var(--teal); } .t-str { color: var(--gold); }
.t-bool { color: #f87171; } .t-var { color: var(--accent-2); }

/* ═══════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════ */
#about { background: var(--ink-2); border-top: 1px solid var(--stroke); border-bottom: 1px solid var(--stroke); }
.about-grid { display: grid; grid-template-columns: 260px 1fr; gap: 5rem; align-items: start; margin-top: 1rem; }
.about-photo-frame {
  width: 100%; aspect-ratio: 3/4; border-radius: var(--r-lg); overflow: hidden;
  background: var(--ink-3); border: 1px solid var(--stroke-2); position: relative;
}
.about-img { width: 100%; height: 100%; object-fit: cover; }
.no-img .about-img { display: none; }
.no-img .about-img-placeholder { display: flex; }
.about-img-placeholder {
  display: none; position: absolute; inset: 0; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--accent);
}
.about-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
.about-tag {
  background: var(--ink-3); border: 1px solid var(--stroke-2); border-radius: 100px;
  padding: 0.25rem 0.7rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3);
}
.about-content p { color: var(--text-2); margin-bottom: 1rem; }
.about-stats { display: flex; gap: 2rem; margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--stroke); }
.stat-box { display: flex; flex-direction: column; }
.stat-n { font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--accent); line-height: 1; letter-spacing: -2px; }
.stat-plus { font-size: 1.5rem; }
.stat-l { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3); margin-top: 0.3rem; text-transform: uppercase; letter-spacing: 1px; }

/* ═══════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════ */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.skill-card {
  background: var(--ink-2); border: 1px solid var(--stroke); border-radius: var(--r-md);
  padding: 1.4rem 1.5rem; cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;
}
.skill-card::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 50%, var(--accent-glow), transparent 70%);
  opacity: 0; transition: opacity 0.3s;
}
.skill-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(var(--accent-rgb), 0.12); }
.skill-card:hover::before { opacity: 1; }
.skill-icon { font-size: 1.5rem; margin-bottom: 1rem; }
.skill-info { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.7rem; }
.skill-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; }
.skill-level { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); }
.skill-bar-track { height: 4px; background: var(--stroke-2); border-radius: 100px; overflow: hidden; margin-bottom: 0.8rem; }
.skill-bar-fill {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 100px; transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.skill-badge { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 1px; }
#skill-modal {
  position: fixed; inset: 0; z-index: 800;
  display: flex; align-items: center; justify-content: center; padding: 1rem;
  opacity: 0; pointer-events: none; transition: opacity 0.25s var(--ease);
}
#skill-modal.open { opacity: 1; pointer-events: all; }
.modal-backdrop { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); }
.modal-card {
  background: var(--ink-2); border: 1px solid var(--stroke-2); border-radius: var(--r-xl);
  padding: 2.5rem; max-width: 420px; width: 100%; position: relative; z-index: 1;
  transform: scale(0.92) translateY(10px); transition: transform 0.3s var(--ease);
}
#skill-modal.open .modal-card { transform: scale(1) translateY(0); }
.modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem; background: var(--ink-3);
  border: 1px solid var(--stroke-2); color: var(--text-2); width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; cursor: pointer; transition: color 0.2s, border-color 0.2s;
}
.modal-close:hover { color: var(--accent); border-color: var(--accent); }
.modal-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.modal-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 0.3rem; }
.modal-level { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); margin-bottom: 1.2rem; }
.modal-desc { color: var(--text-2); font-size: 0.9rem; line-height: 1.75; margin-bottom: 1.5rem; }
.modal-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.modal-tags span {
  background: var(--ink-3); border: 1px solid var(--stroke-2); border-radius: 100px;
  padding: 0.25rem 0.8rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
}

/* ═══════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════ */
#experience { background: var(--ink-2); border-top: 1px solid var(--stroke); border-bottom: 1px solid var(--stroke); }
.timeline { margin-top: 2rem; display: flex; flex-direction: column; gap: 0; }
.tl-item { display: grid; grid-template-columns: 40px 1fr; gap: 0 1.5rem; align-items: start; padding-bottom: 2.5rem; }
.tl-connector { display: flex; flex-direction: column; align-items: center; }
.tl-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--ink); border: 2px solid var(--accent); flex-shrink: 0; margin-top: 0.3rem; transition: background 0.2s; }
.tl-item:hover .tl-dot { background: var(--accent); }
.tl-line { flex: 1; width: 1px; background: var(--stroke-2); min-height: 60px; }
.tl-right { min-width: 0; }
.tl-date-inline { display: inline-block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); margin-bottom: 0.5rem; }
.tl-tag {
  display: inline-block; background: var(--accent-glow); border: 1px solid rgba(var(--accent-rgb), 0.3);
  color: var(--accent-2); font-family: var(--font-mono); font-size: 0.65rem;
  padding: 0.2rem 0.7rem; border-radius: 100px; letter-spacing: 0.5px;
  margin-bottom: 0.5rem; text-transform: uppercase; margin-left: 0.5rem;
}
.tl-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.2rem; }
.tl-place { font-size: 0.8rem; color: var(--text-3); font-family: var(--font-mono); margin-bottom: 0.75rem; }
.tl-desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.75; margin-bottom: 0.75rem; max-width: 700px; }
.tl-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tl-stack span {
  background: var(--ink-3); border: 1px solid var(--stroke); border-radius: var(--r-sm);
  padding: 0.2rem 0.6rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3);
}

/* ═══════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════ */
.project-featured { margin-bottom: 4rem; }
.pf-meta { margin-bottom: 1.5rem; }
.pf-tag {
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent);
  text-transform: uppercase; letter-spacing: 2px; display: inline-block;
  padding: 0.25rem 0.75rem; border: 1px solid rgba(var(--accent-rgb), 0.3);
  border-radius: 100px; background: var(--accent-glow); margin-bottom: 0.5rem;
}
.pf-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -1px; }
.pf-card {
  display: grid; grid-template-columns: 55% 45%; gap: 0;
  background: var(--ink-2); border: 1px solid rgba(var(--accent-rgb), 0.2);
  border-radius: var(--r-xl); overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.pf-card:hover { border-color: var(--accent); box-shadow: 0 0 60px rgba(var(--accent-rgb), 0.08); }
.pf-preview { border-right: 1px solid var(--stroke); overflow: hidden; }
.pf-preview-inner { height: 100%; display: flex; flex-direction: column; }
.pf-mock-header { display: flex; align-items: center; gap: 0.6rem; padding: 0.7rem 1rem; border-bottom: 1px solid var(--stroke); flex-shrink: 0; }
.pf-mock-dots { display: flex; gap: 0.4rem; }
.pf-mock-dots span { width: 8px; height: 8px; border-radius: 50%; }
.pf-mock-header--dark { background: #0a0a12; border-bottom-color: rgba(255, 255, 255, 0.06); }
.pf-mock-header--warm { background: rgba(255, 247, 237, 0.95); border-bottom: 1px solid rgba(249, 115, 22, 0.15); }
.pf-info { padding: 2.2rem 2rem; display: flex; flex-direction: column; gap: 1rem; justify-content: center; }
.pf-desc { color: var(--text-2); font-size: 0.88rem; line-height: 1.75; }
.pf-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.pf-hl {
  background: var(--ink-3); border: 1px solid var(--stroke); border-radius: var(--r-sm);
  padding: 0.4rem 0.75rem; font-size: 0.78rem; color: var(--text-2);
  display: flex; align-items: center; gap: 0.5rem;
}
.pf-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.pf-stack span {
  background: rgba(var(--accent-rgb), 0.1); border: 1px solid rgba(var(--accent-rgb), 0.25);
  color: var(--accent-2); border-radius: var(--r-sm);
  padding: 0.2rem 0.6rem; font-family: var(--font-mono); font-size: 0.7rem;
}
.pf-links { display: flex; gap: 0.8rem; margin-top: 0.5rem; flex-wrap: wrap; }
.pf-link-primary {
  background: var(--accent); color: #fff; font-size: 0.85rem; font-weight: 500;
  padding: 0.65rem 1.4rem; border-radius: var(--r-md); transition: background 0.2s, transform 0.2s;
}
.pf-link-primary:hover { background: var(--accent-2); transform: translateY(-2px); }

/* Project color variants */
.pf-tag--ks { color: #ff006e; border-color: rgba(255,0,110,0.3); background: rgba(255,0,110,0.08); }
.pf-tag--lk { color: #f97316; border-color: rgba(249,115,22,0.3); background: rgba(249,115,22,0.08); }
.pf-tag--es { color: #38d9a9; border-color: rgba(56,217,169,0.3); background: rgba(56,217,169,0.08); }
.pf-tag--bc { color: #22d3ee; border-color: rgba(34,211,238,0.35); background: rgba(34,211,238,0.08); }
.pf-tag--ns { color: #00d4ff; border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.08); }
.pf-card--ks { border-color: rgba(255,0,110,0.2); }
.pf-card--lk { border-color: rgba(249,115,22,0.2); }
.pf-card--es { border-color: rgba(56,217,169,0.2); }
.pf-card--bc { border-color: rgba(34,211,238,0.12); }
.pf-card--ns { border-color: rgba(0,212,255,0.2); }
.pf-card--ks:hover { border-color: #ff006e; box-shadow: 0 0 60px rgba(255,0,110,0.1); }
.pf-card--lk:hover { border-color: #f97316; box-shadow: 0 0 60px rgba(249,115,22,0.1); }
.pf-card--es:hover { border-color: #38d9a9; box-shadow: 0 0 60px rgba(56,217,169,0.1); }
.pf-card--ns:hover { border-color: #00d4ff; box-shadow: 0 0 60px rgba(0,212,255,0.1); }
.pf-mock-url--ks { color: rgba(131,56,236,0.7); font-size: 0.6rem; }
.pf-mock-url--lk { color: rgba(249,115,22,0.6); font-size: 0.6rem; }
.pf-mock-url--ns { color: rgba(0,212,255,0.6); font-size: 0.6rem; }
.pf-link-primary--ks { background: #ff006e; }
.pf-link-primary--ks:hover { background: #e6005f; }
.pf-link-primary--lk { background: #f97316; }
.pf-link-primary--lk:hover { background: #ea6c0a; }
.pf-link-primary--es { background: #38d9a9; color: #0c0c0f; }
.pf-link-primary--es:hover { background: #2bc49b; }
.pf-link-primary--ns { background: #00d4ff; color: #050b14; }
.pf-link-primary--ns:hover { background: #33ddff; transform: translateY(-2px); }
.pf-title-accent--ks { color: #ff006e; }
.pf-title-accent--lk { color: #f97316; }
.pf-title-accent--ns { color: #00d4ff; }
.pf-title-accent--bc { color: #22d3ee; }
.pf-preview--ns { min-height: 400px; display: flex; flex-direction: column; }
.pf-preview-inner--ns { flex: 1; display: flex; flex-direction: column; min-height: 400px; }
.pf-meta-top { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.pf-desktop-badge {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-family: var(--font-mono); font-size: 0.65rem; font-weight: 600;
  color: #f59e0b; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
  border-radius: 100px; padding: 0.2rem 0.65rem; letter-spacing: 0.04em; white-space: nowrap;
}
.pf-desktop-note {
  font-size: 0.78rem; color: #f59e0b; background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.2); border-radius: var(--r-sm); padding: 0.45rem 0.75rem; line-height: 1.5;
}
.pf-desktop-note strong { font-weight: 700; }
.pf-links-3 { display: flex; gap: 0.5rem; flex-wrap: nowrap; align-items: center; margin-top: 0.5rem; }
.pf-btn-3 {
  flex: 1; padding: 0.6rem 0.5rem; border-radius: var(--r-md); font-size: 0.78rem; font-weight: 500;
  text-align: center; cursor: pointer; font-family: var(--font); white-space: nowrap;
  transition: opacity 0.2s, transform 0.15s, background 0.2s, border-color 0.2s, color 0.2s;
  display: inline-flex; align-items: center; justify-content: center; gap: 0.3rem;
}
.pf-btn-3:hover { transform: translateY(-2px); }
.pf-btn-cs {
  background: transparent; border: 1px solid var(--stroke-2); color: var(--text-2);
}
.pf-btn-cs:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
.pf-btn-cs--ks:hover { border-color: #ff006e; color: #ff006e; background: rgba(255,0,110,0.08); }
.pf-btn-cs--lk:hover { border-color: #f97316; color: #f97316; background: rgba(249,115,22,0.08); }
.pf-btn-cs--es:hover { border-color: #38d9a9; color: #38d9a9; background: rgba(56,217,169,0.08); }
.pf-btn-cs--ns:hover { border-color: #00d4ff; color: #00d4ff; background: rgba(0,212,255,0.08); }
.pf-btn-gh { background: var(--ink-3); border: 1px solid var(--stroke); color: var(--text-3); flex: 0 0 auto; padding: 0.6rem 0.8rem; }
.pf-btn-gh:hover { background: var(--ink-4); border-color: var(--stroke-2); color: var(--text-2); }

/* ═══════════════════════════════════════════
   CURTAINBIZ
═══════════════════════════════════════════ */
.cb-live-preview { flex: 1; display: flex; overflow: hidden; background: #0f0f1a; min-height: 220px; }
.cb-sidebar { width: 48px; background: #13131a; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; align-items: center; padding: 12px 0; gap: 8px; flex-shrink: 0; }
.cb-logo-mini { width: 28px; height: 28px; border-radius: 6px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 9px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.cb-nav-items { display: flex; flex-direction: column; gap: 4px; }
.cb-nav-item { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(255,255,255,0.3); cursor: default; }
.cb-nav-active { background: rgba(123,110,246,0.2); color: var(--accent); }
.cb-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.cb-topbar { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #13131a; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
.cb-page-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--text-2); letter-spacing: 0.05em; }
.cb-topbar-right { display: flex; align-items: center; gap: 8px; }
.cb-badge-live { font-family: var(--font-mono); font-size: 7px; font-weight: 700; color: var(--teal); letter-spacing: 0.1em; }
.cb-avatar { width: 20px; height: 20px; border-radius: 50%; background: var(--accent); font-family: var(--font-mono); font-size: 7px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }
.cb-kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; padding: 8px 10px; flex-shrink: 0; }
.cb-kpi { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 7px 8px; display: flex; flex-direction: column; gap: 2px; }
.cb-kpi-icon { font-size: 12px; line-height: 1; }
.cb-kpi-val { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--text); line-height: 1.2; }
.cb-kpi-lbl { font-family: var(--font-mono); font-size: 7px; color: var(--text-3); letter-spacing: 0.05em; }
.cb-kpi-trend { font-family: var(--font-mono); font-size: 7px; font-weight: 700; }
.cb-trend-up { color: var(--teal); } .cb-trend-down { color: var(--coral); }
.cb-chart-row { display: grid; grid-template-columns: 60% 40%; gap: 6px; padding: 0 10px 10px; flex: 1; min-height: 0; }
.cb-chart, .cb-orders { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px; overflow: hidden; }
.cb-chart-title { font-family: var(--font-mono); font-size: 8px; font-weight: 700; color: var(--text-2); letter-spacing: 0.08em; margin-bottom: 6px; text-transform: uppercase; }
.cb-bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 50px; }
.cb-bar-group { display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 1; }
.cb-bar { width: 100%; border-radius: 3px 3px 0 0; background: rgba(123,110,246,0.35); }
.cb-bar-active { background: var(--accent); }
.cb-bar-group span { font-family: var(--font-mono); font-size: 6px; color: var(--text-3); }
.cb-order-row { display: flex; align-items: center; gap: 6px; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.cb-order-row:last-child { border-bottom: none; }
.cb-order-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.cb-order-name { font-size: 8px; color: var(--text-2); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cb-order-val { font-family: var(--font-mono); font-size: 8px; font-weight: 700; color: var(--text); flex-shrink: 0; }

/* ═══════════════════════════════════════════
   KINETIC SOUL
═══════════════════════════════════════════ */
.ks-live-preview { flex: 1; position: relative; background: #050508; overflow: hidden; min-height: 220px; }
#ks-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; background: #050508; }
.ks-hud-overlay { position: absolute; inset: 0; pointer-events: none; display: flex; flex-direction: column; }
.ks-hud-top { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: linear-gradient(to bottom, rgba(5,5,8,0.9), transparent); }
.ks-logo-txt { font-family: "JetBrains Mono",monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; }
.ks-stats { display: flex; gap: 14px; }
.ks-stat { display: flex; flex-direction: column; align-items: flex-end; }
.ks-stat-lbl { font-family: "JetBrains Mono",monospace; font-size: 7px; letter-spacing: 0.2em; color: rgba(232,232,240,0.3); }
.ks-stat-val { font-family: "JetBrains Mono",monospace; font-size: 13px; font-weight: 700; color: rgba(232,232,240,0.9); }
.ks-panel-left { position: absolute; left: 8px; top: 36px; width: 80px; background: rgba(6,6,14,0.85); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 8px; }
.ks-panel-lbl { font-family: "JetBrains Mono",monospace; font-size: 6px; letter-spacing: 0.25em; color: rgba(232,232,240,0.25); margin-bottom: 5px; }
.ks-mode-btn { font-family: "JetBrains Mono",monospace; font-size: 7px; color: rgba(232,232,240,0.35); padding: 3px 5px; border-radius: 3px; border: 1px solid transparent; margin-bottom: 3px; letter-spacing: 0.05em; }
.ks-mode-active { border-color: rgba(255,0,110,0.5); color: #ff006e; background: rgba(255,0,110,0.08); }
.ks-palette-row { display: flex; gap: 4px; margin-top: 4px; }
.ks-pal { width: 14px; height: 14px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.1); }
.ks-pal-active { border-color: rgba(255,255,255,0.4); transform: scale(1.15); }
.ks-panel-right { position: absolute; right: 8px; top: 36px; width: 70px; background: rgba(6,6,14,0.85); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 8px; }
.ks-slider-mini { height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; margin-bottom: 6px; }
.ks-slider-fill-mini { height: 100%; background: #ff006e; border-radius: 1px; }

/* ═══════════════════════════════════════════
   LENTERA KECIL
═══════════════════════════════════════════ */
.lk-live-preview { flex: 1; display: grid; grid-template-columns: 55% 45%; overflow: hidden; min-height: 220px; }
.lk-lib-preview { background: linear-gradient(180deg,#fff7ed,#fef3c7 60%,#d1fae5); display: flex; flex-direction: column; overflow: hidden; border-right: 1px solid rgba(249,115,22,0.15); }
.lk-lib-header { display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; background: rgba(255,247,237,0.96); border-bottom: 1px solid rgba(249,115,22,0.15); }
.lk-lib-logo { font-family: "Syne",sans-serif; font-size: 10px; font-weight: 800; color: #78350f; }
.lk-lib-badge { background: linear-gradient(135deg,#fbbf24,#f97316); color: #fff; font-size: 9px; font-weight: 800; padding: 2px 7px; border-radius: 99px; }
.lk-lib-search { margin: 5px 8px; padding: 5px 8px; background: #fff; border-radius: 99px; border: 1px solid rgba(249,115,22,0.2); font-size: 8px; color: #c4884a; }
.lk-lib-tags { display: flex; gap: 4px; padding: 0 8px 5px; flex-wrap: wrap; }
.lk-tag { padding: 2px 7px; border-radius: 99px; font-size: 7px; font-weight: 700; border: 1px solid rgba(249,115,22,0.25); color: #c2400a; background: #fff; white-space: nowrap; }
.lk-tag-active { background: linear-gradient(135deg,#f97316,#f59e0b); color: #fff; border-color: transparent; }
.lk-lib-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 5px 8px 8px; flex: 1; }
.lk-card { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(120,53,15,0.1); position: relative; border: 2px solid transparent; }
.lk-card-done { border-color: #fbbf24; }
.lk-card-top { height: 38px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.lk-card-bot { padding: 3px 5px 5px; }
.lk-card-name { font-size: 7px; font-weight: 800; color: #78350f; line-height: 1.2; margin-bottom: 2px; }
.lk-diff { font-size: 6px; font-weight: 700; padding: 1px 5px; border-radius: 99px; }
.lk-easy { background: #d1fae5; color: #065f46; } .lk-med { background: #fef3c7; color: #92400e; }
.lk-done-badge { position: absolute; top: 4px; right: 4px; font-size: 10px; }
.lk-reader-peek { background: linear-gradient(180deg,#87ceeb,#c8f0c8 60%,#66bb6a); display: flex; flex-direction: column; position: relative; overflow: hidden; }
.lk-scene-bg { position: absolute; inset: 0; display: flex; flex-direction: column; }
.lk-sky { flex: 1; } .lk-trees { font-size: 14px; line-height: 1; padding: 0 4px; opacity: 0.75; letter-spacing: -2px; }
.lk-ground { height: 30%; background: linear-gradient(180deg,#66bb6a,#388e3c); border-radius: 50% 50% 0 0/12px 12px 0 0; }
.lk-char-peek { position: relative; z-index: 2; display: flex; justify-content: center; margin-top: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); animation: charMini 3s ease-in-out infinite; }
@keyframes charMini { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
.lk-narr-peek { position: relative; z-index: 2; background: rgba(255,247,237,0.93); border-top: 2px solid rgba(249,115,22,0.2); padding: 6px 8px; display: flex; gap: 5px; align-items: flex-start; }
.lk-narr-icon { width: 16px; height: 16px; background: #f97316; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; flex-shrink: 0; margin-top: 1px; }
.lk-narr-peek p { font-size: 7px; font-weight: 700; color: #3d1a00; line-height: 1.4; }
.lk-nav-peek { display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; background: rgba(0,0,0,0.3); font-size: 12px; color: rgba(255,255,255,0.7); }
.lk-dots-peek { display: flex; gap: 4px; align-items: center; }
.lk-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.3); }
.lk-dot-active { background: #fbbf24; width: 14px; border-radius: 3px; }

/* ═══════════════════════════════════════════
   EASYSOLVE
═══════════════════════════════════════════ */
.es-live-preview { flex: 1; display: flex; overflow: hidden; background: #0a1a14; min-height: 220px; }
.es-sidebar { width: 110px; background: #0d1e17; border-right: 1px solid rgba(56,217,169,0.1); display: flex; flex-direction: column; padding: 10px 8px; gap: 4px; flex-shrink: 0; }
.es-logo-mini { font-family: var(--font-mono); font-size: 18px; color: var(--teal); text-align: center; padding: 6px 0 10px; border-bottom: 1px solid rgba(56,217,169,0.1); margin-bottom: 6px; }
.es-subject-list { display: flex; flex-direction: column; gap: 2px; }
.es-subject { font-family: var(--font-mono); font-size: 7px; color: rgba(56,217,169,0.45); padding: 4px 6px; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.es-subj-active { background: rgba(56,217,169,0.12); color: var(--teal); border: 1px solid rgba(56,217,169,0.2); }
.es-main { flex: 1; display: flex; flex-direction: column; padding: 10px; gap: 8px; overflow: hidden; min-width: 0; }
.es-header-bar { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.es-title { font-family: var(--font-mono); font-size: 9px; font-weight: 700; color: var(--teal); letter-spacing: 0.08em; text-transform: uppercase; }
.es-counter { font-family: var(--font-mono); font-size: 7px; color: rgba(56,217,169,0.4); background: rgba(56,217,169,0.08); border: 1px solid rgba(56,217,169,0.15); padding: 2px 7px; border-radius: 99px; }
.es-formula-card { background: rgba(56,217,169,0.06); border: 1px solid rgba(56,217,169,0.15); border-radius: 8px; padding: 10px; flex-shrink: 0; }
.es-formula-name { font-family: var(--font-mono); font-size: 8px; font-weight: 700; color: var(--teal); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
.es-formula-tex { font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: 0.05em; }
.es-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }
.es-input-group label { font-family: var(--font-mono); font-size: 6px; color: rgba(56,217,169,0.5); display: block; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.05em; }
.es-input-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(56,217,169,0.2); border-radius: 4px; padding: 4px 6px; font-family: var(--font-mono); font-size: 8px; color: var(--text-2); }
.es-result { display: flex; align-items: center; justify-content: space-between; background: rgba(56,217,169,0.12); border: 1px solid rgba(56,217,169,0.25); border-radius: 5px; padding: 5px 8px; }
.es-result-lbl { font-family: var(--font-mono); font-size: 7px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; }
.es-result-val { font-family: var(--font-mono); font-size: 10px; color: #fff; }
.es-result-val strong { color: var(--teal); }
.es-steps { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px; flex: 1; min-height: 0; overflow: hidden; }
.es-steps-title { font-family: var(--font-mono); font-size: 7px; font-weight: 700; color: var(--text-2); margin-bottom: 5px; letter-spacing: 0.08em; text-transform: uppercase; }
.es-step { font-family: var(--font-mono); font-size: 7px; color: var(--text-3); padding: 2px 0; border-bottom: 1px solid rgba(255,255,255,0.04); line-height: 1.5; }
.es-step:last-child { border-bottom: none; }
.es-step-result { color: var(--teal); }
.es-step-result strong { color: var(--teal); }

/* ═══════════════════════════════════════════
   NEURO-SHELF
═══════════════════════════════════════════ */
.ns-live-preview { flex: 1; display: flex; overflow: hidden; background: #070b12; min-height: 340px; position: relative; height: 340px; }
.ns-sidebar { width: 110px; background: #0d1523; border-right: 1px solid #1a2d46; display: flex; flex-direction: column; padding: 10px 8px; gap: 4px; flex-shrink: 0; overflow: hidden; }
.ns-logo { font-family: "JetBrains Mono",monospace; font-size: 11px; font-weight: 700; color: #00d4ff; text-align: center; padding: 4px 0 8px; border-bottom: 1px solid #1a2d46; margin-bottom: 6px; letter-spacing: 0.15em; }
.ns-sb-divider { height: 1px; background: #1a2d46; margin: 4px 0; }
.ns-sb-label { font-family: "JetBrains Mono",monospace; font-size: 7px; color: #64748b; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 3px; }
.ns-sb-field { background: #0c1220; border: 1px solid #1a2d46; border-radius: 4px; padding: 3px 6px; font-family: "JetBrains Mono",monospace; font-size: 7px; color: #e2e8f0; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ns-sb-field--group { color: #00d4ff; border-color: rgba(0,212,255,0.25); }
.ns-sb-field--tags { color: #64748b; font-size: 6.5px; }
.ns-sb-item { display: flex; align-items: center; gap: 5px; padding: 4px 6px; border-radius: 4px; font-size: 7.5px; color: #94a3b8; border: 1px solid transparent; }
.ns-sb-item--active { background: rgba(0,212,255,0.08); border-color: #00d4ff; color: #e2e8f0; }
.ns-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.ns-graph-area { flex: 1; position: relative; overflow: hidden; display: flex; flex-direction: column; min-height: 340px; }
.ns-dot-grid { position: absolute; inset: 0; background-image: radial-gradient(circle,#1a2d46 1px,transparent 1px); background-size: 22px 22px; opacity: 0.5; pointer-events: none; }
.ns-topbar { position: relative; z-index: 2; height: 32px; background: #0d1523; border-bottom: 1px solid #1a2d46; display: flex; align-items: center; padding: 0 10px; gap: 8px; flex-shrink: 0; }
.ns-topbar-logo { font-family: "JetBrains Mono",monospace; font-size: 8px; font-weight: 700; color: #00d4ff; letter-spacing: 0.1em; white-space: nowrap; }
.ns-topbar-logo em { font-style: normal; color: #64748b; font-size: 7px; margin-left: 3px; }
.ns-topbar-btns { display: flex; gap: 4px; flex: 1; }
.ns-tbtn { font-family: "JetBrains Mono",monospace; font-size: 7px; color: #64748b; background: transparent; border: 1px solid #1a2d46; border-radius: 4px; padding: 2px 6px; white-space: nowrap; }
.ns-tbtn--accent { color: #00d4ff; border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.07); }
.ns-stats-mini { font-family: "JetBrains Mono",monospace; font-size: 7px; color: #64748b; white-space: nowrap; margin-left: auto; }
.ns-stats-mini b { color: #00d4ff; }
.ns-svg { position: absolute; top: 32px; left: 0; right: 0; bottom: 0; width: 100%; height: calc(100% - 32px); min-height: 308px; }
.ns-minimap { position: absolute; bottom: 38px; right: 8px; background: rgba(7,11,18,0.92); border: 1px solid #1a2d46; border-radius: 6px; overflow: hidden; z-index: 5; }
.ns-mm-label { font-family: "JetBrains Mono",monospace; font-size: 6px; color: #64748b; padding: 3px 6px; text-transform: uppercase; letter-spacing: 0.12em; border-bottom: 1px solid #1a2d46; }
.ns-legend { position: absolute; bottom: 8px; left: 8px; background: rgba(13,21,35,0.92); border: 1px solid #1a2d46; border-radius: 6px; padding: 6px 9px; z-index: 5; display: flex; flex-direction: column; gap: 3px; }
.ns-leg-item { display: flex; align-items: center; gap: 5px; font-family: "JetBrains Mono",monospace; font-size: 7px; color: #94a3b8; }
.ns-ctx { position: absolute; top: 60px; right: 115px; background: #0d1523; border: 1px solid #1a2d46; border-radius: 7px; padding: 4px; z-index: 5; min-width: 126px; box-shadow: 0 8px 24px rgba(0,0,0,0.55); }
.ns-cx-item { padding: 5px 9px; border-radius: 4px; font-family: "JetBrains Mono",monospace; font-size: 7.5px; color: #94a3b8; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.ns-cx-primary { color: #00d4ff; }
.ns-cx-sep { height: 1px; background: #1a2d46; margin: 3px 0; }
.ns-pf-badge { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: #000; font-family: "JetBrains Mono",monospace; font-size: 7.5px; font-weight: 700; padding: 4px 12px; border-radius: 20px; z-index: 5; white-space: nowrap; }

/* ═══════════════════════════════════════════
   BASECALC INLINE STYLES (scoped)
═══════════════════════════════════════════ */
.pf-card--bc { border-color: rgba(34,211,238,0.12); }
.pf-tag--bc { color: #22d3ee; border-color: rgba(34,211,238,0.35); background: rgba(34,211,238,0.08); }
.pf-title-accent--bc { color: #22d3ee; }
.pf-link-primary--bc { background: linear-gradient(135deg,#0e7490,#22d3ee) !important; }
.pf-btn-cs--bc { border-color: rgba(34,211,238,0.3) !important; color: #22d3ee !important; }
.pf-preview--bc { background: #080b10; }
.pf-preview-inner--bc { border-color: rgba(34,211,238,0.12); }
.bc-live-preview { width: 100%; height: 100%; display: flex; flex-direction: column; background: #080b10; font-family: "JetBrains Mono","Courier New",monospace; overflow: hidden; position: relative; }
.bc-live-preview::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 10; background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,229,255,0.025) 3px,rgba(0,229,255,0.025) 4px); }
.bc-header { display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-bottom: 1px solid rgba(34,211,238,0.15); background: rgba(34,211,238,0.04); flex-shrink: 0; }
.bc-logo { font-size: 9px; font-weight: 700; letter-spacing: 3px; color: #e0f2fe; }
.bc-dot { color: #22d3ee; }
.bc-badge { font-size: 8px; letter-spacing: 2px; color: #22d3ee; border: 1px solid rgba(34,211,238,0.3); padding: 1px 5px; border-radius: 2px; background: rgba(34,211,238,0.06); }
.bc-status { display: flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(0,0,0,0.25); font-size: 8px; color: rgba(34,211,238,0.6); flex-shrink: 0; border-bottom: 1px solid rgba(34,211,238,0.08); }
.bc-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #22d3ee; box-shadow: 0 0 6px #22d3ee; animation: bcPulse 2s infinite; }
@keyframes bcPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.bc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 8px 8px 5px; flex-shrink: 0; }
.bc-card { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 5px 7px; }
.bc-card-label { font-size: 7px; letter-spacing: 2px; margin-bottom: 2px; display: flex; align-items: center; justify-content: space-between; }
.bc-base-pill { font-size: 6px; padding: 1px 4px; border-radius: 2px; font-weight: 700; letter-spacing: 1px; }
.bc-value { font-size: 13px; font-weight: 700; letter-spacing: 2px; line-height: 1.2; }
.bc-groups { margin-top: 3px; display: flex; gap: 2px; flex-wrap: wrap; }
.bc-grp { font-size: 7px; padding: 1px 3px; border-radius: 2px; background: rgba(255,255,255,0.06); letter-spacing: 1px; }
.bc-card--bin { border-color: rgba(57,255,20,0.2); }
.bc-card--bin .bc-card-label { color: rgba(57,255,20,0.7); }
.bc-card--bin .bc-base-pill { background: rgba(57,255,20,0.12); color: #39ff14; border: 1px solid rgba(57,255,20,0.2); }
.bc-card--bin .bc-value { color: #39ff14; text-shadow: 0 0 8px rgba(57,255,20,0.4); }
.bc-card--bin .bc-grp { background: rgba(57,255,20,0.08); color: rgba(57,255,20,0.8); border: 1px solid rgba(57,255,20,0.15); }
.bc-card--oct { border-color: rgba(255,179,0,0.2); }
.bc-card--oct .bc-card-label { color: rgba(255,179,0,0.7); }
.bc-card--oct .bc-base-pill { background: rgba(255,179,0,0.12); color: #ffb300; border: 1px solid rgba(255,179,0,0.2); }
.bc-card--oct .bc-value { color: #ffb300; text-shadow: 0 0 8px rgba(255,179,0,0.4); }
.bc-card--dec { border-color: rgba(34,211,238,0.3); background: rgba(34,211,238,0.04); }
.bc-card--dec .bc-card-label { color: rgba(34,211,238,0.8); }
.bc-card--dec .bc-base-pill { background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.3); }
.bc-card--dec .bc-value { color: #fff; font-size: 15px; text-shadow: 0 0 10px rgba(34,211,238,0.5); }
.bc-card--hex { border-color: rgba(255,45,120,0.2); }
.bc-card--hex .bc-card-label { color: rgba(255,45,120,0.7); }
.bc-card--hex .bc-base-pill { background: rgba(255,45,120,0.12); color: #ff2d78; border: 1px solid rgba(255,45,120,0.2); }
.bc-card--hex .bc-value { color: #ff2d78; text-shadow: 0 0 8px rgba(255,45,120,0.4); }
.bc-steps { flex: 1; margin: 0 8px 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(34,211,238,0.1); border-radius: 4px; padding: 6px 8px; overflow: hidden; min-height: 0; }
.bc-steps-title { font-size: 7px; letter-spacing: 3px; color: rgba(34,211,238,0.5); margin-bottom: 5px; padding-bottom: 4px; border-bottom: 1px solid rgba(34,211,238,0.1); }
.bc-step-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 3px; }
.bc-step-n { font-size: 7px; color: rgba(34,211,238,0.4); min-width: 10px; flex-shrink: 0; }
.bc-step-txt { font-size: 8px; color: rgba(200,216,232,0.7); }
.bc-step-txt em { font-style: normal; color: #ffb300; }
.bc-step-txt strong { font-style: normal; color: #22d3ee; font-weight: 700; }
.bc-step-result { margin-top: 5px; padding: 4px 6px; background: rgba(34,211,238,0.06); border: 1px solid rgba(34,211,238,0.15); border-radius: 3px; font-size: 9px; color: #22d3ee; letter-spacing: 2px; text-align: center; }

/* ═══════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════ */
#contact { background: var(--ink-2); border-top: 1px solid var(--stroke); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; margin-top: 1rem; }
.contact-left .section-title { margin-bottom: 1rem; }
.contact-left .section-title em { font-style: normal; color: var(--accent); }
.contact-desc { color: var(--text-2); margin-bottom: 2rem; max-width: 380px; }
.contact-email-link { display: inline-block; font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--accent); border-bottom: 2px solid rgba(var(--accent-rgb),0.4); padding-bottom: 2px; margin-bottom: 2.5rem; transition: border-color 0.2s; }
.contact-email-link:hover { border-color: var(--accent); }
.socials-wrap { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.social-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--ink-3); border: 1px solid var(--stroke-2); border-radius: var(--r-md); padding: 0.55rem 1rem; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-2); transition: border-color 0.2s, color 0.2s, transform 0.2s; }
.social-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.social-btn--lynk:hover { border-color: #f59e0b; color: #f59e0b; background: rgba(245,158,11,0.08); }
.social-svg { width: 15px; height: 15px; flex-shrink: 0; }
.contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 1px; }
.form-group input, .form-group textarea { background: var(--ink-3); border: 1px solid var(--stroke-2); border-radius: var(--r-md); padding: 0.85rem 1rem; color: var(--text); font-family: var(--font); font-size: 0.9rem; font-weight: 300; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical; }
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--text-3); }
.form-group input:focus, .form-group textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.form-submit { background: var(--accent); color: #fff; border: none; border-radius: var(--r-md); padding: 0.9rem 1.8rem; font-family: var(--font); font-size: 0.9rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; align-self: flex-start; cursor: pointer; transition: background 0.2s, transform 0.2s; }
.form-submit:hover { background: var(--accent-2); transform: translateY(-2px); }
.form-note { font-family: var(--font-mono); font-size: 0.78rem; color: var(--teal); min-height: 1.2em; }

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
footer { border-top: 1px solid var(--stroke); padding: 1.8rem clamp(1.5rem, 5vw, 3rem); }
.footer-inner { max-width: var(--max-w); margin: 0 auto; display: flex; align-items: center; gap: 1rem; }
.footer-logo { font-family: var(--font-display); font-weight: 800; font-size: 1.2rem; color: var(--accent); }
.footer-inner p { flex: 1; text-align: center; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); }
.back-top { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); transition: color 0.2s; }
.back-top:hover { color: var(--accent); }

/* ═══════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════ */
@media (max-width: 900px) {
  .hero-wrap { grid-template-columns: 1fr; text-align: center; }
  .hero-desc { margin-left: auto; margin-right: auto; }
  .hero-cta { justify-content: center; }
  .hero-scroll { justify-content: center; }
  .hero-card { display: none; }
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-photo-frame { max-width: 220px; margin: 0 auto; }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .pf-card { grid-template-columns: 1fr; }
  .pf-preview { border-right: none; border-bottom: 1px solid var(--stroke); min-height: 240px; }
  .cb-live-preview,.ks-live-preview,.lk-live-preview,.es-live-preview,.ns-live-preview { min-height: 240px; }
  .lk-reader-peek { display: none; }
  .lk-lib-preview { border-right: none; grid-column: 1/-1; }
  .ns-ctx,.ns-pf-badge { display: none; }
}
@media (max-width: 640px) {
  .nav-links { display: none; }
  #burger { display: flex; }
  .about-stats { flex-wrap: wrap; gap: 1.5rem; }
  .pf-highlights { grid-template-columns: 1fr; }
  .hero-name { letter-spacing: -2px; }
  .tl-item { grid-template-columns: 28px 1fr; gap: 0 1rem; }
  .es-sidebar { width: 80px; }
  .cb-kpi-row { grid-template-columns: 1fr 1fr; }
  .cb-chart-row { grid-template-columns: 1fr; }
  .cb-orders { display: none; }
  .ns-sidebar { width: 80px; }
}
@media (max-width: 400px) {
  .es-sidebar { display: none; }
  .ns-sidebar { display: none; }
  .pf-links-3 { flex-direction: column; }
  .pf-btn-3,.pf-btn-gh { flex: unset; width: 100%; }
}

/* ═══════════════════════════════════════════
   PAGE LOADER
═══════════════════════════════════════════ */
#page-loader { position: fixed; inset: 0; z-index: 9999; background: var(--ink); display: flex; align-items: center; justify-content: center; transition: opacity 0.5s var(--ease), transform 0.5s var(--ease); }
#page-loader.loader-done { opacity: 0; pointer-events: none; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 1.4rem; }
.loader-logo { font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; color: var(--accent); letter-spacing: -3px; animation: loader-pop 0.6s var(--ease) both; }
.loader-dot { display: inline-block; color: var(--teal); animation: loader-dot-blink 0.8s ease-in-out infinite; }
@keyframes loader-pop { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
@keyframes loader-dot-blink { 0%,100% { opacity: 1; transform: translateY(0); } 50% { opacity: 0.3; transform: translateY(-6px); } }
.loader-bar-track { width: 160px; height: 2px; background: var(--stroke-2); border-radius: 2px; overflow: hidden; }
.loader-bar { height: 100%; width: 0%; background: linear-gradient(90deg,var(--accent),var(--teal)); border-radius: 2px; transition: width 0.12s linear; }
.loader-text { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3); letter-spacing: 0.12em; animation: loader-fade 1s ease infinite alternate; }
@keyframes loader-fade { from { opacity: 0.4; } to { opacity: 1; } }

/* ═══════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════ */
#back-top-ring { position: fixed; bottom: 2rem; right: 2rem; z-index: 400; width: 48px; height: 48px; background: var(--ink-2); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.35); opacity: 0; transform: translateY(16px) scale(0.85); transition: opacity 0.3s var(--ease), transform 0.3s var(--ease); pointer-events: none; }
#back-top-ring.btr-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
#back-top-ring:hover { transform: translateY(-3px) scale(1.08) !important; }
.btr-svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
.btr-track { fill: none; stroke: var(--stroke-2); stroke-width: 2.5; }
.btr-fill { fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; transition: stroke-dashoffset 0.1s linear; }
.btr-arrow { position: relative; z-index: 1; font-size: 1rem; color: var(--text-2); transition: color 0.2s, transform 0.2s; }
#back-top-ring:hover .btr-arrow { color: var(--accent); transform: translateY(-2px); }

/* ═══════════════════════════════════════════
   CASE STUDY MODAL
═══════════════════════════════════════════ */
#cs-modal { position: fixed; inset: 0; z-index: 900; display: flex; align-items: center; justify-content: flex-end; pointer-events: none; }
#cs-modal.cs-open { pointer-events: all; }
.cs-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); opacity: 0; transition: opacity 0.35s var(--ease); }
#cs-modal.cs-open .cs-backdrop { opacity: 1; }
.cs-panel { position: relative; z-index: 1; width: min(680px,100vw); height: 100vh; background: var(--ink-2); border-left: 1px solid var(--stroke-2); display: flex; flex-direction: column; overflow: hidden; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.32,0,0.67,0); box-shadow: -20px 0 60px rgba(0,0,0,0.4); }
.cs-panel.cs-panel-in { transform: translateX(0); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
.cs-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 1.8rem 2rem 1.4rem; border-bottom: 1px solid var(--stroke); flex-shrink: 0; }
.cs-header-left { display: flex; flex-direction: column; gap: 0.4rem; }
.cs-tag { font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; padding: 0.2rem 0.7rem; border-radius: 100px; border: 1px solid; display: inline-block; width: fit-content; }
.cs-title { font-family: var(--font-display); font-size: 1.7rem; font-weight: 800; letter-spacing: -1px; line-height: 1.1; }
.cs-close { background: var(--ink-3); border: 1px solid var(--stroke-2); color: var(--text-2); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; cursor: pointer; flex-shrink: 0; transition: color 0.2s, border-color 0.2s, transform 0.2s; }
.cs-close:hover { color: var(--accent); border-color: var(--accent); transform: rotate(90deg); }
.cs-body { overflow-y: auto; flex: 1; padding: 1.6rem 2rem 2rem; display: flex; flex-direction: column; gap: 1.4rem; }
.cs-body::-webkit-scrollbar { width: 4px; }
.cs-body::-webkit-scrollbar-thumb { background: var(--stroke-2); border-radius: 2px; }
.cs-preview-wrap { border-radius: var(--r-lg); overflow: hidden; border: 1px solid var(--stroke); }
.cs-preview-box { height: 130px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; }
.cs-preview-emoji { font-size: 2.8rem; line-height: 1; }
.cs-preview-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: -0.5px; }
.cs-sections { display: flex; flex-direction: column; gap: 1rem; }
.cs-section { display: grid; grid-template-columns: 32px 1fr; gap: 0.75rem; align-items: start; padding: 1rem; background: var(--ink-3); border-radius: var(--r-md); border: 1px solid var(--stroke); }
.cs-section-icon { font-size: 1.1rem; margin-top: 0.1rem; }
.cs-section-title { font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.3rem; }
.cs-section-text { font-size: 0.875rem; color: var(--text-2); line-height: 1.75; }
.cs-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
.cs-feat-item { background: var(--ink-3); border: 1px solid var(--stroke); border-radius: var(--r-sm); padding: 0.4rem 0.75rem; font-size: 0.78rem; color: var(--text-2); display: flex; align-items: center; gap: 0.4rem; }
.cs-tech-row { display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; }
.cs-tech-lbl { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; }
.cs-tech-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.cs-tech-tag { background: rgba(var(--accent-rgb),0.1); border: 1px solid rgba(var(--accent-rgb),0.25); color: var(--accent-2); border-radius: var(--r-sm); padding: 0.2rem 0.6rem; font-family: var(--font-mono); font-size: 0.7rem; }
.cs-cta-note { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-3); text-align: center; padding-bottom: 0.5rem; }
.cs-cta-note kbd { background: var(--ink-3); border: 1px solid var(--stroke-2); border-radius: 4px; padding: 0.1rem 0.35rem; font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-2); }
.cs-open-btn { background: transparent; border: 1px solid var(--stroke-2); color: var(--text-2); font-family: var(--font-mono); font-size: 0.75rem; padding: 0.5rem 1rem; border-radius: var(--r-md); cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s; white-space: nowrap; }
.cs-open-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
.cs-scroll-hint { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--accent-glow); border: 1px solid rgba(var(--accent-rgb),0.2); border-radius: var(--r-md); font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-2); letter-spacing: 0.06em; transition: opacity 0.4s var(--ease), transform 0.4s var(--ease), max-height 0.4s var(--ease); max-height: 48px; overflow: hidden; }
.cs-scroll-hint.cs-hint-hidden { opacity: 0; max-height: 0; padding: 0; margin: 0; border: none; pointer-events: none; }
.cs-scroll-arrow { animation: cs-bounce 0.9s ease-in-out infinite; font-size: 0.9rem; }
@keyframes cs-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
@media (max-width: 640px) {
  .cs-panel { width: 100vw; border-left: none; }
  .cs-header { padding: 1.2rem 1.2rem 1rem; }
  .cs-body { padding: 1.2rem; }
  .cs-title { font-size: 1.3rem; }
  .cs-features { grid-template-columns: 1fr; }
  #back-top-ring { bottom: 1.2rem; right: 1.2rem; }
}
