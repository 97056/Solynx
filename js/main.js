(function () {
  "use strict";

  function initLoader() {
    const loader = document.querySelector(".page-loader");
    const pct = document.querySelector(".loader-pct");
    const content = document.querySelector(".page-content");

    if (!loader) {
      document.body.classList.add("is-loaded");
      if (content) content.classList.add("is-ready");
      return;
    }

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let progress = 0;
    const start = performance.now();
    const duration = reduced ? 200 : 1400;

    function tick(now) {
      progress = Math.min(100, Math.floor(((now - start) / duration) * 100));
      if (pct) pct.textContent = progress + "%";
      if (progress < 100) {
        requestAnimationFrame(tick);
      } else {
        loader.classList.add("is-done");
        document.body.classList.add("is-loaded");
        if (content) content.classList.add("is-ready");
        setTimeout(() => loader.remove(), 700);
      }
    }

    requestAnimationFrame(tick);
  }

  function initPageTransitions() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (!href.endsWith(".html") && !href.endsWith("/")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      const content = document.querySelector(".page-content");
      if (content) {
        content.style.opacity = "0";
        content.style.transform = "scale(0.985) translateY(8px)";
      }
      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  }

  function injectBackground() {
    if (document.querySelector(".bg-system")) return;
    const bg = document.createElement("div");
    bg.className = "bg-system";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = `
      <div class="bg-grid"></div>
      <div class="bg-glow bg-glow--1"></div>
      <div class="bg-glow bg-glow--2"></div>
      <div class="bg-light-beam"></div>
      <canvas id="particle-canvas"></canvas>
    `;
    document.body.prepend(bg);
  }

  function boot() {
    injectBackground();
    initLoader();

    if (window.SolynxNavbar) window.SolynxNavbar.initNavbar();
    if (window.SolynxCursor) {
      window.SolynxCursor.initCursor();
      window.SolynxCursor.initMagneticButtons();
    }
    if (window.SolynxAnimations) {
      window.SolynxAnimations.initScrollAnimations();
      window.SolynxAnimations.initParallax();
      window.SolynxAnimations.initCounters();
    }
    if (window.SolynxParticles) {
      const narrow = window.innerWidth < 992;
      window.SolynxParticles.initParticles("particle-canvas", {
        count: narrow ? 0 : 24,
        link: !narrow,
      });
      window.SolynxParticles.initParticles("cta-particles", {
        count: narrow ? 12 : 20,
        color: "58, 160, 255",
        link: false,
      });
    }
    if (window.Solynx3D) {
      window.Solynx3D.initTiltCards();
      window.Solynx3D.initHero3D();
      window.Solynx3D.initTechMap();
    }
    if (window.SolynxForms) {
      window.SolynxForms.initContactForm();
      window.SolynxForms.initQuoteWizard();
      window.SolynxForms.initFAQ();
      window.SolynxForms.initFilters();
    }

    initPageTransitions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
