import { Component, OnInit } from '@angular/core';
import { modules } from 'src/app/Core/Models/modules.models';

@Component({
  selector: 'app-ovierview-list',
  templateUrl: './ovierview-list.component.html',
  styleUrls: ['./ovierview-list.component.scss']
})
export class OvierviewListComponent implements OnInit {
  public cards: Cards[] = [{
    title: 'Usuarios creados',
    image: 'https://example.com/user.png',
    records: 5
  },
  {
    title: 'Productos vendidos',
    image: 'https://example.com/product.png',
    records: 10
  },
  {
    title: 'Ventas totales',
    image: 'https://example.com/sale.png',
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
