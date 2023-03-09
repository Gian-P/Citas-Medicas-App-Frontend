import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/Core/Models/citas/citas.models';
import { CitaService } from 'src/app/Core/Service/Citas/citas.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss']
})


export class CitasListComponent implements OnInit {
  public citas: Citas[] = []

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'fechaDesde', 'fechaHasta'];
  dataSource = new MatTableDataSource<Citas>(this.citas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private citasService: CitaService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getCitas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCitas() {
    let rol = localStorage.getItem('rol');

    if (rol === 'Paciente') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByPacienteId(id);
    }

    if(rol === 'Medico'){
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByMedicoId(id);
    }
  }

  public getCitasByPacienteId(id: number) {
    this.citasService.getCitasByPaciente(id, 0, 10).subscribe((res: any) => {
      this.citas = res;
    });
  }

  public getCitasByMedicoId(id: number) {
    this.citasService.getStandByCitasDoctor(id, 0, 10).subscribe((res: any) => {
      this.citas = res;
    });
  }

  public getStandByMedicosCitas(id: number){
    this.citasService.getStandByCitasDoctor(id, 0, 10).subscribe((res: any) => {
      this.citas = res;
    }, (err) => {
      this.sweetAlertService.opensweetalerterror(err.error ? err.error : 'Error al obtener las citas');
    });
  }

  public getStandByPacientesCitas(id: number){
    this.citasService.getStandByCitasPaciente(id, 0, 10).subscribe((res: any) => {
      this.citas = res;
    }, (err) => {
      this.sweetAlertService.opensweetalerterror(err.error ? err.error : 'Error al obtener las citas');
    });
  }
}


