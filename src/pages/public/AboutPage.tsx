import { PublicLayout } from '../../layouts/PublicLayout';

export const AboutPage = () => {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About SECTI</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            The Secretaria de Ciência, Tecnologia e Inovação (SECTI) is committed to
            advancing scientific research, technological development, and innovation
            across all sectors.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            To be a leading organization in promoting science, technology, and
            innovation, contributing to sustainable development and improving quality
            of life.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To develop and implement policies that encourage research, innovation, and
            technological development, fostering collaboration between academia,
            industry, and government.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            For more information, please contact us through our official channels.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};
