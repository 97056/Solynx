# -*- coding: utf-8 -*-
"""Live projects open external URLs; only non-live projects keep detail pages."""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parents[1]
ARROW = (
    '<span class="btn-arrow" aria-hidden="true"><svg viewBox="0 0 28 14" fill="none" '
    'xmlns="http://www.w3.org/2000/svg"><path d="M2 7h18" stroke="currentColor" '
    'stroke-width="1.6" stroke-linecap="round"/><path d="M15 2.5L22.5 7 15 11.5" '
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
    '<circle cx="25.2" cy="7" r="1.4" fill="currentColor"/></svg></span>'
)

def card(href, theme, cats, badge, badge_live, cat, title, summary, tech, domain="", tall=False, wide=False, external=False):
    classes = ["project-card", f"project-card--{theme}"]
    if tall:
        classes.append("project-card--tall")
    if wide:
        classes.append("project-card--wide")
    badge_cls = "project-card__badge project-card__badge--live" if badge_live else "project-card__badge"
    tech_html = "".join(f"<span>{t}</span>" for t in tech)
    domain_html = f'<span class="project-card__domain">{domain}</span>' if domain else ""
    summary_html = f'<p class="project-card__summary">{summary}</p>' if summary else ""
    ext = ' target="_blank" rel="noopener"' if external else ""
    cta = "Visit live site" if external else "View Project"
    return f'''          <a class="{" ".join(classes)}" href="{href}"{ext} data-category="{cats}">
            <div class="project-card__media">
              <div class="project-card__visual" aria-hidden="true">
                <span class="pv-icon"></span>
                <span class="pv-panel"></span>
                <span class="pv-panel"></span>
                <span class="pv-glow"></span>
              </div>
              <span class="{badge_cls}">{badge}</span>
            </div>
            <div class="project-card__body">
              <div class="project-card__cat">{cat}</div>
              <h3 class="project-card__title">{title}</h3>
              {summary_html}
              {domain_html}
              <div class="project-card__tech">{tech_html}</div>
              <span class="project-card__cta">{cta} {ARROW}</span>
            </div>
          </a>
'''

portfolio_cards = [
    card("https://path2career.in/", "path2career", "live ai web", "Live", True, "AI Platform", "Path2Career",
         "AI mock interviews, coding lab, aptitude practice, and skill dashboards.",
         ["AI", "React", "Node"], "path2career.in", tall=True, external=True),
    card("https://annadathabazar.com/", "annadatha", "live web", "Live", True, "Marketplace", "Annadatha Bazar",
         "Multilingual agri marketplace for crops, tools, livestock, and farm services.",
         ["Web", "Marketplace", "i18n"], "annadathabazar.com", wide=True, external=True),
    card("https://tempmail.solynx.in/", "tempmail", "live web", "Live", True, "Solynx Product", "TempMail",
         "Disposable email utility for privacy-friendly inboxes.",
         ["Web", "API"], "tempmail.solynx.in", external=True),
    card("https://gym.solynx.in/", "gym", "live software", "Live", True, "Software", "Gym Management",
         "Memberships, attendance, and gym operations dashboard.",
         ["Dashboard", "Memberships"], "gym.solynx.in", external=True),
    card("project-lms.html", "lms", "building software", "In development", False, "EdTech", "LMS",
         "Courses, assessments, and learner progress for institutes and training teams.",
         ["Courses", "Assessments"], wide=True),
    card("project-hrms.html", "hrms", "building software", "In development", False, "HR Tech", "HRMS",
         "Employee records, attendance, leave, and HR workflows.",
         ["HR", "Attendance"]),
    card("project-school.html", "school", "building software", "In development", False, "Education", "School Management",
         "Students, fees, attendance, and academics in one school platform.",
         ["SIS", "Fees"]),
]

home_cards = [
    card("https://path2career.in/", "path2career", "ai", "Live", True, "AI Platform", "Path2Career",
         "", ["AI", "React", "Node"], "path2career.in", tall=True, external=True),
    card("https://annadathabazar.com/", "annadatha", "web", "Live", True, "Marketplace", "Annadatha Bazar",
         "", ["Web", "i18n"], "annadathabazar.com", wide=True, external=True),
    card("https://tempmail.solynx.in/", "tempmail", "web", "Live", True, "Product", "TempMail",
         "", ["Web", "API"], "tempmail.solynx.in", external=True),
    card("https://gym.solynx.in/", "gym", "software", "Live", True, "Software", "Gym Management",
         "", ["Dashboard"], "gym.solynx.in", external=True),
    card("portfolio.html", "systems", "software", "In development", False, "EdTech + HR + School", "LMS · HRMS · School",
         "", ["LMS", "HRMS", "SIS"], wide=True),
]

