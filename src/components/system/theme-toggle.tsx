"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "jami-theme";

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Server render (and first client render before hydration) assume the default theme. The
// no-flash init script in layout.tsx has already set the real attribute on <html>, and the
// MutationObserver store re-syncs once mounted — so the toggle never desyncs from the DOM.
function getServerSnapshot(): Theme {
  return "dark";
}

/**
 * Dark/light switch over the CSS-var contract. Reads the live `[data-theme]` attribute via
 * an external store (no setState-in-effect), flips it on click, and persists the choice.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage may be unavailable (private mode); the attribute swap still works.
    }
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" data-theme-state={theme} />
      </span>
      <span className="theme-toggle-label">{theme}</span>
    </button>
  );
}
