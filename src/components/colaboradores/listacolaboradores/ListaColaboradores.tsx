import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import type Colaboradores from "../../../modals/Colaboradores";
import CardColaboradores from "../cardcolaboradores/CardColaboradores";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar } from "../../../services/Service";
import FormColaboradores from "../formcolaboradores/FormColaboradores";

function ListarColaboradores() {
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /** Adiciona ou atualiza colaborador na lista exibida */
  function adicionarOuAtualizarColaborador(novo: Colaboradores) {
    setColaboradores((prev) => {
      const existe = prev.some((c) => c.id === novo.id);
      return existe
        ? prev.map((c) => (c.id === novo.id ? novo : c))
        : [...prev, novo];
    });
  }

  /** Protege rota */
  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado para acessar essa página.");
      navigate("/");
    }
  }, [token]);

  /** Carrega colaboradores uma única vez */
  useEffect(() => {
    buscarColaboradores();
  }, []);

  async function buscarColaboradores() {
    try {
      setIsLoading(true);

      await listar("/colaboradores/all", setColaboradores, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Botão Novo */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-amber-500 hover:bg-amber-800 text-white px-4 py-2 rounded"
        >
          Novo Colaborador
        </button>
      </div>

      {/* Modal Criar Colaborador */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/2">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Cadastrar Colaborador</h2>

              {/* Botão de Fechar (X) */}
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <FormColaboradores
              onClose={() => setShowCreateModal(false)}
              onSuccess={adicionarOuAtualizarColaborador}
            />

            {/* Botões do Rodapé */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <ClipLoader color="#0D9488" size={80} speedMultiplier={2} />
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex justify-center w-full bg-slate-200 min-h-[70vh] overflow-x-hidden">
        <div className="box-border w-full px-4 py-4 mt-8 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">

          {!isLoading && colaboradores.length === 0 && (
            <p className="text-3xl text-center my-8">
              Nenhum Colaborador foi encontrado!
            </p>
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
  );
}

export default ListarColaboradores;
