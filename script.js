"use strict";

/* PAGE LOADER */
(function(){
  var loader=document.getElementById("page-loader");
  var bar=document.querySelector(".loader-bar");
  if(!loader)return;
  var prog=0;
  var iv=setInterval(function(){prog+=Math.random()*18;if(prog>90)prog=90;if(bar)bar.style.width=prog+"%";},80);
  function hideLoader(){clearInterval(iv);if(bar)bar.style.width="100%";setTimeout(function(){loader.classList.add("loader-done");setTimeout(function(){loader.style.display="none";},600);},300);}
  if(document.readyState==="complete"){hideLoader();}else{window.addEventListener("load",hideLoader);}
  setTimeout(hideLoader,3000);
})();

/* THEME TOGGLE */
var html=document.documentElement;
var themeBtn=document.getElementById("theme-toggle");
var saved=localStorage.getItem("theme");
if(saved)html.setAttribute("data-theme",saved);
if(themeBtn){
  themeBtn.addEventListener("click",function(){
    var next=html.getAttribute("data-theme")==="dark"?"light":"dark";
    html.setAttribute("data-theme",next);
    localStorage.setItem("theme",next);
  });
}

/* NAVBAR SCROLL & BURGER */
var navbar=document.getElementById("navbar");
var burger=document.getElementById("burger");
var mobileMenu=document.getElementById("mobile-menu");
window.addEventListener("scroll",function(){if(navbar)navbar.classList.toggle("scrolled",window.scrollY>30);},{passive:true});
if(burger&&mobileMenu){
  burger.addEventListener("click",function(){burger.classList.toggle("open");mobileMenu.classList.toggle("open");});
  mobileMenu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){burger.classList.remove("open");mobileMenu.classList.remove("open");});});
}

/* REVEAL ON SCROLL */
var reveals=document.querySelectorAll(".reveal");
function doReveal(){var vh=window.innerHeight;reveals.forEach(function(el){if(el.getBoundingClientRect().top<vh-40)el.classList.add("visible");});}
doReveal();
window.addEventListener("scroll",doReveal,{passive:true});
window.addEventListener("load",doReveal);

/* TYPING ANIMATION */
var typedEl=document.getElementById("typed-text");
if(typedEl){
  var phrases=["web experiences.","clean interfaces.","fast frontends.","modern UIs."];
  var ci=0,pi=0,del=false;
  function tick(){
    var phrase=phrases[pi];
    if(!del){typedEl.textContent=phrase.slice(0,++ci);if(ci===phrase.length){del=true;setTimeout(tick,1800);return;}}
    else{typedEl.textContent=phrase.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
    setTimeout(tick,del?55:95);
  }
  setTimeout(tick,1200);
}

/* SKILL BARS */
function animateBars(){document.querySelectorAll(".skill-bar-fill").forEach(function(bar){if(bar.getBoundingClientRect().top<window.innerHeight){bar.style.width=bar.dataset.width+"%";}});}
animateBars();
window.addEventListener("scroll",animateBars,{passive:true});

/* SKILL MODAL */
var modal=document.getElementById("skill-modal");
var modalClose=document.getElementById("modal-close");
var SKILLS={
  html:{emoji:"🌐",title:"HTML",level:"90% — Mahir",desc:"Bahasa dasar struktur setiap halaman web. Fondasi utama seorang web developer.",tags:["Semantik","Form","SEO","Aksesibilitas"]},
  css:{emoji:"🎨",title:"CSS",level:"80% — Mahir",desc:"Mengatur tampilan visual: warna, layout, animasi, dan responsivitas di semua layar.",tags:["Flexbox","Grid","Animasi","Responsif"]},
  js:{emoji:"⚡",title:"JavaScript",level:"70% — Menengah",desc:"Membuat halaman interaktif: klik, API, validasi form, dan fitur dinamis lainnya.",tags:["DOM","ES6+","Fetch","Async/Await"]},
  react:{emoji:"⚛️",title:"React",level:"60% — Menengah",desc:"Library UI berbasis komponen dari Meta. Kode lebih terorganisir dan bisa dipakai ulang.",tags:["Hooks","State","Props","JSX"]},
  git:{emoji:"🐙",title:"Git",level:"75% — Mahir",desc:"Version control untuk kolaborasi tim, riwayat perubahan, branching, dan rollback.",tags:["Commit","Branch","Merge","GitHub"]},
  figma:{emoji:"✏️",title:"Figma",level:"65% — Menengah",desc:"Desain UI/UX untuk wireframe, mockup, dan prototipe. Membantu mengimplementasi desain ke kode.",tags:["Wireframe","Mockup","Prototipe","Auto Layout"]},
};
if(modal&&modalClose){
  document.querySelectorAll(".skill-card").forEach(function(card){
    card.addEventListener("click",function(){
      var d=SKILLS[card.dataset.skill];if(!d)return;
      document.getElementById("modal-icon").textContent=d.emoji;
      document.getElementById("modal-title-text").textContent=d.title;
      document.getElementById("modal-level").textContent=d.level;
      document.getElementById("modal-desc").textContent=d.desc;
      var tags=document.getElementById("modal-tags");tags.innerHTML="";
      d.tags.forEach(function(t){var s=document.createElement("span");s.textContent=t;tags.appendChild(s);});
      modal.classList.add("open");document.body.style.overflow="hidden";
    });
  });
  function closeModal(){modal.classList.remove("open");document.body.style.overflow="";}
  modalClose.addEventListener("click",closeModal);
  modal.querySelector(".modal-backdrop").addEventListener("click",closeModal);
  document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeModal();if(window.closeCaseStudy)window.closeCaseStudy();}});
}

