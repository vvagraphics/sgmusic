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
      latestRelease: 'http://localhost:4200/latest-release/artist1',
      image: 'assets/image/artists/1.png'
    },
    {
      name: 'Artist 2',
      style: 'Hip Hop',
      background: 'Born and raised in New York City',
      latestRelease: 'http://localhost:4200/latest-release/artist2',
      image: 'assets/image/artists/2.png'
    },
    {
      name: 'Artist 3',
      style: 'Rock',
      background: 'Born and raised in London',
      latestRelease: 'http://localhost:4200/latest-release/artist3',
      image: 'assets/image/artists/3.png'
    },
    {
  name: 'Artist 4',
  style: 'Jazz',
  background: 'Born and raised in New Orleans',
  latestRelease: 'http://localhost:4200/latest-release/artist4',
  image: 'assets/image/artists/4.png'
},
{
  name: 'Artist 5',
  style: 'Electronic',
  background: 'Born and raised in Berlin',
  latestRelease: 'http://localhost:4200/latest-release/artist5',
  image: 'assets/image/artists/44.jpg'
},
{
  name: 'Artist 6',
  style: 'Country',
  background: 'Born and raised in Nashville',
  latestRelease: 'http://localhost:4200/latest-release/artist6',
  image: 'assets/image/artists/55.jpg'
}

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
