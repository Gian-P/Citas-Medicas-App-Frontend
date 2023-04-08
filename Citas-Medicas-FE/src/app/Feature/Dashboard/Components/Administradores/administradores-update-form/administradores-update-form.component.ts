import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Core/Models/users/users.models';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { PacientesFormComponent } from '../../Pacientes/pacientes-form/pacientes-form.component';

@Component({
  selector: 'app-administradores-update-form',
  templateUrl: './administradores-update-form.component.html',
  styleUrls: ['./administradores-update-form.component.scss']
})
export class AdministradoresUpdateFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isLoading = false;

  constructor(
    private administradorService: AdminService,
    private sweetAlertService: SweetAlertService,
    private dialogRef: MatDialogRef<AdministradoresUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  private intializeForm() {
    this.form = new FormGroup({
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', Validators.required),
    });
  }

  public update() {
    this.isLoading = true;
    const administrador: User = {
      ...this.form.value,
    } as User;

    administrador.tipoTelefono = 'Celular';

    if(this.form.valid){
      this.administradorService.updateAdmin(this.data.idAdministrador, administrador).subscribe((res) => {
        this.sweetAlertService.opensweetalertsuccess(res);
        this.dialogRef.close();
      }, (err) => {
        this.sweetAlertService.opensweetalerterror("Error al actualizar el paciente");
        this.isLoading = false;
      });
    }
  }

  public setData() {
    if (this.data) {
      this.form.patchValue({
        numeroTelefono: this.data.numero,
        ...this.data,
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

  public submit() {
    if (this.formIsValid()) {
      this.update();
    }
  }

  ngOnInit(): void {
    this.intializeForm();
    this.setData();
  }
}
