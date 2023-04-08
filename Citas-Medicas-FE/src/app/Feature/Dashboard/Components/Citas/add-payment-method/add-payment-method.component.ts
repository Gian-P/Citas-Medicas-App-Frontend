import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  paymentForm = this.fb.group({
    name: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expirationDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPaymentMethodComponent>
  ) {}

  submit() {
    if (this.paymentForm.valid) {
      this.dialogRef.close(true);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }
}
