import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { especialidad } from '../../Models/especialidades/especialidades.models';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public createPago(pago: any): Observable<any> {
    return this.http.post(this.myAppUrl + 'crear-pago', pago);
  }
}
