import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CitaService } from '../../../../../Core/Service/Citas/citas.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-calendario-form-delete',
  templateUrl: './calendario-form-delete.component.html',
  styleUrls: ['./calendario-form-delete.component.scss'],
})
export class CalendarioFormDeleteComponent implements OnInit {
  public form: FormGroup = new FormGroup([]);
  public IsLoading: boolean = false;

  public myObserver = {
    next: (resp: any) => {},

    error: (err: Error) => {},

    complete: () => {},
  };
  constructor(
    private CitaService: CitaService,
    private dialogRef: MatDialogRef<CalendarioFormDeleteComponent>,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      
      /*

      fechaDesde: new FormControl('', [Validators.required]),
      fechaHasta: new FormControl('', [Validators.required]),
      tipoCita: new FormControl('', [Validators.required]),

      */
    });
  }
}
