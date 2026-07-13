import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { PwaProvider } from "../components/pwa-provider";
import { YandexMetrica } from "../components/analytics/yandex-metrica";

export const metadata: Metadata = {
  title: "Dopamine Menu",
  description:
    "Short pause actions for moments when you want to slip into a quick dopamine loop.",
  manifest: "/manifest.webmanifest",
  applicationName: "Dopamine Menu",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dopamine Menu"
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f9f1ec"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        <PwaProvider />
        <YandexMetrica counterId={process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? ""} />
        {children}
      </body>
    </html>
  );
}
