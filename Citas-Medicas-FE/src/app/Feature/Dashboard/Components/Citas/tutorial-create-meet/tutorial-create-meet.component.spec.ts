import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCreateMeetComponent } from './tutorial-create-meet.component';

describe('TutorialCreateMeetComponent', () => {
  let component: TutorialCreateMeetComponent;
  let fixture: ComponentFixture<TutorialCreateMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCreateMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCreateMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
