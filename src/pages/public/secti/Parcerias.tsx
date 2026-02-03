import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentList} from '../../../components/DocumentList.tsx';
import type {DocumentItem} from "../../../components/DocumentList.tsx";

// Dados de exemplo - substituir por dados reais da API
const documentosParceriasMock: DocumentItem[] = [
  { id: 1, nome: 'Acordo de Cooperação com UFPE', tipo: 'pdf', tamanho: '2.1 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '15/01/2024' },
  { id: 2, nome: 'Convênio SECTI-Facepe 2024', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '22/02/2024' },
  { id: 3, nome: 'Protocolo Porto Digital', tipo: 'pdf', tamanho: '1.5 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '10/03/2024' },
  { id: 4, nome: 'Termo de Cooperação ITEP', tipo: 'docx', tamanho: '890 KB', categoria: 'Parcerias', url: '#', dataPublicacao: '05/04/2024' },
  { id: 5, nome: 'Parceria Estratégica UPE', tipo: 'pdf', tamanho: '2.3 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '18/04/2024' },
  { id: 6, nome: 'Acordo CESAR School', tipo: 'pdf', tamanho: '1.2 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '12/05/2024' },
  { id: 7, nome: 'Convênio Governo Federal - CNPq', tipo: 'pdf', tamanho: '3.1 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '25/06/2024' },
  { id: 8, nome: 'Protocolo de Intenções SENAI', tipo: 'docx', tamanho: '675 KB', categoria: 'Parcerias', url: '#', dataPublicacao: '14/07/2024' },
  { id: 9, nome: 'Termo de Parceria EMBRAPII', tipo: 'pdf', tamanho: '1.9 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '30/08/2024' },
  { id: 10, nome: 'Acordo de Cooperação Internacional', tipo: 'pdf', tamanho: '2.7 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '15/09/2024' },
  { id: 11, nome: 'Convênio Startups Pernambuco', tipo: 'pdf', tamanho: '1.4 MB', categoria: 'Parcerias', url: '#', dataPublicacao: '22/10/2024' },
];

export const Parcerias = () => {
  const emptyStateIcon = (
    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  return (
    <PublicLayout>
      <HeroSection
        title="Parcerias"
        subtitle="Acordos, convênios e parcerias estratégicas da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white    ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Parcerias Estratégicas</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Conheça os acordos de cooperação, convênios e parcerias estratégicas estabelecidas pela SECTI-PE
              para o fortalecimento do ecossistema de ciência, tecnologia e inovação em Pernambuco.
            </p>
          </div>

          <DocumentList
            documents={documentosParceriasMock}
            categories={['Parcerias']}
            showCategoryFilter={false}
            emptyStateIcon={emptyStateIcon}
            emptyStateTitle="Nenhum documento de parceria encontrado"
            emptyStateDescription="Tente ajustar os filtros de busca"
            getCategoryColor={() => 'bg-[#195CE3] text-white'}
          />
        </div>
      </section>
    </PublicLayout>
  );
};
