import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosPublicosList } from '../../../components/DocumentosPublicosList';
import type { DocumentoPublicoItem } from '../../../components/DocumentosPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { useSEO } from '../../../utils/useSEO.ts';
import { documentosService } from '../../../services/documentosService.ts';
import { handleApiError } from '../../../utils/errorHandler';


export const Documentos = () => {
  // SEO
  useSEO({
    title: 'Documentos',
    description: 'Consulte os documentos públicos da Secretaria de Ciência, Tecnologia e Inovação de Pernambuco.',
    canonical: 'https://secti.pe.gov.br/secti/documentos',
    keywords: 'Documentos, SECTI, Pernambuco, Transparência',
  });
  const [documentos, setDocumentos] = useState<DocumentoPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const carregarDocumentos = useCallback(async (pagina: number, titulo: string = '', dataPublicacao: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await documentosService.listarPublico({
        titulo: titulo || undefined,
        dataPublicacao: dataPublicacao || undefined,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: pagina,
        itensPorPagina: 10,
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
      setTotalPaginas(response.totalPaginas);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar documentos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos(paginaAtual, filtroTitulo, filtroData);
  }, [paginaAtual, filtroTitulo, filtroData, carregarDocumentos]);

  const handleMudarPagina = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuscar = (titulo: string, dataPublicacao?: string) => {
    setFiltroTitulo(titulo);
    setFiltroData(dataPublicacao || '');
    setPaginaAtual(1);
  };

  const handleLimpar = () => {
    setFiltroTitulo('');
    setFiltroData('');
    setPaginaAtual(1);
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
              totalPaginas={totalPaginas}
              paginaAtual={paginaAtual}
              onMudarPagina={handleMudarPagina}
              onFiltroChange={handleBuscar}
              onLimpar={handleLimpar}
            />
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
