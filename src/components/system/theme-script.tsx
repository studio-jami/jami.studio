import { defaultThemeName } from "@/tokens/theme";

const STORAGE_KEY = "jami-theme";

/**
 * Inline, render-blocking script that resolves the theme before first paint so
 * there is no flash. Order of precedence: saved choice → OS preference → the
 * lane default (dark). Sets `data-theme` on <html>; CSS vars for each theme are
 * emitted by ThemeStyle in the document head.
 */
export function ThemeScript() {
  const script = `(function(){try{var d=document.documentElement;var s=localStorage.getItem('${STORAGE_KEY}');var m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var t=s==='light'||s==='dark'?s:m;d.setAttribute('data-theme',t);d.classList.add('js');}catch(e){document.documentElement.setAttribute('data-theme','${defaultThemeName}');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export { STORAGE_KEY as THEME_STORAGE_KEY };
