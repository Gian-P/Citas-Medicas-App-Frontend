import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { especialidad } from '../../Models/especialidades/especialidades.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public createAdmin(admin: any): Observable<any> {
    return this.http.post(this.myAppUrl + 'registrar-administrador', admin);
  }

  public createDoctor(doctor: any): Observable<any> {
    return this.http.post(this.myAppUrl + 'registrar-medico', doctor);
  }

  public updateEstatusDoctor(estatus: any): Observable<any> {
    return this.http.put(this.myAppUrl + 'cambiar-estatus/', estatus);
  }
}
