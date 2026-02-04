import { useState } from 'react';
import { DeleteModal } from './DeleteModal';

export interface Documento {
  id: number;
  nome: string;
  tipo: 'pdf' | 'doc' | 'docx';
  tamanho: string;
  dataUpload: string;
  url?: string;
}

interface ListarDocumentosProps {
  documentos: Documento[];
  onDelete: (id: number) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  showHeader?: boolean;
}

export const ListarDocumentos = ({
  documentos,
  onDelete,
  emptyStateTitle = "Nenhum documento encontrado",
  emptyStateDescription = "Nenhum documento foi adicionado ainda",
  showHeader = true
}: ListarDocumentosProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<Documento | null>(null);

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDelete = (id: number, nome: string) => {
    setSelectedDocumento({ id, nome } as Documento);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDocumento) {
      onDelete(selectedDocumento.id);
      setDeleteModalOpen(false);
      setSelectedDocumento(null);
    }
  };

  if (documentos.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">{emptyStateTitle}</h3>
        <p className="mt-1 text-sm text-gray-500">{emptyStateDescription}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {showHeader && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Documentos</h3>
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamanho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Upload
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documentos.map((documento) => (
                <tr key={documento.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getIconeTipo(documento.tipo)}
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {documento.nome}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 uppercase">{documento.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{documento.tamanho}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{documento.dataUpload}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {documento.url && (
                        <a
                          href={documento.url}
                          download
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Download"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(documento.id, documento.nome)}
                        className="text-red-600 cursor-pointer hover:text-red-900 transition-colors"
                        title="Excluir"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {documentos.map((documento) => (
            <div key={documento.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {getIconeTipo(documento.tipo)}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 wrap-break-word">
                      {documento.nome}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {documento.tipo.toUpperCase()} • {documento.tamanho}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Upload: {documento.dataUpload}
                </p>
                <div className="flex items-center gap-2">
                  {documento.url && (
                    <a
                      href={documento.url}
                      download
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Download"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(documento.id, documento.nome)}
                    className="text-red-600 cursor-pointer hover:text-red-900 transition-colors"
                    title="Excluir"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedDocumento(null);
        }}
        onConfirm={confirmDelete}
        title="Excluir Documento"
        message={`Tem certeza de que deseja excluir o documento "${selectedDocumento?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </>
  );
};
