import { createContext, useContext } from "react";
import type { LoginRequest, SessaoWebResponse, TipoUsuario } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  /** true enquanto /auth/me não respondeu; rotas protegidas esperam. */
  isCheckingSession: boolean;
  /** /auth/me falhou sem ser 401 (rede, 503): não dá para afirmar que a sessão acabou. */
  isSessionUnavailable: boolean;
  userType: TipoUsuario | null;
  usuarioId: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  /** Mesmo pipeline do login com senha, para respostas que já abriram a sessão (magic link, cadastro). */
  applyLoginResponse: (response: SessaoWebResponse, options?: { redirect?: boolean }) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
