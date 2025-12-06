import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Departamento from "../../../modals/Departamentos";
import { deletar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarDepartamentos() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [departamento, setDepartamento] = useState<Departamento | null>(null);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function listarPorId(id: string) {
    try {
      await listar(`/departamentos/${id}`, setDepartamento, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Departamento não encontrado!");
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id) listarPorId(id);
  }, [id]);

  async function deletarDepartamento() {
    setIsLoading(true);
    try {
      await deletar(`/departamentos/${id}`, {
        headers: { Authorization: token },
      });
      alert("Departamento apagado com sucesso!");
      retornar();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao apagar o departamento!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/departamentos");
  }

  return (
    <div className="w-full max-w-md m-16 pt-4 pb-4 mx-auto sm:pt-6 sm:pb-6">
      <h1 className="py-4 text-3xl text-center md:text-4xl font-bold uppercase text-orange-400">
        Deletar Departamento
      </h1>
      <p className="mb-4 text-base font-semibold text-center md:text-lg">
        Você tem certeza de que deseja apagar o departamento a seguir?
      </p>
      <div className="flex flex-col justify-between overflow-hidden border rounded-2xl">
        <header className="px-4 py-2 text-lg font-semibold text-black md:px-6 bg-orange-400 uppercase md:text-2xl">
          Departamento
        </header>
        {departamento ? (
          <p className="h-full p-4 text-xl bg-white md:p-8 md:text-3xl">
            {departamento.nome}
          </p>
        ) : (
          <p className="p-8 text-center">Carregando departamento...</p>
        )}
        <div className="flex flex-row">
          <button
            className="w-full py-2 text-base bg-red-200 text-white hover:bg-red-500 md:text-lg"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="flex items-center justify-center w-full text-base bg-green-200 text-white hover:bg-green-400 md:text-lg"
            onClick={deletarDepartamento}
            disabled={isLoading || !departamento}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarDepartamentos;
