import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Departamentos from "../../../modals/Departamentos";
import { buscar } from "../../../services/Service";
import CardDepartamentos from "../carddepartamentos/CardDepartamentos";




function ListaDepartamentos() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [departamentos, setdepartamentos] = useState<Departamentos[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === ''){
            //Alerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscardepartamentoss()
    }, [departamentos.length])

    async function buscardepartamentoss(){
        try{

            setIsLoading(true);

            await buscar('/departamentoss', setdepartamentos, {
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
                                Nenhum departamentos foi encontrado!
                            </span>
                       )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                departamentos.map((departamentos) => (
                                    <CardDepartamentos key={departamentos.id} departamentos={departamentos}/>
                                ) )
                            }
                            
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaDepartamentos;