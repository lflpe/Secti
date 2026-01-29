import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
  // font size as percentage (applied to the root element)
  const [fontPercent, setFontPercent] = useState<number>(100);
  const [altoContraste, setAltoContraste] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    // Apply font size to the root (html) so Tailwind rem-based sizes scale
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

  // Lock body scroll while mobile menu is open and close on Escape
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
                <div className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="hidden lg:inline-block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="hidden lg:inline-block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
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
                <div className="hidden lg:flex justify-end items-center space-x-3">
                  <button
                    aria-label="Diminuir fonte"
                    onClick={decreaseFont}
                    className="text-[#0C2856] font-bold cursor-pointer text-xl"
                  >
                    A-
                  </button>
                  <button
                    aria-label="Aumentar fonte"
                    onClick={increaseFont}
                    className="text-[#0C2856] font-bold cursor-pointer text-xl"
                  >
                    A+
                  </button>
                  <button
                    aria-pressed={altoContraste}
                    onClick={toggleAltoContraste}
                    className={`px-3 py-2 cursor-pointer rounded-3xl  text-base border ${altoContraste ? 'bg-black text-white' : 'text-white bg-[#0C2856] transition duration-200 hover:scale-110'}`}
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
                <Link to="/" onClick={() => setMobileOpen(false)} className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">About</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium">Login</Link>
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

        {/* Footer com 3 rows conforme pedido */}
        <footer className="mt-8">
          {/* 1° row: fundo 195CE3, texto branco, 4 colunas, primeira coluna marca CTI verticalmente centralizada */}
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
                {/* 4ª coluna (ícones sociais) — usar text-size em vez de h/w */}
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

          {/* 3° row: fundo B5C4FF, texto #161616 (assumi #161616), centralizado com desenvolvedor e marcas */}
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
