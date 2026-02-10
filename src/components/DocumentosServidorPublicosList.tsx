import { useState, useMemo, useEffect } from 'react';
import { downloadDocumentoServidor } from '../services/documentosServidorService';

export interface DocumentoServidorPublicoItem {
  id: number;
  nome: string;
  tipo: 'pdf' | 'doc' | 'docx';
  tamanho: string;
  categoria: string;
  url: string;
  dataPublicacao: string;
}

interface DocumentosServidorPublicosListProps {
  documents: DocumentoServidorPublicoItem[];
  categories: string[];
  showCategoryFilter?: boolean;
  isLoading?: boolean;
}

export const DocumentosServidorPublicosList = ({
  documents,
  categories,
  showCategoryFilter = true,
  isLoading = false,
}: DocumentosServidorPublicosListProps) => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const documentosPorPagina = 10;

  // Extrair anos únicos
  const anos = useMemo(() => {
    const anosSet = documents.map(doc => {
      const data = doc.dataPublicacao.split('/');
      return data[2];
    });
    return ['Todos', ...Array.from(new Set(anosSet)).sort((a, b) => b.localeCompare(a))];
  }, [documents]);

  // Filtrar documentos
  const documentosFiltrados = useMemo(() => {
    return documents.filter(doc => {
      const matchNome = doc.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const matchCategoria = filtroCategoria === '' || filtroCategoria === 'Todas' || doc.categoria === filtroCategoria;
      const anoDoc = doc.dataPublicacao.split('/')[2];
      const matchAno = filtroAno === '' || filtroAno === 'Todos' || anoDoc === filtroAno;
      return matchNome && matchCategoria && matchAno;
    });
  }, [filtroNome, filtroCategoria, filtroAno, documents]);

  // Resetar para página 1 quando filtros mudarem
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtroNome, filtroCategoria, filtroAno]);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(documentosFiltrados.length / documentosPorPagina);

  // Documentos da página atual
  const documentosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * documentosPorPagina;
    const fim = inicio + documentosPorPagina;
    return documentosFiltrados.slice(inicio, fim);
  }, [documentosFiltrados, paginaAtual]);

  // Função para mudar de página
  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para baixar documento
  const handleDownload = async (docId: number, caminhoArquivo: string, nomeArquivo: string) => {
    try {
      setDownloadingId(docId);
      await downloadDocumentoServidor(caminhoArquivo, nomeArquivo);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      alert('Erro ao baixar documento. Tente novamente.');
    } finally {
      setDownloadingId(null);
    }
  };

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Renderizar estado de carregamento
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C2856]"></div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Carregando documentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-bold text-[#0C2856] mb-6">Filtrar Documentos</h3>
        <div className={`grid ${showCategoryFilter ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {/* Filtro por Nome */}
          <div>
            <label htmlFor="filtroNome" className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por nome
            </label>
            <input
              type="text"
              id="filtroNome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              placeholder="Digite o nome do documento..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none"
            />
          </div>

          {/* Filtro por Categoria */}
          {showCategoryFilter && (
            <div>
              <label htmlFor="filtroCategoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="filtroCategoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'Todas' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por Ano */}
          <div>
            <label htmlFor="filtroAno" className="block text-sm font-medium text-gray-700 mb-2">
              Ano
            </label>
            <select
              id="filtroAno"
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none cursor-pointer"
            >
              {anos.map(ano => (
                <option key={ano} value={ano === 'Todos' ? '' : ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {documentosFiltrados.length} {documentosFiltrados.length === 1 ? 'documento encontrado' : 'documentos encontrados'}
          {totalPaginas > 1 && (
            <span className="ml-2">
              - Página {paginaAtual} de {totalPaginas}
            </span>
          )}
        </div>
      </div>

      {/* Lista de Documentos */}
      <div className="space-y-4">
        {documentosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl text-gray-600">Nenhum documento encontrado</p>
            <p className="text-gray-500 mt-2">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <>
            {documentosPaginados.map(doc => (
              <div key={doc.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Ícone do tipo de arquivo */}
                  <div className="shrink-0">
                    {getIconeTipo(doc.tipo)}
                  </div>

                  {/* Informações do documento */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#0C2856] mb-2">{doc.nome}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <strong>Tipo:</strong> {doc.tipo.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <strong>Publicado em:</strong> {doc.dataPublicacao}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0C2856] text-white">
                        {doc.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Botão de Download */}
                  <div className="shrink-0">
                    <button
                      onClick={() => handleDownload(doc.id, doc.url, doc.nome)}
                      disabled={downloadingId === doc.id}
                      className="inline-flex items-center gap-2 bg-[#195CE3] text-white px-6 py-3 rounded-lg hover:bg-[#0C2856] transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {downloadingId === doc.id ? 'Baixando...' : 'Baixar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pt-8 flex-wrap">
                <button
                  onClick={() => irParaPagina(paginaAtual - 1)}
                  disabled={paginaAtual === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    paginaAtual === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white cursor-pointer text-[#0C2856] border border-[#0C2856] hover:bg-[#0C2856] hover:text-white'
                  }`}
                >
                  Anterior
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                    <button
                      key={numero}
                      onClick={() => irParaPagina(numero)}
                      className={`px-3 py-2 rounded-lg font-medium transition duration-200 ${
                        numero === paginaAtual
                          ? 'bg-[#0C2856] text-white'
                          : 'bg-white cursor-pointer text-[#0C2856] border border-[#0C2856] hover:bg-[#0C2856] hover:text-white'
                      }`}
                    >
                      {numero}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => irParaPagina(paginaAtual + 1)}
                  disabled={paginaAtual === totalPaginas}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    paginaAtual === totalPaginas
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white cursor-pointer text-[#0C2856] border border-[#0C2856] hover:bg-[#0C2856] hover:text-white'
                  }`}
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

