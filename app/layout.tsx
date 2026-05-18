import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VibeKanbanWrapper from "./VibeKanbanWrapper";
import { I18nProvider } from "@/lib/i18n";
import { ThemeSync } from "@/components/theme-sync";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffbeb" },
    { media: "(prefers-color-scheme: dark)", color: "#2a1f05" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Shuttle",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description: "Format, validate, fix and escape JSON — fast, safe, privacy-first.",
  url: "https://json.shuttlelab.org",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://json.shuttlelab.org"),
  title: "JSON Shuttle - JSON 格式化与校验工具",
  description: "JSON 格式化、校验、修补与转义，快速、安全、隐私优先 | Format, validate, fix and escape JSON — fast, safe, privacy-first.",
  alternates: {
    canonical: "/",
  },
  // verification: {
  //   google: "<paste-google-search-console-verification-code-here>",
  // },
  openGraph: {
    title: "JSON Shuttle",
    description: "JSON 格式化、校验、修补与转义 | Format, validate, fix and escape JSON",
    siteName: "JSON Shuttle",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Shuttle",
    description: "JSON 格式化、校验、修补与转义 | Format, validate, fix and escape JSON",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <ThemeSync />
        <VibeKanbanWrapper />
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
