import type Colaboradores from "./Colaboradores";

export default interface Departamentos{
    id: number;
    nome: string;
    colaborador?: Colaboradores[];
}