import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarDocumentos as ListarDocumentosComponent, type Documento } from '../../../components/admin/ListarDocumentos';
import { documentosService, type DocumentoListFilters, type DocumentoListResponse } from '../../../services/documentosService';
import { tagService, type Tag } from '../../../services/tagService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListarDocumentos = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [filtroAno, setFiltroAno] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [erroTags, setErroTags] = useState<string | null>(null);
  const [totalItens, setTotalItens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [tags, setTags] = useState<Tag[]>([]);

  const getTipoFromNome = (nomeArquivo?: string, caminhoArquivo?: string): Documento['tipo'] => {
    const origem = nomeArquivo || caminhoArquivo || '';
    const parts = origem.split('.');
    if (parts.length < 2) return 'outro';
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return ext;
    }
    return 'outro';
  };

  // Carregar documentos com paginacao servidor
  const carregarDocumentos = useCallback(async (page = 1, anoFiltro?: number, categoriaFiltro?: string) => {
    setIsLoading(true);
    setErro(null);
    try {
      const tituloFiltro = busca.trim();
      const filtros: DocumentoListFilters = {
        ordenarPor: 'dataPublicacao',
        ordenarDescendente: true,
        pagina: page,
        itensPorPagina: itemsPerPage,
        ativo: true,
      };

      if (anoFiltro) {
        filtros.ano = anoFiltro;
      }
      if (categoriaFiltro) {
        filtros.categoria = categoriaFiltro;
      }
      if (tituloFiltro) {
        filtros.titulo = tituloFiltro;
      }

      const response: DocumentoListResponse = await documentosService.listar(filtros);

      const documentosFormatados: Documento[] = response.documentos.map((doc) => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: getTipoFromNome(doc.nomeArquivo, doc.caminhoArquivo),
        dataPublicacao: doc.dataPublicacao,
        caminhoArquivo: doc.caminhoArquivo,
        nomeArquivo: doc.nomeArquivo,
        tags: doc.tags,
      }));

      setDocumentos(documentosFormatados);
      setTotalItens(response.totalItens);
      setCurrentPage(page);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  }, [busca, itemsPerPage]);

  const carregarTags = useCallback(async () => {
    setIsLoadingTags(true);
    setErroTags(null);
    try {
      const response = await tagService.listar({
        apenasAtivas: true,
        pagina: 1,
        itensPorPagina: 1000,
      });
      const tagsOrdenadas = [...response.itens].sort((a, b) => a.nome.localeCompare(b.nome));
      setTags(tagsOrdenadas);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErroTags(mensagemErro);
    } finally {
      setIsLoadingTags(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  useEffect(() => {
    carregarTags();
  }, [carregarTags]);

  // Buscar documentos via endpoint
  const handleSearch = () => {
    const ano = filtroAno ? Number(filtroAno) : undefined;
    carregarDocumentos(1, ano, filtroCategoria || undefined);
  };

  // Limpar filtros
  const handleClearSearch = () => {
    setBusca('');
    setFiltroAno('');
    setFiltroCategoria('');
    carregarDocumentos(1, undefined, undefined);
  };

  const handleDelete = async (id: number) => {
    try {
      await documentosService.inativar(id);
      // Recarregar lista mantendo filtros
      const ano = filtroAno ? Number(filtroAno) : undefined;
      await carregarDocumentos(currentPage, ano, filtroCategoria || undefined);
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
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Documentos</h1>
            <p className="text-gray-600 mt-2">
              {isLoading ? 'Carregando...' : `${totalItens} ${totalItens === 1 ? 'documento encontrado' : 'documentos encontrados'}`}
            </p>
          </div>
          <Link
            to="/admin/documentos/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Documento
          </Link>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar documentos</h3>
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
                  placeholder="Digite o nome do documento..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por Ano */}
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-2">
                Data de Publicação
              </label>
              <input
                type="number"
                id="ano"
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
                placeholder="Ex: 2024"
                min={1900}
                max={3000}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              />
            </div>
            {/* Filtro por Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.nome}>
                    {tag.nome}
                  </option>
                ))}
              </select>
              {isLoadingTags && (
                <p className="mt-1 text-xs text-gray-500">Carregando categorias...</p>
              )}
              {erroTags && (
                <p className="mt-1 text-xs text-red-600">{erroTags}</p>
              )}
            </div>


            {/* Botões de ação */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                disabled={isLoading || (!busca.trim() && !filtroCategoria && !filtroAno)}
                className="flex-1 cursor-pointer bg-[#0C2856] text-white px-4 py-2 rounded-md hover:bg-[#195CE3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={handleClearSearch}
                disabled={isLoading || (!busca.trim() && !filtroCategoria && !filtroAno)}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-sm text-gray-500">Carregando documentos...</p>
          </div>
        ) : (
          <>
            <ListarDocumentosComponent
              documentos={documentos}
              onDelete={handleDelete}
              emptyStateTitle="Nenhum documento encontrado"
              emptyStateDescription="Crie um novo documento para começar"
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
                    onClick={() => {
                      const ano = filtroAno ? Number(filtroAno) : undefined;
                      carregarDocumentos(currentPage - 1, ano, filtroCategoria || undefined);
                    }}
                    disabled={currentPage === 1 || isLoading}
                    className="px-3 py-1 border cursor-pointer border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Anterior
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{Math.ceil(totalItens / itemsPerPage)}</span>
                  </span>
                  <button
                    onClick={() => {
                      const ano = filtroAno ? Number(filtroAno) : undefined;
                      carregarDocumentos(currentPage + 1, ano, filtroCategoria || undefined);
                    }}
                    disabled={currentPage === Math.ceil(totalItens / itemsPerPage) || isLoading}
                    className="px-3 py-1 cursor-pointer border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
