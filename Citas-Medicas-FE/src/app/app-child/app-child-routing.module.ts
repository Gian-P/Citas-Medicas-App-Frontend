import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/Welcome/welcome.module').then((m) => m.WelcomeModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppChildRoutingModule { }
