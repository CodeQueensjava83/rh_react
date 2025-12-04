import { useEffect, useState, type ChangeEvent, type FormEvent, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import type Colaboradores from "../../../modals/Colaboradores";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function FormColaboradores() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;


    const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);
    const [departamento, setDepartamento] = useState<Departamento>({
    id: 0,
    descricao: "",
  })


    const [colaborador, setColaborador] = useState<Colaboradores>(
    {} as Colaboradores
    );

    async function buscarColaboradorPorId(id: string) {
      try {
        const data = await listar(`/colaboradores/${id}`, undefined, {
          headers: { Authorization: token }
        });
        setColaborador(data);
        setDepartamento(data.departamento);
      } catch {
        alert("Erro ao listar colaborador!");
      }
    }

async function buscarDepartamentos() {

    try {

      await listar(`/departamentos`, setDepartamentos)

    } catch {
      alert('Erro ao listar todos os departamentos!')

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
      departamento: departamento ?? colaborador.departamento
    });
  }

  function retornar() {
    navigate("/colaboradores/all");
  }

  async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try { 
        await atualizar(`/colaboradores/${id}`, colaborador, {
          headers: {
            Authorization: token,
          },
        });
        alert("Colaborador atualizado com sucesso!");

      } catch (error: any) {
          if (error.toString().includes("401")) {
            handLogout()
          } else { 
              alert("Erro ao atualizar colaborador!");
          }
      }

    } else {
      try {
        await cadastrar("/colaboradores", colaborador, {
          headers: {
            Authorization: token,
          },
        });
        alert("Colaborador cadastrado com sucesso!");

      } catch (error: any) {
          if (error.toString().includes("401")) {
            handLogout() 
          } else { 
              alert("Erro ao cadastrar colaborador!");
          }
        }
      }
    setIsLoading(false);
    retornar();
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
          <label htmlFor="departamento" className="font-medium text-slate-800">
            Departamento
          </label>

          <select
            name="departamento"
            id="departamento"
            className="p-2 text-base bg-white border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={departamento.id !== 0 ? departamento.id : ""}
            onChange={(e) => buscarDepartamentoPorId(e.currentTarget.value)}
          >
            <option value="" disabled>
              Selecione um Departamento
            </option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.descricao}
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
      function handLogout() {
        throw new Error("Function not implemented.");
      }

