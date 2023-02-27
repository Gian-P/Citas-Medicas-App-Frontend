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
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Medicos/medicos.module').then(
        (m) => m.MedicosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
