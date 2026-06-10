import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * ASH & IRIS type stack — self-hosted at build time through next/font.
 *
 * - Fraunces (variable, optical sizing): the display voice. Literary, sharp at
 *   large sizes, with a true italic used as the branch signature.
 * - Hanken Grotesk (variable): the body voice. Quiet, humanist, highly legible.
 * - JetBrains Mono (variable): the machine voice. Eyebrows, index numbers,
 *   hosts, and tags.
 *
 * The token presets consume these through the var() indirection in
 * `src/tokens/fable.ts`, so the schema contract stays font-agnostic.
 */

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap"
});

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap"
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap"
});

export const fontClassNames = `${fraunces.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`;
