import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvierviewListComponent } from './ovierview-list.component';

describe('OvierviewListComponent', () => {
  let component: OvierviewListComponent;
  let fixture: ComponentFixture<OvierviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvierviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvierviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
