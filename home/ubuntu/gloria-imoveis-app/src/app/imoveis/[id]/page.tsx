'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data - replace with data fetched from backend
const property = {
  id: 1,
  title: 'Apartamento Moderno no Centro',
  city: 'Petrolina',
  neighborhood: 'Centro',
  description: 'Lindo apartamento com acabamento de alto padrão, localizado no coração da cidade. Próximo a restaurantes, farmácias, supermercados e com fácil acesso ao transporte público. Condomínio com segurança 24h, academia, piscina e área de lazer completa.',
  price: 350000,
  type: 'venda',
  images: [
    '/placeholder-imovel.jpg',
    '/placeholder-imovel.jpg',
    '/placeholder-imovel.jpg',
    '/placeholder-imovel.jpg',
  ],
  bedrooms: 3,
  bathrooms: 2,
  area: 90,
  features: [
    'Varanda gourmet',
    'Ar condicionado',
    'Armários embutidos',
    'Piso em porcelanato',
    'Vaga de garagem',
    'Elevador',
    'Portaria 24h',
  ],
  owner: {
    name: 'João Silva',
    phone: '(87) 99999-9999',
    email: 'joao@example.com',
  },
  createdAt: '2025-04-15',
};

// Helper para formatar preço
const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return type === 'aluguel' ? `${formatted}/mês` : formatted;
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link href="/imoveis" className="text-primary hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a busca
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da esquerda - Imagens e detalhes */}
        <div className="lg:col-span-2">
          {/* Galeria de imagens */}
          <div className="mb-8">
            <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
              <Image 
                src={property.images[activeImage]} 
                alt={property.title} 
                layout="fill" 
                objectFit="cover" 
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative h-24 cursor-pointer rounded-md overflow-hidden ${index === activeImage ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image 
                    src={image} 
                    alt={`${property.title} - Imagem ${index + 1}`} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do imóvel */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <p className="text-gray-600 mb-4">{property.neighborhood}, {property.city}</p>
            <div className="flex justify-between items-center mb-6">
              <p className="text-2xl font-bold text-primary">{formatPrice(property.price, property.type)}</p>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {property.bedrooms} quartos
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {property.bathrooms} banheiros
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  {property.area} m²
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Descrição</h2>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <h2 className="text-lg font-semibold mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-primary mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Código do imóvel</p>
                  <p className="font-medium">#{property.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Publicado em</p>
                  <p className="font-medium">{new Date(property.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da direita - Ações e contato */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Interessado neste imóvel?</h2>
            <div className="space-y-4">
              <Link 
                href="#" 
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar Visita
              </Link>
              
              <button 
                onClick={() => setShowContact(!showContact)}
                className="w-full flex justify-center items-center py-3 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {showContact ? 'Ocultar Contato' : 'Ver Contato'}
              </button>
              
              {showContact && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">{property.owner.name}</h3>
                  <p className="flex items-center text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {property.owner.phone}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {property.owner.email}
                  </p>
                </div>
              )}
              
              {property.type === 'venda' && (
                <Link 
                  href={`/contratos/gerar/${property.id}`}
                  className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Gerar Contrato de Compra e Venda
                </Link>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Compartilhar</h2>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
