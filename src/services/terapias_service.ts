import api from "../utils/api";
import { EstadoPlanEjercicio, PacienteLesion, PlanRehabilitacion } from "../models/terapias_model.interface";

const baseURLTerapias = `/terapias`
const baseURLEstadoPlanEjercicio = `${baseURLTerapias}/estado-plan-ejercicio`
const baseURLPacienteLesion = `${baseURLTerapias}/paciente-lesion`
const baseURLPlanRehabilitacion = `${baseURLTerapias}/plan-rehabilitacion`

// EstadoPlanEjercicio
export const getEstadoPlanEjercicio = async () => {
  const response = await api.get(baseURLEstadoPlanEjercicio);
  return response.data;
};

export const getEstadoPlanEjercicioById = async (estado_id: string) => {
  const response = await api.get(`${baseURLEstadoPlanEjercicio}/${estado_id}`);
  return response.data;
};

export const postEstadoPlanEjercicio = async (estadoPlanEjercicio: EstadoPlanEjercicio) => {
  const response = await api.post(baseURLEstadoPlanEjercicio, estadoPlanEjercicio);
  return response.data;
};  

export const putEstadoPlanEjercicio = async (id: string, estadoPlanEjercicio: EstadoPlanEjercicio) => {
  const response = await api.put(`${baseURLEstadoPlanEjercicio}/${id}`, estadoPlanEjercicio);
  return response.data;
};

export const deleteEstadoPlanEjercicio = async (id: string) => {
  const response = await api.delete(`${baseURLEstadoPlanEjercicio}/${id}`);
  return response.data;
};


// PacienteLesion
export const getPacienteLesion = async () => {
  const response = await api.get(baseURLPacienteLesion);
  return response.data;
};

export const putPacienteLesion = async (id: string, pacienteLesion: PacienteLesion) => {
  const response = await api.put(`${baseURLPacienteLesion}/${id}`, pacienteLesion);
  return response.data;
};

export const deletePacienteLesion = async (id: string) => {
  const response = await api.delete(`${baseURLPacienteLesion}/${id}`);
  return response.data;
};


// PlanEjercicio
export const getPlanRehabilitacion = async () => {
  const response = await api.get(baseURLPlanRehabilitacion);
  return response.data;
};

export const getPlanRehabilitacionById = async (plan_id: string) => {
  const response = await api.get(`${baseURLPlanRehabilitacion}/${plan_id}`);
  return response.data;
};

export const postPlanRehabilitacion = async (planRehabilitacion: PlanRehabilitacion) => {
  const response = await api.post(baseURLPlanRehabilitacion, planRehabilitacion);
  return response.data;
};

export const putPlanRehabilitacion = async (id: string, planRehabilitacion: PlanRehabilitacion) => {
  const response = await api.put(`${baseURLPlanRehabilitacion}/${id}`, planRehabilitacion);
  return response.data;
};

export const deletePlanRehabilitacion = async (id: string) => {
  const response = await api.delete(`${baseURLPlanRehabilitacion}/${id}`);
  return response.data;
};