import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Core/Service/Auth/Paciente/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public userName !: string;

  constructor(
    private _loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logOut() {
  }

  getUserName(): any{
  }
}
