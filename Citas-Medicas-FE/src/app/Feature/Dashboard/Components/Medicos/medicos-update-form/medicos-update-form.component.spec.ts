import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosUpdateFormComponent } from './medicos-update-form.component';

describe('MedicosUpdateFormComponent', () => {
  let component: MedicosUpdateFormComponent;
  let fixture: ComponentFixture<MedicosUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicosUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
