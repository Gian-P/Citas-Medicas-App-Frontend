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
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/NotAuthorized/not-authorized.module').then((m) => m.NotAuthorizedModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/NotFound/not-found.module').then((m) => m.NotFoundModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppChildRoutingModule { }
