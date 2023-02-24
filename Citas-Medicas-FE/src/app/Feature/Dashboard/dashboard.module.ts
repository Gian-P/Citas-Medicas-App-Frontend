import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { EspecialidadesComponent } from './Components/Admin/Especialidades/especialidades.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EspecialidadesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    MatTableModule
  ]
})
export class DashboardModule { }
