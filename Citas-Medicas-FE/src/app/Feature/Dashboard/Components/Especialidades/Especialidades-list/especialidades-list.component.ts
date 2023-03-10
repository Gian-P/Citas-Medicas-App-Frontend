import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { EspecialidadesFormComponent } from '../Especialidades-form/especialidades-form.component';

@Component({
  selector: 'app-especialidades-list',
  templateUrl: './especialidades-list.component.html',
  styleUrls: ['./especialidades-list.component.scss'],
})
export class EspecialidadesListComponent implements OnInit {
  especialidades: especialidad[] = [];
  public dataSource: any;

  displayedColumns: string[] = ['id', 'tipo', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private especialidadService: EspecialidadService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {
    this.getEspecialidades();
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getEspecialidades() {
    this.especialidadService
      .getEspecialidadesPaged(0, 10)
      .subscribe((especialidades) => {
        this.especialidades = especialidades;
        this.dataSource = new MatTableDataSource<especialidad>(this.especialidades);
      });
  }

  public deleteEspecialidad(id: number) {
    this.sweetAlertService
      .opensweetalertdelete('¿Está seguro de eliminar este elemento?')
      .subscribe((result: any) => {
        if (result) {
          this.especialidadService.deleteEspecialidad(id).subscribe((res) => {
            this.getEspecialidades();
            this.sweetAlertService.opensweetalertsuccess(res);
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
