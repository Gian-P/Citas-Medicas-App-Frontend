import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { CitasFormComponent } from '../citas-form/citas-form.component';
import { CitasStandbyListComponent } from '../citas-standby-list/citas-standby-list.component';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss'],
})
export class CitasListComponent implements OnInit {
  public citas: Citas[] = [];
  public dataSource: any;
  public rol: string = '';

  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'fechaDesde',
    'fechaHasta',
    'googleMeet',
    'estado',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private citasService: CitaService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string;
    this.getCitas(0, 10);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCitas(pageNo: number, pageSize: number) {

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
    this.citasService
      .getCitasByPaciente(id, pageNo, pageSize)
      .subscribe((data) => {
        console.log(data);
        this.citas = data;
        this.dataSource = new MatTableDataSource<Citas>(this.citas);
      });
      this.paginator.length = this.citas.length;
  }

  public getCitasByMedicoId(id: number, pageNo: number, pageSize: number) {
    this.citasService
      .getStandByCitasDoctor(id, pageNo, pageSize)
      .subscribe((data) => {
        this.citas = data;
        this.dataSource = new MatTableDataSource<Citas>(this.citas);
      });
  }

  public addCreateDialog() {
    this.dialog.open(CitasFormComponent);
  }

  public openStandbyDialog() {
    const dialogRef = this.dialog.open(CitasStandbyListComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCitas(0, 30);
    });
  }
}
