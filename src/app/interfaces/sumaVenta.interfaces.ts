export interface SumaVentasBrutasI {
  id: number; // o el tipo correcto para tu ID
  suma: string;
  anio: number;
}

export interface sumaVVB {
  userId?: String, // o el tipo correcto para tu ID
  id?: number, // o el tipo correcto para tu ID
  _id?: String,
  RTN: String, 
  nombreEmpresa: String , 
  sumaAMDC: String, 
  sumaSar: String, 
  diferencia: String,
  anio: String, 
  usuario: String
  createdAt?: String
}

export interface datosAMdc {
  userId?: String, // o el tipo correcto para tu ID
  id?: number, // o el tipo correcto para tu ID
  _id?: String,
  RTN: String, 
  nombreEmpresa: String , 
  sumaAMDC: String, 
  sumaSar: String, 
  diferencia: String,
  anio: String, 
  status: number,
  fecha: String,
  usuario: String
  createdAt?: String
}


export interface datosAmdc {
  id: number;
  DNI_RTN: String
  ICS: String,
  CONTRIBUYENTE: String,
  NOMBRE_COMERCIAL: String,
  ACTIVIDAD_ECONOMICA: String,
  ANIO: String,
  FECHA_DE_DECLARACION: String,
  CANTIDAD_DECLARADA: string,
}