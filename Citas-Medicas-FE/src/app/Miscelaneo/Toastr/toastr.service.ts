import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.showSuccess(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.showError(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.showWarning(message, title);
  }

  showInfo(message: string, title: string) {
    this.toastr.showInfo(message, title);
  }
}
