(function () {
  "use strict";

  function initParticles(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return null;

    const isNarrow = window.innerWidth < 992;
    // Skip full-page particles on phones/tablets — biggest scroll jank source
    if (isNarrow && canvasId === "particle-canvas") {
      canvas.remove();
      return null;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    const opts = Object.assign(
      {
        count: isNarrow ? 18 : 28,
        color: "0, 229, 192",
        maxDist: isNarrow ? 90 : 120,
        speed: 0.22,
        link: !isNarrow,
      },
      options || {}
    );

    let particles = [];
    let raf = null;
    let visible = true;
    let paused = false;
    let w = 0;
    let h = 0;
    let last = 0;
    const frameMs = isNarrow ? 48 : 33; // ~21fps / ~30fps
    let scrollTimer = null;

    function resize() {
      const parent = canvas.parentElement || document.body;
      w = parent.clientWidth || window.innerWidth;
      h = parent.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1 : 1.5);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function create() {
      particles = [];
      const count = Math.max(8, Math.floor(opts.count));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * opts.speed,
          vy: (Math.random() - 0.5) * opts.speed,
          r: Math.random() * 1.4 + 0.4,
        });
      }
    }

    function draw(now) {
      if (!visible || paused) {
        raf = null;
        return;
      }
      if (now - last < frameMs) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;

      ctx.clearRect(0, 0, w, h);
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + opts.color + ", 0.55)";
        ctx.fill();

        if (opts.link) {
          for (let j = i + 1; j < n; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < opts.maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle =
                "rgba(" + opts.color + ", " + 0.14 * (1 - dist / opts.maxDist) + ")";
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (visible && !paused && !raf) raf = requestAnimationFrame(draw);
    }

    resize();
    create();

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) start();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    window.addEventListener(
      "scroll",
      () => {
        paused = true;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          paused = false;
          start();
        }, 140);
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        resize();
        create();
      },
      { passive: true }
    );

    start();

    return {
      destroy: () => {
        if (raf) cancelAnimationFrame(raf);
        io.disconnect();
        clearTimeout(scrollTimer);
      },
    };
  }

  window.SolynxParticles = { initParticles };
})();
