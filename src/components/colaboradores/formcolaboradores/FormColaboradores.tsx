import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Colaboradores from "../../../modals/Colaboradores"

import { ToastAlerta } from "../../../utils/ToastAlert"
import { listar, atualizar, cadastrar } from "../../../services/Service"




function FormColaboradores() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [colaboradores, setColaboradores] = useState<Colaboradores>({} as Colaboradores)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	async function listarColaboradorPorId() {
		try {
			await listar(`/colaboradores/all/${id}`, setColaboradores, {
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
            listarColaboradorPorId();
        }
    }, [id])

	useEffect(() => {
		if (token === "") {
			ToastAlerta("Você precisa estar logado!", "info")
			navigate("/")
		}
	}, [token])

	function retornar() {
		navigate("/colaboradores")
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setColaboradores({
			...colaboradores,
			[e.target.name]: e.target.value,
		})
	}

	async function gerarNovoColaborador(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			// Atualização

			try {
				await atualizar("/colaboradores/novo", colaboradores, setColaboradores, {
					headers: { Authorization: token },
				})
				ToastAlerta("O Tema foi atualizado com sucesso!", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao atualizar o tema!", "erro")
				}
			}
		} else {
			// Cadastro

			try {
				await cadastrar("/colaboradores/novo", colaboradores, setColaboradores, {
					headers: { Authorization: token },
				})
				ToastAlerta("O Tema foi cadastrado com sucesso!", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao cadastrar o tema!", "erro")
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	//console.log(JSON.stringify(tema))

	return (
		<div className="container flex flex-col items-center justify-center mx-auto">
			<h1 className="text-4xl text-center my-8">{id === undefined ? "Cadastrar" : "Atualizar"} Colaborador</h1>

			<form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoColaborador}>
				<div className="flex flex-col gap-2">
					<label htmlFor="descricao">Descrição do colaborador</label>
					<input
						type="text"
						placeholder="Descreva aqui seu tema"
						name="descricao"
						className="border-2 border-slate-700 rounded p-2"
						value={colaboradores.nome}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<button
					className="rounded text-amber-400 bg-indigo-950
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
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

export default FormColaboradores;