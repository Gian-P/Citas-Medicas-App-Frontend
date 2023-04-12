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
  public dataSource = new MatTableDataSource<Citas>([]);
  public rol: string = '';
  public isLoading: boolean = true;

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'fechaDesde',
    'fechaHasta',
    'modalidad',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private citasService: CitaService,
    private sweetAlertService: SweetAlertService
  ) {
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
    this.getCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCitas(pageNo: number = 0, pageSize: number = 5) {
    if (this.rol === 'Medico') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByMedicoId(id, pageNo, pageSize);
    }
  }

  public getCitasByMedicoId(id: number, pageNo: number, pageSize: number) {
    this.rol = localStorage.getItem('rol') as string;
    this.citasService.getStandByCitasDoctor(id, pageNo, pageSize).subscribe((data) => {
      this.isLoading = false;
      this.citas = data;
      this.dataSource.data = this.citas.citasPorMedicoProjections;

      if(this.paginator){
        this.paginator.length = this.citas.total;
      }
    }, (error) => {
      this.isLoading = false;
      this.sweetAlertService.opensweetalerterror('Error al obtener las citas');
    });
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
              this.getCitas();
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

  public aceptarCita(cita: Citas) {
    this.dialog.open(CitasFormMeetComponent, {
      width: 'auto',
      data: cita,
    }).afterClosed().subscribe(() => {
      this.getCitas();
    });
  }

  public close() {
    this.dialog.closeAll();
  }
}
