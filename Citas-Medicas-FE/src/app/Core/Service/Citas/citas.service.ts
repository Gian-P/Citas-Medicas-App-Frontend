import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  constructor(private http: HttpClient) {}

  public createCita(cita: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'crear-cita', cita);
  }

  public cambiarEstatusCita(id: number, estatus: any): Observable<any> {
    return this.http.put(environment.baseUrl + 'cambiar-estatus/' + id, estatus);
  }

  public getStandByCitasDoctor(id: number, pageNo: number, pageSize:number): Observable<any> {
    return this.http.get(environment.baseUrl + 'citas-medicos-en-espera/' + id + '/' + pageNo + '/' + pageSize);
  }

  public getStandByCitasPaciente(id: number, pageNo: number, pageSize:number): Observable<any> {
    return this.http.get(environment.baseUrl + 'citas-pacientes-en-espera/' + id + '/' + pageNo + '/' + pageSize);
  }

  public getCitasByDoctor(id: number, pageNo: number, pageSize:number): Observable<any> {
    return this.http.get(environment.baseUrl + 'citas-por-medico/' + id + '/' + pageNo + '/' + pageSize);
  }

  public getCitasByPaciente(id: number, pageNo: number, pageSize:number): Observable<any> {
    return this.http.get(environment.baseUrl + 'citas-por-paciente/' + id + '/' + pageNo + '/' + pageSize);
  }

  public deleteCitas(id: number): Observable<any> {
    return this.http.delete(environment.baseUrl + 'eliminar-cita/' + id);
  }

  public updateCita(cita: any): Observable<any> {
    return this.http.put(environment.baseUrl + 'actualizar-cita/' + cita.id , cita);
  }

  public addGoogleMeetLink(idCita: number, meet: any): Observable<any> {
    return this.http.put(environment.baseUrl + 'agregar-google-meet/' + idCita, meet);
  }
}
