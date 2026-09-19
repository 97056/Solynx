import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
count = 0

for p in root.glob("*.html"):
    t = p.read_text(encoding="utf-8", errors="replace")
    orig = t
    t = t.replace("\u2192", "->")
    t = t.replace("â†’", "->")
    t = t.replace("â€”", "-")
    t = t.replace("â€“", "-")
    t = t.replace("â€™", "'")
    t = re.sub(r"View Project\s*.{0,3}\s*</span>", "View Project -></span>", t)
    t = re.sub(r'(class="btn-arrow">)[^<]*<', r"\1-><", t)
    t = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", t)
    if t != orig:
        p.write_text(t, encoding="utf-8")
        count += 1
        print("fixed", p.name)

print("total", count)
