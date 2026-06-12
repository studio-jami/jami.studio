"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-css";
import type { ThemeName } from "@/tokens/theme";

/**
 * Subscribe to the `<html data-theme>` attribute as the single source of truth.
 * Using `useSyncExternalStore` keeps the toggle in sync with the no-flash init
 * script (which set the attribute before paint) without a setState-in-effect, and
 * yields a stable server snapshot to avoid hydration mismatches.
 */
function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

function getSnapshot(): ThemeName {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): ThemeName {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} theme`;

  function toggle() {
    const next: ThemeName = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; the attribute still drives the theme */
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-icon" aria-hidden="true" suppressHydrationWarning>
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
