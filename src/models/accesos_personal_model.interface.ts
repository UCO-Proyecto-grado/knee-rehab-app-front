interface Paciente {
  id_tipo_identificacion: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  id_estado: string;
  telefono: string;
  telefono_validado: boolean;
  email: string;
  email_validado: boolean;
  contrasena: string;
  id_ciudad: string;
  direccion: string;
}

interface Fisioterapeuta {
  id_tipo_identificacion: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  genero: string;
  telefono: string;
  telefono_validado: boolean;
  email: string;
  email_validado: boolean;
  contrasena: string;
  id_estado: string;
}


export type { Paciente, Fisioterapeuta };