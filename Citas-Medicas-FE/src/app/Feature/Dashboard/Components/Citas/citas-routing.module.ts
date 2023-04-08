import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasListComponent } from './citas-list/citas-list.component';

const routes: Routes = [
  {
    path: 'citas',
    children: [
      {
        path: 'list',
        component: CitasListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
