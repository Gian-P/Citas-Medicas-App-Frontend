import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradoresRoutingModule } from './administradores-routing.module';
import { AdministradoresListComponent } from './administradores-list/administradores-list.component';
import { AdministradoresFormComponent } from './administradores-form/administradores-form.component';
import { AdministradoresStandbyListComponent } from './administradores-standby-list/administradores-standby-list.component';


@NgModule({
  declarations: [
    AdministradoresListComponent,
    AdministradoresFormComponent,
    AdministradoresStandbyListComponent
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule
  ]
})
export class AdministradoresModule { }
