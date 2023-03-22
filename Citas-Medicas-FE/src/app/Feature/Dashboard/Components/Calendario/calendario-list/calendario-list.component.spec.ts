import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioListComponent } from './calendario-list.component';

describe('CalendarioListComponent', () => {
  let component: CalendarioListComponent;
  let fixture: ComponentFixture<CalendarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
