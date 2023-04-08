import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rol } from '../../Models/rol/rol.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class RolService extends BaseService<rol> {

  constructor(http: HttpClient) {
    super(http, 'crear-nuevo-rol');
  }
  
}
