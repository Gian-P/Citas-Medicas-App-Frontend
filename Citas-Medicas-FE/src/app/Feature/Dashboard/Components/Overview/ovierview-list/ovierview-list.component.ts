import { Component, OnInit } from '@angular/core';
import { AdminService } from "src/app/Core/Service/Admin/admin.service";

@Component({
  selector: 'app-ovierview-list',
  templateUrl: './ovierview-list.component.html',
  styleUrls: ['./ovierview-list.component.scss'],
})
export class OvierviewListComponent implements OnInit {
  public isLoading: boolean = false;
  public totalVariables = {
    totalAdmins: 0,
    totalMedicos: 0,
    totalAdminsEnEspera: 0,
    totalMedicosEnEspera: 0,
    totalPacientes: 0,
    totalCitas: 0,
    totalCitasEnEspera: 0,
  };

  public cards: Cards[] = [
    {
      title: 'Admins',
      image: '../../../../../../assets/img/admin-nc.svg',
      records: 0,
      total: this.totalVariables.totalAdmins,
      ruta: '/dashboard/administradores/list',
    },

    {
      title: 'Medicos',
      image: '../../../../../../assets/img/medicos-nc.svg',
      records: 10,
      total: this.totalVariables.totalMedicos,
      ruta: '/dashboard/medicos/list',
    },

    {
      title: 'Pacientes',
      image: '../../../../../../assets/img/pacientes-nc.svg',
      records: 100,
      total: this.totalVariables.totalPacientes,
      ruta: '/dashboard/pacientes/list',
    },

    {
      title: 'Admins en espera',
      image: '../../../../../../assets/img/admin-espera-nc.svg',
      records: 100,
      total: this.totalVariables.totalAdminsEnEspera,
      ruta: '/dashboard/administradores/list',
    },

    {
      title: 'Medicos en espera',
      image: '../../../../../../assets/img/medicos-espera-nc.svg',
      records: 100,
      total: this.totalVariables.totalMedicosEnEspera,
      ruta: '/dashboard/medicos/list',
    },
  ];

  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getTotalVariables();
  }

  getTotalVariables() {
    this.AdminService.totalNotInStandByAdmins().subscribe((data) => {
      this.isLoading = false;
      this.cards[0].total = data;
    });

    this.AdminService.totalMedicosNotInStandBy().subscribe((data) => {
      this.cards[1].total = data;
    });

    this.AdminService.totalPacientes().subscribe((data) => {
      this.cards[2].total = data;
    });

    this.AdminService.totalStandByAdmins().subscribe((data) => {
      this.cards[3].total = data;
    });

    this.AdminService.totalStandByMedicos().subscribe((data) => {
      this.cards[4].total = data;
    });

    this.AdminService.totalNotInStandByCitas().subscribe((data) => {
      this.totalVariables.totalCitas = data;
    });

    this.AdminService.totalStandByCitas().subscribe((data) => {
      this.totalVariables.totalCitasEnEspera = data;
    });
  }
}

export interface Cards {
  title: string;
  image: string;
  records: number;
  total: number
  ruta: string;
}
