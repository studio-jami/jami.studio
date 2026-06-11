// Extract the REAL structure of each Framer template project, headless, via the
// Server API. The full design system is reachable with the per-project key — no
// publish, no screenshots, no editor, no babysitting. Three complementary reads:
//
//   1. getColorStyles / getTextStyles — the template's actual color + type token
//      systems (named tokens, fonts, per-breakpoint type sizes).
//   2. getNodesWithType("WebPageNode"|"FrameNode"|"TextNode"|"SVGNode"|
//      "ComponentNode"|"ComponentInstanceNode") — every node of each type as a
//      rich FLAT array (full geometry, background/border/radius, layout, links,
//      inline text styling). Flat = no parent/child links; use the trees for that.
//   3. framer.agent.getNode({ id: pageId }, { pagePath }) — the HIERARCHICAL
//      tree of a whole page in one call: nested children, named sections,
//      htmlTag, stack/grid layout, gap, padding, per-breakpoint frames. This is
//      the real section structure and vertical rhythm. framer.agent.getContext()
//      adds the project's own summary (fonts, components, tokens, style presets).
//
// getNode alone is shallow; the three reads above are not.
//
// Writes:
//   out/<lane>.json       compact design brief (tokens, type, fonts, pages,
//                         components, counts, agent context) — read top to bottom.
//   out/<lane>.full.json  pageTrees (hierarchical structure per page — start
//                         here for layout/rhythm) + the complete flat node
//                         arrays (frames/texts/svgs/instances) for exact values.
//
// Usage:
//   node inspect.mjs            # all configured projects
//   node inspect.mjs nouva      # one lane (lane or template substring)
//
// Read-only: never publishes, deploys, or edits.

import { mkdirSync, writeFileSync } from "node:fs";
import { connect } from "framer-api";
import { PROJECTS } from "./projects.config.mjs";
// Credentials come from the repo-root .env, parsed in projects.config.mjs.

mkdirSync(new URL("./out/", import.meta.url), { recursive: true });
const filter = (process.argv[2] || "").toLowerCase();
let anyConnected = false;

async function safe(label, fn, fallback) {
  try { return await fn(); }
  catch (e) { console.log(`    (${label}: ${String(e?.message || e).slice(0, 70)})`); return fallback; }
}

// Pull the font families a template actually uses out of its styles + text nodes,
// instead of dumping getFonts() (the entire ~9k Google Fonts catalog).
function collectFonts(textStyles, texts) {
  const fams = new Set();
  const add = (f) => { if (f?.family) fams.add(`${f.family}${f.weight ? " " + f.weight : ""}`); };
  for (const s of textStyles || []) { add(s.font); add(s.boldFont); }
  for (const t of texts || []) add(t.inlineTextStyle?.font);
  return [...fams].sort();
}

for (const p of PROJECTS) {
  if (filter && ![p.lane, p.template].some((v) => v.toLowerCase().includes(filter))) continue;
  if (!p.url || !p.apiKey) {
    console.log(`SKIP ${p.lane} (${p.template}) — missing ${!p.url ? "PROJECT_URL" : "API_KEY"} in .env`);
    continue;
  }
  console.log(`\n=== ${p.lane} <- ${p.template} ===`);
  let framer;
  try {
    framer = await connect(p.url, p.apiKey);
    anyConnected = true;

    const info = await safe("getProjectInfo", () => framer.getProjectInfo(), {});
    const webpages = await safe("WebPageNode", () => framer.getNodesWithType("WebPageNode"), []);
    const components = await safe("ComponentNode", () => framer.getNodesWithType("ComponentNode"), []);
    const frames = await safe("FrameNode", () => framer.getNodesWithType("FrameNode"), []);
    const texts = await safe("TextNode", () => framer.getNodesWithType("TextNode"), []);
    const svgs = await safe("SVGNode", () => framer.getNodesWithType("SVGNode"), []);
    const instances = await safe(
      "ComponentInstanceNode",
      () => framer.getNodesWithType("ComponentInstanceNode"),
      []
    );
    const colorStyles = await safe("getColorStyles", () => framer.getColorStyles(), []);
    const textStyles = await safe("getTextStyles", () => framer.getTextStyles(), []);
    const collections = await safe("getCollections", () => framer.getCollections(), []);
    const customCode = await safe("getCustomCode", () => framer.getCustomCode(), null);
    // Project-summary string from the agent namespace: fonts, components,
    // tokens, style presets, site map. Verified working over the Server API.
    const agentContext = await safe("agent.getContext", () => framer.agent.getContext(), null);
    // Hierarchical tree per page — the structure/rhythm the flat arrays lack.
    const pageTrees = [];
    for (const w of webpages) {
      const tree = await safe(
        `agent.getNode ${w.path}`,
        () => framer.agent.getNode({ id: w.id }, { pagePath: w.path }),
        null
      );
      if (tree) pageTrees.push({ path: w.path, id: w.id, tree });
    }

    const brief = {
      lane: p.lane,
      template: p.template,
      projectId: info.id || null,
      projectName: info.name || null,
      pages: (webpages || []).map((w) => ({ path: w.path, id: w.id })),
      counts: {
        webpages: webpages.length, components: components.length,
        frames: frames.length, texts: texts.length, svgs: svgs.length,
        instances: instances.length, pageTrees: pageTrees.length,
        colorStyles: colorStyles.length, textStyles: textStyles.length,
      },
      colorStyles,                                   // the real color token system
      textStyles,                                    // the real type system
      fonts: collectFonts(textStyles, texts),        // used families only
      components: (components || []).map((c) => ({ id: c.id, name: c.name })),
      collections,
      customCode,
      agentContext,                                  // project self-summary (string)
    };
    writeFileSync(new URL(`./out/${p.lane}.json`, import.meta.url), JSON.stringify(brief, null, 2));

    const full = {
      lane: p.lane,
      template: p.template,
      // Hierarchical structure per page (nested children, sections, layout,
      // gap/padding, breakpoints) — start here for rhythm and composition.
      pageTrees,
      // Flat typed arrays — exact per-node geometry/style values.
      nodes: { webpages, components, frames, texts, svgs, instances },
    };
    writeFileSync(new URL(`./out/${p.lane}.full.json`, import.meta.url), JSON.stringify(full, null, 2));

    console.log(
      `  ok -> out/${p.lane}.json + .full.json  ` +
      `(${brief.counts.webpages} pages, ${pageTrees.length} page trees, ${brief.counts.frames} frames, ` +
      `${brief.counts.texts} texts, ${instances.length} instances, ${brief.counts.components} components, ` +
      `${colorStyles.length} colors, ${textStyles.length} text styles, ${brief.fonts.length} fonts)`
    );
  } catch (e) {
    console.error(`  FAILED to connect/read: ${e?.message || e}`);
  } finally {
    try { await framer?.disconnect?.(); } catch {}
  }
}

if (!anyConnected) {
  console.log("\nNothing connected. Check the '## Framer Project Keys' block in the repo-root .env.");
  process.exitCode = 1;
}
