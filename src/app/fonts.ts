import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Self-hosted variable fonts (Latin subset, swap) wired into the token contract.
 *
 * Plus Jakarta Sans is the Kirimo template's real display + body face; JetBrains Mono
 * carries the dev-credible mono role (eyebrows, section numbers, tags). The CSS variable
 * names below are consumed by `src/tokens/theme.ts` via `--font-jakarta` / `--font-mono`.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta"
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-mono"
});
