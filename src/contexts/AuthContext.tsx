import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../modals/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
      alert("Usuário autenticado com sucesso!");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      alert("Os dados do usuário estão inconsistentes!");
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}