"use client";

import { useEffect, useState } from "react";
import type { ThemeName } from "@/tokens/nocturne";

const STORAGE_KEY = "jami-theme";

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(next: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.classList.toggle("dark", next === "dark");
  root.classList.toggle("light", next === "light");
}

export function ThemeToggle() {
  // Lazy initializer gives the correct value on the very first client render.
  // Effect performs only DOM side-effects (no setState calls).
  const [theme, setTheme] = useState<ThemeName>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggle() {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage may be unavailable
    }
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const icon = theme === "dark" ? "☼" : "☾";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
