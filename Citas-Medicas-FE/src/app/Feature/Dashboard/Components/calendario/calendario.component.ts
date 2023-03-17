import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    /*
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];

  activeDayIsOpen: boolean = true;

  constructor(private citasService: CitaService) {}

  ngOnInit(): void {
    this.getCitas();
  }

  public getCitas() {
    let rol = localStorage.getItem('rol');

    if (rol === 'Cliente') {
      let id = parseInt(localStorage.getItem('id') || '0');
      this.getCitasByPacienteId(id);
    }

    if (rol === 'Medico') {
      let id = parseInt(localStorage.getItem('id') || '0');
      //this.getCitasByMedicoId(id);
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

    for(const cita of this.citas){
      this.events.push({
        title: `Cita de ${cita.nombre} desde ${cita.fechaDesde} hasta ${cita.fechaHasta}`,
        start: new Date(cita.fechaDesde),
        end: new Date(cita.fechaHasta),
        color: colors[utilityColors[this.index]],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      });
      this.index += 1;
    }
    this.events = [
      ...this.events
    ]
/*
    this.events = [
      ...this.events,
      {
        title: 'Cita de {{this.cita}}',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    
*/
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
