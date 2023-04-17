import { Component, OnInit } from '@angular/core';
import { ArtistCardComponent } from '../artist-card/artist-card.component';
interface Artist {
  name: string;
  style: string;
  background: string;
  latestRelease: string;
  image: string;
}

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  
})
export class ArtistsComponent implements OnInit {
  artists: Artist[] = [
    {
      name: 'Artist 1',
      style: 'Pop',
      background: 'Born and raised in Los Angeles',
      latestRelease: 'https://www.artist1.com/latest-release',
      image: 'https://picsum.photos/200'
    },
    {
      name: 'Artist 2',
      style: 'Hip Hop',
      background: 'Born and raised in New York City',
      latestRelease: 'https://www.artist2.com/latest-release',
      image: 'https://picsum.photos/200'
    },
    {
      name: 'Artist 3',
      style: 'Rock',
      background: 'Born and raised in London',
      latestRelease: 'https://www.artist3.com/latest-release',
      image: 'https://picsum.photos/200'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
