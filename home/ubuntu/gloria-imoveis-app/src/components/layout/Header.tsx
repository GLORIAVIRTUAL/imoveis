'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logo-container">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Glória Imóveis" 
              width={120} 
              height={60} 
              className="object-contain"
            />
          </Link>
        </div>

        {/* Menu para desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary">
            Início
          </Link>
          <Link href="/imoveis" className="text-gray-700 hover:text-primary">
            Imóveis
          </Link>
          <Link href="/cadastrar-imovel" className="text-gray-700 hover:text-primary">
            Cadastrar Imóvel
          </Link>
          <Link href="/servicos" className="text-gray-700 hover:text-primary">
            Serviços
          </Link>
          <Link href="/prestadores" className="text-gray-700 hover:text-primary">
            Prestadores
          </Link>
        </nav>

        {/* Botões de ação */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
            Entrar
          </Link>
          <Link href="/cadastro" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
            Cadastrar
          </Link>
        </div>

        {/* Botão de menu mobile */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Início
            </Link>
            <Link href="/imoveis" className="text-gray-700 hover:text-primary">
              Imóveis
            </Link>
            <Link href="/cadastrar-imovel" className="text-gray-700 hover:text-primary">
              Cadastrar Imóvel
            </Link>
            <Link href="/servicos" className="text-gray-700 hover:text-primary">
              Serviços
            </Link>
            <Link href="/prestadores" className="text-gray-700 hover:text-primary">
              Prestadores
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link href="/login" className="px-4 py-2 text-center text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Entrar
              </Link>
              <Link href="/cadastro" className="px-4 py-2 text-center bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
                Cadastrar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
