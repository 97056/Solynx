#!/usr/bin/env python3
"""Remove duplicate meta tags before re-applying SEO."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _keep_last(html: str, pattern: re.Pattern) -> str:
    matches = list(pattern.finditer(html))
    if len(matches) <= 1:
        return html
    keep = matches[-1].group(0).rstrip() + "\n"
    html = pattern.sub("", html)
    anchor = re.search(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.I)
    if anchor:
        return html[: anchor.start()] + "  " + keep + "  " + html[anchor.start() :]
    return html.replace("</head>", "  " + keep + "</head>", 1)


def dedupe(html: str) -> str:
    props = (
        "og:title",
        "og:description",
        "og:type",
        "og:url",
        "og:site_name",
        "og:locale",
        "og:image",
    )
    names = (
        "description",
        "keywords",
        "robots",
        "author",
        "language",
        "revisit-after",
        "geo.region",
        "twitter:card",
        "twitter:title",
        "twitter:description",
        "twitter:site",
    )

    for prop in props:
        pattern = re.compile(
            rf'<meta\s+property=(["\']){re.escape(prop)}\1\s+content=(["\'])(.*?)\2\s*/?>\s*',
            re.I | re.S,
        )
        html = _keep_last(html, pattern)

    for name in names:
        pattern = re.compile(
            rf'<meta\s+name=(["\']){re.escape(name)}\1\s+content=(["\'])(.*?)\2\s*/?>\s*',
            re.I | re.S,
        )
        html = _keep_last(html, pattern)

    title_pat = re.compile(r"<title>.*?</title>\s*", re.I | re.S)
    html = _keep_last(html, title_pat)
    return html


def main() -> None:
    for path in sorted(ROOT.glob("*.html")):
        original = path.read_text(encoding="utf-8")
        cleaned = dedupe(original)
        if cleaned != original:
            path.write_text(cleaned, encoding="utf-8")
            print("deduped:", path.name)
        else:
            print("ok:", path.name)


if __name__ == "__main__":
    main()
