export interface Departamento {
  departamentoId: number;
  descripcion: string;
}

export interface Actividad {
  actividadId: string;
  descripcion: string;
}

export interface ObligadoTributario {
  rtn: string;
  nombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  nombreComercial: string;
  barrio: string;
  calleAvenida: string;
  bloque: string;
  sector: string;
  numeroCasa: string;
  departamento: Departamento;
  actividadPrimaria: Actividad;
  actividadSecundaria: Actividad;
  fechaInicioActividad: string;
}

export interface Data {
  obligadoTributario: ObligadoTributario;
}

export interface ResponseData {
  data: Data;
  isSuccess: boolean;
  message: null | string;
}

export interface RTN {
  rtn: string;
}