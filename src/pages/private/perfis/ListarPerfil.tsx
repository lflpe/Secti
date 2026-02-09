import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { perfilService, type PerfilListaItem } from '../../../services/perfilService';
import { handleApiError } from '../../../utils/errorHandler';
import { DeleteModal } from '../../../components/admin/DeleteModal';

export const ListarPerfil = () => {
  const navigate = useNavigate();
  const [perfis, setPerfis] = useState<PerfilListaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [perfilToDelete, setPerfilToDelete] = useState<{ id: number; nome: string } | null>(null);

  const [paginacao, setPaginacao] = useState({
    paginaAtual: 1,
    totalPaginas: 1,
    itensPorPagina: 10,
    totalItens: 0,
  });

  const carregarPerfis = useCallback(async (pagina: number = 1) => {
    try {
      setIsLoading(true);
      setErro(null);

      const response = await perfilService.listar({
        nomeFiltro: busca || undefined,
        pagina: pagina - 1,
        itensPorPagina: paginacao.itensPorPagina,
      });

      setPerfis(response.perfis);
      setPaginacao({
        paginaAtual: response.paginaAtual + 1,
        totalPaginas: response.totalPaginas,
        itensPorPagina: response.itensPorPagina,
        totalItens: response.totalItens,
      });
    } catch (error) {
      const mensagem = handleApiError(error);
      setErro(mensagem);
    } finally {
      setIsLoading(false);
    }
  }, [busca, paginacao.itensPorPagina]);

  useEffect(() => {
    carregarPerfis(1);
  }, [carregarPerfis]);

  const handleSuspender = async (id: number, nome: string) => {
    setPerfilToDelete({ id, nome });
    setDeleteModalOpen(true);
  };

  const confirmSuspender = async () => {
    if (!perfilToDelete) return;

    try {
      await perfilService.suspender(perfilToDelete.id, true);
      setSucesso(`Perfil "${perfilToDelete.nome}" suspenso com sucesso!`);
      carregarPerfis(paginacao.paginaAtual);
      setTimeout(() => setSucesso(null), 3000);
    } catch (error) {
      const mensagem = handleApiError(error);
      setErro(mensagem);
    } finally {
      setDeleteModalOpen(false);
      setPerfilToDelete(null);
    }
  };

  const handleHabilitar = async (id: number, nome: string) => {
    try {
      await perfilService.habilitar(id);
      setSucesso(`Perfil "${nome}" habilitado com sucesso!`);
      carregarPerfis(paginacao.paginaAtual);
      setTimeout(() => setSucesso(null), 3000);
    } catch (error) {
      const mensagem = handleApiError(error);
      setErro(mensagem);
    }
  };

  return (
    <PrivateLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Perfis</h1>
            <button
              onClick={() => navigate('/admin/perfis/criar')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Perfil
            </button>
          </div>

          {/* Mensagens */}
          {erro && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{erro}</p>
                </div>
              </div>
            </div>
          )}

          {sucesso && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{sucesso}</p>
                </div>
              </div>
            </div>
          )}

          {/* Busca */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nome do perfil..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : perfis.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">Nenhum perfil encontrado</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuários
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {perfis.map(perfil => (
                      <tr key={perfil.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{perfil.nome}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2">{perfil.descricao}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {perfil.quantidadeUsuarios}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              perfil.ativo
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {perfil.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admin/perfis/editar/${perfil.id}`)}
                              className="text-blue-600 hover:text-blue-900 transition-colors cursor-pointer"
                              title="Editar"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {perfil.ativo ? (
                              <button
                                onClick={() => handleSuspender(perfil.id, perfil.nome)}
                                className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                                title="Suspender"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleHabilitar(perfil.id, perfil.nome)}
                                className="text-green-600 hover:text-green-900 transition-colors cursor-pointer"
                                title="Habilitar"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {perfis.map(perfil => (
                  <div key={perfil.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          {perfil.nome}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {perfil.descricao}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {perfil.quantidadeUsuarios} usuários
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            perfil.ativo
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {perfil.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/perfis/editar/${perfil.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                        title="Editar"
                      >
                        <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                        {perfil.ativo ? (
                          <button
                            onClick={() => handleSuspender(perfil.id, perfil.nome)}
                            className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                            title="Suspender"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleHabilitar(perfil.id, perfil.nome)}
                            className="text-green-600 hover:text-green-900 transition-colors cursor-pointer"
                            title="Habilitar"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginação - só exibe se houver mais de uma página */}
              {paginacao.totalPaginas > 1 && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Mostrando <span className="font-medium">{(paginacao.paginaAtual - 1) * paginacao.itensPorPagina + 1}</span> até{' '}
                    <span className="font-medium">{Math.min(paginacao.paginaAtual * paginacao.itensPorPagina, paginacao.totalItens)}</span> de{' '}
                    <span className="font-medium">{paginacao.totalItens}</span> perfis
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => carregarPerfis(paginacao.paginaAtual - 1)}
                      disabled={paginacao.paginaAtual === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: paginacao.totalPaginas }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => carregarPerfis(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            page === paginacao.paginaAtual
                              ? 'bg-[#195CE3] text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => carregarPerfis(paginacao.paginaAtual + 1)}
                      disabled={paginacao.paginaAtual === paginacao.totalPaginas}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setPerfilToDelete(null);
          }}
          onConfirm={confirmSuspender}
          title="Suspender Perfil"
          message={`Tem certeza de que deseja suspender o perfil "${perfilToDelete?.nome}"? Esta ação pode ser revertida posteriormente.`}
          confirmText="Suspender"
          cancelText="Cancelar"
        />
      </div>
    </PrivateLayout>
  );
};
