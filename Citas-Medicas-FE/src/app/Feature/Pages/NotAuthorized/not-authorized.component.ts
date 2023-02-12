import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {
  currentDate = new Date();
  month = this.currentDate.toLocaleString('default', { month: 'long' });
  year = this.currentDate.getFullYear();
  weeks = [];

  constructor() {
    this.generateCalendar();
  }

  ngOnInit(): void {}

  generateCalendar() {
    const daysInMonth = new Date(this.year, this.currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.year, this.currentDate.getMonth(), 1).getDay();

    let currentWeek = [];
    let currentDay = 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          currentWeek.push('');
        } else if (currentDay > daysInMonth) {
          return;
        } else {
          currentWeek.push(currentDay);
          currentDay++;
        }
      }
      currentWeek = [];
    }
  }

  nextMonth() {
    this.currentDate = new Date(this.year, this.currentDate.getMonth() + 1, 1);
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear();
    this.weeks = [];
    this.generateCalendar();
  }

  previousMonth() {
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear();
    this.weeks = [];
    this.generateCalendar();
  }
}
