import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadesListComponent } from './Especialidades-list/especialidades-list.component';

const routes: Routes = [
  {
    path: 'especialidades',
    children: [
      {
        path: 'list',
        component: EspecialidadesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialidadesRoutingModule { }
