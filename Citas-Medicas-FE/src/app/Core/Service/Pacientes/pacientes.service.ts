import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../Models/users/users.models';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public deletePaciente(id: number): Observable<any> {
    return this.http.put(this.myAppUrl + 'eliminar-paciente/' + id, null);
  }

  public getPacienteById(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + 'encontrar-paciente-por-id/' + id);
  }

  public getPacientesPaged(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get(
      this.myAppUrl + 'pacientes-pageados/' + pageNo + '/' + pageSize
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError("Error al obtener los pacientes");
      })
    );
  }

  public updatePaciente(id: number, paciente: User): Observable<any> {
    return this.http.put(
      this.myAppUrl + 'modificar-datos-paciente/' + id,
      paciente
    );
  }
}
