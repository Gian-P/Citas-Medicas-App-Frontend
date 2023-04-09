import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public deleteDoctor(id: number): Observable<any> {
    return this.http.put(this.myAppUrl + 'eliminar-medico/' + id, null);
  }

  public getDoctorById(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + 'encontrar-medico-por-id/' + id);
  }

  public getStandbyDoctorsPaged(
    pageNo: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      this.myAppUrl + 'medicos-en-espera-pageados/' + pageNo + '/' + pageSize
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError("Error al obtener los médicos en espera");
      })
    );;
  }

  public getDoctorsPaged(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get(
      this.myAppUrl + 'medicos-pageados/' + pageNo + '/' + pageSize
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError("Error al obtener los médicos");
      })
    );;
  }

  public updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(
      this.myAppUrl + 'modificar-datos-medico/' + id,
      doctor
    );
  }
}
