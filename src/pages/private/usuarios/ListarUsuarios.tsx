import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarUsuarios as ListarUsuariosComponent, type UsuarioListItem } from '../../../components/admin/ListarUsuarios';
import { usuarioService, type UsuarioListFilters } from '../../../services/usuarioService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioListItem[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [filtroAtivos, setFiltroAtivos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [totalItens, setTotalItens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const carregarUsuarios = useCallback(async (
    page = 1,
    apenasAtivos = false,
    buscarPor = ''
  ) => {
    setIsLoading(true);
    setErro(null);
    try {
      const filtros: UsuarioListFilters = {
        apenasAtivos,
        pagina: page,
        itensPorPagina: itemsPerPage,
      };

      if (buscarPor) {
        filtros.nomeOuEmailFiltro = buscarPor;
      }

      const response = await usuarioService.listar(filtros);

      setUsuarios(response.itens);
      setTotalItens(response.total);
      setCurrentPage(page);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleSearch = () => {
    carregarUsuarios(1, filtroAtivos, busca);
  };

  const handleClearSearch = () => {
    setBusca('');
    setFiltroAtivos(false);
    carregarUsuarios(1, false, '');
  };

  const handleSuspend = async (id: number) => {
    try {
      await usuarioService.suspender(id);
      // Recarregar lista
      await carregarUsuarios(currentPage, filtroAtivos, busca);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    }
  };

  const handleEnable = async (id: number) => {
    try {
      await usuarioService.habilitar(id);
      // Recarregar lista
      await carregarUsuarios(currentPage, filtroAtivos, busca);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    }
  };

  const totalPaginas = Math.ceil(totalItens / itemsPerPage);

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
            <p className="text-gray-600 mt-2">
              {isLoading ? 'Carregando...' : `${totalItens} ${totalItens === 1 ? 'usuário encontrado' : 'usuários encontrados'}`}
            </p>
          </div>
          <Link
            to="/admin/usuarios/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Usuário
          </Link>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar usuários</h3>
                <p className="text-sm text-red-700 mt-1">{erro}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div>
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por Nome ou Email
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
                  placeholder="Digite o nome ou email..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro de Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filtroAtivos ? 'ativos' : 'todos'}
                onChange={(e) => setFiltroAtivos(e.target.value === 'ativos')}
                className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              >
                <option value="todos">Todos</option>
                <option value="ativos">Apenas Ativos</option>
              </select>
            </div>

            {/* Espaçador */}
            <div />

            {/* Botões de ação */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="flex-1 cursor-pointer bg-[#0C2856] text-white px-4 py-2 rounded-md hover:bg-[#195CE3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={handleClearSearch}
                disabled={isLoading}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-sm text-gray-500">Carregando usuários...</p>
          </div>
        ) : (
          <>
            <ListarUsuariosComponent
              usuarios={usuarios}
              onSuspend={handleSuspend}
              onEnable={handleEnable}
              emptyStateTitle="Nenhum usuário encontrado"
              emptyStateDescription="Crie um novo usuário para começar"
              showHeader={false}
            />

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-lg">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => carregarUsuarios(Math.max(currentPage - 1, 1), filtroAtivos, busca)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => carregarUsuarios(Math.min(currentPage + 1, totalPaginas), filtroAtivos, busca)}
                    disabled={currentPage === totalPaginas}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próxima
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Página <span className="font-medium">{currentPage}</span> de{' '}
                      <span className="font-medium">{totalPaginas}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => carregarUsuarios(Math.max(currentPage - 1, 1), filtroAtivos, busca)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => carregarUsuarios(Math.min(currentPage + 1, totalPaginas), filtroAtivos, busca)}
                        disabled={currentPage === totalPaginas}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PrivateLayout>
  );
};

