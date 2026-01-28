import type { LoginCredentials, AuthResponse, User } from '../types/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Simulated API call - Replace with actual API integration
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - Replace with actual API call
    if (credentials.email && credentials.password) {
      // Simulated response - In production, this comes from your backend
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: credentials.email,
      };

      // Mock JWT token - In production, this comes from your backend
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ userId: mockUser.id, email: mockUser.email })
      )}.mock_signature`;

      return {
        user: mockUser,
        token: mockToken,
      };
    }

    throw new Error('Invalid credentials');
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
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

  isTokenValid(token: string): boolean {
    // Simple validation - In production, verify token signature and expiration
    if (!token) return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // In production, verify signature and check expiration
      return true;
    } catch {
      return false;
    }
  },
};
