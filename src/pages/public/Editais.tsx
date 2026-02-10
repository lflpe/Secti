import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { DocumentosParceriasPublicosList } from '../../components/DocumentosParceriasPublicosList';
import type { DocumentoParceriaPublicoItem } from '../../components/DocumentosParceriasPublicosList';
import { useState, useEffect } from 'react';
import { editaisService } from '../../services/editaisService';
import { handleApiError } from '../../utils/errorHandler';

export const Editais = () => {
  const [documentos, setDocumentos] = useState<DocumentoParceriaPublicoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<string[]>(['Todas']);

  useEffect(() => {
    const carregarEditais = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Buscar editais públicos do endpoint
        const response = await editaisService.listarPublico({
          ordenarPor: 'anopublicacao',
          ordenarDescendente: true,
          pagina: 1,
          itensPorPagina: 100,
        });

        // Converter resposta para formato DocumentoParceriaPublicoItem
        const documentosFormatados: DocumentoParceriaPublicoItem[] = response.editais.map(doc => ({
          id: doc.id,
          nome: doc.titulo,
          tipo: 'pdf' as const,
          tamanho: 'Não disponível',
          categoria: 'Edital',
          url: doc.caminhoArquivo,
          dataPublicacao: `01/01/${doc.anoPublicacao}`,
        }));

        setDocumentos(documentosFormatados);
        setCategorias(['Todas', 'Edital']);
      } catch (err) {
        const mensagemErro = handleApiError(err);
        setError(mensagemErro);
        console.error('Erro ao carregar editais:', err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarEditais();
  }, []);

  return (
    <PublicLayout>
      <HeroSection
        title="Editais"
        subtitle="Consulte editais de fomento, bolsas e oportunidades da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Editais Disponíveis</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Encontre oportunidades de fomento à pesquisa, bolsas de estudo, apoio a startups e outros
              editais promovidos pela Secretaria de Ciência, Tecnologia e Inovação de Pernambuco.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700 font-medium">Erro ao carregar editais: {error}</p>
            </div>
          )}

          {/* No Documents Message */}
          {!isLoading && documentos.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum edital disponível no momento.</p>
            </div>
          )}

          {/* Documents List */}
          {documentos.length > 0 && (
            <DocumentosParceriasPublicosList
              documents={documentos}
              categories={categorias}
              showCategoryFilter={false}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
