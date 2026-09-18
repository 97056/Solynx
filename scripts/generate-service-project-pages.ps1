$ErrorActionPreference = "Stop"
Set-Location "e:\Solynx 3D"

function Get-Head($title, $desc, $canonical) {
@"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <meta name="description" content="$desc">
  <link rel="canonical" href="$canonical">
  <meta property="og:title" content="$title">
  <meta property="og:description" content="$desc">
  <meta property="og:type" content="website">
  <meta property="og:url" content="$canonical">
  <meta name="theme-color" content="#05070d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="noise-overlay" aria-hidden="true"></div>
  <header id="site-header"></header>
  <main class="page-content">
"@
}

$scripts = @"
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
"@

function Get-CTA([string]$headline, [string]$sub = "Tell us where you are. We will help you engineer what comes next.") {
@"
    <section class="cta-band">
      <canvas class="cta-band__canvas" id="cta-particles" aria-hidden="true"></canvas>
      <div class="container-solynx cta-band__inner">
        <p class="eyebrow" data-animate="fade-up" style="justify-content:center">Next step</p>
        <h2 data-animate="fade-up">$headline</h2>
        <p data-animate="fade-up">$sub</p>
        <div class="btn-group-solynx justify-content-center" data-animate="fade-up">
          <a class="btn-solynx btn-solynx--primary btn-solynx--lg" href="quote.html" data-magnetic>Start a Project <span class="btn-arrow">→</span></a>
          <a class="btn-solynx btn-solynx--secondary btn-solynx--lg" href="contact.html">Talk to Solynx</a>
        </div>
      </div>
    </section>
"@
}

