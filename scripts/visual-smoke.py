"""Visual smoke harness for the jami.studio marketing site.

Captures every public route at the roadmap's required breakpoints in both
themes, asserts zero console/page/request errors, zero horizontal overflow,
and verifies the machine-readable text surfaces.

Prerequisites:
  - A running production build:  pnpm build && pnpm exec next start -p 4710
  - Python Playwright with Chromium installed (pip install playwright;
    playwright install chromium)

Usage:
  python scripts/visual-smoke.py [--base http://localhost:4710] [--out tmp/shots]

Screenshots land in the gitignored output directory as
{route}-{theme}-{width}.png. Exits non-zero if any check fails.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROUTES = [
    ("/", "home"),
    ("/projects", "projects"),
    ("/projects/harness", "harness"),
    ("/projects/registry", "registry"),
    ("/projects/orchestra", "orchestra"),
    ("/projects/intercal", "intercal"),
    ("/projects/collectiva", "collectiva"),
]

THEMES = ["dark", "light"]

VIEWPORTS = [(1440, 900), (1024, 820), (768, 900), (390, 844)]

TEXT_SURFACES = {
    "/robots.txt": "Sitemap:",
    "/sitemap.xml": "<urlset",
    "/llms.txt": "jami.studio",
    "/llms-full.txt": "jami.studio",
}

OVERFLOW_PROBE = """
() => {
  const doc = document.documentElement;
  const overflow = doc.scrollWidth - doc.clientWidth;
  const offenders = [];
  if (overflow > 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) {
        offenders.push(
          el.tagName.toLowerCase() +
            (el.className && typeof el.className === 'string'
              ? '.' + el.className.split(' ').join('.')
              : '')
        );
        if (offenders.length >= 8) break;
      }
    }
  }
  return { overflow, offenders };
}
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="http://localhost:4710")
    parser.add_argument("--out", default="tmp/shots")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    failures: list[str] = []
    captures = 0

    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Machine-readable surfaces first.
        probe = browser.new_context()
        page = probe.new_page()
        for path, marker in TEXT_SURFACES.items():
            response = page.goto(args.base + path, wait_until="domcontentloaded")
            status = response.status if response else 0
            body = response.text() if response else ""
            if status != 200 or marker not in body:
                failures.append(f"{path}: status={status}, marker {marker!r} missing")
            else:
                print(f"ok   {path} (200, {len(body)} bytes)")
        probe.close()

        for width, height in VIEWPORTS:
            context = browser.new_context(viewport={"width": width, "height": height})
            for route, name in ROUTES:
                for theme in THEMES:
                    page = context.new_page()
                    errors: list[str] = []
                    page.on(
                        "console",
                        lambda msg, errs=errors: errs.append(f"console: {msg.text}")
                        if msg.type in ("error",)
                        else None,
                    )
                    page.on("pageerror", lambda exc, errs=errors: errs.append(f"pageerror: {exc}"))
                    page.on(
                        "requestfailed",
                        lambda req, errs=errors: errs.append(
                            f"requestfailed: {req.url} ({req.failure})"
                        ),
                    )

                    url = f"{args.base}{route}?theme={theme}"
                    page.goto(url, wait_until="networkidle")

                    # Walk the page so once-only reveals fire, then return to top.
                    page.evaluate(
                        """async () => {
                          const step = window.innerHeight * 0.7;
                          for (let y = 0; y <= document.body.scrollHeight; y += step) {
                            window.scrollTo(0, y);
                            await new Promise((r) => setTimeout(r, 60));
                          }
                          window.scrollTo(0, 0);
                          await new Promise((r) => setTimeout(r, 250));
                        }"""
                    )
                    page.wait_for_timeout(450)

                    result = page.evaluate(OVERFLOW_PROBE)
                    shot = out_dir / f"{name}-{theme}-{width}.png"
                    page.screenshot(path=str(shot), full_page=True)
                    captures += 1

                    label = f"{name} {theme} {width}"
                    if result["overflow"] > 1:
                        failures.append(
                            f"{label}: horizontal overflow {result['overflow']}px "
                            f"offenders={result['offenders']}"
                        )
                    if errors:
                        failures.append(f"{label}: " + " | ".join(errors[:6]))
                    if result["overflow"] <= 1 and not errors:
                        print(f"ok   {label}")
                    page.close()
            context.close()
        browser.close()

    print(f"\n{captures} captures -> {out_dir}")
    if failures:
        print(f"\nFAILURES ({len(failures)}):")
        for failure in failures:
            print(f"  - {failure}")
        return 1
    print("visual smoke: all green")
    return 0


if __name__ == "__main__":
    sys.exit(main())
