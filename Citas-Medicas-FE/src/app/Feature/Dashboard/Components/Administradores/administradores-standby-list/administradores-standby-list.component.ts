import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { EstatusService } from 'src/app/Core/Service/Auth/Common/estatus.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-administradores-standby-list',
  templateUrl: './administradores-standby-list.component.html',
  styleUrls: ['./administradores-standby-list.component.scss']
})
export class AdministradoresStandbyListComponent implements OnInit {
  public administradores: User[] = [];

  constructor(
    private adminService: AdminService,
    private statusService: EstatusService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getAdministradores();
  }

  public getAdministradores() {
    this.adminService.getStandbyAdminPaged(0, 5).subscribe((data) => {
      this.administradores = data;
    });
  }

  public updateStatus(email: string, estatus: string) {
    const status: Estatus = {
      email: email,
      estatus: estatus,
    } as Estatus;

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
  }
}
