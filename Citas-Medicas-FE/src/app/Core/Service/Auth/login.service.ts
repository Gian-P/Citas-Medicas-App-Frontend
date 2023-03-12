import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { login } from '../../Models/auth/login.models';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public post(login: login): Observable<any> {
    return this.http.post(this.myAppUrl + 'login', login);
  }
}
