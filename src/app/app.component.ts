import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuOpen = false;
  title = 'SGMUSIC';
  isLoggedIn = false;
  isHomePage = true;

  constructor(private router: Router, private route: ActivatedRoute) {
  this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
}


ngOnInit() {
  this.router.events
    .pipe(filter((event: Event) => event instanceof NavigationEnd))
    .subscribe((event: Event) => {
      window.scrollTo(0, 0);
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      const currentUrl = (event as NavigationEnd).url;
      this.isHomePage = currentUrl === '/' || currentUrl === '/#home';
    });
}



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