/* CONTACT FORM */
var form=document.getElementById("contact-form");
var note=document.getElementById("form-note");
if(form&&note){
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var name=form.querySelector('[name="name"]').value.trim();
    var email=form.querySelector('[name="email"]').value.trim();
    var msg=form.querySelector('[name="message"]').value.trim();
    if(!name||!email||!msg){note.style.color="var(--coral)";note.textContent="Mohon isi semua kolom.";return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){note.style.color="var(--coral)";note.textContent="Format email tidak valid.";return;}
    var btn=form.querySelector(".form-submit");btn.textContent="Mengirim...";btn.disabled=true;
    setTimeout(function(){note.style.color="var(--teal)";note.textContent="✓ Pesan terkirim! Saya akan segera membalas.";form.reset();btn.innerHTML='Kirim Pesan <span class="btn-arrow">→</span>';btn.disabled=false;},1200);
  });
}

/* FOOTER YEAR & NAV ACTIVE */
var yearEl=document.getElementById("footer-year");
if(yearEl)yearEl.textContent=new Date().getFullYear();
var sections=document.querySelectorAll("section[id]");
window.addEventListener("scroll",function(){
  var pos=window.scrollY+100;
  sections.forEach(function(s){var link=document.querySelector('.nav-links a[href="#'+s.id+'"]');if(link)link.classList.toggle("active",pos>=s.offsetTop&&pos<s.offsetTop+s.offsetHeight);});
},{passive:true});

/* BACK TO TOP PROGRESS RING */
(function(){
  var btn=document.getElementById("back-top-ring");
  var fill=document.getElementById("btr-fill");
  if(!btn||!fill)return;
  var C=2*Math.PI*15.9;fill.style.strokeDasharray=C;fill.style.strokeDashoffset=C;
  function updateRing(){var scrolled=window.scrollY;var total=document.documentElement.scrollHeight-window.innerHeight;var progress=total>0?scrolled/total:0;fill.style.strokeDashoffset=C-C*progress;btn.classList.toggle("btr-visible",scrolled>200);}
  window.addEventListener("scroll",updateRing,{passive:true});updateRing();
})();

