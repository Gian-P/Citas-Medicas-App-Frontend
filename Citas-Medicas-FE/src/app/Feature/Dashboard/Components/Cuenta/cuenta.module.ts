import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaFormComponent } from './cuenta-form/cuenta-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    CuentaFormComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ]
})
export class CuentaModule { }
