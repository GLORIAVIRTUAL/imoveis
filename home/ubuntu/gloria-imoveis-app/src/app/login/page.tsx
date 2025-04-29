"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Obter o URL de redirecionamento dos parâmetros de consulta
  const redirectUrl = searchParams?.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Incluir o redirectUrl como parâmetro de consulta na URL da API
      const apiUrl = `/api/auth/login?redirect=${encodeURIComponent(redirectUrl)}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Importante para que os cookies sejam enviados/recebidos
      });

      console.log("API Response Status:", res.status);
      const data = await res.json();
      console.log("API Response Data:", data);

      if (!res.ok) {
        console.error("Login failed with status:", res.status);
        throw new Error(data.error || "Falha ao fazer login");
      }

      // Armazenar informações do usuário no localStorage para uso na interface
      console.log("Storing user info in localStorage...");
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      console.log("User info stored.");
      
      console.log("Login bem-sucedido, redirecionando para:", data.redirect || redirectUrl);
      
      // Redirecionar para a página pretendida ou para a página inicial usando router.push
      console.log("Before router.push call.");
      router.push(redirectUrl);
      console.log("After router.push call.");
      // window.location.href = data.redirect || redirectUrl;
      // console.log("Redirection command executed.");
      // router.refresh(); // Atualizar para atualizar o estado de autenticação no layout

    } catch (err: any) {
      console.error('Erro de login:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar na sua conta</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/esqueci-senha" className="font-medium text-primary hover:text-primary/80">
              Esqueceu sua senha?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/cadastro" className="font-medium text-primary hover:text-primary/80">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
