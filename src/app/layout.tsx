import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-sans-var", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif-var", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono-var", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "Research detail · Stock Dashboard", template: "%s · Stock Dashboard" },
  // Hidden professional pages: never indexed (plan §3.5).
  robots: { index: false, follow: false, nocache: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
