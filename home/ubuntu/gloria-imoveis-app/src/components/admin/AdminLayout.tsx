
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/admin" className="text-2xl font-bold text-white">
            Admin Glória
          </Link>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/configuracoes" className="block py-2 px-4 rounded hover:bg-gray-700">
                Configurações
              </Link>
            </li>
            <li>
              <Link href="/admin/cidades" className="block py-2 px-4 rounded hover:bg-gray-700">
                Cidades
              </Link>
            </li>
            <li>
              <Link href="/admin/imoveis" className="block py-2 px-4 rounded hover:bg-gray-700">
                Imóveis
              </Link>
            </li>
            <li>
              <Link href="/admin/usuarios" className="block py-2 px-4 rounded hover:bg-gray-700">
                Usuários
              </Link>
            </li>
            <li>
              <Link href="/admin/prestadores" className="block py-2 px-4 rounded hover:bg-gray-700">
                Prestadores
              </Link>
            </li>
            {/* Add more admin links as needed */}
          </ul>
        </nav>
        <div>
          <Link href="/" className="block py-2 px-4 rounded text-sm text-gray-400 hover:bg-gray-700 hover:text-white">
            Voltar ao Site
          </Link>
          {/* Add logout button here */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
