import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Core/Models/users/users.models';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';
import { MedicosFormComponent } from '../medicos-form/medicos-form.component';
import { MedicosStandbyListComponent } from '../medicos-standby-list/medicos-standby-list.component';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.scss'],
})
export class MedicosListComponent implements OnInit {
  public medicos: User[] = [];

  constructor(
    private medicoService: DoctorService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getMedicos();
  }

  public getMedicos() {
    this.medicoService.getDoctorsPaged(0, 10).subscribe((data) => {
      this.medicos = data;
      console.log(data);
    });
  }

  public deleteMedico(id: number) {
    this.sweetAlertService.opensweetalertdelete('¿Estas seguro de eliminar este empleado?')
    .subscribe((result : any) => {
      if (result) {
        this.medicoService.deleteDoctor(id).subscribe(() => {
          this.sweetAlertService.opensweetalertsuccess('El empleado ha sido eliminado con exito');
          this.getMedicos();
        });
      }
    });
  }

  public openEditMedicoDialog(medico: User) {
    const dialogRef = this.dialog.open(MedicosFormComponent, {
      width: '600px',
      data: { medico },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMedicos();
    });
  }

  public openAddMedicoDialog() {
    const dialogRef = this.dialog.open(MedicosFormComponent, {
      width: '40%',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getMedicos();
    });
  }

  public openStanbyMedicoDialog() {
    const dialogRef = this.dialog.open(MedicosStandbyListComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMedicos();
    });
  }
}
