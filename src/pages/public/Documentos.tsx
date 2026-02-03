import { PublicLayout } from '../../layouts/PublicLayout';
import { useState, useMemo, useEffect } from 'react';

type DocumentoItem = {
  id: number;
  nome: string;
  tipo: 'pdf' | 'doc' | 'docx';
  tamanho: string;
  categoria: string;
  url: string;
  dataPublicacao: string;
};

// Dados de exemplo - substituir por dados reais da API
const documentosMock: DocumentoItem[] = [
  { id: 1, nome: 'Relatório Anual 2023', tipo: 'pdf', tamanho: '2.5 MB', categoria: 'Relatórios', url: '#', dataPublicacao: '15/12/2023' },
  { id: 2, nome: 'Plano Estratégico de Inovação', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Planejamento', url: '#', dataPublicacao: '22/11/2023' },
  { id: 3, nome: 'Lei Estadual 18.139', tipo: 'pdf', tamanho: '850 KB', categoria: 'Legislação', url: '#', dataPublicacao: '18/01/2023' },
  { id: 4, nome: 'Edital de Fomento 2024', tipo: 'docx', tamanho: '1.2 MB', categoria: 'Editais', url: '#', dataPublicacao: '05/01/2024' },
  { id: 5, nome: 'Prestação de Contas 2023', tipo: 'pdf', tamanho: '3.1 MB', categoria: 'Relatórios', url: '#', dataPublicacao: '28/02/2024' },
  { id: 6, nome: 'Manual de Normas Técnicas', tipo: 'doc', tamanho: '945 KB', categoria: 'Manuais', url: '#', dataPublicacao: '10/03/2024' },
  { id: 7, nome: 'Regulamento Interno', tipo: 'pdf', tamanho: '678 KB', categoria: 'Legislação', url: '#', dataPublicacao: '14/06/2024' },
  { id: 8, nome: 'Projeto Tecnologia na Educação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Projetos', url: '#', dataPublicacao: '20/08/2024' },
  { id: 9, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },
  { id: 10, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },
  { id: 11, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },

];

export const Documentos = () => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const documentosPorPagina = 10;

  // Extrair categorias únicas
  const categorias = useMemo(() => {
    const cats = documentosMock.map(doc => doc.categoria);
    return ['Todas', ...Array.from(new Set(cats))];
  }, []);

  // Extrair anos únicos
  const anos = useMemo(() => {
    const anosSet = documentosMock.map(doc => {
      const data = doc.dataPublicacao.split('/');
      return data[2]; // Retorna o ano
    });
    return ['Todos', ...Array.from(new Set(anosSet)).sort((a, b) => b.localeCompare(a))];
  }, []);

  // Filtrar documentos
  const documentosFiltrados = useMemo(() => {
    return documentosMock.filter(doc => {
      const matchNome = doc.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const matchCategoria = filtroCategoria === '' || filtroCategoria === 'Todas' || doc.categoria === filtroCategoria;
      const anoDoc = doc.dataPublicacao.split('/')[2];
      const matchAno = filtroAno === '' || filtroAno === 'Todos' || anoDoc === filtroAno;
      return matchNome && matchCategoria && matchAno;
    });
  }, [filtroNome, filtroCategoria, filtroAno]);

  // Resetar para página 1 quando filtros mudarem
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <PublicLayout>
      {/* Hero Image Section */}
      <div className="relative h-80 md:h-96 bg-linear-to-r from-[#0C2856] to-[#195CE3] overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Documentos</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Acesse documentos, relatórios e publicações da SECTI
            </p>
          </div>
        </div>
        {/* Decorative pattern */}
        <div className="hidden md:block md:absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </div>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0C2856] mb-6">Filtrar Documentos</h2>
                  <div className="grid md:grid-cols-3 gap-4">
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
                <div>
                  <label htmlFor="filtroCategoria" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    id="filtroCategoria"
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none"
                  >
                    {categorias.map(cat => (
                      <option key={cat} value={cat === 'Todas' ? '' : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro por Ano */}
                <div>
                  <label htmlFor="filtroAno" className="block text-sm font-medium text-gray-700 mb-2">
                    Ano
                  </label>
                  <select
                    id="filtroAno"
                    value={filtroAno}
                    onChange={(e) => setFiltroAno(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                              </svg>
                              <strong>Tamanho:</strong> {doc.tamanho}
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
                          <a
                            href={doc.url}
                            download
                            className="inline-flex items-center gap-2 bg-[#195CE3] text-white px-6 py-3 rounded-lg hover:bg-[#0C2856] transition duration-200 font-medium"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Baixar
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Paginação */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pt-8">
                      {/* Botão Anterior */}
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

                      {/* Números das páginas */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => {
                          // Mostrar apenas algumas páginas (lógica de ellipsis)
                          if (
                            numero === 1 ||
                            numero === totalPaginas ||
                            (numero >= paginaAtual - 1 && numero <= paginaAtual + 1)
                          ) {
                            return (
                              <button
                                key={numero}
                                onClick={() => irParaPagina(numero)}
                                className={`w-10 h-10 rounded-lg font-medium transition duration-200 ${
                                  paginaAtual === numero
                                    ? 'bg-[#0C2856] text-white'
                                    : 'bg-white cursor-pointer text-[#0C2856] border border-gray-300 hover:border-[#0C2856] hover:bg-gray-50'
                                }`}
                              >
                                {numero}
                              </button>
                            );
                          } else if (
                            numero === paginaAtual - 2 ||
                            numero === paginaAtual + 2
                          ) {
                            return <span key={numero} className="px-2 py-2 text-gray-500">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      {/* Botão Próximo */}
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
        </div>
      </section>
    </PublicLayout>
  );
};
