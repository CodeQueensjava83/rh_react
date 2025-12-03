import type Colaboradores from "./Colaboradores";

export default interface Departamentos {
    id: number;
    descricao: string;
    colaboradores?: Colaboradores[] | null;
}