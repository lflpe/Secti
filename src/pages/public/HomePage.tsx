import { PublicLayout } from '../../layouts/PublicLayout';

export const HomePage = () => {
  return (
    <PublicLayout>
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
