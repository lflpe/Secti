import { PublicLayout } from '../../layouts/PublicLayout';
import { HeroSection } from '../../components/HeroSection';
import { NoticiasList } from '../../components/NoticiasList';
import type { NoticiaItem } from '../../components/NoticiasList';

// Dados de exemplo - substituir por dados reais da API
const noticiasCompletas: NoticiaItem[] = [
  {
    id: 1,
    titulo: 'Pernambuco lança novo programa de inovação tecnológica',
    categoria: 'Inovação',
    autor: 'Redação SECTI',
    dataPublicacao: '2024-12-15',
    resumo: 'O governo de Pernambuco anuncia investimento de R$ 50 milhões em startups e projetos de tecnologia para impulsionar o ecossistema de inovação do estado. O programa visa apoiar empreendedores e pesquisadores na criação de soluções inovadoras.',
    imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    link: '/noticias/programa-inovacao-tecnologica',
  },
  {
    id: 2,
    titulo: 'Espaço Ciência recebe nova exposição interativa sobre sustentabilidade',
    categoria: 'Educação',
    autor: 'Marina Santos',
    dataPublicacao: '2024-12-12',
    resumo: 'A nova exposição "Planeta Sustentável" oferece experiências imersivas sobre mudanças climáticas, energia renovável e preservação ambiental. São mais de 20 experimentos interativos que educam e conscientizam visitantes de todas as idades.',
    imagem: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    link: '/noticias/exposicao-sustentabilidade',
  },
  {
    id: 3,
    titulo: 'Parqtel abre inscrições para incubadora de startups 2025',
    categoria: 'Negócios',
    autor: 'Carlos Oliveira',
    dataPublicacao: '2024-12-10',
    resumo: 'O Parque Tecnológico de Pernambuco está com inscrições abertas para seu programa de incubação 2025. São 30 vagas disponíveis para startups nas áreas de tecnologia, saúde digital, fintech e agronegócios.',
    imagem: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    link: '/noticias/incubadora-startups-2025',
  },
  {
    id: 4,
    titulo: 'Hackathon de Ciência de Dados acontece em Recife',
    categoria: 'Eventos',
    autor: 'Ana Paula Ferreira',
    dataPublicacao: '2024-12-08',
    resumo: 'O maior hackathon de ciência de dados do Nordeste reunirá 200 participantes durante três dias no Porto Digital. O evento conta com premiação total de R$ 100 mil para as melhores soluções.',
    imagem: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    link: '/noticias/hackathon-ciencia-dados',
  },
  {
    id: 5,
    titulo: 'SECTI firma parceria com universidades europeias',
    categoria: 'Parcerias',
    autor: 'Roberto Silva',
    dataPublicacao: '2024-12-05',
    resumo: 'Acordo de cooperação internacional permitirá intercâmbio de pesquisadores e desenvolvimento conjunto de projetos em inteligência artificial e biotecnologia.',
    imagem: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
    link: '/noticias/parceria-universidades-europeias',
  },
  {
    id: 6,
    titulo: 'Laboratório de Biotecnologia recebe certificação internacional',
    categoria: 'Pesquisa',
    autor: 'Dra. Fernanda Costa',
    dataPublicacao: '2024-12-03',
    resumo: 'O laboratório da UFPE, apoiado pela SECTI, obteve certificação ISO para pesquisas em bioengenharia, colocando Pernambuco no mapa mundial da biotecnologia.',
    imagem: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop',
    link: '/noticias/certificacao-biotecnologia',
  },
  {
    id: 7,
    titulo: 'Programa de capacitação em IA treina 500 profissionais',
    categoria: 'Educação',
    autor: 'Prof. João Mendes',
    dataPublicacao: '2024-11-28',
    resumo: 'Iniciativa da SECTI em parceria com o CESAR oferece curso gratuito de inteligência artificial para profissionais de TI e estudantes universitários.',
    imagem: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    link: '/noticias/capacitacao-inteligencia-artificial',
  },
  {
    id: 8,
    titulo: 'Festival de Robótica atrai milhares de jovens ao Recife',
    categoria: 'Eventos',
    autor: 'Luiza Almeida',
    dataPublicacao: '2024-11-25',
    resumo: 'O evento anual promovido pela SECTI reuniu 150 equipes de escolas públicas e privadas em competições de robótica educacional.',
    imagem: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    link: '/noticias/festival-robotica',
  },
  {
    id: 9,
    titulo: 'Startup pernambucana desenvolve solução para agricultura',
    categoria: 'Inovação',
    autor: 'Marcos Pereira',
    dataPublicacao: '2024-11-22',
    resumo: 'Empresa incubada no Parqtel cria sistema de monitoramento inteligente que aumenta produtividade agrícola em 30% usando sensores IoT.',
    imagem: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
    link: '/noticias/startup-agricultura-iot',
  },
  {
    id: 10,
    titulo: 'SECTI investe R$ 20 milhões em pesquisa médica',
    categoria: 'Pesquisa',
    autor: 'Dra. Patrícia Lima',
    dataPublicacao: '2024-11-20',
    resumo: 'Recursos serão destinados a projetos de pesquisa em medicina personalizada e desenvolvimento de novos tratamentos para doenças tropicais.',
    imagem: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    link: '/noticias/investimento-pesquisa-medica',
  },
  {
    id: 11,
    titulo: 'Semana de Ciência e Tecnologia movimenta o estado',
    categoria: 'Eventos',
    autor: 'Equipe SECTI',
    dataPublicacao: '2024-11-18',
    resumo: 'Evento anual da SECTI promove palestras, workshops e feira de ciências em 20 cidades pernambucanas, atingindo mais de 50 mil pessoas.',
    imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    link: '/noticias/semana-ciencia-tecnologia',
  },
  {
    id: 12,
    titulo: 'Novo centro de pesquisa em energias renováveis é inaugurado',
    categoria: 'Pesquisa',
    autor: 'Eng. Ricardo Nunes',
    dataPublicacao: '2024-11-15',
    resumo: 'Instalação de R$ 15 milhões no Agreste pernambucano focará em energia solar e eólica, com potencial para gerar 200 empregos especializados.',
    imagem: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
    link: '/noticias/centro-energias-renovaveis',
  },
];

export const TodasNoticias = () => {
  return (
    <PublicLayout>
      <HeroSection
        title="Notícias"
        subtitle="Acompanhe as últimas novidades sobre ciência, tecnologia e inovação em Pernambuco"
      />

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introdução */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2856] mb-4">Todas as Notícias</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Fique por dentro de todas as novidades, projetos e iniciativas da Secretaria de Ciência,
              Tecnologia e Inovação de Pernambuco.
            </p>
          </div>

          <NoticiasList noticias={noticiasCompletas} />
        </div>
      </section>
    </PublicLayout>
  );
};
