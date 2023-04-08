import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { login } from 'src/app/Core/Models/auth/login.models';
import { TokenService } from 'src/app/Core/Service/Auth/Common/token.service';
import { LoginService } from 'src/app/Core/Service/Auth/login.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public user!: login;
  public IsLoading: boolean = false;
  public show: boolean = false;
  public rol: string = '';
  public token: string = '';
  public hide = true;

  constructor(
    private _authService: LoginService,
    private router: Router,
    private sweetalertService: SweetAlertService,
    private authService: TokenService,
    private dialog: MatDialog
  ) {
    this.rol = localStorage.getItem('rol') as string;
    this.token = localStorage.getItem('token') as string;

    if(this.token !== null && this.token !== undefined && this.token !== '') {
      if(this.rol === 'Paciente' || this.rol === 'Medico') {
        this.router.navigate(['dashboard/calendario']);
      }
      else if(this.rol === 'Administrador') {
        this.router.navigate(['dashboard/overview/list']);
      }
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public password(): void {
    this.show = !this.show;
  }

  public submit(): void {
    this.IsLoading = true;
    const user: login = {
      ...this.form.value,
    } as login;

    this._authService.post(user).subscribe(
      (res: any) => {
        this.IsLoading = false;
        this.authService.setToken(res.tokenJwt);
        localStorage.setItem(
          'id',
          res.idUsuario.idAdministrador ||
            res.idUsuario.idMedico ||
            res.idUsuario.idPaciente
        );
        localStorage.setItem('email', res.usuarioDTO.email);
        localStorage.setItem('rol', res.usuarioDTO.rolSet[0].nombreRol);

        if (res.usuarioDTO.rolSet[0].nombreRol === 'Cliente' || res.usuarioDTO.rolSet[0].nombreRol === 'Medico') {
          this.router.navigate(['dashboard/calendario']);
        } else if (res.usuarioDTO.rolSet[0].nombreRol === 'Administrador') {
          this.router.navigate(['dashboard/overview/list']);
        }
      },
      (err) => {
        this.IsLoading = false;
        this.sweetalertService.opensweetalerterror(
          'Por favor verifique sus credenciales'
        );
      }
    );
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

  onRegister(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    dialogConfig.minWidth = '410px';
    this.dialog.open(SignUpComponent, dialogConfig);
  }
}
