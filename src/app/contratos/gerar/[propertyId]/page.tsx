
import Link from 'next/link';

// Placeholder data - replace with data fetched from backend
const property = {
  id: 1,
  title: 'Apartamento Moderno no Centro',
  city: 'Petrolina',
  neighborhood: 'Centro',
  price: 350000,
  type: 'venda',
  seller: {
    name: 'João Silva',
    cpf: '111.111.111-11',
    rg: '1234567 SSP/PE',
    marital_status: 'Casado',
  }
};

// Helper para formatar preço
const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function GerarContratoPage({ params }: { params: { propertyId: string } }) {
  const contractType = property.type === 'venda' ? 'Compra e Venda' : 'Aluguel';

  return (
    <div className="form-container fade-in">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Gerar Contrato de {contractType}</h1>
      <p className="text-center text-gray-600 mb-8">Preencha os dados do comprador/locatário para gerar o contrato.</p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Dados do Imóvel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Imóvel</p>
            <p className="font-medium">{property.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Localização</p>
            <p className="font-medium">{property.neighborhood}, {property.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valor</p>
            <p className="font-medium text-primary">{formatPrice(property.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="font-medium capitalize">{property.type}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dados do {property.type === 'venda' ? 'Comprador' : 'Locatário'}</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              id="buyerName" 
              name="buyerName" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="buyerCpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input 
              type="text" // Mask later
              id="buyerCpf" 
              name="buyerCpf" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="buyerRg" className="block text-sm font-medium text-gray-700">RG</label>
            <input 
              type="text" 
              id="buyerRg" 
              name="buyerRg" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="buyerDob" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input 
              type="date" 
              id="buyerDob" 
              name="buyerDob" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="buyerMaritalStatus" className="block text-sm font-medium text-gray-700">Estado Civil</label>
            <select 
              id="buyerMaritalStatus" 
              name="buyerMaritalStatus" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="">Selecione...</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
              <option value="União Estável">União Estável</option>
            </select>
          </div>
          
          {/* Campos específicos para compra */}
          {property.type === 'venda' && (
            <>
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
                <textarea 
                  id="paymentMethod" 
                  name="paymentMethod" 
                  rows={3}
                  placeholder="Descreva a forma de pagamento acordada..."
                  required 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                ></textarea>
              </div>
            </>
          )}

          {/* Campos específicos para aluguel (ex: data de início, duração) podem ser adicionados aqui */}
          
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Gerar Contrato (PDF)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
