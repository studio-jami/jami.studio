export function ThemeScript() {
  const code = `
    (function() {
      try {
        var localTheme = window.localStorage.getItem('theme');
        var theme = localTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
