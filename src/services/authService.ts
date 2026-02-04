import type { LoginCredentials, AuthResponse, User } from '../types/auth';
import { apiClient } from '../lib/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { handleApiError } from '../utils/errorHandler';

const USER_KEY = 'auth_user';
// Serviço de autenticação utilizando cookies HttpOnly para armazenamento de token
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Make API call to login endpoint
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.auth.login,
        {
          email: credentials.email,
          senha: credentials.password, // API expects 'senha' instead of 'password'
        }
      );

      const authData = response.data;
      const user = authData.usuario;

      // Salva os dados do usuário no localStorage
      this.saveUser(user);

      return authData;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    try {
      // Chama o logout e remove o Cookie HTTPSonly
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpa o userData from localStorage
      localStorage.removeItem(USER_KEY);
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

  saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};
