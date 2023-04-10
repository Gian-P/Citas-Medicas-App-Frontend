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
      total: this.totalVariables.totalAdmins,
      ruta: '/dashboard/administradores/list',
    },

    {
      title: 'Medicos',
      image: '../../../../../../assets/img/medicos-nc.svg',
      total: this.totalVariables.totalMedicos,
      ruta: '/dashboard/medicos/list',
    },

    {
      title: 'Pacientes',
      image: '../../../../../../assets/img/pacientes-nc.svg',
      total: this.totalVariables.totalPacientes,
      ruta: '/dashboard/pacientes/list',
    },

    {
      title: 'Admins en espera',
      image: '../../../../../../assets/img/admin-espera-nc.svg',
      total: this.totalVariables.totalAdminsEnEspera,
      ruta: '/dashboard/administradores/list',
    },

    {
      title: 'Medicos en espera',
      image: '../../../../../../assets/img/medicos-espera-nc.svg',
      total: this.totalVariables.totalMedicosEnEspera,
      ruta: '/dashboard/medicos/list',
    },

    {
      title: 'Citas',
      image: '../../../../../../assets/img/citas-nc.svg',
      total: this.totalVariables.totalCitas,
      ruta: '',
    },

    {
      title: 'Citas en espera',
      image: '../../../../../../assets/img/citas-espera-nc.svg',
      total: this.totalVariables.totalCitasEnEspera,
      ruta: '',
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
      this.cards[5].total = data;
    });

    this.AdminService.totalStandByCitas().subscribe((data) => {
      this.cards[6].total = data;
    });
  }
}

export interface Cards {
  title: string;
  image: string;
  total: number
  ruta: string;
}
