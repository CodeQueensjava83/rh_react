import Popup from "reactjs-popup";
import jsPDF from "jspdf";
import type Colaboradores from "../../../modals/Colaboradores";

interface ModalCalcularSalarioProps {
  colaboradoresId: number;
  colaborador: Colaboradores;
  onClose: () => void;
}

function ModalCalcularSalario({ colaboradoresId, colaborador, onClose }: ModalCalcularSalarioProps) {
  const valorHora = colaborador.salario / colaborador.horasMensais;
  const salarioBruto = colaborador.salario;
  const descontoPorDependente = 200;
  const descontos = colaborador.dependentes * descontoPorDependente;
  const salarioLiquido = salarioBruto - descontos;

  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Função para gerar PDF
  function gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("HOLERITE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Nome: ${colaborador.nome}`, 20, 40);
    doc.text(`Cargo: ${colaborador.cargo}`, 20, 50);
    doc.text(`Setor: ${colaborador.setor}`, 20, 60);
    doc.text(`Valor Hora: ${formatarValor(valorHora)}`, 20, 70);
    doc.text(`Horas Mensais: ${colaborador.horasMensais}`, 20, 80);
    doc.text(`Dependentes: ${colaborador.dependentes}`, 20, 90);

    doc.text(`Salário Bruto: ${formatarValor(salarioBruto)}`, 20, 110);
    doc.text(`Descontos: ${formatarValor(descontos)}`, 20, 120);
    doc.text(`Salário Líquido: ${formatarValor(salarioLiquido)}`, 20, 130);

    // Abre o PDF em nova aba
    window.open(doc.output("bloburl"), "_blank");
  }

  return (
    <Popup
      open={true}
      onClose={onClose}
      modal
      contentStyle={{
        borderRadius: "1rem",
        padding: "2rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0", // slate-200
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px"
      }}
    >
      <div className="text-slate-700">
        <h2 className="text-3xl font-bold text-center text-orange-400 uppercase mb-6">
          Calcular Salário
        </h2>

        <div className="flex flex-col gap-2 text-base font-semibold">
          <p><strong>Nome:</strong> {colaborador.nome}</p>
          <p><strong>Cargo:</strong> {colaborador.cargo}</p>
          <p><strong>Setor:</strong> {colaborador.setor}</p>
          <p><strong>Valor Hora:</strong> {formatarValor(valorHora)}</p>
          <p><strong>Horas Mensais:</strong> {colaborador.horasMensais}</p>
          <p><strong>Dependentes:</strong> {colaborador.dependentes}</p>

          <hr className="my-2 border-slate-300" />

          <p><strong>Salário Bruto:</strong> {formatarValor(salarioBruto)}</p>
          <p><strong>Descontos:</strong> {formatarValor(descontos)}</p>
          <p className="text-xl font-bold text-slate-800">
            <strong>Salário Líquido:</strong> {formatarValor(salarioLiquido)}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400"
            onClick={gerarPDF}
          >
            Gerar Holerite (PDF)
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default ModalCalcularSalario;