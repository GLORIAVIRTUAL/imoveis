
import Link from 'next/link';

export default function AvaliacaoImoveisPage() {
  return (
    <div className="form-container fade-in">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Avaliação de Imóveis</h1>
      <p className="text-center text-gray-600 mb-8">Preencha as características do imóvel para receber uma avaliação profissional por email.</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          {/* Campos para características do imóvel */}
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
            <select 
              id="propertyType" 
              name="propertyType" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="">Selecione...</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
              <option value="chacara">Chácara</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área (m²)</label>
            <input 
              type="number" 
              id="area" 
              name="area" 
              min="0"
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Número de Quartos</label>
            <input 
              type="number" 
              id="bedrooms" 
              name="bedrooms" 
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Número de Banheiros</label>
            <input 
              type="number" 
              id="bathrooms" 
              name="bathrooms" 
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="garageSpaces" className="block text-sm font-medium text-gray-700">Vagas de Garagem</label>
            <input 
              type="number" 
              id="garageSpaces" 
              name="garageSpaces" 
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
            <input 
              type="text" 
              id="neighborhood" 
              name="neighborhood" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço Completo</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detalhes Adicionais</label>
            <textarea 
              id="details" 
              name="details" 
              rows={3}
              placeholder="Ex: Acabamento, estado de conservação, diferenciais..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            ></textarea>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Após clicar em "Finalizar", você será redirecionado para o pagamento. A avaliação será enviada para o seu email cadastrado após a confirmação.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            {/* O botão redirecionará para o link de pagamento configurado pelo admin */}
            <Link 
              href="#" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Finalizar e Pagar Avaliação
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
