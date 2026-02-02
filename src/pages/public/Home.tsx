// src/pages/public/Home.tsx
import { PublicLayout } from '../../layouts/PublicLayout';
import { SecaoSlide } from '../../components/SecaoSlide';
import type { SlideItem } from '../../components/SecaoSlide';
import { SecaoNoticias } from '../../components/SecaoNoticias';
import type { NoticiaItem } from '../../components/SecaoNoticias';
import { SecaoProjetos } from '../../components/SecaoProjetos';
import type { ProjetoItem } from '../../components/SecaoProjetos';
import { SecaoDocumentos } from '../../components/SecaoDocumentos';
import type { DocumentoItem } from '../../components/SecaoDocumentos';

const slides: SlideItem[] = [
  {
    id: 1,
    image: 'https://media.licdn.com/dms/image/v2/D4D16AQEPTgoYk7NbJQ/profile-displaybackgroundimage-shrink_350_1400/B4DZjIG2GsH0AY-/0/1755703899452?e=1771459200&v=beta&t=va0DF3nwK53nAlsDph1emt9eCWVWw5Sfvne7ejOT0-U',
    title: 'Bem-vindo à SECTI',
    description: 'Secretaria de Ciência, Tecnologia e Inovação - promovendo conhecimento e inovação.',
    button: { text: 'Saiba mais', href: '/about' },
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwert3JVvxhHvgCy8P5j6t5_rS3IDFuK4GKzVkCwUoxretg1bfR1XrU6xUIovQAr-lPMx-NCr1tOCEcBS4yiOTap21j-wBQkhx7hgYakRh4EKoWj9UTrIEruB28rphKSuLF-cH_LS=s680-w680-h510-rw',
    title: 'Espaço Ciência',
    description: 'Museu, localizado entre as cidades de Olinda e Recife, em Pernambuco. São 120.000 m² de área para fruição, lazer e aprendizagem.',
    button: { text: 'Visitar site', href: 'https://www.espacociencia.pe.gov.br/' },
  },
  {
    id: 3,
    image: 'https://cdn2.tribunaonline.com.br/img/inline/150000/Sebrae-apresenta-solucoes-inovadoras-para-startups0015896800202312120917.jpg?xid=684048',
    title: 'Parqtel',
    description: 'Projetos que transformam ideias em soluções reais.',
    button: { text: 'Visitar site', href: 'https://www.espacociencia.pe.gov.br/' },
  },
];

// Dados de exemplo para notícias
const noticiaDestaque: NoticiaItem = {
  id: 1,
  titulo: 'Pernambuco lança novo programa de inovação tecnológica',
  categoria: 'Inovação',
  autor: 'Redação SECTI',
  data: '15 de outubro de 2023',
  resumo: 'O governo de Pernambuco anuncia investimento de R$ 50 milhões em startups e projetos de tecnologia para impulsionar o ecossistema de inovação do estado.',
  imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  link: '#',
};

const noticias: NoticiaItem[] = [
  {
    id: 2,
    titulo: 'Espaço Ciência recebe nova exposição interativa',
    categoria: 'Educação',
    data: '12 de outubro de 2023',
    imagem: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    id: 3,
    titulo: 'Parqtel abre inscrições para novos empreendimentos',
    categoria: 'Negócios',
    data: '10 de outubro de 2023',
    imagem: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    id: 4,
    titulo: 'Hackathon de Ciência de Dados acontece em Recife',
    categoria: 'Eventos',
    data: '08 de outubro de 2023',
    imagem: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    link: '#',
  },
];

// Dados de exemplo para projetos
const projetos: ProjetoItem[] = [
  {
    id: 1,
    nome: 'Espaço Ciência',
    marca: 'https://via.placeholder.com/100x100?text=Espaco+Ciencia',
  },
  {
    id: 2,
    nome: 'Parqtel',
    marca: 'https://via.placeholder.com/100x100?text=Parqtel',
  },
  {
    id: 3,
    nome: 'Inovação Tecnológica',
    marca: 'https://via.placeholder.com/100x100?text=Inovacao',
  },
  {
    id: 4,
    nome: 'Centro de Pesquisa',
    marca: 'https://via.placeholder.com/100x100?text=Pesquisa',
  },
  {
    id: 5,
    nome: 'Educação Digital',
    marca: 'https://via.placeholder.com/100x100?text=Educacao',
  },
  {
    id: 6,
    nome: 'Startup Hub',
    marca: 'https://via.placeholder.com/100x100?text=Startup',
  },
];

// Dados de exemplo para documentos
const documentos: DocumentoItem[] = [
  {
    id: 1,
    titulo: 'Relatório Anual de Inovação 2023',
    capa: 'https://web.archive.org/web/20250709215742im_/http://www.secti.pe.gov.br/wp-content/uploads/2025/03/Relatorio-Anual-de-Gestao-2024-SECTI-1_page-0001.jpg',
    arquivo: '#', // Substitua por URL real do arquivo
  },
  {
    id: 2,
    titulo: 'Guia de Projetos Tecnológicos',
    capa: 'https://web.archive.org/web/20250709215742im_/http://www.secti.pe.gov.br/wp-content/uploads/2025/03/Relatorio-Anual-de-Gestao-2024-SECTI-1_page-0001.jpg',
    arquivo: '#',
  },
  {
    id: 3,
    titulo: 'Estratégia de Desenvolvimento Sustentável',
    capa: 'https://web.archive.org/web/20250709215742im_/http://www.secti.pe.gov.br/wp-content/uploads/2025/03/Relatorio-Anual-de-Gestao-2024-SECTI-1_page-0001.jpg',
    arquivo: '#',
  },
  {
    id: 4,
    titulo: 'Análise de Mercado de Startups',
    capa: 'https://web.archive.org/web/20250709215742im_/http://www.secti.pe.gov.br/wp-content/uploads/2025/03/Relatorio-Anual-de-Gestao-2024-SECTI-1_page-0001.jpg',
    arquivo: '#',
  },
  {
    id: 5,
    titulo: 'Plano de Ação para Educação Digital',
    capa: 'https://web.archive.org/web/20250709215742im_/http://www.secti.pe.gov.br/wp-content/uploads/2025/03/Relatorio-Anual-de-Gestao-2024-SECTI-1_page-0001.jpg',
    arquivo: '#',
  },
];

export const Home = () => {
  return (
      <PublicLayout>
        <SecaoSlide slides={slides} autoplay interval={7000} />
        <SecaoNoticias noticiaDestaque={noticiaDestaque} noticias={noticias} />
        <SecaoProjetos projetos={projetos} />
        <SecaoDocumentos documentos={documentos} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to SECTI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Secretaria de Ciência, Tecnologia e Inovação
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-6">
                This is the institutional website for SECTI. Our mission is to promote
                science, technology, and innovation for the development of our society.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">🔬</div>
                  <h3 className="text-lg font-semibold mb-2">Research</h3>
                  <p className="text-gray-600">
                    Supporting cutting-edge research initiatives
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">💡</div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Fostering innovation and technological advancement
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">🎓</div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-gray-600">
                    Promoting scientific education and awareness
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
  );
};
