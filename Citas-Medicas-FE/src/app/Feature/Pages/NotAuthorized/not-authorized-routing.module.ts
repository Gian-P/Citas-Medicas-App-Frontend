import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedComponent } from './not-authorized.component';

const routes: Routes = [
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },
  {
    path: '**',
    redirectTo: 'not-authorized',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthorizedRoutingModule { }
