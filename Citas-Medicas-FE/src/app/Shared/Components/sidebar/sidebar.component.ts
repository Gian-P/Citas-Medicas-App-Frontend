import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modules } from 'src/app/Core/Models/modules.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  calendario: modules[] = [
    { name: 'Calendario', route: 'dashboard/calendario', icon: 'Calendario' },
  ];

  overview: modules[] = [
    { name: 'Descripción general', route: 'dashboard/overview/list', icon: 'bubble_chart'  },
  ];

  generales: modules[] = [
    {
      name: 'Citas',
      route: 'dashboard/citas/list',
      icon: 'date_range',
    },
    {
      name: 'Médicos',
      route: 'dashboard/medicos/list',
      icon: 'people',
    },
    {
      name: 'Administradores',
      route: 'dashboard/administradores/list',
      icon: 'lock',
    },
    {
      name: 'Pacientes',
      route: 'dashboard/pacientes/list',
      icon: 'people',
    },
    {
      name: 'Especialidades',
      route: 'dashboard/especialidades/list',
      icon: 'bubble_chart',
    },
  ];

  preferencias: modules[] = [{ name: 'Cuenta', route: '#', icon: 'person' }];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goto(path: string) {
    this.router.navigate([path]);
  }
}
