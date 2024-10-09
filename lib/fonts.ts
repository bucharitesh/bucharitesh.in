import { JetBrains_Mono as FontMono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

export const fontSans = GeistSans;

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const hubot = localFont({
  src: "../public/assets/HubotSans.woff2",
  variable: "--font-hubot",
  weight: "400 900",
})