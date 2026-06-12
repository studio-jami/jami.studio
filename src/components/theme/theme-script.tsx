/**
 * Inline, render-blocking theme initializer. Runs before paint to set
 * `data-theme` from a stored preference or the OS setting, so there is no
 * theme flash on first load. Synk is dark-primary: unknown/OS-dark → dark,
 * explicit OS light preference → light. Kept dependency-free and tiny.
 */
const script = `(function(){try{var k='jami-theme';var s=localStorage.getItem(k);var l=window.matchMedia('(prefers-color-scheme: light)').matches;var t=s==='dark'||s==='light'?s:(l?'light':'dark');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
