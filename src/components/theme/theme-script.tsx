/**
 * Inline, render-blocking theme initializer. Runs before paint to set
 * `data-theme` from a stored preference or the OS setting, so there is no
 * light/dark flash on first load. Kept dependency-free and tiny.
 */
const script = `(function(){try{var k='jami-theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='dark'||s==='light'?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
