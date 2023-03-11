import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasFormMeetComponent } from './citas-form-meet.component';

describe('CitasFormMeetComponent', () => {
  let component: CitasFormMeetComponent;
  let fixture: ComponentFixture<CitasFormMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasFormMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasFormMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
