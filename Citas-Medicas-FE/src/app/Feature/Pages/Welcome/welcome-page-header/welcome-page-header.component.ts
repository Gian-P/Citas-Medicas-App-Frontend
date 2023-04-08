import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page-header',
  templateUrl: './welcome-page-header.component.html',
  styleUrls: ['./welcome-page-header.component.scss']
})
export class WelcomePageHeaderComponent implements OnInit {
  buttonName = 'Login';

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.buttonName = 'Dashboard';
    }
  }

  public goto(route?: string) {
    const token = localStorage.getItem('token');

    if (token) {
      route = 'dashboard';
    }else{
      route = 'auth/login';
    }

    this.route.navigate([route]);
  }
}
