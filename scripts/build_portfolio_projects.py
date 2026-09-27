# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(__file__).resolve().parents[1]
arrow = (
    '<span class="btn-arrow" aria-hidden="true"><svg viewBox="0 0 28 14" fill="none" '
    'xmlns="http://www.w3.org/2000/svg"><path d="M2 7h18" stroke="currentColor" '
    'stroke-width="1.6" stroke-linecap="round"/><path d="M15 2.5L22.5 7 15 11.5" '
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
    '<circle cx="25.2" cy="7" r="1.4" fill="currentColor"/></svg></span>'
)

projects = [
    {
        "file": "project-path2career.html",
        "slug": "path2career",
        "title": "Path2Career Case Study | AI Placement Platform - Solynx",
        "desc": "Case study: Path2Career - an AI placement preparation platform with mock interviews, coding lab, aptitude practice, and skill tracking.",
        "keywords": "Path2Career, AI mock interview, placement platform, coding practice",
        "eyebrow": "AI Platform",
        "h1": "PATH2CAREER.",
        "lead": "An AI-powered placement preparation platform helping students and freshers crack interviews with mock interviews, coding challenges, aptitude practice, and instant skill feedback.",
        "live": "https://path2career.in/",
        "status": "Live",
        "service": "AI Solutions & Web Development",
        "cover": "assets/portfolio/cover-path2career.svg",
        "logo": "assets/portfolio/path2career-logo.png",
        "overview": "Path2Career is a full career-prep product: AI mock interviews with follow-up questions, coding analytics, aptitude sets, resume analysis, roadmaps, leaderboards, and subscription plans. Solynx engineered the product experience end-to-end for students and job seekers.",
        "challenge": "Students needed one place for HR, technical, and aptitude prep with measurable feedback - not scattered notes and random question banks.",
        "approach": "We shipped a placement-first product surface: interview flows, coding lab progression, skill dashboards, and monetized plan tiers with admin-synced billing limits.",
        "solution": "Live platform with adaptive AI interviews, coding practice, aptitude modules, skill reports, leaderboards, and Basic/Pro/Premium plans. Visit path2career.in to try it.",
        "stack": ["React", "Node.js", "AI APIs", "PostgreSQL", "Dashboard Analytics", "Payments"],
        "results": [
            "Live AI mock interview and coding practice flows",
            "Skill dashboards for HR, aptitude, and coding growth",
            "Plan catalog with daily interview and practice limits",
            "Student-ready onboarding with free trial entry points",
        ],
        "cta": "BUILD AN AI PRODUCT THAT TRAINS PEOPLE.",
    },
    {
        "file": "project-annadatha.html",
        "slug": "annadatha-bazar",
        "title": "Annadatha Bazar Case Study | Agri Marketplace - Solynx",
        "desc": "Case study: Annadatha Bazar - a multilingual farming marketplace connecting farmers, buyers, and service providers.",
        "keywords": "Annadatha Bazar, agriculture marketplace, farm services platform",
        "eyebrow": "Marketplace",
        "h1": "ANNADATHA BAZAR.",
        "lead": "A complete agriculture service platform connecting farmers and buyers for crops, tools, livestock, technicians, veterinary care, and local farm support.",
        "live": "https://annadathabazar.com/",
        "status": "Live",
        "service": "Web Platform & Marketplace",
        "cover": "assets/portfolio/cover-annadatha.svg",
        "logo": "assets/portfolio/annadatha-logo.png",
        "overview": "Annadatha Bazar is built for modern farming communities - listing crops and livestock, renting tools, hiring workers, and reaching verified buyers with multilingual support across Indian languages.",
        "challenge": "Farmers and buyers lacked a trusted digital marketplace for local crops, equipment rental, and on-farm services with fair pricing and verification.",
        "approach": "We designed a mobile-first marketplace with signup, browse/list, connect, and transact flows, plus location-aware discovery and multi-language UX.",
        "solution": "Live platform covering crops, farm tools, workers, livestock, technicians, veterinary, weather, and calculator tools - with KYC-minded trust patterns.",
        "stack": ["Web App", "Marketplace UX", "Multilingual UI", "Location Services", "WhatsApp Support"],
        "results": [
            "Live marketplace at annadathabazar.com",
            "Multi-language farmer/buyer experience",
            "Service catalog spanning crops to veterinary care",
            "Clear signup-to-transaction journey",
        ],
        "cta": "BUILD MARKETPLACES THAT SERVE REAL COMMUNITIES.",
    },
    {
        "file": "project-tempmail.html",
        "slug": "tempmail",
        "title": "TempMail Case Study | Disposable Email Product - Solynx",
        "desc": "Case study: Solynx TempMail - a temporary email utility product on tempmail.solynx.in.",
        "keywords": "TempMail, disposable email, Solynx product",
        "eyebrow": "Solynx Product",
        "h1": "TEMPMAIL.",
        "lead": "A Solynx-built temporary email utility for privacy-friendly signups and inbox isolation - productized under tempmail.solynx.in.",
        "live": "https://tempmail.solynx.in/",
        "status": "Live",
        "service": "Web Product",
        "cover": "assets/portfolio/cover-tempmail.svg",
        "logo": "",
        "overview": "TempMail gives users disposable inboxes for quick verifications without exposing a primary mailbox. Built as a Solynx product with a clean inbox UI and fast mailbox generation.",
        "challenge": "Users needed throwaway inboxes that are fast, readable, and safe for short-lived account verifications.",
        "approach": "We scoped a lightweight utility product: generate mailbox, receive messages, auto-refresh inbox, and expire addresses on a clear lifecycle.",
        "solution": "Solynx TempMail product surface with mailbox creation, message list, and privacy-first UX under the solynx.in product family.",
        "stack": ["Web App", "API Integration", "Real-time Inbox", "Privacy UX"],
        "results": [
            "Productized under tempmail.solynx.in",
            "Focused disposable-mail workflow",
            "Fast mailbox create and read loop",
            "Aligned with Solynx product branding",
        ],
        "cta": "SHIP UTILITY PRODUCTS THAT FEEL INSTANT.",
    },
    {
        "file": "project-gym.html",
        "slug": "gym-management",
        "title": "Gym Management Case Study | Membership Software - Solynx",
        "desc": "Case study: Solynx Gym Management - memberships, attendance, and operations software on gym.solynx.in.",
        "keywords": "gym management software, membership system, Solynx Gym",
        "eyebrow": "Software",
        "h1": "GYM MANAGEMENT.",
        "lead": "A gym operations system for memberships, attendance, plans, and staff workflows - delivered as a Solynx product on gym.solynx.in.",
        "live": "https://gym.solynx.in/",
        "status": "Live",
        "service": "Custom Software",
        "cover": "assets/portfolio/cover-gym.svg",
        "logo": "",
        "overview": "Solynx Gym helps fitness businesses manage members, renewals, check-ins, and day-to-day operations from a single dashboard instead of notebooks and spreadsheets.",
        "challenge": "Gyms struggled with manual membership tracking, missed renewals, and no clear attendance or plan history.",
        "approach": "We mapped owner, staff, and member journeys, then shipped modules for plans, renewals, check-in, and operational reporting.",
        "solution": "Web-based gym management product covering memberships, attendance, and admin controls under gym.solynx.in.",
        "stack": ["Web Dashboard", "Memberships", "Attendance", "Reports", "Admin Roles"],
        "results": [
            "Centralized membership and plan management",
            "Faster check-in and renewal visibility",
            "Owner-ready operations dashboard",
            "Productized delivery under Solynx domains",
        ],
        "cta": "DIGITIZE OPERATIONS WITHOUT COMPLEXITY.",
    },
    {
        "file": "project-lms.html",
        "slug": "lms",
        "title": "LMS Case Study | Learning Management System - Solynx",
        "desc": "Case study: Solynx LMS - a learning management system for courses, assessments, and learner progress (in development).",
        "keywords": "LMS, learning management system, e-learning platform",
        "eyebrow": "Software",
        "h1": "LEARNING MANAGEMENT SYSTEM.",
        "lead": "A full LMS for institutes and training teams - courses, lessons, assessments, progress tracking, and instructor tools. Currently in development.",
        "live": "",
        "status": "In development",
        "service": "Custom Software / EdTech",
        "cover": "assets/portfolio/cover-lms.svg",
        "logo": "",
        "overview": "Solynx LMS is built to run structured learning at scale: course catalogs, modular lessons, quizzes, certificates, and learner analytics for admins and instructors.",
        "challenge": "Training teams needed an owned LMS - not a rigid SaaS that cannot match curriculum, branding, or assessment rules.",
        "approach": "We are designing role-based flows for admin, instructor, and learner with progress dashboards and assessment engines first.",
        "solution": "In-development LMS covering course authoring, enrollment, assessments, and reporting - ready for client branding and on-time delivery.",
        "stack": ["Course Engine", "Assessments", "Progress Analytics", "Role-based Access", "Web App"],
        "results": [
            "Course and lesson architecture defined",
            "Assessment and progress tracking planned",
            "Admin/instructor/learner roles mapped",
            "Delivery-ready for institute and corporate training clients",
        ],
        "cta": "NEED AN LMS BUILT AROUND YOUR CURRICULUM?",
    },
    {
        "file": "project-hrms.html",
        "slug": "hrms",
        "title": "HRMS Case Study | Human Resource Management - Solynx",
        "desc": "Case study: Solynx HRMS - attendance, payroll-ready employee records, leave, and HR workflows (in development).",
        "keywords": "HRMS, human resource management, employee management software",
        "eyebrow": "Software",
        "h1": "HRMS.",
        "lead": "A human resource management system for employee records, attendance, leave, and HR operations. Currently in development for on-time client delivery.",
        "live": "",
        "status": "In development",
        "service": "Custom Software / HR Tech",
        "cover": "assets/portfolio/cover-hrms.svg",
        "logo": "",
        "overview": "Solynx HRMS centralizes people operations - employee profiles, attendance, leave requests, and HR dashboards - so growing teams stop running HR from spreadsheets.",
        "challenge": "SMEs needed affordable HR software that fits Indian team workflows without enterprise bloat.",
        "approach": "We prioritized employee master data, attendance, leave, and manager approvals before advanced payroll connectors.",
        "solution": "In-development HRMS with modular HR workflows, dashboards, and role permissions designed for clean onboarding and on-time rollout.",
        "stack": ["Employee Records", "Attendance", "Leave Management", "HR Dashboard", "Web App"],
        "results": [
            "Core HR modules scoped for SME teams",
            "Attendance and leave workflows designed",
            "Role-based admin and manager access",
            "Built for predictable, on-time project delivery",
        ],
        "cta": "REPLACE SPREADSHEET HR WITH A REAL SYSTEM.",
    },
    {
        "file": "project-school.html",
        "slug": "school-management",
        "title": "School Management System Case Study | Solynx",
        "desc": "Case study: School Management System - students, fees, attendance, and academics in one platform (in development).",
        "keywords": "school management system, student information system, education ERP",
        "eyebrow": "Software",
        "h1": "SCHOOL MANAGEMENT SYSTEM.",
        "lead": "An education management platform for students, attendance, fees, academics, and parent communication. Currently in development.",
        "live": "",
        "status": "In development",
        "service": "Custom Software / Education",
        "cover": "assets/portfolio/cover-school.svg",
        "logo": "",
        "overview": "The Solynx School Management System unifies admissions, student records, attendance, fee collection, and academic tracking for schools that need reliable daily operations software.",
        "challenge": "Schools were juggling paper registers, fee books, and disconnected tools for parents and staff.",
        "approach": "We mapped admin, teacher, student, and parent roles, then designed modules for roster, attendance, fees, and academics with clear permissions.",
        "solution": "In-development school ERP covering core academic and fee operations - engineered for on-time delivery and 100% client satisfaction focus.",
        "stack": ["Student Records", "Attendance", "Fees", "Academics", "Role Dashboards"],
        "results": [
            "Admin/teacher/parent journeys designed",
            "Attendance and fee modules scoped",
            "Academic tracking structure defined",
            "Ready for school pilots and branded rollouts",
        ],
        "cta": "MODERNIZE SCHOOL OPERATIONS WITH SOLYNX.",
    },
]


