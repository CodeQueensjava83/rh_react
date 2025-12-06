import type Colaboradores from "./Colaboradores";

export default interface Departamentos{
    nome: string;
    colaborador?: Colaboradores[];
}