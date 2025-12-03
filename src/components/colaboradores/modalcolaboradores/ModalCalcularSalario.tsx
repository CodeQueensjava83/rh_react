import React, { useState } from "react";
import { calcularSalario } from "../../../services/Service";

type ModalCalcularSalarioProps = {
  colaboradoresId: number;
  onClose: () => void;
  onSuccess: (holerite: any) => void;
};

const ModalCalcularSalario: React.FC<ModalCalcularSalarioProps> = ({ colaboradoresId, onClose, onSuccess }) => {
  const [horasExtras, setHorasExtras] = useState<number>();
  const [descontos, setDescontos] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const Calcular = async () => {
    setLoading(true);
    setErro(null);
    try {
      const resultado = await calcularSalario(
        `/colaboradores/calcularsalario/${colaboradoresId}`, // ✅ usa direto o número
        {
          totalHorasExtras: horasExtras,
          descontos: descontos,
        }
      );
      onSuccess(resultado);
    } catch (error) {
      setErro("Erro ao calcular salário. Verifique os dados ou a conexão.");
      console.error("Erro ao calcular salário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold text-center text-amber-500">Calcular Salário</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-center text-xl font-medium mb-1">Total de Horas Extras:</label>
            <input
              type="number"
              value={horasExtras}
              onChange={(e) => setHorasExtras(Number(e.target.value))}
              className="w-full text-center px-3 py-2 border rounded"
              placeholder="Ex: 10"
            />
          </div>

          <div>
            <label className="block text-center text-xl font-medium mb-1">Descontos:</label>
            <input
              type="number"
              value={descontos}
              onChange={(e) => setDescontos(Number(e.target.value))}
              className="w-full text-center px-3 py-2 border rounded"
              placeholder="Ex: 150.00"
            />
          </div>

          {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}

          <button
            className="w-full py-2 bg-amber-500 text-white rounded hover:bg-amber-400 transition-colors"
            onClick={Calcular}
            disabled={loading}
          >
            {loading ? "Calculando..." : "Calcular"}
          </button>

          <button
            className="w-full py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalcularSalario;