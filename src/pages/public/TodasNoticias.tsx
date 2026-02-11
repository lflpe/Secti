import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { NoticiasList } from '../../components/NoticiasList';
import type { NoticiaItem } from '../../components/NoticiasList';
import { useState, useEffect } from 'react';
import { noticiasService } from '../../services/noticiasService';
import { handleApiError } from '../../utils/errorHandler';
import { LoadingScreen } from '../../components/LoadingScreen';
import SectiPredio from "../../assets/SECTIPredio.jpg"
import { formatarDataBrasileira } from '../../utils/dateUtils';


export const TodasNoticias = () => {
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itensPorPagina = 12;

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Buscar notícias publicadas do endpoint público
        const response = await noticiasService.listarPublico({
          pagina: 1,
          itensPorPagina: itensPorPagina,
        });

        // Converter resposta para formato NoticiaItem
        const noticiasFormatadas: NoticiaItem[] = response.itens.map(noticia => ({
          id: noticia.id,
          slug: noticia.slug,
          titulo: noticia.titulo,
          categoria: 'Notícia',
          autor: noticia.autor,
          dataPublicacao: formatarDataBrasileira(noticia.dataPublicacao),
          resumo: noticia.resumo,
          imagem: noticia.imagemCapaUrl || SectiPredio,
          link: `/noticias/${noticia.slug}`,
        }));

        setNoticias(noticiasFormatadas);
      } catch (err) {
        const mensagemErro = handleApiError(err);
        setError(mensagemErro);
        console.error('Erro ao carregar notícias:', err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarNoticias();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PublicLayout>
        <HeroSection
          title="Notícias"
          subtitle="Acompanhe as últimas novidades sobre ciência, tecnologia e inovação em Pernambuco"
        />

        {/* Content Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introdução */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Todas as Notícias</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Fique por dentro de todas as novidades, projetos e iniciativas da Secretaria de Ciência,
                Tecnologia e Inovação de Pernambuco.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* No News Message */}
            {!isLoading && noticias.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Nenhuma notícia disponível no momento.</p>
              </div>
            )}

            {/* News List */}
            {noticias.length > 0 && <NoticiasList noticias={noticias} />}
          </div>
        </section>
      </PublicLayout>
    </>
  );
};
