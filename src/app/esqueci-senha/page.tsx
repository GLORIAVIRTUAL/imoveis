
import Link from 'next/link';

export default function EsqueciSenhaPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Recuperar Senha</h1>
      <p className="text-center text-gray-600 mb-6">Digite seu email para receber instruções sobre como redefinir sua senha.</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Enviar Instruções
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Lembrou sua senha?{' '}
        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
          Faça login
        </Link>
      </p>
    </div>
  );
}
