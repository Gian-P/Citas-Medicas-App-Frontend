import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/Core/Helpers/admin-guard.guard';
import { UserGuard } from 'src/app/Core/Helpers/user-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Components/Calendario/calendario.module').then(
        (m) => m.CalendarioModule
      ),
      canActivate: [UserGuard],
  },

  {
    path: '',
    loadChildren: () =>
      import('./Components/Especialidades/especialidades.module').then(
        (m) => m.EspecialidadesModule
      ),
      canActivate: [AdminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Pacientes/pacientes.module').then(
        (m) => m.PacientesModule
      ),
      canActivate: [AdminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Medicos/medicos.module').then(
        (m) => m.MedicosModule
      ),
      canActivate: [AdminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Administradores/administradores.module').then(
        (m) => m.AdministradoresModule
      ),
      canActivate: [AdminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Citas/citas.module').then((m) => m.CitasModule),
      canActivate: [UserGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Overview/overview.module').then((m) => m.OverviewModule),
      canActivate: [AdminGuard],
  }
  ,
  {
    path: '',
    loadChildren: () =>
      import('./Components/Cuenta/cuenta.module').then((m) => m.CuentaModule),
      canActivate: [AdminGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
