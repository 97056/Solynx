(function () {
  "use strict";

  const BRAND = {
    logoDark: "assets/brand/logo-dark.png",
    iconLight: "assets/brand/favicon-light.png",
    iconDark: "assets/brand/favicon-dark.png",
    favicon: "assets/brand/favicon-dark.png",
    appleTouch: "assets/brand/favicon-dark.png",
  };

  const SOCIAL = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Solynx-Innovations/pfbid02bRsUAGiWi2rkX8Bz75n6KQUxknp6r1ixQ6229r5eTXf2U44yKRucvU496kGERSuhl/",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8.2h2.4V5.1c-.4-.1-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V12H6.5v3.4h2.4V22h3.5v-6.6h2.7l.5-3.4h-3.2V10c0-1 .3-1.8 1.6-1.8z"/></svg>',
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/solynx.innovations/",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm5.3-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 4.4c-2.1 0-2.3 0-3.2.1-2.1.1-3.9 1.9-4 4-.1.9-.1 1.1-.1 3.2s0 2.3.1 3.2c.1 2.1 1.9 3.9 4 4 .9.1 1.1.1 3.2.1s2.3 0 3.2-.1c2.1-.1 3.9-1.9 4-4 .1-.9.1-1.1.1-3.2s0-2.3-.1-3.2c-.1-2.1-1.9-3.9-4-4-.9-.1-1.1-.1-3.2-.1zm0 1.5c2 0 2.3 0 3.1.1 1.6.1 2.9 1.4 3 3 .1.8.1 1 .1 3s0 2.2-.1 3c-.1 1.6-1.4 2.9-3 3-.8.1-1 .1-3.1.1s-2.3 0-3.1-.1c-1.6-.1-2.9-1.4-3-3-.1-.8-.1-1-.1-3s0-2.2.1-3c.1-1.6 1.4-2.9 3-3 .8-.1 1.1-.1 3.1-.1z"/></svg>',
    },
    {
      label: "X",
      href: "https://x.com/solynxinno",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 3h3.1l-6.8 7.8L22 21h-5.8l-4.5-5.9L6.4 21H3.3l7.3-8.3L2 3h6l4.1 5.4L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z"/></svg>',
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@Solynx-s3u",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.6 12 4.6 12 4.6s-6.6 0-8.4.5A3 3 0 0 0 1.5 7.2 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0-.5-4.8zM9.8 15.2V8.8L15.7 12l-5.9 3.2z"/></svg>',
    },
  ];

  function socialLinksHtml() {
    return (
      '<div class="footer-social">' +
      SOCIAL.map(function (s) {
        return (
          '<a href="' +
          s.href +
          '" target="_blank" rel="noopener noreferrer" aria-label="' +
          s.label +
          '">' +
          s.icon +
          "</a>"
        );
      }).join("") +
      "</div>"
    );
  }

  const ARROW =
    '<span class="btn-arrow" aria-hidden="true"><svg viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M15 2.5L22.5 7 15 11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25.2" cy="7" r="1.4" fill="currentColor"/></svg></span>';

  // Hide Careers in nav/footer until this date (ISO). Set to past date to show again.
  const CAREERS_VISIBLE_AFTER = "2026-10-03";

  function isCareersVisible() {
    try {
      return Date.now() >= new Date(CAREERS_VISIBLE_AFTER + "T00:00:00").getTime();
    } catch (e) {
      return false;
    }
  }

  const NAV_ICONS = {
    home: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z",
    services: "M4 7h16M4 12h16M4 17h10",
    solutions: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 6v6m-3-3h6",
    portfolio: "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    technologies: "M9 3h6v4H9zM5 9h14v4H5zM8 15h8v6H8zM12 7v2M12 13v2",
    about: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4.5V20h14v-1.5C19 16 16 14 12 14z",
    careers: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 10h16v10H4z",
    contact: "M4 6h16v12H4zM4 7l8 6 8-6",
  };

  const navLinks = [
    { href: "index.html", label: "Home", icon: NAV_ICONS.home },
    { href: "services.html", label: "Services", icon: NAV_ICONS.services },
    { href: "solutions.html", label: "Solutions", icon: NAV_ICONS.solutions },
    { href: "portfolio.html", label: "Portfolio", icon: NAV_ICONS.portfolio },
    { href: "technologies.html", label: "Technologies", icon: NAV_ICONS.technologies },
    { href: "about.html", label: "About", icon: NAV_ICONS.about },
    { href: "careers.html", label: "Careers", icon: NAV_ICONS.careers, hiddenUntil: CAREERS_VISIBLE_AFTER },
    { href: "contact.html", label: "Contact", icon: NAV_ICONS.contact },
  ].filter(function (l) {
    return l.label !== "Careers" || isCareersVisible();
  });

  function navLinkHtml(l, className) {
    return (
      '<a class="' +
      className +
      '" href="' +
      l.href +
      '"><span class="nav-link__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="' +
      l.icon +
      '" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="nav-link__text">' +
      l.label +
      "</span></a>"
    );
  }

  const PAGE_VISUALS = {
    "solutions.html": {
      key: "solutions",
      label: "Sector systems",
      html:
        '<div class="hx-sol-grid" aria-hidden="true">' +
        '<div class="hx-sol-hub"><span>Solynx</span><small>Platform</small></div>' +
        '<div class="hx-sol-card hx-sol-card--1"><b>01</b><span>Commerce</span></div>' +
        '<div class="hx-sol-card hx-sol-card--2"><b>02</b><span>Health</span></div>' +
        '<div class="hx-sol-card hx-sol-card--3"><b>03</b><span>Finance</span></div>' +
        '<div class="hx-sol-card hx-sol-card--4"><b>04</b><span>Logistics</span></div>' +
        '<svg class="hx-sol-links" viewBox="0 0 400 300" preserveAspectRatio="none">' +
        '<path d="M200 150 L95 70 M200 150 L305 70 M200 150 L95 230 M200 150 L305 230" stroke="url(#solGrad)" stroke-width="1.2" fill="none"/>' +
        '<defs><linearGradient id="solGrad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00e5c0"/><stop offset="1" stop-color="#3aa0ff"/></linearGradient></defs>' +
        "</svg>" +
        '<div class="hx-sol-scan"></div>' +
        "</div>",
    },
    "services.html": {
      key: "services",
      label: "Capabilities",
      html: '<div class="hx-mod">Web systems</div><div class="hx-mod">Mobile products</div><div class="hx-mod">AI workflows</div><div class="hx-mod">Growth stack</div>',
    },
    "about.html": {
      key: "about",
      label: "Solynx core",
      html: '<div class="hx-orbit"></div><div class="hx-orbit"></div><div class="hx-dot"></div><div class="hx-core">S</div>',
    },
    "portfolio.html": {
      key: "portfolio",
      label: "Selected work",
      html: '<div class="hx-screen"></div><div class="hx-screen"></div>',
    },
    "technologies.html": {
      key: "technologies",
      label: "Stack chip",
      html: '<span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--h"></span><span class="hx-pin hx-pin--v"></span><span class="hx-pin hx-pin--v"></span><span class="hx-pin hx-pin--v"></span><span class="hx-pin hx-pin--v"></span><div class="hx-chip">SOLYNX</div>',
    },
    "careers.html": {
      key: "careers",
      label: "Growth path",
      html: '<div class="hx-step">Associate</div><div class="hx-step">Builder</div><div class="hx-step">Lead</div><div class="hx-step">Principal</div><div class="hx-rocket"></div>',
    },
    "contact.html": {
      key: "contact",
      label: "Signal live",
      html: '<div class="hx-wave"></div><div class="hx-wave"></div><div class="hx-wave"></div><div class="hx-beacon"></div>',
    },
    "quote.html": {
      key: "quote",
      label: "Project brief",
      html: '<div class="hx-plan"><span></span><span></span><span></span><span></span><div class="hx-check">✓</div></div>',
    },
    "web-development.html": {
      key: "web",
      label: "Web canvas",
      html: '<div class="hx-browser"><div class="hx-browser__bar"><i></i><i></i><i></i></div><div class="hx-browser__body"><span></span><span></span><span></span><span></span><span></span></div></div><div class="hx-code">&lt;/&gt;</div>',
    },
    "mobile-development.html": {
      key: "mobile",
      label: "App frames",
      html: '<div class="hx-phone"></div><div class="hx-phone"></div>',
    },
    "ui-ux.html": {
      key: "uiux",
      label: "Artboard",
      html: '<div class="hx-board"></div><div class="hx-frame"></div><div class="hx-frame"></div><div class="hx-cursor"></div>',
    },
    "ecommerce.html": {
      key: "ecommerce",
      label: "Commerce UI",
      html: '<div class="hx-prod"></div><div class="hx-prod"></div>',
    },
    "software-development.html": {
      key: "software",
      label: "Terminal",
      html: '<div class="hx-term"><div class="hx-term__bar"></div><div class="hx-term__body">$ solynx build --prod<br/>compiling modules...<br/>✓ ship ready</div></div>',
    },
    "ai-solutions.html": {
      key: "ai",
      label: "Neural net",
      html: '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M22 22 L36 50 M50 22 L36 50 M78 22 L64 50 M36 50 L50 78 M64 50 L50 78" stroke="rgba(0,229,192,0.4)" stroke-width="0.6" fill="none"/></svg><span class="hx-neuron"></span><span class="hx-neuron"></span><span class="hx-neuron"></span><span class="hx-neuron"></span><span class="hx-neuron"></span><span class="hx-neuron"></span>',
    },
    "digital-marketing.html": {
      key: "marketing",
      label: "Growth funnel",
      html: '<div class="hx-funnel"></div><div class="hx-funnel"></div><div class="hx-funnel"></div><div class="hx-funnel"></div>',
    },
    "seo.html": {
      key: "seo",
      label: "Search radar",
      html: '<div class="hx-radar"></div><div class="hx-radar"></div><div class="hx-radar"></div><div class="hx-sweep"></div><div class="hx-blip"></div>',
    },
    "testing.html": {
      key: "testing",
      label: "Quality gates",
      html: '<div class="hx-checkrow is-pass">Unit suites</div><div class="hx-checkrow is-pass">API contracts</div><div class="hx-checkrow is-pass">Visual checks</div><div class="hx-checkrow">Perf budget</div>',
    },
    "data-analytics.html": {
      key: "analytics",
      label: "Live metrics",
      html: '<div class="hx-bars"><span></span><span></span><span></span><span></span><span></span><span></span></div>',
    },
    "project-nova.html": {
      key: "nova",
      label: "Commerce OS",
      html: '<div class="hx-dash"><i></i><i></i><i></i><i></i></div>',
    },
    "project-pulse.html": {
      key: "pulse",
      label: "Health signal",
      html: '<div class="hx-line"></div><svg class="hx-ekg" viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 30 H40 L50 10 L60 50 L70 30 H110 L120 18 L130 42 L140 30 H200" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    },
    "project-atlas.html": {
      key: "atlas",
      label: "Insight core",
      html: '<div class="hx-brain"></div>',
    },
    "project-lumen.html": {
      key: "lumen",
      label: "Design tokens",
      html: '<div class="hx-swatch"></div><div class="hx-swatch"></div><div class="hx-swatch"></div><div class="hx-swatch"></div>',
    },
    "project-orbit.html": {
      key: "orbit",
      label: "Logistics map",
      html: '<div class="hx-map"></div><div class="hx-route"></div>',
    },
  };

  const PAGE_FILE_BY_PATH = {
    "/": "index.html",
    "/about": "about.html",
    "/services": "services.html",
    "/solutions": "solutions.html",
    "/portfolio": "portfolio.html",
    "/technologies": "technologies.html",
    "/careers": "careers.html",
    "/contact": "contact.html",
    "/quote": "quote.html",
    "/services/web-development": "web-development.html",
    "/services/mobile-app-development": "mobile-development.html",
    "/services/ui-ux-design": "ui-ux.html",
    "/services/ecommerce-development": "ecommerce.html",
    "/services/custom-software-development": "software-development.html",
    "/services/ai-solutions": "ai-solutions.html",
    "/services/digital-marketing": "digital-marketing.html",
    "/services/seo": "seo.html",
    "/services/software-testing": "testing.html",
    "/services/data-analytics": "data-analytics.html",
    "/portfolio/nova-commerce-os": "project-nova.html",
    "/portfolio/pulse-health": "project-pulse.html",
    "/portfolio/atlas-insight": "project-atlas.html",
    "/portfolio/lumen-design-system": "project-lumen.html",
    "/portfolio/orbit-logistics": "project-orbit.html",
  };

  function currentPage() {
    let path = window.location.pathname || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (PAGE_FILE_BY_PATH[path]) return PAGE_FILE_BY_PATH[path];
    const leaf = path.split("/").pop() || "index.html";
    if (leaf.endsWith(".html")) return leaf;
    if (leaf === "" || path === "/") return "index.html";
    return leaf + ".html";
  }

  function buildHeroVisual(page) {
    const config = PAGE_VISUALS[page];
    if (!config) return null;
    return (
      '<div class="hx-visual hx-visual--' +
      config.key +
      '" aria-hidden="true" data-animate="scale">' +
      config.html +
      '<span class="hx-visual__label">' +
      config.label +
      "</span></div>"
    );
  }

  function injectBrandHead() {
    const head = document.head;
    if (!head || head.querySelector('link[data-solynx-favicon]')) return;

    [
      { rel: "icon", type: "image/png", href: BRAND.favicon, sizes: "32x32" },
      { rel: "icon", type: "image/png", href: BRAND.iconLight, media: "(prefers-color-scheme: dark)" },
      { rel: "icon", type: "image/png", href: BRAND.iconDark, media: "(prefers-color-scheme: light)" },
      { rel: "apple-touch-icon", href: BRAND.appleTouch },
    ].forEach(function (t) {
      const link = document.createElement("link");
      Object.keys(t).forEach(function (k) {
        link.setAttribute(k, t[k]);
      });
      link.setAttribute("data-solynx-favicon", "true");
      head.appendChild(link);
    });
  }

  function brandMark() {
    return (
      '<span class="brand-logo__mark">' +
      '<img class="brand-logo__img brand-logo__img--on-dark" src="' +
      BRAND.iconLight +
      '" alt="" width="40" height="40" decoding="async">' +
      '<img class="brand-logo__img brand-logo__img--on-light" src="' +
      BRAND.iconDark +
      '" alt="" width="40" height="40" decoding="async">' +
      "</span>"
    );
  }

  function renderNavbar() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const desktop = navLinks
      .map(function (l) {
        return navLinkHtml(l, "nav-link-solynx");
      })
      .join("");
    const mobile = navLinks
      .map(function (l) {
        return navLinkHtml(l, "nav-overlay__link");
      })
      .join("");

    mount.innerHTML =
      '<nav class="navbar-solynx" aria-label="Primary">' +
      '<div class="container-solynx">' +
      '<a class="brand-logo" href="index.html" aria-label="Solynx Innovations home">' +
      brandMark() +
      '<span class="brand-logo__text"><span class="brand-logo__name">Solynx</span><span class="brand-logo__tag">Innovations</span></span>' +
      "</a>" +
      '<div class="nav-desktop">' +
      desktop +
      '<a class="btn-solynx btn-solynx--primary nav-cta" href="quote.html" data-magnetic>Start a Project</a>' +
      "</div>" +
      '<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay"><span></span></button>' +
      "</div></nav>" +
      '<div class="nav-overlay" id="nav-overlay" role="dialog" aria-label="Mobile navigation">' +
      '<div class="nav-overlay__list">' +
      mobile +
      "</div>" +
      '<div class="nav-overlay__cta"><a class="btn-solynx btn-solynx--primary btn-solynx--lg" href="quote.html">Start a Project ' +
      ARROW +
      "</a></div></div>";

    mount.classList.add("site-header");
  }

  function footerLink(href, label, iconPath) {
    return (
      '<li><a class="footer-link" href="' +
      href +
      '"><span class="footer-link__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="' +
      iconPath +
      '" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>' +
      label +
      "</span></a></li>"
    );
  }

  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    const I = {
      home: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z",
      about: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4.5V20h14v-1.5C19 16 16 14 12 14z",
      services: "M4 7h16M4 12h16M4 17h10",
      portfolio: "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
      careers: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 10h16v10H4z",
      web: "M12 3a9 9 0 1 0 9 9M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18",
      mobile: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4 15h.01",
      uiux: "M4 5h7v7H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 14h7v5H4z",
      ai: "M12 3v3M12 18v3M3 12h3M18 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z",
      shop: "M4 7h16l-1.5 11H5.5L4 7zm4 0V5a4 4 0 0 1 8 0v2",
      mail: "M4 6h16v12H4zM4 7l8 6 8-6",
      form: "M7 4h10a1 1 0 0 1 1 1v14l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1zm3 5h4M8 12h8M8 15h5",
      quote: "M8 8h3v5H8zm5 0h3v5h-3zM7 18l2.5-3h5L17 18",
      industries: "M4 20V10l4-3 4 3 4-3 4 3v10M4 20h16M8 20v-4h3v4",
      tech: "M9 3h6v4H9zM5 9h14v4H5zM8 15h8v6H8zM12 7v2M12 13v2",
    };

    const navigate =
      "<ul>" +
      footerLink("index.html", "Home", I.home) +
      footerLink("about.html", "About", I.about) +
      footerLink("services.html", "Services", I.services) +
      footerLink("portfolio.html", "Portfolio", I.portfolio) +
      (isCareersVisible() ? footerLink("careers.html", "Careers", I.careers) : "") +
      "</ul>";

    const services =
      "<ul>" +
      footerLink("web-development.html", "Web Development", I.web) +
      footerLink("mobile-development.html", "Mobile Apps", I.mobile) +
      footerLink("ui-ux.html", "UI/UX Design", I.uiux) +
      footerLink("ai-solutions.html", "AI Solutions", I.ai) +
      footerLink("ecommerce.html", "E-Commerce", I.shop) +
      "</ul>";

    const contact =
      "<ul>" +
      footerLink("mailto:support@solynx.in", "support@solynx.in", I.mail) +
      footerLink("contact.html", "Contact form", I.form) +
      footerLink("quote.html", "Get a quote", I.quote) +
      footerLink("solutions.html", "Industries", I.industries) +
      footerLink("technologies.html", "Technologies", I.tech) +
      "</ul>";

    mount.innerHTML =
      '<div class="footer-marquee" aria-hidden="true"><span>SOLYNX INNOVATIONS — BUILD WHAT\'S NEXT — SOLYNX INNOVATIONS — BUILD WHAT\'S NEXT — </span><span>SOLYNX INNOVATIONS — BUILD WHAT\'S NEXT — SOLYNX INNOVATIONS — BUILD WHAT\'S NEXT — </span></div>' +
      '<div class="container-solynx"><div class="footer-grid">' +
      '<div class="footer-brand"><a class="brand-logo brand-logo--footer" href="index.html" aria-label="Solynx Innovations home">' +
      '<img class="brand-logo__wordmark" src="' +
      BRAND.logoDark +
      '" alt="Solynx Innovations" width="200" height="56" decoding="async"></a>' +
      "<p>Engineering intelligent digital products, immersive experiences, and scalable technology for ambitious businesses.</p>" +
      socialLinksHtml() +
      "</div>" +
      '<div class="footer-col"><h4>Navigate</h4>' +
      navigate +
      "</div>" +
      '<div class="footer-col"><h4>Services</h4>' +
      services +
      "</div>" +
      '<div class="footer-col"><h4>Contact</h4>' +
      contact +
      "</div>" +
      '</div><div class="footer-bottom"><p>&copy; ' +
      new Date().getFullYear() +
      ' Solynx Innovations. All rights reserved.</p><p><a href="mailto:support@solynx.in">support@solynx.in</a></p></div></div>';

    mount.classList.add("site-footer");
  }

  function renderLoader() {
    if (document.querySelector(".page-loader")) return;
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML =
      '<div class="loader-brand"><img src="' +
      BRAND.logoDark +
      '" alt="Solynx Innovations" width="220" height="64" decoding="async"></div>' +
      '<div class="loader-line"><div class="loader-line__fill"></div></div><div class="loader-pct">0%</div>';
    document.body.prepend(loader);
  }

  function ensureHeroVisuals() {
    const page = currentPage();
    if (page === "index.html") return;

    const visualHTML = buildHeroVisual(page);
    if (!visualHTML) return;

    const hero = document.querySelector(".page-hero");
    const selector =
      ".page-hero__visual, .service-detail-hero-visual, .about-ecosystem, .tech-ecosystem, .contact-visual, .quote-visual, .hx-visual";

    if (hero) {
      const container = hero.querySelector(".container-solynx, .container-wide");
      const existing = hero.querySelector(selector);

      if (existing) {
        const wrap = document.createElement("div");
        wrap.innerHTML = visualHTML.trim();
        existing.replaceWith(wrap.firstElementChild);
      } else if (container) {
        var split = container.querySelector(".split-section");
        if (!split) {
          split = document.createElement("div");
          split.className = "split-section page-hero__split";
          var content = document.createElement("div");
          content.className = "page-hero__content";
          while (container.firstChild) content.appendChild(container.firstChild);
          split.appendChild(content);
          container.appendChild(split);
        }
        split.insertAdjacentHTML("beforeend", visualHTML);
      }
    }

    // Also upgrade standalone side visuals (e.g. contact form panel)
    document.querySelectorAll(".contact-visual, .quote-visual").forEach(function (el) {
      if (el.classList.contains("hx-visual")) return;
      if (hero && hero.contains(el)) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = visualHTML.trim();
      const node = wrap.firstElementChild;
      node.classList.add(el.classList.contains("contact-visual") ? "contact-visual" : "quote-visual");
      el.replaceWith(node);
    });
  }

  injectBrandHead();
  renderLoader();
  renderNavbar();
  renderFooter();
  ensureHeroVisuals();
})();
