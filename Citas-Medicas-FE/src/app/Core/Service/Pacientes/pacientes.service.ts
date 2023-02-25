import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { especialidad } from '../../Models/especialidades/especialidades.models';
import { Pacientes } from '../../Models/pacientes/pacientes.models';

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
    );
  }

  public updatePaciente(id: number, paciente: Pacientes): Observable<any> {
    return this.http.put(
      this.myAppUrl + 'modificar-datos-paciente/' + id,
      paciente
    );
  }
}
