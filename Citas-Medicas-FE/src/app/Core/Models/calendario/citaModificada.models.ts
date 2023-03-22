import { Base } from '../base.models';

export interface CitaModificada extends Base {
  fechaDesde: Date;
  fechaHasta: Date;
  tipoCita: string;
}
