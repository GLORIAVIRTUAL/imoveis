
import Link from 'next/link';
import Image from 'next/image';

// Placeholder data - replace with data fetched from backend
const properties = [
  {
    id: 1,
    title: 'Apartamento Moderno no Centro',
    city: 'Petrolina',
    neighborhood: 'Centro',
    price: 350000,
    type: 'venda',
    image: '/placeholder-imovel.jpg', // Placeholder image
    bedrooms: 3,
    bathrooms: 2,
    area: 90,
  },
  {
    id: 2,
    title: 'Casa Espaçosa com Piscina',
    city: 'Petrolina',
    neighborhood: 'Jardim Maravilha',
    price: 1800,
    type: 'aluguel',
    image: '/placeholder-imovel.jpg',
    bedrooms: 4,
    bathrooms: 3,
    area: 150,
  },
  {
    id: 3,
    title: 'Kitnet Aconchegante Próximo à Universidade',
    city: 'Petrolina',
    neighborhood: 'Universitário',
    price: 800,
    type: 'aluguel',
    image: '/placeholder-imovel.jpg',
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
  },
  {
    id: 4,
    title: 'Cobertura Duplex com Vista Panorâmica',
    city: 'Petrolina',
    neighborhood: 'Orla',
    price: 1200000,
    type: 'venda',
    image: '/placeholder-imovel.jpg',
    bedrooms: 4,
    bathrooms: 5,
    area: 220,
  },
];

// Helper para formatar preço
const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return type === 'aluguel' ? `${formatted}/mês` : formatted;
};

export default function ImoveisPage() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Encontre seu Imóvel</h1>

      {/* Filtros de Busca */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              placeholder="Digite a cidade"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
            <input 
              type="text" 
              id="neighborhood" 
              name="neighborhood" 
              placeholder="Digite o bairro"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
            <select 
              id="type" 
              name="type" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="">Todos</option>
              <option value="venda">Venda</option>
              <option value="aluguel">Aluguel</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="button" 
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Imóveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link key={property.id} href={`/imoveis/${property.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden property-card">
            <div className="relative h-48 w-full">
              <Image 
                src={property.image} 
                alt={property.title} 
                layout="fill" 
                objectFit="cover" 
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate mb-1">{property.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{property.neighborhood}, {property.city}</p>
              <p className="text-lg font-bold text-primary mb-3">{formatPrice(property.price, property.type)}</p>
              <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                <span>{property.bedrooms} quartos</span>
                <span>{property.bathrooms} banheiros</span>
                <span>{property.area} m²</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginação (Placeholder) */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Anterior
          </a>
          <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 border border-primary bg-primary/10 text-sm font-medium text-primary">
            1
          </a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </a>
          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Próximo
          </a>
        </nav>
      </div>
    </div>
  );
}
