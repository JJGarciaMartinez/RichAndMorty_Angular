import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import { Subscription } from 'rxjs';
import navbarRoutes from 'utils/navbarRoutes';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarRoutes = navbarRoutes;
  currentRoute = '/';

  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;

        if (this.currentRoute == '') {
          this.currentRoute = '/';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
