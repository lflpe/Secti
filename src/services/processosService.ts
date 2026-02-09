import { apiClient } from '../lib/apiClient';
import { handleApiError } from '../utils/errorHandler';

/**
 * Faz o download de um processo internamente e dispara o download no navegador
 * @param caminhoArquivo - Caminho relativo do arquivo
 * @param nomeArquivo - Nome do arquivo para download (opcional)
 */
export const downloadProcesso = async (caminhoArquivo: string, nomeArquivo?: string): Promise<void> => {
  if (!caminhoArquivo) {
    throw new Error('Caminho do arquivo não informado');
  }

  const url = caminhoArquivo.startsWith('http') ? caminhoArquivo : `${window.location.origin}${caminhoArquivo}`;
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo || caminhoArquivo.split('/').pop() || 'processo';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==================== INTERFACES ====================

export interface CadastrarProcessoRequest {
  titulo: string;
  categoria: string;
  anoPublicacao: number;
  caminho?: string;
  arquivo: File;
}

export interface ProcessoResponse {
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

export interface ProcessoListItem {
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

export interface ProcessoListResponse {
  processos: ProcessoListItem[];
  totalItens: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
  caminhoFiltro?: string;
}

export interface ProcessoListFilters {
  caminho?: string;
  categoria?: string;
  apenasAtivos?: boolean;
  ordenarPor?: string;
  ordenarDescendente?: boolean;
  pagina?: number;
  itensPorPagina?: number;
}

export interface ProcessoDetalhe {
  id: number;
  titulo: string;
  categoria: string;
  caminhoArquivo: string;
  anoPublicacao: number;
  ativo: boolean;
  dataCriacao: string;
  caminho?: string;
}

export interface EditarProcessoRequest {
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

const buildFormData = (data: CadastrarProcessoRequest | EditarProcessoRequest): FormData => {
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

export const processosService = {
  /**
   * Cadastra um novo processo
   */
  cadastrar: async (data: CadastrarProcessoRequest): Promise<ProcessoResponse> => {
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
      const response = await apiClient.post<ProcessoResponse>(
        '/Processo/cadastrar',
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
   * Lista processos com filtros e paginação
   */
  listar: async (filtros?: ProcessoListFilters): Promise<ProcessoListResponse> => {
    const params = new URLSearchParams();

    if (filtros?.caminho) {
      params.append('Caminho', filtros.caminho);
    }
    if (filtros?.categoria) {
      params.append('Categoria', filtros.categoria);
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
    const url = `/Processo/listar${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await apiClient.get<ProcessoListResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Obtém processo por ID
   */
  obterPorId: async (id: number): Promise<ProcessoDetalhe> => {
    try {
      const response = await apiClient.get<ProcessoDetalhe>(`/Processo/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Edita um processo existente
   */
  editar: async (id: number, data: EditarProcessoRequest): Promise<ProcessoDetalhe> => {
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
      const response = await apiClient.put<ProcessoDetalhe>(
        `/Processo/editar/${id}`,
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
   * Inativa um processo
   */
  inativar: async (id: number): Promise<void> => {
    try {
      await apiClient.post(`/Processo/inativar/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Ativa um processo
   */
  ativar: async (id: number): Promise<void> => {
    try {
      await apiClient.post(`/Processo/ativar/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

