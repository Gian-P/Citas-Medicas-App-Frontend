import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioFormUpdateComponent } from './calendario-form-update.component';

describe('CalendarioFormComponent', () => {
  let component: CalendarioFormUpdateComponent;
  let fixture: ComponentFixture<CalendarioFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioFormUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
