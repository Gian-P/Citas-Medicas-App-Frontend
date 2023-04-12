import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';
import { Administrador } from 'src/app/Core/Models/users/administrador.models';
import { AdministradorRegisterService } from 'src/app/Core/Service/Auth/administrador.service';
import { Register } from 'src/app/Core/Models/auth/register.models';

@Component({
  selector: 'app-administradores-form',
  templateUrl: './administradores-form.component.html',
  styleUrls: ['./administradores-form.component.scss'],
})
export class AdministradoresFormComponent implements OnInit {
  IsLoading: boolean = false;
  public form: FormGroup = new FormGroup([]);
  public hide: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AdministradoresFormComponent>,
    private adminService: AdministradorRegisterService,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit() {
    const admin: Register = {
      ...this.form.value,
    } as Register;

    admin.tipoTelefonoCasa = 'Casa';
    admin.tipoTelefonoCelular = 'Celular';

    admin.usuarioDTO = {
      email: admin.email,
      password: admin.password,
    }

    this.create(admin);
  }

  public create(admin: Register){
    this.IsLoading = true;
    this.adminService.post(admin).subscribe((res) => {
      this.IsLoading = false;
      this.SweetAlertService.opensweetalertsuccess('Administrador creado con exito');
      this.dialogRef.close();
    }, (err) => {
      this.IsLoading = false;
      this.SweetAlertService.opensweetalerterror('Error al crear administrador. Por favor intente de nuevo');
    });
  }

  private initializeForm() {
    this.form = new FormGroup({
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      numeroTelefonoCasa: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      numeroTelefonoCelular: new FormControl('', [Validators.required]),
    });
  }
}
