import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Departamentos from "../../../modals/Departamentos"
import { buscar, atualizar, cadastrar } from "../../../services/Service"
import { AuthContext } from "../../../contexts/AuthContext"



function FormDepartamentos() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [departamentos, setdepartamentos] = useState<Departamentos>({} as Departamentos)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	async function buscardepartamentosPorId() {
		try {
			await buscar(`/departamentoss/${id}`, setdepartamentos, {
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
		navigate("/departamentos")
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setdepartamentos({
			...departamentos,
			[e.target.name]: e.target.value,
		})
	}

	async function gerarNovodepartamentos(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			// Atualização

			try {
				await atualizar("/departamentos", departamentos, setdepartamentos, {
					headers: { Authorization: token },
				})
				//Alerta("O departamento foi atualizado com sucesso!", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
				//	tAlerta("Erro ao atualizar o departamento!", "erro")
				}
			}
		} else {
			// Cadastro

			try {
				await cadastrar("/departamentos", departamentos, setdepartamentos, {
					headers: { Authorization: token },
				})
				//Alerta("O departamento foi cadastrado com sucesso!", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
				//	Alerta("Erro ao cadastrar o departamento!", "erro")
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	return (
		<div className="container flex flex-col items-center justify-center mx-auto">
			<h1 className="text-4xl text-center my-8">{id === undefined ? "Cadastrar" : "Atualizar"} Departamentos</h1>

			<form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovodepartamentos}>
				<div className="flex flex-col gap-2">
					<label htmlFor="descricao">Descrição do departamentos</label>
					<input
						type="text"
						placeholder="Descreva aqui seu departamento"
						name="descricao"
						className="border-2 border-slate-700 rounded p-2"
						value={departamentos.descricao}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<button
					className="rounded text-gray-700 bg-sky-800
                               hover:bg-teal-600 w-1/2 py-2 mx-auto flex justify-center"
					type="submit"
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
					) : (
						<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormDepartamentos