import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import type UsuarioLogin from "../../modals/UsuarioLogin";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    usuario: "",
    senha: ""
  } as UsuarioLogin);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    // Só navega se o usuário tiver token REAL e a autenticação já tiver terminado
    if (!isLoading && usuario?.token) {
      navigate("/home");
    }
  }, [usuario, isLoading]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <form
        className="flex justify-center items-center flex-col w-1/2 gap-4"
        onSubmit={login}
      >
        <h2 className="text-slate-900 text-5xl">Entrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
          />
        </div>

        <button
          type="submit"
          className="rounded bg-orange-400 flex justify-center hover:bg-orange-900 text-white w-1/2 py-2"
        >
          {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Entrar</span>}
        </button>

        <hr className="border-slate-800 w-full" />

        <p>
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-orange-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>

      <div
        className="bg-[url('https://ik.imagekit.io/codequeens/rh_logo.jpg?updatedAt=1761765415212')] lg:block hidden bg-no-repeat 
        w-full min-h-screen bg-cover bg-center"
      ></div>
    </div>
  );
}

export default Login;

