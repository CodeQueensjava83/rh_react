import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { listar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";

function DeletarDepartamentos() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const [isLoading, setIsLoading] = useState(false);
  const [departamento, setDepartamento] = useState<Departamentos | null>(null);

  // Função para buscar departamento por ID
  async function buscarDepartamentoPorId(id: string) {
    try {
      const data = await listar<Departamentos>(`/departamentos/${id}`, undefined, {
        headers: { Authorization: token },
      });
      setDepartamento(data);
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        console.error("Erro ao listar departamento:", error);
        alert("Erro ao listar departamento!");
      }
    }
  }

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token, navigate]);

  // Busca departamento quando o ID estiver disponível
  useEffect(() => {
    if (id) buscarDepartamentoPorId(id);
  }, [id]);

  // Função para retornar à lista
  function retornar() {
    navigate("/departamentos");
  }

  // Função para deletar departamento
  async function deletarDepartamento() {
    if (!id) return;

    setIsLoading(true);
    try {
      await deletar(`/departamentos/${id}`, {
        headers: { Authorization: token },
      });
      alert("Departamento deletado com sucesso!");
      retornar();
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        console.error("Erro detalhado ao deletar departamento:", error);
        alert("Erro ao deletar departamento!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container w-1/3 mx-auto my-8">
      <h1 className="text-4xl text-center my-4 text-amber-500">Deletar Departamento</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o departamento a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-md">
        {departamento ? (
          <>
            <header className="py-2 px-6 bg-amber-500 text-white font-bold text-2xl">
              Departamento
            </header>
            <p className="p-8 text-3xl bg-slate-200 h-full text-center">
              {departamento.nome}
            </p>
          </>
        ) : (
          <div className="flex justify-center items-center p-8">
            <ClipLoader size={36} color="#f59e0b" />
          </div>
        )}

        <div className="flex">
          <button
            className="text-white w-1/2 py-2 bg-red-400 hover:bg-red-500 md:text-lg disabled:bg-gray-400"
            onClick={retornar}
            disabled={isLoading}
          >
            Não
          </button>

          <button
            className="flex items-center justify-center w-1/2 text-base bg-green-500 text-white hover:bg-green-600 md:text-lg disabled:bg-gray-400"
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