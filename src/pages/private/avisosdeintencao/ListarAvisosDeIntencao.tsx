import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarAvisosIntencaoContratar as ListarAvisosIntencaoContratarComponent, type AvisoIntencaoContratar } from '../../../components/admin/ListarAvisosIntencaoContratar';
import { avisosIntencaoContratarService, type AvisoIntencaoContratarListFilters } from '../../../services/avisosIntencaoContratarService';
import { tagService, type Tag } from '../../../services/tagService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListarAvisosDeIntencao = () => {
  const [avisos, setAvisos] = useState<AvisoIntencaoContratar[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
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

  const getTipoFromNome = (nomeArquivo?: string, caminhoArquivo?: string): AvisoIntencaoContratar['tipo'] => {
    const origem = nomeArquivo || caminhoArquivo || '';
    const parts = origem.split('.');
    if (parts.length < 2) return 'outro';
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return ext;
    }
    return 'outro';
  };

  const carregarAvisos = useCallback(async (
    page = 1,
    categoria?: string,
    tituloFiltro = '',
    tipoFiltro = 'Todos'
  ) => {
    setIsLoading(true);
    setErro(null);
    try {
      // Se há filtros locais (título ou tipo), busca todos para filtrar no cliente
      const precisaFiltroLocal = tituloFiltro || tipoFiltro !== 'Todos';

      const filtros: AvisoIntencaoContratarListFilters = {
        ordenarPor: 'titulo',
        ordenarDescendente: false,
        apenasAtivos: true,
        pagina: precisaFiltroLocal ? 1 : page,
        itensPorPagina: precisaFiltroLocal ? 10000 : itemsPerPage,
      };

      if (categoria) {
        filtros.categoria = categoria;
      }

      const response = await avisosIntencaoContratarService.listar(filtros);

      let avisosFormatados: AvisoIntencaoContratar[] = response.avisos.map((aviso) => ({
        id: aviso.id,
        nome: aviso.titulo,
        tipo: getTipoFromNome(aviso.nomeArquivo, aviso.caminhoArquivo),
        categoria: aviso.categoria,
        anoPublicacao: aviso.anoPublicacao,
        caminhoArquivo: aviso.caminhoArquivo,
        nomeArquivo: aviso.nomeArquivo,
      }));

      // Filtro por título no cliente (API não tem filtro por título)
      if (tituloFiltro) {
        avisosFormatados = avisosFormatados.filter(a =>
          a.nome.toLowerCase().includes(tituloFiltro.toLowerCase())
        );
      }

      // Filtro por tipo no cliente (API não tem filtro por tipo de arquivo)
      if (tipoFiltro && tipoFiltro !== 'Todos') {
        avisosFormatados = avisosFormatados.filter(a =>
          a.tipo === tipoFiltro
        );
      }

      // Paginação no cliente quando há filtros locais
      if (precisaFiltroLocal) {
        setTotalItens(avisosFormatados.length);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setAvisos(avisosFormatados.slice(start, end));
      } else {
        setAvisos(avisosFormatados);
        setTotalItens(response.totalItens);
      }

      setCurrentPage(page);
    } catch (error) {
      const mensagemErro = handleApiError(error);
      setErro(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

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
    carregarAvisos();
  }, [carregarAvisos]);

  useEffect(() => {
    carregarTags();
  }, [carregarTags]);

  // Buscar avisos via endpoint
  const handleSearch = () => {
    carregarAvisos(1, filtroCategoria || undefined, busca, filtroTipo);
  };

  // Limpar filtros
  const handleClearSearch = () => {
    setBusca('');
    setFiltroTipo('Todos');
    setFiltroCategoria('');
    carregarAvisos(1, undefined, '', 'Todos');
  };

  const handleDelete = async (id: number) => {
    try {
      await avisosIntencaoContratarService.inativar(id);
      // Recarregar lista mantendo filtros
      await carregarAvisos(currentPage, filtroCategoria || undefined, busca, filtroTipo);
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
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Avisos de Intenção</h1>
            <p className="text-gray-600 mt-2">
              {isLoading ? 'Carregando...' : `${totalItens} ${totalItens === 1 ? 'aviso encontrado' : 'avisos encontrados'}`}
            </p>
          </div>
          <Link
            to="/admin/avisosdeintencao/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Aviso
          </Link>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar avisos</h3>
                <p className="text-sm text-red-700 mt-1">{erro}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por Título
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
                  placeholder="Digite o título do aviso..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                />
              </div>
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
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
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

            {/* Filtro por Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Arquivo
              </label>
              <select
                id="tipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              >
                <option value="Todos">Todos</option>
                <option value="pdf">PDF</option>
                <option value="xls">XLS</option>
                <option value="xlsx">XLSX</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            {/* Botões de ação */}
            <div className="md:col-span-4 flex gap-2 flex-col sm:flex-row">
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
                className="flex-1 sm:flex-auto px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-sm text-gray-500">Carregando avisos...</p>
          </div>
        ) : (
          <ListarAvisosIntencaoContratarComponent
            avisos={avisos}
            onDelete={handleDelete}
            emptyStateTitle="Nenhum aviso encontrado"
            emptyStateDescription="Crie um novo aviso para começar"
            showHeader={false}
          />
        )}
      </div>
    </PrivateLayout>
  );
};
