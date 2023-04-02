import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-ovierview-list',
  templateUrl: './ovierview-list.component.html',
  styleUrls: ['./ovierview-list.component.scss']
})
export class OvierviewListComponent implements OnInit {
  public cards: Cards[] = [{
    title: 'Administradores',
    image: 'admin.png',
    records: 5
  },
  {
    title: 'Medicos',
    image: 'doctor.png',
    records: 10
  },
  {
    title: 'Pacientes',
    image: 'sale.png',
    records: 100
  }];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Cards {
  title: string;
  image: string;
  records: number;
}
