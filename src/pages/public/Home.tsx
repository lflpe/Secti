import { useEffect, useState } from 'react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { SecaoSlide } from '../../components/SecaoSlide';
import type { SlideItem } from '../../components/SecaoSlide';
import { SecaoNoticias } from '../../components/SecaoNoticias';
import type { NoticiaItem } from '../../components/SecaoNoticias';
import { SecaoProjetos } from '../../components/SecaoProjetos';
import type { ProjetoItem } from '../../components/SecaoProjetos';
import { SecaoRelatorios } from '../../components/SecaoRelatorios';
import { noticiasService } from '../../services/noticiasService';
import { handleApiError } from '../../utils/errorHandler';
import { LoadingScreen } from '../../components/LoadingScreen';
import SectiPredio from "../../assets/SECTIPredio.jpg"
import ArcoEC from "../../assets/ArcoEC.jpg"
import EntradaParqtel from "../../assets/EntradaParqtel.jpg"

const slides: SlideItem[] = [
  {
    id: 1,
    image: SectiPredio,
    title: 'Bem-vindo à SECTI',
    description: 'Secretaria de Ciência, Tecnologia e Inovação - promovendo conhecimento e inovação.',
    button: { text: 'Saiba mais', href: '/secti/a-secretaria' },
  },
  {
    id: 2,
    image: ArcoEC,
    title: 'Espaço Ciência',
    description: 'Museu, localizado entre as cidades de Olinda e Recife, em Pernambuco. São 120.000 m² de área para fruição, lazer e aprendizagem.',
    button: { text: 'Visitar site', href: 'https://www.espacociencia.pe.gov.br/' },
  },
  {
    id: 3,
    image: EntradaParqtel,
    title: 'Parqtel',
    description: 'Projetos que transformam ideias em soluções reais.',
    button: { text: 'Visitar site', href: 'https://www.espacociencia.pe.gov.br/' },
  },
];

// ...existing code...
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

export const Home = () => {
  const [noticiaDestaque, setNoticiaDestaque] = useState<NoticiaItem | null>(null);
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [isLoadingNoticias, setIsLoadingNoticias] = useState(true);

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        setIsLoadingNoticias(true);
        // Buscar notícias publicadas do endpoint público
        const response = await noticiasService.listarPublico({
          itensPorPagina: 10
        });

        if (response.itens.length > 0) {
          // Converter primeiro item para NoticiaItem (destaque)
          const primeiraNoticia = response.itens[0];
          setNoticiaDestaque({
            id: primeiraNoticia.id,
            slug: primeiraNoticia.slug,
            titulo: primeiraNoticia.titulo,
            categoria: 'Notícia',
            autor: primeiraNoticia.autor,
            data: new Date(primeiraNoticia.dataPublicacao).toLocaleDateString('pt-BR'),
            resumo: primeiraNoticia.resumo,
            imagem: primeiraNoticia.imagemCapaUrl || SectiPredio,
            link: `/noticias/${primeiraNoticia.id}`,
          });

          // Converter restante em NoticiaItem para a lista
          const noticiasList = response.itens.slice(1, 4).map(noticia => ({
            id: noticia.id,
            slug: noticia.slug,
            titulo: noticia.titulo,
            categoria: 'Notícia',
            data: new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR'),
            imagem: noticia.imagemCapaUrl || SectiPredio,
            link: `/noticias/${noticia.id}`,
          }));

          setNoticias(noticiasList);
        }
      } catch (error) {
        console.error('Erro ao carregar notícias:', handleApiError(error));
        // Manter notícias em branco em caso de erro
      } finally {
        setIsLoadingNoticias(false);
      }
    };

    carregarNoticias();
  }, []);

  // Notícia destaque padrão em caso de erro
  const defaultNoticiaDestaque: NoticiaItem = {
    id: 0,
    slug: 'padrao',
    titulo: 'Bem-vindo à SECTI',
    categoria: 'Notícia',
    autor: 'Redação SECTI',
    data: new Date().toLocaleDateString('pt-BR'),
    resumo: 'Acompanhe as últimas notícias sobre inovação e tecnologia em Pernambuco.',
    imagem: SectiPredio,
    link: '#',
  };

  return (
      <>
        {isLoadingNoticias && <LoadingScreen />}
        <PublicLayout>
          <SecaoSlide slides={slides} autoplay interval={7000} />

          {!isLoadingNoticias && (
            <>
              <SecaoNoticias
                noticiaDestaque={noticiaDestaque || defaultNoticiaDestaque}
                noticias={noticias}
              />
              <SecaoProjetos projetos={projetos} />
              <SecaoRelatorios limit={6} />
            </>
          )}
        </PublicLayout>
      </>
  );
};
