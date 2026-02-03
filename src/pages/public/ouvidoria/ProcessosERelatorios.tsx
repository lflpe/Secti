import { PublicLayout } from '../../../layouts/PublicLayout.tsx';
import { HeroSection } from '../../../components/HeroSection.tsx';
import { DocumentList } from '../../../components/DocumentList.tsx';
import type { DocumentItem } from '../../../components/DocumentList.tsx';

// Dados de exemplo - substituir por dados reais da API
const processosMock: DocumentItem[] = [
  { id: 1, nome: 'ProcessosERelatorios de Manifestação 001/2024', tipo: 'pdf', tamanho: '1.2 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '15/01/2024' },
  { id: 2, nome: 'Relatório de Atendimento - Janeiro 2024', tipo: 'pdf', tamanho: '2.5 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '05/02/2024' },
  { id: 3, nome: 'ProcessosERelatorios LAI 045/2024', tipo: 'pdf', tamanho: '850 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '18/02/2024' },
  { id: 4, nome: 'Resposta ao Pedido de Informação 102', tipo: 'docx', tamanho: '650 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '22/02/2024' },
  { id: 5, nome: 'ProcessosERelatorios de Reclamação 078/2024', tipo: 'pdf', tamanho: '1.8 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '10/03/2024' },
  { id: 6, nome: 'Relatório Trimestral da Ouvidoria', tipo: 'pdf', tamanho: '3.2 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '28/03/2024' },
  { id: 7, nome: 'ProcessosERelatorios de Sugestão 123/2024', tipo: 'pdf', tamanho: '920 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '15/04/2024' },
  { id: 8, nome: 'Denúncia Anônima - ProcessosERelatorios 089/2024', tipo: 'pdf', tamanho: '1.5 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '20/04/2024' },
  { id: 9, nome: 'Relatório Mensal - Abril 2024', tipo: 'pdf', tamanho: '2.1 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '05/05/2024' },
  { id: 10, nome: 'ProcessosERelatorios LAI 156/2024', tipo: 'pdf', tamanho: '780 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '12/05/2024' },
  { id: 11, nome: 'Elogio Registrado - ProcessosERelatorios 201/2024', tipo: 'docx', tamanho: '450 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '25/05/2024' },
  { id: 12, nome: 'ProcessosERelatorios de Solicitação 234/2024', tipo: 'pdf', tamanho: '1.1 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '08/06/2024' },
  { id: 13, nome: 'Relatório Semestral da Ouvidoria 2024', tipo: 'pdf', tamanho: '4.5 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '30/06/2024' },
  { id: 14, nome: 'ProcessosERelatorios de Manifestação 267/2024', tipo: 'pdf', tamanho: '1.3 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '15/07/2024' },
  { id: 15, nome: 'Resposta ao Cidadão - ProcessosERelatorios 289/2024', tipo: 'pdf', tamanho: '890 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '22/07/2024' },
  { id: 16, nome: 'ProcessosERelatorios LAI 312/2024', tipo: 'pdf', tamanho: '1.6 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '05/08/2024' },
  { id: 17, nome: 'Relatório de Transparência - Agosto', tipo: 'pdf', tamanho: '2.8 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '30/08/2024' },
  { id: 18, nome: 'ProcessosERelatorios de Reclamação 345/2024', tipo: 'pdf', tamanho: '1.4 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '10/09/2024' },
  { id: 19, nome: 'Ata de Reunião da Ouvidoria', tipo: 'docx', tamanho: '720 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '18/09/2024' },
  { id: 20, nome: 'ProcessosERelatorios de Denúncia 378/2024', tipo: 'pdf', tamanho: '2.2 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '25/09/2024' },
  { id: 21, nome: 'Relatório Trimestral - 3º Trimestre', tipo: 'pdf', tamanho: '3.5 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '30/09/2024' },
  { id: 22, nome: 'ProcessosERelatorios LAI 401/2024', tipo: 'pdf', tamanho: '950 KB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '08/10/2024' },
  { id: 23, nome: 'Manifestação do Servidor - ProcessosERelatorios 423', tipo: 'pdf', tamanho: '1.7 MB', categoria: 'Ouvidoria', url: '#', dataPublicacao: '15/10/2024' },
];

export const ProcessosERelatorios = () => {
  // Filtrar apenas documentos da categoria Ouvidoria
  const processosOuvidoria = processosMock.filter(doc => doc.categoria === 'Ouvidoria');

  // Como só temos uma categoria, não precisamos do filtro de categoria
  const categorias = ['Ouvidoria'];

  return (
    <PublicLayout>
      <HeroSection
        title="Processos e Relatórios da Ouvidoria"
        subtitle="Acesse processos, relatórios, manifestações e documentos da Ouvidoria SECTI"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Informativo */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-blue-50 border-l-4 border-[#195CE3] p-6 rounded-r-lg">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#195CE3] mt-0.5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-[#0C2856] mb-2">Sobre os Processos da Ouvidoria</h3>
                  <p className="text-gray-700">
                    Esta seção contém todos os processos, manifestações e documentos gerenciados pela Ouvidoria da SECTI.
                    Você pode buscar por nome, filtrar por ano e acessar informações sobre manifestações, pedidos de acesso à informação (LAI),
                    reclamações, sugestões e relatórios periódicos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DocumentList
            documents={processosOuvidoria}
            categories={categorias}
            showCategoryFilter={false}
            emptyStateIcon={
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            emptyStateTitle="Nenhum processo encontrado"
            emptyStateDescription="Tente ajustar os filtros de busca ou aguarde a publicação de novos processos"
            getCategoryColor={() => 'bg-[#195CE3] text-white'}
          />
        </div>
      </section>
    </PublicLayout>
  );
};
