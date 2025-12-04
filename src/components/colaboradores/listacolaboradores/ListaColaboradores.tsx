import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type Colaboradores from "../../../modals/Colaboradores";
import CardColaboradores from "../cardcolaboradores/CardColaboradores";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar } from "../../../services/Service";

function ListaColaboradores() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = usuario.token

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token, navigate]);

  // Carrega colaboradores quando o token estiver disponível
  useEffect(() => {
    if (token) buscarColaboradores();
  }, [token]);

  async function buscarColaboradores() {
    try {
      setIsLoading(true);

      console.log("▶ Buscando colaboradores...");
      console.log("TOKEN ENVIADO:", token);

      const response = await listar("/colaboradores/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📌 Resposta da API:", response);

      // Valida resposta antes de salvar
      if (!response || !Array.isArray(response)) {
        console.error("❌ API não retornou um array válido:", response);
        alert("Erro ao carregar colaboradores: resposta inválida do servidor.");
        return;
      }

      setColaboradores(response);
    } catch (error: any) {
      console.error("❌ Erro ao buscar colaboradores:", error);

      if (error.response?.status === 401) {
        alert("Sessão expirada! Faça login novamente.");
        navigate("/");
      } else {
        alert("Erro ao carregar colaboradores.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <ClipLoader color="#0D9488" size={80} speedMultiplier={2} />
        </div>
      )}

      <div className="flex justify-center w-full bg-slate-200 min-h-[70vh]">
        <div className="box-border w-full px-4 py-4 mt-8">
          {!isLoading && colaboradores.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Colaborador foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}

export default ListaColaboradores;






