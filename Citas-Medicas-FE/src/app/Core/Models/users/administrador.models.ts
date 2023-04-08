export interface Administrador {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  idAdministrador: number;
  numero: string;
  estatus: string;
  email: string;
  tipoTelefono: string;
}

export interface BaseResponseAdministrador {
  administradoresProjection: Administrador[];
  administradoresEnEsperaProjection: Administrador[];
  total: number;
}
