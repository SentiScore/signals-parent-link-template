import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const sans = Inter({ variable: "--font-sans-var", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif-var", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono-var", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "Research detail · Greenwich Research News Data", template: "%s · Greenwich Research News Data" },
  // Hidden professional pages: never indexed (plan §3.5).
  robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true, noimageindex: true },
  // Never leak these hidden URLs to other sites via the Referer header.
  referrer: "same-origin",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            {/* send_page_view off: we send explicit parent_open / child_open / crossover_home events instead. */}
            <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false,allow_google_signals:false,page_location:location.origin+location.pathname});`}</Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
