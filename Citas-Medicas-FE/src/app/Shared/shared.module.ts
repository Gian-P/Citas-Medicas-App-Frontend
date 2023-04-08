import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './Components/components.module';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const MODULES : any = [
  CommonModule,
  MatDialogModule,
  MatIconModule,
  ToastrModule,
  ComponentsModule,

  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  ComponentsModule,
  MatOptionModule,
  MatDialogModule,
]; // AQUI SE DEBEN AGREGAR LOS MODULOS COMPARTIDOS

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule { }
