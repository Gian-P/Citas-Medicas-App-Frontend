import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register } from 'src/app/Core/Models/auth/register.models';
import { PacienteRegisterService } from 'src/app/Core/Service/Auth/paciente-register.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public user!: Register;
  public IsLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>,
    private registerService: PacienteRegisterService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    this.IsLoading = true;
    const user: Register = {
      ...this.form.value,
    } as Register;

    user.tipoTelefonoCasa = 'Casa';
    user.tipoTelefonoCelular = 'Celular';

    this.registerService.post(user).subscribe(
      (res: any) => {
        this.IsLoading = false;
        this.sweetAlertService.opensweetalertsuccess(
          'Registro exitoso',
        );
        this.closeDialog();
        this.router.navigate(['/auth/sign-in']);
      },
      (err: any) => {
        this.IsLoading = false;
        this.sweetAlertService.opensweetalerterror(
          err.error ? err.error : 'Error al registrar',
        );
      }
    );
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,}$'),
      ]),
      numeroTelefonoCasa: new FormControl('', [Validators.required]),
      numeroTelefonoCelular: new FormControl('', [Validators.required]),
    });

    this.user.usuarioDTO = {
      email: this.user.email,
      password: this.user.password,
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
