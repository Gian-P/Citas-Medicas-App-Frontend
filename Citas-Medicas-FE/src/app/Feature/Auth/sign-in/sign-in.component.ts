import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { login } from 'src/app/Core/Models/auth-paciente/login.models';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { AuthService } from 'src/app/Core/Service/Auth/Common/auth.service';
import { LoginService } from 'src/app/Core/Service/Auth/login.service';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public form : FormGroup = new FormGroup([]);
  public user !: login;
  public IsLoading : boolean = false;

  constructor(
    private _authService: LoginService,
    private router: Router,
    private sweetalertService: SweetAlertService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public submit(): void {
    this.IsLoading = true;
    const user: login = {
      ...this.form.value,
    } as login;

    this._authService.post(user).subscribe((res : any) => {
      this.IsLoading = false;
      this.router.navigate(['dashboard']);
      this.authService.setToken(res.tokenJwt);
    }, (err) => {
      this.IsLoading = false;
      this.sweetalertService.opensweetalerterror(err.error ? err.error : 'Error al iniciar sesión');
    });
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,}$'),
      ]),
    });
  }

  onRegister() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '88%';
    dialogConfig.minWidth = '410px';
    this.dialog.open(SignUpComponent, dialogConfig);
  }
}
