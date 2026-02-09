import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { ListarEditais, type Edital } from '../../../components/admin/ListarEditais';
import { editaisService, type EditalListFilters } from '../../../services/editaisService';
import { handleApiError } from '../../../utils/errorHandler';

export const ListarEdital = () => {
  const [editais, setEditais] = useState<Edital[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [filtroAno, setFiltroAno] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [totalItens, setTotalItens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getTipoFromNome = (nomeArquivo?: string, caminhoArquivo?: string): Edital['tipo'] => {
    const origem = nomeArquivo || caminhoArquivo || '';
    const parts = origem.split('.');
    if (parts.length < 2) return 'outro';
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return ext;
    }
    return 'outro';
  };

  const carregarEditais = useCallback(async (
    page = 1,
    ano?: number,
    categoria?: string,
    tituloFiltro = '',
    tipoFiltro = 'Todos'
  ) => {
    setIsLoading(true);
    setErro(null);
    try {
      // Se há filtros locais (título ou tipo), busca todos para filtrar no cliente
      const precisaFiltroLocal = tituloFiltro || tipoFiltro !== 'Todos';

      const filtros: EditalListFilters = {
        ordenarPor: 'titulo',
        ordenarDescendente: false,
        apenasAtivos: true,
        pagina: precisaFiltroLocal ? 1 : page,
        itensPorPagina: precisaFiltroLocal ? 10000 : itemsPerPage,
      };

      if (ano) {
        // Para editais, o filtro por ano é baseado em anoPublicacao
        // Como a API não tem filtro direto por ano, vamos buscar todos e filtrar no cliente
        filtros.pagina = 1;
        filtros.itensPorPagina = 10000;
      }
      if (categoria) {
        filtros.categoria = categoria;
      }

      const response = await editaisService.listar(filtros);

      // Filtrar apenas editais ativos (backup caso apenasAtivos não funcione)
      const editaisAtivos = response.editais.filter((edital) => edital.ativo);

      let editaisFormatados: Edital[] = editaisAtivos.map((edital) => ({
        id: edital.id,
        nome: edital.titulo,
        tipo: getTipoFromNome(edital.nomeArquivo, edital.caminhoArquivo),
        categoria: edital.categoria,
        anoPublicacao: edital.anoPublicacao,
        caminhoArquivo: edital.caminhoArquivo,
        nomeArquivo: edital.nomeArquivo,
      }));

      // Filtro por ano no cliente (se especificado)
      if (ano) {
        editaisFormatados = editaisFormatados.filter(e => e.anoPublicacao === ano);
      }

      // Filtro por título no cliente (API não tem filtro por título)
      if (tituloFiltro) {
        editaisFormatados = editaisFormatados.filter(e =>
          e.nome.toLowerCase().includes(tituloFiltro.toLowerCase())
        );
      }

      // Filtro por tipo no cliente (API não tem filtro por tipo de arquivo)
      if (tipoFiltro && tipoFiltro !== 'Todos') {
        editaisFormatados = editaisFormatados.filter(e =>
          e.tipo === tipoFiltro
        );
      }

      // Paginação no cliente quando há filtros locais
      if (precisaFiltroLocal || ano) {
        setTotalItens(editaisFormatados.length);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setEditais(editaisFormatados.slice(start, end));
      } else {
        setEditais(editaisFormatados);
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

  useEffect(() => {
    carregarEditais();
  }, [carregarEditais]);

  // Buscar editais via endpoint
  const handleSearch = () => {
    const ano = filtroAno ? Number(filtroAno) : undefined;
    carregarEditais(1, ano, filtroCategoria || undefined, busca, filtroTipo);
  };

  // Limpar filtros
  const handleClearSearch = () => {
    setBusca('');
    setFiltroTipo('Todos');
    setFiltroAno('');
    setFiltroCategoria('');
    carregarEditais(1, undefined, undefined, '', 'Todos');
  };

  const handleDelete = async (id: number) => {
    try {
      await editaisService.inativar(id);
      // Recarregar lista mantendo filtros
      const ano = filtroAno ? Number(filtroAno) : undefined;
      await carregarEditais(currentPage, ano, filtroCategoria || undefined, busca, filtroTipo);
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
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Editais</h1>
            <p className="text-gray-600 mt-2">
              {isLoading ? 'Carregando...' : `${totalItens} ${totalItens === 1 ? 'edital encontrado' : 'editais encontrados'}`}
            </p>
          </div>
          <Link
            to="/admin/editais/criar"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0C2856] text-white font-medium rounded-lg hover:bg-[#195CE3] transition-colors whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Edital
          </Link>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar editais</h3>
                <p className="text-sm text-red-700 mt-1">{erro}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="Digite o nome..."
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
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                placeholder="Ex: Licitações"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              />
            </div>

            {/* Filtro por Ano */}
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-2">
                Ano de Publicação
              </label>
              <input
                type="number"
                id="ano"
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                placeholder="Ex: 2024"
                min={1900}
                max={3000}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              />
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
            <p className="text-sm text-gray-500">Carregando editais...</p>
          </div>
        ) : (
          <ListarEditais
            editais={editais}
            onDelete={handleDelete}
            emptyStateTitle="Nenhum edital encontrado"
            emptyStateDescription="Crie um novo edital para começar"
            showHeader={false}
          />
        )}
      </div>
    </PrivateLayout>
  );
};
