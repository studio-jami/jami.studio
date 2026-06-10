"use client";

const STORAGE_KEY = "jami-theme";

/**
 * Dark/light switch over the shared CSS-variable contract. The active theme
 * lives on `document.documentElement[data-theme]`; both icons are always
 * rendered and CSS shows the relevant one, so hydration stays deterministic.
 */
export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable; the in-page switch still applies.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <svg
        className="theme-icon theme-icon--moon"
        viewBox="0 0 20 20"
        width="16"
        height="16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16.5 12.2a7 7 0 0 1-8.7-8.7 7 7 0 1 0 8.7 8.7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="theme-icon theme-icon--sun"
        viewBox="0 0 20 20"
        width="16"
        height="16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 1.8v2.1M10 16.1v2.1M1.8 10h2.1M16.1 10h2.1M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
