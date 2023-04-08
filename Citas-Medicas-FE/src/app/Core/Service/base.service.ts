import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Base } from '../Models/base.models';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Base> {

  constructor(
    private http: HttpClient,
    @Inject('controller') public controller: string
  ) {}

  gets() {
    return this.http.get<T[]>(`${environment.baseUrl}${this.controller}`);
  }

  get(id: any) {
    return this.http.get<T>(`${environment.baseUrl}${this.controller}/${id}`);
  }

  post(entity: T) {
    return this.http.post(`${environment.baseUrl}${this.controller}/`, entity);
  }

  put(entity: T, id ?: any) {
    if(id == null){
      return this.http.put(
        `${environment.baseUrl}${this.controller}`,
        entity
      );
    }
    return this.http.put(
      `${environment.baseUrl}${this.controller}/${id}`,
      entity
    );
  }

  delete(id: any) {
    return this.http.delete(`${environment.baseUrl}${this.controller}/${id}`);
  }
}
