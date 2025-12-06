import { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  CurrencyCircleDollarIcon,
  BriefcaseIcon,
  BuildingsIcon,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import type Colaboradores from '../../../modals/Colaboradores';
import ModalCalcularSalario from '../modalcolaboradores/ModalCalcularSalario';

interface CardColaboradoresProps {
  colaboradores: Colaboradores;
}

function CardColaboradores({ colaboradores }: CardColaboradoresProps) {
  const [setHolerite] = useState<any | null>(null);
  const [openCalcular, setOpenCalcular] = useState(false);
  const [setOpenHolerite] = useState(false);

  return (
    <>
      <div className="relative flex flex-col justify-between overflow-hidden bg-white rounded-lg border border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg w-80 mx-auto p-6 space-y-4">
        {/* Ícones de editar/deletar */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <Link to={`/colaboradores/editar/${colaboradores.id}`}>
            <PencilIcon size={22} className="text-slate-400 hover:text-amber-600 transition-colors cursor-pointer" />
          </Link>
          <Link to={`/colaboradores/deletar/${colaboradores.id}`}>
            <TrashIcon size={22} className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer" />
          </Link>
        </div>

        {/* Foto */}
        <div className="flex justify-start -mt-4">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
            <img
              src="https://ik.imagekit.io/codequeens/NEXUM%20RH/user.png"
              alt="Foto do colaborador"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
        </div>

        {/* Informações */}
        <div className="space-y-3 text-left text-slate-700 text-sm">
          <h3 className="text-xl font-semibold text-slate-800">{colaboradores.nome}</h3>
          <div className="flex items-center gap-2">
            <BuildingsIcon size={20} className="text-amber-500" />
            <span>{colaboradores.setor ?? 'Não informado'}</span>
          </div>
          <div className="flex items-center gap-2">
            <BriefcaseIcon size={20} className="text-amber-500" />
            <span>{colaboradores.cargo}</span>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyCircleDollarIcon size={20} className="text-amber-500" />
            <span>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(colaboradores.salario)}
            </span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2 pt-2">
          <button
            className="flex-1 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 transition-colors text-sm"
            onClick={() => setOpenCalcular(true)}
          >
            Calcular Salário
          </button>
        </div>
      </div>

      {/* Modais */}
      {openCalcular && (
        <ModalCalcularSalario
          colaboradoresId={colaboradores.id}
          colaborador={colaboradores}
          onClose={() => setOpenCalcular(false)}
          onSuccess={(hol) => {
            setHolerite(hol);
            setOpenCalcular(false);
            setOpenHolerite(true);
          }}
        />
      )}
    </>
  );
}

export default CardColaboradores;
