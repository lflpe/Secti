import { apiClient } from '../lib/apiClient';

// Types para requisição de cadastro de notícia
export interface CadastrarNoticiaRequest {
  titulo: string;
  conteudo: string;
  resumo?: string;
  imagemCapaUrl?: string;
  destaque?: boolean;
}

// Types para resposta de notícia cadastrada
export interface NoticiaResponse {
  id: number;
  titulo: string;
  resumo: string;
  imagemCapaUrl: string;
  dataPublicacao: string;
  dataCriacao: string;
  publicada: boolean;
  destaque: boolean;
  usuarioCriacaoNome: string;
}

// Type para erros da API
export interface ApiValidationError {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: unknown;
}

// Validações do frontend (espelham as validações do backend)
export const validarNoticia = (data: CadastrarNoticiaRequest): string[] => {
  const erros: string[] = [];

  // Título: obrigatório, mínimo 3 caracteres
  if (!data.titulo || data.titulo.trim().length < 3) {
    erros.push('Título é obrigatório e deve ter no mínimo 3 caracteres.');
  }

  // Conteúdo: obrigatório, mínimo 10 caracteres
  if (!data.conteudo || data.conteudo.trim().length < 10) {
    erros.push('Conteúdo é obrigatório e deve ter no mínimo 10 caracteres.');
  }

  // Imagem de capa: opcional, mas se fornecida deve ser URL válida (http:// ou https://)
  if (data.imagemCapaUrl && data.imagemCapaUrl.trim() !== '') {
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(data.imagemCapaUrl)) {
      erros.push('A URL da imagem de capa deve começar com http:// ou https://');
    }
  }

  return erros;
};

// Service de Notícias
export const noticiasService = {
  /**
   * Cadastra uma nova notícia no sistema
   *
   * Requisitos:
   * - Usuário deve estar autenticado
   * - Usuário deve ter acesso ao menu "Notícias"
   * - Usuário deve ter permissão de "Cadastrar"
   * - Administradores têm acesso total
   */
  cadastrar: async (data: CadastrarNoticiaRequest): Promise<NoticiaResponse> => {
    // Validar dados antes de enviar
    const errosValidacao = validarNoticia(data);
    if (errosValidacao.length > 0) {
      throw new Error(errosValidacao.join(' '));
    }

    const response = await apiClient.post<NoticiaResponse>('/Noticia/cadastrar', data);
    return response.data;
  },
};

export default noticiasService;
