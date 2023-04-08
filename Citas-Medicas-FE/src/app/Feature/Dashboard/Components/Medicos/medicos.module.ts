import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosStandbyListComponent } from './medicos-standby-list/medicos-standby-list.component';
import { MedicosFormComponent } from './medicos-form/medicos-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MedicosUpdateFormComponent } from './medicos-update-form/medicos-update-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    MedicosListComponent,
    MedicosStandbyListComponent,
    MedicosFormComponent,
    MedicosUpdateFormComponent,
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class MedicosModule {}
