import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { listar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Departamentos from "../../../modals/Departamentos";
import { ClipLoader } from "react-spinners";

function DeletarDepartamentos() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);
  const [departamento, setDepartamento] = useState<Departamentos>({} as Departamentos);

  async function buscarDepartamentoPorId(id: string) {
    try {
      await listar(`/departamentos/${id}`, undefined, {
        headers: { Authorization: token },
      }).then(data => {
        setDepartamento(data);
      });
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao listar departamento!");
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
    if (id) buscarDepartamentoPorId(id);
  }, [id]);

  function retornar() {
    navigate("/departamentos");
  }

  async function deletarDepartamento() {
    setIsLoading(true);
    try {
      await deletar(`/departamentos/${id}`, {
        headers: { Authorization: token },
      });
      alert("Departamento deletado com sucesso!");
      retornar(); // Navegação só acontece em caso de sucesso
    } catch (error: any) {
      console.error("Erro detalhado ao deletar departamento:", error.response?.data || error); // Log crucial para debug
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao deletar departamento!");
      }
    } finally {
      setIsLoading(false); // Garante que o loading seja desativado sempre
    }
  }

  return (
    <div className="container w-1/3 mx-auto my-8">
      <h1 className="text-4xl text-center my-4 text-amber-500">Deletar Departamento</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o departamento a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-md">
        {departamento && (
          <>
            <header className="py-2 px-6 bg-amber-500 text-white font-bold text-2xl">
              Departamento
            </header>
            <p className="p-8 text-3xl bg-slate-200 h-full text-center">{departamento.nome}</p>
          </>
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
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarDepartamentos;