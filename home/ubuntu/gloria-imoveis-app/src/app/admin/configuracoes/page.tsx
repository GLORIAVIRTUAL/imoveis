
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminConfiguracoesPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Configurações Gerais</h1>

      <form className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Configurações por Cidade (Exemplo para uma cidade) */}
        {/* Idealmente, haveria um seletor de cidade aqui */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configurações (Petrolina - PE)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Links de Pagamento */}
            <div>
              <label htmlFor="paymentLinkPropertySale" className="block text-sm font-medium text-gray-700">Link Pagamento (Cadastro Imóvel - Venda)</label>
              <input 
                type="url" 
                id="paymentLinkPropertySale" 
                name="paymentLinkPropertySale" 
                placeholder="https://link.pagamento/venda"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkPropertyRent" className="block text-sm font-medium text-gray-700">Link Pagamento (Cadastro Imóvel - Aluguel)</label>
              <input 
                type="url" 
                id="paymentLinkPropertyRent" 
                name="paymentLinkPropertyRent" 
                placeholder="https://link.pagamento/aluguel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkEvaluation" className="block text-sm font-medium text-gray-700">Link Pagamento (Avaliação Imóvel)</label>
              <input 
                type="url" 
                id="paymentLinkEvaluation" 
                name="paymentLinkEvaluation" 
                placeholder="https://link.pagamento/avaliacao"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkCpf" className="block text-sm font-medium text-gray-700">Link Pagamento (Consulta CPF)</label>
              <input 
                type="url" 
                id="paymentLinkCpf" 
                name="paymentLinkCpf" 
                placeholder="https://link.pagamento/cpf"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkContractAnalysis" className="block text-sm font-medium text-gray-700">Link Pagamento (Análise Contrato)</label>
              <input 
                type="url" 
                id="paymentLinkContractAnalysis" 
                name="paymentLinkContractAnalysis" 
                placeholder="https://link.pagamento/analise"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkProvider" className="block text-sm font-medium text-gray-700">Link Pagamento (Cadastro Prestador)</label>
              <input 
                type="url" 
                id="paymentLinkProvider" 
                name="paymentLinkProvider" 
                placeholder="https://link.pagamento/prestador"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkNotary" className="block text-sm font-medium text-gray-700">Link Pagamento (Cartório 24h)</label>
              <input 
                type="url" 
                id="paymentLinkNotary" 
                name="paymentLinkNotary" 
                placeholder="https://link.pagamento/cartorio"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="paymentLinkCityHall" className="block text-sm font-medium text-gray-700">Link Pagamento (Prefeitura 24h)</label>
              <input 
                type="url" 
                id="paymentLinkCityHall" 
                name="paymentLinkCityHall" 
                placeholder="https://link.pagamento/prefeitura"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            {/* Links Externos */}
            <div>
              <label htmlFor="whatsappLink" className="block text-sm font-medium text-gray-700">Link WhatsApp</label>
              <input 
                type="url" 
                id="whatsappLink" 
                name="whatsappLink" 
                placeholder="https://wa.me/55..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="schedulingLink" className="block text-sm font-medium text-gray-700">Link Agendamento de Visita</label>
              <input 
                type="url" 
                id="schedulingLink" 
                name="schedulingLink" 
                placeholder="https://site.agendamento.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            {/* Emails */}
            <div>
              <label htmlFor="evaluationEmail" className="block text-sm font-medium text-gray-700">Email para Avaliação de Imóveis</label>
              <input 
                type="email" 
                id="evaluationEmail" 
                name="evaluationEmail" 
                placeholder="avaliacao@email.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="notaryEmail" className="block text-sm font-medium text-gray-700">Email do Cartório (Cartório 24h)</label>
              <input 
                type="email" 
                id="notaryEmail" 
                name="notaryEmail" 
                placeholder="cartorio.petrolina@email.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="cityHallEmail" className="block text-sm font-medium text-gray-700">Email da Prefeitura (Prefeitura 24h)</label>
              <input 
                type="email" 
                id="cityHallEmail" 
                name="cityHallEmail" 
                placeholder="prefeitura.petrolina@email.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
             <div>
              <label htmlFor="refundEmail" className="block text-sm font-medium text-gray-700">Email para Resgate de Depósito</label>
              <input 
                type="email" 
                id="refundEmail" 
                name="refundEmail" 
                placeholder="resgate@email.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Configurações Globais */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configurações Globais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Logo */}
            <div>
              <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Logo da Empresa</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-4">
                  {/* Placeholder for current logo */}
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <input type="file" id="logoUpload" name="logoUpload" accept="image/*" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
              </div>
            </div>

            {/* Upload Vídeo Tutorial */}
            <div>
              <label htmlFor="videoUpload" className="block text-sm font-medium text-gray-700">Vídeo Tutorial (Página Inicial)</label>
              <input type="file" id="videoUpload" name="videoUpload" accept="video/*" className="mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
              {/* Add current video name or preview if possible */}
            </div>
          </div>
        </div>

        {/* Personalização de Textos (Exemplo) */}
        {/* This would likely be more complex, maybe using a rich text editor */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personalização de Textos</h2>
          <div>
            <label htmlFor="homeTitle" className="block text-sm font-medium text-gray-700">Título Principal (Página Inicial)</label>
            <input 
              type="text" 
              id="homeTitle" 
              name="homeTitle" 
              defaultValue="Encontre o imóvel dos seus sonhos"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            Salvar Configurações
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
