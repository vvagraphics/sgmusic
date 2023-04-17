import { Component, Input } from '@angular/core';

interface Artist {
  name: string;
  style: string;
  background: string;
  latestRelease: string;
  image: string;
}

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent {
  @Input() artist?: Artist;

  
}
