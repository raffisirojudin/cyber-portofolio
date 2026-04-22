/* ═══════════════════════════════════════════
   KINETIC SOUL — Live Canvas Preview
   Append ini ke bagian bawah script.js kamu
═══════════════════════════════════════════ */
(function() {
  var canvas = document.getElementById('ks-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W, H, dpr, particles = [], noiseT = 0, rafId;
  var PALETTE = ['#ff006e','#ff4da6','#8338ec','#a855f7','#3a86ff','#60a5fa','#ff85c2'];
  var MAX = 120;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var wrap = canvas.parentElement;
    W = wrap.clientWidth; H = wrap.clientHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
  }

  // Tiny Perlin-like noise
  function noise(x, y) {
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    var xf = x - Math.floor(x), yf = y - Math.floor(y);
    var u = xf*xf*xf*(xf*(xf*6-15)+10);
    var v = yf*yf*yf*(yf*(yf*6-15)+10);
    // simplified hash-based
    var h1 = (X*374761393 + Y*668265263) & 0x7FFFFFFF;
    var h2 = ((X+1)*374761393 + Y*668265263) & 0x7FFFFFFF;
    var h3 = (X*374761393 + (Y+1)*668265263) & 0x7FFFFFFF;
    var h4 = ((X+1)*374761393 + (Y+1)*668265263) & 0x7FFFFFFF;
    var g = function(h, px, py) {
      h = h & 3;
      var gx = h < 2 ? (h === 0 ? 1 : -1) : 0;
      var gy = h >= 2 ? (h === 2 ? 1 : -1) : 0;
      return gx*px + gy*py;
    };
    return (1 - u) * (1 - v) * g(h1, xf, yf) +
            u     * (1 - v) * g(h2, xf-1, yf) +
           (1 - u) *  v     * g(h3, xf, yf-1) +
            u     *  v      * g(h4, xf-1, yf-1);
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = Math.random() * (W||400);
    this.y = Math.random() * (H||200);
    this.vx = 0; this.vy = 0;
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.alpha = 0.5 + Math.random() * 0.5;
    this.r = 1 + Math.random() * 2;
    this.noiseOff = Math.random() * 1000;
    this.trail = [];
    this.orbitA = Math.random() * Math.PI * 2;
    this.orbitR = 30 + Math.random() * Math.min(W||200, H||100) * 0.35;
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

    // Trail fade
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(5,5,8,0.18)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    var cx = W/2, cy = H/2;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.orbitA += p.orbitSpd * dt;
      var n = noise((p.x/W)*3 + noiseT + p.noiseOff, (p.y/H)*3 + noiseT*0.7);
      var flowA = n * Math.PI * 4;
      var tx = cx + Math.cos(p.orbitA) * p.orbitR;
      var ty = cy + Math.sin(p.orbitA) * p.orbitR;
      p.vx += (tx - p.x) * 0.016 * dt + Math.cos(flowA) * 0.25;
      p.vy += (ty - p.y) * 0.016 * dt + Math.sin(flowA) * 0.25;
      p.vx *= 0.93; p.vy *= 0.93;
      p.trail.push({x: p.x, y: p.y});
      if (p.trail.length > 12) p.trail.shift();
      p.x += p.vx * dt; p.y += p.vy * dt;

      // Trail
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (var t = 1; t < p.trail.length; t++) ctx.lineTo(p.trail[t].x, p.trail[t].y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.lineWidth = p.r * 0.7;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Only run when card is visible (IntersectionObserver)
  var started = false;
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting && !started) {
          started = true;
          init();
          rafId = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && started) {
          cancelAnimationFrame(rafId);
          started = false;
        }
      });
    }, { threshold: 0.1 });
    obs.observe(canvas);
  } else {
    init();
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', function() {
    if (started) { cancelAnimationFrame(rafId); resize(); rafId = requestAnimationFrame(loop); }
  }, { passive: true });
})();
