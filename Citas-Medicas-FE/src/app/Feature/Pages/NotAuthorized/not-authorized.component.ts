import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss'],
})
export class NotAuthorizedComponent implements OnInit {
  private token: string;

  constructor(private router: Router) {
    this.token = localStorage.getItem('token') as string;
  }

  ngOnInit(): void {}

  public gotoHome() {
    if(this.token) {
      this.router.navigate(['auth/login']);
    }else{
      this.router.navigate(['dashboard']);
    }
  }
}
