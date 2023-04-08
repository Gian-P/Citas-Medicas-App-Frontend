import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideBarOpen = true;
  private rol: string;

  constructor(private router: Router) {
    this.rol = localStorage.getItem('rol') as string;

    if (this.rol === 'Administrador') {
      this.router.navigate(['dashboard/overview/list']);
    }

    if (this.rol === 'Medico' || this.rol === 'Cliente') {
      this.router.navigate(['dashboard/calendario']);
    }
  }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
