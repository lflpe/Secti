import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { TabelaNoticias, type NoticiaAdmin } from '../../../components/admin/TabelaNoticias';

// Dados mockados - substituir por chamada à API
const noticiasMock: NoticiaAdmin[] = [
  {
    id: 1,
    slug: 'programa-inovacao-tecnologica',
    titulo: 'Pernambuco lança novo programa de inovação tecnológica',
    categoria: 'Inovação',
    autor: 'Redação SECTI',
    dataPublicacao: '15/12/2024',
    status: 'Publicada',
  },
  {
    id: 2,
    slug: 'exposicao-sustentabilidade',
    titulo: 'Espaço Ciência recebe nova exposição interativa sobre sustentabilidade',
    categoria: 'Educação',
    autor: 'Marina Santos',
    dataPublicacao: '12/12/2024',
    status: 'Publicada',
  },
  {
    id: 3,
    slug: 'incubadora-startups-2025',
    titulo: 'Parqtel abre inscrições para incubadora de startups 2025',
    categoria: 'Negócios',
    autor: 'Carlos Oliveira',
    dataPublicacao: '10/12/2024',
    status: 'Publicada',
  },
  {
    id: 4,
    slug: 'hackathon-ciencia-dados',
    titulo: 'Hackathon de Ciência de Dados acontece em Recife',
    categoria: 'Eventos',
    autor: 'Ana Paula Ferreira',
    dataPublicacao: '08/12/2024',
    status: 'Rascunho',
  },
  {
    id: 5,
    slug: 'parceria-universidades-europeias',
    titulo: 'SECTI firma parceria com universidades europeias',
    categoria: 'Parcerias',
    autor: 'Roberto Silva',
    dataPublicacao: '05/12/2024',
    status: 'Publicada',
  },
  {
    id: 6,
    slug: 'certificacao-biotecnologia',
    titulo: 'Laboratório de Biotecnologia recebe certificação internacional',
    categoria: 'Pesquisa',
    autor: 'Dra. Fernanda Costa',
    dataPublicacao: '03/12/2024',
    status: 'Arquivada',
  },
];

export const ListaNoticias = () => {
  const [noticias, setNoticias] = useState<NoticiaAdmin[]>(noticiasMock);
  const [filtroStatus, setFiltroStatus] = useState<string>('Todas');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
  const [busca, setBusca] = useState<string>('');

  // Filtrar notícias
  const noticiasFiltradas = noticias.filter((noticia) => {
    const matchStatus = filtroStatus === 'Todas' || noticia.status === filtroStatus;
    const matchCategoria = filtroCategoria === 'Todas' || noticia.categoria === filtroCategoria;
    const matchBusca = noticia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       noticia.autor.toLowerCase().includes(busca.toLowerCase());

    return matchStatus && matchCategoria && matchBusca;
  });

  // Função para excluir notícia
  const handleDelete = (id: number) => {
    setNoticias(noticias.filter(n => n.id !== id));
  };

  // Obter categorias únicas
  const categorias = ['Todas', ...Array.from(new Set(noticias.map(n => n.categoria)))];

  return (
    <PrivateLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Notícias</h1>
            <p className="text-gray-600 mt-2">
              {noticiasFiltradas.length} {noticiasFiltradas.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
            </p>
          </div>
          <Link
            to="/admin/noticias/criar"
            className="inline-flex items-center gap-2 bg-[#0C2856] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#195CE3] transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nova Notícia</span>
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div>
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
                  placeholder="Buscar por título ou autor..."
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
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                <option value="Publicada">Publicada</option>
                <option value="Rascunho">Rascunho</option>
                <option value="Arquivada">Arquivada</option>
              </select>
            </div>

            {/* Filtro Categoria */}
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
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Publicadas</p>
                <p className="text-2xl font-bold text-green-600">
                  {noticias.filter(n => n.status === 'Publicada').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rascunhos</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {noticias.filter(n => n.status === 'Rascunho').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Arquivadas</p>
                <p className="text-2xl font-bold text-gray-600">
                  {noticias.filter(n => n.status === 'Arquivada').length}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Notícias */}
        <TabelaNoticias noticias={noticiasFiltradas} onDelete={handleDelete} />
      </div>
    </PrivateLayout>
  );
};
