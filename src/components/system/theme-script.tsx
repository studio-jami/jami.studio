/**
 * Inline, render-blocking theme initializer. Runs before first paint so the correct
 * `data-theme` is set on <html> with no flash of the wrong theme. A stored preference
 * always wins; otherwise the lane defaults to its primary DARK character. Also flags the
 * document ready so the blur-up enhancement can apply (skipped under reduced motion).
 */
const SCRIPT = `(function(){try{var d=document.documentElement;var k="nouva-theme";var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:"dark";d.setAttribute("data-theme",t);d.style.colorScheme=t;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("js-reveal-ready");}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}

export const THEME_STORAGE_KEY = "nouva-theme";
