
import { Link } from "react-router-dom";
import type Departamentos from "../../../modals/Departamentos";

interface CardDepartamentosProps {
  departamentos: Departamentos;
}

function CardDepartamentos({ departamentos }: CardDepartamentosProps) {
  return (
    <div className="flex flex-col rounded-3xl overflow-hidden justify-between">
      <div className="flex bg-orange-300 py-2 px-9 items-center gap-4">
        <h3 className="text-lg font-bold uppercase text-center">
          Departamento
        </h3>
      </div>

      <div className="p-2 bg-slate-100 text-center">
        <h4 className="text-lg font-semibold">{departamentos.nome}</h4>
      </div>

      <div className="flex">
        <Link
          to={`/departamentos/editar/${departamentos.id}`}
          className="w-full text-black bg-gray-300 hover:bg-gray-400 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/departamentos/deletar/${departamentos.id}`}
          className="text-black bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}


export default CardDepartamentos;
