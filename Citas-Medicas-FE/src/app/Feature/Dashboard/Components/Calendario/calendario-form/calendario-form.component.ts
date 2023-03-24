import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CitaService } from '../../../../../Core/Service/Citas/citas.service';
import { CitaModificada } from '../../../../../Core/Models/calendario/citaModificada.models';

@Component({
  selector: 'app-calendario-form',
  templateUrl: './calendario-form.component.html',
  styleUrls: ['./calendario-form.component.scss'],
})
export class CalendarioFormComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public IsLoading: boolean = false;
  public citaModificada!: CitaModificada;

  public Fecha1!: any;
  public Fecha2!: any;

  public myObserver = {
    next: (resp: any) => {
      this.closeDialog();
      this.sweetAlertService.opensweetalertsuccess("Su cita ha sido modicada correctamente.");
    },

    error: (err: Error) => {
      this.sweetAlertService.opensweetalerterror(
        'Puedes cambiar la cita hasta 7 días antes de la fecha de inicio de la misma.'
      );
    },

    complete: () => {},
  };

  constructor(
    private CitaService: CitaService,
    private dialogRef: MatDialogRef<CalendarioFormComponent>,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit() {
    this.citaModificada = {
      ...this.form.value,
    };

    this.convertDate();
    this.IsLoading = true;
    this.CitaService.updateCita(this.citaModificada)
      .subscribe(this.myObserver)
      .add(() =>{
        this.IsLoading = false;
      });

  }

  convertDate(){
    this.Fecha1 = new Date(this.citaModificada.fechaDesde);

    this.Fecha1 = this.subtractHours(this.Fecha1, 4);

    this.citaModificada.fechaDesde = this.Fecha1.toISOString();

    this.Fecha2 = new Date(this.citaModificada.fechaHasta);

    this.Fecha2 = this.subtractHours(this.Fecha2, 4);

    this.citaModificada.fechaHasta = this.Fecha2.toISOString();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private initializeForm() {
    this.form = new FormGroup({
      fechaDesde: new FormControl('', [Validators.required]),
      fechaHasta: new FormControl('', [Validators.required]),
      tipoCita: new FormControl('', [Validators.required]),
    });
  }

  subtractHours(date: Date, hours:number) {
    date.setHours(date.getHours() - hours);
    return date;
  }
}
