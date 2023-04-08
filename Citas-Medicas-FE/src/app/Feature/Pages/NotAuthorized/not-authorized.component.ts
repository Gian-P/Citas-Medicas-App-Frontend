import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss'],
})
export class NotAuthorizedComponent implements OnInit {
  private token: string;
  private rol: string = '';

  constructor(private router: Router) {
    this.token = localStorage.getItem('token') as string;
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
  }

  public gotoHome() {
    if(this.token === null || this.token === undefined || this.token === '') {
      this.router.navigate(['auth/login']);
    }else{
      if(this.rol === 'Paciente' || this.rol === 'Medico') {
        this.router.navigate(['dashboard/calendario']);
      }else if(this.rol === 'Administrador') {
        this.router.navigate(['dashboard/overview/list']);
      }
    }
  }
}
