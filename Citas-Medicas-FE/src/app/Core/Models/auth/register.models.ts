import { Base } from "../base.models"
import { login } from "./login.models"

export interface Register extends Base {
    apellido: string
    cedula: string
    direccion: string
    email: string
    nombre: string
    numeroTelefonoCasa: string
    password: string
    tipoTelefonoCasa: string
    numeroTelefonoCelular: string
    tipoTelefonoCelular: string
    idEspecialidad?: number
    estatus: string;
    rol: string;
    usuarioDTO: login
}
