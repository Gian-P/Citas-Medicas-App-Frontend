import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public standbyAdminPaged(pagesNo: number, pageSize: number): Observable<any> {
    return this.http.get(
      this.myAppUrl +
        'administradores-en-espera-pageados/' +
        pagesNo +
        '/' +
        pageSize
    );
  }

  public standbyAdminsPaged(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get(
      this.myAppUrl + 'administradores-pageados/' + pageNo + '/' + pageSize
    );
  }

  public deleteAdmin(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + 'eliminar-administrador/' + id);
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
}
