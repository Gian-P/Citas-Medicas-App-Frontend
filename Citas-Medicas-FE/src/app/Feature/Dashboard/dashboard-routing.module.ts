import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Components/Especialidades/especialidades.module').then(
        (m) => m.EspecialidadesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
    import('./Components/Pacientes/pacientes.module').then(
      (m) => m.PacientesModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
