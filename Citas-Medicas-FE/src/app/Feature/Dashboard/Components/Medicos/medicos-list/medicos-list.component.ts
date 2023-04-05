import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { MedicosFormComponent } from '../medicos-form/medicos-form.component';
import { MedicosStandbyListComponent } from '../medicos-standby-list/medicos-standby-list.component';
import { BaseResponseMedico, Medico } from '../../../../../Core/Models/users/medico.models';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.scss'],
})
export class MedicosListComponent implements OnInit {
  public medicos!: BaseResponseMedico;
  public dataSource: any;
  public rol: string = '';

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'email',
    'numero',
    'nombreEspecialidad',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private medicoService: DoctorService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {
    this.getMedicos();
  }

  ngOnInit(): void {
    this.getMedicos();
    this.rol = localStorage.getItem('rol') as string;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getMedicos(pageNo: number = 0, pageSize: number = 10) {
    this.medicoService.getDoctorsPaged(pageNo, pageSize).subscribe((data) => {
      this.medicos = data;
      this.dataSource = new MatTableDataSource<Medico>(
        this.medicos.medicosEnEsperaProjections
      );
      this.paginator.length = this.medicos.total;
    });
  }

  public deleteMedico(id: number) {
    this.sweetAlertService
      .opensweetalertdelete('¿Estas seguro de eliminar este empleado?')
      .subscribe((result: any) => {
        if (result) {
          this.medicoService.deleteDoctor(id).subscribe(() => {
            this.sweetAlertService.opensweetalertsuccess(
              'El empleado ha sido eliminado con exito'
            );
            this.getMedicos();
          });
        }
      });
  }

  public openEditMedicoDialog(medico: Medico) {
    const dialogRef = this.dialog.open(MedicosFormComponent, {
      width: '600px',
      data: { medico },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMedicos();
    });
  }

  public openAddMedicoDialog() {
    const dialogRef = this.dialog.open(MedicosFormComponent, {
      width: '40%',
      height: '100%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getMedicos();
    });
  }

  public openStanbyMedicoDialog() {
    const dialogRef = this.dialog.open(MedicosStandbyListComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMedicos();
    });
  }
}
