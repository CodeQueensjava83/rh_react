import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import type Colaboradores from '../../../modals/Colaboradores';
import CardColaboradores from '../cardcolaboradores/CardColaboradores';
import { listar } from '../../../services/Service'; // certifique-se de importar

function ListarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarColaboradores() {
    setIsLoading(true);
    try {
      const data = await listar('/colaboradores');
      setColaboradores(data);
    } catch {
      alert('Erro ao listar todos os colaboradores!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarColaboradores();
  }, []); // só roda uma vez ao montar

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
            {colaboradores.map((colaborador) => (
              <CardColaboradores
                key={colaborador.id}
                colaboradores={colaborador}
                onCalcular={() => console.log("Calcular salário", colaborador)}
                onHolerite={() => console.log("Gerar holerite", colaborador)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListarColaboradores
