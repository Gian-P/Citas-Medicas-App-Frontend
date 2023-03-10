import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesFormComponent } from './Especialidades-form/especialidades-form.component';
import { EspecialidadesListComponent } from './Especialidades-list/especialidades-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
  EspecialidadesListComponent,
  EspecialidadesFormComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EspecialidadesModule { }
