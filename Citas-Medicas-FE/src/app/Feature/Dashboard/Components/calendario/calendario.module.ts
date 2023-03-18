import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SharedModule } from '../../../../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarioRoutingModule,
    SharedModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
})
export class CalendarioModule {}
