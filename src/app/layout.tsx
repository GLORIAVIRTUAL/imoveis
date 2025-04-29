import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout"; // Importa o componente Layout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glória Imóveis - Seu imóvel está aqui",
  description: "Plataforma completa para compra, venda e aluguel de imóveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Layout>{children}</Layout> {/* Aplica o Layout aqui */}
      </body>
    </html>
  );
}
