import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasStandbyListComponent } from './citas-standby-list.component';

describe('CitasStandbyListComponent', () => {
  let component: CitasStandbyListComponent;
  let fixture: ComponentFixture<CitasStandbyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasStandbyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasStandbyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
