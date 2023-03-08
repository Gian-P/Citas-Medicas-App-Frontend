import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasListComponent } from './citas-list/citas-list.component';
import { CitasFormComponent } from './citas-form/citas-form.component';


@NgModule({
  declarations: [
    CitasListComponent,
    CitasFormComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
