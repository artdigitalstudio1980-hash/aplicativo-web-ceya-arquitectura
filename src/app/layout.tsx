import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ceyaarquitectura.com"),
  title: {
    default: "CEYA Arquitectura",
    template: "%s | CEYA Arquitectura",
  },
  description:
    "Construcciones Especializadas y Arquitectura: diseño arquitectónico, construcción de alta precisión, impermeabilización, mantenimiento y proyectos premium.",
  applicationName: "CEYA Arquitectura",
  authors: [{ name: "CEYA Arquitectura" }],
  creator: "CEYA Arquitectura",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0B0C0E] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
