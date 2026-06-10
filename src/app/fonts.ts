import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

/**
 * Next-optimized variable webfonts, subset to Latin with `display: swap`. No
 * weight pins — the full variable axis loads so the design can use fine-grained
 * weights (e.g. 540/560 display) through CSS. Each exposes a CSS variable
 * consumed by the token font stacks: Inter Tight = display personality, Inter =
 * body legibility, JetBrains Mono = dev-credible labels and section numbers.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight"
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains"
});

export const fontClassName = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
