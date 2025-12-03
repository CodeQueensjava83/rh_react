import { createContext, type ReactNode, useState, useEffect } from "react";
import { login } from "../services/Service";
import type UsuarioLogin from "../modals/UsuarioLogin";

interface AuthContextProps {
  usuario: UsuarioLogin | null;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      const data = await login(`/usuarios/logar`, usuarioLogin);

      const { id, nome, usuario, foto, token } = data;
      const safeUser = { id, nome, usuario, foto, token };

      setUsuario(safeUser);
      localStorage.setItem("usuario", JSON.stringify(safeUser));

      alert("Usuário foi autenticado com sucesso!");
    } catch {
      alert("Os dados do Usuário estão inconsistentes!");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
