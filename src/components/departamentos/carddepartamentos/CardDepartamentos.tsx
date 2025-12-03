import { Link } from "react-router-dom"
import type Departamentos from "../../../modals/Departamentos"

   
interface CardDepartamentosProps{   
   departamentos: Departamentos
}

function CardDepartamentos({ departamentos }: CardDepartamentosProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-white text-gray-700 font-bold text-2xl'>
                Departamentos
            </header>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{departamentos.descricao}</p>
            
            <div className="flex">
                <Link to={`/editardepartamentos/${departamentos.id}`}
                    className='w-full text-gray-700 bg-sky-800 hover:bg-orange-600
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletardepartamentos/${departamentos.id}`} className='text-gray-700 bg-red-900 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardDepartamentos;