import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  PaymentIntent,
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentSendData,
} from 'src/app/Core/Models/payment/payment-intent.models';
import { PagosService } from 'src/app/Core/Service/Pago/pago.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
})
export class AddPaymentMethodComponent implements OnInit {
  private payment!: PaymentIntentResponse;

  paymentForm = this.fb.group({
    name: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expirationDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPaymentMethodComponent>,
    private paymentService: PagosService,
    private sweetAlert: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: PaymentSendData
  ) {}

  submit() {
    const paymentIntentRequest = {
      amount: 50,
      currency: 'USD',
      description: 'Cita médica',
      idCita: this.data.idCita,
      idPaciente: this.data.idPaciente,
    } as PaymentIntentRequest;

    if (this.paymentForm.valid) {
      this.paymentService
        .paymentIntent(paymentIntentRequest)
        .subscribe((pago: any) => {
          this.payment = pago.paymentIntent;
          console.log(this.payment);
          this.sweetAlert
            .opensweetalertdelete('¿Está seguro de realizar el pago?')
            .subscribe((res: any) => {
              if (res) {
                this.paymentService
                  .confirmPayment(
                    "pi_1J9Z2pJ",
                    5
                  )
                  .subscribe((res: any) => {
                    this.sweetAlert.opensweetalertsuccess(
                      'Pago realizado con éxito'
                    );
                  });
              } else {
                this.paymentService
                  .cancelPayment(
                    "pi_1J9Z2pJ",
                    5
                  )
                  .subscribe((res: any) => {
                    this.sweetAlert.opensweetalerterror('Pago cancelado');
                  });
              }
            });
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
