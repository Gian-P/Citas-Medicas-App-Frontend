import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/Core/Models/auth/register.models';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorRegisterService extends BaseService<Register> {

  constructor(http: HttpClient) {
    super(http, 'registrar-administrador');
  }
}
