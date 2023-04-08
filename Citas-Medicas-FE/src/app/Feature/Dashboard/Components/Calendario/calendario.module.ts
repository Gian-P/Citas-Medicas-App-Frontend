import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SharedModule } from '../../../../Shared/shared.module';
import { CalendarioFormUpdateComponent } from './calendario-form-update/calendario-form-update.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarioRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [CalendarioFormUpdateComponent, CalendarioListComponent],
  exports: [],
})
export class CalendarioModule {}
