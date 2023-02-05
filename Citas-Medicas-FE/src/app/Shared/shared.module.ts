import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

const MODULES : any = [
  CommonModule,
  MatDialogModule,
  MatIconModule
]; // AQUI SE DEBEN AGREGAR LOS MODULOS COMPARTIDOS

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule { }
