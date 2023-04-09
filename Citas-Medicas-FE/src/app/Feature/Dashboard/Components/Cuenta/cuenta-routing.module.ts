import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaFormComponent } from './cuenta-form/cuenta-form.component';

const routes: Routes = [
  {
    path: 'cuenta',
    component: CuentaFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
