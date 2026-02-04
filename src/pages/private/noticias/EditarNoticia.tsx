import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { NoticiaForm } from '../../../components/admin/NoticiaForm';

interface NoticiaFormData {
  titulo: string;
  slug: string;
  categoria: string;
  autor: string;
  resumo: string;
  conteudo: string;
  imagemDestaque: string;
  imagemArquivo: File | null;
  status: 'Publicada' | 'Rascunho' | 'Arquivada';
  destaque: boolean;
}

export const EditarNoticia = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<NoticiaFormData | null>(null);

  useEffect(() => {
    // Simular carregamento dos dados da notícia
    const carregarNoticia = async () => {
      setIsLoading(true);
      try {
        // Simular chamada à API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Dados mockados - substituir por chamada real à API
        const noticiaMock: NoticiaFormData = {
          titulo: 'Pernambuco lança novo programa de inovação tecnológica',
          slug: slug || '',
          categoria: 'Inovação',
          autor: 'Redação SECTI',
          resumo: 'Iniciativa visa fomentar startups e projetos inovadores no estado.',
          conteudo: '<p>O Governo de Pernambuco, por meio da Secretaria de Ciência, Tecnologia e Inovação (SECTI), apresentou nesta segunda-feira (15) o novo Programa Estadual de Inovação Tecnológica.</p><p>A iniciativa prevê investimentos de R$ 50 milhões em startups, pesquisas e desenvolvimento de tecnologias sustentáveis.</p>',
          imagemDestaque: 'https://via.placeholder.com/800x400?text=Programa+de+Inovação',
          imagemArquivo: null as File | null,
          status: 'Publicada' as 'Publicada' | 'Rascunho' | 'Arquivada',
          destaque: true,
        };

        setInitialData(noticiaMock);
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
        alert('Erro ao carregar notícia.');
      } finally {
        setIsLoading(false);
      }
    };

    carregarNoticia();
  }, [slug]);

  const handleSubmit = async (formData: NoticiaFormData) => {
    setIsSubmitting(true);

    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Notícia atualizada:', formData);

      // Redirecionar para lista de notícias
      navigate('/admin/noticias');
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
      alert('Erro ao atualizar notícia. Tente novamente.');
    } finally {
      setIsSubmitting(false);
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Notícia</h1>
            <p className="text-gray-600 mt-2">Atualize as informações da notícia</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/noticias')}
            className="text-gray-600 cursor-pointer hover:text-gray-900 font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>

        <NoticiaForm initialData={initialData || undefined} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PrivateLayout>
  );
};
