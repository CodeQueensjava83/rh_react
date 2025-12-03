import type Departamentos from "./Departamentos";
import type Usuario from "./Usuario";

export default interface Colaboradores {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    salario: number;
    foto: string;
    horasMensais: number;
    dependentes: number;
    departamento: Departamentos | null;
    usuario: Usuario | null;
}