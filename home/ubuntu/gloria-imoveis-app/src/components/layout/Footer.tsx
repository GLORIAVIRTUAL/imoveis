import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre Nós */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Glória Imóveis</h3>
            <p className="text-sm">
              Conectando você ao seu próximo lar ou investimento com tecnologia e praticidade.
            </p>
            {/* Adicionar links de redes sociais se necessário */}
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/imoveis" className="hover:text-primary">Buscar Imóveis</Link></li>
              <li><Link href="/cadastrar-imovel" className="hover:text-primary">Anunciar Imóvel</Link></li>
              <li><Link href="/servicos" className="hover:text-primary">Nossos Serviços</Link></li>
              <li><Link href="/prestadores" className="hover:text-primary">Prestadores</Link></li>
              <li><Link href="/sobre" className="hover:text-primary">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-primary">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contato</h3>
            {/* Adicionar informações de contato como endereço, telefone, email se necessário */}
            <p className="text-sm">Fale conosco através do nosso canal de atendimento.</p>
            {/* Link para página de contato ou WhatsApp */}
            <Link href="/contato" className="mt-2 inline-block text-primary hover:underline text-sm">
              Entrar em contato
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Glória Imóveis. Todos os direitos reservados.</p>
          {/* Adicionar links para Política de Privacidade e Termos de Uso */}
          <div className="mt-2">
            <Link href="/politica-privacidade" className="hover:text-primary mx-2">Política de Privacidade</Link>
            |
            <Link href="/termos-uso" className="hover:text-primary mx-2">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
