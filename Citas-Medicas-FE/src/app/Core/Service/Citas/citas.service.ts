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
}
