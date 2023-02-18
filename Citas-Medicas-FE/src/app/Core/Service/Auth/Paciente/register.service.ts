import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from 'src/app/Core/Models/auth-paciente/login.models';
import { Register } from 'src/app/Core/Models/auth-paciente/register.models';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<Register> {

  constructor(http: HttpClient) {
    super(http, 'registrar-paciente');
  }
}
