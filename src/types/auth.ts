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
  descricao: string;
  rota: string;
  icone: string;
  ordem: number;
  menuPaiId: number;
  menuPaiNome: string;
  subMenus: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiraEm: string;
  usuario: User;
  permissoes: string[];
  perfis: Perfil[];
  menus: Menu[];
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
