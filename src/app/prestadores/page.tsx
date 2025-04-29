
import Link from 'next/link';
import Image from 'next/image';

// Placeholder data - replace with data fetched from backend
const serviceProviders = [
  {
    id: 1,
    name: 'Carlos Alberto - Pintor',
    profession: 'Pintor',
    phone: '(87) 98888-1111',
    email: 'carlos.pintor@example.com',
    city: 'Petrolina',
    rating: 4.8,
    reviews: 15,
  },
  {
    id: 2,
    name: 'Fernanda Lima - Eletricista',
    profession: 'Eletricista',
    phone: '(87) 97777-2222',
    email: 'fernanda.eletro@example.com',
    city: 'Petrolina',
    rating: 4.9,
    reviews: 22,
  },
  {
    id: 3,
    name: 'Roberto Souza - Pedreiro',
    profession: 'Pedreiro',
    phone: '(87) 96666-3333',
    email: 'roberto.obra@example.com',
    city: 'Petrolina',
    rating: 4.5,
    reviews: 10,
  },
  {
    id: 4,
    name: 'Ana Paula - Encanadora',
    profession: 'Encanador',
    phone: '(87) 95555-4444',
    email: 'ana.hidro@example.com',
    city: 'Petrolina',
    rating: 4.7,
    reviews: 18,
  },
];

export default function PrestadoresPage() {
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Prestadores de Serviços</h1>
        <Link 
          href="/prestadores/cadastro"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          Cadastre-se como Prestador
        </Link>
      </div>

      {/* Filtros de Busca (Opcional) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profissão</label>
            <input 
              type="text" 
              id="profession" 
              name="profession" 
              placeholder="Ex: Pintor, Eletricista..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
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

      {/* Lista de Prestadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{provider.name}</h2>
            <p className="text-sm text-primary font-medium mb-2">{provider.profession}</p>
            <p className="text-sm text-gray-500 mb-3">{provider.city}</p>
            
            {/* Avaliação (Placeholder) */}
            <div className="flex items-center mb-3">
              <span className="text-yellow-500">{'★'.repeat(Math.floor(provider.rating))}{'☆'.repeat(5 - Math.floor(provider.rating))}</span>
              <span className="ml-2 text-sm text-gray-600">({provider.reviews} avaliações)</span>
            </div>

            <div className="border-t pt-3 space-y-2">
              <p className="flex items-center text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {provider.phone}
              </p>
              <p className="flex items-center text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {provider.email}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação (Placeholder) */}
      <div className="mt-8 flex justify-center">
        {/* ... (código de paginação similar ao da página de imóveis) ... */}
      </div>
    </div>
  );
}
