import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FINIQtech",
  description: "Sua organização financeira começa aqui.",
  // Aqui você define o emoji como ícone provisório (ex: cartão de crédito 💳 ou gráfico 📊)
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💳</text></svg>',
  },
};

export const viewport = {
  themeColor: "#6da6d7",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.className} antialiased bg-[#6da6d7]`}
    >
      <body className="min-h-full flex flex-col bg-[#6da6d7] text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}