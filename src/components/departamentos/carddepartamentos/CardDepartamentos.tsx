import React from "react";
import { Link } from "react-router-dom";
import type Departamentos from "../../../modals/Departamentos";

interface CardDepartamentosProps {
  departamentos: Departamentos;
}

const CardDepartamentos: React.FC<CardDepartamentosProps> = ({ departamentos }) => {
  return (
    <div className="flex flex-col rounded-3xl overflow-hidden justify-between">
      <div className="flex bg-orange-500 py-2 px-9 items-center gap-4">
        <h3 className="text-lg font-bold uppercase text-center">
          Departamento
        </h3>
      </div>

      <div className="p-10 bg-white text-center">
        <h4 className="text-lg font-semibold">{departamentos.descricao}</h4>
      </div>

      <div className="flex">
        <Link
          to={`/editardepartamento/${departamentos.id}`}
          className="w-full text-white bg-gray-400 hover:bg-gray-300 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletardepartamento/${departamentos.id}`}
          className="text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
};

export default CardDepartamentos;
