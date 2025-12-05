import { 
  useEffect, 
  useState, 
  type ChangeEvent, 
  type FormEvent, 
  useContext 
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import type Departamentos from "../../../modals/Departamentos";
import type Colaboradores from "../../../modals/Colaboradores";
import { atualizar, cadastrar, listar } from "../../../services/Service";

import { AuthContext } from "../../../contexts/AuthContext";

function FormColaboradores() {
  const navigate = useNavigate();

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

  // ----------------------------
  // Buscar colaborador por ID
  // ----------------------------
  async function buscarColaboradorPorId(id: string) {
    try {
      const data = await listar(`/colaboradores/${id}`, undefined, {
        headers: { Authorization: token },
      });

      setColaborador(data);
      setDepartamento(data.departamento);
    } catch {
      alert("Erro ao listar colaborador!");
    }
  }

  // ----------------------------
  // Buscar departamentos
  // ----------------------------
  async function buscarDepartamentos() {
    try {
      await listar(`/departamentos`, setDepartamentos, {
        headers: { Authorization: token },
      });
    } catch {
      alert("Erro ao listar departamentos!");
    }
  }

  // ----------------------------
  // Buscar departamento por ID (select)
  // ----------------------------
  async function buscarDepartamentoPorId(id: string) {
    try {
      const data = await listar(`/departamentos/${id}`, undefined, {
        headers: { Authorization: token },
      });

      setDepartamento(data);
      setColaborador({ ...colaborador, departamento: data });
    } catch {
      alert("Erro ao buscar departamento!");
    }
  }

  // ----------------------------
  // Load inicial
  // ----------------------------
  useEffect(() => {
    buscarDepartamentos();
    if (id) buscarColaboradorPorId(id);
  }, [id]);

  // ----------------------------
  // Atualizar estado genérico
  // ----------------------------
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

  function retornar() {
    navigate("/colaboradores/all");
  }

  // ----------------------------
  // Submit
  // ----------------------------
  async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // atualizar
        await atualizar(`/colaboradores/${id}`, colaborador, {
          headers: { Authorization: token },
        });
        alert("Colaborador atualizado com sucesso!");
      } else {
        // cadastrar
        await cadastrar(`/colaboradores`, colaborador, {
          headers: { Authorization: token },
        });
        alert("Colaborador cadastrado com sucesso!");
      }
    } catch (error: any) {
      if (String(error).includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao salvar colaborador!");
      }
    }

    setIsLoading(false);
    retornar();
  }

  // -------------------------------------
  // JSX
  // -------------------------------------
  return (
    <div className="container flex flex-col items-center justify-start mx-auto bg-slate-100 min-h-[70vh] px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold text-center md:text-4xl text-amber-500">
        {id ? "Editar" : "Cadastrar"} Colaborador
      </h1>

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
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={retornar}
            className="flex-1 py-2 bg-neutral-500 text-white rounded"
          >
            Voltar
          </button>

          <button
            type="submit"
            className="flex-1 py-2 bg-amber-500 text-white rounded"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>{id ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormColaboradores;