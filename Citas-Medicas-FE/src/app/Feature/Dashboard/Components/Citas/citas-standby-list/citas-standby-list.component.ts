import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { CitasFormMeetComponent } from '../citas-form-meet/citas-form-meet.component';
import { BaseResponseCitas } from '../../../../../Core/Models/citas/citas.models';

@Component({
  selector: 'app-citas-standby-list',
  templateUrl: './citas-standby-list.component.html',
  styleUrls: ['./citas-standby-list.component.scss'],
})
export class CitasStandbyListComponent implements OnInit {
  public citas!: BaseResponseCitas;
  public dataSource: any;
  public rol: string = '';

  public myObserver = {

    next: (data:any) => {
      this.citas = data;
      this.dataSource = new MatTableDataSource<Citas>(
        this.citas.citasPorMedicoProjections
      );
    },

    error: (err: any) => {
      this.sweetAlertService.opensweetalerterror(err.error.message);
      this.close();
    },

    complete: () => {

    },

  };

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'fechaDesde',
    'fechaHasta',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private citasService: CitaService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string;
    this.getCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCitas(pageNo: number = 0, pageSize: number = 10) {
    if (this.rol === 'Medico') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByMedicoId(id, pageNo, pageSize);
    }
  }

  public getCitasByMedicoId(id: number, pageNo: number, pageSize: number) {
    this.citasService.getStandByCitasDoctor(id, pageNo, pageSize).subscribe(this.myObserver);
  }

  public cancelarCita(id: number) {
    const estatus: Estatus = {
      estatus: 'RECHAZADA',
    } as Estatus;

    this.sweetAlertService
      .opensweetalertwarning('¿Está seguro que desea cancelar la cita?')
      .subscribe((result) => {
        if (result) {
          this.citasService.cambiarEstatusCita(id, estatus).subscribe(
            (data) => {
              this.sweetAlertService.opensweetalertsuccess(
                'Cita cancelada exitosamente'
              );
              this.getCitas(0, 10);
            },
            (error) => {
              this.sweetAlertService.opensweetalerterror(
                'Error al cancelar la cita'
              );
            }
          );
        }
      });
  }

  public aceptarCita(id: number) {
    this.dialog.open(CitasFormMeetComponent, {
      width: 'auto',
      data: id,
    });
  }

  public close() {
    this.dialog.closeAll();
  }
}
