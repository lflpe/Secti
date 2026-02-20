import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentosParceriasPublicosList } from '../../../components/DocumentosParceriasPublicosList';
import type { DocumentoParceriaPublicoItem } from '../../../components/DocumentosParceriasPublicosList';
import { useState, useEffect, useCallback } from 'react';
import { useSEO } from '../../../utils/useSEO.ts';
import { legislacaoService } from '../../../services/legislacaoService';
import { handleApiError } from '../../../utils/errorHandler';

export const Legislacao = () => {
  // SEO
  useSEO({
    title: 'Legislação',
    description: 'Acesso à legislação aplicável à Secretaria de Ciência, Tecnologia e Inovação de Pernambuco.',
    canonical: 'https://secti.pe.gov.br/secti/legislacao',
    keywords: 'Legislação, Leis, SECTI, Pernambuco',
  });
  const [documentos, setDocumentos] = useState<DocumentoParceriaPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const carregarLegislacao = useCallback(async (pagina: number, titulo: string = '', dataPublicacao: string = '') => {
    try {
      setIsLoading(true);
      setError(null);

      // Buscar legislação pública do endpoint
      const response = await legislacaoService.listarPublico({
        titulo: titulo || undefined,
        dataPublicacao: dataPublicacao || undefined,
        ordenarPor: 'anopublicacao',
        ordenarDescendente: true,
        pagina: pagina,
        itensPorPagina: 10,
      });

      // Converter resposta para formato DocumentoParceriaPublicoItem
      const documentosFormatados: DocumentoParceriaPublicoItem[] = response.legislacoes.map(doc => ({
        id: doc.id,
        nome: doc.titulo,
        tipo: 'pdf' as const,
        tamanho: 'Não disponível',
        categoria: 'Legislação',
        url: doc.caminhoArquivo,
        dataPublicacao: doc.dataPublicacao,
      }));

      setDocumentos(documentosFormatados);
      setTotalPaginas(response.totalPaginas);
    } catch (err) {
      const mensagemErro = handleApiError(err);
      setError(mensagemErro);
      console.error('Erro ao carregar legislação:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarLegislacao(paginaAtual, filtroTitulo, filtroData);
  }, [paginaAtual, filtroTitulo, filtroData, carregarLegislacao]);

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
        title="Legislação"
        subtitle="Leis, decretos e normas que regem a ciência, tecnologia e inovação em Pernambuco"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Marco Legal</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Consulte toda a legislação pertinente ao Sistema Estadual de Ciência, Tecnologia e Inovação de Pernambuco,
              incluindo leis, decretos, portarias e demais normas regulamentares.
            </p>
          </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-700 font-medium">Erro ao carregar legislação: {error}</p>
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