function Write-Page($file, $content) {
  [System.IO.File]::WriteAllText((Join-Path "e:\Solynx 3D" $file), $content, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Wrote $file"
}

# --- SERVICE PAGES ---
$servicePages = @(
  @{
    file='web-development.html'; num='01'; title='Web Development'; hero='WEB EXPERIENCES THAT PERFORM.'
    desc='High-performance websites and web applications engineered for speed, conversion, and long-term maintainability by Solynx Innovations.'
    problem='Most web properties ship with hidden debt: slow first loads, brittle CMS layers, and frontends that resist iteration. Marketing wins in mockups, then production undermines trust with lag and regressions.'
    solution='Solynx engineers web products as systems - performance budgets, component architecture, and API contracts defined before launch. Every page earns its weight in milliseconds and every release stays predictable.'
    stack=@('HTML5','CSS3','JavaScript','React','Next.js','Node.js','Headless CMS','Vite','GraphQL','AWS')
    caps=@('Marketing sites with measurable Core Web Vitals','Progressive web apps and authenticated portals','Design system implementation in production','API-driven frontends and micro-frontends','Accessibility-first builds (WCAG 2.1)','Internationalization and multi-locale routing')
    benefits=@('Sub-second perceived load on priority journeys','Clean handoff between design, content, and engineering','Architecture that absorbs traffic spikes without rewrites','SEO-ready markup and structured data from day one')
    usecases=@('Brand relaunches for growth-stage companies','Legacy site modernization without downtime risk','Customer portals tied to existing ERP or CRM data','Content-heavy platforms with editorial velocity')
    portfolio='project-nova.html'; portfolioLabel='Nova Commerce OS'
    faq=@(
      @{q='Do you build on WordPress or fully custom stacks?';a='Both. We choose based on editorial needs, integration depth, and performance targets. Custom React or Next.js builds are common when velocity and UX complexity demand it.'}
      @{q='How do you handle performance?';a='We set budgets early, measure with Lighthouse and RUM, and treat regressions as release blockers - not post-launch surprises.'}
      @{q='Can you work with our existing design files?';a='Yes. We implement Figma systems faithfully and flag interaction gaps before they become expensive build changes.'}
    )
    cta='READY TO BUILD A FASTER WEB?'
  },
  @{
    file='mobile-development.html'; num='02'; title='Mobile App Development'; hero='MOBILE PRODUCTS PEOPLE RETURN TO.'
    desc='Native-quality iOS and Android apps with resilient backends, polished interaction, and release pipelines built by Solynx Innovations.'
    problem='Mobile products fail when UX polish, offline behavior, and backend reliability are treated as separate workstreams. Users notice instantly - and churn quietly.'
    solution='Solynx delivers cohesive mobile products: fluid clients, dependable APIs, analytics instrumentation, and CI/CD that keeps store releases calm. One team owns the experience end to end.'
    stack=@('Flutter','React Native','Swift','Kotlin','Firebase','GraphQL','REST','Fastlane','App Store Connect','Google Play')
    caps=@('Cross-platform delivery with native polish where it counts','Offline-first data sync and conflict resolution','Push notifications and realtime messaging','Biometric auth and secure token storage','App Store and Play Store launch support','Crash monitoring and release analytics')
    benefits=@('Faster time-to-store without sacrificing quality gates','Shared codebase economics with platform-specific refinement','Release cadence your support team can actually sustain','Instrumentation that connects product usage to roadmap decisions')
    usecases=@('Consumer apps with daily engagement loops','Field service tools for distributed teams','Healthcare and fintech apps with compliance constraints','Companion apps for existing web platforms')
    portfolio='project-pulse.html'; portfolioLabel='Pulse Health'
    faq=@(
      @{q='Flutter or React Native - which do you recommend?';a='We evaluate team skills, hardware access needs, and animation complexity. Both are production-proven in our portfolio; the right choice is the one that reduces risk for your timeline.'}
      @{q='Do you handle backend work too?';a='Yes. Mobile rarely succeeds without aligned APIs, auth, and observability. We ship full-stack when needed.'}
      @{q='What does a typical mobile timeline look like?';a='An MVP with core flows often lands in 10-16 weeks after discovery, depending on integrations and compliance scope.'}
    )
    cta='READY TO SHIP MOBILE THAT STICKS?'
  },
  @{
    file='ui-ux.html'; num='03'; title='UI/UX Design'; hero='INTERFACES THAT FEEL INEVITABLE.'
    desc='Research-led UI/UX design, design systems, and prototypes that reduce delivery risk and elevate brand perception - from Solynx Innovations.'
    problem='Beautiful screens without research create expensive rework once engineering starts. Inconsistent patterns slow teams down and erode user trust across every touchpoint.'
    solution='Solynx designs experience systems: validated flows, scalable components, and interactive prototypes that engineering can implement without guesswork. Clarity is the deliverable.'
    stack=@('Figma','Design Tokens','Prototyping','User Research','Motion Specs','Storybook','Accessibility Audits')
    caps=@('Product discovery and stakeholder alignment workshops','Information architecture and journey mapping','High-fidelity UI and interaction design','Design systems with documented component behavior','Usability testing with actionable synthesis','Motion and micro-interaction guidelines')
    benefits=@('Fewer change orders during development sprints','Shared language between design, product, and engineering','Brand consistency that scales across new features','Higher conversion through friction removal, not decoration')
    usecases=@('Zero-to-one product definition before build','Design system creation for multi-team organizations','UX audits of underperforming SaaS dashboards','Rebrand execution across web and mobile surfaces')
    portfolio='project-lumen.html'; portfolioLabel='Lumen Design System'
    faq=@(
      @{q='Do you only design, or also build?';a='Both. Design-only engagements are available, but our strongest outcomes come when design and engineering stay in one accountable loop.'}
      @{q='How do you validate designs before development?';a='Prototypes, task-based testing, and success metrics defined upfront - so we optimize for outcomes, not opinions.'}
      @{q='Can you extend an existing brand?';a='Yes. We document tokens, typography, and component rules so your team can ship consistently after handoff.'}
    )
    cta='READY TO DESIGN WITH PURPOSE?'
  },
  @{
    file='ecommerce.html'; num='04'; title='E-Commerce Development'; hero='COMMERCE BUILT TO CONVERT.'
    desc='Custom e-commerce platforms engineered for catalog complexity, checkout clarity, and revenue growth by Solynx Innovations.'
    problem='Stores bleed revenue when search, checkout, inventory, and personalization operate as disconnected systems. Every extra click is measurable margin lost.'
    solution='Solynx builds commerce as one product: fast storefronts, reliable payments, ops dashboards, and growth loops wired together. Conversion is engineered, not hoped for.'
    stack=@('Headless Commerce','Stripe','Shopify Plus','Medusa','Next.js','Redis','Elasticsearch','Segment','AWS')
    caps=@('Custom storefronts and headless architectures','Checkout optimization and payment orchestration','Inventory, OMS, and ERP integrations','Personalization and recommendation engines','Subscription and loyalty program flows','Merchant ops dashboards and reporting')
    benefits=@('Checkout flows tuned to your highest-intent segments','Catalog performance that holds up during peak traffic','Operational visibility for merchandising and fulfillment teams','Experimentation infrastructure for continuous A/B learning')
    usecases=@('D2C brands outgrowing template platforms','B2B catalogs with complex pricing rules','Marketplace launches with multi-vendor logic','International expansion with localized payments and tax')
    portfolio='project-nova.html'; portfolioLabel='Nova Commerce OS'
    faq=@(
      @{q='Headless or monolithic - what is right for us?';a='Headless when you need channel flexibility, custom UX, or heavy integrations. We recommend honestly based on team capacity and roadmap, not trends.'}
      @{q='Can you migrate from Shopify or Magento?';a='Yes. We plan catalog, URL, and SEO preservation carefully to protect organic equity during transition.'}
      @{q='How do you measure commerce success?';a='Conversion rate, AOV, cart abandonment, and operational metrics like fulfillment SLA - tracked in dashboards your team owns.'}
    )
    cta='READY TO ENGINEER REVENUE?'
  },
  @{
    file='software-development.html'; num='05'; title='Custom Software Development'; hero='SOFTWARE SHAPED TO YOUR OPERATIONS.'
    desc='Purpose-built platforms, internal tools, and integrations tailored to how your organization actually works - from Solynx Innovations.'
    problem='Off-the-shelf software forces teams into awkward workflows, shadow IT, and rising license costs. Workarounds compound until operations become the bottleneck.'
    solution='Solynx builds software that mirrors real operations: configurable workflows, robust APIs, and admin tools your teams will actually adopt. Fit is the feature.'
    stack=@('Node.js','Python','PostgreSQL','Redis','Docker','Kubernetes','GraphQL','REST','Auth0','AWS')
    caps=@('Internal platforms and workflow automation','Multi-tenant SaaS product development','Legacy system modernization and strangler patterns','Third-party integrations and webhook orchestration','Role-based admin consoles and audit trails','Scalable API layers with versioning discipline')
    benefits=@('Software that matches process - not the other way around','Reduced manual work through intelligent automation','Documentation and tests that future teams can inherit','Security and compliance baked into architecture decisions')
    usecases=@('Operations dashboards replacing spreadsheet chaos','Partner portals with granular permissions','Industry-specific compliance workflows','API products that monetize existing data assets')
    portfolio='project-orbit.html'; portfolioLabel='Orbit Logistics'
    faq=@(
      @{q='How do you scope custom software projects?';a='We map actors, workflows, and integration points in discovery, then prioritize an MVP that delivers operational value within weeks - not quarters.'}
      @{q='Can you integrate with our existing stack?';a='Yes. We routinely connect ERP, CRM, payment, and identity systems via stable API contracts and event-driven patterns.'}
      @{q='Do you provide ongoing support?';a='Absolutely. We offer retainers for iteration, monitoring, and SLA-backed support after launch.'}
    )
    cta='READY TO BUILD SOFTWARE THAT FITS?'
  },
  @{
    file='ai-solutions.html'; num='06'; title='AI Solutions'; hero='INTELLIGENCE EMBEDDED IN THE PRODUCT.'
    desc='Production AI features - copilots, automation, and prediction wired into real workflows with guardrails and measurable ROI from Solynx Innovations.'
    problem='AI demos impress in slides but fail in production without data quality, evaluation frameworks, and human oversight. Hype without guardrails creates liability.'
    solution='Solynx ships practical intelligence: RAG pipelines, copilots, and automation embedded in products your teams already use - with monitoring, fallbacks, and clear success metrics.'
    stack=@('Python','OpenAI','Anthropic','LangChain','Vector DB','Pinecone','MLOps','FastAPI','AWS','Evaluation Pipelines')
    caps=@('LLM-powered copilots and conversational interfaces','Document intelligence and extraction pipelines','Predictive models for forecasting and scoring','Process automation with human-in-the-loop review','RAG systems grounded in proprietary knowledge','Model evaluation, observability, and cost controls')
    benefits=@('AI features users trust because outputs are traceable','Reduced manual review time on high-volume document workflows','Decision support that improves with feedback loops','Infrastructure that scales cost predictably with usage')
    usecases=@('Support copilots trained on internal knowledge bases','Contract and invoice processing at scale','Demand forecasting for inventory teams','Intelligent search across fragmented enterprise data')
    portfolio='project-atlas.html'; portfolioLabel='Atlas Insight'
    faq=@(
      @{q='Do you fine-tune models or use RAG?';a='We default to RAG and prompt engineering for faster iteration and easier updates. Fine-tuning is considered when domain specificity and volume justify it.'}
      @{q='How do you handle data privacy?';a='We design for least-privilege access, encryption in transit and at rest, and deployment options that keep sensitive data within your boundary when required.'}
      @{q='What does ROI look like?';a='We define baseline metrics before build - handle time, error rate, or throughput - and report against them post-launch.'}
    )
    cta='READY TO SHIP AI THAT WORKS?'
  },
  @{
    file='digital-marketing.html'; num='07'; title='Digital Marketing'; hero='GROWTH SYSTEMS, NOT ONE-OFF CAMPAIGNS.'
    desc='Performance marketing, content systems, and funnel design that connect brand presence to measurable pipeline - from Solynx Innovations.'
    problem='Scattered channels and vanity metrics hide whether marketing actually creates qualified pipeline. Creative without measurement is expensive guessing.'
    solution='Solynx connects creative, media, and analytics into a growth system your product can learn from. Every campaign feeds insight back into positioning and UX.'
    stack=@('Google Ads','Meta Ads','LinkedIn Ads','GA4','HubSpot','Segment','Looker','A/B Testing','Content CMS')
    caps=@('Performance media strategy and execution','Full-funnel design from awareness to conversion','Content systems aligned to SEO and product narrative','Brand campaigns with consistent visual language','Marketing automation and lead scoring','Experimentation frameworks and cohort analysis')
    benefits=@('Clear attribution from spend to qualified opportunities','Creative iteration driven by data, not intuition alone','Aligned messaging across ads, landing pages, and product','Reduced CAC through systematic testing and refinement')
    usecases=@('Product launches needing coordinated multi-channel push','B2B lead gen for complex sales cycles','Retargeting programs for e-commerce and SaaS','Brand refresh with performance guardrails')
    portfolio='project-nova.html'; portfolioLabel='Nova Commerce OS'
    faq=@(
      @{q='Do you manage ad spend directly?';a='Yes, with transparent reporting and approval workflows. We optimize for your target CPA or ROAS, not platform vanity metrics.'}
      @{q='Can you work with our in-house creative team?';a='We collaborate often - providing performance insights and landing page engineering while your team owns brand voice.'}
      @{q='How quickly will we see results?';a='Initial learning phases typically run 4-6 weeks. Compounding improvements follow as creative and audience data mature.'}
    )
    cta='READY TO BUILD A GROWTH ENGINE?'
  },
  @{
    file='seo.html'; num='08'; title='SEO'; hero='ORGANIC VISIBILITY THAT COMPOUNDS.'
    desc='Technical SEO, content architecture, and measurement that build durable organic discovery - engineered by Solynx Innovations.'
    problem='SEO fails when technical debt and thin content work against each other. Quick fixes fade; without systems, rankings erode as competitors compound authority.'
    solution='Solynx aligns crawlability, site architecture, content strategy, and Core Web Vitals into one program. Organic growth becomes an engineering discipline, not a monthly checklist.'
    stack=@('Technical SEO','Content Strategy','Schema Markup','GA4','Search Console','Core Web Vitals','Screaming Frog','Ahrefs')
    caps=@('Technical audits and remediation roadmaps','Content cluster and topical authority planning','On-page optimization and internal linking systems','Local SEO for multi-location brands','Structured data and rich result optimization','Search analytics dashboards with actionable KPIs')
    benefits=@('Sustainable traffic growth independent of paid spend','Faster indexing and cleaner crawl budgets','Content that serves users and search intent simultaneously','Performance improvements that boost both SEO and conversion')
    usecases=@('Site migrations requiring equity preservation','SaaS companies targeting long-tail product keywords','E-commerce catalogs with faceted navigation complexity','Local service brands expanding into new markets')
    portfolio='project-nova.html'; portfolioLabel='Nova Commerce OS'
    faq=@(
      @{q='How long until SEO results appear?';a='Technical wins can show in weeks. Content authority typically compounds over 3-6 months depending on competition and publishing velocity.'}
      @{q='Do you write content or only advise?';a='Both. We can lead content production or partner with your team using briefs, templates, and editorial calendars.'}
      @{q='How do you report progress?';a='Monthly dashboards covering rankings, traffic quality, indexation health, and prioritized next actions - no opaque scorecards.'}
    )
    cta='READY TO COMPOUND ORGANIC REACH?'
  },
  @{
    file='testing.html'; num='09'; title='Software Testing'; hero='QUALITY THAT PROTECTS VELOCITY.'
    desc='Quality engineering with automation, exploration, and release gates that keep teams shipping fast without sacrificing confidence - from Solynx Innovations.'
    problem='Late bugs and flaky releases erode user trust and slow every subsequent sprint. Manual-only QA cannot keep pace with modern delivery cadences.'
    solution='Solynx embeds quality engineering into your pipeline: test strategy, UI and API automation, performance checks, and clear release gates that protect velocity instead of blocking it.'
    stack=@('Cypress','Playwright','Jest','Postman','k6','Selenium','GitHub Actions','JUnit','TestRail')
    caps=@('Test strategy and coverage planning','End-to-end UI automation for critical journeys','API and contract testing across services','Performance and load testing with thresholds','Security-focused test scenarios','CI integration with quality gates and reporting')
    benefits=@('Fewer production incidents on high-risk flows','Faster releases because regression is automated','Clear quality metrics visible to product and leadership','Reduced manual QA burden on repetitive scenarios')
    usecases=@('Teams scaling release frequency without headcount growth','Products entering regulated or high-stakes domains','Post-incident hardening and test gap remediation','Greenfield apps needing QA foundation from sprint one')
    portfolio='project-pulse.html'; portfolioLabel='Pulse Health'
    faq=@(
      @{q='Can you join an existing CI pipeline?';a='Yes. We integrate with GitHub Actions, GitLab CI, Jenkins, and others - meeting your team where they already deploy.'}
      @{q='Do you replace our QA team?';a='We augment, not replace. Automation handles regression; your team focuses on exploratory testing and domain edge cases.'}
      @{q='What is the first deliverable?';a='A prioritized test plan mapped to business-critical journeys, usually within the first two weeks of engagement.'}
    )
    cta='READY TO SHIP WITH CONFIDENCE?'
  },
  @{
    file='data-analytics.html'; num='10'; title='Data Analytics'; hero='SIGNALS THAT DRIVE DECISIONS.'
    desc='Data pipelines, metric design, and analytics products that turn operational complexity into clear decisions - from Solynx Innovations.'
    problem='Teams drown in dashboards that answer questions nobody is asking. Data exists everywhere but trust in metrics is low - so decisions revert to instinct.'
    solution='Solynx designs analytics products around decisions: clean pipelines, governed metrics, and dashboards leadership actually uses in weekly reviews.'
    stack=@('SQL','Python','dbt','Snowflake','BigQuery','Looker','Power BI','Airflow','Fivetran','AWS')
    caps=@('Data pipeline design and ETL/ELT implementation','Metric definitions and semantic layer governance','Executive and operational dashboards','Forecasting and statistical modeling','Self-serve analytics for product and ops teams','Data quality monitoring and alerting')
    benefits=@('Single source of truth for KPIs across departments','Faster answers to ad-hoc questions without analyst bottlenecks','Predictive insight that informs inventory, staffing, and spend','Documentation that makes metrics auditable and transferable')
    usecases=@('SaaS companies defining product and revenue metrics','Retail and e-commerce demand forecasting','Healthcare ops reporting with compliance requirements','Logistics teams optimizing route and fulfillment data')
    portfolio='project-atlas.html'; portfolioLabel='Atlas Insight'
    faq=@(
      @{q='Do you work with our existing warehouse?';a='Yes. We are warehouse-agnostic and integrate with Snowflake, BigQuery, Redshift, and Postgres-based stacks.'}
      @{q='Can you fix messy source data?';a='We implement cleansing, deduplication, and validation layers so downstream dashboards inherit trustworthy inputs.'}
      @{q='How do you define success?';a='Adoption - leaders opening dashboards weekly - plus measurable decision impact like reduced stockouts or improved forecast accuracy.'}
    )
    cta='READY TO TRUST YOUR DATA?'
  }
)

foreach ($sp in $servicePages) {
  $capsHtml = ($sp.caps | ForEach-Object { "          <li>$_</li>" }) -join "`n"
  $stackHtml = ($sp.stack | ForEach-Object { "<span>$_</span>" }) -join "`n          "
  $benefitsHtml = ($sp.benefits | ForEach-Object { "          <li>$_</li>" }) -join "`n"
  $usecasesHtml = ($sp.usecases | ForEach-Object { "          <li>$_</li>" }) -join "`n"
  $faqHtml = ($sp.faq | ForEach-Object { "        <div class=`"faq-item`"><button type=`"button`">$($_.q) <span class=`"icon`">+</span></button><div class=`"faq-item__body`"><p>$($_.a)</p></div></div>" }) -join "`n"

  $page = (Get-Head "$($sp.title) - Solynx Innovations" $sp.desc "https://solynx.in/$($sp.file)")
  $page += @"

    <section class="page-hero">
      <div class="container-solynx">
        <div class="split-section">
          <div>
            <p class="eyebrow" data-animate="fade-up">Service $($sp.num)</p>
            <h1 data-animate="fade-up">$($sp.hero)</h1>
            <p class="lead" data-animate="fade-up">$($sp.solution)</p>
            <div class="btn-group-solynx" data-animate="fade-up">
              <a class="btn-solynx btn-solynx--primary" href="quote.html" data-magnetic>Start a Project <span class="btn-arrow">→</span></a>
              <a class="btn-solynx btn-solynx--secondary" href="contact.html">Talk to Solynx</a>
            </div>
          </div>
          <div class="service-detail-hero-visual" data-animate="scale" aria-hidden="true">
            <div class="visual-ring visual-ring--lg"></div>
            <div class="visual-ring visual-ring--md"></div>
            <div class="visual-ring visual-ring--sm"></div>
            <div class="visual-orb"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <div class="row g-4">
          <div class="col-md-6" data-animate="fade-up">
            <div class="card-3d h-100" data-tilt>
              <p class="eyebrow">Problem</p>
              <h2 class="h3 mb-3">The friction we remove.</h2>
              <p>$($sp.problem)</p>
            </div>
          </div>
          <div class="col-md-6" data-animate="fade-up">
            <div class="card-3d h-100" data-tilt>
              <p class="eyebrow">Solution</p>
              <h2 class="h3 mb-3">How Solynx approaches it.</h2>
              <p>$($sp.solution)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Capabilities</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">What we deliver.</h2>
        <ul class="capability-list" data-stagger>
$capsHtml
        </ul>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Stack</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Technology we use.</h2>
        <div class="stack-pills" data-animate="fade-up">
          $stackHtml
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Process</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">How engagement flows.</h2>
        <div class="process-track" data-stagger>
          <div class="process-step"><div class="process-step__num">01</div><div><h3 class="process-step__title">Discover</h3><p class="process-step__desc">Goals, users, constraints, and success metrics.</p></div></div>
          <div class="process-step"><div class="process-step__num">02</div><div><h3 class="process-step__title">Design</h3><p class="process-step__desc">Experience, architecture, and delivery plan alignment.</p></div></div>
          <div class="process-step"><div class="process-step__num">03</div><div><h3 class="process-step__title">Build</h3><p class="process-step__desc">Iterative sprints with demos and measurable progress.</p></div></div>
          <div class="process-step"><div class="process-step__num">04</div><div><h3 class="process-step__title">Launch and grow</h3><p class="process-step__desc">Stabilize, measure, optimize, and expand.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Benefits</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Outcomes that compound.</h2>
        <ul class="capability-list" data-stagger>
$benefitsHtml
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Use cases</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Where this service fits.</h2>
        <ul class="capability-list" data-stagger>
$usecasesHtml
        </ul>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <div class="split-section align-items-center">
          <div data-animate="fade-up">
            <p class="eyebrow">Portfolio</p>
            <h2 class="section-heading mb-3">See it in practice.</h2>
            <p class="section-lead mb-4">Explore $($sp.portfolioLabel) and related work in our portfolio - proof that this capability ships in production, not just in decks.</p>
            <a class="btn-solynx btn-solynx--secondary" href="$($sp.portfolio)">View $($sp.portfolioLabel) <span class="btn-arrow">→</span></a>
            <a class="btn-solynx btn-solynx--ghost ms-2" href="portfolio.html">All projects</a>
          </div>
          <div class="service-detail-hero-visual" data-animate="scale" style="min-height:260px" aria-hidden="true">
            <div class="visual-ring visual-ring--md"></div>
            <div class="visual-orb" style="width:120px"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx" style="max-width:720px">
        <p class="eyebrow" data-animate="fade-up">FAQ</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Questions we hear often.</h2>
$faqHtml
        <p class="mt-4 text-muted small" data-animate="fade-up">More questions? Email <a href="mailto:support@solynx.in">support@solynx.in</a>.</p>
      </div>
    </section>

"@
  $page += (Get-CTA $sp.cta)
  $page += $scripts
  Write-Page $sp.file $page
}

# --- PROJECT PAGES ---
$projectPages = @(
  @{
    file='project-nova.html'; title='Nova Commerce OS'; category='Web Platform'; service='E-Commerce Development'
    desc='Nova Commerce OS - a headless commerce platform built by Solynx Innovations for high-volume retail with sub-second storefront performance.'
    hero='NOVA COMMERCE OS.'
    overview='Nova Commerce OS is a unified headless commerce platform for a multi-brand retailer processing millions of monthly sessions. Solynx replaced a fragmented stack with a single product surface for merchandising, checkout, and ops - engineered for peak traffic and continuous experimentation.'
    challenge='The client ran three legacy storefronts with inconsistent checkout, poor mobile conversion, and inventory sync delays that caused overselling during promotions. Marketing could not launch campaigns without engineering intervention.'
    approach='We ran a four-week discovery mapping catalog rules, payment flows, and fulfillment integrations. A strangler migration shipped category-by-category while preserving SEO equity. Performance budgets and experiment flags were defined before the first production deploy.'
    solution='A Next.js storefront on a headless commerce core, backed by event-driven inventory sync and a merchant dashboard for campaigns, bundles, and real-time analytics. Checkout was reduced to three steps with wallet payments and address autofill.'
    stack=@('React','Next.js','Node.js','PostgreSQL','Redis','AWS','Stripe','Elasticsearch','Segment')
    screenshots=@('Storefront home and category grid','Checkout and payment flow','Merchant ops dashboard','Analytics and experiment panel')
    results=@('34% lift in mobile conversion within 90 days of launch','Page load p75 under 1.8s on 4G connections','Zero oversell incidents during Black Friday peak','Campaign launch time reduced from days to hours')
    cta='BUILD COMMERCE THAT SCALES.'
  },
  @{
    file='project-pulse.html'; title='Pulse Health'; category='Mobile'; service='Mobile App Development'
    desc='Pulse Health - a Flutter patient engagement app with secure messaging, appointment flows, and offline access built by Solynx Innovations.'
    hero='PULSE HEALTH.'
    overview='Pulse Health is a patient-facing mobile app for a regional healthcare network. It centralizes appointments, lab results, secure messaging, and care plan reminders - designed for accessibility and HIPAA-aware data handling.'
    challenge='Patients juggled phone calls, paper packets, and a outdated portal with 40% mobile bounce. Clinicians lacked visibility into whether patients followed post-visit instructions.'
    approach='Solynx embedded with clinical ops and compliance stakeholders to map journeys under regulatory constraints. We prototyped core flows in Figma, validated with patient panels, then built a Flutter app with encrypted local storage for offline access.'
    solution='A cross-platform app with biometric login, push-orchestrated care reminders, in-app secure chat, and PDF lab viewers. An admin API connects to the existing EHR via HL7 FHIR for read-only results and scheduling.'
    stack=@('Flutter','Dart','Firebase','Node.js','PostgreSQL','FHIR','Fastlane','App Store','Google Play')
    screenshots=@('Patient home and care timeline','Appointment booking flow','Secure messaging interface','Lab results and documents view')
    results=@('62% monthly active patient rate within six months','No-show appointments down 22% after reminder rollout','App Store rating 4.8 with consistent release cadence','Support call volume reduced 18% for routine inquiries')
    cta='BUILD MOBILE CARE EXPERIENCES.'
  },
  @{
    file='project-atlas.html'; title='Atlas Insight'; category='AI'; service='AI Solutions'
    desc='Atlas Insight - an enterprise RAG copilot and analytics layer that turns fragmented operational data into actionable answers, built by Solynx Innovations.'
    hero='ATLAS INSIGHT.'
    overview='Atlas Insight is an internal intelligence layer for a logistics enterprise sitting on years of contracts, SOPs, and shipment records scattered across SharePoint, email, and SQL silos. Solynx unified retrieval with a governed copilot interface.'
    challenge='Analysts spent hours hunting documents before answering leadership questions. Previous chatbot pilots hallucinated on outdated policy PDFs and lacked audit trails.'
    approach='We indexed authoritative sources with chunk-level metadata, built evaluation suites on real historical questions, and designed human-in-the-loop escalation for low-confidence answers. Cost and latency budgets were tracked from sprint one.'
    solution='A RAG pipeline with vector search, citation-backed responses, and role-based source filtering. A Slack and web copilot surfaces answers with linked excerpts; admins manage source freshness and blocked topics centrally.'
    stack=@('Python','FastAPI','OpenAI','Pinecone','PostgreSQL','LangChain','React','AWS','Evaluation Harness')
    screenshots=@('Copilot chat with source citations','Admin source management console','Usage and confidence analytics','Slack integration preview')
    results=@('Average research time per query dropped from 45 to 6 minutes','92% answer accuracy on held-out evaluation set','Leadership adoption across 4 departments in first quarter','Full audit trail for compliance review requests')
    cta='EMBED INTELLIGENCE IN YOUR WORKFLOW.'
  },
  @{
    file='project-lumen.html'; title='Lumen Design System'; category='UI/UX'; service='UI/UX Design'
    desc='Lumen Design System - a cross-platform design system and Figma library that unified product teams for a fintech SaaS company, by Solynx Innovations.'
    hero='LUMEN DESIGN SYSTEM.'
    overview='Lumen is a comprehensive design system created for a fintech SaaS company shipping web and mobile from three distributed product teams. Solynx delivered tokens, components, documentation, and Storybook implementations that ended visual drift.'
    challenge='Each squad shipped slightly different buttons, forms, and data tables. Rebrand efforts stalled because no single source of truth existed. Engineering estimated 30% of sprint capacity went to one-off UI fixes.'
    approach='We audited live product surfaces, ran alignment workshops, and prioritized a tier-one component set covering 80% of UI volume. Tokens were defined for color, type, spacing, and motion before any pixel push.'
    solution='A Figma library with auto-layout components, published design tokens, accessibility annotations, and a Storybook repo synced to production React components. Contribution guidelines and review rituals kept the system alive post-handoff.'
    stack=@('Figma','Design Tokens','Storybook','React','Accessibility','Motion Specs','Design Ops')
    screenshots=@('Core component library overview','Token and typography scale','Form and data table patterns','Storybook documentation site')
    results=@('UI-related sprint rework down 40% within two quarters','Time-to-ship for new features improved 25%','WCAG AA compliance across tier-one components','Three product teams aligned on single release visual language')
    cta='UNIFY DESIGN AT SCALE.'
  },
  @{
    file='project-orbit.html'; title='Orbit Logistics'; category='Software'; service='Custom Software Development'
    desc='Orbit Logistics - a custom operations platform for fleet routing, warehouse coordination, and real-time shipment tracking built by Solynx Innovations.'
    hero='ORBIT LOGISTICS.'
    overview='Orbit Logistics is an internal operations platform for a mid-size 3PL provider coordinating 120 vehicles and four warehouses. Solynx replaced spreadsheet dispatch and radio check-ins with a single system of record.'
    challenge='Dispatchers copied data between WhatsApp, Excel, and a legacy TMS with no realtime visibility. Delay notifications reached customers hours late, driving support load and SLA penalties.'
    approach='Solynx shadowed dispatch shifts, modeled state machines for shipment lifecycle, and integrated GPS telematics and warehouse scanners via webhooks. We shipped an MVP dispatch board in eight weeks before expanding to customer portals.'
    solution='A Node.js platform with PostgreSQL, realtime map views, automated ETA alerts, and role-based dashboards for dispatch, warehouse, and customer success. Exception workflows route delays to the right owner with full audit history.'
    stack=@('Node.js','PostgreSQL','Redis','React','WebSockets','GraphQL','Docker','AWS','Twilio')
    screenshots=@('Live dispatch map and fleet view','Warehouse scan and pick workflow','Customer shipment tracking portal','Exception management dashboard')
    results=@('On-time delivery improved from 91% to 97% in six months','Dispatcher manual entry reduced by 70%','Customer proactive delay notifications up 5x','SLA penalty costs down 31% year over year')
    cta='BUILD OPERATIONS SOFTWARE THAT DELIVERS.'
  }
)

foreach ($pp in $projectPages) {
  $stackHtml = ($pp.stack | ForEach-Object { "<span>$_</span>" }) -join "`n          "
  $resultsHtml = ($pp.results | ForEach-Object { "          <li>$_</li>" }) -join "`n"
  $shotsHtml = ($pp.screenshots | ForEach-Object {
    "          <div class=`"col-md-6`" data-animate=`"fade-up`"><div class=`"service-detail-hero-visual`" style=`"min-height:220px`" aria-hidden=`"true`"><div class=`"visual-ring visual-ring--md`"></div><p class=`"eyebrow`" style=`"position:relative;z-index:2;margin:0`">$_</p></div></div>"
  }) -join "`n"

  $page = (Get-Head "$($pp.title) - Solynx Innovations" $pp.desc "https://solynx.in/$($pp.file)")
  $page += @"

    <section class="page-hero">
      <div class="container-solynx">
        <div class="split-section">
          <div>
            <p class="eyebrow" data-animate="fade-up">$($pp.category)</p>
            <h1 data-animate="fade-up">$($pp.hero)</h1>
            <p class="lead" data-animate="fade-up">$($pp.overview)</p>
            <div class="btn-group-solynx" data-animate="fade-up">
              <a class="btn-solynx btn-solynx--primary" href="quote.html" data-magnetic>Start a Project <span class="btn-arrow">→</span></a>
              <a class="btn-solynx btn-solynx--secondary" href="portfolio.html">Back to portfolio</a>
            </div>
          </div>
          <div class="service-detail-hero-visual" data-animate="scale" aria-hidden="true">
            <div class="visual-ring visual-ring--lg"></div>
            <div class="visual-ring visual-ring--md"></div>
            <div class="visual-ring visual-ring--sm"></div>
            <div class="visual-orb"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Overview</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Project at a glance.</h2>
        <div class="row g-4">
          <div class="col-lg-8" data-animate="fade-up">
            <p>$($pp.overview)</p>
          </div>
          <div class="col-lg-4" data-animate="fade-up">
            <div class="card-3d" data-tilt>
              <p class="eyebrow">Service</p>
              <h3 class="h5 mb-3">$($pp.service)</h3>
              <p class="small text-muted mb-0">Delivered by Solynx Innovations. Questions? <a href="mailto:support@solynx.in">support@solynx.in</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <div class="row g-4">
          <div class="col-md-6" data-animate="fade-up">
            <div class="card-3d h-100" data-tilt>
              <p class="eyebrow">Challenge</p>
              <h2 class="h3 mb-3">What was broken.</h2>
              <p>$($pp.challenge)</p>
            </div>
          </div>
          <div class="col-md-6" data-animate="fade-up">
            <div class="card-3d h-100" data-tilt>
              <p class="eyebrow">Approach</p>
              <h2 class="h3 mb-3">How we moved.</h2>
              <p>$($pp.approach)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Solution</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">What we shipped.</h2>
        <p data-animate="fade-up" style="max-width:72ch">$($pp.solution)</p>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Technology</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Stack in production.</h2>
        <div class="stack-pills" data-animate="fade-up">
          $stackHtml
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Screenshots</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Product surfaces.</h2>
        <div class="row g-3">
$shotsHtml
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-solynx">
        <p class="eyebrow" data-animate="fade-up">Results</p>
        <h2 class="section-heading mb-4" data-animate="fade-up">Measured impact.</h2>
        <ul class="capability-list" data-stagger>
$resultsHtml
        </ul>
      </div>
    </section>

"@
  $page += (Get-CTA $pp.cta "Inspired by $($pp.title)? Let us engineer the same rigor for your product.")
  $page += $scripts
  Write-Page $pp.file $page
}

Write-Host "All 15 pages generated successfully."
