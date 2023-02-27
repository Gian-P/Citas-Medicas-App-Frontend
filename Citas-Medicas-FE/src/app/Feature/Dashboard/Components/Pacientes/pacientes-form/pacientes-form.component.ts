import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Core/Models/users/users.models';
import { PacienteService } from 'src/app/Core/Service/Pacientes/pacientes.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.scss'],
})
export class PacientesFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor(
    private pacienteService: PacienteService,
    private sweetAlertService: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  private intializeForm() {
    this.form = new FormGroup({
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', Validators.required),
    });
  }

  public submit() {
    if (this.data) {
      this.update();
    }
  }

  public update() {
    const paciente: User = {
      ...this.form.value,
    } as User;

    paciente.tipoTelefono = 'Celular';

    this.pacienteService.updatePaciente(this.data.idPaciente, paciente).subscribe((res) => {
      this.sweetAlertService.opensweetalertsuccess(res);
    }, (err) => {
      this.sweetAlertService.opensweetalerterror(err);
    });
  }

  public setData() {
    if (this.data) {
      this.form.patchValue({
        numeroTelefono: this.data.numero,
        ...this.data,
      });
    }
  }

  ngOnInit(): void {
    this.intializeForm();
    this.setData();
  }
}
