import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosServidorPublicosList } from '../../../components/DocumentosServidorPublicosList';
import type { DocumentoServidorPublicoItem } from '../../../components/DocumentosServidorPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { documentosServidorService } from '../../../services/documentosServidorService';
import { handleApiError } from '../../../utils/errorHandler';


export const Servidor = () => {
  const [documentos, setDocumentos] = useState<DocumentoServidorPublicoItem[]>([]);
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

      // Buscar documentos do servidor públicos do endpoint
      const response = await documentosServidorService.listarPublico({
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: paginaAtual,
        itensPorPagina: 20,
      });

      // Converter resposta para formato DocumentoServidorPublicoItem
      const documentosFormatados: DocumentoServidorPublicoItem[] = response.documentos.map(doc => ({
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
      console.error('Erro ao carregar documentos do servidor:', err);
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
        title="Servidor"
        subtitle="Documentos e orientações para servidores da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Introdução */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Área do Servidor</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Encontre aqui documentos importantes, orientações e materiais relacionados à gestão de pessoas e avaliação de desempenho dos servidores da SECTI-PE.
              </p>
            </div>

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
              <DocumentosServidorPublicosList
                documents={documentos}
                categories={categorias}
                showCategoryFilter={true}
                isLoading={isLoading}
                onLoadMore={hasMore ? handleCarregarMais : undefined}
                isLoadingMore={isLoadingMore}
              />
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
