
export interface Medico {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  idMedico: number;
  numero: string;
  nombreEspecialidad: string;
  estatus: string;
  email: string;
  tipoTelefono: string;
}

export interface BaseResponseMedico {
  medicosEnEsperaProjections: Medico[];
  total: number;
}
