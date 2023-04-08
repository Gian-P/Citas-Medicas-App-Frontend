import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getIdByTokenDecoded(): any {
    const helper = new JwtHelperService() as any;

    const decodedToken = helper.decodeToken(localStorage.getItem('token')?.toString());

    return decodedToken.sub;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public deleteToken(): void {
    localStorage.removeItem('token');
  }

  public deleteAllLoacalStorage(): void {
    localStorage.clear();
  }
}
