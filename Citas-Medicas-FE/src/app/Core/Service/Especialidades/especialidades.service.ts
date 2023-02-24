import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { especialidad } from '../../Models/especialidades/especialidades.models';

@Injectable({
  providedIn: 'root'
})

export class EspecialidadService
{
  myAppUrl:string;

  constructor(private http: HttpClient)
  {
    this.myAppUrl = environment.baseUrl;
  }

  public createEspecialidad(especialidad: especialidad):Observable<any>
  {
    return this.http.post(this.myAppUrl + "crear-especialidad", especialidad)
  }

  public getListEspecialidades() : Observable<any>
  {
    return this.http.get(this.myAppUrl + "lista-especialidades");
  }

  public deleteEspecialidad(id: number) :  Observable<any>
  {
    return this.http.delete(this.myAppUrl + "eliminar-especialidad" + id)
  }

  public updateEspecialidad(especialidad : especialidad):Observable<any>
  {
    return this.http.put(this.myAppUrl + "actualizar-especialidad/" + especialidad.idEspecialidades, especialidad)
  }
}
