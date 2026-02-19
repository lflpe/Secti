import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosPublicosList } from '../../../components/DocumentosPublicosList';
import type { DocumentoPublicoItem } from '../../../components/DocumentosPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { documentosService } from '../../../services/documentosService.ts';
import { handleApiError } from '../../../utils/errorHandler';


export const Documentos = () => {
  const [documentos, setDocumentos] = useState<DocumentoPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarDocumentos = useCallback(async (titulo: string = '', dataPublicacao: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await documentosService.listarPublico({
        titulo: titulo || undefined,
        dataPublicacao: dataPublicacao || undefined,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: 1,
        itensPorPagina: 1000,
      });

      const documentosFormatados: DocumentoPublicoItem[] = response.documentos.map(doc => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: 'pdf' as const,
        tamanho: 'Não disponível',
        categoria: 'Documentos',
        url: doc.caminhoArquivo,
        dataPublicacao: doc.dataPublicacao,
      }));

      setDocumentos(documentosFormatados);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar documentos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  const handleBuscar = (titulo: string, dataPublicacao?: string) => {
    carregarDocumentos(titulo, dataPublicacao || '');
  };

  const handleLimpar = () => {
    carregarDocumentos('', '');
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

          {/* Documents List */}
          {!error && (
            <DocumentosPublicosList
              documents={documentos}
              isLoading={isLoading}
              itemsPerPage={20}
              onFiltroChange={handleBuscar}
              onLimpar={handleLimpar}
            />
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
