import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public getStandbyAdminPaged(
    pagesNo: number,
    pageSize: number
  ): Observable<any> {
    return this.http
      .get(
        this.myAppUrl +
          'administradores-en-espera-pageados/' +
          pagesNo +
          '/' +
          pageSize
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError('Error al obtener los administradores en espera');
        })
      );
  }

  public getAdminsPaged(pageNo: number, pageSize: number): Observable<any> {
    return this.http
      .get(
        this.myAppUrl + 'administradores-pageados/' + pageNo + '/' + pageSize
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError('Error al obtener los administradores');
        })
      );
  }

  public deleteAdmin(id: number): Observable<any> {
    return this.http.put(this.myAppUrl + 'eliminar-administrador/' + id, null);
  }

  public getAdminById(id: number): Observable<any> {
    return this.http.get(
      this.myAppUrl + 'encontrar-administrador-por-id/' + id
    );
  }

  public updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put(
      this.myAppUrl + 'modificar-datos-administrador/' + id,
      admin
    );
  }

  public totalStandByAdmins(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-admins-espera/');
  }

  public totalNotInStandByAdmins(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-admins-no-espera/');
  }

  public totalStandByCitas(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-citas-espera/');
  }

  public totalNotInStandByCitas(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-citas-no-espera/');
  }

  public totalStandByMedicos(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-medicos-espera/');
  }

  public totalMedicosNotInStandBy(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-medicos-no-espera/');
  }

  public totalPacientes(): Observable<any> {
    return this.http.get(this.myAppUrl + 'total-pacientes/');
  }
}
