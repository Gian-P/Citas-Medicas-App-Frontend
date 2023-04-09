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
import { AdministradoresUpdateFormComponent } from '../administradores-update-form/administradores-update-form.component';

@Component({
  selector: 'app-administradores-list',
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.scss'],
})
export class AdministradoresListComponent implements OnInit {
  public administradores!: BaseResponseAdministrador;
  public dataSource = new MatTableDataSource<Administrador>([]);
  public isLoading = false;
  public rol: string = ''

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
  ) {
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
    this.getAdministradores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAdministradores(pageNo: number = 0, pageSize: number = 10) {
    this.isLoading = true;
    this.adminService.getAdminsPaged(pageNo, pageSize).subscribe(
      (res) => {
        this.isLoading = false;
        this.administradores = res;
        this.dataSource.data = this.administradores.administradoresProjection;

        if(this.paginator){
          this.paginator.length = this.administradores.total;
        }
      },
      (err) => {
        this.isLoading = false;
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
              this.getAdministradores();
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
    const dialogRef = this.dialog.open(AdministradoresUpdateFormComponent, {
      width: 'auto',
      data: admin,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAdministradores();
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores();
      }
    });
  }

  openDialogStandbyList(): void {
    const dialogRef = this.dialog.open(AdministradoresStandbyListComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores();
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
