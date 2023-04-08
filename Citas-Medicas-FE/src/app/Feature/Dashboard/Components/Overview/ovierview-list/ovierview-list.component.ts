import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ovierview-list',
  templateUrl: './ovierview-list.component.html',
  styleUrls: ['./ovierview-list.component.scss'],
})
export class OvierviewListComponent implements OnInit {
  public cards: Cards[] = [
    {
      title: 'Administradores',
      image: '../../../../../../assets/img/admin.svg',
      records: 5,
    },

    {
      title: 'Medicos',
      image: '../../../../../../assets/img/medicos.svg',
      records: 10,
    },

    {
      title: 'Pacientes',
      image: '../../../../../../assets/img/pacientes.svg',
      records: 100,
    },

    {
      title: 'Administradores en espera',
      image: '../../../../../../assets/img/admins-espera.svg',
      records: 100,
    },

    {
      title: 'Medicos en espera',
      image: '../../../../../../assets/img/medicos-espera.svg',
      records: 100,
    },

    {
      title: 'Pacientes en espera',
      image: '../../../../../../assets/img/pacientes-espera.svg',
      records: 100,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

export interface Cards {
  title: string;
  image: string;
  records: number;
}
