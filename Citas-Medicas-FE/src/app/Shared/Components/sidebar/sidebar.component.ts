import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modules } from 'src/app/Core/Models/modules.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public rol: string = '';

  calendario: modules[] = [
    {
      name: 'Calendario',
      route: 'dashboard/calendario',
      icon: 'Calendario',
      rol: ['Cliente', 'Medico'],
    },
  ];

  overview: modules[] = [
    {
      name: 'Descripción general',
      route: 'dashboard/overview/list',
      icon: 'bubble_chart',
      rol: ['Administrador'],
    },
  ];

  generales: modules[] = [
    {
      name: 'Citas',
      route: 'dashboard/citas/list',
      icon: 'date_range',
      rol: ['Cliente', 'Medico'],
    },
    {
      name: 'Médicos',
      route: 'dashboard/medicos/list',
      icon: 'people',
      rol: ['Administrador'],
    },
    {
      name: 'Administradores',
      route: 'dashboard/administradores/list',
      icon: 'lock',
      rol: ['Administrador'],
    },
    {
      name: 'Pacientes',
      route: 'dashboard/pacientes/list',
      icon: 'people',
      rol: ['Administrador'],
    },
    {
      name: 'Especialidades',
      route: 'dashboard/especialidades/list',
      icon: 'bubble_chart',
      rol: ['Administrador'],
    },
  ];

  preferencias: modules[] = [{ name: 'Cuenta', route: 'dashboard/cuenta', icon: 'person' }];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string;
  }

  goto(path: string) {
    this.router.navigate([path]);
  }
}
