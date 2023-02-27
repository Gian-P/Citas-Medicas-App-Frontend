import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Core/Models/users/users.models';
import { PacienteService } from 'src/app/Core/Service/Pacientes/pacientes.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { PacientesFormComponent } from '../pacientes-form/pacientes-form.component';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss'],
})
export class PacientesListComponent implements OnInit {
  public pacientes: User[] = [];

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private sweeAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getPacientes();
  }

  public getPacientes() {
    this.pacienteService.getPacientesPaged(0, 10).subscribe((res) => {
      this.pacientes = res;
    });
  }

  public deletePaciente(id: number) {
    this.sweeAlertService
      .opensweetalertdelete('¿Está seguro de eliminar este elemento?')
      .subscribe((result: any) => {
        if (result) {
          this.pacienteService.deletePaciente(id).subscribe((res) => {
            this.getPacientes();
            this.sweeAlertService.opensweetalertsuccess(res);
          });
        }
      });
  }

  openDialogUpdate(paciente: User) {
    this.dialog.open(PacientesFormComponent, { data: paciente });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getPacientes();
    });
  }
}
