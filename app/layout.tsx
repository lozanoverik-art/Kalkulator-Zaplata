import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ако ползваш друг шрифт, остави твоя
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Калкулатор Заплата 2026 | Изчисляване на Бруто и Нето",
  description:
    "Най-точният и модерен калкулатор за заплати в България. Изчисли мигновено своята нетна и брутна заплата, осигуровки и данъци по нормативи на НАП и НОИ.",
  keywords:
    "калкулатор заплата, брутна заплата, нетна заплата, осигуровки, данъци, калкулатор бруто нето, заплата 2026, brutoneto",
  authors: [{ name: "BrutoNeto" }],
  alternates: {
    canonical: "https://kalkulatorzaplata.com",
  },
  robots: "index, follow",
  openGraph: {
    title: "Калкулатор Заплата 2026 | Бруто в Нето",
    description:
      "Изчисли мигновено своята нетна и брутна заплата с най-прецизния калкулатор в България.",
    url: "https://brutoneto.com", // Увери се, че това е точният ти домейн
    siteName: "BrutoNeto",
    locale: "bg_BG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Много е важно lang да е "bg", за да знае Google, че сайтът е на български!
    <html lang="bg">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
