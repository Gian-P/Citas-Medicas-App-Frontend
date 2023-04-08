import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { BaseService } from '../../base.service';
@Injectable({
  providedIn: 'root'
})
export class EstatusService extends BaseService<Estatus> {

  constructor(http: HttpClient) {
    super(http, 'cambiar-estatus');
  }
}
