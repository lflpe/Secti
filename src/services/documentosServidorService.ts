import { apiClient } from '../lib/apiClient';
import { handleApiError } from '../utils/errorHandler';
import { API_CONFIG } from '../config/api';

/**
 * Constrói a URL completa para download de um documento do servidor (uso interno)
 */
const getDocumentoServidorDownloadUrl = (caminhoArquivo: string): string => {
  if (!caminhoArquivo) return '';

  // Se já é uma URL completa, retorna como está
  if (caminhoArquivo.startsWith('http://') || caminhoArquivo.startsWith('https://')) {
    return caminhoArquivo;
  }

  // Remove /api do final da baseURL se existir, pois arquivos estáticos são servidos da raiz
  let baseUrl = API_CONFIG.baseURL || '';
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }

  // Garante que não tenha barras duplicadas
  const caminho = caminhoArquivo.startsWith('/') ? caminhoArquivo : `/${caminhoArquivo}`;

  return `${baseUrl}${caminho}`;
};

/**
 * Faz o download de um documento do servidor internamente e dispara o download no navegador
 * @param caminhoArquivo - Caminho relativo do arquivo
 * @param nomeArquivo - Nome do arquivo para download (opcional)
 */
export const downloadDocumentoServidor = async (caminhoArquivo: string, nomeArquivo?: string): Promise<void> => {
  if (!caminhoArquivo) {
    throw new Error('Caminho do arquivo não informado');
  }

  const url = getDocumentoServidorDownloadUrl(caminhoArquivo);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    throw new Error(handleApiError(error));
  }

  if (!response.ok) {
    throw new Error(`Erro ao baixar arquivo: ${response.status}`);
  }

  try {
    const blob = await response.blob();

    // Extrai o nome do arquivo do caminho se não foi fornecido
    const fileName = nomeArquivo || caminhoArquivo.split('/').pop() || 'documento';

    // Cria um link temporário para download
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Limpa o link temporário
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ==================== INTERFACES ====================

export interface CadastrarDocumentoServidorRequest {
  titulo: string;
  categoria: string;
  anoPublicacao: number;
  caminho?: string;
  arquivo: File;
}

export interface DocumentoServidorResponse {
  id: number;
  titulo: string;
  categoria: string;
  caminhoArquivo: string;
  nomeArquivo: string;
  anoPublicacao: number;
  dataCriacao: string;
  caminho?: string;
  usuarioCriacaoNome?: string;
}

export interface DocumentoServidorListItem {
  id: number;
  titulo: string;
  categoria: string;
  caminhoArquivo: string;
  nomeArquivo: string;
  anoPublicacao: number;
  dataCriacao: string;
  ativo: boolean;
  caminho?: string;
  usuarioCriacaoNome?: string;
}

export interface DocumentoServidorListResponse {
  documentos: DocumentoServidorListItem[];
  totalItens: number;
  paginaAtual: number;
  totalPaginas: number;
  caminhoFiltro?: string;
  categoriaFiltro?: string;
  anoFiltro?: number;
}

export interface DocumentoServidorListFilters {
  caminho?: string;
  categoria?: string;
  ano?: number;
  apenasAtivos?: boolean;
  ordenarPor?: string;
  ordenarDescendente?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}

export interface DocumentoServidorPublicoItem {
  id: number;
  titulo: string;
  caminhoArquivo: string;
  anoPublicacao: number;
}

export interface DocumentoServidorPublicoListResponse {
  documentos: DocumentoServidorPublicoItem[];
  totalItens: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface DocumentoServidorPublicoFilters {
  caminho?: string;
  categoria?: string;
  ordenarPor?: string;
  ordenarDescendente?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}

export interface DocumentoServidorDetalhe {
  id: number;
  titulo: string;
  categoria: string;
  caminhoArquivo: string;
  anoPublicacao: number;
  ativo: boolean;
  dataCriacao: string;
  caminho?: string;
}

export interface EditarDocumentoServidorRequest {
  titulo: string;
  categoria: string;
  anoPublicacao: number;
  caminho?: string;
  arquivo?: File;
}

// ==================== VALIDAÇÕES ====================

const validarTitulo = (titulo: string): string[] => {
  const erros: string[] = [];
  if (!titulo || titulo.trim().length === 0) {
    erros.push('O título é obrigatório.');
  } else if (titulo.trim().length < 3) {
    erros.push('O título deve ter no mínimo 3 caracteres.');
  } else if (titulo.trim().length > 200) {
    erros.push('O título deve ter no máximo 200 caracteres.');
  }
  return erros;
};

const validarCategoria = (categoria: string): string[] => {
  const erros: string[] = [];
  if (!categoria || categoria.trim().length === 0) {
    erros.push('A categoria é obrigatória.');
  } else if (categoria.trim().length > 100) {
    erros.push('A categoria deve ter no máximo 100 caracteres.');
  }
  return erros;
};

const validarAnoPublicacao = (ano: number): string[] => {
  const erros: string[] = [];
  if (!ano) {
    erros.push('O ano de publicação é obrigatório.');
  } else if (ano < 1900 || ano > 3000) {
    erros.push('O ano de publicação deve estar entre 1900 e 3000.');
  }
  return erros;
};

const validarArquivo = (arquivo: File | null | undefined, obrigatorio = true): string[] => {
  const erros: string[] = [];

  if (obrigatorio && !arquivo) {
    erros.push('O arquivo é obrigatório.');
    return erros;
  }

  if (arquivo) {
    const extensoesPermitidas = ['pdf', 'xls', 'xlsx', 'csv'];
    const extensao = arquivo.name.split('.').pop()?.toLowerCase();

    if (!extensao || !extensoesPermitidas.includes(extensao)) {
      erros.push('Formato de arquivo inválido. Formatos aceitos: PDF, XLS, XLSX, CSV.');
    }

    const tamanhoMaximo = 10 * 1024 * 1024; // 10MB
    if (arquivo.size > tamanhoMaximo) {
      erros.push('O arquivo não pode ter mais de 10MB.');
    }
  }

  return erros;
};

// ==================== SERVICE ====================

const buildFormData = (data: CadastrarDocumentoServidorRequest | EditarDocumentoServidorRequest): FormData => {
  const formData = new FormData();

  formData.append('Titulo', data.titulo.trim());
  formData.append('Categoria', data.categoria.trim());
  formData.append('AnoPublicacao', data.anoPublicacao.toString());

  if (data.caminho) {
    formData.append('Caminho', data.caminho.trim());
  }

  if (data.arquivo) {
    formData.append('arquivo', data.arquivo);
  }

  return formData;
};

export const documentosServidorService = {
  /**
   * Cadastra um novo documento do servidor
   */
  cadastrar: async (data: CadastrarDocumentoServidorRequest): Promise<DocumentoServidorResponse> => {
    // Validações
    const erros: string[] = [
      ...validarTitulo(data.titulo),
      ...validarCategoria(data.categoria),
      ...validarAnoPublicacao(data.anoPublicacao),
      ...validarArquivo(data.arquivo, true),
    ];

    if (erros.length > 0) {
      throw new Error(erros.join(' '));
    }

    try {
      const response = await apiClient.post<DocumentoServidorResponse>(
        '/DocumentoServidor/cadastrar',
        buildFormData(data),
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Lista documentos do servidor com filtros e paginação
   */
  listar: async (filtros?: DocumentoServidorListFilters): Promise<DocumentoServidorListResponse> => {
    const params = new URLSearchParams();

    if (filtros?.caminho) {
      params.append('Caminho', filtros.caminho);
    }
    if (filtros?.categoria) {
      params.append('Categoria', filtros.categoria);
    }
    if (filtros?.ano !== undefined) {
      params.append('Ano', filtros.ano.toString());
    }
    if (filtros?.apenasAtivos !== undefined) {
      params.append('ApenasAtivos', filtros.apenasAtivos.toString());
    }
    if (filtros?.ordenarPor) {
      params.append('OrdenarPor', filtros.ordenarPor);
    }
    if (filtros?.ordenarDescendente !== undefined) {
      params.append('OrdenarDescendente', filtros.ordenarDescendente.toString());
    }
    if (filtros?.pagina !== undefined) {
      params.append('Pagina', filtros.pagina.toString());
    }
    if (filtros?.itensPorPagina !== undefined) {
      params.append('ItensPorPagina', filtros.itensPorPagina.toString());
    }

    const queryString = params.toString();
    const url = `/DocumentoServidor/listar${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await apiClient.get<DocumentoServidorListResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Lista documentos do servidor públicos (sem autenticação)
   */
  listarPublico: async (filtros?: DocumentoServidorPublicoFilters): Promise<DocumentoServidorPublicoListResponse> => {
    const params = new URLSearchParams();

    if (filtros?.caminho) {
      params.append('Caminho', filtros.caminho);
    }
    if (filtros?.categoria) {
      params.append('Categoria', filtros.categoria);
    }
    if (filtros?.ordenarPor) {
      params.append('OrdenarPor', filtros.ordenarPor);
    }
    if (filtros?.ordenarDescendente !== undefined) {
      params.append('OrdenarDescendente', filtros.ordenarDescendente.toString());
    }
    if (filtros?.pagina !== undefined) {
      params.append('Pagina', filtros.pagina.toString());
    }
    if (filtros?.itensPorPagina !== undefined) {
      params.append('ItensPorPagina', filtros.itensPorPagina.toString());
    }

    const queryString = params.toString();
    const url = `/DocumentoServidor/listar-publico${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await apiClient.get<DocumentoServidorPublicoListResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Obtém documento do servidor por ID
   */
  obterPorId: async (id: number): Promise<DocumentoServidorDetalhe> => {
    try {
      const response = await apiClient.get<DocumentoServidorDetalhe>(`/DocumentoServidor/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Edita um documento do servidor existente
   */
  editar: async (id: number, data: EditarDocumentoServidorRequest): Promise<DocumentoServidorDetalhe> => {
    // Validações
    const erros: string[] = [
      ...validarTitulo(data.titulo),
      ...validarCategoria(data.categoria),
      ...validarAnoPublicacao(data.anoPublicacao),
      ...validarArquivo(data.arquivo, false), // Arquivo opcional na edição
    ];

    if (erros.length > 0) {
      throw new Error(erros.join(' '));
    }

    try {
      const response = await apiClient.put<DocumentoServidorDetalhe>(
        `/DocumentoServidor/editar/${id}`,
        buildFormData(data),
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Inativa um documento do servidor
   */
  inativar: async (id: number): Promise<void> => {
    try {
      await apiClient.post(`/DocumentoServidor/inativar/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Ativa um documento do servidor
   */
  ativar: async (id: number): Promise<void> => {
    try {
      await apiClient.post(`/DocumentoServidor/ativar/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

