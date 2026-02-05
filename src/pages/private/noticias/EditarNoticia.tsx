import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrivateLayout } from '../../../layouts/PrivateLayout';
import { NoticiaForm } from '../../../components/admin/NoticiaForm';
import { noticiasService, type NoticiaDetalhada } from '../../../services/noticiasService';
import { handleApiError } from '../../../utils/errorHandler';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarNoticia = async () => {
      if (!slug) return;

      // Extrair ID do slug (formato: noticia-{id})
      const idMatch = slug.match(/^noticia-(\d+)$/);
      if (!idMatch) {
        setError('Slug inválido');
        setIsLoading(false);
        return;
      }

      const noticiaId = parseInt(idMatch[1], 10);

      try {
        setIsLoading(true);
        setError(null);

        const noticia: NoticiaDetalhada = await noticiasService.buscarPorId(noticiaId);

        // Converter dados da API para o formato do formulário
        const formData: NoticiaFormData = {
          titulo: noticia.titulo,
          slug: slug,
          categoria: 'Notícias', // Categoria padrão
          autor: 'SECTI', // Autor padrão
          resumo: noticia.resumo,
          conteudo: noticia.conteudo,
          imagemDestaque: noticia.imagemCapaUrl,
          imagemArquivo: null,
          status: noticia.publicada ? 'Publicada' : 'Rascunho',
          destaque: noticia.destaque,
        };

        setInitialData(formData);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    carregarNoticia();
  }, [slug]);

  const handleSubmit = async (formData: NoticiaFormData) => {
    if (!slug) return;

    // Extrair ID do slug
    const idMatch = slug.match(/^noticia-(\d+)$/);
    if (!idMatch) {
      setError('Slug inválido');
      return;
    }

    const noticiaId = parseInt(idMatch[1], 10);

    setIsSubmitting(true);
    setError(null);

    try {
      // Preparar dados para o endpoint
      const imagemUrl = formData.imagemDestaque && !formData.imagemDestaque.startsWith('blob:')
        ? formData.imagemDestaque
        : undefined;

      const dadosNoticia = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        resumo: formData.resumo || undefined,
        imagemCapaUrl: imagemUrl,
        destaque: formData.destaque || false,
      };

      // Chamar API
      await noticiasService.editar(noticiaId, dadosNoticia);

      // Redirecionar para a lista
      navigate('/admin/noticias');
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PrivateLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2856]"></div>
          <span className="ml-2 text-gray-600">Carregando notícia...</span>
        </div>
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout>
      <div className="space-y-6 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Notícia</h1>
            <p className="text-gray-600 mt-2">
              Faça as alterações necessárias na notícia selecionada.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/noticias')}
            className="inline-flex cursor-pointer items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulário */}
        {initialData && (
          <div className="overflow-x-hidden">
            <NoticiaForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </PrivateLayout>
  );
};
