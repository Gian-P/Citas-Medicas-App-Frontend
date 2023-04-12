import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  BaseResponseCitas,
  Citas,
} from 'src/app/Core/Models/citas/citas.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { CitasFormComponent } from '../citas-form/citas-form.component';
import { CitasStandbyListComponent } from '../citas-standby-list/citas-standby-list.component';
import { InputNotasComponent, notas } from "../input-notas/input-notas.component";

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss'],
})
export class CitasListComponent implements OnInit {
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
    'googleMeet',
    'notas',
    'modalidad',
    'estado',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private citasService: CitaService) {
    this.rol = localStorage.getItem('rol') as string;
  }

  ngOnInit(): void {
    this.getCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCitas(pageNo: number = 0, pageSize: number = 10) {
    if (this.rol === 'Cliente') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByPacienteId(id, pageNo, pageSize);
    }

    if (this.rol === 'Medico') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByMedicoId(id, pageNo, pageSize);
    }
  }

  public getCitasByPacienteId(id: number, pageNo: number, pageSize: number) {
    this.isLoading = true;
    this.citasService.getCitasByPaciente(id, pageNo, pageSize).subscribe(
      (data) => {
        this.isLoading = false;
        this.citas = data;
        this.dataSource.data = this.citas.citasPorPacienteProjection;

        if (this.paginator) {
          this.paginator.length = this.citas.total;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  public getCitasByMedicoId(id: number, pageNo: number, pageSize: number) {
    this.isLoading = true;
    this.citasService.getCitasByDoctor(id, pageNo, pageSize).subscribe(
      (data) => {
        this.isLoading = false;
        this.citas = data;
        this.dataSource.data = this.citas.citasPorMedicoProjections;

        if (this.paginator) {
          this.paginator.length = this.citas.total;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  public addCreateDialog() {
    this.dialog.open(CitasFormComponent);
  }

  public openNotasDialog(citas: Citas){
    const notas: notas = {
      notas: citas.notas,
      idCita: citas.idCita
    };

    this.dialog.open(InputNotasComponent, {data:notas}).afterClosed().subscribe(() => {
      this.getCitas();
    });
  }


  public openStandbyDialog() {
    const dialogRef = this.dialog.open(CitasStandbyListComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCitas();
    });
  }
}
