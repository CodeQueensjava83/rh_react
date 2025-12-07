import { useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import type Colaboradores from '../../../modals/Colaboradores';
import CardColaboradores from '../cardcolaboradores/CardColaboradores';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { listar } from '../../../services/Service';
import FormColaboradores from '../formcolaboradores/FormColaboradores'; // Importe o formulário

function ListarColaboradores() {

  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false); // Estado para controlar a modal
  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // << MUDANÇA AQUI >>
  // Função que será passada para o FormColaboradores para atualizar a lista
  function adicionarOuAtualizarColaborador(novoColaborador: Colaboradores) {
    setColaboradores((prev) => {
      const existe = prev.find((c) => c.id === novoColaborador.id);
      if (existe) {
        // Se já existe, atualiza na lista
        return prev.map((c) => (c.id === novoColaborador.id ? novoColaborador : c));
      }
      // Se não existe, adiciona à lista
      return [...prev, novoColaborador];
    });
  }
  // << FIM DA MUDANÇA >>

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado para acessar essa página.');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarColaboradores();
  }, []);

  async function buscarColaboradores() {
    try {
      setIsLoading(true);
      await listar('/colaboradores/all', setColaboradores, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Botão que ABRE a modal */}
      <div className="flex justify-end my-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-amber-500 hover:bg-amber-800 text-white px-4 py-2 rounded"
        >
          + Cadastrar Colaborador
        </button>
      </div>

      {/* A Modal em si */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* O FormColaboradores DENTRO da modal */}
            <FormColaboradores
              // Passa a função para FECHAR a modal
              onClose={() => setShowCreateModal(false)}
              // Passa a função para ATUALIZAR a lista de colaboradores no estado
              onSuccess={adicionarOuAtualizarColaborador}
            />
          </div>
        </div>
      )}
      
      {/* O resto do seu componente de listagem */}
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <ClipLoader color="#0D9488" size={80} speedMultiplier={2} aria-label="loading" />
        </div>
      )}

      <div className="flex justify-center w-full bg-slate-200 min-h-[70vh] overflow-x-hidden">
        <div className="box-border w-full px-4 py-4 mt-8 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
          {!isLoading && colaboradores.length === 0 && (
            <span className="text-3xl text-center my-8">Nenhum Colaborador foi encontrado!</span>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {colaboradores.map((colab) => (
              <CardColaboradores
                key={colab.id}
                colaboradores={colab}
                onCalcular={() => console.log("Calcular salário", colab)}
                onHolerite={() => console.log("Gerar holerite", colab)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListarColaboradores;