import { useContext, useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar, atualizar, cadastrar } from "../../../services/Service";
import type Departamentos from "../../../modals/Departamentos";

interface FormDepartamentosProps {
  onSuccess?: () => void;
}

function FormDepartamentos({ onSuccess }: FormDepartamentosProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);
  const [departamento, setDepartamento] = useState<Departamentos>({
    nome: "",
  });
  const payload = { ...departamento, id: Number(id) }; 


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
      retornar();
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) listarPorId(id);
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setDepartamento({
      ...departamento,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoDepartamento(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsLoading(true);

  try {
    if (id !== undefined) {
      await atualizar(`/departamentos`, payload, setDepartamento, {
        headers: { Authorization: token },
      });
      alert("Departamento atualizado com sucesso!");
    } else {
      await cadastrar(`/departamentos`, { nome: departamento.nome }, setDepartamento, {
        headers: { Authorization: token },
      });
      alert("Departamento cadastrado com sucesso!");
    }

    if (onSuccess) {
      onSuccess();
    } else {
      retornar(); // <- redireciona para a listagem
    }
  } catch (error: any) {
    if (error.toString().includes("401")) {
      handleLogout();
    } else {
      alert("Erro ao salvar o departamento!");
    }
  } finally {
    setIsLoading(false);
  }
}


  function retornar() {
    navigate("/departamentos");
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 mx-auto bg-gray-200">
      <h1 className="my-8 text-lg text-center md:text-4xl font-bold uppercase py-6 text-orange-400 gap-4">
        {id === undefined ? "Cadastrar Departamento" : "Editar Departamento"}
      </h1>

      <form
        className="flex flex-col w-full max-w-md gap-4 px-2 md:max-w-1/2"
        onSubmit={gerarNovoDepartamento}
      >
        <div className="flex flex-col gap-2 text-orange-400 text-2xl">
          <label htmlFor="descricao">Nome</label>
          <input
            type="text"
            placeholder="Departamento"
            id="descricao"
            name="nome"
            className="p-2 text-base bg-white rounded md:text-lg"
            required
            value={departamento.nome || ""}
            onChange={atualizarEstado}
          />
        </div>
        <button
          className="flex justify-center w-full py-2 mx-auto text-base rounded text-slate-100 font-bold bg-orange-400 hover:bg-orange-200 md:w-1/2 md:text-lg"
          type="submit"
        >
          {isLoading ? <ClipLoader color="#FFA500" size={24} /> : <span>{id ? "Atualizar" : "Cadastrar"}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormDepartamentos;