portfolio_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio | Path2Career, Annadatha, LMS, HRMS &amp; More - Solynx</title>
  <meta name="description" content="Solynx portfolio: Path2Career, Annadatha Bazar, TempMail, Gym Management, plus LMS, HRMS, and School Management systems. Live products and in-development builds since 2025.">
  <link rel="canonical" href="https://solynx.in/portfolio">
  <meta property="og:title" content="Portfolio | Path2Career, Annadatha, LMS, HRMS &amp; More - Solynx">
  <meta property="og:description" content="Solynx portfolio: Path2Career, Annadatha Bazar, TempMail, Gym Management, plus LMS, HRMS, and School Management systems.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://solynx.in/portfolio">
  <meta name="theme-color" content="#05070d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta name="keywords" content="Solynx portfolio, Path2Career, Annadatha Bazar, TempMail, gym management, LMS, HRMS, school management system">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="Solynx Innovations">
  <meta property="og:site_name" content="Solynx Innovations">
  <meta property="og:locale" content="en_IN">
  <meta property="og:image" content="https://solynx.in/assets/brand/logo-dark.png">
  <meta name="twitter:card" content="summary_large_image">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&amp;family=Space+Grotesk:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="icon" type="image/png" href="assets/brand/favicon-32.png" sizes="32x32">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="noise-overlay" aria-hidden="true"></div>
  <header id="site-header"></header>

  <main class="page-content">
    <section class="page-hero">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Portfolio · Since 2025</p>
        <h1 data-animate="fade-up">REAL PRODUCTS. REAL DELIVERY.</h1>
        <p class="lead" data-animate="fade-up">Live platforms open directly. In-development systems have project pages. On-time delivery, 100% client satisfaction focus, specialists with 1+ to 4+ years experience.</p>
        <div class="portfolio-proof" data-animate="fade-up">
          <div><strong data-counter="100" data-suffix="%">0%</strong><span>Client satisfaction</span></div>
          <div><strong data-counter="100" data-suffix="%">0%</strong><span>On-time delivery</span></div>
          <div><strong data-counter="7" data-suffix="+">0+</strong><span>Active projects</span></div>
          <div><strong>2025</strong><span>Journey started</span></div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <div class="filter-bar" data-animate="fade-up">
          <button type="button" class="filter-chip is-active" data-filter="all">All</button>
          <button type="button" class="filter-chip" data-filter="live">Live</button>
          <button type="button" class="filter-chip" data-filter="building">In development</button>
          <button type="button" class="filter-chip" data-filter="ai">AI</button>
          <button type="button" class="filter-chip" data-filter="web">Web</button>
          <button type="button" class="filter-chip" data-filter="software">Software</button>
        </div>

        <div class="portfolio-masonry" data-stagger>
{"".join(portfolio_cards)}        </div>
      </div>
    </section>

    <section class="cta-band">
      <canvas class="cta-band__canvas" id="cta-particles" aria-hidden="true"></canvas>
      <div class="container-solynx cta-band__inner">
        <p class="eyebrow" data-animate="fade-up" style="justify-content:center">Next step</p>
        <h2 data-animate="fade-up">YOUR PROJECT COULD BE NEXT.</h2>
        <p data-animate="fade-up">On-time delivery, clear communication, and a team that stays accountable after launch.</p>
        <div class="btn-group-solynx justify-content-center" data-animate="fade-up">
          <a class="btn-solynx btn-solynx--primary btn-solynx--lg" href="quote.html" data-magnetic>Start a Project {ARROW}</a>
          <a class="btn-solynx btn-solynx--secondary btn-solynx--lg" href="contact.html">Talk to Solynx</a>
        </div>
      </div>
    </section>
  </main>

  <footer id="site-footer"></footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/components.js"></script>
  <script src="js/navbar.js"></script>
  <script src="js/cursor.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/particles.js"></script>
  <script src="js/3d-effects.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