/* CASE STUDY MODAL */
(function(){
  var CASE_STUDIES={
    curtainbiz:{
      tag:"Featured Project",tagColor:"var(--accent)",title:"CurtainBiz Manager",
      problem:"Pemilik bisnis curtain kesulitan melacak pesanan, stok, dan keuangan secara manual menggunakan spreadsheet. Data tercecer, laporan HPP tidak akurat, dan tidak ada visibilitas real-time.",
      solution:"Membangun sistem manajemen berbasis web dengan dashboard KPI real-time, manajemen pesanan multi-channel, alert stok otomatis, dan kalkulator HPP terintegrasi menggunakan HTML, CSS, JavaScript, dan Supabase sebagai backend.",
      result:"Pemilik bisnis dapat memantau 4 KPI utama sekaligus, mengelola 100+ order tanpa spreadsheet, dan mendapatkan laporan keuangan otomatis. Waktu rekap bulanan berkurang dari 4 jam menjadi under 10 menit.",
      features:["📊 Dashboard KPI Real-time","🛒 Order Management Multi-channel","💰 Kalkulator HPP Otomatis","📦 Alert Stok Rendah","📈 Grafik Penjualan Bulanan","🔐 Auth & Multi-user"],
      tech:["HTML","CSS","JavaScript","Chart.js","Supabase"],
      previewBg:"linear-gradient(135deg,#0f0f1a,#13131a)",previewEmoji:"📊"
    },
    kinetic:{
      tag:"Gen-Art Engine",tagColor:"#ff006e",title:"Kinetic·Soul",
      problem:"Tidak ada tool generative art berbasis browser yang ringan, open-source, dan bisa dikustomisasi tanpa pengetahuan coding mendalam. Tool yang ada terlalu kompleks atau berbayar.",
      solution:"Membangun mesin generative art interaktif di atas Canvas API dengan sistem partikel fisika inverse square law, Perlin noise flow field, 3 visual mode, efek bloom, dan 6 palette warna. Fully client-side, zero dependency.",
      result:"Aplikasi berjalan smooth 60 FPS dengan 120+ partikel aktif di browser manapun. User bisa menghasilkan karya unik setiap saat dengan kombinasi mode dan palette yang berbeda.",
      features:["✦ 3 Visual Modes (Galaxy, Web, Explosion)","🎨 6 Color Palettes","⚡ Perlin Noise Physics","🔊 Procedural Audio","📸 Export PNG","🎛 Parameter Sliders"],
      tech:["HTML","CSS","JavaScript","Canvas API","Web Audio API"],
      previewBg:"linear-gradient(135deg,#050508,#1a0a2e)",previewEmoji:"✦"
    },
    lentera:{
      tag:"Interactive Storytelling",tagColor:"#f97316",title:"Lentera Kecil",
      problem:"Anak-anak Indonesia kehilangan akses ke dongeng tradisional Nusantara yang interaktif. Konten digital anak yang ada mayoritas berformat video pasif dan tidak adaptif.",
      solution:"Mesin dongeng interaktif dengan 38 cerita rakyat Nusantara, karakter SVG animasi original, background scene dinamis, ambient sound procedural, dan sistem progress berbintang untuk memotivasi anak terus membaca.",
      result:"Platform yang dapat dinikmati anak usia 4–10 tahun tanpa koneksi internet, dengan 38 cerita lengkap dengan pesan moral, sistem bintang yang mendorong engagement, dan pengalaman audio-visual yang imersif.",
      features:["📚 38 Dongeng Nusantara","🎭 Karakter SVG Animasi Original","🔊 Ambient Sound Engine","⭐ Sistem Progress & Reward","🔍 Filter & Pencarian Cerita","💾 Offline-capable"],
      tech:["HTML","CSS","JavaScript","Web Audio API","SVG Animation"],
      previewBg:"linear-gradient(180deg,#87ceeb,#66bb6a)",previewEmoji:"🏮"
    },
    easysolve:{
      tag:"Science Calculator",tagColor:"#38d9a9",title:"EasySolve",
      problem:"Pelajar sering kesulitan memahami langkah-langkah pengerjaan soal sains. Kalkulator biasa hanya memberikan jawaban tanpa penjelasan, sehingga tidak membantu pemahaman konsep.",
      solution:"Platform kalkulator sains komprehensif dengan 100+ rumus dari 7 mata pelajaran yang tidak hanya memberikan hasil, tetapi juga menampilkan langkah pengerjaan step-by-step yang jelas dengan render KaTeX.",
      result:"Pelajar dapat mengerjakan soal dari 7 mata pelajaran berbeda dalam satu platform, memahami proses perhitungan secara visual, dan menggunakan sebagai referensi belajar mandiri yang efektif.",
      features:["🔢 100+ Rumus Lengkap","📚 7 Mata Pelajaran","📝 Step-by-step Explanation","⚡ Render KaTeX","🔍 Pencarian Rumus","📱 Responsive Design"],
      tech:["HTML","CSS","JavaScript","KaTeX"],
      previewBg:"linear-gradient(135deg,#0a1a14,#0d1e17)",previewEmoji:"∑"
    },
    basecalc:{
      tag:"Number Base Converter",tagColor:"#22d3ee",title:"BaseCalc·Insight",
      problem:"Pelajar seringkali kesulitan memahami konversi antar sistem bilangan karena alat yang tersedia hanya menampilkan hasil akhir tanpa menjelaskan prosesnya, sehingga tidak mendukung pemahaman konsep secara mendalam.",
      solution:"Konverter 4-basis (Biner, Oktal, Desimal, Heksadesimal) berbasis web yang menampilkan setiap langkah perhitungan secara transparan — menggunakan metode Weighted Sum untuk input dan Repeated Division untuk output, dilengkapi visualisasi pengelompokan bit otomatis dan BigInt untuk akurasi penuh.",
      result:"Alat edukasi yang tidak hanya mengkonversi angka secara instan, tapi juga mengajarkan cara berpikirnya. Mendukung angka hingga tak terbatas dengan BigInt, validasi karakter real-time, dan breakdown langkah yang bisa dibuka/tutup.",
      features:["🔢 Konversi 4 Sistem Bilangan Sekaligus","🔍 Step-by-step Breakdown Interaktif","⚡ BigInt — Presisi Tanpa Batas","🟦 Bit Grouping Visual (3-bit & 4-bit)","✅ Validasi Input Real-time","🎨 Terminal / Cyberpunk UI"],
      tech:["HTML","CSS","JavaScript","BigInt API"],
      previewBg:"linear-gradient(135deg,#080b10,#0d1523)",previewEmoji:"⌗"
    },
    neuroshelf:{
      tag:"Knowledge Graph",tagColor:"#00d4ff",title:"Neuro·Shelf",
      problem:"Pengelolaan catatan tradisional (linear) tidak mencerminkan bagaimana otak manusia benar-benar menyimpan informasi — dalam jaringan koneksi, bukan daftar. Orang kehilangan hubungan antar topik yang sudah dipelajari.",
      solution:"Sistem visualisasi pengetahuan berbasis Force-Directed Graph menggunakan D3.js dengan auto-linking berbasis keyword matching, BFS path finder, Convex Hull grouping, minimap, undo/redo, dan export PNG — semua tersimpan di localStorage.",
      result:"User dapat memvisualisasikan 100+ node pengetahuan dalam jaringan interaktif, menemukan koneksi tersembunyi antar topik secara otomatis, dan mengeksplorasi jalur terpendek antar konsep menggunakan BFS algorithm.",
      features:["🕸 Force-Directed Graph D3.js","🔗 BFS Path Finder","✦ Auto-Link by Keyword Tags","🗺 Minimap + Convex Hull","↩ Undo / Redo 40 Steps","🖼 Export PNG & JSON"],
      tech:["HTML","CSS","JavaScript","D3.js v7","localStorage"],
      previewBg:"linear-gradient(135deg,#070b12,#0d1523)",previewEmoji:"🕸"
    },
    strivepro:{
      tag:"Habit-Building Engine",tagColor:"#4a8c62",title:"Strive·Pro",
      problem:"Mayoritas habit tracker menggunakan logika biner: berhasil atau gagal. Ini menciptakan efek 'ah sudahlah' — sekali gagal, motivasi langsung runtuh. Tidak ada mekanisme yang memperingatkan pengguna saat mengambil terlalu banyak kebiasaan baru sekaligus, berujung pada cognitive overload dan kegagalan massal.",
      solution:"Membangun Adaptive Momentum Engine berbasis skor 0–100 dengan Pity System (gagal sekali hanya berkurang 15%, bukan nol), Cognitive Load Guard yang mendeteksi beban mental dan memberi peringatan real-time, Dynamic SVG Arboretum di mana setiap habit tumbuh menjadi pohon sesuai streak & momentum, serta Ghost Streak Visualizer untuk kompetisi internal melawan performa terbaik diri sendiri.",
      result:"Sistem habit yang bukan sekadar mencatat, tetapi aktif memprediksi keberhasilan, memitigasi kegagalan, dan memvisualisasikan pertumbuhan karakter. Tiga tipe tracking (Checkpoint, Kuantitas, Focus Timer) terintegrasi dengan Habit Stacking — notifikasi berantai antar kebiasaan yang saling mendukung.",
      features:["⚡ Adaptive Momentum Engine (0–100)","🛡 Pity System — Cegah Efek 'Ah Sudahlah'","🧠 Cognitive Load Guard + Alert","🌳 SVG Arboretum Dinamis","👻 Ghost Streak Visualizer","🔗 Habit Stacking System","⏱ Focus Timer","💾 LocalStorage Persistence"],
      tech:["HTML","CSS","JavaScript","SVG","Canvas API","LocalStorage"],
      previewBg:"linear-gradient(160deg,#1c3329,#2d5040)",previewEmoji:"🌿"
    },
    carnival:{
      tag:"Arcade Game Collection",tagColor:"#e8304a",title:"Carnival·Arcade",
      problem:"Tidak ada platform browser yang mengumpulkan berbagai mini-game arcade klasik dalam satu tempat dengan sistem reward yang konsisten. Game arcade browser umumnya berdiri sendiri tanpa motivasi lintas game — pemain menyelesaikan satu game lalu pergi, bukan mengeksplorasi koleksi.",
      solution:"Membangun platform arcade game kolektif berbasis Canvas dengan 12 mini-game: Snake, Breakout, Pong, Space Invaders, Whack-a-mole, Memory Cards, dan lainnya. Semua game terintegrasi dengan sistem tiket universal yang terakumulasi lintas sesi, Web Audio FX, papan skor persisten via localStorage, serta dukungan penuh kontrol touchscreen (swipe/tap) dan keyboard.",
      result:"Platform arcade lengkap yang bisa dinikmati di mobile maupun desktop, dengan pengalaman bermain yang mulus dan sistem tiket yang mendorong pemain untuk terus menjelajahi semua 12 game. Skor dan tiket tersimpan antar sesi sehingga progress tidak hilang.",
      features:["🎮 12 Mini-Games Klasik","🎫 Sistem Tiket Universal","📱 Mobile Touch Controls","🖥 Desktop Keyboard Support","🔊 Web Audio Sound FX","🏆 Papan Skor Persisten"],
      tech:["HTML","CSS","JavaScript","Canvas API","Web Audio API","localStorage"],
      previewBg:"linear-gradient(135deg,#1a0208,#2d0a18)",previewEmoji:"🎪"
    },
  };

  var csModal=document.getElementById("cs-modal");
  var csPanel=document.getElementById("cs-panel");
  var csBackdrop=document.getElementById("cs-backdrop");
  var csClose=document.getElementById("cs-close");
  if(!csModal)return;

  function openCaseStudy(key){
    var d=CASE_STUDIES[key];if(!d)return;
    document.getElementById("cs-tag").textContent=d.tag;
    document.getElementById("cs-tag").style.color=d.tagColor;
    document.getElementById("cs-tag").style.borderColor=d.tagColor;
    document.getElementById("cs-tag").style.background=d.tagColor+"15";
    document.getElementById("cs-title").textContent=d.title;
    document.getElementById("cs-problem").textContent=d.problem;
    document.getElementById("cs-solution").textContent=d.solution;
    document.getElementById("cs-result").textContent=d.result;
    var previewBox=document.getElementById("cs-preview-box");
    previewBox.style.background=d.previewBg;
    previewBox.innerHTML='<div class="cs-preview-emoji">'+d.previewEmoji+'</div><div class="cs-preview-name">'+d.title+"</div>";
    document.getElementById("cs-features").innerHTML=d.features.map(function(f){return'<div class="cs-feat-item">'+f+"</div>";}).join("");
    document.getElementById("cs-tech").innerHTML=d.tech.map(function(t){return'<span class="cs-tech-tag">'+t+"</span>";}).join("");
    csModal.classList.add("cs-open");document.body.style.overflow="hidden";
    setTimeout(function(){csPanel.classList.add("cs-panel-in");},10);
    var body=document.querySelector(".cs-body");
    var hint=document.getElementById("cs-scroll-hint");
    if(body){body.scrollTop=0;if(hint)hint.classList.remove("cs-hint-hidden");body.addEventListener("scroll",function onScroll(){if(body.scrollTop>40){if(hint)hint.classList.add("cs-hint-hidden");body.removeEventListener("scroll",onScroll);}},{passive:true});}
  }
  function closeCaseStudy(){csPanel.classList.remove("cs-panel-in");setTimeout(function(){csModal.classList.remove("cs-open");document.body.style.overflow="";},350);}
  window.closeCaseStudy=closeCaseStudy;
  document.querySelectorAll(".cs-open-btn").forEach(function(btn){btn.addEventListener("click",function(e){e.stopPropagation();openCaseStudy(btn.dataset.project);});});
  if(csClose)csClose.addEventListener("click",closeCaseStudy);
  if(csBackdrop)csBackdrop.addEventListener("click",closeCaseStudy);
})();

