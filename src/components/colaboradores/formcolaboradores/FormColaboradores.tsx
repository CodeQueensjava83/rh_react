import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Colaboradores from "../../../modals/Colaboradores";
import type Departamento from "../../../modals/Departamentos";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlert";

function FormColaboradores() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [departamentos, setDepartamentos] = useState<Departamento[]>([])

    const [departamento, setDepartamento] = useState<Departamento>({ id: 0, descricao: '', })
    
    const [colaboradores, setColaboradores] = useState<Colaboradores>({} as Colaboradores)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarColaboradoresPorId(id: string) {
        try {
            await buscar(`/colaboradores/${id}`, setColaboradores, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarDepartamentoPorId(id: string) {
        try {
            await buscar(`/departamentos/${id}`, setDepartamento, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarDepartamentos() {
        try {
            await buscar('/departamentos', setDepartamentos, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarDepartamentos()

        if (id !== undefined) {
            buscarColaboradoresPorId(id)
        }
    }, [id])

    useEffect(() => {
        setColaboradores({
            ...colaboradores,
            departamento: departamento,
        })
    }, [departamento])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setColaboradores({
            ...colaboradores,
            [e.target.name]: e.target.value,
            departamento: departamento,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/colaboradores');
    }

    async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/colaboradores`, colaboradores, setColaboradores, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Colaborador atualizado com sucesso', 'success');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar o Colaborador', 'error');
                }
            }

        } else {
            try {
                await cadastrar(`/colaboradores`, colaboradores, setColaboradores, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Colaborador cadastrado com sucesso', 'success');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar o Colaborador', 'error');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoDepartamento = departamento.descricao === '';


    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                 {id !== undefined ? 'Editar Colaborador' : 'Cadastrar Colaborador'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4"
                onSubmit={gerarNovoColaborador}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título do Colaborador</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={colaboradores.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto do Colaborador</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                         value={colaboradores.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Departamento do Colaborador</p>
                    <select name="departamento" id="departamento" className='border p-2 border-slate-800 rounded' 
                        onChange={(e) => buscarDepartamentoPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Departamento</option>
                        
                        {departamentos.map((departamento) => (
                            <>
                                <option value={departamento.id} >{departamento.descricao}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button 
                    type='submit' 
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                               disabled={carregandoDepartamento}
                >
                    { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                           <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormColaboradores;