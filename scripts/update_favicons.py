#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
NEW = """    <link rel="icon" type="image/png" href="assets/brand/favicon-32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="assets/brand/favicon-48.png" sizes="48x48">
  <link rel="icon" type="image/png" href="assets/brand/favicon-light-32.png" sizes="32x32" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" href="assets/brand/mark-dark-96.png" sizes="96x96">"""

PAT = re.compile(
    r'<link rel="icon" type="image/png" href="assets/brand/favicon-dark\.png" sizes="32x32">\s*'
    r'<link rel="icon" type="image/png" href="assets/brand/favicon-light\.png" media="\(prefers-color-scheme: dark\)">\s*'
    r'<link rel="icon" type="image/png" href="assets/brand/favicon-dark\.png" media="\(prefers-color-scheme: light\)">\s*'
    r'<link rel="apple-touch-icon" href="assets/brand/favicon-dark\.png">',
    re.I,
)

for path in sorted(ROOT.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    updated, count = PAT.subn(NEW, text, count=1)
    if count:
        path.write_text(updated, encoding="utf-8")
        print("updated:", path.name)
    else:
        print("skip:", path.name)
