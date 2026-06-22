import { Fraunces, JetBrains_Mono, Newsreader } from "next/font/google";

// Display serif com caráter editorial (optical sizing alto contraste).
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap"
});

// Corpo serifado para textos longos em coluna.
export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap"
});

// Mono para kickers/labels — eco do "tudo diagramado em JS".
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const fontVariables = `${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable}`;
