import { Base } from '../base.models';

export interface especialidad extends Base {
  idEspecialidad: number;
  tipo: string;
}

export interface BaseResponseEspecialidades {
  especialidadesProjection: especialidad[];
  total: number;
}
