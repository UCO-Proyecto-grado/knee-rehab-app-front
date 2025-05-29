interface CentroRehabilitacion {
  id_tipo_identificacion: string;
  identificacion: string;
  nombre: string;
  correo: string;
}
 
interface TipoSede {
  id: string;
  nombre: string;
}

interface Sede {
  codigo_sede: string;
  direccion: string;
  telefono: string;
  telefono_validado: boolean;
  correo: string;
  email_validado: boolean;
  id_tipo_sede: string;
  id_ciudad: string;
  id_centro_rehabilitacion: string;
  id_estado: string;
}

export type { CentroRehabilitacion, TipoSede, Sede };