import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Components/calendario/calendario.module').then(
        (m) => m.CalendarioModule
      ),
  },

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
  {
    path: '',
    loadChildren: () =>
      import('./Components/Administradores/administradores.module').then(
        (m) => m.AdministradoresModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Components/Citas/citas.module').then((m) => m.CitasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
