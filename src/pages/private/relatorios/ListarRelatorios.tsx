import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarDocumentos as ListarDocumentosComponent, type Documento } from '../../../components/admin/ListarDocumentos';

// Dados mockados - substituir por chamada à API
const relatoriosMock: Documento[] = [
  {
    id: 1,
    nome: 'Relatório Anual de Atividades 2024',
    tipo: 'pdf',
    tamanho: '6.8 MB',
    dataUpload: '31/12/2024',
    url: '#',
  },
  {
    id: 2,
    nome: 'Relatório de Gestão Financeira Trimestral',
    tipo: 'xlsx',
    tamanho: '3.2 MB',
    dataUpload: '30/12/2024',
    url: '#',
  },
  {
    id: 3,
    nome: 'Relatório de Desempenho Institucional',
    tipo: 'pdf',
    tamanho: '4.9 MB',
    dataUpload: '28/12/2024',
    url: '#',
  },
  {
    id: 4,
    nome: 'Relatório de Auditoria Interna',
    tipo: 'docx',
    tamanho: '2.8 MB',
    dataUpload: '25/12/2024',
    url: '#',
  },
];

export const ListarRelatorios = () => {
  const [relatorios, setRelatorios] = useState<Documento[]>(relatoriosMock);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [busca, setBusca] = useState<string>('');

  // Filtrar relatórios
  const relatoriosFiltrados = relatorios.filter((relatorio) => {
    const matchTipo = filtroTipo === 'Todos' || relatorio.tipo === filtroTipo;
    const matchBusca = relatorio.nome.toLowerCase().includes(busca.toLowerCase());

    return matchTipo && matchBusca;
  });

  // Função para excluir relatório
  const handleDelete = (id: number) => {
    setRelatorios(relatorios.filter(r => r.id !== id));
  };

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Relatórios</h1>
            <p className="text-gray-600 mt-2">
              {relatoriosFiltrados.length} {relatoriosFiltrados.length === 1 ? 'relatório encontrado' : 'relatórios encontrados'}
            </p>
          </div>
          <Link
            to="/admin/relatorios/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Relatório
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por Nome
              </label>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Digite o nome do relatório..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195CE3] focus:border-transparent outline-none transition-colors"
              />
            </div>

            {/* Filtro por Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Arquivo
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#195CE3] focus:border-transparent outline-none transition-colors"
              >
                <option value="Todos">Todos</option>
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="docx">DOCX</option>
                <option value="xlsx">XLSX</option>
              </select>
            </div>

            {/* Botão Limpar */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setBusca('');
                  setFiltroTipo('Todos');
                }}
                className="w-full cursor-pointer px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Relatórios */}
        <ListarDocumentosComponent
          documentos={relatoriosFiltrados}
          onDelete={handleDelete}
          emptyStateTitle="Nenhum relatório encontrado"
          emptyStateDescription="Crie um novo relatório para começar"
          showHeader={false}
        />
      </div>
    </PrivateLayout>
  );
};
