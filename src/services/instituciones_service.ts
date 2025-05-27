import api from "../utils/api";
import { CentroRehabilitacion, TipoSede, Sede } from "../models/instituciones_model.interface";
const baseURLInstituciones = `/instituciones`;
const baseURLCentros = `${baseURLInstituciones}/centro-rehabilitacion`;
const baseURLTiposSede = `${baseURLInstituciones}/tipo-sede`;
const baseURLSedes = `${baseURLInstituciones}/sede`;
const baseURLFisioterapeutaSede = `${baseURLInstituciones}/fisioterapeuta-sede`;

// Centro de Rehabilitación
export const getInstituciones = async () => {
  const response = await api.get(baseURLCentros);
  return response.data;
};

export const getInstitucionesById = async (id: string) => {
  const response = await api.get(`${baseURLCentros}/${id}`);
  return response.data;
};

export const postCreateCentro = async (centro: CentroRehabilitacion) => {
  const response = await api.post(baseURLCentros, centro);
  return response.data;
};

export const updateCentro = async (id: string, centro: CentroRehabilitacion) => {
  const response = await api.put(`${baseURLCentros}/${id}`, centro);
  return response.data;
};

export const deleteCentro = async (id: string) => {
  const response = await api.delete(`${baseURLCentros}/${id}`);
  return response.data;
};

// Tipos de Sede
export const getTiposSede = async () => {
  const response = await api.get(baseURLTiposSede);
  return response.data;
};

export const postCreateTipoSede = async (tipoSede: TipoSede) => {
  const response = await api.post(baseURLTiposSede, tipoSede);
  return response.data;
};

export const updateTipoSede = async (id: string, tipoSede: TipoSede) => {
  const response = await api.put(`${baseURLTiposSede}/${id}`, tipoSede);
  return response.data;
};

export const deleteTipoSede = async (id: string) => {
  const response = await api.delete(`${baseURLTiposSede}/${id}`);
  return response.data;
};

// Sedes
export const getSedes = async () => {
  const response = await api.get(baseURLSedes);
  return response.data;
};

export const postCreateSede = async (sede: Sede) => {
  const response = await api.post(baseURLSedes, sede);
  return response.data;
};

export const updateSede = async (id: string, sede: Sede) => {
  const response = await api.put(`${baseURLSedes}/${id}`, sede);
  return response.data;
};

export const deleteSede = async (id: string) => {
  const response = await api.delete(`${baseURLSedes}/${id}`);
  return response.data;
};

export const postFisioterapeutaSede = async (id_fisioterapeuta: string, id_sede: string) => {
  const response = await api.post(`${baseURLFisioterapeutaSede}/${id_fisioterapeuta}/${id_sede}`);
  return response.data;
};





