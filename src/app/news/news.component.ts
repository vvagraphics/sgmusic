import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';


@Component({
  selector: 'app-news',
  template: `<div class="news-title">News</div><div class="news-container">
    <div class="newsfeed" *ngFor="let item of news">
  <img [src]="item.urlToImage" alt="News Image">
  <h3>{{ item.title }}</h3>
  <p>{{ item.description }}</p>
  <a href="{{ item.url }}">Read more</a>
</div></div>

  `,
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  news: any[] = [];

  constructor(private newsService: NewsService) { }

ngOnInit(): void {
    this.newsService.getNews()
      .then(res => {
        this.news = res.data.articles;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
