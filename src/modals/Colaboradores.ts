
export default interface Colaboradores {
    id: number;
    nome: string;
    cargo: string;
    setor: string;
    salario: number;
    horasMensais?: number;
    dependentes?: number;
}