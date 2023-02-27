import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosStandbyListComponent } from './medicos-standby-list/medicos-standby-list.component';
import { MedicosFormComponent } from './medicos-form/medicos-form.component';


@NgModule({
  declarations: [
    MedicosListComponent,
    MedicosStandbyListComponent,
    MedicosFormComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MedicosModule { }
