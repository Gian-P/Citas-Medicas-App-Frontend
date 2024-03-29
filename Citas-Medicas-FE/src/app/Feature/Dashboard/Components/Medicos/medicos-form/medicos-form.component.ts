import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Register } from 'src/app/Core/Models/auth/register.models';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { MedicoRegisterService } from 'src/app/Core/Service/Auth/medico-register.service';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-medicos-form',
  templateUrl: './medicos-form.component.html',
  styleUrls: ['./medicos-form.component.scss'],
})
export class MedicosFormComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public user!: Register;
  public especialidades: especialidad[] = [];
  public IsLoading: boolean = false;
  public hide: boolean = false;

  constructor(
    private _medicosService: MedicoRegisterService,
    private _especialidadesService: EspecialidadService,
    private dialogRef: MatDialogRef<MedicosFormComponent>,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getEspecialidades();
    this.initializeForm();
  }

  public onSubmit() {
    const medico: Register = {
      ...this.form.value
    } as Register;

    medico.tipoTelefonoCasa = 'Casa';
    medico.tipoTelefonoCelular = 'Celular';

    if (this.formIsValid()){
      this.create(medico);
    }
  }

  public formIsValid() {
    return this.form.valid;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private create(medico: Register) {
    this.IsLoading = true;
      this._medicosService
        .post(medico)
        .subscribe((res) => {
          this.sweetAlertService.opensweetalertsuccess('Medico creado');
          this.dialogRef.close();
        })
        .add(() => (this.IsLoading = false));
  }

  private getEspecialidades() {
    this._especialidadesService
      .getListEspecialidades()
      .subscribe((res) => (this.especialidades = res));
  }

  private initializeForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required
      ]),
      numeroTelefonoCasa: new FormControl(''),
      numeroTelefonoCelular: new FormControl('', [Validators.required]),
      idEspecialidad: new FormControl('', [Validators.required]),
    });

    this.user.usuarioDTO = {
      email: this.user.email,
      password: this.user.password,
    };
  }
}