'''

(root / "portfolio.html").write_text(portfolio_html, encoding="utf-8")

index = (root / "index.html").read_text(encoding="utf-8")
start = index.find('        <div class="portfolio-masonry" data-stagger>')
end = index.find("        </div>\n      </div>\n    </section>\n\n    <!-- INDUSTRIES -->")
if start == -1 or end == -1:
    raise SystemExit("index portfolio block not found")
new_block = '        <div class="portfolio-masonry" data-stagger>\n' + "".join(home_cards) + "        </div>"
(root / "index.html").write_text(index[:start] + new_block + index[end:], encoding="utf-8")

# Delete live project detail pages
for name in [
    "project-path2career.html",
    "project-annadatha.html",
    "project-tempmail.html",
    "project-gym.html",
]:
    p = root / name
    if p.exists():
        p.unlink()
        print("deleted", name)

# Fix service page links
link_map = {
    'href="project-path2career.html"': 'href="https://path2career.in/" target="_blank" rel="noopener"',
    'href="project-annadatha.html"': 'href="https://annadathabazar.com/" target="_blank" rel="noopener"',
    'href="project-tempmail.html"': 'href="https://tempmail.solynx.in/" target="_blank" rel="noopener"',
    'href="project-gym.html"': 'href="https://gym.solynx.in/" target="_blank" rel="noopener"',
    "View Path2Career": "Visit Path2Career",
    "View Gym Management": "Visit Gym Management",
}
for html in root.glob("*.html"):
    t = html.read_text(encoding="utf-8")
    o = t
    for a, b in link_map.items():
        t = t.replace(a, b)
    if t != o:
        html.write_text(t, encoding="utf-8")
        print("patched links", html.name)

# components.js cleanup
js = (root / "js" / "components.js").read_text(encoding="utf-8")
js = re.sub(r'\s*"project-path2career\.html":\s*\{[^}]+\},?', "", js)
js = re.sub(r'\s*"project-annadatha\.html":\s*\{[^}]+\},?', "", js)
js = re.sub(r'\s*"project-tempmail\.html":\s*\{[^}]+\},?', "", js)
js = re.sub(r'\s*"project-gym\.html":\s*\{[^}]+\},?', "", js)
for path in [
    '"/portfolio/path2career": "project-path2career.html",',
    '"/portfolio/annadatha-bazar": "project-annadatha.html",',
    '"/portfolio/tempmail": "project-tempmail.html",',
    '"/portfolio/gym-management": "project-gym.html",',
]:
    js = js.replace(path, "")
(root / "js" / "components.js").write_text(js, encoding="utf-8")

# seo config
cfg_path = root / "seo" / "config.json"
cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
for k in ["project-path2career.html", "project-annadatha.html", "project-tempmail.html", "project-gym.html"]:
    cfg.get("pages", {}).pop(k, None)
cfg_path.write_text(json.dumps(cfg, indent=2) + "\n", encoding="utf-8")

# redirects
redir = (root / "_redirects").read_text(encoding="utf-8")
for slug, file in [
    ("path2career", "project-path2career.html"),
    ("annadatha-bazar", "project-annadatha.html"),
    ("tempmail", "project-tempmail.html"),
    ("gym-management", "project-gym.html"),
]:
    redir = re.sub(rf"/portfolio/{re.escape(slug)}.*?\n", "", redir)
    redir = re.sub(rf"/{re.escape(file)}.*?\n", "", redir)
(root / "_redirects").write_text(redir, encoding="utf-8")

# htaccess
ht = (root / ".htaccess").read_text(encoding="utf-8")
for rule in [
    r"RewriteRule \^portfolio/path2career/\?\$ project-path2career\.html \[L\]\n",
    r"RewriteRule \^portfolio/annadatha\\-bazar/\?\$ project-annadatha\.html \[L\]\n",
    r"RewriteRule \^portfolio/tempmail/\?\$ project-tempmail\.html \[L\]\n",
    r"RewriteRule \^portfolio/gym\\-management/\?\$ project-gym\.html \[L\]\n",
]:
    ht = re.sub(rule, "", ht)
(root / ".htaccess").write_text(ht, encoding="utf-8")

# vercel.json
vj = json.loads((root / "vercel.json").read_text(encoding="utf-8"))
drop = {
    "/project-path2career.html",
    "/project-annadatha.html",
    "/project-tempmail.html",
    "/project-gym.html",
    "/portfolio/path2career",
    "/portfolio/annadatha-bazar",
    "/portfolio/tempmail",
    "/portfolio/gym-management",
}
vj["redirects"] = [r for r in vj.get("redirects", []) if r.get("source") not in drop and r.get("destination") not in drop]
vj["rewrites"] = [r for r in vj.get("rewrites", []) if r.get("source") not in drop and r.get("destination") not in drop]
(root / "vercel.json").write_text(json.dumps(vj, indent=2) + "\n", encoding="utf-8")

# sitemap
sm = (root / "sitemap.xml").read_text(encoding="utf-8")
for old in ["path2career", "annadatha-bazar", "tempmail", "gym-management"]:
    sm = re.sub(rf"\s*<url>\s*<loc>https://solynx\.in/portfolio/{old}</loc>.*?</url>", "", sm, flags=re.S)
(root / "sitemap.xml").write_text(sm, encoding="utf-8")

print("done")
