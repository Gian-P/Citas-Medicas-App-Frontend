import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradoresRoutingModule } from './administradores-routing.module';
import { AdministradoresListComponent } from './administradores-list/administradores-list.component';
import { AdministradoresFormComponent } from './administradores-form/administradores-form.component';
import { AdministradoresStandbyListComponent } from './administradores-standby-list/administradores-standby-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AdministradoresListComponent,
    AdministradoresFormComponent,
    AdministradoresStandbyListComponent
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AdministradoresModule { }
