import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get('https://newsapi.org/v2/everything?q=music AND concert AND singer AND songwriter&apiKey=29284cfd56cd4afba764c1d89308c7bc');
  }
}
