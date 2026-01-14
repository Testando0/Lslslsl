import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Certifique-se que o caminho está correto

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crisálida AI",
  description: "Sua assistente AI com modos e geração de imagens Bunix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-950 text-white`}>{children}</body>
    </html>
  );
}
