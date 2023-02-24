import { Component, OnInit } from '@angular/core';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';

@Component({
  selector: 'app-especialidades-list',
  templateUrl: './especialidades-list.component.html',
  styleUrls: ['./especialidades-list.component.scss']
})
export class EspecialidadesListComponent implements OnInit {
  especialidades: especialidad[] = [];

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidadesPaged(0, 10).subscribe(especialidades => {
      this.especialidades = especialidades;
      console.log(especialidades);
    });
  }
}
