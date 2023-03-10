import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss']
})
export class CitasFormComponent implements OnInit {
  public doctors: User[] = [];
  public citas !: Citas;
  public form: FormGroup = new FormGroup({});

  constructor(
    private citaService: CitaService,
    private doctorService: DoctorService,
    private sweetAlert: SweetAlertService,
    private dialogRef: MatDialogRef<CitasFormComponent>,
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.initializeForm();
  }

  public getDoctors() {
    this.doctorService.getDoctorsPaged(0, 10).subscribe(
      (res: any) => {
        this.doctors = res;
      }
    );
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
    const citas : Citas = {
      ...this.form.value
    } as Citas;

    citas.idPaciente = localStorage.getItem('id') as unknown as number;

    this.citaService.createCita(citas).subscribe(
      (res: any) => {
        this.sweetAlert.opensweetalertsuccess('Cita creada con éxito');
        this.dialogRef.close();
      }
    );
  }
}
