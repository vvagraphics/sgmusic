import { Component } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { OnInit } from '@angular/core';
// import { map } from 'rxjs/operators';

// interface Card {
//   title: string;
//   date?: Date;
//   imageSrc: string;
//   altText: string;
//   description: string;
//   showMore?: boolean;
// }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    menuOpen = false;
  title = 'SGMUSIC';
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}