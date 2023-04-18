import { Component } from '@angular/core';

@Component({
  selector: 'app-music-event-concert-promotion',
  templateUrl: './music-event-concert-promotion.component.html',
  styleUrls: ['./music-event-concert-promotion.component.css']
})
export class MusicEventConcertPromotionComponent {
  events = [
    {
      title: 'Summer Festival 2022',
      image: 'assets/image/events/1.png',
      date: new Date('2022-07-01'),
      location: 'New York, NY',
      artist: 'DJ Khaled, Ariana Grande, and more',
      genre: 'Pop, Hip-Hop, and Electronic',
      ticketLink: 'https://www.summerfestival2022.com/tickets'
    },
    {
      title: 'Rock the Park 2022',
      image: 'assets/image/events/2.png',
      date: new Date('2022-08-15'),
      location: 'Los Angeles, CA',
      artist: 'The Foo Fighters, Muse, and more',
      genre: 'Rock',
      ticketLink: 'https://www.rockthepark2022.com/tickets'
    },
    {
      title: 'Jazz Nights 2022',
      image: 'assets/image/events/3.png',
      date: new Date('2022-09-10'),
      location: 'Chicago, IL',
      artist: 'Herbie Hancock, Esperanza Spalding, and more',
      genre: 'Jazz',
      ticketLink: 'https://www.jazznights2022.com/tickets'
    },
    {
      title: 'Country Fest 2022',
      image: 'assets/image/events/4.png',
      date: new Date('2022-10-05'),
      location: 'Nashville, TN',
      artist: 'Luke Bryan, Miranda Lambert, and more',
      genre: 'Country',
      ticketLink: 'https://www.countryfest2022.com/tickets'
    }
  ];
}
