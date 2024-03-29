import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import {
  Administrador,
  BaseResponseAdministrador,
} from 'src/app/Core/Models/users/administrador.models';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { EstatusService } from 'src/app/Core/Service/Auth/Common/estatus.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-administradores-standby-list',
  templateUrl: './administradores-standby-list.component.html',
  styleUrls: ['./administradores-standby-list.component.scss'],
})
export class AdministradoresStandbyListComponent implements OnInit {
  public administradores!: BaseResponseAdministrador;
  public dataSource = new MatTableDataSource<Administrador>([]);
  public isLoading: boolean = true;

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'email',
    'numeroTelefono',
    'acciones',
  ];

  constructor(
    private adminService: AdminService,
    private statusService: EstatusService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getAdministradores();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public getAdministradores(pageNo: number = 0, pageSize: number = 5) {
    this.adminService.getStandbyAdminPaged(pageNo, pageSize).subscribe(
      (data) => {
        this.isLoading = false;
        this.administradores = data;
        this.dataSource.data = this.administradores.administradoresEnEsperaProjection;

        if (this.paginator) {
          this.paginator.length = this.administradores.total;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  public updateStatus(email: string, estatus: string) {
    const status: Estatus = {
      email: email,
      estatus: estatus,
    } as Estatus;

    this.sweetAlertService
      .opensweetalertwarning(
        '¿Estas seguro de actualizar el estatus del administrador?'
      )
      .subscribe((result: any) => {
        if (result) {
          this.statusService.put(status).subscribe(
            () => {
              this.sweetAlertService.opensweetalertsuccess(
                'El estatus del administrador ha sido actualizado con exito'
              );
              this.getAdministradores();
            },
            (error: any) => {
              this.sweetAlertService.opensweetalertsuccess(
                'El estatus del administrador ha sido actualizado con exito'
              );
              this.getAdministradores();
            }
          );
        }
      });
  }
}
