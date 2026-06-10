/**
 * Inline, render-blocking theme resolver. Runs before first paint to set
 * `data-theme` on <html> from localStorage (or the system preference), so the
 * site never flashes the wrong theme. Kept tiny and dependency-free.
 */
const STORAGE_KEY = "jami-theme";

const script = `(() => {
  var el = document.documentElement;
  try {
    var k = "${STORAGE_KEY}";
    var stored = localStorage.getItem(k);
    var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "light" || stored === "dark" ? stored : (sysDark ? "dark" : "light");
    el.setAttribute("data-theme", theme);
    el.style.colorScheme = theme;
  } catch (e) {
    el.setAttribute("data-theme", "dark");
  }
  // Arm scroll-reveal only when JS is present, so no-JS readers keep content.
  el.classList.add("js-ready");
})();`;

export const THEME_STORAGE_KEY = STORAGE_KEY;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}
