import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../Feature/Dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('../Feature/Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/Welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/NotAuthorized/not-authorized.module').then(
        (m) => m.NotAuthorizedModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../Feature/Pages/NotFound/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppChildRoutingModule { }
