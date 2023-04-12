import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meet } from 'src/app/Core/Models/citas/meet.models';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { MedicosFormComponent } from '../../Medicos/medicos-form/medicos-form.component';
import { TutorialCreateMeetComponent } from '../tutorial-create-meet/tutorial-create-meet.component';
import { Citas } from "src/app/Core/Models/citas/citas.models";

@Component({
  selector: 'app-citas-form-meet',
  templateUrl: './citas-form-meet.component.html',
  styleUrls: ['./citas-form-meet.component.scss'],
})
export class CitasFormMeetComponent implements OnInit {
  public meet!: Meet;
  public form: FormGroup = new FormGroup({});
  public isLoading: boolean = false;
  public tipoCita: string = '';

  constructor(
    private dialogRef: MatDialogRef<MedicosFormComponent>,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService,
    private citaService: CitaService,
    @Inject(MAT_DIALOG_DATA) public cita: Citas
  ) {
    this.tipoCita = this.cita.tipoCita;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit() {
    const meet: Meet = {
      ...this.form.value,
    } as Meet;

    const estatus: Estatus = {
      estatus: 'ACEPTADA',
    } as Estatus;

    this.sweetAlertService
      .opensweetalertwarning('¿Estás seguro?')
      .subscribe((res) => {
        if (res) {
          this.isLoading = true;
          this.citaService.cambiarEstatusCita(this.cita.idCita, estatus).subscribe(
            (res: any) => {
              this.isLoading =  true;
              if(this.tipoCita === 'Virtual'){
                 this.citaService
                   .addGoogleMeetLink(this.cita.idCita, meet)
                   .subscribe(
                     (res: any) => {
                       this.isLoading = false;
                       this.sweetAlertService.opensweetalertsuccess(
                         'La cita se ha confirmado con éxito'
                       );
                       this.dialogRef.close();
                     },
                     (err: any) => {
                       this.isLoading = false;
                       this.sweetAlertService.opensweetalerterror(
                         'Hubo un error al confirmar la cita. Por favor contacta al administrador del sistema'
                       );
                     }
                   ),
                   (err: any) => {
                     this.isLoading = false;
                     this.sweetAlertService.opensweetalerterror(
                       'Hubo un error al confirmar la cita. Por favor contacta al administrador del sistema'
                     );
                   };
              } else{
                this.sweetAlertService.opensweetalertsuccess(
                  'La cita se ha confirmado con éxito'
                );
                this.isLoading = false;
                this.dialogRef.close();
              }
            },
            (err: any) => {
              this.isLoading = false;
              this.sweetAlertService.opensweetalerterror('Hubo un error al confirmar la cita. Por favor contacta al administrador del sistema');
            }
          );
        }
      });
  }

  public initializeForm() {
    this.form = new FormGroup({
      googleMeetLink: new FormControl('', [Validators.required]),
    });
  }

  public openDialog() {
    this.dialog.open(TutorialCreateMeetComponent);
  }

  public close() {
    this.dialogRef.close();
  }
}
