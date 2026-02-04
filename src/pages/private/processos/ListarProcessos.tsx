import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarDocumentos as ListarDocumentosComponent, type Documento } from '../../../components/admin/ListarDocumentos';

// Dados mockados - substituir por chamada à API
const processosMock: Documento[] = [
  {
    id: 1,
    nome: 'Processo Administrativo nº 2024-001 - Contratação de Serviços',
    tipo: 'pdf',
    tamanho: '4.2 MB',
    dataUpload: '30/12/2024',
    url: '#',
  },
  {
    id: 2,
    nome: 'Processo Licitatório nº 2024-045 - Aquisição de Equipamentos',
    tipo: 'docx',
    tamanho: '2.7 MB',
    dataUpload: '28/12/2024',
    url: '#',
  },
  {
    id: 3,
    nome: 'Processo de Concurso Público nº 2024-012',
    tipo: 'pdf',
    tamanho: '5.1 MB',
    dataUpload: '25/12/2024',
    url: '#',
  },
  {
    id: 4,
    nome: 'Processo de Prestação de Contas nº 2024-089',
    tipo: 'docx',
    tamanho: '3.3 MB',
    dataUpload: '22/12/2024',
    url: '#',
  },
];

export const ListarProcessos = () => {
  const [processos, setProcessos] = useState<Documento[]>(processosMock);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [busca, setBusca] = useState<string>('');

  // Filtrar processos
  const processosFiltrados = processos.filter((processo) => {
    const matchTipo = filtroTipo === 'Todos' || processo.tipo === filtroTipo;
    const matchBusca = processo.nome.toLowerCase().includes(busca.toLowerCase());

    return matchTipo && matchBusca;
  });

  // Função para excluir processo
  const handleDelete = (id: number) => {
    setProcessos(processos.filter(p => p.id !== id));
  };

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Processos</h1>
            <p className="text-gray-600 mt-2">
              {processosFiltrados.length} {processosFiltrados.length === 1 ? 'processo encontrado' : 'processos encontrados'}
            </p>
          </div>
          <Link
            to="/admin/processos/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Processo
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
                placeholder="Digite o nome do processo..."
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

        {/* Lista de Processos */}
        <ListarDocumentosComponent
          documentos={processosFiltrados}
          onDelete={handleDelete}
          emptyStateTitle="Nenhum processo encontrado"
          emptyStateDescription="Crie um novo processo para começar"
          showHeader={false}
        />
      </div>
    </PrivateLayout>
  );
};
