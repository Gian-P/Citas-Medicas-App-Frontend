<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import {
  Administrador,
  BaseResponseAdministrador,
} from 'src/app/Core/Models/users/administrador.models';
=======
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { User } from 'src/app/Core/Models/users/users.models';
>>>>>>> 43451d4f57ee6f770560971b1b4165a079a86e84
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { EstatusService } from 'src/app/Core/Service/Auth/Common/estatus.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-administradores-standby-list',
  templateUrl: './administradores-standby-list.component.html',
<<<<<<< HEAD
  styleUrls: ['./administradores-standby-list.component.scss'],
})
export class AdministradoresStandbyListComponent implements OnInit {
  public administradores!: BaseResponseAdministrador;
  public dataSource: any;
  public isLoading!: boolean;

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'email',
    'numeroTelefono',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
=======
  styleUrls: ['./administradores-standby-list.component.scss']
})
export class AdministradoresStandbyListComponent implements OnInit {
  public administradores: User[] = [];
>>>>>>> 43451d4f57ee6f770560971b1b4165a079a86e84

  constructor(
    private adminService: AdminService,
    private statusService: EstatusService,
<<<<<<< HEAD
    private sweetAlertService: SweetAlertService
  ) {}
=======
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) { }
>>>>>>> 43451d4f57ee6f770560971b1b4165a079a86e84

  ngOnInit(): void {
    this.getAdministradores();
  }

<<<<<<< HEAD
  public getAdministradores(pageNo: number = 0, pageSize: number = 5) {
    this.isLoading = true;
    this.adminService
      .getStandbyAdminPaged(pageNo, pageSize)
      .subscribe((data) => {
        this.isLoading = false;
        this.administradores = data;
        console.log(this.administradores);
        this.dataSource = new MatTableDataSource<Administrador>(
          this.administradores.administradoresEnEsperaProjection
        );
        this.paginator.length = this.administradores.total;
      });
=======
  public getAdministradores() {
    this.adminService.getStandbyAdminPaged(0, 5).subscribe((data) => {
      this.administradores = data;
    });
>>>>>>> 43451d4f57ee6f770560971b1b4165a079a86e84
  }

  public updateStatus(email: string, estatus: string) {
    const status: Estatus = {
      email: email,
      estatus: estatus,
    } as Estatus;

<<<<<<< HEAD
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
=======
    this.sweetAlertService.opensweetalertwarning(
      '¿Estas seguro de actualizar el estatus del administrador?'
    ).subscribe((result : any) => {
      if (result) {
        this.statusService.put(status).subscribe(
          () => {
            this.sweetAlertService.opensweetalertsuccess(
              'El estatus del administrador ha sido actualizado con exito'
            );
            this.getAdministradores();
          },
          (error : any) => {
            this.sweetAlertService.opensweetalertsuccess(
              'El estatus del administrador ha sido actualizado con exito'
            );
            this.getAdministradores();
          }
        );
      }
    });
>>>>>>> 43451d4f57ee6f770560971b1b4165a079a86e84
  }
}
