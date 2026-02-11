import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { TabelaNoticias, type NoticiaAdmin } from '../../../components/admin/TabelaNoticias';
import { noticiasService, type NoticiaListResponse, type NoticiaFiltros } from '../../../services/noticiasService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListaNoticias = () => {
  const [noticias, setNoticias] = useState<NoticiaAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>('Todas');
  const [busca, setBusca] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);

  // Carregar notícias da API com paginação servidor
  const loadNoticias = useCallback(async (page = 1, tituloFiltro = '', apenasPublicadas?: boolean) => {
    try {
      setLoading(true);
      setError(null);

      // Enviar filtros corretamente para a API
      const filtros: NoticiaFiltros = {
        pagina: page,
        itensPorPagina: itemsPerPage,
        tituloFiltro: tituloFiltro || undefined,
        apenasPublicadas: apenasPublicadas,
      };

      const response: NoticiaListResponse = await noticiasService.listar(filtros);

      // Converter dados da API para o formato esperado pelo componente
      const noticiasFormatted: NoticiaAdmin[] = response.itens.map(item => ({
        id: item.id,
        slug: item.slug,
        titulo: item.titulo,
        categoria: 'Notícias',
        autor: item.autor,
        dataPublicacao: new Date(item.dataPublicacao).toLocaleDateString('pt-BR'),
        status: item.publicada ? 'Publicada' : 'Rascunho',
      }));

      setNoticias(noticiasFormatted);
      setTotalItems(response.total);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    loadNoticias();
  }, [loadNoticias]);

  // Função para excluir notícia (inativar)
  const handleDelete = async (id: number) => {
    try {
      await noticiasService.inativar(id);
      // Recarregar lista após inativar mantendo os filtros atuais
      const apenasPublicadas = filtroStatus === 'Publicada' ? true :
                             filtroStatus === 'Rascunho' ? false : undefined;
      await loadNoticias(currentPage, busca, apenasPublicadas);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    }
  };

  // Função para ativar notícia
  const handleActivate = async (id: number) => {
    try {
      await noticiasService.ativar(id);
      // Recarregar lista após ativar mantendo os filtros atuais
      const apenasPublicadas = filtroStatus === 'Publicada' ? true :
                             filtroStatus === 'Rascunho' ? false : undefined;
      await loadNoticias(currentPage, busca, apenasPublicadas);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    }
  };

  // Buscar notícias
  const handleSearch = () => {
    // Quando busca muda, resetar para página 1
    setCurrentPage(1);
    const apenasPublicadas = filtroStatus === 'Publicada' ? true :
                           filtroStatus === 'Rascunho' ? false : undefined;
    loadNoticias(1, busca, apenasPublicadas);
  };

  // Limpar busca
  const handleClearSearch = () => {
    setBusca('');
    setFiltroStatus('Todas');
    loadNoticias(1);
  };

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Notícias</h1>
            <p className="text-gray-600 mt-2">
              {loading ? 'Carregando...' : `${totalItems} ${totalItems === 1 ? 'notícia encontrada' : 'notícias encontradas'}`}
            </p>
          </div>
          <Link
            to="/admin/noticias/criar"
            className="inline-flex items-center justify-center gap-2 bg-[#0C2856] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#195CE3] transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nova Notícia</span>
          </Link>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="busca"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                  placeholder="Buscar por título..."
                />
              </div>
            </div>

            {/* Filtro Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="block cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                <option value="Publicada">Publicada</option>
                <option value="Rascunho">Rascunho</option>
              </select>
            </div>

            {/* Botões de ação */}
            <div className="md:col-span-3 flex gap-2 flex-col sm:flex-row">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex-1 cursor-pointer bg-[#0C2856] text-white px-4 py-2 rounded-md hover:bg-[#195CE3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={handleClearSearch}
                disabled={loading}
                className="flex-1 sm:flex-auto px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2856]"></div>
              <span className="ml-2 text-gray-600">Carregando notícias...</span>
            </div>
          </div>
        ) : (
          <TabelaNoticias
            noticias={noticias}
            onDelete={handleDelete}
            onActivate={handleActivate}
            emptyMessage={busca || filtroStatus !== 'Todas' ? 'Não há nenhuma notícia com esse filtro.' : undefined}
          />
        )}

        {/* Paginação */}
        {totalItems > itemsPerPage && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de <span className="font-medium">{totalItems}</span> resultados
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
              <button
                onClick={() => {
                  const apenasPublicadas = filtroStatus === 'Publicada' ? true :
                                         filtroStatus === 'Rascunho' ? false : undefined;
                  loadNoticias(currentPage - 1, busca, apenasPublicadas);
                }}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1 cursor-pointer border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{Math.ceil(totalItems / itemsPerPage)}</span>
              </span>
              <button
                onClick={() => {
                  const apenasPublicadas = filtroStatus === 'Publicada' ? true :
                                         filtroStatus === 'Rascunho' ? false : undefined;
                  loadNoticias(currentPage + 1, busca, apenasPublicadas);
                }}
                disabled={currentPage === Math.ceil(totalItems / itemsPerPage) || loading}
                className="px-3 py-1 cursor-pointer border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
};
