import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements DoCheck {
  public isUserLoggedIn: boolean = true;
  public displayName = '';

  constructor(private router: Router, private authService: AuthenticationService) {
    if (localStorage.length != 0) {
      this.authService.currentuserinfo = JSON.parse(localStorage['logininfo']);
      this.displayName = JSON.parse(localStorage['logininfo']).username;
    }
  }

  ngDoCheck(): void {
    if (this.authService.currentuserinfo.isactive == 'true') {
      this.isUserLoggedIn = true;
    }
    else {
      this.isUserLoggedIn = false;
    }
  }

  /**
   * To Sign Out from application.
   */
  public signout(): void {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('logininfo');
    localStorage.clear();
  }
}
