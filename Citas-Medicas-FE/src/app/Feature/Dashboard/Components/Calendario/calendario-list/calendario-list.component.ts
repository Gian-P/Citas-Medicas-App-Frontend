import { Component } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CitaService } from '../../../../../Core/Service/Citas/citas.service';
import { OnInit } from '@angular/core';
import { BaseResponseCitas, Citas } from '../../../../../Core/Models/citas/citas.models';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioFormUpdateComponent } from '../calendario-form-update/calendario-form-update.component';
import { SweetAlertService } from '../../../../../Miscelaneo/SweetAlert/sweet-alert.service';
import { CitaModificada } from 'src/app/Core/Models/calendario/citaModificada.models';

const colors: Record<string, EventColor> = {
  /* el color red se utiliza para las citas que han sido eliminadas */
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  /* el color blue se utiliza para las citas que han sido aprobadas */
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  /* el color yellow se utiliza para las citas que estan en espera de ser aprobadas */
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },

  expire: {
    primary: '#C0C0C0',
    secondary: '#C0C0C0',
  },
};

@Component({
  selector: 'app-calendario',
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  styleUrls: ['./calendario-list.component.scss'],
  templateUrl: './calendario-list.component.html',
})
export class CalendarioListComponent implements OnInit {
  citas!: BaseResponseCitas;

  CurrentProjections: Citas[] = [];

  locale: string = 'es';

  rol = localStorage.getItem('rol');

  id = parseInt(localStorage.getItem('id') || '0');

  PopUpElement: any;
  ModifyIcon: any;
  DeleteIcon: any;
  GoogleMeetIcon: any;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  patientActions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openModifyDialog(event);
      },
    },

    {
      label:
        "<img src='../../../../../../assets/img/meetImg.png' class= 'mb-1 ms-2'>",
      a11yLabel: 'googleMeet',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        window.open(event.googleMeetLink, '_blank');
      },
    },
  ];

  DoctorActions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openModifyDialog(event);
      },
    },

    {
      label: '<i class="fas fa-fw fa-trash-alt ms-1"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openDeleteDialog(event);
      },
    },

    {
      label:
        "<img src='../../../../../../assets/img/meetImg.png' class= 'mb-1 ms-2'>",
      a11yLabel: 'googleMeet',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        window.open(event.googleMeetLink, '_blank');
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  Observable = {
    next: (data: BaseResponseCitas) => {
      this.events = [];
      this.citas = data;
      this.addEvent();
    },

    error: (err: Error) => {
      this.sweetAlertService.opensweetalertinfo(
        'Actualmente usted no tiene citas.'
      );
    },

    complete: () => {},
  };

  constructor(
    private citaService: CitaService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    registerLocaleData(localeEs);
    this.getCitas();
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    if (!this.activeDayIsOpen) return;

    this.PopUpElement = document.getElementsByClassName('cal-open-day-events');
    this.ModifyIcon = document.getElementsByClassName('fa-pencil-alt');
    this.DeleteIcon = document.getElementsByClassName('fa-trash-alt');
    this.GoogleMeetIcon = document.getElementsByClassName('googleMeet');

    setTimeout(() => {
      for (let element of this.PopUpElement) {
        this.setPopUpElementColor(element);
      }

      for (let element of this.ModifyIcon) {
        this.setIconElementColor(element);
      }

      for (let element of this.DeleteIcon) {
        this.setIconElementColor(element);
      }

      for (let element of this.GoogleMeetIcon) {
        this.setIconElementColor(element);
      }
    }, 0);
  }

  getCitas() {

    if (this.rol === 'Cliente') {
      this.getCitasByPacienteId(this.id);
    }

    else if (this.rol === 'Medico') {
      this.getCitasByMedicoId(this.id);
    }
  }

  getCitasByPacienteId(id: number) {
    this.citaService.getCitasByPaciente(id, 0, 25).subscribe(this.Observable);
  }

  getCitasByMedicoId(id: number) {
    this.citaService.getCitasByDoctor(id, 0, 25).subscribe(this.Observable);
  }

  deleteCitaPaciente() {
    this.citaService
      .deleteCitas(localStorage.getItem('idCita') || 0)
      .subscribe(() => {
        this.sweetAlertService.opensweetalertsuccess(
          'La cita ha sido eliminada satisfactoriamente.'
        );
        this.activeDayIsOpen = false;
        this.getCitas();
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  addEvent(): void {
    this.getCurrentProjections();
    for (const cita of this.CurrentProjections) {
      if (cita.estatus !== 'ACEPTADA') continue;
      this.events.push({
        title: `Cita con el ${
          this.rol === 'Cliente' ? 'medico' : 'paciente'
        } <strong>${
          cita.nombre
        }</strong> desde las horas <strong>${cita.fechaDesde
          .toString()
          .substring(11, 19)}</strong> hasta las horas <strong>${cita.fechaHasta
          .toString()
          .substring(11, 19)}</strong>`,
        start: new Date(cita.fechaDesde.toLocaleString()),
        end: new Date(cita.fechaHasta.toLocaleString()),
        color: this.calculateHoursDiff(cita.fechaDesde),
        actions:
          this.rol === 'Cliente' ? this.patientActions : this.DoctorActions,
        id: cita.idCita,
        googleMeetLink: cita.googleMeetLink,
      });
    }
    this.events = [...this.events];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openModifyDialog(event: CalendarEvent) {

    localStorage.setItem('idCita', event.id!.toString());
    const dialogRef = this.dialog.open(CalendarioFormUpdateComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.activeDayIsOpen = false;
      this.getCitas();
    });
  }

  openDeleteDialog(event: CalendarEvent) {
    localStorage.setItem('idCita', event.id!.toString());

    this.sweetAlertService
      .opensweetalertdelete(
        `Está a punto de eliminar esta cita, elija la opción que considere.`
      )
      .subscribe((confirm) => {
        if (confirm) {
          this.deleteCitaPaciente();
        }
      });
  }

  setPopUpElementColor(element: any) {
    element.classList.value += ' bg-primary shadow-none';
  }

  setIconElementColor(element: any) {
    element.classList.value += ' text-white link-secondary';
  }

  calculateHoursDiff(citaFechaDesde: Date) {
    const currentTime = new Date();

    const time =
      new Date(citaFechaDesde).valueOf() - new Date(currentTime).valueOf();

    const diffInHours = Math.trunc(time / 1000 / 60 / 60);

    if (diffInHours < 0) return colors['expire'];

    if (diffInHours > 72) {
      return colors['blue'];
    } else if (diffInHours >= 48 && diffInHours <= 72) {
      return colors['yellow'];
    }

    return colors['red'];
  }

  getCurrentProjections(){
    if(this.rol === "Cliente"){
      this.CurrentProjections = this.citas.citasPorPacienteProjection;
    }

    else{
      this.CurrentProjections = this.citas.citasPorMedicoProjections;
    }


  }
}
