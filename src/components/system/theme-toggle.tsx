"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";
import type { ThemeName } from "@/tokens/theme";

function subscribe(callback: () => void) {
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

/**
 * Dark/light switch over the CSS-var contract. Reads the live `data-theme` on
 * <html> via useSyncExternalStore (no effect-driven setState), flips it on
 * click, and persists the choice. Every visual change flows through the
 * `[data-theme]` blocks emitted by ThemeStyle — no theme styling lives here.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next: ThemeName = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the in-page switch still works.
    }
  }

  const label = `Switch to ${isDark ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" data-theme-state={isDark ? "dark" : "light"}>
          {isDark ? (
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
              </g>
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}
