import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  public opensweetalertdelete(value: string){
    return new Observable((observer) => {
      swal.fire({
        title: '¿Está seguro?',
        text: `${value}`,
        titleText: '¡No podrá revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result : any) => {
        if (result.isConfirmed) {
          observer.next(true);
        }else{
          observer.next(false);
        }
      });
    });
  }

  public opensweetalertwarning(value: string){
    return new Observable((observer) => {
      swal.fire({
        title: '¿Está seguro?',
        text: `${value}`,
        titleText: '¡Estás apunto de realizar una acción importante!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar!',
        cancelButtonText: 'Cancelar'
      }).then((result : any) => {
        if (result.isConfirmed) {
          observer.next(true);
        }else{
          observer.next(false);
        }
      });
    });
  }

  opensweetalertsuccess(value: string): void{
    swal.fire(
      '¡Éxito!',
      value,
      'success'
    )
  }

  opensweetalerterror(value: string): void{
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: value
    })
  }

  opensweetalertinfo(value: string): void{
    swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: value
    })
  }
}
