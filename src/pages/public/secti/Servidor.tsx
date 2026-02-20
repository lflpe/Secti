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
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroData, setFiltroData] = useState<string>('');

  const carregarDocumentos = useCallback(async (pagina: number, titulo?: string, dataPublicacao?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar documentos do servidor públicos do endpoint
      const response = await documentosServidorService.listarPublico({
        titulo: titulo,
        dataPublicacao: dataPublicacao,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: pagina,
        itensPorPagina: 10,
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

      setDocumentos(documentosFormatados);
      setTotalPaginas(response.totalPaginas);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar documentos do servidor:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos(paginaAtual, filtroTitulo || undefined, filtroData || undefined);
  }, [paginaAtual, filtroTitulo, filtroData, carregarDocumentos]);

  const handleMudarPagina = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltroChange = (titulo: string, dataPublicacao?: string) => {
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

            {/* Documents List */}
            <DocumentosServidorPublicosList
              documents={documentos}
              isLoading={isLoading}
              totalPaginas={totalPaginas}
              paginaAtual={paginaAtual}
              onMudarPagina={handleMudarPagina}
              onFiltroChange={handleFiltroChange}
              onLimpar={handleLimpar}
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
