import type { LoginCredentials, AuthResponse, User } from '../types/auth';
import { apiClient } from '../lib/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { handleApiError } from '../utils/errorHandler';

const USER_KEY = 'auth_user';

// Auth service using HttpOnly cookies for token storage
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

      // Save user data to localStorage
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
      // Call logout endpoint to clear HttpOnly cookie
      await apiClient.post(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user data from localStorage
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

  async getCurrentUser(): Promise<User | null> {
    // Since there's no /me endpoint in the API, just get from localStorage
    return this.getUser();
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
