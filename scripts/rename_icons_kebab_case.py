#!/usr/bin/env python3
from pathlib import Path
import re


icons_dir = Path("/Users/alexander/Desktop/Work/temp/new-mvd/new-mvd/src/assets/icons")
manifest = icons_dir / "_figma-icons-manifest.txt"

svg_files = sorted([p for p in icons_dir.glob("*.svg") if p.is_file()])


def to_kebab(stem: str) -> str:
    s = stem.strip().lower()
    s = s.replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "icon"


mapping = {}
used = set()

for p in svg_files:
    base = to_kebab(p.stem)
    name = base
    i = 2
    while name in used:
        name = f"{base}-{i}"
        i += 1
    used.add(name)
    mapping[p.name] = f"{name}.svg"

# Rename via temporary names to avoid collisions.
tmp_names = []
for i, p in enumerate(svg_files, start=1):
    tmp = p.with_name(f"__tmp_{i}.svg")
    p.rename(tmp)
    tmp_names.append(tmp)

for old, tmp in zip(svg_files, tmp_names):
    tmp.rename(icons_dir / mapping[old.name])

if manifest.exists():
    text = manifest.read_text(encoding="utf-8")
    for old_name, new_name in sorted(mapping.items(), key=lambda x: len(x[0]), reverse=True):
        text = text.replace(old_name, new_name)
    manifest.write_text(text, encoding="utf-8")

print("Renamed:", len(mapping))
for old_name, new_name in sorted(mapping.items()):
    if old_name != new_name:
        print(f"{old_name} -> {new_name}")
