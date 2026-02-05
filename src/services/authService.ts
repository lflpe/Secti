import type { LoginCredentials, AuthData, User } from '../types/auth';
import { apiClient } from '../lib/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { handleApiError } from '../utils/errorHandler';

const AUTH_DATA_KEY = 'auth_data';

// Serviço de autenticação utilizando localStorage
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthData> {
    try {
      // Make API call to login endpoint
      const response = await apiClient.post<AuthData>(
        API_ENDPOINTS.auth.login,
        {
          email: credentials.email,
          senha: credentials.password, // API expects 'senha' instead of 'password'
        }
      );

      const authData = response.data;

      // Salvar todos os dados de autenticação no localStorage
      this.saveAuthData(authData);

      return authData;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    try {
      // Chamar logout para invalidar no backend se necessário
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpar dados de autenticação
      localStorage.removeItem(AUTH_DATA_KEY);
    }
  },

  async recuperarSenha(email: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.auth.recuperarSenha, { email });
    } catch (error) {
      console.error('Recuperar senha error:', error);
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  async resetarSenha(data: {
    email: string;
    token: string;
    novaSenha: string;
    confirmarSenha: string;
  }): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.auth.resetarSenha, data);
    } catch (error) {
      console.error('Resetar senha error:', error);
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  saveAuthData(authData: AuthData): void {
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
  },

  getAuthData(): AuthData | null {
    const authStr = localStorage.getItem(AUTH_DATA_KEY);
    if (!authStr) return null;

    try {
      return JSON.parse(authStr);
    } catch {
      return null;
    }
  },

  // Mantém compatibilidade
  getUser(): User | null {
    const authData = this.getAuthData();
    return authData ? authData.usuario : null;
  },
};
