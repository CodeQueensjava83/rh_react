import type Departamentos from "./Departamentos";
import type Usuario from "./Usuario";

export default interface Colaboradores {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    departamento: Departamentos | null;
    usuario: Usuario | null;
}