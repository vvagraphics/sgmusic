import { Component } from '@angular/core';

@Component({
  selector: 'app-promote-your-lessons',
  templateUrl: './promote-your-lessons.component.html',
  styleUrls: ['./promote-your-lessons.component.css']
})
export class PromoteYourLessonsComponent {
  lessons = [
    {
      title: 'Introduction to Piano',
      instructor: 'John Doe',
      description: 'Learn the basics of playing the piano in this beginner-friendly lesson.',
      image: 'https://via.placeholder.com/150x150'
    },
    {
      title: 'Guitar for Beginners',
      instructor: 'Jane Doe',
      description: 'Start strumming and playing chords in this beginner-friendly guitar lesson.',
      image: 'https://via.placeholder.com/150x150'
    }
  ];
  teachers = [
    {
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/150x150',
      subject: 'Piano',
      location: 'New York, NY',
      contact: 'jane@musiclessons.com'
    },
    {
      name: 'John Smith',
      image: 'https://via.placeholder.com/150x150',
      subject: 'Guitar',
      location: 'Los Angeles, CA',
      contact: 'john@musiclessons.com'
    }
  ];
}
