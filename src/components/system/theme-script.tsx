/**
 * Inline, render-blocking theme initializer. Runs before first paint so the correct
 * `data-theme` is set on <html> with no flash of the wrong theme. Reads a stored
 * preference, else falls back to the OS `prefers-color-scheme`.
 */
const SCRIPT = `(function(){try{var d=document.documentElement;var k="nouva-theme";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(m?"dark":"light");d.setAttribute("data-theme",t);d.style.colorScheme=t;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("js-reveal-ready");}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}

export const THEME_STORAGE_KEY = "nouva-theme";
