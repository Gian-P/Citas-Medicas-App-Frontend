import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { BaseResponseMedico } from '../../../../../Core/Models/users/medico.models';
import { AddPaymentMethodComponent } from '../add-payment-method/add-payment-method.component';
import { PaymentSendData } from 'src/app/Core/Models/payment/payment-intent.models';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss'],
})
export class CitasFormComponent implements OnInit {
  public doctors!: BaseResponseMedico;
  public citas!: Citas;
  public form: FormGroup = new FormGroup({});
  public isLoading: boolean = false;
  public Fecha1!: any;
  public Fecha2!: any;

  public CitasObserver = {
    next: () => {
      this.sweetAlert.opensweetalertsuccess("Cita creada con éxito");
      this.dialogRef.close();
    },
    error:(err: any) => {
      this.sweetAlert.opensweetalerterror(err.error.message);
    }
  };

  constructor(
    private citaService: CitaService,
    private doctorService: DoctorService,
    private sweetAlert: SweetAlertService,
    private dialogRef: MatDialogRef<CitasFormComponent>,
    private paymentDialog: MatDialog,
  ) {
    this.getDoctors();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public getDoctors() {
    this.doctorService.getDoctorsPaged(0, 100).subscribe((res: any) => {
      this.doctors = res;
    });
  }

  private initializeForm() {
    this.form = new FormGroup({
      fechaDesde: new FormControl('', [Validators.required]),
      fechaHasta: new FormControl('', [Validators.required]),
      idMedico: new FormControl('', [Validators.required]),
      tipoCita: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    this.isLoading = true;
    this.citas = {
      ...this.form.value,
    } as Citas;

    if (this.validateDate()) {
      this.citas.idPaciente = localStorage.getItem('id') as unknown as number;
      this.citaService.createCita(this.citas).subscribe((res: any) => {
        this.isLoading = false;

        const paymentSend = {
          idCita: res.idCita,
          idPaciente: res.idPaciente,
        } as PaymentSendData;

        this.paymentDialog.open(AddPaymentMethodComponent, {
          data: paymentSend,
        });
      }, (err: any) => {
        this.isLoading = false;
        this.sweetAlert.opensweetalerterror(err.error.message);
      });
    }else{
      this.isLoading = false;
    }
  }

  public close() {
    this.dialogRef.close();
  }

  private validateDate() : boolean {
    if (this.citas.fechaDesde > this.citas.fechaHasta) {
      this.sweetAlert.opensweetalerterror(
        'La fecha de inicio no puede ser mayor a la fecha de finalización'
      );
      return false;
    }

    if(this.citas.fechaDesde.toString() === "" || this.citas.fechaHasta.toString() === "") {
      this.sweetAlert.opensweetalerterror(
        "No completó uno de los campos, por favor revisar e intentar de nuevo."
      );
      return false;
    }

    if(this.citas.idMedico.toString() === "" || this.citas.tipoCita.toString() === ""){
      this.sweetAlert.opensweetalerterror(
        'No completó uno de los campos, por favor revisar e intentar de nuevo.'
      );
      return false;
    }

    return true;
  }

  convertDate() {
    this.Fecha1 = new Date(this.citas.fechaDesde);

    this.Fecha1 = this.Fecha1.toISOString();

    this.Fecha2 = new Date(this.citas.fechaHasta);

    this.Fecha2 = this.Fecha2.toISOString();
  }
}
