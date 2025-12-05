import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Colaboradores from "../../../modals/Colaboradores";
import { listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlert";
import CardColaboradores from "../cardcolaboradores/CardColaboradores";


function ListaColaboradores() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === ''){
            ToastAlerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        listarColaboradores()
    }, [colaboradores.length])

    async function listarColaboradores(){
        try{

            setIsLoading(true);

            await listar('/colaboradores/all', setColaboradores, {
                headers: { Authorization: token }
            })

        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout();
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full px-4 my-4">
                <div className="container flex flex-col">

                    {
                       (!isLoading && colaboradores.length === 0) &&(
                            <span className="text-3xl text-center my-8">
                                Nenhum colaborador foi encontrado!
                            </span>
                       )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                colaboradores.map((colaboradores) => (
                                    <CardColaboradores key={colaboradores.id} colaboradores={colaboradores}/>
                                ) )
                            }
                            
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaColaboradores;
