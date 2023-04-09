import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from 'src/app/Core/Service/Pacientes/pacientes.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { PacientesFormComponent } from '../pacientes-form/pacientes-form.component';
import { BaseResponsePaciente, Paciente } from '../../../../../Core/Models/users/paciente.models';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss'],
})
export class PacientesListComponent implements OnInit {
  public pacientes!: BaseResponsePaciente;
  public dataSource = new MatTableDataSource<Paciente>([]);
  public isLoading = false;

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'email',
    'numero',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private sweeAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getPacientes(pageNo: number = 0, pageSize: number = 10) {
    this.isLoading = true;
    this.pacienteService
      .getPacientesPaged(pageNo, pageSize)
      .subscribe((res) => {
        this.isLoading = false;
        this.pacientes = res;
        this.dataSource.data = this.pacientes.pacientesProjection;

        if(this.paginator){
          this.paginator.length = this.pacientes.total;
        }
      }, (err) => {
        this.isLoading = false;
        this.sweeAlertService.opensweetalerterror(err.message);
      });
  }

  public deletePaciente(id: number) {
    this.sweeAlertService
      .opensweetalertdelete('¿Está seguro de eliminar este elemento?')
      .subscribe((result: any) => {
        if (result) {
          this.pacienteService.deletePaciente(id).subscribe((res) => {
            this.getPacientes();
            this.sweeAlertService.opensweetalertsuccess("Paciente eliminado correctamente");
          });
        }
      });
  }

  openDialogUpdate(paciente: Paciente) {
    this.dialog.open(PacientesFormComponent, { data: paciente });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getPacientes();
    });
  }
}
