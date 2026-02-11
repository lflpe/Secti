import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarParcerias as ListarParceriasComponent, type Parceria } from '../../../components/admin/ListarParcerias';
import { parceriasService, type ParceriaListFilters, type ParceriaListResponse } from '../../../services/parceriasService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListarParcerias = () => {
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [totalItens, setTotalItens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getTipoFromNome = (nomeArquivo?: string, caminhoArquivo?: string): Parceria['tipo'] => {
    const origem = nomeArquivo || caminhoArquivo || '';
    const parts = origem.split('.');
    if (parts.length < 2) return 'outro';
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return ext;
    }
    return 'outro';
  };

  // Carregar parcerias com paginação servidor
  const carregarParcerias = useCallback(async (page = 1, categoriaFiltro?: string) => {
    setIsLoading(true);
    setErro(null);
    try {
      const filtros: ParceriaListFilters = {
        ordenarPor: 'titulo',
        ordenarDescendente: false,
        apenasAtivas: true,
        pagina: page,
        itensPorPagina: itemsPerPage,
      };

      if (categoriaFiltro) {
        filtros.categoria = categoriaFiltro;
      }

      const response: ParceriaListResponse = await parceriasService.listar(filtros);

      const parceriasFormatadas: Parceria[] = response.parcerias.map((parceria) => ({
        id: parceria.id,
        nome: parceria.titulo,
        tipo: getTipoFromNome(parceria.nomeArquivo, parceria.caminhoArquivo),
        categoria: parceria.categoria,
        dataPublicacao: parceria.dataPublicacao,
        caminhoArquivo: parceria.caminhoArquivo,
        nomeArquivo: parceria.nomeArquivo,
      }));

      setParcerias(parceriasFormatadas);
      setTotalItens(response.totalItens);
      setCurrentPage(page);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    carregarParcerias();
  }, [carregarParcerias]);

  // Buscar parcerias via endpoint
  const handleSearch = () => {
    carregarParcerias(1, filtroCategoria || undefined);
  };

  // Limpar filtros
  const handleClearSearch = () => {
    setBusca('');
    setFiltroCategoria('');
    carregarParcerias(1, undefined);
  };

  const handleDelete = async (id: number) => {
    try {
      await parceriasService.inativar(id);
      // Recarregar lista mantendo filtros
      await carregarParcerias(currentPage, filtroCategoria || undefined);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    }
  };

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Parcerias</h1>
            <p className="text-gray-600 mt-2">
              {isLoading ? 'Carregando...' : `${totalItens} ${totalItens === 1 ? 'parceria encontrada' : 'parcerias encontradas'}`}
            </p>
          </div>
          <Link
            to="/admin/parcerias/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Parceria
          </Link>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar parcerias</h3>
                <p className="text-sm text-red-700 mt-1">{erro}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Busca */}
            <div>
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por Nome
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
                  placeholder="Digite o nome da parceria..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <input
                type="text"
                id="categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                placeholder="Ex: Nacional, Internacional"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              />
            </div>

            {/* Botões de ação */}
            <div className="md:col-span-2 flex gap-2">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="flex-1 cursor-pointer bg-[#0C2856] text-white px-4 py-2 rounded-md hover:bg-[#195CE3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={handleClearSearch}
                disabled={isLoading}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-sm text-gray-500">Carregando parcerias...</p>
          </div>
        ) : (
          <>
            <ListarParceriasComponent
              parcerias={parcerias}
              onDelete={handleDelete}
              emptyStateTitle="Nenhuma parceria encontrada"
              emptyStateDescription="Crie uma nova parceria para começar"
              showHeader={false}
            />

            {/* Paginação */}
            {totalItens > itemsPerPage && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItens)}</span> de <span className="font-medium">{totalItens}</span> resultados
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                  <button
                    onClick={() => carregarParcerias(currentPage - 1, filtroCategoria || undefined)}
                    disabled={currentPage === 1 || isLoading}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Anterior
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{Math.ceil(totalItens / itemsPerPage)}</span>
                  </span>
                  <button
                    onClick={() => carregarParcerias(currentPage + 1, filtroCategoria || undefined)}
                    disabled={currentPage === Math.ceil(totalItens / itemsPerPage) || isLoading}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PrivateLayout>
  );
};


