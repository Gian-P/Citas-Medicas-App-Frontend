import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';

const routes: Routes = [
  {
    path: 'pacientes',
    children: [
      {
        path: 'list',
        component: PacientesListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
