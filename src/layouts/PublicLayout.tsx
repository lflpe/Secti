import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import EstrelaGov from "../assets/EstrelaGov.png";
import MarcaCTI from "../assets/MarcaCTI.png";
import MarcaGov from "../assets/MarcaGov.png";
import MarcaCTINegativa from "../assets/MarcaCTINegativa.png";
import MarcaCTIPositiva from "../assets/MarcaCTIPositiva.png";

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();
  const [fontPercent, setFontPercent] = useState<number>(100);
  const [altoContraste, setAltoContraste] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [sectiDropdownOpen, setSectiDropdownOpen] = useState<boolean>(false);
  const [transparenciaDropdownOpen, setTransparenciaDropdownOpen] = useState<boolean>(false);
  const [ouvidoriaDropdownOpen, setOuvidoriaDropdownOpen] = useState<boolean>(false);
  const [sectiMobileOpen, setSectiMobileOpen] = useState<boolean>(false);
  const [transparenciaMobileOpen, setTransparenciaMobileOpen] = useState<boolean>(false);
  const [ouvidoriaMobileOpen, setOuvidoriaMobileOpen] = useState<boolean>(false);

  // Helper function to check if a path is active
  const isActiveLink = (path: string) => location.pathname === path;

  // Helper function to check if any path in a group is active
  const isActiveGroup = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

  // Check if SECTI section is active
  const isSectiActive = isActiveGroup(['/secti/']);

  // Check if Transparencia section is active
  const isTransparenciaActive = isActiveGroup(['/transparencia/']);

  // Check if Ouvidoria section is active
  const isOuvidoriaActive = isActiveGroup(['/ouvidoria/']);

  // Check if Noticias section is active
  const isNoticiasActive = isActiveLink('/noticias');

  // Check if Editais section is active
  const isEditaisActive = isActiveLink('/editais');

  useEffect(() => {
    try {
      document.documentElement.style.fontSize = `${fontPercent}%`;
    } catch {
      void 0;
    }
  }, [fontPercent]);

  useEffect(() => {
    try {
      if (altoContraste) document.documentElement.classList.add('alto-contraste');
      else document.documentElement.classList.remove('alto-contraste');
    } catch {
      void 0;
    }
  }, [altoContraste]);

  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    if (mobileOpen) {
      // Avoid layout shift when scrollbar disappears
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
      return () => {
        body.style.overflow = originalOverflow;
        body.style.paddingRight = originalPaddingRight;
        document.removeEventListener('keydown', handleEsc);
      };
    }
    return () => {};
  }, [mobileOpen]);

  const decreaseFont = () => setFontPercent(p => Math.max(80, p - 10));
  const increaseFont = () => setFontPercent(p => Math.min(140, p + 10));
  const toggleAltoContraste = () => setAltoContraste(v => !v);

  return (
    <>
      <div className="bg-[#0C2856] h-10 flex items-center">
        <div className="text-white flex items-center gap-x-2 container mx-auto px-4 sm:px-6 lg:px-8">
          <img src={EstrelaGov} alt="Logo do governo" className="h-5" />
          <span className="font-extralight">Governo de <b className="font-bold">Pernambuco</b></span>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white lg:shadow-sm relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Grid com 3 colunas: logo | menus (centro) | controles (direita) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-28">
              {/* coluna 1: logo (início) */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  {/* MarcaCTI visible on md+; MarcaGov visible on mobile */}
                  <img src={MarcaCTI} className="h-20 hidden lg:block" alt="Logo da SECTI" />
                  <img src={MarcaGov} className="h-16 block lg:hidden" alt="Marca Governo (mobile)" />
                </Link>
              </div>

              {/* coluna 2: menus centralizados (visível apenas em lg+) */}
              <div className="hidden lg:flex justify-center">
                <div className="flex items-center space-x-1 xl:space-x-2">
                  {/* Dropdown SECTI */}
                  <div
                    className="relative"
                    onMouseEnter={() => setSectiDropdownOpen(true)}
                    onMouseLeave={() => setSectiDropdownOpen(false)}
                  >
                    <button className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium flex items-center whitespace-nowrap transition-colors ${
                      isSectiActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}>
                      SECTI
                      <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {sectiDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                        <div className="py-1">
                          <Link to="/secti/a-secretaria" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/a-secretaria') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>A Secretaria</Link>
                          <Link to="/secti/a-secretaria-cargo" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/a-secretaria-cargo') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>A Secretária</Link>
                          <Link to="/secti/historia" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/historia') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>História</Link>
                          <Link to="/secti/documentos" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/documentos') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Documentos</Link>
                          <Link to="/secti/organograma" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/organograma') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Organograma</Link>
                          <Link to="/secti/certificacoes" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/certificacoes') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Certificações</Link>
                          <Link to="/secti/servidor" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/servidor') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Servidor</Link>
                          <Link to="/secti/parcerias" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/parcerias') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Parcerias</Link>
                          <Link to="/secti/legislacao" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/secti/legislacao') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Legislação</Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Transparência */}
                  <div
                    className="relative"
                    onMouseEnter={() => setTransparenciaDropdownOpen(true)}
                    onMouseLeave={() => setTransparenciaDropdownOpen(false)}
                  >
                    <button className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium flex items-center whitespace-nowrap transition-colors ${
                      isTransparenciaActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}>
                      Transparência
                      <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {transparenciaDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200 max-h-96 overflow-y-auto">
                        <div className="py-1">
                          <Link to="/transparencia/informacoes-institucionais" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/informacoes-institucionais') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Informações Institucionais</Link>
                          <Link to="/transparencia/perguntas-frequentes" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/perguntas-frequentes') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Perguntas Frequentes</Link>
                          <Link to="/transparencia/responsabilidade-fiscal" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/responsabilidade-fiscal') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Responsabilidade Fiscal</Link>
                          <Link to="/transparencia/fiscalizacao-controle" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/fiscalizacao-controle') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Fiscalização e Controle</Link>
                          <Link to="/transparencia/transferencias-acordos" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/transferencias-acordos') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Transferências Estaduais e Acordos</Link>
                          <Link to="/transparencia/receitas-transparencias" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/receitas-transparencias') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Receitas Transparências da União Dívida Ativa e Renúncia de Receita</Link>
                          <Link to="/transparencia/despesa" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/despesa') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Despesa</Link>
                          <Link to="/transparencia/licitacoes-contratos" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/licitacoes-contratos') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Licitações Contratos e Fornecedores</Link>
                          <Link to="/transparencia/obras-publicas" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/obras-publicas') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Obras Públicas</Link>
                          <Link to="/transparencia/patrimonio-publico" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/patrimonio-publico') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Patrimônio Público</Link>
                          <Link to="/transparencia/recursos-humanos" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/recursos-humanos') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Recursos Humanos</Link>
                          <Link to="/transparencia/sic" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/sic') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>SIC</Link>
                          <Link to="/transparencia/servidores" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/servidores') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Servidores</Link>
                          <Link to="/transparencia/mapa-terceirizados" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/mapa-terceirizados') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Mapa Terceirizados</Link>
                          <Link to="/transparencia/mapa-diarias-passagens" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/mapa-diarias-passagens') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Mapa de Diárias e Passagens</Link>
                          <Link to="/transparencia/mapa-convenios" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/mapa-convenios') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Mapa de Convênios</Link>
                          <Link to="/transparencia/mapa-contratos" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/mapa-contratos') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Mapa de Contratos</Link>
                          <Link to="/transparencia/mapa-cargos-comissionados" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/transparencia/mapa-cargos-comissionados') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Mapa de Cargos Comissionados e Funções Gratificadas</Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/noticias"
                    className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap transition-colors ${
                      isNoticiasActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Notícias
                  </Link>

                  <Link
                    to="/editais"
                    className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap transition-colors ${
                      isEditaisActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Editais
                  </Link>

                  {/* Dropdown Ouvidoria */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOuvidoriaDropdownOpen(true)}
                    onMouseLeave={() => setOuvidoriaDropdownOpen(false)}
                  >
                    <button className={`px-2 py-2 rounded-md text-xs xl:text-sm font-medium flex items-center whitespace-nowrap transition-colors ${
                      isOuvidoriaActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}>
                      Ouvidoria
                      <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {ouvidoriaDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                        <div className="py-1">
                          <Link to="/ouvidoria/apresentacao" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/apresentacao') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Apresentação da Ouvidoria</Link>
                          <Link to="/ouvidoria/fale-com-ouvidoria" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/fale-com-ouvidoria') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Fale com a Ouvidoria - Ouve.pe</Link>
                          <Link to="/ouvidoria/consulta-gcon" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/consulta-gcon') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Consulta Sistema GCON (Antigo)</Link>
                          <Link to="/ouvidoria/processo" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/processo') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Processo</Link>
                          <Link to="/ouvidoria/rede-ouvidorias" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/rede-ouvidorias') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Rede de Ouvidorias da Secti</Link>
                          <Link to="/ouvidoria/relatorios" className={`block px-4 py-2 text-sm transition-colors ${isActiveLink('/ouvidoria/relatorios') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Relatórios</Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* coluna 3: controles (direita) */}
              <div className="flex items-center justify-end">
                {/* hamburger (mobile) */}
                <button
                  onClick={() => setMobileOpen(v => !v)}
                  aria-expanded={mobileOpen}
                  aria-label="Abrir menu"
                  className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 "
                >
                  {/* simple hamburger icon */}
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* desktop controls (lg+) */}
                <div className="hidden lg:flex justify-end items-center space-x-2">
                  <button
                    aria-label="Diminuir fonte"
                    onClick={decreaseFont}
                    className="text-[#0C2856] font-bold cursor-pointer text-lg xl:text-xl"
                  >
                    A-
                  </button>
                  <button
                    aria-label="Aumentar fonte"
                    onClick={increaseFont}
                    className="text-[#0C2856] font-bold cursor-pointer text-lg xl:text-xl"
                  >
                    A+
                  </button>
                  <button
                    aria-pressed={altoContraste}
                    onClick={toggleAltoContraste}
                    className={`px-2 xl:px-3 py-1.5 xl:py-2 cursor-pointer rounded-3xl text-xs xl:text-sm border whitespace-nowrap ${altoContraste ? 'bg-black text-white' : 'text-white bg-[#0C2856] transition duration-200 hover:scale-105'}`}
                  >
                    Alto Contraste
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* linha móvel com dois textos fora do hamburger (apenas mobile < lg) */}
        <div className="bg-white shadow-sm block lg:hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" py-3">
              <div className="text-base mb-3 font-medium text-[#0C2856]">Secretaria de Ciência, Tecnologia e Inovação</div>
              <div className="text-sm text-[#0C2856]">SECTI</div>
            </div>
          </div>
        </div>

        {/* overlay + slide-in panel for mobile menu (screens < lg) */}
        {/* overlay */}
        <div
          className={`${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity duration-300 lg:hidden z-40`}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />

        {/* slide-in panel */}
        <aside
          className={`fixed -right-5 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
           role="dialog"
           aria-modal="true"
         >
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              {/* close button (top-right inside panel) */}
              <div className="flex justify-end">
                <button
                  aria-label="Fechar menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {/* SECTI Accordion */}
                <div>
                  <button
                    onClick={() => setSectiMobileOpen(!sectiMobileOpen)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center justify-between transition-colors ${
                      isSectiActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    SECTI
                    <svg className={`h-4 w-4 transition-transform ${sectiMobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {sectiMobileOpen && (
                    <div className="ml-4 space-y-1 mt-1">
                      <Link to="/secti/a-secretaria" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/a-secretaria') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>A Secretaria</Link>
                      <Link to="/secti/a-secretaria-cargo" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/a-secretaria-cargo') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>A Secretária</Link>
                      <Link to="/secti/historia" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/historia') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>História</Link>
                      <Link to="/secti/documentos" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/documentos') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Documentos</Link>
                      <Link to="/secti/organograma" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/organograma') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Organograma</Link>
                      <Link to="/secti/certificacoes" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/certificacoes') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Certificações</Link>
                      <Link to="/secti/servidor" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/servidor') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Servidor</Link>
                      <Link to="/secti/parcerias" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/parcerias') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Parcerias</Link>
                      <Link to="/secti/legislacao" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/secti/legislacao') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Legislação</Link>
                    </div>
                  )}
                </div>

                {/* Transparência Accordion */}
                <div>
                  <button
                    onClick={() => setTransparenciaMobileOpen(!transparenciaMobileOpen)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center justify-between transition-colors ${
                      isTransparenciaActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    Transparência
                    <svg className={`h-4 w-4 transition-transform ${transparenciaMobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {transparenciaMobileOpen && (
                    <div className="ml-4 space-y-1 mt-1">
                      <Link to="/transparencia/informacoes-institucionais" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/informacoes-institucionais') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Informações Institucionais</Link>
                      <Link to="/transparencia/perguntas-frequentes" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/perguntas-frequentes') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Perguntas Frequentes</Link>
                      <Link to="/transparencia/responsabilidade-fiscal" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/responsabilidade-fiscal') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Responsabilidade Fiscal</Link>
                      <Link to="/transparencia/fiscalizacao-controle" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/fiscalizacao-controle') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Fiscalização e Controle</Link>
                      <Link to="/transparencia/transferencias-acordos" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/transferencias-acordos') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Transferências Estaduais e Acordos</Link>
                      <Link to="/transparencia/receitas-transparencias" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/receitas-transparencias') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Receitas Transparências da União Dívida Ativa e Renúncia de Receita</Link>
                      <Link to="/transparencia/despesa" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/despesa') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Despesa</Link>
                      <Link to="/transparencia/licitacoes-contratos" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/licitacoes-contratos') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Licitações Contratos e Fornecedores</Link>
                      <Link to="/transparencia/obras-publicas" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/obras-publicas') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Obras Públicas</Link>
                      <Link to="/transparencia/patrimonio-publico" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/patrimonio-publico') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Patrimônio Público</Link>
                      <Link to="/transparencia/recursos-humanos" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/recursos-humanos') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Recursos Humanos</Link>
                      <Link to="/transparencia/sic" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/sic') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>SIC</Link>
                      <Link to="/transparencia/servidores" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/servidores') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Servidores</Link>
                      <Link to="/transparencia/mapa-terceirizados" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/mapa-terceirizados') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Mapa Terceirizados</Link>
                      <Link to="/transparencia/mapa-diarias-passagens" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/mapa-diarias-passagens') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Mapa de Diárias e Passagens</Link>
                      <Link to="/transparencia/mapa-convenios" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/mapa-convenios') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Mapa de Convênios</Link>
                      <Link to="/transparencia/mapa-contratos" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/mapa-contratos') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Mapa de Contratos</Link>
                      <Link to="/transparencia/mapa-cargos-comissionados" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/transparencia/mapa-cargos-comissionados') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Mapa de Cargos Comissionados e Funções Gratificadas</Link>
                    </div>
                  )}
                </div>

                {/* Ouvidoria Accordion */}
                <div>
                  <button
                    onClick={() => setOuvidoriaMobileOpen(!ouvidoriaMobileOpen)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center justify-between transition-colors ${
                      isOuvidoriaActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    Ouvidoria
                    <svg className={`h-4 w-4 transition-transform ${ouvidoriaMobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {ouvidoriaMobileOpen && (
                    <div className="ml-4 space-y-1 mt-1">
                      <Link to="/ouvidoria/apresentacao" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/apresentacao') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Apresentação da Ouvidoria</Link>
                      <Link to="/ouvidoria/fale-com-ouvidoria" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/fale-com-ouvidoria') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Fale com a Ouvidoria - Ouve.pe</Link>
                      <Link to="/ouvidoria/consulta-gcon" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/consulta-gcon') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Consulta Sistema GCON (Antigo)</Link>
                      <Link to="/ouvidoria/processo" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/processo') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Processo</Link>
                      <Link to="/ouvidoria/rede-ouvidorias" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/rede-ouvidorias') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Rede de Ouvidorias da Secti</Link>
                      <Link to="/ouvidoria/relatorios" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActiveLink('/ouvidoria/relatorios') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>Relatórios</Link>
                    </div>
                  )}
                </div>

                <Link to="/noticias" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isNoticiasActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Notícias</Link>
                <Link to="/editais" onClick={() => setMobileOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isEditaisActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>Editais</Link>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <button aria-label="Diminuir fonte" onClick={() => { decreaseFont(); }} className="px-3 py-1 border rounded-md text-sm bg-white">A-</button>
                <button aria-label="Aumentar fonte" onClick={() => { increaseFont(); }} className="px-3 py-1 border rounded-md text-sm bg-white">A+</button>
                <button aria-pressed={altoContraste} onClick={() => { toggleAltoContraste(); }} className={`px-3 py-1 rounded-md text-sm border ${altoContraste ? 'bg-black text-white' : 'bg-white'}`}>Alto Contraste</button>
              </div>
            </div>
          </div>
        </aside>


        <main>{children}</main>

        <footer>
          <div className="bg-[#195CE3] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 py-6">
                <div className="flex items-center justify-center sm:justify-start">
                  <img src={MarcaCTINegativa} alt="Marca CTI" className="h-16" />
                </div>
                <div className="sm:col-span-1 flex items-center justify-center">
                  <div>
                    <div className="font-semibold">Coluna 2</div>
                    <div className="text-sm">Informações</div>
                  </div>
                </div>
                <div className="sm:col-span-1 flex items-center justify-center">
                  <div>
                    <div className="font-semibold">Coluna 3</div>
                    <div className="text-sm">Links úteis</div>
                  </div>
                </div>
                <div className="sm:col-span-1 flex mt-2 items-center justify-center md:justify-end">
                  <div className="flex items-center space-x-4">
                    <a href="https://www.instagram.com/secti.pernambuco/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-gray-200 transition duration-200 hover:scale-110">
                      <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                    </a>

                    <a href="https://www.linkedin.com/company/sectipe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-gray-200 transition duration-200 hover:scale-110">
                      <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                    </a>

                    <a href="https://x.com/SectiPE" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white hover:text-gray-200 transition duration-200 hover:scale-110">
                      <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
                    </a>

                    <a href="https://www.youtube.com/@sectipernambuco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white hover:text-gray-200 transition duration-200 hover:scale-110">
                      <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 2° row: fundo 0C2856, texto B5C4FF, duas colunas */}
          <div className="bg-[#0C2856] text-[#B5C4FF]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 py-4">
                <div className="flex justify-center md:justify-start">
                  <div>
                    <div className="font-medium">Secretaria de Ciência, Tecnologia e Inovação</div>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="text-sm text-center md:text-right">
                    <div>Rua Vital de Oliveira, 32 - Recife, PE - 50030-370</div>
                    <div>Telefone: (81) 3183-5550</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-[#161616]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 py-4">
                <div className="text-base font-bold">Desenvolvido por:</div>
                <div className="flex items-center">
                  <img src={MarcaCTIPositiva} alt="Marca CTI" className="h-16" />
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};
