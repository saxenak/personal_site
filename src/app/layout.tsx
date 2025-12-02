import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";

const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  variable: "--font-afacad-flux",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Creative Production Agency",
  description: "A creative production agency crafting unique experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${afacadFlux.variable} font-sans font-light antialiased text-crisp`}
        style={{ fontFamily: 'var(--font-afacad-flux)' }}
      >
        {children}
      </body>
    </html>
  );
}
