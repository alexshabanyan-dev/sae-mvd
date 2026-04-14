#!/usr/bin/env python3
"""
Export icon SVG assets from a saved Figma MCP get_design_context output.

Usage:
  python3 scripts/export_figma_icons.py \
    --source "/abs/path/to/get_design_context.txt" \
    --output "/abs/path/to/src/assets/icons"
"""

from __future__ import annotations

import argparse
import concurrent.futures
import re
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Tuple
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen


CONST_RE = re.compile(r'^const\s+(\w+)\s*=\s*"([^"]+)";', re.M)
FUNC_RE = re.compile(r"function\s+(\w+)\([^)]*\)\s*\{(.*?)\n\}", re.S)
ICON_NAME_RE = re.compile(r'data-name="Icons\s*/\s*([^"]+)"')
SRC_RE = re.compile(r"src=\{(\w+)\}")


def safe_filename(icon_name: str) -> str:
    # Preserve Figma name максимально близко, только убираем запрещенные символы.
    cleaned = icon_name.strip()
    cleaned = re.sub(r'[\\/:*?"<>|]+', "-", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned or "unnamed-icon"


def parse_icon_assets(source_text: str) -> List[Tuple[str, List[str]]]:
    const_map: Dict[str, str] = dict(CONST_RE.findall(source_text))
    icons: List[Tuple[str, List[str]]] = []
    seen = set()

    for _fn_name, body in FUNC_RE.findall(source_text):
        name_match = ICON_NAME_RE.search(body)
        if not name_match:
            continue
        icon_name = name_match.group(1).strip()
        # Keep order from component body.
        var_names = SRC_RE.findall(body)
        urls = [const_map[v] for v in var_names if v in const_map]
        if not urls:
            continue
        # De-duplicate by icon name + url tuple.
        key = (icon_name, tuple(urls))
        if key in seen:
            continue
        seen.add(key)
        icons.append((icon_name, urls))

    return icons


def download_svg(url: str, timeout: float = 30.0) -> bytes:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=timeout) as resp:
        data = resp.read()
    if b"<svg" not in data[:8192]:
        raise ValueError("response is not svg")
    return data


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, help="Path to get_design_context output text file")
    parser.add_argument("--output", required=True, help="Output directory for svg icons")
    parser.add_argument("--workers", type=int, default=16, help="Parallel download workers")
    args = parser.parse_args()

    source_path = Path(args.source).expanduser().resolve()
    output_dir = Path(args.output).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    source_text = source_path.read_text(encoding="utf-8")
    icons = parse_icon_assets(source_text)
    if not icons:
        print("No icons found in source file.")
        return 1

    filename_counts: defaultdict[str, int] = defaultdict(int)
    jobs: List[Tuple[str, str, str, int, int]] = []
    # (icon_name, url, filename, asset_index, asset_total)
    for icon_name, urls in icons:
        base = safe_filename(icon_name)
        for idx, url in enumerate(urls, start=1):
            filename_counts[base] += 1
            suffix = ""
            if len(urls) > 1:
                suffix = f" part {idx}"
            elif filename_counts[base] > 1:
                suffix = f" {filename_counts[base]}"
            filename = f"{base}{suffix}.svg"
            jobs.append((icon_name, url, filename, idx, len(urls)))

    written: List[str] = []
    failed: List[str] = []

    def worker(job: Tuple[str, str, str, int, int]) -> Tuple[bool, str]:
        icon_name, url, filename, asset_idx, asset_total = job
        try:
            data = download_svg(url)
            (output_dir / filename).write_bytes(data)
            detail = f"{icon_name} ({asset_idx}/{asset_total}) -> {filename}"
            return True, detail
        except (URLError, HTTPError, ValueError, TimeoutError, OSError) as exc:
            return False, f"{icon_name} -> {filename}: {exc}"

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        for ok, msg in pool.map(worker, jobs):
            if ok:
                written.append(msg)
            else:
                failed.append(msg)

    manifest = output_dir / "_figma-icons-manifest.txt"
    with manifest.open("w", encoding="utf-8") as f:
        f.write("Written:\n")
        for item in sorted(written):
            f.write(f"- {item}\n")
        f.write("\nFailed:\n")
        for item in sorted(failed):
            f.write(f"- {item}\n")

    print(f"Icons found: {len(icons)}")
    print(f"Files written: {len(written)}")
    print(f"Failed: {len(failed)}")
    print(f"Manifest: {manifest}")
    return 0 if written else 2


if __name__ == "__main__":
    raise SystemExit(main())
