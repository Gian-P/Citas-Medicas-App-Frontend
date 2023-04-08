import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosListComponent } from './medicos-list/medicos-list.component';

const routes: Routes = [
  {
    path: 'medicos',
    children: [
      {
        path: 'list',
        component: MedicosListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
