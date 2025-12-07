import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { deletar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Colaboradores from "../../../modals/Colaboradores";

function DeletarColaboradores() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const [isLoading, setIsLoading] = useState(false);
  const [colaborador, setColaborador] = useState<Colaboradores | null>(null);

  // Função para buscar colaborador por ID
  async function buscarColaboradorPorId(id: string) {
    try {
      const data = await listar<Colaboradores>(`/colaboradores/${id}`, undefined, {
        headers: { Authorization: token },
      });
      setColaborador(data);
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao listar colaborador!");
        console.error(error);
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

  // Busca colaborador quando o ID estiver disponível
  useEffect(() => {
    if (id) buscarColaboradorPorId(id);
  }, [id]);

  // Função para retornar à lista
  function retornar() {
    navigate("/colaboradores/all");
  }

  // Função para deletar colaborador
  async function deletarColaborador() {
    if (!id) return;

    setIsLoading(true);
    try {
      await deletar(`/colaboradores/${id}`, {
        headers: { Authorization: token },
      });
      alert("Colaborador deletado com sucesso!");
      retornar();
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        console.error("Erro ao deletar colaborador:", error);
        alert("Erro ao deletar colaborador!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container w-1/3 mx-auto my-8">
      <h1 className="text-4xl text-center my-4 text-amber-500">Deletar Colaborador</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o colaborador a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-md">
        {colaborador ? (
          <>
            <header className="py-2 px-6 bg-amber-500 text-white font-bold text-2xl">
              {colaborador.nome}
            </header>
            <p className="p-8 text-3xl bg-slate-200 h-full">{colaborador.nome}</p>
          </>
        ) : (
          <div className="flex justify-center items-center p-8">
            <ClipLoader size={36} color="#f59e0b" />
          </div>
        )}

        <div className="flex">
          <button
            className="text-white w-1/2 py-2 bg-red-400 hover:bg-red-500 md:text-lg"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className="flex items-center justify-center w-1/2 text-base bg-green-500 text-white hover:bg-green-600 md:text-lg"
            onClick={deletarColaborador}
            disabled={isLoading || !colaborador}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarColaboradores;


