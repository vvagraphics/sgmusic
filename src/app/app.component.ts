import { Component } from '@angular/core';

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
