import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton'; // Importa o botão flutuante
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <WhatsAppButton /> {/* Adiciona o botão flutuante aqui */}
      <Footer />
    </div>
  );
}
