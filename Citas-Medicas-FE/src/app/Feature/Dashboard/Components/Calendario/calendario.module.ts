import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SharedModule } from '../../../../Shared/shared.module';
import { CalendarioFormComponent } from './calendario-form/calendario-form.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';

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
  declarations: [
    CalendarioFormComponent,
    CalendarioListComponent,
  ],
  exports: [],
})
export class CalendarioModule {}
