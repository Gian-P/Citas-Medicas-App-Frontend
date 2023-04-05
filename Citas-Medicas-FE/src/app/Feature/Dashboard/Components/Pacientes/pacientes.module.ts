import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PacientesListComponent,
    PacientesFormComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class PacientesModule { }
