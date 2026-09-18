(function () {
  "use strict";

  const logoSVG = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" rx="6" stroke="url(#g)" stroke-width="1.5"/>
    <path d="M8 22V10l8 12 8-12v12" stroke="url(#g)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <defs><linearGradient id="g" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#00e5c0"/><stop offset="1" stop-color="#3aa0ff"/></linearGradient></defs>
  </svg>`;

  const navLinks = [
    { href: "index.html", label: "Home" },
    { href: "services.html", label: "Services" },
    { href: "solutions.html", label: "Solutions" },
    { href: "portfolio.html", label: "Portfolio" },
    { href: "technologies.html", label: "Technologies" },
    { href: "about.html", label: "About" },
    { href: "careers.html", label: "Careers" },
    { href: "contact.html", label: "Contact" },
  ];

  function renderNavbar() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const desktop = navLinks
      .map((l) => `<a class="nav-link-solynx" href="${l.href}">${l.label}</a>`)
      .join("");
    const mobile = navLinks
      .map((l) => `<a href="${l.href}">${l.label}</a>`)
      .join("");

    mount.innerHTML = `
      <nav class="navbar-solynx" aria-label="Primary">
        <div class="container-solynx">
          <a class="brand-logo" href="index.html" aria-label="Solynx Innovations home">
            <span class="brand-logo__mark">${logoSVG}</span>
            SOLYNX
          </a>
          <div class="nav-desktop">
            ${desktop}
            <a class="btn-solynx btn-solynx--primary nav-cta" href="quote.html" data-magnetic>Start a Project</a>
          </div>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay">
            <span></span>
          </button>
        </div>
      </nav>
      <div class="nav-overlay" id="nav-overlay" role="dialog" aria-label="Mobile navigation">
        <div class="nav-overlay__list">${mobile}</div>
        <div class="nav-overlay__cta">
          <a class="btn-solynx btn-solynx--primary btn-solynx--lg" href="quote.html">Start a Project <span class="btn-arrow">→</span></a>
        </div>
      </div>
    `;
    mount.classList.add("site-header");
  }

  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    mount.innerHTML = `
      <div class="footer-marquee" aria-hidden="true"><span>SOLYNX INNOVATIONS — BUILD WHAT'S NEXT — SOLYNX INNOVATIONS — BUILD WHAT'S NEXT — </span><span>SOLYNX INNOVATIONS — BUILD WHAT'S NEXT — SOLYNX INNOVATIONS — BUILD WHAT'S NEXT — </span></div>
      <div class="container-solynx">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand-logo" href="index.html">
              <span class="brand-logo__mark">${logoSVG}</span>
              SOLYNX
            </a>
            <p>Engineering intelligent digital products, immersive experiences, and scalable technology for ambitious businesses.</p>
            <div class="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
              <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="X">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="web-development.html">Web Development</a></li>
              <li><a href="mobile-development.html">Mobile Apps</a></li>
              <li><a href="ui-ux.html">UI/UX Design</a></li>
              <li><a href="ai-solutions.html">AI Solutions</a></li>
              <li><a href="ecommerce.html">E-Commerce</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@solynx.in">support@solynx.in</a></li>
              <li><a href="contact.html">Contact form</a></li>
              <li><a href="quote.html">Get a quote</a></li>
              <li><a href="solutions.html">Industries</a></li>
              <li><a href="technologies.html">Technologies</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Solynx Innovations. All rights reserved.</p>
          <p><a href="mailto:support@solynx.in">support@solynx.in</a></p>
        </div>
      </div>
    `;
    mount.classList.add("site-footer");
  }

  function renderLoader() {
    if (document.querySelector(".page-loader")) return;
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML = `
      <div class="loader-logo">SOLY<span>NX</span></div>
      <div class="loader-line"><div class="loader-line__fill"></div></div>
      <div class="loader-pct">0%</div>
    `;
    document.body.prepend(loader);
  }

  renderLoader();
  renderNavbar();
  renderFooter();
})();
