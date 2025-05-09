interface Pais {
  id: string;
  nombre: string;
}

interface Departamento {
  id: string;
  nombre: string;
  paisId: string;
}

interface Ciudad {
  id: string;
  nombre: string;
  departamentoId: string;
}

interface TipoDocumento {
  id: string;
  nombre: string;
  codigo: string;
}

interface Estado {
  id: string;
  nombre: string;
}

export type { Pais, Departamento, Ciudad, TipoDocumento, Estado };
