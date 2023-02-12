import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { login } from '../../Models/Login/login.models';
@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<login> {

  constructor(http: HttpClient) {
    super(http, 'login');
  }
}
