import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NoticiaFormData {
  titulo: string;
  slug: string;
  categoria: string;
  autor: string;
  resumo: string;
  conteudo: string;
  imagemDestaque: string;
  imagemArquivo: File | null;
  status: 'Publicada' | 'Rascunho' | 'Arquivada';
}

interface NoticiaFormProps {
  initialData?: Partial<NoticiaFormData>;
  onSubmit: (data: NoticiaFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const NoticiaForm = ({ initialData, onSubmit, isSubmitting }: NoticiaFormProps) => {
  const navigate = useNavigate();
  const [tipoConteudo, setTipoConteudo] = useState<'simples' | 'rico'>('simples');

  const [formData, setFormData] = useState<NoticiaFormData>({
    titulo: '',
    slug: '',
    categoria: 'Inovação',
    autor: '',
    resumo: '',
    conteudo: '',
    imagemDestaque: '',
    imagemArquivo: null,
    status: 'Rascunho',
  });

  const categorias = [
    'Inovação',
    'Educação',
    'Negócios',
    'Eventos',
    'Parcerias',
    'Pesquisa',
  ];

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData })); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-gerar slug quando o título mudar
    if (name === 'titulo') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        imagemArquivo: file,
        imagemDestaque: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
            Título da Notícia <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            value={formData.titulo}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
            placeholder="Digite o título da notícia"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent bg-gray-50"
            placeholder="slug-da-noticia"
          />
          <p className="mt-1 text-sm text-gray-500">
            URL: /noticias/{formData.slug || 'slug-da-noticia'}
          </p>
        </div>

        {/* Categoria e Autor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria <span className="text-red-600">*</span>
            </label>
            <select
              id="categoria"
              name="categoria"
              required
              value={formData.categoria}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-2">
              Autor <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              required
              value={formData.autor}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
              placeholder="Nome do autor"
            />
          </div>
        </div>

        {/* Upload de Imagem */}
        <div>
          <label htmlFor="imagemArquivo" className="block text-sm font-medium text-gray-700 mb-2">
            Imagem de Destaque <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              id="imagemArquivo"
              name="imagemArquivo"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#195CE3] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-[#195CE3] hover:text-[#0C2856]">Clique para selecionar</span> ou arraste e solte
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF até 5MB
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB{initialData ? '. Deixe em branco para manter a imagem atual.' : ''}
          </p>

          {formData.imagemDestaque && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Preview:</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imagemArquivo: null, imagemDestaque: '' }))}
                  className="text-sm cursor-pointer text-red-600 hover:text-red-700 font-medium"
                >
                  Remover imagem
                </button>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.imagemDestaque}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Imagem+Inválida';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Resumo */}
        <div>
          <label htmlFor="resumo" className="block text-sm font-medium text-gray-700 mb-2">
            Resumo <span className="text-red-600">*</span>
          </label>
          <textarea
            id="resumo"
            name="resumo"
            required
            rows={3}
            value={formData.resumo}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
            placeholder="Breve resumo da notícia (aparecerá nas listagens)"
          />
        </div>

        {/* Conteúdo */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700">
              Conteúdo <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTipoConteudo('simples')}
                className={`px-3 cursor-pointer py-1 text-sm rounded-md transition-colors ${
                  tipoConteudo === 'simples'
                    ? 'bg-[#0C2856] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Conteúdo Simples
              </button>
              <button
                type="button"
                onClick={() => setTipoConteudo('rico')}
                className={`px-3 cursor-pointer py-1 text-sm rounded-md transition-colors ${
                  tipoConteudo === 'rico'
                    ? 'bg-[#0C2856] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Conteúdo Rico (HTML)
              </button>
            </div>
          </div>
          <textarea
            id="conteudo"
            name="conteudo"
            required
            rows={15}
            value={formData.conteudo}
            onChange={handleChange}
            className={`block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent ${
              tipoConteudo === 'rico' ? 'font-mono text-sm' : ''
            }`}
            placeholder={
              tipoConteudo === 'simples'
                ? 'Digite o conteúdo da notícia em texto simples. Quebras de linha serão preservadas automaticamente.'
                : '<p>Conteúdo da notícia em HTML...</p>'
            }
          />
          <p className="mt-1 text-sm text-gray-500">
            {tipoConteudo === 'simples' ? (
              'Modo texto simples: escreva normalmente sem tags HTML. O texto será formatado automaticamente.'
            ) : (
              'Modo HTML: use tags HTML para formatar o conteúdo: <p>, <h3>, <ul>, <li>, <strong>, <em>, etc.'
            )}
          </p>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-600">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195CE3] focus:border-transparent"
          >
            <option value="Rascunho">Rascunho</option>
            <option value="Publicada">Publicada</option>
            <option value="Arquivada">Arquivada</option>
          </select>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/admin/noticias')}
          className="px-6 py-3 border cursor-pointer border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#0C2856] cursor-pointer text-white rounded-lg font-semibold hover:bg-[#195CE3] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
              Salvando...
            </span>
          ) : (
            initialData ? 'Atualizar Notícia' : 'Salvar Notícia'
          )}
        </button>
      </div>
    </form>
  );
};
