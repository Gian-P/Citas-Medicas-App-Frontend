import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  public isLoading: boolean = false;
  public hide: boolean = true;
  public errorMsg: string = '';
  public errorNames : string[] = [
    'apellido',
    'direccion',
    'nombre',
    'password',
    'message',
    'email',
    'numeroTelefonoCasa',
    'numeroTelefonoCelular',
    'cedula'
  ];

  public registrationObserver = {
    next: (x: any) => {
      this.isLoading = false;
      this.sweetAlertService.opensweetalertsuccess('Registro exitoso');
      this.closeDialog();
    },

    error: (err: any) => {
       this.isLoading = false;
       this.errorMsg = this.findErrorMsg(err);

       if (this.errorMsg === 'Email ya existe') {
         this.errorMsg = 'El email que usted está tratando de utilizar ya se encuentra en uso.';
       }

       this.sweetAlertService.opensweetalerterror(
         this.errorMsg ? this.errorMsg : 'Error al registrar'
       );      
    },

    complete: () => {

    },

  };

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>,
    private registerService: PacienteRegisterService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public findErrorMsg({error}:any){
    for(let errorName of this.errorNames){
      if(error[errorName]) return error[errorName];
    }
  }

  public onSubmit(): void {
    console.log("1");
    this.isLoading = true;
    const user: Register = {
      ...this.form.value,
    } as Register;

    user.tipoTelefonoCasa = 'Casa';
    user.tipoTelefonoCelular = 'Celular';

    if(user.rol === "") {
      this.sweetAlertService.opensweetalerterror(
        'La opción de rol está vacía, por favor elija uno de ellos.'
      );
      this.isLoading = false;
      return;
    };

    if (user.rol === 'Paciente') {
      this.registerService
        .postPaciente(user)
        .subscribe(this.registrationObserver);
    }

    else if(user.rol === 'Medico') {
      this.registerService
        .postMedico(user)
        .subscribe(this.registrationObserver);
    }

    else{
      this.registerService
        .postAdministrador(user)
        .subscribe(this.registrationObserver);
    }


  }

  private initializeForm(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      numeroTelefonoCasa: new FormControl('', [Validators.required]),
      numeroTelefonoCelular: new FormControl('', [Validators.required]),
    });

    this.user.usuarioDTO = {
      email: this.user.email,
      password: this.user.password,
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
