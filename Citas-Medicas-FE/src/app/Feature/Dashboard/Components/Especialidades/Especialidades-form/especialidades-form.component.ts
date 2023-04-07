import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
@Component({
  selector: 'app-especialidades-form',
  templateUrl: './especialidades-form.component.html',
  styleUrls: ['./especialidades-form.component.scss'],
})
export class EspecialidadesFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isLoading: boolean = false;

  constructor(
    private especialidadService: EspecialidadService,
    private dialogRef: MatDialogRef<EspecialidadesFormComponent>,
    private sweetAlertService: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: especialidad
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setData();
  }

  private initializeForm() {
    this.form = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
    });
  }

  public submit() {
    const especialidad: especialidad = {
      ...this.form.value
    } as especialidad;

    if (this.data) {
      this.updateEspecialidad(especialidad);
    }
    else {
      this.createEspecialidad(especialidad);
    }
  }

  public createEspecialidad(especialidad: especialidad) {
    this.isLoading = true;
    this.especialidadService
      .createEspecialidad(especialidad)
      .subscribe((res) => {
        this.sweetAlertService.opensweetalertsuccess('Especialidad creada con éxito');
        this.dialogRef.close();
      }, (err) => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalerterror('Error al crear la especialidad');
      });
  }

  public updateEspecialidad(especialidad: especialidad) {
    this.isLoading = true;
    this.especialidadService
      .updateEspecialidad(especialidad, this.data.idEspecialidad)
      .subscribe((res) => {
        this.sweetAlertService.opensweetalertsuccess('Especialidad actualizada con éxito');
        this.dialogRef.close();
      }, (err) => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalerterror('Error al actualizar la especialidad');
      });
  }

  private setData() {
    if (this.data) {
      this.form.setValue({
        tipo: this.data.tipo,
      });
    }
  }
}
