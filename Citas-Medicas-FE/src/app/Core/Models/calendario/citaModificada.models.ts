import { Base } from '../base.models';

export interface CitaModificada extends Base {
  fechaDesde: string;
  fechaHasta: string;
  tipoCita: string;
}
