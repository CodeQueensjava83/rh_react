import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import type Colaboradores from "../../../modals/Colaboradores";
import { atualizar, cadastrar, listar } from "../../../services/Service";

function FormColaboradores() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);

  // Lista de departamentos
  const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
  // Departamento selecionado
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState<Departamentos | null>(null);

  const [colaborador, setColaborador] = useState<Colaboradores>({} as Colaboradores);

  async function buscarColaboradorPorId(id: string) {
    try {
      const data = await listar(`/colaboradores/${id}`);
      setColaborador(data);
      setDepartamentoSelecionado(data.departamento); // já vincula o departamento
    } catch {
      alert("Erro ao listar colaborador!");
    }
  }

  async function buscarDepartamentos() {
    try {
      const data = await listar(`/departamentos`);
      setDepartamentos(data);
    } catch {
      alert("Erro ao listar todos os departamentos!");
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
      departamento: departamentoSelecionado ?? colaborador.departamento,
    });
  }

  function retornar() {
    navigate("/colaboradores");
  }

  async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar(`/colaboradores`, colaborador);
        alert("Colaborador atualizado com sucesso!");
      } else {
        await cadastrar(`/colaboradores`, colaborador);
        alert("Colaborador cadastrado com sucesso!");
      }
      retornar();
    } catch {
      alert("Erro ao salvar colaborador!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-start mx-auto bg-slate-100 min-h-[70vh] px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold text-center md:text-4xl text-amber-500">
        {id ? "Editar" : "Cadastrar"} Colaborador
      </h1>

      <form
        className="flex flex-col w-full max-w-xl gap-4 p-4 bg-white border shadow-sm rounded-xl border-slate-200"
        onSubmit={gerarNovoColaborador}
      >
        {/* Nome e Dependentes */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-3/4">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
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
              name="dependentes"
              id="dependentes"
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
              name="cargo"
              id="cargo"
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
              name="salario"
              id="salario"
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
              name="horasMensais"
              id="horasMensais"
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
            name="email"
            id="email"
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
            name="foto"
            id="foto"
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
            value={departamentoSelecionado?.id ?? ""}
            onChange={(e) => {
              const dep = departamentos.find((d) => d.id === Number(e.target.value));
              setDepartamentoSelecionado(dep || null);
              setColaborador({ ...colaborador, departamento: dep || null });
            }}
            className="p-2 border rounded-lg"
          >
            <option value="" disabled>
              Selecione um Departamento
            </option>
            {departamentos.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* Botões */}
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={retornar} className="flex-1 py-2 bg-neutral-500 text-white rounded">
            Voltar
          </button>
          <button type="submit" className="flex-1 py-2 bg-amber-500 text-white rounded">
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>{id ? "Atualizar" : "Cadastrar"}</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormColaboradores;
