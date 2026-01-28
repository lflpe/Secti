import type { LoginCredentials, AuthResponse, User } from '../types/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Simulated API call - Replace with actual API integration
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - Replace with actual API call
    // NOTE: In demo mode, any email/password combination will work
    // In production, replace this entire function with actual API authentication
    if (credentials.email && credentials.password) {
      // Simulated response - In production, this comes from your backend
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: credentials.email,
      };

      // Mock JWT token - In production, this comes from your backend
      // Using encodeURIComponent to safely handle special characters
      const payload = encodeURIComponent(
        JSON.stringify({ userId: mockUser.id, email: mockUser.email })
      );
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.mock_signature`;

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
    // NOTE: localStorage is used for demo purposes
    // SECURITY: For production, consider using httpOnly cookies to prevent XSS attacks
    // or implement additional security measures like token encryption
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveUser(user: User): void {
    // NOTE: localStorage is used for demo purposes
    // SECURITY: For production, consider using httpOnly cookies
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
    // Simple validation for demo purposes
    // SECURITY: In production, verify token signature and check expiration
    // using a library like jsonwebtoken or jose
    if (!token) return false;

    try {
      // Basic JWT structure check (header.payload.signature)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // TODO: In production, add:
      // 1. Signature verification
      // 2. Expiration time check (exp claim)
      // 3. Issuer validation (iss claim)
      // 4. Audience validation (aud claim)
      return true;
    } catch {
      return false;
    }
  },
};
