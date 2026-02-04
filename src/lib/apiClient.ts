import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: API_CONFIG.withCredentials, // Important for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // Se backend retorna 401, o HttpOnly cookie expirou ou é inválido
      // Limpar dados do usuário e deixar navegador gerenciar cookie
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_user');
        // Navegador remove o HttpOnly cookie automaticamente se expirado
      }

      return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized errors
    // Significa que o HttpOnly cookie expirou ou é inválido
    if (error.response?.status === 401) {
      // Limpar dados do usuário do localStorage
      localStorage.removeItem('auth_user');
    }

    return Promise.reject(error);
  }
);
