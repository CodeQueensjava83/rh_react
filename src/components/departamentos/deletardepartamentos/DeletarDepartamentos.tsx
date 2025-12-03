import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Departamentos from "../../../modals/Departamentos"
import { buscar, deletar } from "../../../services/Service"




function Deletardepartamentos() {

    const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [departamentos, setdepartamentos] = useState<Departamentos>({} as Departamentos)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	async function buscardepartamentosPorId() {
		try {
			await buscar(`/departamentos/${id}`, setdepartamentos, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			}
		} 
	}

    useEffect(() => {
        if(id !== undefined){
            buscardepartamentosPorId();
        }
    }, [id])

	useEffect(() => {
		if (token === "") {
			//Alerta("Você precisa estar logado!", "info")
			navigate("/")
		}
	}, [token])

	function retornar() {
		navigate("/departamentoss")
	}

    async function deletardepartamentos(){
        setIsLoading(true);

        try{

            await deletar(`/departamentoss/${id}`, {
                headers: { Authorization: token}
            })

            //Alerta('departamentos deletado com sucesso!', "sucesso")

        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout();
            }else{
             //   Alerta('Erro ao deletar o departamentos!', "erro")
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar departamento</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o departamento a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    departamentos
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{departamentos.descricao}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}    
                    >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                            onClick={deletardepartamentos}
                        >
                        {
                            isLoading ?
                                <ClipLoader 
                                    color="#ffffff"
                                    size={24}
                                />
                            :
                            <span>Sim</span>                        
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Deletardepartamentos
