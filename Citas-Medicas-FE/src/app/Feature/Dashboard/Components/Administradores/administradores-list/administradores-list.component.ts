import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Core/Models/users/users.models';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { AdministradoresFormComponent } from '../administradores-form/administradores-form.component';
import { AdministradoresStandbyListComponent } from '../administradores-standby-list/administradores-standby-list.component';

@Component({
  selector: 'app-administradores-list',
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.scss'],
})
export class AdministradoresListComponent implements OnInit {
  administradores: User[] = [];
  public dataSource: any;

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
    this.getAdministradores();
  }

  ngOnInit(): void {
    this.getAdministradores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAdministradores(): void {
    this.adminService.getAdminsPaged(0, 8).subscribe(
      (res) => {
        this.administradores = res;
        this.dataSource = new MatTableDataSource<User>(this.administradores);
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

  openDialogUpdate(admin: User): void {
    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '50%',
      data: admin,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores();
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores();
      }
    });
  }

  openDialogStandbyList(): void {
    const dialogRef = this.dialog.open(AdministradoresStandbyListComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdministradores();
      }
    });
  }

  openDialogRolCreate(): void {
    // aqui va la funcionalidad para crear un rol. guiate por el metodo openDialogCreate()

    const dialogRef = this.dialog.open(AdministradoresFormComponent, {
      width: '40%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('done');
    });
  }
}
