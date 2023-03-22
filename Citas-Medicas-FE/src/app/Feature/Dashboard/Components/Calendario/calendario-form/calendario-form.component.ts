import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModificarCitas } from '../../../../../Core/Models/citas/modificar_citas.models';
import { CitaService } from '../../../../../Core/Service/Citas/citas.service';
import { Citas } from 'src/app/Core/Models/citas/citas.models';

@Component({
  selector: 'app-calendario-form',
  templateUrl: './calendario-form.component.html',
  styleUrls: ['./calendario-form.component.scss'],
})
export class CalendarioFormComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public IsLoading: boolean = false;
  public citaModificada!: ModificarCitas;


  constructor(
    private CitaService: CitaService,
    private dialogRef: MatDialogRef<CalendarioFormComponent>,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    //this.setData();
  }

  public onSubmit() {
    this.citaModificada = {
      ...this.form.value,
    } as ModificarCitas;

    this.getCitasPaciente();
  }

  public getCitasPaciente() {
    let id = parseInt(localStorage.getItem('id') || '0');

    this.CitaService.getCitasByPaciente(id, 0, 10).subscribe((resp) => {
      console.log(resp);
      this.findMatchingCita(resp);
    });
  }

  public findMatchingCita(citasPaciente: Citas[]) {
    for(const cita of citasPaciente){
      if(cita.idCita === this.citaModificada.IdCita){
        this.modidifyCitaPaciente(cita);
      }
    }
  }

  public modidifyCitaPaciente(cita:Citas){
    //console.log(cita)
    
    cita.fechaDesde = this.citaModificada.fechaDesde;
    cita.fechaHasta = this.citaModificada.fechaHasta;
    cita.tipoCita = this.citaModificada.tipoCita;
    
    console.log(cita);
    this.CitaService.updateCita(cita).subscribe((resp) => {
      console.log(resp);
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private initializeForm() {
    this.form = new FormGroup({
      IdCita: new FormControl('', [Validators.required]),
      FechaDesde: new FormControl('', [Validators.required]),
      FechaHasta: new FormControl('', [Validators.required]),
      TipoCita: new FormControl('', [Validators.required]),
    });
  }
}
