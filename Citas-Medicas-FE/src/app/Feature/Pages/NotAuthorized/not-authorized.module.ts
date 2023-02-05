import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthorizedComponent } from './not-authorized.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NotAuthorizedModule { }
