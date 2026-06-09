"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ThemeName } from "@/tokens/nocturne";

const STORAGE_KEY = "jami-theme";

function applyTheme(next: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.toggle("dark", next === "dark");
  root.classList.toggle("light", next === "light");
}

/**
 * Subscribe to the live theme. The no-flash bootstrap in layout.tsx sets
 * `data-theme` on <html> before first paint, so the DOM attribute is the source
 * of truth. useSyncExternalStore reads it without an effect (no setState-in-
 * effect, no hydration mismatch): the server snapshot is the neutral default and
 * the client snapshot reflects the real attribute after hydration.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

function getClientSnapshot(): ThemeName {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): ThemeName {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: ThemeName = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next); // mutating the attribute notifies the store via MutationObserver
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage may be unavailable
    }
  }, []);

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const icon = theme === "dark" ? "☼" : "☾";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
      // The icon glyph reflects live theme; it's decorative (aria-hidden). The
      // server snapshot may differ from the client's persisted choice, so
      // suppress the cosmetic first-paint diff on this one node.
      suppressHydrationWarning
    >
      <span aria-hidden="true" suppressHydrationWarning>
        {icon}
      </span>
    </button>
  );
}
