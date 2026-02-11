import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosPublicosList } from '../../../components/DocumentosPublicosList';
import type { DocumentoPublicoItem } from '../../../components/DocumentosPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { documentosService } from '../../../services/documentosService.ts';
import { handleApiError } from '../../../utils/errorHandler';


export const Documentos = () => {
  const [documentos, setDocumentos] = useState<DocumentoPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<string[]>(['Todas']);
  const [pagina, setPagina] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const carregarDocumentos = useCallback(async (paginaAtual: number) => {
    try {
      if (paginaAtual === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      // Buscar documentos públicos do endpoint
      const response = await documentosService.listarPublico({
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: paginaAtual,
        itensPorPagina: 20,
      });

      // Converter resposta para formato DocumentoPublicoItem
      const documentosFormatados: DocumentoPublicoItem[] = response.documentos.map(doc => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: 'pdf' as const,
        tamanho: 'Não disponível',
        categoria: 'Documentos',
        url: doc.caminhoArquivo,
        dataPublicacao: doc.dataPublicacao,
      }));

      setDocumentos(prev => paginaAtual === 1 ? documentosFormatados : [...prev, ...documentosFormatados]);
      setHasMore(paginaAtual < response.totalPaginas);

      // Extrair categorias únicas (por enquanto, apenas uma categoria padrão)
      setCategorias(['Todas', 'Documentos']);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar documentos:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos(1);
  }, [carregarDocumentos]);

  const handleCarregarMais = () => {
    const proximaPagina = pagina + 1;
    setPagina(proximaPagina);
    carregarDocumentos(proximaPagina);
  };

  return (
    <PublicLayout>
      <HeroSection
        title="Documentos"
        subtitle="Acesse documentos, relatórios e publicações da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700 font-medium">Erro ao carregar documentos: {error}</p>
            </div>
          )}

          {/* No Documents Message */}
          {!isLoading && documentos.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum documento disponível no momento.</p>
            </div>
          )}

          {/* Documents List */}
          {documentos.length > 0 && (
            <>
              <DocumentosPublicosList
                documents={documentos}
                categories={categorias}
                showCategoryFilter={true}
                isLoading={isLoading}
                itemsPerPage={1000}
              />

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleCarregarMais}
                    disabled={isLoadingMore}
                    className="px-6 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      'Carregar Mais'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
