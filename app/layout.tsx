// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

// ТОВА Е SEO МАГИЯТА:
export const metadata: Metadata = {
  title: "Калкулатор Заплата 2026 (Бруто - Нето) | Актуални осигуровки",
  description: "Изчисли своята нетна и брутна заплата в България за 2026 г. Бърз, точен калкулатор с актуални осигуровки, ДОД и прагове в евро. Моментално пресмятане.",
  keywords: "калкулатор заплата, бруто нето, нетна заплата, осигуровки 2026, данък общ доход, пресмятане на заплата евро, калкулатор възнаграждение",
  
  // OpenGraph (За Facebook, Viber, LinkedIn)
  openGraph: {
    title: "Калкулатор Заплата 2026 (Бруто - Нето)",
    description: "Разбери точно колко пари ще получиш чисто! Актуален калкулатор с новите прагове и осигуровки за 2026 година в евро.",
    url: "https://твоят-домейн.bg", // Смени го, когато купиш домейн
    siteName: "Calc.bg",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://твоят-домейн.bg/og-image.jpg", // Ще създадем тази картинка по-късно
        width: 1200,
        height: 630,
        alt: "Калкулатор Заплата 2026",
      },
    ],
  },
  
  // За Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Калкулатор Заплата 2026",
    description: "Най-бързият калкулатор за нетна заплата в България.",
    images: ["https://твоят-домейн.bg/og-image.jpg"],
  },
  
  // Допълнителни тагове за ботове
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={inter.className}>{children}</body>
    </html>
  );
}