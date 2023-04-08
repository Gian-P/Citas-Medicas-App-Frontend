import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasListComponent } from './citas-list/citas-list.component';
import { CitasFormComponent } from './citas-form/citas-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasStandbyListComponent } from './citas-standby-list/citas-standby-list.component';
import { MatCardModule } from '@angular/material/card';
import { CitasFormMeetComponent } from './citas-form-meet/citas-form-meet.component';
import { TutorialCreateMeetComponent } from './tutorial-create-meet/tutorial-create-meet.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component';

@NgModule({
  declarations: [
    CitasListComponent,
    CitasFormComponent,
    CitasStandbyListComponent,
    CitasFormMeetComponent,
    TutorialCreateMeetComponent,
    AddPaymentMethodComponent,
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
  ],
})
export class CitasModule {}
//
