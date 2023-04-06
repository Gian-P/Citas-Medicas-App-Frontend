import { Base } from '../base.models';

export interface Citas extends Base {
  apellido: string;
  cedula: string;
  direccion: string;
  email: string;
  estatus: string;
  fechaDesde: Date;
  fechaHasta: Date;
  fechaPeticion: Date;
  idMedico: number;
  idPaciente: number;
  tipoCita: string;
  idCita: number;
  googleMeetLink: string;
  nombre: string;
}

export interface BaseResponseCitas {
  citasPorPacienteProjection: Citas[];
  citasPorMedicoProjections: Citas[];
  total: number;
}
