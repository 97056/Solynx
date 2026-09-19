#!/usr/bin/env python3
"""Apply SEO meta, JSON-LD, sitemap, and daily keyword rotation for Solynx static site."""

from __future__ import annotations

import hashlib
import json
import re
from datetime import date, datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "seo" / "config.json"
SITEMAP_PATH = ROOT / "sitemap.xml"
ROBOTS_PATH = ROOT / "robots.txt"
DAILY_PATH = ROOT / "seo" / "daily.json"


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def today_iso() -> str:
    return date.today().isoformat()


def rotate_keywords(global_keywords: list[str], page_keywords: list[str], day: str) -> list[str]:
    """Deterministic daily keyword order so search signals refresh without randomness drift."""
    seed = int(hashlib.sha256(day.encode("utf-8")).hexdigest()[:8], 16)
    pool = list(dict.fromkeys(page_keywords + global_keywords))
    if not pool:
        return []
    shift = seed % len(pool)
    rotated = pool[shift:] + pool[:shift]
    # Keep page-specific terms first for relevance
    ordered = list(dict.fromkeys(page_keywords + rotated))
    return ordered[:18]


def build_json_ld(site: dict, page_file: str, page: dict, keywords: list[str]) -> dict:
    url = site["url"].rstrip("/") + page["path"]
    base = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": site["url"].rstrip("/") + "/#organization",
                "name": site["name"],
                "url": site["url"],
                "email": site.get("email"),
                "logo": site.get("ogImage"),
                "sameAs": [],
            },
            {
                "@type": "WebSite",
                "@id": site["url"].rstrip("/") + "/#website",
                "url": site["url"],
                "name": site["name"],
                "publisher": {"@id": site["url"].rstrip("/") + "/#organization"},
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": site["url"].rstrip("/") + "/services?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": page.get("type", "WebPage"),
                "@id": url + "#webpage",
                "url": url,
                "name": page["title"],
                "description": page["description"],
                "isPartOf": {"@id": site["url"].rstrip("/") + "/#website"},
                "keywords": ", ".join(keywords),
                "inLanguage": "en-IN",
                "dateModified": today_iso(),
            },
        ],
    }
    if page.get("type") == "Service":
        base["@graph"].append(
            {
                "@type": "Service",
                "name": page["title"].split("|")[0].strip(),
                "provider": {"@id": site["url"].rstrip("/") + "/#organization"},
                "description": page["description"],
                "areaServed": "IN",
                "url": url,
            }
        )
    return base


