import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Imóveis */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Imóveis</h2>
          <p className="text-3xl font-bold text-primary">125</p> {/* Placeholder */}
        </div>

        {/* Card 2: Novos Usuários */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Novos Usuários (Mês)</h2>
          <p className="text-3xl font-bold text-primary">32</p> {/* Placeholder */}
        </div>

        {/* Card 3: Anúncios Pendentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Anúncios Pendentes</h2>
          <p className="text-3xl font-bold text-primary">5</p> {/* Placeholder */}
        </div>

        {/* Card 4: Receita (Mês) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Receita (Mês)</h2>
          <p className="text-3xl font-bold text-primary">R$ 1.500,00</p> {/* Placeholder */}
        </div>
      </div>

      {/* Add charts or recent activity logs here */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
        {/* Placeholder for activity log */}
        <p className="text-gray-500">Nenhuma atividade recente.</p>
      </div>
    </AdminLayout>
  );
}
