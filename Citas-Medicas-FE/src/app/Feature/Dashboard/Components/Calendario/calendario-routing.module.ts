import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';

const routes: Routes = [
  {
    path: 'calendario',
    component: CalendarioListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioRoutingModule {}
