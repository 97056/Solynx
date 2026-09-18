(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initScrollAnimations() {
    const items = document.querySelectorAll("[data-animate], [data-stagger], .word-reveal");
    if (!items.length) return;

    if (reducedMotion) {
      items.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initParallax() {
    if (reducedMotion) return;
    const els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      els.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${center * speed * -0.15}px, 0)`;
      });
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
          const suffix = el.getAttribute("data-suffix") || "";
          if (reducedMotion) {
            el.textContent = target + suffix;
            observer.unobserve(el);
            return;
          }
          const duration = 1600;
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  window.SolynxAnimations = {
    initScrollAnimations,
    initParallax,
    initCounters,
    reducedMotion,
  };
})();
