import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public showHeaderFooter: boolean = true;

  /**
   *
   */
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide header and footer for the login page
        this.showHeaderFooter = !event.urlAfterRedirects.includes('/login');
      }
    });
  }
}
