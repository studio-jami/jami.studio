export function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = window.localStorage.getItem('theme');
        var theme = stored === 'dark' || stored === 'light'
          ? stored
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
