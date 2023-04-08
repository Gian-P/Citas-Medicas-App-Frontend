import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Core/Service/Auth/Common/token.service';
import { LoginService } from 'src/app/Core/Service/Auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public userName !: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logOut() {
    this.tokenService.deleteAllLoacalStorage();
    this.router.navigate(['auth/login']);
  }

  getUserName(): any{
    this.userName = localStorage.getItem('email') || '';
  }
}
