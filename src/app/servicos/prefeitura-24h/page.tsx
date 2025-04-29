import Link from 'next/link';
import { useState } from 'react';

export default function Prefeitura24hPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [requestText, setRequestText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Lista de serviços da prefeitura (exemplo)
  const services = [
    { id: 'iptu', name: 'Consulta de IPTU' },
    { id: 'alvara', name: 'Emissão de Alvará' },
    { id: 'habitese', name: 'Emissão de Habite-se' },
    { id: 'certidao', name: 'Certidão de Uso do Solo' },
    { id: 'regularizacao', name: 'Regularização de Imóvel' },
    { id: 'outros', name: 'Outros Serviços' },
  ];

  return (
    <div className="form-container fade-in">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Prefeitura 24h</h1>
      <p className="text-center text-gray-600 mb-8">Solicite serviços da prefeitura sem sair de casa. Selecione o serviço desejado, descreva sua solicitação e anexe os documentos necessários.</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Serviço Desejado</label>
            <select 
              id="service" 
              name="service" 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            >
              <option value="">Selecione o serviço...</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="requestText" className="block text-sm font-medium text-gray-700">Descrição da Solicitação</label>
            <textarea 
              id="requestText" 
              name="requestText" 
              rows={4}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Descreva detalhadamente o que você precisa..."
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label htmlFor="documentFile" className="block text-sm font-medium text-gray-700 mb-2">Anexar Documentos (PDF)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="documentFile" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                    <span>Carregar documentos</span>
                    <input id="documentFile" name="documentFile" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">PDF até 10MB</p>
              </div>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">Arquivo selecionado: {selectedFile.name}</p>
            )}
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
                  Após clicar em "Finalizar", você será redirecionado para o pagamento da taxa de serviço. Sua solicitação será enviada à prefeitura parceira e a resposta será enviada ao seu email cadastrado.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            {/* O botão redirecionará para o link de pagamento configurado pelo admin */}
            <Link 
              href="#" 
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${(!selectedService || !requestText) ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={!selectedService || !requestText}
              onClick={(e) => (!selectedService || !requestText) && e.preventDefault()} // Prevent click if required fields are empty
            >
              Finalizar e Pagar Serviço
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
