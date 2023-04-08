import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-medicos-update-form',
  templateUrl: './medicos-update-form.component.html',
  styleUrls: ['./medicos-update-form.component.scss']
})
export class MedicosUpdateFormComponent implements OnInit {
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({});
  public especialidades: especialidad[] = [];

  constructor(
    private medicoService: DoctorService,
    private sweetAlertService: SweetAlertService,
    private especialidadService: EspecialidadService,
    private dialogRef: MatDialogRef<MedicosUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.getEspecialidades();
    this.setData();
  }

  private intializeForm() {
    this.form = new FormGroup({
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', Validators.required),
      idEspecialidad: new FormControl('', Validators.required),
    });
  }

  public submit() {
    if (this.formIsValid()) {
      this.update();
    }
  }

  public update() {
    this.isLoading = true;
    const medico: User = {
      ...this.form.value,
    } as User;

    medico.tipoTelefono = 'Celular';

    if(this.form.valid){
      this.medicoService.updateDoctor(this.data.idMedico, medico).subscribe((res) => {
        this.sweetAlertService.opensweetalertsuccess(res);
        this.dialogRef.close();
      }, (err) => {
        this.sweetAlertService.opensweetalerterror("Error al actualizar el medico");
        this.isLoading = false;
      });
    }
  }

  private formIsValid() {
    if (this.form.invalid) {
      this.sweetAlertService.opensweetalerterror('Por favor, rellene todos los campos');
      return false;
    }
    return true;
  }

  public setData() {
    this.form.patchValue({
      numeroTelefono: this.data.numero,
      ...this.data
    });
  }

  ngOnInit(): void {
    this.intializeForm();
    this.setData();
  }

  public getEspecialidades() {
    this.especialidadService.getListEspecialidades().subscribe((res) => {
      this.especialidades = res;
    }, (err) => {
      this.sweetAlertService.opensweetalerterror("Error al obtener las especialidades");
    });
  }
}
