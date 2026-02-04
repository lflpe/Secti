import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarDocumentos as ListarDocumentosComponent, type Documento } from '../../../components/admin/ListarDocumentos';

// Dados mockados - substituir por chamada à API
const documentosServidorMock: Documento[] = [
  {
    id: 1,
    nome: 'Regulamento Interno da SECTI',
    tipo: 'pdf',
    tamanho: '2.3 MB',
    dataUpload: '22/12/2024',
    url: '#',
  },
  {
    id: 2,
    nome: 'Manual de Procedimentos Administrativos',
    tipo: 'docx',
    tamanho: '1.7 MB',
    dataUpload: '20/12/2024',
    url: '#',
  },
  {
    id: 3,
    nome: 'Código de Ética do Servidor Público',
    tipo: 'pdf',
    tamanho: '4.1 MB',
    dataUpload: '18/12/2024',
    url: '#',
  },
  {
    id: 4,
    nome: 'Normas de Segurança da Informação',
    tipo: 'docx',
    tamanho: '1.9 MB',
    dataUpload: '15/12/2024',
    url: '#',
  },
];

export const ListarDocumentosServidor = () => {
  const [documentosServidor, setDocumentosServidor] = useState<Documento[]>(documentosServidorMock);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [busca, setBusca] = useState<string>('');

  // Filtrar documentos do servidor
  const documentosServidorFiltrados = documentosServidor.filter((documento) => {
    const matchTipo = filtroTipo === 'Todos' || documento.tipo === filtroTipo;
    const matchBusca = documento.nome.toLowerCase().includes(busca.toLowerCase());

    return matchTipo && matchBusca;
  });

  // Função para excluir documento do servidor
  const handleDelete = (id: number) => {
    setDocumentosServidor(documentosServidor.filter(d => d.id !== id));
  };

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Documentos do Servidor</h1>
            <p className="text-gray-600 mt-2">
              {documentosServidorFiltrados.length} {documentosServidorFiltrados.length === 1 ? 'documento encontrado' : 'documentos encontrados'}
            </p>
          </div>
          <Link
            to="/admin/documentos-servidor/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Documento
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
                placeholder="Digite o nome do documento..."
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

        {/* Lista de Documentos do Servidor */}
        <ListarDocumentosComponent
          documentos={documentosServidorFiltrados}
          onDelete={handleDelete}
          emptyStateTitle="Nenhum documento do servidor encontrado"
          emptyStateDescription="Crie um novo documento para começar"
          showHeader={false}
        />
      </div>
    </PrivateLayout>
  );
};
