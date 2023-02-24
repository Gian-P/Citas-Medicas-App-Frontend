import { Component, OnInit } from '@angular/core';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  displayedColumns: string[] = ['idEspecialidades', 'tipo'];
  especialidades: especialidad[] = [];

  constructor(private _especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getEspecialidadesPaginadas(1);
  }

  public getEspecialidadesPaginadas(page:number, pageSize:number=10): any {
    this._especialidadService.getEspecialidadesPaged(page, pageSize).subscribe((res: any) => {
      this.especialidades = res.data;
    });
  }

  public onPageChange(event: any): void {
    this.getEspecialidadesPaginadas(event.pageIndex, event.pageSize);
  }
}
