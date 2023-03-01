import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modules } from 'src/app/Core/Models/modules.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  generales: modules[] = [
    {
      name: 'Citas',
      route: '#',
      icon: 'calendar_today',
    },
    {
      name: 'Medicos',
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
      icon: 'category',
    }
  ];

  preferencias: modules[] = [
    { name: 'Account', route: '#', icon: 'person' },
    { name: 'Settings', route: '#', icon: 'settings' },
    { name: 'Dark Mode', route: '#', icon: 'toll' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goto(path: string) {
    this.router.navigate([path]);
  }
}
