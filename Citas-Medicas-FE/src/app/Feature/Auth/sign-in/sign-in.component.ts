import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { login } from 'src/app/Core/Models/Login/login.models';
import { LoginService } from 'src/app/Core/Service/Auth/login.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public user!: login;

  constructor(
    private _authService: LoginService,
    private router: Router,
    private sweetalertService: SweetAlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public submit(): void {
    const user: login = {
      ...this.form.value,
    } as login;

    this._authService.post(user).subscribe((res : any) => {
      console.log(res);
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
    dialogConfig.width = '33%';
    dialogConfig.height = '65%';
    dialogConfig.minWidth = '410px';
    this.dialog.open(SignUpComponent, dialogConfig);
  }
}


