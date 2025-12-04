// src/services/Service.ts
import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://gestaorh-529f.onrender.com",
});

// ✅ Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem("usuario");

  if (savedUser) {
    const { token } = JSON.parse(savedUser);

    if (token) {
      // Se sua API exigir Bearer prefixado, troque para:
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = token;
    }
  }

  return config;
});

type Config = AxiosRequestConfig | undefined;

// GET
export const listar = async (url: string, config: Config = undefined) => {
  try {
    const resposta = await api.get(url, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][listar] Erro:", error);
    throw error;
  }
};

// POST
export const cadastrar = async (url: string, dados: Object, config: Config = undefined) => {
  try {
    const resposta = await api.post(url, dados, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][cadastrar] Erro:", error);
    throw error;
  }
};

// PUT
export const atualizar = async (url: string, dados: Object, config: Config = undefined) => {
  try {
    const resposta = await api.put(url, dados, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][atualizar] Erro:", error);
    throw error;
  }
};

// DELETE
export const deletar = async (url: string, config: Config = undefined) => {
  try {
    const resposta = await api.delete(url, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][deletar] Erro:", error);
    throw error;
  }
};

// LOGIN
export const login = async (url: string, dados: Object, config: Config = undefined) => {
  try {
    const resposta = await api.post(url, dados, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][login] Erro:", error);
    throw error;
  }
};

// Cadastro usuário
export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  config: Config = undefined
) => {
  try {
    const resposta = await api.post(url, dados, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][cadastrarUsuario] Erro:", error);
    throw error;
  }
};

// Cálculo salário
export const calcularSalario = async (
  url: string,
  dadosSalario: any,
  config: Config = undefined
) => {
  try {
    const resposta = await api.post(url, dadosSalario, config);
    return resposta.data;
  } catch (error) {
    console.error("[Service][calcularSalario] Erro:", error);
    throw error;
  }
};




