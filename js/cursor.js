(function () {
  "use strict";

  function initCursor() {
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("has-custom-cursor");

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let raf = null;

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener(
      "mousemove",
      (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!document.body.classList.contains("cursor-ready")) {
          document.body.classList.add("cursor-ready");
        }
      },
      { passive: true }
    );

    document.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
    document.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));

    const hoverSelector =
      "a, button, .btn-solynx, .card-3d, .project-card, .filter-chip, .quote-option, .nav-toggle, input, select, textarea, [data-cursor]";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSelector)) document.body.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSelector)) document.body.classList.remove("cursor-hover");
    });

    raf = requestAnimationFrame(loop);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && raf) cancelAnimationFrame(raf);
      else if (!document.hidden) raf = requestAnimationFrame(loop);
    });
  }

  function initMagneticButtons() {
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    document.querySelectorAll("[data-magnetic], .btn-solynx--primary, .nav-cta .btn-solynx").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  window.SolynxCursor = { initCursor, initMagneticButtons };
})();
