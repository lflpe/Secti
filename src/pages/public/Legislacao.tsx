import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { DocumentList } from '../../components/DocumentList';
import type { DocumentItem } from '../../components/DocumentList';

// Dados de exemplo - substituir por dados reais da API
const documentosLegislacaoMock: DocumentItem[] = [
  { id: 1, nome: 'Lei Estadual 18.139 - Sistema Estadual de C&T&I', tipo: 'pdf', tamanho: '850 KB', categoria: 'Legislação', url: '#', dataPublicacao: '18/01/2023' },
  { id: 2, nome: 'Decreto Nº 54.321 - Regulamentação SECTI', tipo: 'pdf', tamanho: '1.2 MB', categoria: 'Legislação', url: '#', dataPublicacao: '25/02/2023' },
  { id: 3, nome: 'Lei Complementar 142 - Incentivos Fiscais', tipo: 'pdf', tamanho: '2.1 MB', categoria: 'Legislação', url: '#', dataPublicacao: '15/03/2023' },
  { id: 4, nome: 'Portaria SECTI Nº 045/2023', tipo: 'pdf', tamanho: '678 KB', categoria: 'Legislação', url: '#', dataPublicacao: '10/04/2023' },
  { id: 5, nome: 'Resolução do Conselho Estadual de C&T', tipo: 'pdf', tamanho: '945 KB', categoria: 'Legislação', url: '#', dataPublicacao: '22/05/2023' },
  { id: 6, nome: 'Lei Federal 10.973 - Lei de Inovação', tipo: 'pdf', tamanho: '1.5 MB', categoria: 'Legislação', url: '#', dataPublicacao: '02/12/2004' },
  { id: 7, nome: 'Marco Legal da Ciência e Tecnologia', tipo: 'pdf', tamanho: '2.8 MB', categoria: 'Legislação', url: '#', dataPublicacao: '11/01/2016' },
  { id: 8, nome: 'Instrução Normativa SECTI Nº 12/2024', tipo: 'pdf', tamanho: '1.1 MB', categoria: 'Legislação', url: '#', dataPublicacao: '08/06/2024' },
  { id: 9, nome: 'Decreto Estadual de Parques Tecnológicos', tipo: 'pdf', tamanho: '1.7 MB', categoria: 'Legislação', url: '#', dataPublicacao: '14/08/2024' },
  { id: 10, nome: 'Regulamento de Startups e Inovação', tipo: 'docx', tamanho: '890 KB', categoria: 'Legislação', url: '#', dataPublicacao: '30/09/2024' },
  { id: 11, nome: 'Lei de Proteção à Propriedade Intelectual', tipo: 'pdf', tamanho: '1.9 MB', categoria: 'Legislação', url: '#', dataPublicacao: '12/11/2024' },
];

export const Legislacao = () => {
  const emptyStateIcon = (
    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

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

          <DocumentList
            documents={documentosLegislacaoMock}
            categories={['Legislação']}
            showCategoryFilter={false}
            emptyStateIcon={emptyStateIcon}
            emptyStateTitle="Nenhum documento legislativo encontrado"
            emptyStateDescription="Tente ajustar os filtros de busca"
            getCategoryColor={() => 'bg-[#0C2856] text-white'}
          />
        </div>
      </section>
    </PublicLayout>
  );
};
