import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Estatus } from 'src/app/Core/Models/estatus.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { EstatusService } from 'src/app/Core/Service/Auth/Common/estatus.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-medicos-standby-list',
  templateUrl: './medicos-standby-list.component.html',
  styleUrls: ['./medicos-standby-list.component.scss'],
})
export class MedicosStandbyListComponent implements OnInit {
  public medicos: User[] = [];

  constructor(
    private medicoService: DoctorService,
    private statusService: EstatusService,
    private dialog: MatDialog,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getMedicos();
  }

  public getMedicos() {
    this.medicoService.getStandbyDoctorsPaged(0, 10).subscribe((data) => {
      this.medicos = data;
    });
  }

  public updateStatus(email: string, estatus: string) {
    const status: Estatus = {
      email: email,
      estatus: estatus,
    } as Estatus;

    this.SweetAlertService.opensweetalertwarning(
      '¿Estas seguro de actualizar el estatus del medico?'
    ).subscribe((result) => {
      if (result) {
        this.statusService.put(status).subscribe(
          () => {
            this.SweetAlertService.opensweetalertsuccess(
              'El estatus del medico ha sido actualizado con exito'
            );
            this.getMedicos();
          },
          (error) => {
            this.SweetAlertService.opensweetalertsuccess(
              'El estatus del medico ha sido actualizado con exito'
            );
            this.getMedicos();
          }
        );
      }
    });
  }
}
