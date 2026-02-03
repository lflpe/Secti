import { PublicLayout } from '../../layouts/PublicLayout.tsx';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faXTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faCalendar, faUser, faShare } from '@fortawesome/free-solid-svg-icons';

// Tipo para a notícia
interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  imagemDestaque: string;
  conteudo: string;
  resumo: string;
  categoria: string;
}

// Dados mockados - substituir por chamada à API
const noticiasMock: Noticia[] = [
  {
    id: 1,
    slug: 'secti-lanca-programa-inovacao-tecnologica',
    titulo: 'SECTI lança novo programa de inovação tecnológica para startups pernambucanas',
    autor: 'Maria Silva',
    dataPublicacao: '25/01/2024',
    imagemDestaque: 'https://via.placeholder.com/1200x600/0C2856/ffffff?text=SECTI+Inova%C3%A7%C3%A3o',
    resumo: 'Iniciativa visa fomentar o ecossistema de inovação em Pernambuco',
    categoria: 'Inovação',
    conteudo: `
      <p>A Secretaria de Ciência, Tecnologia e Inovação de Pernambuco (SECTI) anunciou nesta terça-feira (25) o lançamento de um novo programa destinado a impulsionar startups e empresas de base tecnológica no estado. A iniciativa, batizada de "SECTI Inova", oferecerá suporte financeiro, mentorias especializadas e acesso a laboratórios de pesquisa.</p>

      <p>Segundo a secretária de Ciência e Tecnologia, o programa representa um marco importante para o desenvolvimento do ecossistema de inovação em Pernambuco. "Estamos comprometidos em transformar Pernambuco em um polo de tecnologia e inovação no Nordeste", afirmou durante o evento de lançamento.</p>

      <h3>Investimento e Benefícios</h3>

      <p>O programa contará com um investimento inicial de R$ 10 milhões, que serão distribuídos entre as startups selecionadas ao longo do próximo ano. Além do aporte financeiro, as empresas participantes terão acesso a:</p>

      <ul>
        <li>Mentorias com especialistas em gestão, tecnologia e mercado</li>
        <li>Infraestrutura compartilhada em hubs de inovação</li>
        <li>Laboratórios de pesquisa e desenvolvimento</li>
        <li>Networking com investidores e parceiros estratégicos</li>
        <li>Capacitação técnica e gerencial</li>
      </ul>

      <h3>Critérios de Seleção</h3>

      <p>As startups interessadas devem se inscrever através do portal da SECTI até o dia 28 de fevereiro. Serão priorizadas empresas que desenvolvam soluções nas áreas de:</p>

      <ul>
        <li>Inteligência Artificial e Machine Learning</li>
        <li>Internet das Coisas (IoT)</li>
        <li>Biotecnologia</li>
        <li>Energias Renováveis</li>
        <li>Saúde Digital</li>
        <li>Educação Tecnológica</li>
      </ul>

      <p>O processo seletivo será conduzido por uma comissão técnica composta por representantes da SECTI, universidades parceiras e investidores do setor de tecnologia. As startups selecionadas serão anunciadas até o final de março.</p>

      <h3>Parcerias Estratégicas</h3>

      <p>O programa conta com o apoio de importantes instituições como a Universidade Federal de Pernambuco (UFPE), a Universidade de Pernambuco (UPE), o Porto Digital e a Fundação de Amparo à Ciência e Tecnologia do Estado de Pernambuco (FACEPE).</p>

      <p>Representantes dessas instituições participaram do evento de lançamento e reforçaram o compromisso com o desenvolvimento tecnológico do estado. "Esta parceria fortalece o ecossistema de inovação e cria oportunidades reais para empreendedores pernambucanos", destacou o reitor da UFPE.</p>

      <h3>Impacto Esperado</h3>

      <p>A expectativa é que o programa beneficie diretamente cerca de 50 startups no primeiro ano, gerando aproximadamente 500 novos empregos qualificados no setor de tecnologia. Além disso, a iniciativa deve atrair novos investimentos para o estado e fortalecer a posição de Pernambuco no cenário nacional de inovação.</p>

      <p>Para mais informações sobre o programa e inscrições, acesse o site oficial da SECTI ou entre em contato através do e-mail: inovacao@secti.pe.gov.br</p>
    `
  },
  {
    id: 2,
    slug: 'programa-inovacao-tecnologica',
    titulo: 'Pernambuco lança novo programa de inovação tecnológica',
    autor: 'Redação SECTI',
    dataPublicacao: '15/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    resumo: 'O governo de Pernambuco anuncia investimento de R$ 50 milhões em startups e projetos de tecnologia para impulsionar o ecossistema de inovação do estado.',
    categoria: 'Inovação',
    conteudo: `
      <p>O governo de Pernambuco, através da Secretaria de Ciência, Tecnologia e Inovação (SECTI), anunciou um robusto investimento de R$ 50 milhões destinado a startups e projetos de tecnologia. O objetivo é fortalecer e expandir o ecossistema de inovação do estado, criando novas oportunidades para empreendedores e pesquisadores.</p>

      <h3>Objetivos do Programa</h3>

      <p>O programa visa apoiar empreendedores e pesquisadores na criação de soluções inovadoras que possam transformar o cenário tecnológico pernambucano. Serão contempladas iniciativas nas áreas de tecnologia da informação, biotecnologia, agronegócio digital e energias renováveis.</p>

      <h3>Como Participar</h3>

      <p>As inscrições estarão abertas a partir do próximo mês e poderão ser realizadas através do portal oficial da SECTI. Empresas em estágio inicial e projetos de pesquisa aplicada terão prioridade na seleção.</p>

      <p>Para mais informações, acompanhe os canais oficiais da SECTI.</p>
    `
  },
  {
    id: 3,
    slug: 'exposicao-sustentabilidade',
    titulo: 'Espaço Ciência recebe nova exposição interativa sobre sustentabilidade',
    autor: 'Marina Santos',
    dataPublicacao: '12/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop',
    resumo: 'A nova exposição "Planeta Sustentável" oferece experiências imersivas sobre mudanças climáticas, energia renovável e preservação ambiental.',
    categoria: 'Educação',
    conteudo: `
      <p>O Espaço Ciência, um dos principais museus de ciência do Nordeste, inaugurou nesta semana a exposição "Planeta Sustentável", que conta com mais de 20 experimentos interativos focados em educação ambiental e sustentabilidade.</p>

      <h3>Experiências Imersivas</h3>

      <p>Os visitantes poderão explorar temas como mudanças climáticas, energia renovável, reciclagem e preservação da biodiversidade através de atividades práticas e lúdicas. A exposição foi desenvolvida em parceria com universidades e centros de pesquisa.</p>

      <h3>Visitação</h3>

      <p>A exposição está aberta ao público de terça a domingo, das 8h às 17h. A entrada é gratuita para estudantes de escolas públicas e tem valor promocional para o público em geral.</p>

      <p>Venha visitar e aprender sobre como podemos construir um futuro mais sustentável!</p>
    `
  },
  {
    id: 4,
    slug: 'incubadora-startups-2025',
    titulo: 'Parqtel abre inscrições para incubadora de startups 2025',
    autor: 'Carlos Oliveira',
    dataPublicacao: '10/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop',
    resumo: 'O Parque Tecnológico de Pernambuco está com inscrições abertas para seu programa de incubação 2025.',
    categoria: 'Negócios',
    conteudo: `
      <p>O Parqtel abriu oficialmente as inscrições para seu programa de incubação de startups 2025. São 30 vagas disponíveis para empresas nas áreas de tecnologia, saúde digital, fintech e agronegócios.</p>

      <h3>Benefícios</h3>

      <p>As startups selecionadas terão acesso a infraestrutura completa, mentorias especializadas, networking com investidores e apoio jurídico e contábil. O programa tem duração de 12 meses.</p>

      <h3>Critérios</h3>

      <p>Podem se inscrever startups em estágio inicial com soluções inovadoras e escaláveis. As inscrições vão até 31 de janeiro de 2025.</p>
    `
  },
  {
    id: 5,
    slug: 'hackathon-ciencia-dados',
    titulo: 'Hackathon de Ciência de Dados acontece em Recife',
    autor: 'Ana Paula Ferreira',
    dataPublicacao: '08/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop',
    resumo: 'O maior hackathon de ciência de dados do Nordeste reunirá 200 participantes durante três dias no Porto Digital.',
    categoria: 'Eventos',
    conteudo: `
      <p>Nos dias 20, 21 e 22 de janeiro acontecerá no Porto Digital o maior hackathon de ciência de dados do Nordeste. O evento reunirá 200 participantes de diversas regiões do país.</p>

      <h3>Premiação</h3>

      <p>Os três melhores projetos receberão prêmios que totalizam R$ 100 mil. Além disso, as equipes vencedoras terão oportunidade de mentorias com especialistas da área.</p>

      <h3>Inscrições</h3>

      <p>As inscrições são gratuitas e podem ser feitas através do site do evento. Estudantes e profissionais de tecnologia são bem-vindos!</p>
    `
  },
  {
    id: 6,
    slug: 'parceria-universidades-europeias',
    titulo: 'SECTI firma parceria com universidades europeias',
    autor: 'Roberto Silva',
    dataPublicacao: '05/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop',
    resumo: 'Acordo de cooperação internacional permitirá intercâmbio de pesquisadores e desenvolvimento conjunto de projetos.',
    categoria: 'Parcerias',
    conteudo: `
      <p>A SECTI assinou acordo de cooperação com três importantes universidades europeias para desenvolvimento conjunto de projetos em inteligência artificial e biotecnologia.</p>

      <h3>Intercâmbio</h3>

      <p>O acordo prevê intercâmbio de pesquisadores, compartilhamento de infraestrutura de pesquisa e desenvolvimento de projetos conjuntos nas áreas de IA e biotecnologia.</p>

      <p>Esta parceria fortalece a pesquisa científica em Pernambuco e abre novas portas para colaborações internacionais.</p>
    `
  },
  {
    id: 7,
    slug: 'certificacao-biotecnologia',
    titulo: 'Laboratório de Biotecnologia recebe certificação internacional',
    autor: 'Dra. Fernanda Costa',
    dataPublicacao: '03/12/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=600&fit=crop',
    resumo: 'O laboratório da UFPE, apoiado pela SECTI, obteve certificação ISO para pesquisas em bioengenharia.',
    categoria: 'Pesquisa',
    conteudo: `
      <p>O Laboratório de Biotecnologia da UFPE, com apoio da SECTI, recebeu certificação ISO 17025 para pesquisas em bioengenharia, colocando Pernambuco no mapa mundial da biotecnologia.</p>

      <h3>Reconhecimento Internacional</h3>

      <p>A certificação atesta a qualidade e confiabilidade dos processos e resultados das pesquisas realizadas no laboratório, abrindo portas para colaborações internacionais.</p>

      <p>Este é um marco importante para a ciência pernambucana.</p>
    `
  },
  {
    id: 8,
    slug: 'capacitacao-inteligencia-artificial',
    titulo: 'Programa de capacitação em IA treina 500 profissionais',
    autor: 'Prof. João Mendes',
    dataPublicacao: '28/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    resumo: 'Iniciativa da SECTI em parceria com o CESAR oferece curso gratuito de inteligência artificial.',
    categoria: 'Educação',
    conteudo: `
      <p>A SECTI, em parceria com o CESAR, lançou programa de capacitação gratuita em inteligência artificial que já treinou 500 profissionais de TI e estudantes universitários.</p>

      <h3>Conteúdo do Curso</h3>

      <p>O programa abrange fundamentos de IA, machine learning, deep learning e aplicações práticas. Os participantes desenvolvem projetos reais durante o curso.</p>

      <p>Novas turmas serão abertas em 2025. Fique atento!</p>
    `
  },
  {
    id: 9,
    slug: 'festival-robotica',
    titulo: 'Festival de Robótica atrai milhares de jovens ao Recife',
    autor: 'Luiza Almeida',
    dataPublicacao: '25/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    resumo: 'O evento anual promovido pela SECTI reuniu 150 equipes de escolas públicas e privadas.',
    categoria: 'Eventos',
    conteudo: `
      <p>O Festival de Robótica 2024, promovido pela SECTI, foi um grande sucesso com a participação de 150 equipes de escolas públicas e privadas de todo o estado.</p>

      <h3>Competições</h3>

      <p>As equipes competiram em diversas categorias, incluindo robôs autônomos, combate e desafios de programação. O evento estimula o interesse dos jovens pela ciência e tecnologia.</p>

      <p>A próxima edição já está sendo planejada para 2025!</p>
    `
  },
  {
    id: 10,
    slug: 'startup-agricultura-iot',
    titulo: 'Startup pernambucana desenvolve solução para agricultura',
    autor: 'Marcos Pereira',
    dataPublicacao: '22/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
    resumo: 'Empresa incubada no Parqtel cria sistema de monitoramento inteligente usando sensores IoT.',
    categoria: 'Inovação',
    conteudo: `
      <p>Uma startup pernambucana incubada no Parqtel desenvolveu sistema inovador de monitoramento agrícola que aumenta a produtividade em 30% usando sensores IoT e inteligência artificial.</p>

      <h3>Tecnologia</h3>

      <p>O sistema monitora em tempo real condições do solo, clima e pragas, permitindo que agricultores tomem decisões mais precisas e eficientes.</p>

      <p>A solução já está sendo utilizada em diversas propriedades rurais do estado.</p>
    `
  },
  {
    id: 11,
    slug: 'investimento-pesquisa-medica',
    titulo: 'SECTI investe R$ 20 milhões em pesquisa médica',
    autor: 'Dra. Patrícia Lima',
    dataPublicacao: '20/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    resumo: 'Recursos serão destinados a projetos de pesquisa em medicina personalizada.',
    categoria: 'Pesquisa',
    conteudo: `
      <p>A SECTI anunciou investimento de R$ 20 milhões em projetos de pesquisa médica, com foco em medicina personalizada e desenvolvimento de novos tratamentos para doenças tropicais.</p>

      <h3>Projetos Contemplados</h3>

      <p>Serão apoiados projetos de universidades e centros de pesquisa que desenvolvam soluções inovadoras na área da saúde.</p>

      <p>Este investimento reforça o compromisso de Pernambuco com a ciência e a saúde pública.</p>
    `
  },
  {
    id: 12,
    slug: 'semana-ciencia-tecnologia',
    titulo: 'Semana de Ciência e Tecnologia movimenta o estado',
    autor: 'Equipe SECTI',
    dataPublicacao: '18/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    resumo: 'Evento anual da SECTI promove palestras, workshops e feira de ciências em 20 cidades.',
    categoria: 'Eventos',
    conteudo: `
      <p>A Semana de Ciência e Tecnologia 2024 foi realizada com sucesso em 20 cidades pernambucanas, atingindo mais de 50 mil pessoas com atividades gratuitas.</p>

      <h3>Atividades</h3>

      <p>O evento incluiu palestras, workshops, feira de ciências, experimentos interativos e apresentações de projetos de pesquisa.</p>

      <p>A iniciativa visa popularizar a ciência e despertar vocações científicas entre os jovens.</p>
    `
  },
  {
    id: 13,
    slug: 'centro-energias-renovaveis',
    titulo: 'Novo centro de pesquisa em energias renováveis é inaugurado',
    autor: 'Eng. Ricardo Nunes',
    dataPublicacao: '15/11/2024',
    imagemDestaque: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=600&fit=crop',
    resumo: 'Instalação de R$ 15 milhões no Agreste focará em energia solar e eólica.',
    categoria: 'Pesquisa',
    conteudo: `
      <p>Foi inaugurado no Agreste pernambucano o novo Centro de Pesquisa em Energias Renováveis, uma instalação de R$ 15 milhões que focará em estudos sobre energia solar e eólica.</p>

      <h3>Infraestrutura</h3>

      <p>O centro conta com laboratórios modernos, equipamentos de ponta e capacidade para gerar 200 empregos especializados.</p>

      <h3>Impacto</h3>

      <p>O objetivo é desenvolver tecnologias e soluções que contribuam para a transição energética do estado, tornando Pernambuco referência em energias renováveis.</p>

      <p>Pesquisadores e empresas interessadas podem visitar o centro e conhecer as linhas de pesquisa disponíveis.</p>
    `
  }
];