/* KINETIC SOUL CANVAS */
(function(){
  var canvas=document.getElementById("ks-canvas");if(!canvas)return;
  var ctx=canvas.getContext("2d");
  var W=0,H=0,dpr=1,particles=[],noiseT=0,rafId=null,started=false;
  var PALETTE=["#ff006e","#ff4da6","#8338ec","#a855f7","#3a86ff","#60a5fa","#ff85c2"];
  var MAX=120;
  function fillBg(){ctx.fillStyle="#050508";ctx.fillRect(0,0,canvas.width,canvas.height);}
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);var wrap=canvas.parentElement;W=wrap.clientWidth||400;H=wrap.clientHeight||200;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+"px";canvas.style.height=H+"px";ctx.scale(dpr,dpr);fillBg();}
  function noise(x,y){var X=Math.floor(x)&255,Y=Math.floor(y)&255;var xf=x-Math.floor(x),yf=y-Math.floor(y);var u=xf*xf*xf*(xf*(xf*6-15)+10),v=yf*yf*yf*(yf*(yf*6-15)+10);var h1=(X*374761393+Y*668265263)&0x7fffffff,h2=((X+1)*374761393+Y*668265263)&0x7fffffff,h3=(X*374761393+(Y+1)*668265263)&0x7fffffff,h4=((X+1)*374761393+(Y+1)*668265263)&0x7fffffff;var g=function(h,px,py){h=h&3;var gx=h<2?(h===0?1:-1):0;var gy=h>=2?(h===2?1:-1):0;return gx*px+gy*py;};return(1-u)*(1-v)*g(h1,xf,yf)+u*(1-v)*g(h2,xf-1,yf)+(1-u)*v*g(h3,xf,yf-1)+u*v*g(h4,xf-1,yf-1);}
  function Particle(){this.reset();}
  Particle.prototype.reset=function(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=0;this.vy=0;this.color=PALETTE[Math.floor(Math.random()*PALETTE.length)];this.alpha=0.5+Math.random()*0.5;this.r=1+Math.random()*2;this.noiseOff=Math.random()*1000;this.trail=[];this.orbitA=Math.random()*Math.PI*2;this.orbitR=30+Math.random()*Math.min(W,H)*0.35;this.orbitSpd=(0.0004+Math.random()*0.0007)*(Math.random()<0.5?1:-1);};
  function init(){resize();particles=[];for(var i=0;i<MAX;i++)particles.push(new Particle());}
  var lastT=0;
  function loop(ts){rafId=requestAnimationFrame(loop);var dt=Math.min((ts-lastT)/16.67,3);lastT=ts;noiseT+=0.0015;ctx.globalCompositeOperation="source-over";ctx.fillStyle="rgba(5,5,8,0.18)";ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation="lighter";var cx=W/2,cy=H/2;for(var i=0;i<particles.length;i++){var p=particles[i];p.orbitA+=p.orbitSpd*dt;var n=noise((p.x/W)*3+noiseT+p.noiseOff,(p.y/H)*3+noiseT*0.7);var flowA=n*Math.PI*4;var tx=cx+Math.cos(p.orbitA)*p.orbitR,ty=cy+Math.sin(p.orbitA)*p.orbitR;p.vx+=(tx-p.x)*0.016*dt+Math.cos(flowA)*0.25;p.vy+=(ty-p.y)*0.016*dt+Math.sin(flowA)*0.25;p.vx*=0.93;p.vy*=0.93;p.trail.push({x:p.x,y:p.y});if(p.trail.length>12)p.trail.shift();p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.trail.length>1){ctx.beginPath();ctx.moveTo(p.trail[0].x,p.trail[0].y);for(var t=1;t<p.trail.length;t++)ctx.lineTo(p.trail[t].x,p.trail[t].y);ctx.strokeStyle=p.color;ctx.globalAlpha=p.alpha*0.45;ctx.lineWidth=p.r*0.7;ctx.lineCap="round";ctx.stroke();}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.color;ctx.globalAlpha=p.alpha;ctx.fill();ctx.globalAlpha=1;}}
  (function earlyInit(){dpr=Math.min(window.devicePixelRatio||1,2);var wrap=canvas.parentElement;if(wrap&&wrap.clientWidth>0){W=wrap.clientWidth;H=wrap.clientHeight||220;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+"px";canvas.style.height=H+"px";ctx.scale(dpr,dpr);fillBg();}})();
  if("IntersectionObserver" in window){var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting&&!started){started=true;init();rafId=requestAnimationFrame(loop);}else if(!e.isIntersecting&&started){cancelAnimationFrame(rafId);rafId=null;started=false;}});},{threshold:0.05});obs.observe(canvas);}
  else{init();rafId=requestAnimationFrame(loop);}
  window.addEventListener("resize",function(){if(started&&rafId){cancelAnimationFrame(rafId);init();rafId=requestAnimationFrame(loop);}else{fillBg();}},{passive:true});
})();
