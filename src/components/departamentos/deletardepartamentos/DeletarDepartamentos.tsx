import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { listar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Departamentos from "../../../modals/Departamentos";

function DeletarDepartamentos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [departamento, setDepartamento] = useState<Departamentos>();

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token]);

  async function listarDepartamento() {
    try {
      await listar(`/departamentos/${id}`, setDepartamento, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    listarDepartamento();
  }, [id]);

  async function deletarDepartamento() {
    try {
      await deletar(`/departamentos/${id}`, {
        headers: { Authorization: token },
      });
      navigate("/departamentos");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Deseja realmente deletar este departamento?
        </h2>

        <p className="mb-4">Nome: {departamento?.nome}</p>

        <div className="flex gap-4">
          <button
            onClick={deletarDepartamento}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>

          <button
            onClick={() => navigate("/departamentos")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarDepartamentos;



