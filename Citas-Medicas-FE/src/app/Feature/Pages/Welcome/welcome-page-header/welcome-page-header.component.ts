import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page-header',
  templateUrl: './welcome-page-header.component.html',
  styleUrls: ['./welcome-page-header.component.scss']
})
export class WelcomePageHeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  public goto(route: string) {
    this.route.navigate([route]);
  }
}
