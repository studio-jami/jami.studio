// Generate app icons (favicon / app icon / apple touch icon) from the official
// jami.studio illustrated portrait. We crop to the face/hair region of the
// canonical logo (never invent a different mark) and present it as a rounded
// avatar so the solid-background source sits well as an icon at small sizes.
//
// Run: node scripts/generate-icons.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// sharp ships as a transitive dep; resolve it from the pnpm store explicitly so
// this works even when the top-level install skipped its build script.
const sharp = require(resolve(root, "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));
const SRC = resolve(root, "public/brand/logo-cream.jpg"); // warmest, cleanest portrait

// Source is 1408x1408. The portrait head+shoulders sits roughly centered.
// Crop a square framing the face/hair, excluding the wordmark at the bottom.
const SIZE = 1408;
const cropLeft = Math.round(SIZE * 0.235);
const cropTop = Math.round(SIZE * 0.105);
const cropSide = Math.round(SIZE * 0.53);

function roundedMask(size) {
  const r = Math.round(size * 0.22); // rounded-square, matches UI radius language
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`
  );
}

function circleMask(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${r}" cy="${r}" r="${r}"/></svg>`
  );
}

async function makeIcon(outPath, size, shape) {
  const cropped = await sharp(SRC)
    .extract({ left: cropLeft, top: cropTop, width: cropSide, height: cropSide })
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();

  const mask = shape === "circle" ? circleMask(size) : roundedMask(size);
  await sharp(cropped)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(outPath);
  console.log("wrote", outPath);
}

await makeIcon(resolve(root, "src/app/icon.png"), 512, "rounded");
await makeIcon(resolve(root, "src/app/apple-icon.png"), 180, "rounded");
console.log("done");
