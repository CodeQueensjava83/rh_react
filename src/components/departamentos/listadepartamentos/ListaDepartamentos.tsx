import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar } from "../../../services/Service";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";
import FormDepartamentos from "../formdepartamentos/FormDepartamentos"; // importa seu form

function ListaDepartamentos() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // controla modal

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    listarDepartamentos();
  }, []);

  async function listarDepartamentos() {
    try {
      setIsLoading(true);
      await listar("/departamentos", setDepartamentos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#FF8C00" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full px-4 my-4">
        <div className="container flex flex-col">
          {/* Botão para abrir modal */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-white bg-orange-400 rounded hover:bg-orange-300"
            >
              + Cadastrar Departamento
            </button>
          </div>

          {!isLoading && departamentos.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum departamento foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departamentos.map((departamento) => (
              <CardDepartamentos
                key={departamento.nome}
                departamentos={departamento}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-orange-400">
                Cadastrar Departamento
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <FormDepartamentos 
                onSuccess={() => {
                    setIsModalOpen(false);
                    listarDepartamentos();
                }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ListaDepartamentos;
