import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ventality — Where the forest meets the formula",
  description:
    "Premium forest-born supplements. Pure, traceable, Supliful-verified formulas — bottled under your forest brand.",
  keywords: ["supplements", "wellness", "natural", "adaptogens", "mushroom", "collagen"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${cinzel.variable}`}
    >
      <body className="min-h-screen bg-forest-900 text-cream font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
