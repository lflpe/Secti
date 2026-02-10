import { useState, useMemo } from 'react';

export interface NoticiaItem {
  id: number;
  slug: string;
  titulo: string;
  categoria: string;
  autor: string;
  dataPublicacao: string; // formato: 'YYYY-MM-DD'
  resumo: string;
  imagem: string;
  link: string;
}

interface NoticiasListProps {
  noticias: NoticiaItem[];
}

export const NoticiasList = ({ noticias }: NoticiasListProps) => {
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 10;

  // Extrair categorias únicas
  const categorias = useMemo(() => {
    const categoriasSet = new Set(noticias.map(noticia => noticia.categoria));
    return ['Todas', ...Array.from(categoriasSet).sort()];
  }, [noticias]);

  // Extrair anos únicos
  const anos = useMemo(() => {
    const anosSet = noticias.map(noticia => {
      return new Date(noticia.dataPublicacao).getFullYear().toString();
    });
    return ['Todos', ...Array.from(new Set(anosSet)).sort((a, b) => b.localeCompare(a))];
  }, [noticias]);

  // Extrair meses únicos baseado no ano selecionado
  const meses = useMemo(() => {
    if (filtroAno === '' || filtroAno === 'Todos') {
      return ['Todos'];
    }

    const mesesSet = noticias
      .filter(noticia => new Date(noticia.dataPublicacao).getFullYear().toString() === filtroAno)
      .map(noticia => new Date(noticia.dataPublicacao).getMonth());

    const mesesNomes = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const mesesDisponiveis = Array.from(new Set(mesesSet))
      .sort((a, b) => b - a)
      .map(mes => ({ valor: mes.toString(), nome: mesesNomes[mes] }));

    return [{ valor: 'Todos', nome: 'Todos' }, ...mesesDisponiveis];
  }, [noticias, filtroAno]);

  // Filtrar e ordenar notícias (mais recente primeiro)
  const noticiasFiltradas = useMemo(() => {
    return noticias
      .filter(noticia => {
        const matchTitulo = noticia.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) ||
                           noticia.resumo.toLowerCase().includes(filtroTitulo.toLowerCase()) ||
                           noticia.autor.toLowerCase().includes(filtroTitulo.toLowerCase());
        const matchCategoria = filtroCategoria === '' || filtroCategoria === 'Todas' || noticia.categoria === filtroCategoria;

        const dataNoticia = new Date(noticia.dataPublicacao);
        const anoNoticia = dataNoticia.getFullYear().toString();
        const mesNoticia = dataNoticia.getMonth().toString();

        const matchAno = filtroAno === '' || filtroAno === 'Todos' || anoNoticia === filtroAno;
        const matchMes = filtroMes === '' || filtroMes === 'Todos' || mesNoticia === filtroMes;

        return matchTitulo && matchCategoria && matchAno && matchMes;
      })
      .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());
  }, [filtroTitulo, filtroCategoria, filtroAno, filtroMes, noticias]);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);

  // Garantir que a página atual não exceda o total de páginas
  const paginaAtualValida = Math.min(paginaAtual, Math.max(1, totalPaginas));

  // Notícias da página atual
  const noticiasPaginadas = useMemo(() => {
    const inicio = (paginaAtualValida - 1) * noticiasPorPagina;
    const fim = inicio + noticiasPorPagina;
    return noticiasFiltradas.slice(inicio, fim);
  }, [noticiasFiltradas, paginaAtualValida]);

  // Função para mudar de página
  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para alterar filtros com reset de página
  const handleFiltroChange = (tipo: 'titulo' | 'categoria' | 'ano' | 'mes', valor: string) => {
    switch (tipo) {
      case 'titulo':
        setFiltroTitulo(valor);
        break;
      case 'categoria':
        setFiltroCategoria(valor);
        break;
      case 'ano':
        setFiltroAno(valor);
        setFiltroMes(''); // Reset mês quando ano muda
        break;
      case 'mes':
        setFiltroMes(valor);
        break;
    }
    setPaginaAtual(1); // Reset página para 1
  };

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para obter cor da categoria
  const getCorCategoria = (categoria: string) => {
    const cores: Record<string, string> = {
      'Inovacao': 'bg-blue-500 text-white',
      'Educacao': 'bg-green-500 text-white',
      'Pesquisa': 'bg-purple-500 text-white',
      'Eventos': 'bg-orange-500 text-white',
      'Parcerias': 'bg-indigo-500 text-white',
      'Negocios': 'bg-red-500 text-white',
    };

    // Normalizar categoria removendo acentos para busca
    const categoriaNormalizada = categoria
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c');

    return cores[categoriaNormalizada] || 'bg-gray-500 text-white';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-bold text-[#0C2856] mb-6">Filtrar Notícias</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro por Título/Conteúdo */}
          <div>
            <label htmlFor="filtroTitulo" className="block text-sm font-medium text-gray-700 mb-2">
              Buscar notícia
            </label>
            <input
              type="text"
              id="filtroTitulo"
              value={filtroTitulo}
              onChange={(e) => handleFiltroChange('titulo', e.target.value)}
              placeholder="Digite título, autor ou conteúdo..."
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
              onChange={(e) => handleFiltroChange('categoria', e.target.value)}
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
              onChange={(e) => handleFiltroChange('ano', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none"
            >
              {anos.map(ano => (
                <option key={ano} value={ano === 'Todos' ? '' : ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Mês */}
          <div>
            <label htmlFor="filtroMes" className="block text-sm font-medium text-gray-700 mb-2">
              Mês
            </label>
            <select
              id="filtroMes"
              value={filtroMes}
              onChange={(e) => handleFiltroChange('mes', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C2856] focus:border-transparent outline-none"
              disabled={filtroAno === '' || filtroAno === 'Todos'}
            >
              {meses.map(mes => (
                <option key={typeof mes === 'object' ? mes.valor : mes} value={typeof mes === 'object' ? (mes.valor === 'Todos' ? '' : mes.valor) : (mes === 'Todos' ? '' : mes)}>
                  {typeof mes === 'object' ? mes.nome : mes}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {noticiasFiltradas.length} {noticiasFiltradas.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
          {totalPaginas > 1 && (
            <span className="ml-2">
              - Página {paginaAtualValida} de {totalPaginas}
            </span>
          )}
        </div>
      </div>

      {/* Lista de Notícias */}
      <div className="space-y-6">
        {noticiasFiltradas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-xl text-gray-600">Nenhuma notícia encontrada</p>
            <p className="text-gray-500 mt-2">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <>
            {noticiasPaginadas.map(noticia => (
              <article key={noticia.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  {/* Imagem */}
                  <div className="md:w-1/3 flex items-center justify-center bg-gray-100">
                    <div className="w-full h-48 md:h-48 flex items-center justify-center overflow-hidden">
                      <img
                        src={noticia.imagem}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCorCategoria(noticia.categoria)}`}>
                        {noticia.categoria}
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatarData(noticia.dataPublicacao)}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-[#0C2856] mb-3 line-clamp-2">
                      <a
                        href={noticia.link}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {noticia.titulo}
                      </a>
                    </h2>

                    <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                      {noticia.resumo}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Por <strong>{noticia.autor}</strong></span>
                      </div>

                      <a
                        href={noticia.link}
                        className="inline-flex items-center gap-2 bg-[#195CE3] text-white px-4 py-2 rounded-lg hover:bg-[#0C2856] transition duration-200 font-medium text-sm"
                      >
                        Ler mais
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pt-8">
                {/* Botão Anterior */}
                <button
                  onClick={() => irParaPagina(paginaAtualValida - 1)}
                  disabled={paginaAtualValida === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    paginaAtualValida === 1
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
                      (numero >= paginaAtualValida - 1 && numero <= paginaAtualValida + 1)
                    ) {
                      return (
                        <button
                          key={numero}
                          onClick={() => irParaPagina(numero)}
                          className={`w-10 h-10 rounded-lg font-medium transition duration-200 ${
                            paginaAtualValida === numero
                              ? 'bg-[#0C2856] text-white'
                              : 'bg-white cursor-pointer text-[#0C2856] border border-gray-300 hover:border-[#0C2856] hover:bg-gray-50'
                          }`}
                        >
                          {numero}
                        </button>
                      );
                    } else if (
                      numero === paginaAtualValida - 2 ||
                      numero === paginaAtualValida + 2
                    ) {
                      return <span key={numero} className="px-2 py-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Botão Próximo */}
                <button
                  onClick={() => irParaPagina(paginaAtualValida + 1)}
                  disabled={paginaAtualValida === totalPaginas}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    paginaAtualValida === totalPaginas
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
