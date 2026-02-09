import { apiClient } from '../lib/apiClient';
import { handleApiError } from '../utils/errorHandler';
import { API_CONFIG } from '../config/api';

/**
 * Constrói a URL completa para download de um documento (uso interno)
 */
const getDocumentoDownloadUrl = (caminhoArquivo: string): string => {
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
 * Faz o download de um documento internamente e dispara o download no navegador
 * @param caminhoArquivo - Caminho relativo do arquivo
 * @param nomeArquivo - Nome do arquivo para download (opcional)
 */
export const downloadDocumento = async (caminhoArquivo: string, nomeArquivo?: string): Promise<void> => {
  if (!caminhoArquivo) {
    throw new Error('Caminho do arquivo não informado');
  }

  const url = getDocumentoDownloadUrl(caminhoArquivo);

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

export interface CadastrarDocumentoRequest {
  titulo: string;
  descricao?: string;
  dataPublicacao: string; // dd-MM-yyyy
  pastaId?: number;
  arquivo: File;
}

export interface DocumentoResponse {
  id: number;
  titulo: string;
  descricao?: string;
  caminhoArquivo: string;
  nomeArquivo: string;
  anoPublicacao: number;
  dataCriacao: string;
  caminho?: string;
  usuarioCriacaoNome?: string;
}

export interface DocumentoListItem {
  id: number;
  titulo: string;
  descricao?: string;
  caminhoArquivo: string;
  nomeArquivo: string;
  anoPublicacao: number;
  dataCriacao: string;
  ativo: boolean;
  caminho?: string;
  usuarioCriacaoNome?: string;
}

export interface DocumentoListResponse {
  documentos: DocumentoListItem[];
  totalItens: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
  anoFiltro?: number;
}

export interface DocumentoPublicoItem {
  id: number;
  titulo: string;
  caminhoArquivo: string;
  anoPublicacao: number;
}

export interface DocumentoPublicoListResponse {
  documentos: DocumentoPublicoItem[];
  totalItens: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface DocumentoDetalhado {
  id: number;
  titulo: string;
  categoria?: string;
  caminhoArquivo: string;
  anoPublicacao: number;
  ativo: boolean;
  dataCriacao: string;
  caminho?: string;
}

export interface EditarDocumentoRequest {
  titulo: string;
  descricao?: string;
  dataPublicacao: string; // dd-MM-yyyy
  pastaId?: number;
  arquivo?: File;
}

export interface DocumentoListFilters {
  ano?: number;
  ordenarPor?: 'titulo' | 'dataPublicacao' | 'dataCriacao';
  ordenarDescendente?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}

export interface DocumentoPublicoFilters {
  pastaId?: number;
  categoria?: string;
  ordenarPor?: 'titulo' | 'anopublicacao';
  ordenarDescendente?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'xls', 'xlsx', 'csv'] as const;
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/csv',
];

type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];

const getFileExtension = (fileName: string): string | null => {
  const parts = fileName.split('.');
  if (parts.length < 2) return null;
  return parts.pop()?.toLowerCase() ?? null;
};

const validarDocumento = (data: CadastrarDocumentoRequest | EditarDocumentoRequest): string[] => {
  const erros: string[] = [];

  if (!data.titulo || data.titulo.trim().length < 3 || data.titulo.trim().length > 200) {
    erros.push('Titulo e obrigatorio e deve ter entre 3 e 200 caracteres.');
  }

  if (data.descricao && data.descricao.length > 500) {
    erros.push('Descricao deve ter no maximo 500 caracteres.');
  }

  if (!data.dataPublicacao) {
    erros.push('Data de publicacao e obrigatoria.');
  } else {
    // Formato esperado: dd-MM-yyyy
    const parts = data.dataPublicacao.split('-');
    if (parts.length !== 3) {
      erros.push('Data de publicacao deve estar no formato dd-MM-yyyy.');
    } else {
      const dia = Number(parts[0]);
      const mes = Number(parts[1]);
      const ano = Number(parts[2]);
      if (!dia || !mes || dia < 1 || dia > 31 || mes < 1 || mes > 12) {
        erros.push('Data de publicacao deve estar no formato dd-MM-yyyy.');
      }
      if (!ano || ano < 1900 || ano > 3000) {
        erros.push('Ano de publicacao deve estar entre 1900 e 3000.');
      }
    }
  }

  if ('arquivo' in data && data.arquivo) {
    if (data.arquivo.size > MAX_FILE_SIZE) {
      erros.push('O arquivo nao pode ter mais de 10MB.');
    }
    const ext = getFileExtension(data.arquivo.name);
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext as AllowedExtension)) {
      erros.push('Formato de arquivo invalido. Use PDF, XLS, XLSX ou CSV.');
    }
    if (data.arquivo.type && !ALLOWED_MIME_TYPES.includes(data.arquivo.type)) {
      erros.push('Tipo MIME de arquivo invalido.');
    }
  }

  return erros;
};

