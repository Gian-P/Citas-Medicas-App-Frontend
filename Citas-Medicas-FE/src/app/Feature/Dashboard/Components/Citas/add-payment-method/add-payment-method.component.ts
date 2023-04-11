import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
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
  public isLoading: boolean = false;

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
    private dialog: MatDialog,
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
      this.isLoading = true;
      this.paymentService
        .paymentIntent(paymentIntentRequest)
        .subscribe((pago: any) => {
          var paymentIntedId = JSON.parse(pago.paymentIntent);
          this.payment = pago;
          this.payment.paymentId = paymentIntedId.id;

          this.sweetAlert
            .opensweetalertdelete('¿Está seguro de realizar el pago?')
            .subscribe((res: any) => {
              if (res) {
                this.paymentService.confirmPayment(this.payment.paymentId, this.payment.idPago).subscribe(
                  (res: any) => {
                    this.isLoading = false;
                    this.sweetAlert.opensweetalertsuccess(
                      'Pago realizado con éxito'
                    );
                    this.dialog.closeAll();
                  },
                  (err: any) => {
                    this.isLoading = false;
                    this.sweetAlert.opensweetalerterror(
                      'Error al confirmar pago'
                    );
                  }
                );
              } else {
                this.paymentService.cancelPayment(this.payment.paymentId, this.payment.idPago).subscribe(
                  (res: any) => {
                    this.isLoading = false;
                    this.sweetAlert.opensweetalerterror('Pago cancelado exitosamente');
                    this.dialog.closeAll();
                  },
                  (err: any) => {
                    this.isLoading = false;
                    this.sweetAlert.opensweetalerterror(
                      'Error al cancelar pago'
                    );
                  }
                );
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
