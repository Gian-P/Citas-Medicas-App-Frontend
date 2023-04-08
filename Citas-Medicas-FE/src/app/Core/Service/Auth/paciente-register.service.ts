import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'src/app/Core/Models/auth/register.models';
import { environment } from 'src/environments/environment.prod';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class PacienteRegisterService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl;
  }

  public postPaciente(register: Register): any {
    return this.http.post(this.myAppUrl + 'registrar-paciente', register);
  }

  public postMedico(register: Register): any {
    return this.http.post(this.myAppUrl + 'registrar-medico', register);
  }

  public postAdministrador(register: Register): any {
    return this.http.post(this.myAppUrl + 'registrar-administrador', register);
  }
}