export const VisualizarNoticia = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Buscar notícia pelo slug - em produção, buscar da API
  const noticia = noticiasMock.find(n => n.slug === slug);

  if (!noticia) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Notícia não encontrada</h1>
            <button
              onClick={() => navigate('/noticias')}
              className="bg-[#0C2856] text-white px-6 py-3 rounded-lg hover:bg-[#195CE3] transition-colors"
            >
              Voltar para Notícias
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // URL atual para compartilhamento
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(noticia.titulo);

  // Funções de compartilhamento
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  const shareOnWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram não tem compartilhamento direto de links, então copia para clipboard
    navigator.clipboard.writeText(currentUrl);
    alert('Link copiado! Cole no Instagram.');
  };

  return (
    <PublicLayout>
      {/* Breadcrumb e Voltar */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/noticias')}
            className="cursor-pointer flex items-center gap-2 text-[#0C2856] hover:text-[#195CE3] font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Voltar para Notícias</span>
          </button>
        </div>
      </div>

      {/* Conteúdo da Notícia */}
      <article className="pt-4 pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Categoria */}
            <div className="mb-6">
              <span className="inline-block bg-[#195CE3] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {noticia.categoria}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#0C2856] mb-6 leading-tight">
              {noticia.titulo}
            </h1>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-[#195CE3]" />
                <span className="font-medium">Por {noticia.autor}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="text-[#195CE3]" />
                <span>{noticia.dataPublicacao}</span>
              </div>
            </div>

            {/* Botões de Compartilhamento */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faShare} className="text-[#0C2856]" />
                  <span className="font-semibold text-[#0C2856]">Compartilhar:</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={shareOnFacebook}
                    className="bg-[#1877F2] cursor-pointer text-white p-3 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Compartilhar no Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="bg-[#000000] cursor-pointer text-white p-3 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Compartilhar no X (Twitter)"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
                  </button>
                  <button
                    onClick={shareOnLinkedin}
                    className="bg-[#0A66C2] cursor-pointer text-white p-3 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                  </button>
                  <button
                    onClick={shareOnWhatsapp}
                    className="bg-[#25D366] cursor-pointer text-white p-3 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Compartilhar no WhatsApp"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                  </button>
                  <button
                    onClick={shareOnInstagram}
                    className="bg-linear-to-tr cursor-pointer from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white p-3 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label="Copiar link para Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Imagem Destaque */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
              <img
                src={noticia.imagemDestaque}
                alt={noticia.titulo}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Conteúdo da Notícia */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-[#0C2856] prose-headings:font-bold
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-a:text-[#195CE3] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0C2856] prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />

            {/* Compartilhar novamente no final */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-[#0C2856] rounded-lg p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Gostou desta notícia?</h3>
                <p className="text-lg mb-6">Compartilhe com seus amigos nas redes sociais</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={shareOnFacebook}
                    className="bg-white/20 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    aria-label="Compartilhar no Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="bg-white/20 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    aria-label="Compartilhar no X (Twitter)"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
                  </button>
                  <button
                    onClick={shareOnLinkedin}
                    className="bg-white/20 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                  </button>
                  <button
                    onClick={shareOnWhatsapp}
                    className="bg-white/20 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    aria-label="Compartilhar no WhatsApp"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                  </button>
                  <button
                    onClick={shareOnInstagram}
                    className="bg-white/20 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    aria-label="Copiar link para Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Botão Voltar */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/noticias')}
                className="inline-flex cursor-pointer items-center gap-2 bg-[#0C2856] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#195CE3] transition-colors shadow-lg"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Voltar para todas as notícias</span>
              </button>
            </div>

          </div>
        </div>
      </article>
    </PublicLayout>
  );
};
