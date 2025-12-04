import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import { listar } from "../../../services/Service";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";
import { AuthContext } from "../../../contexts/AuthContext";

function ListarDepartamentos() {

  const [isLoading, setIsLoading] = useState(true);
  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarDepartamento() {
    await listar("/departamentos", setDepartamentos, {
      headers: {
        Authorization: token
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    buscarDepartamento().finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] w-full overflow-x-hidden">
          <ClipLoader
            color="#0D9488"
            size={80}
            speedMultiplier={2}
            aria-label="loading"
          />
        </div>
      )}

      <div className="flex justify-center w-full min-h-[calc(100vh-8rem)] overflow-x-hidden bg-gray-200">
        <div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">

          {!isLoading && departamentos.length === 0 && (
            <div className="my-8 text-2xl text-center md:text-3xl text-slate-700 md:my-16">
              Nenhum departamento foi encontrado
            </div>
          )}

          <div className="flex flex-col items-center justify-center bg-gray-200 ">
            <h1 className="my-4 text-xl text-center md:text-4xl font-bold py-6 text-orange-500 gap-4">
              Departamentos
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 mb-4 md:mb-0">
              {departamentos.map((departamento) => (
                <CardDepartamentos
                  key={departamento.id}
                  departamentos={departamento}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ListarDepartamentos;
