import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioFormDeleteComponent } from './calendario-form-delete.component';

describe('CalendarioFormDeleteComponent', () => {
  let component: CalendarioFormDeleteComponent;
  let fixture: ComponentFixture<CalendarioFormDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioFormDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
