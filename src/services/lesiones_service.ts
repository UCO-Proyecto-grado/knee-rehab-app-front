import { Categoria, TipoLesion } from "../models/lesiones_model.interface";
import api from "../utils/api";

const baseUrlLesiones = `/lesiones`;
const baseUrlCategorias = `${baseUrlLesiones}/categorias`;
const baseUrlTiposLesiones = `${baseUrlLesiones}/tipos`;

export const getCategorias = async () => {
  const response = await api.get(baseUrlCategorias);
  return response.data;
};

export const postCreateCategoria = async (categoria: Categoria) => {
  const response = await api.post(baseUrlCategorias, categoria);
  return response.data;
};

export const updateCategoria = async (id: string, categoria: Categoria) => {
  const response = await api.put(`${baseUrlCategorias}/${id}`, categoria);
  return response.data;
};

export const deleteCategoria = async (id: string) => {
  const response = await api.delete(`${baseUrlCategorias}/${id}`);
  return response.data;
};

export const getTiposLesiones = async () => {
  const response = await api.get(baseUrlTiposLesiones);
  return response.data;
};

export const postCreateTipoLesion = async (tipoLesion: TipoLesion) => {
  const response = await api.post(baseUrlTiposLesiones, tipoLesion);
  return response.data;
};

export const updateTipoLesion = async (id: string, tipoLesion: TipoLesion) => {
  const response = await api.put(`${baseUrlTiposLesiones}/${id}`, tipoLesion);
  return response.data;
};

export const deleteTipoLesion = async (id: string) => {
  const response = await api.delete(`${baseUrlTiposLesiones}/${id}`);
  return response.data;
};
