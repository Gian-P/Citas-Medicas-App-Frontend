import { Base } from '../base.models';

export interface ModificarCitas {
  fechaDesde: Date;
  fechaHasta: Date;
  tipoCita: string;
  IdCita: number;
}
