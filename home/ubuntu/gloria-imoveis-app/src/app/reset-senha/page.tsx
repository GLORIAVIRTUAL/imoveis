'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetSenhaPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Redefinir Senha</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required 
            className={`mt-1 block w-full px-3 py-2 border ${!passwordsMatch ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {!passwordsMatch && confirmPassword && (
            <p className="mt-1 text-sm text-red-500">As senhas não coincidem</p>
          )}
        </div>
        
        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={!passwordsMatch || !password}
          >
            Redefinir Senha
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
          Voltar para o login
        </Link>
      </p>
    </div>
  );
}
