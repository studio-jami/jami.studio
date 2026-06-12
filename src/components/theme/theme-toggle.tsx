"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ThemeName } from "@/tokens/theme";

const STORAGE_KEY = "jami-theme";

function readTheme(): ThemeName {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  // Track the live data-theme attribute (set pre-paint by ThemeScript, and by
  // this toggle). Server snapshot is "light" so first paint is stable.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as ThemeName);

  const toggle = useCallback(() => {
    const next: ThemeName = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; theme still applies for the session */
    }
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
