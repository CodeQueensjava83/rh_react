import { useCallback, useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import { listar } from "../../../services/Service";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";
import { AuthContext } from "../../../contexts/AuthContext";

function ListarDepartamentos() {
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(true);
  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  const [erro, setErro] = useState("");

  const buscarDepartamento = useCallback(async () => {
    try {
      setErro("");
      await listar("/departamentos", setDepartamentos, {
        headers: { Authorization: token }
      });
    } catch (e: any) {
      setErro("Não foi possível carregar os departamentos.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    buscarDepartamento();
  }, [buscarDepartamento]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] w-full">
        <ClipLoader color="#0D9488" size={80} speedMultiplier={2} />
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-8rem)] overflow-x-hidden bg-gray-200">
      <div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">

        <h1 className="my-4 text-xl text-center md:text-4xl font-bold py-6 text-orange-500">
          Departamentos
        </h1>

        {/* Erro na requisição */}
        {erro && (
          <div className="text-center text-red-600 text-lg my-4">
            {erro}
          </div>
        )}

        {/* Lista vazia */}
        {!erro && departamentos.length === 0 && (
          <div className="my-8 text-2xl text-center md:text-3xl text-slate-700">
            Nenhum departamento foi encontrado
          </div>
        )}

        {/* Lista preenchida */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 mb-4">
          {departamentos.map(dep => (
            <CardDepartamentos key={dep.id} departamentos={dep} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ListarDepartamentos;
