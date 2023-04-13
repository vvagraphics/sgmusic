import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  menuOpen = false;
  title = 'SGMUSIC';
  isLoggedIn = false;
  isHomePage = true;
  resizeListener!: () => void;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        window.scrollTo(0, 0);
        this.isLoggedIn = this.authService.isAuthenticated();
        const currentUrl = (event as NavigationEnd).url;
        this.isHomePage = currentUrl === '/' || currentUrl === '/#home';
      });

    this.resizeListener = () => {
      if (window.innerWidth >= 960) {
        this.closeMenu();
      }
    };

    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
