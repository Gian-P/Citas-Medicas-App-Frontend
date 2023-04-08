import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosStandbyListComponent } from './medicos-standby-list.component';

describe('MedicosStandbyListComponent', () => {
  let component: MedicosStandbyListComponent;
  let fixture: ComponentFixture<MedicosStandbyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicosStandbyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosStandbyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
