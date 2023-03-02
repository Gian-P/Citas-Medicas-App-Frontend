import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradoresListComponent } from './administradores-list/administradores-list.component';

const routes: Routes = [
  {
    path: 'administradores',
    children: [
      {
        path: 'list',
        component: AdministradoresListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradoresRoutingModule { }
