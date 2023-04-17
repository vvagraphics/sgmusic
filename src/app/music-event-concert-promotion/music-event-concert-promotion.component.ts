import { Component } from '@angular/core';

@Component({
  selector: 'app-music-event-concert-promotion',
  template: `
    <div class="container">
      <h1>Upcoming Music Events and Concerts</h1>
      <div class="events" *ngFor="let event of events">
        <img [src]="event.image" alt="Event Image">
        <div class="event-info">
          <h2>{{ event.title }}</h2>
          <p>{{ event.date | date }}</p>
          <p>{{ event.location }}</p>
          <a [href]="event.ticketLink">Get Tickets</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .events {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
    }
    .event-info {
      margin-left: 20px;
    }
  `]
})
export class MusicEventConcertPromotionComponent {
  events = [    {      title: 'Summer Festival 2022',      image: 'https://via.placeholder.com/150x150',      date: new Date('2022-07-01'),      location: 'New York, NY',      ticketLink: 'https://www.summerfestival2022.com/tickets'    },    {      title: 'Rock the Park 2022',      image: 'https://via.placeholder.com/150x150',      date: new Date('2022-08-15'),      location: 'Los Angeles, CA',      ticketLink: 'https://www.rockthepark2022.com/tickets'    }  ];
}
