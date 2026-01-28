import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { LoginCredentials, User } from '../types/auth';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const initAuth = () => {
      const token = authService.getToken();
      const savedUser = authService.getUser();

      if (token && savedUser && authService.isTokenValid(token)) {
        setUser(savedUser);
      } else {
        authService.logout();
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      authService.saveToken(response.token);
      authService.saveUser(response.user);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
