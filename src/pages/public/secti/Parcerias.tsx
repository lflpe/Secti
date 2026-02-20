import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosParceriasPublicosList } from '../../../components/DocumentosParceriasPublicosList';
import type { DocumentoParceriaPublicoItem } from '../../../components/DocumentosParceriasPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { useSEO } from '../../../utils/useSEO.ts';
import { parceriasService } from '../../../services/parceriasService';
import { handleApiError } from '../../../utils/errorHandler';

export const Parcerias = () => {
  // SEO
  useSEO({
    title: 'Parcerias',
    description: 'Conheça as parcerias estratégicas da Secretaria de Ciência, Tecnologia e Inovação de Pernambuco com instituições públicas e privadas.',
    canonical: 'https://secti.pe.gov.br/secti/parcerias',
    keywords: 'Parcerias, SECTI, Colaboração, Pernambuco',
  });
  const [documentos, setDocumentos] = useState<DocumentoParceriaPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const carregarParcerias = useCallback(async (pagina: number, titulo: string = '', dataPublicacao: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar parcerias públicas do endpoint
      const response = await parceriasService.listarPublico({
        titulo: titulo || undefined,
        dataPublicacao: dataPublicacao || undefined,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: pagina,
        itensPorPagina: 10,
      });

      // Converter resposta para formato DocumentoParceriaPublicoItem
      const documentosFormatados: DocumentoParceriaPublicoItem[] = response.parcerias.map(doc => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: 'pdf' as const,
        tamanho: 'Não disponível',
        categoria: 'Parcerias',
        url: doc.caminhoArquivo,
        dataPublicacao: doc.dataPublicacao,
      }));

      setDocumentos(documentosFormatados);
      setTotalPaginas(response.totalPaginas);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar parcerias:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarParcerias(paginaAtual, filtroTitulo, filtroData);
  }, [paginaAtual, filtroTitulo, filtroData, carregarParcerias]);

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
        title="Parcerias"
        subtitle="Acordos, convênios e parcerias estratégicas da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Parcerias Estratégicas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Conheça os acordos de cooperação, convênios e parcerias estratégicas estabelecidas pela SECTI-PE
              para o fortalecimento do ecossistema de ciência, tecnologia e inovação em Pernambuco.
            </p>
          </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-700 font-medium">Erro ao carregar parcerias: {error}</p>
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
