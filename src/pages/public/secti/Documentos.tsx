import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosPublicosList } from '../../../components/DocumentosPublicosList';
import type { DocumentoPublicoItem } from '../../../components/DocumentosPublicosList';
import { useState, useEffect } from 'react';
import { documentosService } from '../../../services/documentosService.ts';
import { handleApiError } from '../../../utils/errorHandler';


export const Documentos = () => {
  const [documentos, setDocumentos] = useState<DocumentoPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<string[]>(['Todas']);

  useEffect(() => {
    const carregarDocumentos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Buscar documentos públicos do endpoint
        const response = await documentosService.listarPublico({
          ordenarPor: 'anopublicacao',
          ordenarDescendente: true,
          pagina: 1,
          itensPorPagina: 100,
        });

        // Converter resposta para formato DocumentoPublicoItem
        const documentosFormatados: DocumentoPublicoItem[] = response.documentos.map(doc => ({
          id: doc.id,
          nome: doc.titulo,
          tipo: 'pdf' as const,
          tamanho: 'Não disponível',
          categoria: 'Documentos',
          url: doc.caminhoArquivo,
          dataPublicacao: `01/01/${doc.anoPublicacao}`,
        }));

        setDocumentos(documentosFormatados);

        // Extrair categorias únicas (por enquanto, apenas uma categoria padrão)
        setCategorias(['Todas', 'Documentos']);
      } catch (err) {
        const mensagemErro = handleApiError(err);
        setError(mensagemErro);
        console.error('Erro ao carregar documentos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDocumentos();
  }, []);

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
            <DocumentosPublicosList
              documents={documentos}
              categories={categorias}
              showCategoryFilter={true}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
