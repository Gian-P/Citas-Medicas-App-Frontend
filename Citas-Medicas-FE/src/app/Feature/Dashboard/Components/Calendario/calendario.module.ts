import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SharedModule } from '../../../../Shared/shared.module';
import { CalendarioFormUpdateComponent } from './calendario-form-update/calendario-form-update.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';
import { CalendarioFormDeleteComponent } from './calendario-form-delete/calendario-form-delete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarioRoutingModule,
    SharedModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [CalendarioFormUpdateComponent, CalendarioListComponent, CalendarioFormDeleteComponent],
  exports: [],
})
export class CalendarioModule {}
