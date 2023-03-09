import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasListComponent } from './citas-list/citas-list.component';
import { CitasFormComponent } from './citas-form/citas-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CitasListComponent, CitasFormComponent],
  imports: [CommonModule, CitasRoutingModule, SharedModule, MatTableModule, MatButtonModule],
})
export class CitasModule {}
