import api from "../utils/api";

const baseURLAuth = `/autentificador`
const baseUrlLogin = `${baseURLAuth}/auth/login`

export function getAuthCodeFromURL(): string | null {
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem("code", params.get("code") || "");
    return params.get("code");
  }

export const login = async () => {
  const response = await api.post(`${baseUrlLogin}`, { code: localStorage.getItem("code") });
  return response.data;
};
