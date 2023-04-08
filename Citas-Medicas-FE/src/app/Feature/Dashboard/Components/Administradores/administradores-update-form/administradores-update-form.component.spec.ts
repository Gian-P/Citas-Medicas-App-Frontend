import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresUpdateFormComponent } from './administradores-update-form.component';

describe('AdministradoresUpdateFormComponent', () => {
  let component: AdministradoresUpdateFormComponent;
  let fixture: ComponentFixture<AdministradoresUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradoresUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradoresUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
