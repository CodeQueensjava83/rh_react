import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar, cadastrar, atualizar } from "../../../services/Service";
import type Departamentos from "../../../modals/Departamentos";

interface FormDepartamentosProps {
  onSuccess?: () => void; // usado no modal
}

function FormDepartamentos({ onSuccess }: FormDepartamentosProps) {
  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState<Departamentos>({
    id: 0,
    nome: "",
  });

  const { id } = useParams();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") navigate("/");

    if (id) buscarPorId();
  }, [id, token]);

  async function buscarPorId() {
    try {
      await listar(`/departamentos/${id}`, setDepartamento, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartamento({
      ...departamento,
      [e.target.name]: e.target.value,
    });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (id) {
        await atualizar(`/departamentos`, departamento, undefined, {
          headers: { Authorization: token },
        });
      } else {
        await cadastrar(`/departamentos`, departamento, undefined, {
          headers: { Authorization: token },
        });
      }

      // Se o formulário está em um modal, fecha e atualiza
      if (onSuccess) {
        onSuccess();
        return;
      }

      // Se for edição por página, volta para a lista
      navigate("/departamentos");

    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

return (
  <div className="flex justify-center items-center w-full px-4 mt-10">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">

      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-400 text-center mb-6">
        {id ? "Editar Departamento" : "Cadastrar Departamento"}
      </h1>

      <form onSubmit={salvar} className="flex flex-col gap-6">

        {/* Campo Nome */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={departamento.nome}
            onChange={atualizarEstado}
            className="border p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 text-white w-full py-3 rounded-xl text-lg font-bold transition-all"
        >
          {id ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </form>
    </div>
  </div>
);

}
export default FormDepartamentos;
