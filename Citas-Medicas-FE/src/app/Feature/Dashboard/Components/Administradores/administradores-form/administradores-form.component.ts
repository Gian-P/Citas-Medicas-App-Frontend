import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rol } from '../../../../../Core/Models/rol/rol.model';
import { RolService } from '../../../../../Core/Service/rol/rol.service';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-administradores-form',
  templateUrl: './administradores-form.component.html',
  styleUrls: ['./administradores-form.component.scss'],
})
export class AdministradoresFormComponent implements OnInit {
  IsLoading: boolean = false;
  public form: FormGroup = new FormGroup([]);

  constructor(
    private dialogRef: MatDialogRef<AdministradoresFormComponent>,
    private rolService: RolService,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public onSubmit() {
    const rol: rol = {
      ...this.form.value,
    } as rol;

    this.CreateRol(rol);
  }

  private CreateRol(rol: rol) {
    this.IsLoading = true;
    this.rolService.post(rol).subscribe({
      next:(position) => {
        this.SweetAlertService.opensweetalertsuccess('El rol ha sido creado');
      },

      error:(msg) => {
         this.SweetAlertService.opensweetalerterror('El rol no se pudo crear');
      },

      complete:() => {
        this.IsLoading = false;
        this.closeDialog();
        console.log('Observer got a complete notification');
      }
    });
  }

  private initializeForm() {
    this.form = new FormGroup({
      nombreRol: new FormControl('', [Validators.required]),
    });
  }
}
