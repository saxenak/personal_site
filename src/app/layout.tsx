import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const afacadFlux = Afacad_Flux({
  subsets: ["latin"],
  variable: "--font-afacad-flux",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kirti Saxena",
  description: "Creative portfolio and projects by Kirti Saxena",
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
