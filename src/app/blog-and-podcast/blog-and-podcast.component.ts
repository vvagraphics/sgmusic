import { Component } from '@angular/core';

interface Episode {
  title: string;
  description: string;
  date: Date;
  image: string;
}

interface Blog {
  title: string;
  author: string;
  date: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-blog-and-podcast',
  templateUrl: './blog-and-podcast.component.html',
  styleUrls: ['./blog-and-podcast.component.css']
})
export class BlogAndPodcastComponent {

  

  episodes: Episode[] = [
    {
      title: 'Episode 1: The Rise of Indie Music',
      description: 'In this episode, we discuss the growing popularity of indie music and the impact it has on the music industry.',
      date: new Date(),
      image: 'https://via.placeholder.com/150x150'
    },
    {
      title: 'Episode 2: The Evolution of Pop Music',
      description: 'In this episode, we take a deep dive into the history of pop music and explore how it has evolved over the years.',
      date: new Date(),
      image: 'https://via.placeholder.com/150x150'
    }
  ];

  // blog: Blog = {
  //   title: 'The Future of Music',
  //   author: 'John Doe',
  //   date: 'Apr 15, 2023',
  //   link: 'https://www.example.com',
  //   image: 'https://via.placeholder.com/150x150'
  // };
}