def upsert_meta(head: str, attr: str, key: str, content: str, prop: bool = False) -> str:
    """Insert or replace a meta tag in <head>."""
    if prop:
        pattern = re.compile(
            rf'<meta\s+property=(["\']){re.escape(key)}\1\s+content=(["\'])(.*?)\2\s*/?>',
            re.I | re.S,
        )
        tag = f'<meta property="{key}" content="{_esc(content)}">'
    else:
        pattern = re.compile(
            rf'<meta\s+name=(["\']){re.escape(key)}\1\s+content=(["\'])(.*?)\2\s*/?>',
            re.I | re.S,
        )
        tag = f'<meta name="{key}" content="{_esc(content)}">'

    if pattern.search(head):
        return pattern.sub(tag, head, count=1)
    # insert before stylesheet or before </head>
    anchor = re.search(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', head, re.I)
    if anchor:
        return head[: anchor.start()] + "  " + tag + "\n  " + head[anchor.start() :]
    return head.replace("</head>", f"  {tag}\n</head>", 1)


def upsert_link(head: str, rel: str, href: str) -> str:
    pattern = re.compile(
        rf'<link\s+rel=(["\']){re.escape(rel)}\1\s+href=(["\'])(.*?)\2\s*/?>',
        re.I | re.S,
    )
    tag = f'<link rel="{rel}" href="{_esc(href)}">'
    if pattern.search(head):
        return pattern.sub(tag, head, count=1)
    return head.replace("</head>", f"  {tag}\n</head>", 1)


def upsert_title(head: str, title: str) -> str:
    pattern = re.compile(r"<title>[^<]*</title>", re.I)
    tag = f"<title>{_esc(title)}</title>"
    if pattern.search(head):
        return pattern.sub(tag, head, count=1)
    return head.replace("<head>", f"<head>\n  {tag}", 1)


def upsert_json_ld(html: str, data: dict) -> str:
    block = (
        '<script type="application/ld+json" id="solynx-jsonld">'
        + json.dumps(data, ensure_ascii=True, separators=(",", ":"))
        + "</script>"
    )
    html = re.sub(
        r'<script[^>]*id=["\']solynx-jsonld["\'][^>]*>.*?</script>\s*',
        "",
        html,
        flags=re.I | re.S,
    )
    return html.replace("</head>", f"  {block}\n</head>", 1)


def _esc(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace('"', "&quot;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def rewrite_internal_links(html: str, pages: dict) -> str:
    """Rewrite href=\"file.html\" to clean paths for SEO-friendly navigation."""
    mapping = {name: meta["path"] for name, meta in pages.items()}

    def repl(match: re.Match) -> str:
        name = match.group(2)
        clean = mapping.get(name)
        if not clean:
            return match.group(0)
        return f"{match.group(1)}{clean}{match.group(3)}"

    return re.sub(
        r'(href=["\'])([A-Za-z0-9._-]+\.html)(["\'])',
        repl,
        html,
        flags=re.I,
    )


def ensure_base_href(head: str) -> str:
    """Root base so nested clean URLs still load /css /js /assets."""
    pattern = re.compile(r'<base\s+href=["\'][^"\']*["\']\s*/?>', re.I)
    tag = '<base href="/">'
    if pattern.search(head):
        return pattern.sub(tag, head, count=1)
    # after charset if present
    charset = re.search(r'<meta\s+charset=["\'][^"\']*["\']\s*/?>', head, re.I)
    if charset:
        i = charset.end()
        return head[:i] + "\n  " + tag + head[i:]
    return head.replace("<head>", "<head>\n  " + tag, 1)


def apply_page(path: Path, site: dict, page: dict, keywords: list[str], pages: dict) -> None:
    html = path.read_text(encoding="utf-8")
    m = re.search(r"<head[^>]*>(.*?)</head>", html, re.I | re.S)
    if not m:
        print("skip (no head):", path.name)
        return

    head = m.group(0)
    clean_url = site["url"].rstrip("/") + page["path"]
    kw = ", ".join(keywords)

    head = ensure_base_href(head)
    head = upsert_title(head, page["title"])
    head = upsert_meta(head, "name", "description", page["description"])
    head = upsert_meta(head, "name", "keywords", kw)
    head = upsert_meta(head, "name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
    head = upsert_meta(head, "name", "author", site["name"])
    head = upsert_meta(head, "name", "language", "English")
    head = upsert_meta(head, "name", "revisit-after", "1 days")
    head = upsert_meta(head, "name", "geo.region", "IN")
    head = upsert_link(head, "canonical", clean_url)

    head = upsert_meta(head, "property", "og:title", page["title"], prop=True)
    head = upsert_meta(head, "property", "og:description", page["description"], prop=True)
    head = upsert_meta(head, "property", "og:type", "website", prop=True)
    head = upsert_meta(head, "property", "og:url", clean_url, prop=True)
    head = upsert_meta(head, "property", "og:site_name", site["name"], prop=True)
    head = upsert_meta(head, "property", "og:locale", site.get("locale", "en_IN"), prop=True)
    if site.get("ogImage"):
        head = upsert_meta(head, "property", "og:image", site["ogImage"], prop=True)

    head = upsert_meta(head, "name", "twitter:card", "summary_large_image")
    head = upsert_meta(head, "name", "twitter:title", page["title"])
    head = upsert_meta(head, "name", "twitter:description", page["description"])
    if site.get("twitter"):
        head = upsert_meta(head, "name", "twitter:site", site["twitter"])

    html = html[: m.start()] + head + html[m.end() :]
    html = rewrite_internal_links(html, pages)
    ld = build_json_ld(site, path.name, page, keywords)
    html = upsert_json_ld(html, ld)
    path.write_text(html, encoding="utf-8")
    print("seo:", path.name)


def write_sitemap(site: dict, pages: dict, day: str) -> None:
    base = site["url"].rstrip("/")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for file_name, page in pages.items():
        loc = base + page["path"]
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{day}</lastmod>")
        lines.append(f"    <changefreq>{page.get('changefreq', 'weekly')}</changefreq>")
        lines.append(f"    <priority>{page.get('priority', 0.5):.1f}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    lines.append("")
    SITEMAP_PATH.write_text("\n".join(lines), encoding="utf-8")
    print("wrote sitemap.xml")


def write_robots(site: dict) -> None:
    base = site["url"].rstrip("/")
    ROBOTS_PATH.write_text(
        "\n".join(
            [
                "User-agent: *",
                "Allow: /",
                "Disallow: /scripts/",
                "Disallow: /seo/config.json",
                f"Sitemap: {base}/sitemap.xml",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print("wrote robots.txt")


def write_daily(site: dict, pages: dict, day: str, rotations: dict) -> None:
    payload = {
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "date": day,
        "site": site["url"],
        "note": "Daily SEO keyword rotation and sitemap lastmod refresh for crawler freshness.",
        "pages": rotations,
    }
    DAILY_PATH.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print("wrote seo/daily.json")


def write_htaccess(pages: dict) -> None:
    rules = [
        "RewriteEngine On",
        "RewriteBase /",
        "",
        "# Force HTTPS if available on host",
        "RewriteCond %{HTTPS} off",
        "RewriteCond %{HTTP:X-Forwarded-Proto} !https",
        "RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]",
        "",
        "# Redirect .html to clean URLs",
        "RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]",
        "RewriteRule ^ /%1? [R=301,L]",
        "RewriteRule ^index\\.html$ / [R=301,L]",
        "",
        "# Serve clean URLs from .html files",
        "RewriteCond %{REQUEST_FILENAME} !-f",
        "RewriteCond %{REQUEST_FILENAME} !-d",
        "RewriteCond %{REQUEST_FILENAME}.html -f",
        "RewriteRule ^(.+?)/?$ $1.html [L]",
        "",
    ]
    # Optional explicit service/portfolio aliases
    aliases = []
    for file_name, page in pages.items():
        clean = page["path"].strip("/")
        if not clean:
            continue
        if "/" in clean:
            aliases.append(f"RewriteRule ^{re.escape(clean)}/?$ {file_name} [L]")
    content = "\n".join(rules + (["# Nested clean paths", *aliases, ""] if aliases else []))
    (ROOT / ".htaccess").write_text(content, encoding="utf-8")
    print("wrote .htaccess")


def write_netlify_redirects(pages: dict) -> None:
    lines = ["# Clean SEO URLs"]
    for file_name, page in pages.items():
        clean = page["path"]
        if clean == "/":
            lines.append("/  /index.html  200")
            continue
        lines.append(f"{clean}  /{file_name}  200")
        lines.append(f"{clean}/  /{file_name}  200")
        lines.append(f"/{file_name}  {clean}  301")
    lines.append("")
    (ROOT / "_redirects").write_text("\n".join(lines), encoding="utf-8")
    print("wrote _redirects")


def main() -> None:
    config = load_config()
    site = config["site"]
    pages = config["pages"]
    global_kw = config.get("globalKeywords", [])
    day = today_iso()
    rotations = {}

    for file_name, page in pages.items():
        path = ROOT / file_name
        if not path.exists():
            print("missing:", file_name)
            continue
        keywords = rotate_keywords(global_kw, page.get("keywords", []), day + file_name)
        rotations[file_name] = {
            "path": page["path"],
            "title": page["title"],
            "keywords": keywords,
        }
        apply_page(path, site, page, keywords, pages)

    write_sitemap(site, pages, day)
    write_robots(site)
    write_daily(site, pages, day, rotations)
    write_htaccess(pages)
    write_netlify_redirects(pages)
    print("SEO apply complete:", day)


if __name__ == "__main__":
    main()
