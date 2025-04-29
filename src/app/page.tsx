'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState('');
  
  // Cidades de exemplo - no futuro, serão carregadas do backend
  const cities = [
    { id: 1, name: 'São Paulo', state: 'SP' },
    { id: 2, name: 'Rio de Janeiro', state: 'RJ' },
    { id: 3, name: 'Belo Horizonte', state: 'MG' },
    { id: 4, name: 'Salvador', state: 'BA' },
    { id: 5, name: 'Petrolina', state: 'PE' },
  ];

  // Simula a detecção de localização
  useEffect(() => {
    // Em uma implementação real, usaríamos a API de Geolocalização
    // e um serviço de geocoding para determinar a cidade do usuário
    const detectLocation = () => {
      // Por enquanto, apenas definimos uma cidade padrão
      setSelectedCity('Petrolina');
    };
    
    detectLocation();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section com Vídeo */}
      <section className="relative bg-gray-100 rounded-lg overflow-hidden mb-12">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Encontre o imóvel dos seus sonhos
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                A Glória Imóveis conecta você ao seu próximo lar ou investimento com tecnologia e praticidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/imoveis" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors text-center">
                  Buscar Imóveis
                </Link>
                <Link href="/cadastrar-imovel" className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors text-center">
                  Anunciar Imóvel
                </Link>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 aspect-video flex items-center justify-center">
              {/* Placeholder para o vídeo tutorial */}
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-gray-500">Vídeo tutorial</p>
                <p className="text-sm text-gray-400">(Configurável pelo administrador)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seletor de Cidade */}
      <section className="mb-12">
        <div className="city-selector">
          <label htmlFor="city-select" className="block text-gray-700 mb-2 text-center">
            Selecione sua cidade
          </label>
          <select 
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Todas as cidades</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name} - {city.state}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nossos Serviços</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Serviço 1 */}
          <Link href="/servicos/avaliacao-imoveis" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Avaliação de Imóveis</h3>
            <p className="text-gray-600 text-sm">Descubra o valor justo do seu imóvel com nossa avaliação profissional.</p>
          </Link>

          {/* Serviço 2 */}
          <Link href="/servicos/consulta-cpf" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Consulta de CPF</h3>
            <p className="text-gray-600 text-sm">Verifique a situação cadastral antes de fechar negócio.</p>
          </Link>

          {/* Serviço 3 */}
          <Link href="/servicos/analise-contratos" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Análise de Contratos</h3>
            <p className="text-gray-600 text-sm">Tenha seu contrato analisado por especialistas antes de assinar.</p>
          </Link>

          {/* Serviço 4 */}
          <Link href="/prestadores" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Prestadores de Serviços</h3>
            <p className="text-gray-600 text-sm">Encontre profissionais qualificados para manutenção e reforma.</p>
          </Link>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="bg-primary/10 rounded-lg p-8 text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tem um imóvel para vender ou alugar?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Anuncie seu imóvel na Glória Imóveis e alcance milhares de potenciais compradores e inquilinos.
        </p>
        <Link href="/cadastrar-imovel" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors inline-block">
          Anunciar Agora
        </Link>
      </section>

      {/* Botão "Fale Aqui" */}
      <section className="text-center mb-12">
        <Link href="#" className="px-8 py-4 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Fale Aqui!
        </Link>
      </section>
    </div>
  );
}
