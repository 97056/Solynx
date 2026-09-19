import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent

ARROW = (
    '<span class="btn-arrow" aria-hidden="true">'
    '<svg viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">'
    '<path d="M2 7h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
    '<path d="M15 2.5L22.5 7 15 11.5" stroke="currentColor" stroke-width="1.6" '
    'stroke-linecap="round" stroke-linejoin="round"/>'
    '<circle cx="25.2" cy="7" r="1.4" fill="currentColor"/>'
    "</svg>"
    "</span>"
)

count = 0
for p in ROOT.glob("*.html"):
    t = p.read_text(encoding="utf-8", errors="replace")
    orig = t

    # Broken middot encoding -> clean separators
    t = t.replace("Â·", " / ")
    t = t.replace("·", " / ")
    t = re.sub(r"\s+/+\s+", " / ", t)

    # Existing btn-arrow spans (any content) -> unique SVG
    t = re.sub(
        r'<span class="btn-arrow"[^>]*>.*?</span>',
        ARROW,
        t,
        flags=re.DOTALL,
    )

    # Service explore nested span arrows
    t = t.replace(
        'Explore <span>-></span>',
        "Explore " + ARROW,
    )
    t = t.replace(
        "Explore <span>→</span>",
        "Explore " + ARROW,
    )

    # Project CTAs with text arrow
    t = re.sub(
        r'(class="project-card__cta">)\s*View Project(?:\s*(?:-&gt;|->|→))?\s*',
        r"\1View Project " + ARROW,
        t,
    )

    # Catch remaining " ->" before closing tags in links/buttons (not in URLs)
    t = re.sub(r"\s*-&gt;\s*(</(?:span|a|button)>)", r" " + ARROW + r"\1", t)
    t = re.sub(r"\s*->\s*(</(?:span|a|button)>)", r" " + ARROW + r"\1", t)

    # Avoid duplicated arrows
    t = re.sub(
        r"(" + re.escape(ARROW) + r")\s*" + re.escape(ARROW),
        r"\1",
        t,
    )

    if t != orig:
        p.write_text(t, encoding="utf-8")
        count += 1
        print("updated", p.name)

# Fix components.js mobile CTA arrow
js = ROOT / "js" / "components.js"
if js.exists():
    jt = js.read_text(encoding="utf-8")
    jo = jt
    jt = re.sub(
        r'<span class="btn-arrow">.*?</span>',
        ARROW,
        jt,
        flags=re.DOTALL,
    )
    if jt != jo:
        js.write_text(jt, encoding="utf-8")
        count += 1
        print("updated js/components.js")

print("done", count)
