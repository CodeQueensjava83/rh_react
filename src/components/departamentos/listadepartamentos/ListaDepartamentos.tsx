import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Departamentos from "../../../modals/Departamentos";
import { AuthContext } from "../../../contexts/AuthContext";
import { listar } from "../../../services/Service";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";


function ListaDepartamentos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [departamentos, setDepartamentos] = useState<Departamentos[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === ''){
           // ToastAlerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        listarDepartamentos()
    }, [])

    async function listarDepartamentos(){
        try{

            setIsLoading(true);

            await listar('/departamentos', setDepartamentos, {
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
                       (!isLoading && departamentos.length === 0) &&(
                            <span className="text-3xl text-center my-8">
                                Nenhum departamento foi encontrado!
                            </span>
                       )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                departamentos.map((departamentos) => (
                                    <CardDepartamentos key={departamentos.nome} departamentos={departamentos}/>
                                ) )
                            }
                            
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaDepartamentos;