import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaService } from '../../../../../Core/Service/Citas/citas.service';
import { CitaModificada } from '../../../../../Core/Models/calendario/citaModificada.models';

@Component({
  selector: 'app-calendario-form-update',
  templateUrl: './calendario-form-update.component.html',
  styleUrls: ['./calendario-form-update.component.scss'],
})
export class CalendarioFormUpdateComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public IsLoading: boolean = false;
  public citaModificada!: CitaModificada;

  public Fecha1!: any;
  public Fecha2!: any;

  public myObserver = {
    next: () => {
      this.closeDialog();
      this.sweetAlertService.opensweetalertsuccess(
        'Su cita ha sido modicada correctamente.'
      );
    },

    error: (err: any) => {
      this.sweetAlertService.opensweetalerterror(
        'Puedes cambiar la cita hasta 7 días antes de la fecha de inicio de la misma.'
      );
    },

    complete: () => {},
  };

  constructor(
    private CitaService: CitaService,
    private dialogRef: MatDialogRef<CalendarioFormUpdateComponent>,
    private sweetAlertService: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: CitaModificada
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit() {
    this.citaModificada = {
      ...this.form.value,
    };

    if (
      this.citaModificada.fechaDesde === '' ||
      this.citaModificada.fechaHasta === '' ||
      this.citaModificada.tipoCita === ''
    ) {
      this.sweetAlertService.opensweetalerterror(
        'No completo uno de los campos, por favor revisar e intentar de nuevo.'
      );

      return;
    }

    this.convertDate();
    this.IsLoading = true;
    this.CitaService.updateCita(this.citaModificada)
      .subscribe(this.myObserver)
      .add(() => {
        this.IsLoading = false;
      });
  }

  convertDate() {
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

  subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);
    return date;
  }
}
