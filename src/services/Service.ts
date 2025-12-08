import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ==================== AUTH ====================

export const cadastrarUsuario = async <T>(
  url: string,
  dados: object,
  setDados?: (data: T) => void
): Promise<T> => {
  const resposta = await api.post<T>(url, dados);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const login = async <T>(
  url: string,
  dados: object,
  setDados?: (data: T) => void
): Promise<T> => {
  const resposta = await api.post<T>(url, dados);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

// ==================== CRUD ====================

export const listar = async <T>(
  url: string,
  setDados?: (data: T) => void,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const resposta = await api.get<T>(url, config);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const cadastrar = async <T>(
  url: string,
  dados: object,
  setDados?: (data: T) => void,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const resposta = await api.post<T>(url, dados, config);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const atualizar = async <T>(
  url: string,
  dados: object,
  setDados?: (data: T) => void,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const resposta = await api.put<T>(url, dados, config);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const deletar = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<void> => {
  if (config.headers && config.headers.Authorization) {
    const token = config.headers.Authorization;
    if (!token.startsWith("Bearer ")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  await api.delete(url, config);
};

// ==================== SALÁRIO ====================

// export const calcularSalario = async <T>(
//   url: string,
//   dadosSalario: any,
//   config: AxiosRequestConfig = {}
// ): Promise<T> => {
//   const resposta = await api.post<T>(url, dadosSalario, config);
//   return resposta.data;
// };