import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { DocumentList } from '../../components/DocumentList';
import type { DocumentItem } from '../../components/DocumentList';

// Dados de exemplo - substituir por dados reais da API
const editaisMock: DocumentItem[] = [
  { id: 1, nome: 'Edital de Fomento à Inovação 2024', tipo: 'pdf', tamanho: '1.2 MB', categoria: 'Edital', url: '#', dataPublicacao: '05/01/2024' },
  { id: 2, nome: 'Edital de Apoio a Startups Tecnológicas', tipo: 'pdf', tamanho: '985 KB', categoria: 'Edital', url: '#', dataPublicacao: '15/01/2024' },
  { id: 3, nome: 'Edital SECTI-FACEPE 2024', tipo: 'docx', tamanho: '1.5 MB', categoria: 'Edital', url: '#', dataPublicacao: '22/02/2024' },
  { id: 4, nome: 'Edital de Bolsas de Iniciação Científica', tipo: 'pdf', tamanho: '800 KB', categoria: 'Edital', url: '#', dataPublicacao: '10/03/2024' },
  { id: 5, nome: 'Edital de Projetos de Pesquisa e Desenvolvimento', tipo: 'pdf', tamanho: '2.1 MB', categoria: 'Edital', url: '#', dataPublicacao: '05/04/2024' },
  { id: 6, nome: 'Edital de Credenciamento de Instituições', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Edital', url: '#', dataPublicacao: '18/04/2024' },
  { id: 7, nome: 'Edital de Apoio a Eventos Científicos', tipo: 'docx', tamanho: '675 KB', categoria: 'Edital', url: '#', dataPublicacao: '12/05/2024' },
  { id: 8, nome: 'Edital de Infraestrutura para Pesquisa', tipo: 'pdf', tamanho: '1.9 MB', categoria: 'Edital', url: '#', dataPublicacao: '25/06/2024' },
  { id: 9, nome: 'Edital de Extensão Tecnológica', tipo: 'pdf', tamanho: '1.4 MB', categoria: 'Edital', url: '#', dataPublicacao: '14/07/2024' },
  { id: 10, nome: 'Edital de Programa de Intercâmbio Científico', tipo: 'pdf', tamanho: '1.1 MB', categoria: 'Edital', url: '#', dataPublicacao: '30/08/2024' },
  { id: 11, nome: 'Edital de Apoio à Divulgação Científica', tipo: 'docx', tamanho: '720 KB', categoria: 'Edital', url: '#', dataPublicacao: '15/09/2024' },
  { id: 12, nome: 'Edital de Parcerias Público-Privadas em C&T&I', tipo: 'pdf', tamanho: '2.3 MB', categoria: 'Edital', url: '#', dataPublicacao: '22/10/2024' },
  { id: 13, nome: 'Edital de Apoio a Laboratórios Multiusuários', tipo: 'pdf', tamanho: '1.7 MB', categoria: 'Edital', url: '#', dataPublicacao: '05/11/2024' },
  { id: 14, nome: 'Edital de Programa Jovens Pesquisadores', tipo: 'pdf', tamanho: '1.3 MB', categoria: 'Edital', url: '#', dataPublicacao: '18/11/2024' },
  { id: 15, nome: 'Edital de Fomento à Economia Criativa Digital', tipo: 'docx', tamanho: '890 KB', categoria: 'Edital', url: '#', dataPublicacao: '02/12/2024' },
];

export const Editais = () => {
  const emptyStateIcon = (
    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

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

          <DocumentList
            documents={editaisMock}
            categories={['Edital']}
            showCategoryFilter={false}
            emptyStateIcon={emptyStateIcon}
            emptyStateTitle="Nenhum edital encontrado"
            emptyStateDescription="Tente ajustar os filtros de busca"
            getCategoryColor={() => 'bg-[#0C2856] text-white'}
          />
        </div>
      </section>
    </PublicLayout>
  );
};