def render(p):
    live_btn = (
        f'<a class="btn-solynx btn-solynx--primary" href="{p["live"]}" target="_blank" rel="noopener">Visit live site {arrow}</a>'
        if p["live"]
        else f'<a class="btn-solynx btn-solynx--primary" href="quote.html" data-magnetic>Request this build {arrow}</a>'
    )
    logo_html = (
        f'<img class="project-logo" src="{p["logo"]}" alt="" width="120" height="48" loading="lazy">'
        if p["logo"]
        else ""
    )
    stack = "".join(f"<span>{s}</span>" for s in p["stack"])
    results = "".join(f"<li>{r}</li>" for r in p["results"])
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{p['title']}</title>
  <meta name="description" content="{p['desc']}">
  <link rel="canonical" href="https://solynx.in/portfolio/{p['slug']}">
  <meta property="og:title" content="{p['title']}">
  <meta property="og:description" content="{p['desc']}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://solynx.in/portfolio/{p['slug']}">
  <meta name="theme-color" content="#05070d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta name="keywords" content="{p['keywords']}, Solynx Innovations, software development company, web development, AI solutions">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="Solynx Innovations">
  <meta property="og:site_name" content="Solynx Innovations">
  <meta property="og:locale" content="en_IN">
  <meta property="og:image" content="https://solynx.in/{p['cover']}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{p['title']}">
  <meta name="twitter:description" content="{p['desc']}">
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
        <div class="split-section">
          <div>
            <p class="eyebrow" data-animate="fade-up">{p['eyebrow']} · {p['status']}</p>
            <h1 data-animate="fade-up">{p['h1']}</h1>
            <p class="lead" data-animate="fade-up">{p['lead']}</p>
            <div class="btn-group-solynx" data-animate="fade-up">
              {live_btn}
              <a class="btn-solynx btn-solynx--secondary" href="portfolio.html">Back to portfolio</a>
            </div>
          </div>
          <div class="project-hero-media" data-animate="none">
            {logo_html}
            <img src="{p['cover']}" alt="{p['h1'].rstrip('.')} preview" width="1200" height="750" loading="eager">
          </div>
        </div>
      </div>
    </section>
    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Overview</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Project at a glance.</h2>
        <div class="row g-4">
          <div class="col-lg-8" data-animate="fade-up"><p>{p['overview']}</p></div>
          <div class="col-lg-4" data-animate="fade-up">
            <div class="card-3d" data-tilt>
              <p class="eyebrow">Service</p>
              <h3 class="h5 mb-2">{p['service']}</h3>
              <p class="small text-muted mb-2">Status: <strong>{p['status']}</strong></p>
              <p class="small text-muted mb-0">Delivered by Solynx Innovations. <a href="mailto:support@solynx.in">support@solynx.in</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container-solynx">
        <div class="row g-4">
          <div class="col-md-6" data-animate="fade-up"><div class="card-3d h-100" data-tilt><p class="eyebrow">Challenge</p><h2 class="h3 mb-3">What we solved.</h2><p>{p['challenge']}</p></div></div>
          <div class="col-md-6" data-animate="fade-up"><div class="card-3d h-100" data-tilt><p class="eyebrow">Approach</p><h2 class="h3 mb-3">How we moved.</h2><p>{p['approach']}</p></div></div>
        </div>
      </div>
    </section>
    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Solution</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">What we shipped.</h2>
        <p data-animate="fade-up" style="max-width:72ch">{p['solution']}</p>
      </div>
    </section>
    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Technology</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Stack &amp; modules.</h2>
        <div class="stack-pills" data-animate="fade-up">{stack}</div>
      </div>
    </section>
    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Outcomes</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Delivery highlights.</h2>
        <ul class="capability-list" data-stagger>{results}</ul>
      </div>
    </section>
    <section class="cta-band">
      <canvas class="cta-band__canvas" id="cta-particles" aria-hidden="true"></canvas>
      <div class="container-solynx cta-band__inner">
        <p class="eyebrow" data-animate="fade-up" style="justify-content:center">Next step</p>
        <h2 data-animate="fade-up">{p['cta']}</h2>
        <p data-animate="fade-up">On-time delivery. 100% client satisfaction focus. Experts with 1+ to 4+ years experience.</p>
        <div class="btn-group-solynx justify-content-center" data-animate="fade-up">
          <a class="btn-solynx btn-solynx--primary btn-solynx--lg" href="quote.html" data-magnetic>Start a Project {arrow}</a>
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
"""


def main():
    for p in projects:
        path = root / p["file"]
        path.write_text(render(p), encoding="utf-8")
        print("wrote", path.name)


if __name__ == "__main__":
    main()
