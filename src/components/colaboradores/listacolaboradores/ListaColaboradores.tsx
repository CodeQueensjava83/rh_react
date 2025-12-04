import { useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import type Colaboradores from '../../../modals/Colaboradores';
import CardColaboradores from '../cardcolaboradores/CardColaboradores';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { listar } from '../../../services/Service';

function ListarColaboradores() {

  const navigate = useNavigate();

  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, hadleLogout } = useContext(AuthContext);
  const token = usuario.token

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado para acessar essa página.')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarColaboradores()
  }, [colaboradores.length])

     async function buscarColaboradores() {
        try {

            setIsLoading(true)

            await listar('/colaboradores/all', setColaboradores, {
                headers: { Authorization: token}
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }finally {
            setIsLoading(false)
        }
    }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <ClipLoader
            color="#0D9488"
            size={80}
            speedMultiplier={2}
            aria-label="loading"
          />
        </div>
      )}

      <div className="flex justify-center w-full bg-slate-200 min-h-[70vh] overflow-x-hidden">
        <div className="box-border w-full px-4 py-4 mt-8 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
          {!isLoading && colaboradores.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Colaborador foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {colaboradores.map((colaboradores) => (
              <CardColaboradores
                key={colaboradores.id}
                colaboradores={colaboradores}
                onCalcular={() => console.log("Calcular salário", colaboradores)}
                onHolerite={() => console.log("Gerar holerite", colaboradores)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListarColaboradores
