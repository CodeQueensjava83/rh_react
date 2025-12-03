import type Colaboradores from "../../../modals/Colaboradores";


interface ModalHoleriteProps {
    holerite: any;
    colaboradores: Colaboradores;
    onClose: () => void;
}

export default function ModalHolerite({ holerite, colaboradores, onClose }: ModalHoleriteProps) {
    const formatCurrency = (value: number | undefined | null) =>
        isNaN(Number(value))
            ? "R$ 0,00"
            : Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(Number(value));

    const formatNumber = (value: number | undefined | null) =>
        isNaN(Number(value)) ? "0" : Number(value).toString();

    return (


        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg space-y-4">

                <div className="print-area bg-white p-6 shadow-lg space-y-4">

                    {/* Cabeçalho */}
                    <div className="text-sm space-y-1">
                        <h2 className="text-xl font-semibold text-center">Holerite</h2>
                        <p><strong>Funcionário: </strong> {colaboradores.nome} </p>
                        <p><strong>E-mail: </strong> {colaboradores.email} </p>
                        <p><strong>Função: </strong> {colaboradores.cargo} </p>
                        <p><strong>Departamento: </strong> {colaboradores.departamento ? colaboradores.departamento.descricao : "Não informado"} </p>

                    </div>
                    <table className="w-full text-sm border-collapse">
                        <tbody>
                            <tr>
                                <td className="py-1 font-medium">Salário Base:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.salario)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">Horas Extras:</td>
                                <td className="py-1 text-right">{formatNumber(holerite.horasExtras)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">Valor Hora Extra:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.valorHoraExtra)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">Total Horas Extras:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.valorTotalHorasExtras)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">INSS:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.inss)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">IRRF:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.ir)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-medium">Total Descontos:</td>
                                <td className="py-1 text-right">{formatCurrency(holerite.totalDescontos)}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 font-semibold">Salário Líquido:</td>
                                <td className="py-2 text-right font-bold text-green-600">
                                    {formatCurrency(holerite.salarioLiquido)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {holerite.mensagem && (
                        <p className="text-xs text-center italic mt-2">
                            {holerite.mensagem}
                        </p>
                    )}

                </div>

                <button
                    className="w-full py-2 bg-amber-500 text-white rounded hover:bg-amber-400 transition-colors"
                    onClick={onClose}
                >
                    Fechar
                </button>

                <button
                    className="w-full py-2 bg-neutral-600 text-white rounded hover:bg-neutral-500 transition-colors"
                    onClick={() => window.print()}
                >
                    Imprimir / Salvar PDF
                </button>

            </div>
        </div>
    );
}