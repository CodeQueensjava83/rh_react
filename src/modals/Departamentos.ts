import type Colaboradores from "./Colaboradores";

export default interface Departamento{
    id: number;
    descricao: string;
    colaborador?: Colaboradores[];
}