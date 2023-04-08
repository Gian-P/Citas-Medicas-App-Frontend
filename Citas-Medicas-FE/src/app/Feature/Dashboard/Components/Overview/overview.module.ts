import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from '../Overview/overview-routing.module';
import { OvierviewListComponent } from './ovierview-list/ovierview-list.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [
    OvierviewListComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    MatGridListModule,
    MatCardModule,
    SharedModule
  ]
})
export class OverviewModule { }
