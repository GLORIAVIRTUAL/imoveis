'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CadastrarImovelPage() {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Função para lidar com o upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages([...images, ...filesArray]);
      
      // Criar URLs de preview para as imagens
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  // Função para remover uma imagem
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]); // Liberar URL do objeto
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  // Função para avançar para o próximo passo
  const nextStep = () => {
    setStep(step + 1);
  };

  // Função para voltar ao passo anterior
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="form-container fade-in">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastrar Imóvel</h1>
      
      {/* Indicador de progresso */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`text-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <p className="mt-1 text-sm">Informações</p>
          </div>
          <div className={`text-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <p className="mt-1 text-sm">Imagens</p>
          </div>
          <div className={`text-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <p className="mt-1 text-sm">Revisão</p>
          </div>
          <div className={`text-center ${step >= 4 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
            <p className="mt-1 text-sm">Pagamento</p>
          </div>
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <div className="relative flex justify-between">
            <div className={`h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} style={{ width: '33%' }}></div>
            <div className={`h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} style={{ width: '33%' }}></div>
            <div className={`h-0.5 ${step >= 4 ? 'bg-primary' : 'bg-gray-200'}`} style={{ width: '33%' }}></div>
          </div>
        </div>
      </div>

      {/* Passo 1: Informações do Imóvel */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informações do Imóvel</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nome do Imóvel</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Ex: Chácara em Petrolina"
                required 
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição do Imóvel</label>
              <textarea 
                id="description" 
                name="description" 
                rows={4}
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                min="0"
                step="0.01"
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Anúncio</label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="type" 
                    value="venda" 
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    defaultChecked
                  />
                  <span className="ml-2">Venda</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="type" 
                    value="aluguel" 
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2">Aluguel</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="button" 
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                Próximo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Passo 2: Upload de Imagens */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Imagens do Imóvel</h2>
          
          <div className="image-upload-container mb-6">
            <label htmlFor="images" className="cursor-pointer block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-gray-600">Clique para adicionar fotos ou vídeos</p>
              <p className="text-sm text-gray-500">Formatos aceitos: JPG, PNG, GIF, MP4</p>
              <input 
                type="file" 
                id="images" 
                name="images" 
                multiple
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Preview de imagens */}
          {previewUrls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Imagens selecionadas:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <button 
              type="button" 
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={nextStep}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {/* Passo 3: Revisão */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revisar Informações</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-lg font-medium">Informações do Imóvel</h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome do Imóvel</p>
                  <p className="font-medium">Chácara em Petrolina</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cidade</p>
                  <p className="font-medium">Petrolina</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bairro</p>
                  <p className="font-medium">Centro</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Preço</p>
                  <p className="font-medium">R$ 350.000,00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">Venda</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Descrição</h3>
              <p className="mt-1 text-gray-700">
                Chácara com 3 quartos, piscina, área de churrasco e pomar. Localizada a 10 minutos do centro da cidade.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Imagens</h3>
              <p className="mt-1 text-gray-700">{previewUrls.length} imagens selecionadas</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Após confirmar, você será redirecionado para o pagamento. O anúncio só será publicado após a confirmação do pagamento.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <button 
              type="button" 
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={nextStep}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Confirmar e Pagar
            </button>
          </div>
        </div>
      )}

      {/* Passo 4: Pagamento */}
      {step === 4 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mx-auto text-primary mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Redirecionando para o pagamento</h2>
          <p className="text-gray-600 mb-6">
            Você será redirecionado para a página de pagamento em instantes. Por favor, não feche esta janela.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600">
              Após o pagamento, seu anúncio será revisado e publicado em até 24 horas.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="https://pay.infinitepay.io/gloriavirtual/Ri0x-g1fI4dmDd-500,00" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
              Ir para o Pagamento
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
