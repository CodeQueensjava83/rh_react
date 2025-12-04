import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../modals/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      // cadastro deu certo (backend devolveu o usuário com id)
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (confirmarSenha !== usuario.senha) {
    alert("As senhas não coincidem!");
    return;
  }

  if (usuario.senha.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres!");
    return;
  }

  setIsLoading(true);

  try {
    await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);

    alert("Cadastro realizado com sucesso!");
    navigate("/home");

  } catch (err: any) {
    console.error("Erro ao cadastrar:", err);

    if (err?.response) {
      alert(`Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
    } else {
      alert("Erro ao conectar com o servidor.");
    }

  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] hidden lg:block bg-no-repeat w-full min-h-screen bg-cover bg-center" />
      <form onSubmit={cadastrarNovoUsuario} className="flex flex-col justify-center items-center w-2/3 gap-4">
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" placeholder="Nome" value={usuario.nome} onChange={atualizarEstado}
            className="border-2 border-slate-700 p-2 rounded" />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário (e-mail)</label>
          <input id="usuario" name="usuario" placeholder="Usuário" value={usuario.usuario} onChange={atualizarEstado}
            className="border-2 border-slate-700 p-2 rounded" />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto (URL)</label>
          <input id="foto" name="foto" placeholder="URL da foto" value={usuario.foto} onChange={atualizarEstado}
            className="border-2 border-slate-700 p-2 rounded" />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input id="senha" name="senha" type="password" placeholder="Senha" value={usuario.senha} onChange={atualizarEstado}
            className="border-2 border-slate-700 p-2 rounded" />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Confirmar senha" value={confirmarSenha} onChange={handleConfirmarSenha}
            className="border-2 border-slate-700 p-2 rounded" />
        </div>

        <div className="flex flex-row justify-between w-full gap-8">
          <button type="button" onClick={() => navigate("/home")} className="w-1/2 py-2 rounded bg-amber-400 text-white hover:bg-amber-600">Cancelar</button>
          <button type="submit" className="w-1/2 py-2 rounded bg-neutral-400 text-white hover:bg-neutral-600 flex justify-center">
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
