import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { AdministradoresFormComponent } from '../administradores-form/administradores-form.component';
import { AdministradoresStandbyListComponent } from '../administradores-standby-list/administradores-standby-list.component';
import {
  BaseResponseAdministrador,
  Administrador,
} from '../../../../../Core/Models/users/administrador.models';

@Component({
  selector: 'app-administradores-list',
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.scss'],
})
export class AdministradoresListComponent implements OnInit {
  administradores!: BaseResponseAdministrador;
  public dataSource: any;
  public rol: string = '';

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
    private adminService: AdminService,
    private dialog: MatDialog,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getAdministradores(0, 8);
    this.rol = localStorage.getItem('rol') as string;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAdministradores(pageNo: number, pageSize: number): void {
    this.adminService.getAdminsPaged(pageNo, pageSize).subscribe(
      (res) => {
        this.administradores = res;
        this.dataSource = new MatTableDataSource<Administrador>(
          this.administradores.administradoresProjection
        );
        this.paginator.length = this.administradores.total;
      },
      (err) => {
        this.sweetAlert.opensweetalerterror(
          'Error al obtener los administradores'
        );
      }
    );
  }

  deleteAdmin(id: number): void {
    this.sweetAlert
      .opensweetalertdelete('¿Estás seguro de realizar esta acción?')
      .subscribe((res) => {
        if (res) {
          this.adminService.deleteAdmin(id).subscribe(
            (res) => {
              this.sweetAlert.opensweetalertsuccess(
                'Administrador eliminado correctamente'
              );
              this.getAdministradores(0, 10);
            },
            (err) => {
              this.sweetAlert.opensweetalerterror(
                'Error al eliminar el administrador'
              );
            }
          );
        }
      });
  }

  openDialogUpdate(admin: Administrador): void {
    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '50%',
      data: admin,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores(0, 10);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores(0, 10);
      }
    });
  }

  openDialogStandbyList(): void {
    const dialogRef = this.dialog.open(AdministradoresStandbyListComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores(0, 10);
      }
    });
  }

  openDialogRolCreate(): void {

    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '40%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('done');
    });
  }
}
