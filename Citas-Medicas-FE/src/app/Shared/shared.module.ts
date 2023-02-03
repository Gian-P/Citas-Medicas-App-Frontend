import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const MODULES : any = [
  CommonModule
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
