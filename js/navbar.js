(function () {
  "use strict";

  function initNavbar() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const overlay = document.querySelector(".nav-overlay");
    const links = document.querySelectorAll(".nav-link-solynx, .nav-overlay__list a");

    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 40);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    function setOpen(open) {
      if (!toggle || !overlay) return;
      toggle.classList.toggle("is-open", open);
      overlay.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (toggle && overlay) {
      toggle.addEventListener("click", () => {
        setOpen(!overlay.classList.contains("is-open"));
      });

      overlay.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });
    }

    // Active page
    const path = window.location.pathname.split("/").pop() || "index.html";
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const file = href.split("/").pop();
      if (file === path || (path === "" && file === "index.html")) {
        link.classList.add("is-active");
      }
    });
  }

  window.SolynxNavbar = { initNavbar };
})();
