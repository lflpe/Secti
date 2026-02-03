import { Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';

export const Erro404 = () => {
  return (
      <PublicLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md w-full">
            <h1 className="text-6xl md:text-8xl font-bold text-[#0C2856] mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0C2856] mb-4">
              Página não encontrada
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              A página que você está procurando não está disponível.
            </p>
            <Link
                to="/"
                className="bg-[#0C2856] text-white transition duration-200 hover:scale-110 px-6 py-3 rounded-xl font-medium inline-block"
            >
              Voltar para a tela inicial
            </Link>
          </div>
        </div>
      </PublicLayout>
  );
};