const getAnoPublicacao = (dataPublicacao: string): number | null => {
  // Formato esperado: dd-MM-yyyy
  const parts = dataPublicacao.split('-');
  if (parts.length !== 3) return null;
  const ano = Number(parts[2]); // Ano está na última posição
  if (!Number.isFinite(ano) || ano < 1900 || ano > 3000) return null;
  return ano;
};

const buildFormData = (data: CadastrarDocumentoRequest | EditarDocumentoRequest): FormData => {
  const formData = new FormData();
  formData.append('Titulo', data.titulo);
  if (data.descricao) {
    formData.append('Descricao', data.descricao);
  }
  formData.append('DataPublicacao', data.dataPublicacao);
  const anoPublicacao = getAnoPublicacao(data.dataPublicacao);
  if (anoPublicacao) {
    formData.append('AnoPublicacao', anoPublicacao.toString());
  }
  if (data.pastaId !== undefined) {
    formData.append('PastaId', data.pastaId.toString());
  }
  if ('arquivo' in data && data.arquivo) {
    formData.append('arquivo', data.arquivo);
  }
  return formData;
};

export const documentosService = {
  cadastrar: async (data: CadastrarDocumentoRequest): Promise<DocumentoResponse> => {
    const erros = validarDocumento(data);
    if (erros.length > 0) {
      throw new Error(erros.join(' '));
    }

    try {
      const response = await apiClient.post<DocumentoResponse>('/Documento/cadastrar', buildFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  listar: async (filtros?: DocumentoListFilters): Promise<DocumentoListResponse> => {
    const params = new URLSearchParams();

    if (filtros?.ano !== undefined) {
      params.append('Ano', filtros.ano.toString());
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
    const url = `/Documento/listar${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient.get<DocumentoListResponse>(url);
    return response.data;
  },

  listarPublico: async (filtros?: DocumentoPublicoFilters): Promise<DocumentoPublicoListResponse> => {
    const params = new URLSearchParams();

    if (filtros?.pastaId !== undefined) {
      params.append('PastaId', filtros.pastaId.toString());
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
    const url = `/Documento/listar-publico${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient.get<DocumentoPublicoListResponse>(url);
    return response.data;
  },

  buscarPorId: async (id: number): Promise<DocumentoDetalhado> => {
    const response = await apiClient.get<DocumentoDetalhado>(`/Documento/${id}`);
    return response.data;
  },

  editar: async (id: number, data: EditarDocumentoRequest): Promise<DocumentoDetalhado> => {
    const erros = validarDocumento(data);
    if (erros.length > 0) {
      throw new Error(erros.join(' '));
    }

    try {
      const response = await apiClient.put<DocumentoDetalhado>(`/Documento/editar/${id}`, buildFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  inativar: async (id: number): Promise<void> => {
    await apiClient.post(`/Documento/inativar/${id}`);
  },

  ativar: async (id: number): Promise<void> => {
    await apiClient.post(`/Documento/ativar/${id}`);
  },
};

export default documentosService;
