import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import {
  BaseResponseMedico,
  Medico,
} from 'src/app/Core/Models/users/medico.models';
import { EstatusService } from 'src/app/Core/Service/Auth/Common/estatus.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-medicos-standby-list',
  templateUrl: './medicos-standby-list.component.html',
  styleUrls: ['./medicos-standby-list.component.scss'],
})
export class MedicosStandbyListComponent implements OnInit {
  public medicos!: BaseResponseMedico;
  public dataSource: any;
  public rol: string = '';
  public isLoading!: boolean;

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'email',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private medicoService: DoctorService,
    private statusService: EstatusService,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getMedicos();
    this.rol = localStorage.getItem('rol') as string;
  }

  public getMedicos(pageNo: number = 0, pageSize: number = 5) {
    this.isLoading = true;
    this.medicoService
      .getStandbyDoctorsPaged(pageNo, pageSize)
      .subscribe((data) => {
        this.isLoading = false;
        this.medicos = data;
        this.dataSource = new MatTableDataSource<Medico>(
          this.medicos.medicosEnEsperaProjections
        );
        this.paginator.length = this.medicos.total;
    });
  }

  public updateStatus(email: string, estatus: string) {
    const status: Estatus = {
      email: email,
      estatus: estatus,
    } as Estatus;

    this.SweetAlertService.opensweetalertwarning(
      '¿Estas seguro de actualizar el estatus del medico?'
    ).subscribe((result) => {
      if (result) {
        this.statusService.put(status).subscribe(
          () => {
            this.SweetAlertService.opensweetalertsuccess(
              'El estatus del medico ha sido actualizado con exito'
            );
            this.getMedicos();
          },
          (error) => {
            this.SweetAlertService.opensweetalertsuccess(
              'Ha ocurrido un error al actualizar el estatus del medico'
            );
            this.getMedicos();
          }
        );
      }
    });
  }
}
