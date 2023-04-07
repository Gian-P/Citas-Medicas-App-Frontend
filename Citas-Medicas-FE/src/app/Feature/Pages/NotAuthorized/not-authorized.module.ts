import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAuthorizedRoutingModule } from './not-authorized-routing.module';
import { NotAuthorizedComponent } from './not-authorized.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    NotAuthorizedRoutingModule,
    MatButtonModule
  ]
})
export class NotAuthorizedModule { }
