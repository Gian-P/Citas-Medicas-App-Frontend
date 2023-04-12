import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  BaseResponseEspecialidades,
  especialidad,
} from 'src/app/Core/Models/especialidades/especialidades.models';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { EspecialidadesFormComponent } from '../Especialidades-form/especialidades-form.component';

@Component({
  selector: 'app-especialidades-list',
  templateUrl: './especialidades-list.component.html',
  styleUrls: ['./especialidades-list.component.scss'],
})
export class EspecialidadesListComponent implements OnInit {
  especialidades!: BaseResponseEspecialidades;
  public dataSource = new MatTableDataSource<especialidad>([]);
  public isLoading = false;
  public rol: string = '';

  displayedColumns: string[] = ['id', 'tipo', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private especialidadService: EspecialidadService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getEspecialidades(pageNo: number = 0, pageSize: number = 10) {
    this.isLoading = true;
    this.especialidadService.getEspecialidadesPaged(pageNo, pageSize).subscribe(
      (especialidades) => {
        this.isLoading = false;
        this.especialidades = especialidades;
        this.dataSource.data = this.especialidades.especialidadesProjection;

        if (this.paginator) {
          this.paginator.length = this.especialidades.total;
        }
      },
      (error) => {
        this.isLoading = false;
        this.sweetAlertService.opensweetalerterror("Error al cargar los datos");
      }
    );
  }

  public deleteEspecialidad(id: number) {
    this.sweetAlertService
      .opensweetalertdelete('¿Está seguro de eliminar este elemento?')
      .subscribe((result: any) => {
        if (result) {
          this.especialidadService.deleteEspecialidad(id).subscribe((res) => {
            this.getEspecialidades();
            this.sweetAlertService.opensweetalertsuccess(res);
          }, (err) => {
            this.sweetAlertService.opensweetalerterror(
              'No se puede eliminar la especialidad porque está siendo utilizada.'
            );
          });
        }
      });
  }

  openDialogUpdate(especialidad: especialidad) {
    this.dialog.open(EspecialidadesFormComponent, { data: especialidad });

    this.dialog.afterAllClosed.subscribe(() => {
      this.getEspecialidades();
    });
  }

  openDialogCreate() {
    this.dialog.open(EspecialidadesFormComponent);

    this.dialog.afterAllClosed.subscribe(() => {
      this.getEspecialidades();
    });
  }
}
