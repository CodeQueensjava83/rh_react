import axios from "axios"
 
export const api = axios.create({
    baseURL: "https://gestaorh-529f.onrender.com/"
  })
 
 export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

  // ==================== CRUD ====================


  export const listar = async(url: string, setDados: Function) => {
    const resposta = await api.get(url)
    setDados(resposta.data)
  }
 
  export const cadastrar = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
  }
 
  export const atualizar = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.put(url, dados)
    setDados(resposta.data)
  }
 
  export const deletar = async(url: string) => {
    await api.delete(url)

  }

 // ==================== CÁLCULO DE SALÁRIO ====================

export const calcularSalario = async (url: string, dadosSalario: any) => {
  const response = await api.post(url, dadosSalario)
  return response.data
}

