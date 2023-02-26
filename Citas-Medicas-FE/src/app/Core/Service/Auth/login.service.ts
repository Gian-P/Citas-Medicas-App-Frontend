import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../Models/auth/login.models';
import { BaseService } from '../base.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<login> {

  constructor(http: HttpClient) {
    super(http, 'login');
  } 
  
}
