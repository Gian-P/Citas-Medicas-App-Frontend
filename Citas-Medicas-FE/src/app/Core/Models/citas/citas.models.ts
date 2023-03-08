import { Base } from "../base.models";

export interface Citas extends Base{
  apellido : string,
    cedula: string,
    direccion: string,
    email: string,
    estatus: string,
    fechaDesde: Date,
    fechaHasta: Date,
    fechaPeticion: Date,
    idCita: number,
    nombre: string
}
