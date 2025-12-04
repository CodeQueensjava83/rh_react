import axios from "axios";
 
export const api = axios.create({
  baseURL: "https://gestaorh-529f.onrender.com"
});

// ==================== AUTH ====================

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// ==================== CRUD ====================

export const listar = async (url: string, setDados: Function, config = {}) => {
  const resposta = await api.get(url, config); // ✅ AGORA ENVIA TOKEN
  setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: Object, setDados: Function, config = {}) => {
  const resposta = await api.post(url, dados, config);
  setDados(resposta.data);
};

export const atualizar = async (url: string, dados: Object, setDados: Function, config = {}) => {
  const resposta = await api.put(url, dados, config);
  setDados(resposta.data);
};

export const deletar = async (url: string, config = {}) => {
  await api.delete(url, config);
};

// ==================== SALÁRIO ====================

export const calcularSalario = async (url: string, dadosSalario: any, config = {}) => {
  const response = await api.post(url, dadosSalario, config);
  return response.data;
};
