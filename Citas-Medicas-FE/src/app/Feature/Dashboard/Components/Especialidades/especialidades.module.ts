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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const COMPONENTS = [
  EspecialidadesListComponent,
  EspecialidadesFormComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
})
export class EspecialidadesModule {}
