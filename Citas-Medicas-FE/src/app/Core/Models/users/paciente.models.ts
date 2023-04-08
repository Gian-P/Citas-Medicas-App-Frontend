
export interface Paciente {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  idPaciente: number;
  numero: string;
  estatus: string;
  email: string;
  tipoTelefono: string;
}

export interface BaseResponsePaciente {
  pacientesProjection: Paciente[];
  total: number;
}

