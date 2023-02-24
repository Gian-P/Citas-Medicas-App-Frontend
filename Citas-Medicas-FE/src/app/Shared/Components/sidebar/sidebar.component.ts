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
    { name: 'Dashboard', route: '#', icon: 'dashboard' },
    { name: 'Calendario', route: '#', icon: 'calendar_today' },
    { name: 'Especialidades', route: '#', icon: 'list_alt' },
    {
      name: 'Pacientes',
      route: '#',
      icon: 'person_add',
    },
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
