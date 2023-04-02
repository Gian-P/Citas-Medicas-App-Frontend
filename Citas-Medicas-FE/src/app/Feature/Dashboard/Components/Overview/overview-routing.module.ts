import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OvierviewListComponent } from '../Overview/ovierview-list/ovierview-list.component';

const routes: Routes = [
  {
    path: 'overview',
    children: [
      {
        path: 'list',
        component: OvierviewListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
