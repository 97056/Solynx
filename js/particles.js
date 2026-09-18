(function () {
  "use strict";

  function initParticles(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return null;

    const ctx = canvas.getContext("2d");
    const opts = Object.assign(
      {
        count: 48,
        color: "0, 229, 192",
        maxDist: 140,
        speed: 0.35,
      },
      options || {}
    );

    let particles = [];
    let raf = null;
    let visible = true;
    let w = 0,
      h = 0;

    function resize() {
      const parent = canvas.parentElement || document.body;
      w = parent.clientWidth || window.innerWidth;
      h = parent.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function create() {
      particles = [];
      const count = window.innerWidth < 768 ? Math.floor(opts.count * 0.45) : opts.count;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * opts.speed,
          vy: (Math.random() - 0.5) * opts.speed,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    }

    function draw() {
      if (!visible) {
        raf = null;
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${opts.color}, 0.7)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < opts.maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${opts.color}, ${0.18 * (1 - dist / opts.maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    create();

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    window.addEventListener(
      "resize",
      () => {
        resize();
        create();
      },
      { passive: true }
    );

    if (visible) raf = requestAnimationFrame(draw);

    return { destroy: () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); } };
  }

  window.SolynxParticles = { initParticles };
})();
