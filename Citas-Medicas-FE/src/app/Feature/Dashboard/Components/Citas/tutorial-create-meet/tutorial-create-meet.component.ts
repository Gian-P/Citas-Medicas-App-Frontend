import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tutorial-create-meet',
  templateUrl: './tutorial-create-meet.component.html',
  styleUrls: ['./tutorial-create-meet.component.scss']
})
export class TutorialCreateMeetComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<TutorialCreateMeetComponent>) { }

  ngOnInit(): void {
  }

  public close(){
    this.dialogRef.close();
  }

}
