/**
 * No-flash theme init. Runs before paint (inline, in <head>) so the first frame
 * already matches the resolved theme. Default character is dark (lane A); a stored
 * choice wins, otherwise the system preference decides. Also strips `.no-js` so
 * reveal animations can engage only when JS is available.
 */
const themeInitScript = `(function(){try{
var d=document.documentElement;
d.classList.remove('no-js');
var stored=null;try{stored=localStorage.getItem('noir-theme');}catch(e){}
var theme=stored;
if(theme!=='dark'&&theme!=='light'){
  theme=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
}
d.setAttribute('data-theme',theme);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
