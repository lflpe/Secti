export interface User {
  id: string;
  nome: string;
  email: string;
}

export interface Perfil {
  id: number;
  nome: string;
}

export interface Menu {
  id: number;
  nome: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  expiraEm: string;
  usuario: User;
  permissoes: string[];
  perfis: Perfil[];
  menus: Menu[];
}

export type AuthResponse = AuthData;

export interface AuthContextType {
  user: User | null;
  authData: AuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
