import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { DocumentosParceriasPublicosList } from '../../components/DocumentosParceriasPublicosList';
import type { DocumentoParceriaPublicoItem } from '../../components/DocumentosParceriasPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { relatoriosService } from '../../services/relatoriosService';
import { handleApiError } from '../../utils/errorHandler';

export const Relatorios = () => {
  const [documentos, setDocumentos] = useState<DocumentoParceriaPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const carregarRelatorios = useCallback(async (pagina: number, titulo: string = '', dataPublicacao: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar relatórios públicos do endpoint
      const response = await relatoriosService.listarPublico({
        titulo: titulo || undefined,
        dataPublicacao: dataPublicacao || undefined,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: pagina,
        itensPorPagina: 10,
      });

      // Converter resposta para formato DocumentoParceriaPublicoItem
      const documentosFormatados: DocumentoParceriaPublicoItem[] = response.relatorios.map(doc => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: 'pdf' as const,
        tamanho: 'Não disponível',
        categoria: 'Relatório',
        url: doc.caminhoArquivo,
        dataPublicacao: doc.dataPublicacao,
      }));

      setDocumentos(documentosFormatados);
      setTotalPaginas(response.totalPaginas);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar relatórios:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarRelatorios(paginaAtual, filtroTitulo, filtroData);
  }, [paginaAtual, filtroTitulo, filtroData, carregarRelatorios]);

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
        title="Relatórios"
        subtitle="Consulte relatórios técnicos e documentos da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Relatórios Disponíveis</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Acesse relatórios técnicos, análises e documentos produzidos pela Secretaria de Ciência,
              Tecnologia e Inovação de Pernambuco sobre pesquisa, desenvolvimento e inovação.
            </p>
          </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-700 font-medium">Erro ao carregar relatórios: {error}</p>
        </div>
      )}

      {/* Documents List */}
      <DocumentosParceriasPublicosList
        documents={documentos}
        isLoading={isLoading}
        totalPaginas={totalPaginas}
        paginaAtual={paginaAtual}
        onMudarPagina={handleMudarPagina}
        onFiltroChange={handleBuscar}
        onLimpar={handleLimpar}
      />
        </div>
      </section>
    </PublicLayout>
  );
};

