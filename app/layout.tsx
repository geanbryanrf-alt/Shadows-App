import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  themeColor: "#080a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // Suporte a notch, ilha dinâmica e barra de gestos
};

export const metadata: Metadata = {
  title: "SHADOWS - Discipline is Freedom",
  description: "Substitua maus hábitos por bons. Torne-se o homem que você pode ser através do SHADOWS.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://appfortaleza.vercel.app"), // Altere para seu domínio real se necessário
  openGraph: {
    title: "SHADOWS - Discipline is Freedom",
    description: "Prepare-se para o combate. Substitua maus hábitos por bons.",
    url: "https://appfortaleza.vercel.app",
    siteName: "SHADOWS",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHADOWS - Discipline is Freedom",
    description: "Substitua maus hábitos por bons. Torne-se o homem que você pode ser.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SHADOWS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-dvh flex flex-col selection:bg-cyan selection:text-base">
        {children}
      </body>
    </html>
  );
}
