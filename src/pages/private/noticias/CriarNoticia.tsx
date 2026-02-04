import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
}

export const CriarNoticia = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: NoticiaFormData) => {
    setIsSubmitting(true);

    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Notícia criada:', formData);

      // Redirecionar para lista de notícias
      navigate('/admin/noticias');
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      alert('Erro ao criar notícia. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrivateLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nova Notícia</h1>
            <p className="text-gray-600 mt-2">Preencha os campos abaixo para criar uma nova notícia</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/noticias')}
            className="text-gray-600 cursor-pointer hover:text-gray-900 font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>

        <NoticiaForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PrivateLayout>
  );
};
