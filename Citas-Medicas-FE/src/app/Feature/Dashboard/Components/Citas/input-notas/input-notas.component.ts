import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitaService } from "src/app/Core/Service/Citas/citas.service";
import { SweetAlertService } from "src/app/Miscelaneo/SweetAlert/sweet-alert.service";

@Component({
  selector: 'app-input-notas',
  templateUrl: './input-notas.component.html',
  styleUrls: ['./input-notas.component.scss'],
})
export class InputNotasComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public isLoading: boolean = false;
  public buttonText: string = 'AGREGAR';
  public rol: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: notas,
    private citaService: CitaService,
    private sweetAlertService: SweetAlertService,
    private matDialogRef: MatDialogRef<InputNotasComponent>
  ) {
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setData();
    if(this.data.notas){
      this.buttonText = "MODIFICAR";
    }
    if(this.rol === "Cliente") this.form.disable();
  }

  private initializeForm() {
    this.form = new FormGroup({
      notas: new FormControl('', [Validators.required]),
    });
  }

  public crearNotas(notas: notas) {
    this.isLoading = true;
    this.citaService.createNote(notas).subscribe(
      () => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalertsuccess(
          'Su nota se ha agregado correctamente.'
        );
        this.matDialogRef.close();
      },
      (err) => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalerterror(
          'Su nota no se ha podido agregar.'
        );
      }
    );
  }

  public editNotas(notas: notas) {
    this.isLoading = true;
    this.citaService.editNote(notas).subscribe(
      () => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalertsuccess(
          'Su nota se ha actualizado correctamente.'
        );
        this.matDialogRef.close();
      },
      (err) => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalerterror(
          'Su nota no se ha podido modificar.'
        );
      }
    );
  }

  public onSubmit() {
    const notas: notas = {
      ...this.form.value
    } 
    notas.idCita = this.data.idCita;
    if(this.data.notas){
      this.editNotas(notas);
      return;
    }
    this.crearNotas(notas);
  }

  private setData(){
    if(this.data){
      this.form.patchValue({...this.data})
    }
  }
}

export interface notas{
  notas:string;
  idCita: number;
}
