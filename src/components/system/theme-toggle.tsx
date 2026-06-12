"use client";

import { useSyncExternalStore } from "react";
import type { ThemeName } from "@/tokens/theme";
import { defaultTheme } from "@/tokens/theme";

const STORAGE_KEY = "jami-theme";

function getSnapshot(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : defaultTheme;
}

function getServerSnapshot(): ThemeName {
  return defaultTheme;
}

function subscribe(onChange: () => void): () => void {
  // The <html> data-theme attribute is the single source of truth (set by the no-flash
  // script and updated on toggle). Observe it so the control always reflects reality.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

/**
 * Dark/light switch over the CSS-var contract. First paint is set by the inline no-flash
 * script in `layout.tsx`; this control reflects that DOM state via `useSyncExternalStore`
 * (no setState-in-effect) and writes the new value back to the attribute + localStorage.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next: ThemeName = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode) — attribute change still applies this session.
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
        <span className="theme-toggle-icon theme-toggle-icon--sun">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="theme-toggle-icon theme-toggle-icon--moon">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
            <path
              d="M20 14.4A8 8 0 0 1 9.6 4a8 8 0 1 0 10.4 10.4Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
