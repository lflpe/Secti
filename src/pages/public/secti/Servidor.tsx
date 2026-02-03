import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentList} from '../../../components/DocumentList.tsx';
import type {DocumentItem} from "../../../components/DocumentList.tsx";

// Dados de exemplo - substituir por dados reais da API
const documentosServidorMock: DocumentItem[] = [
  { id: 1, nome: 'Manual do Servidor Público', tipo: 'pdf', tamanho: '3.2 MB', categoria: 'Documentos', url: '#', dataPublicacao: '15/01/2024' },
  { id: 2, nome: 'Formulário de Avaliação de Desempenho 2024', tipo: 'docx', tamanho: '850 KB', categoria: 'Avaliação de Desempenho', url: '#', dataPublicacao: '10/02/2024' },
  { id: 3, nome: 'Regulamento de Progressão Funcional', tipo: 'pdf', tamanho: '2.1 MB', categoria: 'Documentos', url: '#', dataPublicacao: '05/03/2024' },
  { id: 4, nome: 'Critérios de Avaliação de Desempenho', tipo: 'pdf', tamanho: '1.5 MB', categoria: 'Avaliação de Desempenho', url: '#', dataPublicacao: '12/03/2024' },
  { id: 5, nome: 'Código de Ética do Servidor', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Documentos', url: '#', dataPublicacao: '20/04/2024' },
  { id: 6, nome: 'Relatório de Avaliação 2023', tipo: 'pdf', tamanho: '4.1 MB', categoria: 'Avaliação de Desempenho', url: '#', dataPublicacao: '25/05/2024' },
  { id: 7, nome: 'Portaria de Capacitação', tipo: 'pdf', tamanho: '945 KB', categoria: 'Documentos', url: '#', dataPublicacao: '14/06/2024' },
  { id: 8, nome: 'Orientações para Avaliação 2024', tipo: 'docx', tamanho: '1.2 MB', categoria: 'Avaliação de Desempenho', url: '#', dataPublicacao: '18/07/2024' },
  { id: 9, nome: 'Manual de Direitos e Deveres', tipo: 'pdf', tamanho: '2.7 MB', categoria: 'Documentos', url: '#', dataPublicacao: '22/08/2024' },
  { id: 10, nome: 'Cronograma de Avaliações 2024', tipo: 'pdf', tamanho: '678 KB', categoria: 'Avaliação de Desempenho', url: '#', dataPublicacao: '30/09/2024' },
  { id: 11, nome: 'Regulamento Interno da SECTI', tipo: 'pdf', tamanho: '3.5 MB', categoria: 'Documentos', url: '#', dataPublicacao: '15/10/2024' },
];

export const Servidor = () => {
  const categorias = ['Todas', 'Avaliação de Desempenho', 'Documentos'];

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'Avaliação de Desempenho':
        return 'bg-[#195CE3] text-white';
      case 'Documentos':
        return 'bg-[#0C2856] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
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

            <DocumentList
              documents={documentosServidorMock}
              categories={categorias}
              showCategoryFilter={true}
              getCategoryColor={getCategoryColor}
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
