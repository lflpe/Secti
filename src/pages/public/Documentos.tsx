import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { DocumentList } from '../../components/DocumentList';
import type { DocumentItem } from '../../components/DocumentList';

// Dados de exemplo - substituir por dados reais da API
const documentosMock: DocumentItem[] = [
  { id: 1, nome: 'Relatório Anual 2023', tipo: 'pdf', tamanho: '2.5 MB', categoria: 'Relatórios', url: '#', dataPublicacao: '15/12/2023' },
  { id: 2, nome: 'Plano Estratégico de Inovação', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Planejamento', url: '#', dataPublicacao: '22/11/2023' },
  { id: 3, nome: 'Lei Estadual 18.139', tipo: 'pdf', tamanho: '850 KB', categoria: 'Legislação', url: '#', dataPublicacao: '18/01/2023' },
  { id: 4, nome: 'Edital de Fomento 2024', tipo: 'docx', tamanho: '1.2 MB', categoria: 'Editais', url: '#', dataPublicacao: '05/01/2024' },
  { id: 5, nome: 'Prestação de Contas 2023', tipo: 'pdf', tamanho: '3.1 MB', categoria: 'Relatórios', url: '#', dataPublicacao: '28/02/2024' },
  { id: 6, nome: 'Manual de Normas Técnicas', tipo: 'doc', tamanho: '945 KB', categoria: 'Manuais', url: '#', dataPublicacao: '10/03/2024' },
  { id: 7, nome: 'Regulamento Interno', tipo: 'pdf', tamanho: '678 KB', categoria: 'Legislação', url: '#', dataPublicacao: '14/06/2024' },
  { id: 8, nome: 'Projeto Tecnologia na Educação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Projetos', url: '#', dataPublicacao: '20/08/2024' },
  { id: 9, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },
  { id: 10, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },
  { id: 11, nome: 'Portaria de Regulamentação', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Portaria', url: '#', dataPublicacao: '30/09/2024' },

];

export const Documentos = () => {
  // Extrair categorias únicas
  const categorias = ['Todas', 'Relatórios', 'Planejamento', 'Legislação', 'Editais', 'Manuais', 'Projetos', 'Portaria'];

  return (
    <PublicLayout>
      <HeroSection
        title="Documentos"
        subtitle="Acesse documentos, relatórios e publicações da SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DocumentList
            documents={documentosMock}
            categories={categorias}
            showCategoryFilter={true}
          />
        </div>
      </section>
    </PublicLayout>
  );
};
