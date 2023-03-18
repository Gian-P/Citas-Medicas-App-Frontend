import {
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CitaService } from '../../../../Core/Service/Citas/citas.service';
import { OnInit } from '@angular/core';
import { Citas } from '../../../../Core/Models/citas/citas.models';

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
};

const utilityColors: string[] = ['red', 'blue', 'yellow'];

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
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  public citas: Citas[] = [];

  index: number = 0;

  idCita: number = 0;

  rol = localStorage.getItem('rol');

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [

    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event.id);
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.citasService.deleteCitas(event.id!).subscribe((resp) => {
          console.log(resp)
        });
        this.handleEvent('Deleted', event);
      },
    },

    /*
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },*/
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private citasService: CitaService) {}

  ngOnInit(): void {
    this.getCitas();
  }

  public getCitas() {
    if (this.rol === 'Cliente') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByPacienteId(id);
    }
  }

  public getCitasByPacienteId(id: number) {
    this.citasService.getCitasByPaciente(id, 0, 10).subscribe((data) => {
      this.citas = data;
      this.addEvent();
      console.log(this.citas);
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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    /*
    > new Date().toLocaleString()
    > "11/10/2016, 11:49:36 AM"
    */
    for (const cita of this.citas) {
      this.events.push({
        title: `Cita de <strong>${
          cita.nombre
        }</strong> desde las horas <strong>${cita.fechaDesde
          .toString()
          .substring(11, 19)}</strong> hasta las horas <strong>${cita.fechaHasta
          .toString()
          .substring(11, 19)}</strong>`,
        start: new Date(cita.fechaDesde.toLocaleString()),
        end: new Date(cita.fechaHasta.toLocaleString()),
        color: colors[utilityColors[this.index]],
        actions: this.actions,
        id: cita.idCita,
      });
      this.index += 1;
    }
    this.events = [...this.events];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
