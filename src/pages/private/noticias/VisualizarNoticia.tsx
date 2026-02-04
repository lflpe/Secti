import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { DeleteModal } from '../../../components/admin/DeleteModal';

export const VisualizarNoticiaAdmin = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [noticia, setNoticia] = useState({
    id: 1,
    slug: '',
    titulo: '',
    categoria: '',
    autor: '',
    dataPublicacao: '',
    resumo: '',
    conteudo: '',
    imagemDestaque: '',
    status: 'Publicada' as 'Publicada' | 'Rascunho' | 'Arquivada',
  });

  useEffect(() => {
    const carregarNoticia = async () => {
      setIsLoading(true);
      try {
        // Simular chamada à API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Dados mockados - substituir por chamada real à API
        const noticiaMock = {
          id: 1,
          slug: slug || '',
          titulo: 'Pernambuco lança novo programa de inovação tecnológica',
          categoria: 'Inovação',
          autor: 'Redação SECTI',
          dataPublicacao: '15 de dezembro de 2024',
          resumo: 'Iniciativa visa fomentar startups e projetos inovadores no estado com investimento de R$ 50 milhões.',
          conteudo: `
            <p>O Governo de Pernambuco, por meio da Secretaria de Ciência, Tecnologia e Inovação (SECTI), apresentou nesta segunda-feira (15) o novo Programa Estadual de Inovação Tecnológica, uma iniciativa que prevê investimentos de R$ 50 milhões em startups, pesquisas e desenvolvimento de tecnologias sustentáveis.</p>
            
            <p>O programa foi lançado durante evento realizado no Porto Digital, em Recife, e contou com a presença do governador, secretários de estado e representantes do setor empresarial e acadêmico.</p>
            
            <h3>Objetivos do Programa</h3>
            
            <p>Entre os principais objetivos do programa estão:</p>
            
            <ul>
              <li>Fomentar o ecossistema de inovação em Pernambuco</li>
              <li>Apoiar startups em fase inicial e de crescimento</li>
              <li>Incentivar pesquisas aplicadas em parceria com universidades</li>
              <li>Promover a transferência de tecnologia para o setor produtivo</li>
              <li>Desenvolver soluções tecnológicas para desafios sociais e ambientais</li>
            </ul>
            
            <h3>Linhas de Financiamento</h3>
            
            <p>O programa oferecerá diferentes linhas de financiamento:</p>
            
            <p><strong>Startups Emergentes:</strong> Até R$ 200 mil para empresas em fase de validação de modelo de negócio.</p>
            
            <p><strong>Crescimento e Escalabilidade:</strong> De R$ 200 mil a R$ 1 milhão para startups em expansão.</p>
            
            <p><strong>Pesquisa e Desenvolvimento:</strong> Até R$ 500 mil para projetos de P&D em parceria com instituições de ensino.</p>
            
            <h3>Como Participar</h3>
            
            <p>As inscrições para o programa estarão abertas a partir de janeiro de 2025, através do portal da SECTI. Startups e pesquisadores interessados poderão submeter suas propostas que serão avaliadas por uma comissão técnica especializada.</p>
            
            <p>Para mais informações, acesse o site oficial da SECTI ou entre em contato pelos canais de atendimento.</p>
          `,
          imagemDestaque: 'https://via.placeholder.com/1200x600?text=Programa+de+Inova%C3%A7%C3%A3o+Tecnol%C3%B3gica',
          status: 'Publicada' as 'Publicada' | 'Rascunho' | 'Arquivada',
        };

        setNoticia(noticiaMock);
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarNoticia();
  }, [slug]);

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Simular exclusão
    console.log('Notícia excluída:', noticia.id);
    navigate('/admin/noticias');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicada':
        return 'bg-green-100 text-green-800';
      case 'Rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'Arquivada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <PrivateLayout>
        <div className="flex items-center justify-center min-h-100">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-[#0C2856] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600">Carregando notícia...</p>
          </div>
        </div>
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header com Ações */}
        <div className="flex items-center justify-between">
          <Link
            to="/admin/noticias"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0C2856] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para lista
          </Link>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(noticia.status)}`}>
              {noticia.status}
            </span>
            <Link
              to={`/admin/noticias/editar/${noticia.slug}`}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex cursor-pointer items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Excluir
            </button>
          </div>
        </div>

        {/* Conteúdo da Notícia */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Imagem de Destaque */}
          <div className="relative h-96 bg-gray-200">
            <img
              src={noticia.imagemDestaque}
              alt={noticia.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=Sem+Imagem';
              }}
            />
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {noticia.categoria}
              </span>
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {noticia.autor}
              </span>
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {noticia.dataPublicacao}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {noticia.titulo}
            </h1>

            {/* Resumo */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {noticia.resumo}
            </p>

            {/* Conteúdo HTML */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />
          </div>
        </article>

        {/* Info Adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900">Visualização Administrativa</p>
              <p className="text-sm text-blue-700 mt-1">
                Esta é a visualização da notícia na área administrativa. Para ver como ela aparece no site público,
                acesse: <a href={`/noticias/${noticia.slug}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                  /noticias/{noticia.slug}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title={`Excluir notícia "${noticia.titulo}"`}
          message="Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita."
        />
      </div>
    </PrivateLayout>
  );
};
