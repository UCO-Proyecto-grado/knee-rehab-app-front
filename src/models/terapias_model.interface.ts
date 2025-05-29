interface EstadoPlanEjercicio {
  id_codigo: string;
  id_plan_rehabilitacion: string;
  id_ejercicio: string;
  estado: string;
}

interface PacienteLesion {
  id_paciente: string;
  id_categoria_tipo_lesion: string;
}

interface PlanRehabilitacion {
    codigo_plan_rehabilitacion: string;
    nombre: string;
    fecha_creacion: string;
    finalizado: boolean;
    porcentaje_finalizacion: number;
    observaciones: string;
    id_fisioterapeuta_sede: string;
    id_estado: string;
    id_paciente_categoria_tipo_lesion: string;
}

export type { EstadoPlanEjercicio, PacienteLesion, PlanRehabilitacion };