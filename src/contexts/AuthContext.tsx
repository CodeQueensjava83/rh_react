import { createContext, type ReactNode, useState, useEffect } from "react";
import { ToastAlerta } from "../utils/ToastAlert";
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
    token: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Evita autologin com token inválido ou vazio
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");

    if (savedUser) {
      const usuarioObj = JSON.parse(savedUser);

      if (usuarioObj.token && usuarioObj.token.trim() !== "") {
        setUsuario(usuarioObj);
      } else {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      const resposta = await login("/usuarios/logar", usuarioLogin);

      const usuarioFinal: UsuarioLogin = {
        id: resposta.usuario.id,
        nome: resposta.usuario.nome,
        usuario: resposta.usuario.usuario,
        senha: "",
        foto: resposta.usuario.foto,
        token: resposta.token,
      };

      setUsuario(usuarioFinal);
      localStorage.setItem("usuario", JSON.stringify(usuarioFinal));

      ToastAlerta("Usuário autenticado!", "sucesso");

    } catch (error) {
      ToastAlerta("Erro ao autenticar usuário!", "erro");
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
      token: ""
    });
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}




