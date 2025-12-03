import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import { deletar, listar } from "../../../services/Service";

function DeletarDepartamentos() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [departamento, setDepartamento] = useState<Departamentos | null>(null);

  async function buscarPorId(id: string) {
    try {
      const data = await listar(`/departamentos/${id}`);
      setDepartamento(data);
    } catch (error) {
      alert("Departamento não encontrado!");
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  async function deletarDepartamento() {
    setIsLoading(true);
    try {
      await deletar(`/departamentos/${id}`);
      alert("Departamento apagado com sucesso!");
      retornar();
    } catch (error) {
      alert("Erro ao apagar o departamento!");
      console.error(error);
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
        {departamento && (
          <p className="h-full p-4 text-xl bg-white md:p-8 md:text-3xl">
            {departamento.descricao}
          </p>
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
