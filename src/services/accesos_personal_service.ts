import { Fisioterapeuta, Paciente } from "../models/accesos_personal_model.interface";
import api from "../utils/api";

const baseURLAccesosPersonales = `/acceso-personal`;
const baseUrlPacientes = `${baseURLAccesosPersonales}/pacientes`;
const baseUrlFisioterapeutas = `${baseURLAccesosPersonales}/fisioterapeutas`;

export const getPacientes = async () => {
  const response = await api.get(baseUrlPacientes);
  return response.data;
};

export const postCreatePaciente = async (paciente: Paciente) => {
  const response = await api.post(baseUrlPacientes, paciente);
  return response.data;
};

export const updatePaciente = async (id: string, paciente: Paciente) => {
  const response = await api.put(`${baseUrlPacientes}/${id}`, paciente);
  return response.data;
};

export const deletePaciente = async (id: string) => {
  const response = await api.delete(`${baseUrlPacientes}/${id}`);
  return response.data;
};

export const getFisioterapeutas = async () => {
  const response = await api.get(baseUrlFisioterapeutas);
  return response.data;
};

export const postCreateFisioterapeuta = async (fisioterapeuta: Fisioterapeuta) => {
  const response = await api.post(baseUrlFisioterapeutas, fisioterapeuta);
  return response.data;
};

export const updateFisioterapeuta = async (id: string, fisioterapeuta: Fisioterapeuta) => {
  const response = await api.put(`${baseUrlFisioterapeutas}/${id}`, fisioterapeuta);
  return response.data;
};

export const deleteFisioterapeuta = async (id: string) => {
  const response = await api.delete(`${baseUrlFisioterapeutas}/${id}`);
  return response.data;
};
