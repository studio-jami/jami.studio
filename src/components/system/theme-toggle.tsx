"use client";

import { useSyncExternalStore } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "dark" | "light";

/**
 * The theme lives in an external system — the `data-theme` attribute on <html>,
 * set before paint by the no-flash init script. We read it with
 * useSyncExternalStore (the rule-compliant way to subscribe to external state)
 * so the toggle stays in sync without synchronous setState-in-effect.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("noir-theme", next);
    } catch {
      /* storage unavailable — in-session toggle still works */
    }
  }

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
      data-active-theme={theme}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      <span className={styles.glyph} aria-hidden="true">
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
