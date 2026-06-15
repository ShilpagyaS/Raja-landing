import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raja Gems Testing Lab — Certified Gemstone Authentication | Jabalpur",
  description:
    "India's trusted gemstone certification lab. Every gem tested, graded and verified by expert gemmologists. Scan QR to verify authenticity instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
