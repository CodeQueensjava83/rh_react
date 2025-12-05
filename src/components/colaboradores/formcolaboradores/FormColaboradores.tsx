import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  useContext
} from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import type Departamentos from "../../../modals/Departamentos";
import type Colaboradores from "../../../modals/Colaboradores";

import { atualizar, cadastrar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

interface FormColaboradoresProps {
  onClose: () => void;
  onSuccess: (colaborador: Colaboradores) => void;
}

function FormColaboradores({ onClose, onSuccess }: FormColaboradoresProps) {

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);

  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  const [departamento, setDepartamento] = useState<Departamentos>({
    id: 0,
    descricao: "",
  });

  const [colaborador, setColaborador] = useState<Colaboradores>(
    {} as Colaboradores
  );

  // Buscar colaborador por ID
  async function buscarColaboradorPorId(colabId: string) {
    try {
      const data = await listar(`/colaboradores/${colabId}`, undefined, {
        headers: { Authorization: token },
      });

      setColaborador(data);
      setDepartamento(data.departamento);
    } catch {
      alert("Erro ao listar colaborador!");
    }
  }

  // Buscar departamentos
  async function buscarDepartamentos() {
    try {
      await listar(`/departamentos`, setDepartamentos, {
        headers: { Authorization: token },
      });
    } catch {
      alert("Erro ao listar departamentos!");
    }
  }

  // Buscar departamento selecionado no <select>
  async function buscarDepartamentoPorId(deptId: string) {
    try {
      const data = await listar(`/departamentos/${deptId}`, undefined, {
        headers: { Authorization: token },
      });

      setDepartamento(data);
      setColaborador({ ...colaborador, departamento: data });
    } catch {
      alert("Erro ao buscar departamento!");
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
      valor = parseFloat(Number(valorSemZeros).toFixed(2));
    }

    setColaborador({
      ...colaborador,
      [name]: valor,
      departamento: departamento,
    });
  }

  // Submit
  async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let colaboradorSalvo: Colaboradores;

      if (id) {
        colaboradorSalvo = await atualizar(`/colaboradores/${id}`, colaborador, {
          headers: { Authorization: token },
        });
        alert("Colaborador atualizado com sucesso!");
      } else {
        colaboradorSalvo = await cadastrar(`/colaboradores`, colaborador, {
          headers: { Authorization: token },
        });
        alert("Colaborador cadastrado com sucesso!");
      }

      // 🔥 Atualiza a lista no componente pai
      onSuccess(colaboradorSalvo);

      // 🔥 Fecha o modal
      onClose();

    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao salvar colaborador!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col w-full max-w-xl gap-4 p-4 bg-white border shadow-sm rounded-xl border-slate-200"
      onSubmit={gerarNovoColaborador}
    >
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
            className="p-2 border rounded-lg"
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
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 w-30">
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

        <div className="flex flex-col gap-2 w-30">
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

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          value={colaborador.email || ""}
          onChange={atualizarEstado}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Foto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="foto">Foto</label>
        <input
          type="text"
          id="foto"
          name="foto"
          required
          value={colaborador.foto || ""}
          onChange={atualizarEstado}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Departamento */}
      <div className="flex flex-col gap-2">
        <label htmlFor="departamento">Departamento</label>
        <select
          id="departamento"
          name="departamento"
          value={departamento.id !== 0 ? departamento.id : ""}
          onChange={(e) => buscarDepartamentoPorId(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="" disabled>
            Selecione um departamento
          </option>

          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.descricao}
            </option>
          ))}
        </select>
      </div>

      {/* Botões */}
      <div className="flex pt-2">
        {/* O botão de Cancelar foi removido desta seção */}

        <button
          type="submit"
          // Alterada a classe para 'w-full' para ocupar todo o espaço
          className="w-full py-2 bg-amber-500 text-white rounded"
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
}

export default FormColaboradores;