import { Link } from 'react-router-dom'
import type Colaboradores from '../../../modals/Colaboradores'

interface CardColaboradoresProps {
    colaboradores: Colaboradores
}

function CardColaboradores({ colaboradores }: CardColaboradoresProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={colaboradores.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={colaboradores.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {colaboradores.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{colaboradores.titulo}</h4>
                    <p>{colaboradores.texto}</p>
                    <p>Departamento: {colaboradores.departamento?.descricao}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarcolaboradores/${colaboradores.id}`}
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarcolaboradores/${colaboradores.id}`} 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardColaboradores