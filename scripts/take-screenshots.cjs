const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

const routes = ['/', '/projects', '/projects/registry', '/projects/harness'];
const viewports = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

const evidenceDir = path.join(__dirname, '..', 'docs', 'design', 'evidence', 'gemini');
fs.mkdirSync(evidenceDir, { recursive: true });

async function takeScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  
  for (const theme of ['dark', 'light']) {
    for (const route of routes) {
      for (const viewport of viewports) {
        const context = await browser.newContext({
          viewport,
          colorScheme: theme
        });
        const page = await context.newPage();
        
        console.log(`Taking screenshot for ${route} at ${viewport.width}x${viewport.height} in ${theme} mode`);
        await page.goto(`${URL}${route}`);
        
        // Wait for fonts and animations
        await page.waitForLoadState('networkidle');
        
        const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').slice(1);
        const filename = `${routeName}-${viewport.width}-${theme}.png`;
        
        await page.screenshot({ path: path.join(evidenceDir, filename), fullPage: true });
        await context.close();
      }
    }
  }

  await browser.close();
  console.log('Screenshots saved.');
  process.exit(0);
}

takeScreenshots().catch(console.error);
