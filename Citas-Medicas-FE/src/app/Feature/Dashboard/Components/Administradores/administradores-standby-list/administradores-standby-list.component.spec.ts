import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresStandbyListComponent } from './administradores-standby-list.component';

describe('AdministradoresStandbyListComponent', () => {
  let component: AdministradoresStandbyListComponent;
  let fixture: ComponentFixture<AdministradoresStandbyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradoresStandbyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradoresStandbyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
