import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  useContext,
} from "react";
import { ClipLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";

import type Departamentos from "../../../modals/Departamentos";
import type Colaboradores from "../../../modals/Colaboradores";

import { atualizar, cadastrar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

interface FormColaboradoresProps {
  onClose?: () => void;
  onSuccess?: (colaborador: Colaboradores) => void;
}

function FormColaboradores({ onClose, onSuccess }: FormColaboradoresProps) {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);

  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  const [departamentoId, setDepartamentoId] = useState<number>(0);

  const [colaborador, setColaborador] = useState<Colaboradores>(
    {} as Colaboradores
  );

  async function buscarColaboradorPorId(colabId: string) {
    try {
      const data = await listar<Colaboradores>(`/colaboradores/${colabId}`, undefined, {
        headers: { Authorization: token },
      });

      setColaborador(data);
      if (data.nome) {
        setDepartamentoId(data.nome);
      }
    } catch {
      alert("Erro ao listar colaborador!");
    }
  }

  async function buscarDepartamentos() {
    try {
      await listar<Departamentos[]>(`/departamentos`, setDepartamentos, {
        headers: { Authorization: token },
      });
    } catch {
      alert("Erro ao listar departamentos!");
    }
  }

  useEffect(() => {
    buscarDepartamentos();
    if (id) buscarColaboradorPorId(id);
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, value, name } = e.target;
    let valor: string | number = value;

    if (type === "number" && value !== "") {
      const valorSemZeros = value.replace(/^0+(?!$)/, "") || "0";
      valor = name === "salario"
        ? parseFloat(Number(valorSemZeros).toFixed(2))
        : parseInt(valorSemZeros);
    }

    setColaborador({
      ...colaborador,
      [name]: valor,
    });
  }

  // Submit
  async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let colaboradorSalvo: Colaboradores;

      const payload = {
        ...colaborador,
        id: id ? Number(id) : undefined,
        departamento: { id: departamentoId },
      };

      if (id) {
        colaboradorSalvo = await atualizar<Colaboradores>(
          `/colaboradores/atualizar`,
          payload,
          undefined,
          { headers: { Authorization: token } }
        );
        alert("Colaborador atualizado com sucesso!");
      } else {
        colaboradorSalvo = await cadastrar<Colaboradores>(
          `/colaboradores/cadastrar`,
          payload,
          undefined,
          { headers: { Authorization: token } }
        );
        alert("Colaborador cadastrado com sucesso!");
      }

      if (onSuccess) onSuccess(colaboradorSalvo);
      if (onClose) onClose();
      else navigate("/colaboradores/all");

    } catch (error: any) {
      console.error("Erro detalhado:", error.response?.data || error);
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao salvar colaborador!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const formContent = (
    <form
      className="flex flex-col w-full max-w-xl space-y-4 p-6 bg-white border shadow-sm rounded-xl border-slate-200"
      onSubmit={gerarNovoColaborador}
    >
      {!onClose && (
        <h1 className="text-2xl font-bold text-center text-orange-400 mb-4">
          {id ? "Editar Colaborador" : "Novo Colaborador"}
        </h1>
      )}

      {/* Nome + Dependentes */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-3/4">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={colaborador.nome || ""}
            onChange={atualizarEstado}
            className="p-2 border rounded-lg text-left"
          />
        </div>

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="dependentes">Dependentes</label>
          <input
            type="number"
            id="dependentes"
            name="dependentes"
            required
            value={colaborador.dependentes ?? 0}
            onChange={atualizarEstado}
            className="p-2 border rounded-lg text-center"
          />
        </div>
      </div>

      {/* Cargo, Salário, Horas */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={colaborador.cargo || ""}
            onChange={atualizarEstado}
            className="p-2 border rounded-lg text-left"
          />
        </div>

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="salario">Salário</label>
          <input
            type="number"
            step=".01"
            id="salario"
            name="salario"
            required
            value={colaborador.salario ?? 0}
            onChange={atualizarEstado}
            className="p-2 border rounded-lg text-center"
          />
        </div>

        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="horasMensais">Horas Mensais</label>
          <input
            type="number"
            id="horasMensais"
            name="horasMensais"
            value={colaborador.horasMensais ?? 0}
            onChange={atualizarEstado}
            className="p-2 border rounded-lg text-center"
          />
        </div>
      </div>

      {/* Setor */}
      <div className="flex flex-col gap-2">
        <label htmlFor="setor">Setor</label>
        <input
          type="text"
          id="setor"
          name="setor"
          value={colaborador.setor || ""}
          onChange={atualizarEstado}
          className="p-2 border rounded-lg text-left"
        />
      </div>

      {/* Departamento */}
      <div className="flex flex-col gap-2">
        <label htmlFor="departamento">Departamento</label>
        <select
          id="departamento"
          name="departamento"
          value={departamentoId || ""}
          onChange={(e) => setDepartamentoId(Number(e.target.value))}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="" disabled>
            Selecione um departamento
          </option>
          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Botões */}
      <div className="flex pt-2 gap-2">
        <button
          type="button"
          onClick={onClose ? onClose : () => navigate("/colaboradores/all")}
          className="w-1/2 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
        >
          {onClose ? "Cancelar" : "Voltar"}
        </button>

        <button
          type="submit"
          className="w-1/2 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </div>
    </form>
  );

  if (!onClose) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-gray-200">
        {formContent}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
        aria-label="Fechar"
      >
        &times;
      </button>
      {formContent}
    </div>
  );
}

export default FormColaboradores;