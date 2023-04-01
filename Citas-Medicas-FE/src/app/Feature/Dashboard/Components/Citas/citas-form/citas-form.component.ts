import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { BaseResponseMedico } from '../../../../../Core/Models/users/medico.models';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss'],
})
export class CitasFormComponent implements OnInit {
  public doctors!: BaseResponseMedico;
  public citas!: Citas;
  public form: FormGroup = new FormGroup({});
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
    private dialogRef: MatDialogRef<CitasFormComponent>
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.initializeForm();
  }

  public getDoctors() {
    this.doctorService.getDoctorsPaged(0, 10).subscribe((res: any) => {
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
    this.citas = {
      ...this.form.value,
    } as Citas;

    if(this.citas.fechaDesde.toString() === "" || this.citas.fechaHasta.toString() === "") {
      this.sweetAlert.opensweetalerterror(
        "No completo uno de los campos, por favor revisar e intentar de nuevo."
      );
      return;
    }

    if(this.citas.idMedico.toString() === "" || this.citas.tipoCita.toString() === ""){
      this.sweetAlert.opensweetalerterror(
        'No completo uno de los campos, porfavor revisar e intentar de nuevo.'
      );
      return;
    }

    this.citas.idPaciente = localStorage.getItem('id') as unknown as number;
    this.citaService.createCita(this.citas).subscribe(this.CitasObserver);

  }

  public close() {
    this.dialogRef.close();
  }

  convertDate() {
    this.Fecha1 = new Date(this.citas.fechaDesde);

    this.Fecha1 = this.Fecha1.toISOString();

    this.Fecha2 = new Date(this.citas.fechaHasta);

    this.Fecha2 = this.Fecha2.toISOString();
  }
}
