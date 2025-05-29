import { Pais, Departamento, Ciudad, TipoDocumento, Estado } from "../models/entidates_primarias_model.interface";
import api from "../utils/api";


const baseURLEntidadesPrimarias = `/entidades`
const baseURLPaises = `${baseURLEntidadesPrimarias}/paises`
const baseURLDepartamentos = `${baseURLEntidadesPrimarias}/departamentos`
const baseURLTiposDocumento = `${baseURLEntidadesPrimarias}/tipos-identificacion`
const baseURLCiudades = `${baseURLEntidadesPrimarias}/ciudades`
const baseURLEstados = `${baseURLEntidadesPrimarias}/estados`

// Paises
export const getPaises = async () => {
  const response = await api.get(baseURLPaises);
  return response.data;
};

export const postCreatePais = async (pais: Pais) => {
  const response = await api.post(baseURLPaises, pais);
  return response.data;
};

export const putUpdatePais = async (id: string, pais: Pais) => {
  const response = await api.put(`${baseURLPaises}/${id}`, pais);
  return response.data;
};

export const deletePais = async (id: string) => {
  const response = await api.delete(`${baseURLPaises}/${id}`);
  return response.data;
};


// Departamentos
export const getDepartamentos = async () => {
  const response = await api.get(baseURLDepartamentos);
  return response.data;
};

export const postCreateDepartamento = async (departamento: Departamento) => {
  const response = await api.post(baseURLDepartamentos, departamento);
  return response.data;
};

export const putUpdateDepartamento = async (id: string, departamento: Departamento) => {
  const response = await api.put(`${baseURLDepartamentos}/${id}`, departamento);
  return response.data;
};

export const deleteDepartamento = async (id: string) => {
  const response = await api.delete(`${baseURLDepartamentos}/${id}`);
  return response.data;
};

// ciudades
export const getCiudades = async () => {
  const response = await api.get(baseURLCiudades);
  return response.data;
};

export const postCreateCiudad = async (ciudad: Ciudad) => {
  const response = await api.post(baseURLCiudades, ciudad);
  return response.data;
};

export const putUpdateCiudad = async (id: string, ciudad: Ciudad) => {
  const response = await api.put(`${baseURLCiudades}/${id}`, ciudad);
  return response.data;
};

export const deleteCiudad = async (id: string) => {
  const response = await api.delete(`${baseURLCiudades}/${id}`);
  return response.data;
};

// Tipos de documento
export const getTiposDocumento = async () => {
  const response = await api.get(baseURLTiposDocumento);
  return response.data;
};

export const postCreateTipoDocumento = async (tipoDocumento: TipoDocumento) => {
  const response = await api.post(baseURLTiposDocumento, tipoDocumento);
  return response.data;
};

export const putUpdateTipoDocumento = async (id: string, tipoDocumento: TipoDocumento) => {
  const response = await api.put(`${baseURLTiposDocumento}/${id}`, tipoDocumento);
  return response.data;
};

export const deleteTipoDocumento = async (id: string) => {
  const response = await api.delete(`${baseURLTiposDocumento}/${id}`);
  return response.data;
};

//Estados
export const getEstados = async () => {
  const response = await api.get(baseURLEstados);
  return response.data;
};

export const postCreateEstado = async (estado: Estado) => {
  const response = await api.post(baseURLEstados, estado);
  return response.data;
};

export const putUpdateEstado = async (id: string, estado: Estado) => {
  const response = await api.put(`${baseURLEstados}/${id}`, estado);
  return response.data;
};

export const deleteEstado = async (id: string) => {
  const response = await api.delete(`${baseURLEstados}/${id}`);
  return response.data;
};











